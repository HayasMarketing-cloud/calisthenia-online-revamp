// Edge function: youtube-sync
// Sincroniza vídeos de YouTube hacia la tabla youtube_videos.
// Solo accesible para administradores (rol 'admin' en user_roles).

import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const CHANNEL_HANDLE = 'Nicoreyero';

type SyncBody =
  | { mode: 'channel' }
  | { mode: 'exercise_ids'; ids: string[] }
  | { mode: 'exercise_playlist'; playlistId: string };

interface VideoRow {
  video_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  duration: string | null;
  published_at: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  tags: string[];
  source: 'channel' | 'exercise_library';
  last_synced_at: string;
}

async function getUploadsPlaylistId(): Promise<string> {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`channels.list failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  const id = json.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!id) throw new Error('Uploads playlist not found');
  return id;
}

async function fetchPlaylistVideoIds(playlistId: string): Promise<string[]> {
  const ids: string[] = [];
  let pageToken: string | undefined = undefined;
  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'contentDetails');
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('playlistId', playlistId);
    url.searchParams.set('key', YOUTUBE_API_KEY!);
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`playlistItems.list failed: ${res.status} ${await res.text()}`);
    const json = await res.json();
    for (const item of json.items ?? []) {
      const vid = item.contentDetails?.videoId;
      if (vid) ids.push(vid);
    }
    pageToken = json.nextPageToken;
  } while (pageToken);
  return ids;
}

async function fetchVideosBatch(ids: string[], source: 'channel' | 'exercise_library'): Promise<{ rows: VideoRow[]; missing: string[] }> {
  const rows: VideoRow[] = [];
  const found = new Set<string>();
  const now = new Date().toISOString();

  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'snippet,statistics,contentDetails');
    url.searchParams.set('id', chunk.join(','));
    url.searchParams.set('key', YOUTUBE_API_KEY!);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`videos.list failed: ${res.status} ${await res.text()}`);
    const json = await res.json();
    for (const item of json.items ?? []) {
      const sn = item.snippet ?? {};
      const st = item.statistics ?? {};
      const cd = item.contentDetails ?? {};
      const thumb =
        sn.thumbnails?.maxres?.url ||
        sn.thumbnails?.high?.url ||
        sn.thumbnails?.medium?.url ||
        sn.thumbnails?.default?.url ||
        null;
      rows.push({
        video_id: item.id,
        title: sn.title ?? '',
        description: sn.description ?? null,
        thumbnail_url: thumb,
        duration: cd.duration ?? null,
        published_at: sn.publishedAt ?? null,
        view_count: parseInt(st.viewCount ?? '0', 10) || 0,
        like_count: parseInt(st.likeCount ?? '0', 10) || 0,
        comment_count: parseInt(st.commentCount ?? '0', 10) || 0,
        tags: Array.isArray(sn.tags) ? sn.tags : [],
        source,
        last_synced_at: now,
      });
      found.add(item.id);
    }
  }
  const missing = ids.filter((id) => !found.has(id));
  return { rows, missing };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!YOUTUBE_API_KEY) throw new Error('YOUTUBE_API_KEY not configured');

    // Auth: require admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await userClient.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const userId = user.id;

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleRow, error: roleError } = await admin
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    if (roleError || !roleRow) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const body = (await req.json()) as SyncBody;
    let ids: string[] = [];
    let source: 'channel' | 'exercise_library' = 'channel';

    if (body.mode === 'channel') {
      source = 'channel';
      const uploads = await getUploadsPlaylistId();
      ids = await fetchPlaylistVideoIds(uploads);
    } else if (body.mode === 'exercise_playlist') {
      source = 'exercise_library';
      if (!body.playlistId) throw new Error('playlistId required');
      ids = await fetchPlaylistVideoIds(body.playlistId);
    } else if (body.mode === 'exercise_ids') {
      source = 'exercise_library';
      if (!Array.isArray(body.ids) || body.ids.length === 0) throw new Error('ids required');
      // Sanitize: keep only 11-char alphanum-ish IDs
      ids = Array.from(new Set(body.ids
        .map((s) => String(s).trim())
        .filter((s) => /^[A-Za-z0-9_-]{11}$/.test(s))));
      if (ids.length === 0) throw new Error('No valid YouTube IDs provided');
    } else {
      throw new Error('Invalid mode');
    }

    const { rows, missing } = await fetchVideosBatch(ids, source);

    let inserted = 0;
    let updated = 0;
    if (rows.length > 0) {
      // Detect existing IDs to count inserted vs updated
      const { data: existing } = await admin
        .from('youtube_videos')
        .select('video_id')
        .in('video_id', rows.map((r) => r.video_id));
      const existingSet = new Set((existing ?? []).map((r: any) => r.video_id));
      inserted = rows.filter((r) => !existingSet.has(r.video_id)).length;
      updated = rows.length - inserted;

      // Upsert in chunks
      for (let i = 0; i < rows.length; i += 100) {
        const chunk = rows.slice(i, i + 100);
        const { error } = await admin.from('youtube_videos').upsert(chunk, { onConflict: 'video_id' });
        if (error) throw new Error(`Upsert failed: ${error.message}`);
      }
    }

    return new Response(
      JSON.stringify({ requested: ids.length, fetched: rows.length, inserted, updated, missing, source }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('youtube-sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message ?? 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
