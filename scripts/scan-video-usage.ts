/**
 * scripts/scan-video-usage.ts
 *
 * Escanea src/** buscando IDs de YouTube y rellena la tabla video_page_usage
 * con marca source='auto-scan'. Las filas 'manual' no se tocan.
 *
 * Uso:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/scan-video-usage.ts
 *
 * También se puede leer de un .env si existe (no incluido aquí para no añadir deps).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Faltan variables: SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Mapa fichero → ruta. Sincronizar con src/lib/prerender-routes.ts
const FILE_TO_ROUTE: Record<string, string> = {
  'Index.tsx': '/',
  'QuienSoy.tsx': '/quien-soy/',
  'Programas.tsx': '/programas/',
  'Coaching.tsx': '/programa-cuerpo-atletico-en-casa/',
  'FuncionalBodybuilding.tsx': '/funcional-bodybuilding/',
  'LeadCapture.tsx': '/empezar/',
  'Contacto.tsx': '/contacto/',
  'Blog.tsx': '/blog/',
  'CalisteniaParque.tsx': '/calistenia-en-parque/',
  'CalisteniaPrincipiantes.tsx': '/calistenia-principiantes/',
  'CalisteniaMujeres.tsx': '/calistenia-mujeres/',
  'CallisteniaNivelAvanzado.tsx': '/calistenia-nivel-avanzado/',
  'RutinaBrazos.tsx': '/rutina-brazos-calistenia/',
  'RutinaEspalda.tsx': '/rutina-espalda-calistenia/',
  'RutinaAbdominales.tsx': '/rutina-abdominales-calistenia/',
  'RutinaCore.tsx': '/rutina-core-calistenia/',
  'RutinaPiernas.tsx': '/rutina-piernas-calistenia/',
  'RutinaPecho.tsx': '/rutina-pecho-calistenia/',
  'RutinaHombro.tsx': '/rutinas-de-hombro-calistenia/',
  'RutinaFullBody.tsx': '/rutina-full-body/',
  'RutinaCasa.tsx': '/rutina-calistenia-en-casa/',
  'QueEsLaCalistenia.tsx': '/blog/que-es-la-calistenia/',
};

const ID_RE = /([A-Za-z0-9_-]{11})/g;
const CONTEXT_RES = [
  /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/g,
  /youtu\.be\/([A-Za-z0-9_-]{11})/g,
  /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/g,
  /videoId\s*[:=]\s*["'`]([A-Za-z0-9_-]{11})["'`]/g,
  /\bid\s*:\s*["'`]([A-Za-z0-9_-]{11})["'`]/g,
];

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?)$/.test(entry)) files.push(full);
  }
  return files;
}

function extractIds(content: string): Set<string> {
  const ids = new Set<string>();
  for (const re of CONTEXT_RES) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content)) !== null) ids.add(m[1]);
  }
  return ids;
}

function routeForFile(filePath: string): string {
  const name = basename(filePath);
  if (FILE_TO_ROUTE[name]) return FILE_TO_ROUTE[name];
  // videoLibrary / videoCuration → biblioteca compartida
  if (filePath.includes('/data/')) return '(data)';
  return '(global)';
}

async function main() {
  const supabase = createClient(SUPABASE_URL!, SERVICE_KEY!);
  const files = walk('src');
  const usageByKey = new Map<string, { video_id: string; page_path: string; section: string }>();

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const ids = extractIds(content);
    if (ids.size === 0) continue;
    const route = routeForFile(file);
    const section = basename(file).replace(/\.[jt]sx?$/, '');
    for (const id of ids) {
      const key = `${id}|${route}|${section}`;
      usageByKey.set(key, { video_id: id, page_path: route, section });
    }
  }

  const rows = Array.from(usageByKey.values()).map((r) => ({
    ...r,
    source: 'auto-scan' as const,
    updated_at: new Date().toISOString(),
  }));

  console.log(`Encontradas ${rows.length} relaciones vídeo↔página en ${files.length} ficheros.`);

  // Borra las auto-scan previas para reflejar el estado actual del código
  const { error: delErr } = await supabase
    .from('video_page_usage')
    .delete()
    .eq('source', 'auto-scan');
  if (delErr) {
    console.error('Error borrando auto-scan previos:', delErr.message);
    process.exit(1);
  }

  // Inserta en chunks
  for (let i = 0; i < rows.length; i += 200) {
    const chunk = rows.slice(i, i + 200);
    const { error } = await supabase
      .from('video_page_usage')
      .upsert(chunk, { onConflict: 'video_id,page_path,section' });
    if (error) {
      console.error('Error en upsert:', error.message);
      process.exit(1);
    }
  }

  console.log('OK · video_page_usage actualizada.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
