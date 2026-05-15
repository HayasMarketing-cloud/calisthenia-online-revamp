# Biblioteca de vídeos del canal — panel admin privado

Implementación admin-only para 570 vídeos públicos + biblioteca privada de ejercicios. Sincronización manual, mapa de uso auto-escaneado del código + override manual con fecha de última actualización.

## Sobre los IDs que me has pasado (`v4Zk9iSLdOo`, `PS0zO8um6II`)

Sin el `playlistId` de la lista privada no podemos pedirle a la API "tráeme todos los vídeos de esa lista" en una sola llamada. Pero hay un test rápido que hace la propia función de sincronización:

- Si llamamos a `videos.list?id=v4Zk9iSLdOo` con la API key y devuelve metadatos → es **unlisted** (no listado), accesible con API key. Funciona perfecto.
- Si devuelve vacío o error 404 → es **private** de verdad, y necesita OAuth (fuera de scope, te avisaría).

Para no depender de tener el `playlistId`, la sincronización privada funcionará con **lista de IDs pegados manualmente** (uno por línea) en el panel. Tú vas pegando los 11-char IDs según los vayas teniendo y la función baja título, miniatura, duración, vistas, etc. de cada uno. Si más adelante consigues el playlistId, añado un segundo modo automático.

> Cómo obtener el playlistId si lo necesitas en el futuro: en YouTube Studio → Contenido → Listas de reproducción → abres la lista → la URL contiene `?list=PLxxxxxxxxxxxx`. Ese `PL...` es el ID.

## 1. Migración (esquema admin-only)

**`youtube_videos`**
- `video_id` text PRIMARY KEY (los 11 caracteres que usas para embed)
- `title`, `description`, `thumbnail_url`, `duration` (ISO 8601), `published_at`
- `view_count`, `like_count`, `comment_count` (bigint)
- `tags` text[]
- `source` text — `'channel'` (público de Nico) o `'exercise_library'` (privada/no listada)
- `is_orphan` bool — calculado por la UI; no en DB
- `last_synced_at` timestamptz
- `notes` text — campo libre del admin

**`video_page_usage`** (overrides manuales + cache del scanner)
- `video_id` text
- `page_path` text
- `section` text NULL
- `source` text — `'auto-scan'` o `'manual'`
- `updated_at` timestamptz DEFAULT now()
- PRIMARY KEY (`video_id`, `page_path`, `section`)
- Trigger BEFORE UPDATE para refrescar `updated_at`

RLS: solo admins (`has_role(auth.uid(), 'admin')`) pueden leer/escribir ambas. Públicas no exponen nada.

## 2. Edge Function `youtube-sync`

Ruta: `supabase/functions/youtube-sync/index.ts`. JWT validado con `getClaims` y rol admin verificado contra `user_roles`. Reutiliza `YOUTUBE_API_KEY`.

Body aceptado:
- `{ mode: "channel" }` → resuelve uploads playlist de `@Nicoreyero`, pagina hasta agotar (~12 páginas para 570), batch de 50 en `videos.list?part=snippet,statistics,contentDetails`. Marca `source = 'channel'`. Coste ~25 unidades.
- `{ mode: "exercise_ids", ids: ["v4Zk9iSLdOo", "PS0zO8um6II", ...] }` → trae metadatos de esos IDs y marca `source = 'exercise_library'`. Si algún ID viene vacío en la respuesta, lo reportamos como "private (necesita OAuth) o eliminado".
- `{ mode: "exercise_playlist", playlistId: "PL..." }` → para el día que tengas el ID.

Respuesta: `{ inserted, updated, missing: string[], total }`.

## 3. Mapa de uso (auto-scan del código + manual)

**Script Node** `scripts/scan-video-usage.ts`:
- Recorre `src/**/*.{ts,tsx}` con regex que captura los 11 caracteres en patrones: `youtube.com/embed/<id>`, `youtu.be/<id>`, `videoId="<id>"`, `videoId: "<id>"`, claves de objeto en `videoLibrary.ts`/`videoCuration.ts`.
- Mapea fichero → ruta de página usando un diccionario explícito basado en `prerender-routes.ts` (p. ej. `RutinaPiernas.tsx` → `/rutina-piernas-calistenia/`). Para componentes compartidos (Header, Hero, etc.) marca como "Global / múltiples páginas".
- Hace upsert en `video_page_usage` con `source = 'auto-scan'` (vía supabase admin client con SERVICE_ROLE en el script). Borra los `'auto-scan'` previos antes de reinsertar para que las páginas que dejaron de usar un vídeo desaparezcan.
- Output también: `src/data/videoUsageMap.generated.ts` (snapshot de respaldo).

**Override manual**: en cada fila del panel, un botón "Editar páginas" abre un dialog donde añades/quitas `page_path` con `source = 'manual'`. Esos no los borra el scanner. Cada manual tiene su propia `updated_at` visible en la UI.

**Botón "Re-escanear código"**: como el navegador no puede ejecutar scripts Node, el botón muestra un dialog con el comando `npm run scan:videos` listo para copiar (lo añadimos a `package.json`). Más limpio que falsear que la UI lo dispara.

## 4. Página `/admin/videos`

- Ruta protegida con `ProtectedRoute` admin, enlazada desde `AdminHub.tsx`.
- Helmet `noindex, nofollow`.
- **Header**: contador `X públicos · Y biblioteca`, fecha "última sincronización", botones:
  - `Sincronizar canal público` (mode `channel`)
  - `Sincronizar biblioteca de ejercicios` → abre dialog con textarea para pegar IDs (uno por línea)
  - `Re-escanear código` (instrucciones)
- **Tabs**: `Canal público` · `Biblioteca de ejercicios (privada)`
- **Filtros**: búsqueda por título/ID, checkbox "solo huérfanos (sin uso)", "duplicados".
- **Tabla** ordenada por `view_count DESC` (toggle por título/fecha):

```text
Miniatura | Título               | Video ID         | Vistas | Páginas (fecha)             | Acciones
[80x45]   | Rutina pecho 12 min  | aBcD123XyZ9 [📋] | 124K   | /rutina-pecho/ (auto · 2d)  | ✎ ▶
          |                      |                  |        | /programas/ (manual · 5d)   |
```

- ID copiable al portapapeles (toast confirmando).
- Click miniatura → modal con `VideoEmbed`.
- Badge rojo "huérfano" si no tiene filas en `video_page_usage`.
- Cada badge de página muestra `(auto · 2d)` o `(manual · 5d)` calculado desde `updated_at`.
- Paginación cliente, 50 por página (importante para 570 filas).

## Detalles técnicos

- Hook `useAdminVideos.ts` con TanStack Query (`['admin-videos', source]`).
- Componente `<VideoLibraryTable />` con shadcn `Table` + `Badge` + `Dialog`.
- `<EditUsageDialog />` para overrides manuales.
- `package.json`: añadir `"scan:videos": "tsx scripts/scan-video-usage.ts"`.
- Memoria nueva: `mem://features/admin-video-library` describiendo arquitectura.
- Memoria a actualizar: `mem://features/admin-management-system` (referencia al nuevo módulo).

## Lo que necesito de ti para arrancar

Solo confirmación de este plan. El playlistId puede llegar después; con la lista de IDs pegados ya tienes la biblioteca privada operativa desde el día 1. Si confirmas, ejecuto en este orden:

1. Migración (apruebas tú)
2. Edge function `youtube-sync` + test con `v4Zk9iSLdOo` para detectar si es unlisted o private
3. Página `/admin/videos` + hook + dialog
4. Script de scan + entrada en `package.json`
5. Memoria actualizada