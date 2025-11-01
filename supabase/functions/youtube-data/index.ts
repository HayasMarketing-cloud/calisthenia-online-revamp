const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
const CHANNEL_HANDLE = '@Nicoreyero';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Cache in-memory
const cache: Record<string, { data: any; timestamp: number }> = {
  channelStats: { data: null, timestamp: 0 },
  latestVideos: { data: null, timestamp: 0 },
  latestVideo: { data: null, timestamp: 0 },
};

function isCacheValid(cacheKey: string): boolean {
  const cached = cache[cacheKey];
  return cached && cached.data && (Date.now() - cached.timestamp) < CACHE_TTL;
}

async function getChannelId(): Promise<string> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(CHANNEL_HANDLE)}&type=channel&maxResults=1&key=${YOUTUBE_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to get channel ID: ${response.statusText}`);
  }
  
  const data = await response.json();
  if (!data.items || data.items.length === 0) {
    throw new Error('Channel not found');
  }
  
  return data.items[0].snippet.channelId;
}

async function getChannelStats() {
  console.log('Fetching channel stats...');
  
  if (isCacheValid('channelStats')) {
    console.log('Returning cached channel stats');
    return cache.channelStats.data;
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forHandle=${CHANNEL_HANDLE.replace('@', '')}&key=${YOUTUBE_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('YouTube API error:', response.status, errorText);
    throw new Error(`YouTube API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.items || data.items.length === 0) {
    throw new Error('Channel not found');
  }

  const channel = data.items[0];
  const stats = channel.statistics;
  const snippet = channel.snippet;

  // Get latest video thumbnail
  let lastVideoThumbnail = null;
  try {
    const channelId = channel.id;
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      if (searchData.items && searchData.items.length > 0) {
        lastVideoThumbnail = searchData.items[0].snippet.thumbnails.medium.url;
      }
    }
  } catch (error) {
    console.error('Error fetching latest video thumbnail:', error);
  }

  const result = {
    subscriberCount: parseInt(stats.subscriberCount || '0'),
    videoCount: parseInt(stats.videoCount || '0'),
    viewCount: parseInt(stats.viewCount || '0'),
    title: snippet.title,
    thumbnailUrl: snippet.thumbnails.medium.url,
    channelUrl: `https://youtube.com/${CHANNEL_HANDLE}`,
    lastVideoThumbnail,
  };

  cache.channelStats = { data: result, timestamp: Date.now() };
  console.log('Channel stats fetched and cached');
  
  return result;
}

async function getLatestVideos(maxResults: number = 3) {
  const cacheKey = 'latestVideos';
  console.log(`Fetching latest ${maxResults} videos...`);
  
  if (isCacheValid(cacheKey)) {
    console.log('Returning cached latest videos');
    return cache[cacheKey].data.slice(0, maxResults);
  }

  // First, get channel ID
  const channelId = await getChannelId();
  
  // Get latest video IDs
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
  
  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) {
    const errorText = await searchResponse.text();
    console.error('YouTube search API error:', searchResponse.status, errorText);
    throw new Error(`YouTube search API error: ${searchResponse.status}`);
  }

  const searchData = await searchResponse.json();
  
  if (!searchData.items || searchData.items.length === 0) {
    return [];
  }

  // Get video IDs
  const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
  
  // Get video details (statistics and contentDetails)
  const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
  
  const videosResponse = await fetch(videosUrl);
  if (!videosResponse.ok) {
    const errorText = await videosResponse.text();
    console.error('YouTube videos API error:', videosResponse.status, errorText);
    throw new Error(`YouTube videos API error: ${videosResponse.status}`);
  }

  const videosData = await videosResponse.json();
  
  // Combine data
  const videos = searchData.items.map((searchItem: any, index: number) => {
    const videoDetails = videosData.items[index];
    
    return {
      id: searchItem.id.videoId,
      title: searchItem.snippet.title,
      description: searchItem.snippet.description,
      thumbnailUrl: searchItem.snippet.thumbnails.medium.url,
      publishedAt: searchItem.snippet.publishedAt,
      duration: videoDetails.contentDetails.duration,
      viewCount: parseInt(videoDetails.statistics.viewCount || '0'),
      likeCount: parseInt(videoDetails.statistics.likeCount || '0'),
      videoUrl: `https://www.youtube.com/watch?v=${searchItem.id.videoId}`,
    };
  });

  cache[cacheKey] = { data: videos, timestamp: Date.now() };
  console.log(`Latest ${maxResults} videos fetched and cached`);
  
  return videos;
}

async function getLatestVideo() {
  const cacheKey = 'latestVideo';
  console.log('Fetching latest video...');
  
  if (isCacheValid(cacheKey)) {
    console.log('Returning cached latest video');
    return cache[cacheKey].data;
  }

  const videos = await getLatestVideos(1);
  const result = videos[0] || null;
  
  cache[cacheKey] = { data: result, timestamp: Date.now() };
  console.log('Latest video fetched and cached');
  
  return result;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YOUTUBE_API_KEY not configured');
    }

    const { action, maxResults } = await req.json();
    console.log(`Action requested: ${action}`);

    let result;

    switch (action) {
      case 'channelStats':
        result = await getChannelStats();
        break;
      
      case 'latestVideos':
        result = await getLatestVideos(maxResults || 3);
        break;
      
      case 'latestVideo':
        result = await getLatestVideo();
        break;
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action. Use: channelStats, latestVideos, or latestVideo' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

    return new Response(
      JSON.stringify(result),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error('Error in youtube-data function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
