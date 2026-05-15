# Diagnóstico: por qué GSC indexa 11 de 21 y 0 vídeos

He auditado el HTML que sirve `calisthenia.online`. **No hace falta más información**, el problema es claro y reproducible con `curl`:

## Causa raíz

El proyecto es una SPA Vite sin SSR ni prerender. Cuando Googlebot pide `https://calisthenia.online/rutina-calistenia-en-casa/`, el servidor devuelve **el mismo `index.html` que para `/`**:

- `<title>` = "Calistenia Online | Nicolás Reyero" (homepage)
- `<meta name="description">` = la del home
- `<link rel="canonical" href="https://calisthenia.online/">` ← **canonical apuntando al home en TODAS las URLs**
- JSON-LD: solo Organization/Person/WebSite del home
- Cero contenido del artículo, cero `VideoObject`, cero `<h1>` de la página

`<Helmet>` reemplaza esos tags después en el cliente, pero el HTML "crudo" que ve el crawler no los tiene.

### Por qué 11 indexadas y no 21
Google sí ejecuta JS en una segunda pasada, pero al ver en la primera pasada que las 21 URLs comparten **mismo título, misma descripción y mismo canonical = `/`**, marca la mayoría como "Duplicada — Google eligió un canónico distinto" o "Descubierta, actualmente sin indexar". Solo termina indexando un subconjunto (las que renderiza con JS y considera suficientemente distintas).

### Por qué 0 vídeos descubiertos
Dos motivos acumulados:
1. El **crawler de vídeo de Google no ejecuta JS** con la misma fiabilidad que Googlebot. Necesita ver `VideoObject` en el HTML servido.
2. Solo `RutinaAbdominales.tsx` declara `VideoObject` (vía Helmet, así que tampoco lo ve). El resto de páginas con YouTube embebido no tienen schema de vídeo.

## Solución

Dos cambios complementarios:

### 1. Prerender estático en build (resuelve 11→21 y la mayoría del problema de vídeo)

Añadir `vite-plugin-prerender` (basado en Puppeteer) al build. Genera un `index.html` físico por cada ruta del sitemap con el HTML ya renderizado por React, incluyendo el `<Helmet>` aplicado.

- Archivos: `vite.config.ts` (registrar plugin), `package.json` (dependencia + ya hay `prebuild` para sitemap, no rompe nada).
- Lista de rutas a prerenderizar: las 21 del sitemap actual (importadas del mismo array para mantenerse en sync).
- Resultado tras `vite build`: `dist/rutina-calistenia-en-casa/index.html` con title, meta, canonical, OG y JSON-LD correctos. El hosting de Lovable ya sirve `index.html` por carpeta, no hay que tocar routing.

Alternativa más ligera si prefieres evitar Puppeteer: `react-snap` (mismo principio, menos config), pero `vite-plugin-prerender`/`@prerenderer/rollup-plugin` es lo más estándar hoy.

### 2. VideoObject en todas las páginas con YouTube (resuelve "0 vídeos")

Auditar cada página de rutina (`RutinaCasa`, `RutinaBrazos`, `RutinaEspalda`, `RutinaCore`, `RutinaPiernas`, `RutinaPecho`, `RutinaHombro`, `RutinaFullBody`, `CalisteniaParque`, `CalisteniaPrincipiantes`, `CalisteniaNivelAvanzado`, `QueEsLaCalistenia`) y añadir `VideoObject` con los campos obligatorios para que Google muestre rich result de vídeo:

- `name`, `description`, `thumbnailUrl` (URL absoluta, ratio 16:9 o 4:3 o 1:1, ≥1200px ancho recomendado),
- `uploadDate` (ISO 8601),
- `embedUrl` (la URL `https://www.youtube.com/embed/...`),
- `duration` (formato ISO 8601, p.ej. `PT8M30S`).

Ya existe el helper `generateVideoObjectSchema` en `src/lib/schemas.ts`, solo falta usarlo en cada página y pasar el JSON-LD por `<Helmet>`. Con prerender activo, ese script saldrá ya en el HTML servido y el video crawler lo verá.

### 3. Limpieza menor en `index.html`

- Quitar el `<link rel="canonical" href="https://calisthenia.online/">` estático (cada página debe poner el suyo vía Helmet, y el prerender lo congela). Mantenerlo provoca canonicals duplicados tras prerender.
- Mantener los OG/Twitter del home como fallback (los crawlers sociales sin JS los necesitan).

## Detalle técnico

```text
flujo actual:           Googlebot → index.html (shell) → JS → Helmet aplica
                                    └─ ve home dup           └─ tarde y frágil

flujo objetivo:         Googlebot → /rutina-.../index.html (prerenderizado)
                                    └─ ya tiene title, canonical, VideoObject
```

Pasos de implementación (ya en build mode):

1. `bun add -D @prerenderer/rollup-plugin @prerenderer/renderer-puppeteer` (o `vite-plugin-prerender`).
2. Editar `vite.config.ts`: importar el plugin, leer las rutas desde `scripts/sitemap-routes.ts` (extraer constante para reusar), pasarlas a `routes`.
3. Extraer las 21 URLs del sitemap a un módulo común para que sitemap y prerender no se desincronicen.
4. Añadir `VideoObject` (con `Helmet` + `generateVideoObjectSchema`) en cada página de rutina que embeba YouTube. Pediré la `uploadDate` y `duration` reales de cada vídeo (o las extraigo de la API de YouTube si tienes la key).
5. Quitar canonical estático de `index.html`.
6. Verificación post-deploy:
   - `curl -s https://calisthenia.online/rutina-calistenia-en-casa/ | grep -E "<title>|canonical|VideoObject"` → debe mostrar los específicos de la página.
   - En GSC: "Inspeccionar URL" en 2-3 páginas problemáticas → "Probar URL publicada" → confirmar que ve título y canonical correctos.
   - Re-enviar sitemap; en 1-2 semanas las 21 deberían pasar a "Indexada" y los vídeos a "Descubiertos".

## Lo único que necesito de ti antes de implementar

- ¿Apruebas usar **prerender con Puppeteer** (recomendado, estándar) o prefieres `react-snap` (más simple, menos mantenido)?
- Para el `VideoObject`, ¿me pasas o prefieres que extraiga (API de YouTube) **uploadDate y duration** reales de cada vídeo embebido? Sin esos campos Google a veces ignora el rich result.
