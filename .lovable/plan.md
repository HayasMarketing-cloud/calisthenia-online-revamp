# Plan SEO Sprint 1 — Parque + Espalda + Tabla canónica de ejercicios

## Decisiones confirmadas

1. **Una sola tabla `exercises`** (no duplicar). Mismo registro sirve a área privada (programas) y a páginas públicas (SEO). Distinción mediante flag `is_public_seo`.
2. **Mini-directorio de parques** → Sprint 2 (cómo lo haré: ver §6).
3. **Eliminar todo contenido de gym** (mancuernas, máquinas, jalón al pecho, encogimientos…) de `/rutina-espalda-calistenia/`.

## 1. Migración BD — añadir capa SEO a `exercises`

```sql
ALTER TABLE public.exercises
  ADD COLUMN seo_slug text UNIQUE,
  ADD COLUMN primary_keyword text,
  ADD COLUMN aliases text[] DEFAULT '{}',
  ADD COLUMN seo_description text,
  ADD COLUMN monthly_volume int,
  ADD COLUMN is_public_seo boolean NOT NULL DEFAULT false,
  ADD COLUMN public_order int;
```

Política RLS pública adicional (no toca la existente del privado):

```sql
CREATE POLICY "Public can view SEO-enabled exercises"
ON public.exercises FOR SELECT
TO anon, authenticated
USING (is_active = true AND is_public_seo = true);
```

ExercisesManager (admin) gana 5 campos opcionales en el formulario: `seo_slug`, `primary_keyword`, `aliases` (chips), `seo_description` (textarea), `is_public_seo` (switch) y `public_order`.

## 2. Seed — ejercicios canónicos de espalda

Marcar `is_public_seo = true` en estos (crear los que falten, renombrar si procede para alinear con keywords):

| Nombre canónico (= primary_keyword) | Volumen ref | Aliases |
|---|---|---|
| Dominadas | 5,400 | pull-up, pull ups, dominada |
| Dominadas supinas (chin-ups) | 480 | chin up, dominada supina |
| Dominadas neutras | 210 | parallel grip pull-up |
| Dominadas asistidas con banda | 320 | banded pull-up |
| Remo invertido | 390 | australian pull-up, australian row, ejercicios espalda con barra |
| Remo invertido con toalla en puerta | 170 | ejercicios espalda sin material |
| Face pulls con banda | 170 | face pulls |
| Pull-aparts con banda | 90 | band pull-aparts |
| Superman | 1,000 | superman ejercicio |
| Reverse snow angels | 70 | ángeles invertidos |
| Scapular pull-ups | 110 | escapular, scapular pulls |
| Hollow body hold | 480 | hollow body |
| Pendlay row con mochila | 90 | remo con mochila |

## 3. Componente `<ExercisesTable category="back" />`

- Nuevo hook `usePublicExercises(muscleGroup)` → `select * from exercises where is_public_seo = true and 'Espalda' = ANY(muscle_groups) order by public_order, monthly_volume desc`.
- Tabla semántica HTML con `<caption>`, `<th scope="col">`, columnas: Ejercicio · Músculo principal · Material · Nivel · Vídeo.
- Cada fila genera un `<h3 id={seo_slug}>` con `name` (= keyword exacta).
- Inyecta JSON-LD `ItemList` con cada ejercicio + JSON-LD `HowTo` corto a partir de `seo_description`.

## 4. Refactor `/rutina-espalda-calistenia/`

- **Eliminar** secciones de mancuernas, máquinas, peso muerto, jalón al pecho, encogimiento de hombros, pullover, "remo a un brazo con mancuerna", "rutina con máquinas y cables", "Ventajas de mancuernas".
- **Helmet**: title `Ejercicios de espalda calistenia: rutina completa en casa y parque`. Description con "ejercicios espalda en casa", "calistenia", "sin material", "con barra".
- **H1**: `Ejercicios de espalda calistenia` (subtítulo: "rutina completa en casa y parque, sin material o con barra").
- **Nuevos H2 (cluster Semrush)**:
  1. Ejercicios de espalda en casa sin material *(1,600 + 170/mo)*
  2. Ejercicios de espalda con barra: dominadas y remo invertido *(390×3/mo)*
  3. Cómo entrenar dorsales en casa *(550/mo combinado)*
  4. Rutina de espalda calistenia para principiantes
  5. Tabla completa de ejercicios de espalda *(← `<ExercisesTable category="back" />`)*
  6. Programación semanal: cuántos días, series y repeticiones
  7. Errores comunes al entrenar la espalda en calistenia
  8. Preguntas frecuentes (mantener FAQ ampliada)
- Reordenar para que la tabla canónica aparezca arriba (responde la query inmediatamente).
- Mantener `VideoObject` ya existente; añadir `BreadcrumbList` si falta.

## 5. Refactor `/calistenia-en-parque/`

- **Helmet**: title `Parques de calistenia y barras de parque: guía completa`; description con "barras de parques", "parque calistenia", "cerca de ti".
- **H1**: mantener "Calistenia en parque" + subtítulo con sinónimo "todo sobre los parques de calistenia y sus barras".
- **Nuevos H2**:
  1. **Qué es un parque de calistenia** — captura "parque calistenia / parques calistenia / zona(s) de calistenia" (~10k/mo).
  2. **Tipos de barras de parques de calistenia** — H2 nuevo + tabla:

     | Tipo de barra | Altura típica | Ejercicios principales | Nivel | Notas |
     |---|---|---|---|---|
     | Barra de dominadas alta | 2,2-2,5 m | Pull-ups, muscle-ups, leg raises | Principiante–avanzado | Pronas/supinas/neutras |
     | Barras paralelas (dips) | 1,2-1,4 m | Fondos, L-sit, dips búlgaros | Inter–avanzado | |
     | Barra horizontal baja | 0,9-1,1 m | Remo invertido (australian rows) | Principiante | Imprescindible para empezar |
     | Espaldera / wall-bars | 2,5 m | Toes-to-bar, escaladas, estiramientos | Todos | |
     | Monkey bars / barras Z | variable | Front-lever, traslaciones | Avanzado | |
     | Banco abdominal inclinado | — | Sit-ups, hyperextensions | Principiante | |
     | Anillas (si están) | 2,2 m | Muscle-ups, dips, flyes | Avanzado | |
     | Paralelas bajas | 0,3-0,5 m | Push-ups elevados, planche lean | Inter–avanzado | |
  3. **Cómo encontrar un parque de barras cerca de ti** — Google Maps tip, `streetworkoutparks.es`, `calisteniaparks.com`, Wikiloc. Captura "parque de barras cerca de mi" (1,300/mo).
  4. Mantener "Rutina de calistenia en el parque" existente.
- **FAQ ampliada**: ¿Qué barras hay en un parque de calistenia? · ¿Cuánto miden las barras? · ¿Necesito barras propias? · ¿Diferencia parque de barras vs parque de calistenia? · ¿Hay parques de calistenia gratis? · ¿Mejor parque o casa para empezar?
- **Schema**: añadir `ItemList` (tipos de barras) + `BreadcrumbList`. FAQPage ya está.
- Enlace interno cruzado a `/rutina-calistenia-en-casa/` y a `/rutina-espalda-calistenia/`.

## 6. Sprint 2 — diseño del mini-directorio de parques (sólo doc, no se implementa ahora)

Idea: nueva ruta `/parques-calistenia/[ciudad]` generada estáticamente para 8-10 ciudades (Madrid, Barcelona, Valencia, Sevilla, Bilbao, Zaragoza, Málaga, Murcia, Palma, Granada). Cada página:

- H1 `Parques de calistenia en {Ciudad}`.
- Intro 2 párrafos (qué encontrarás, distritos top).
- Lista de 5-10 parques (nombre, dirección breve, link Google Maps, tipo de barras destacadas).
- Tabla resumen + JSON-LD `ItemList` con cada parque como `SportsActivityLocation`.
- Link a `/calistenia-en-parque/` como hub.
- Datos cargados desde una nueva tabla `public_parks` (ciudad, nombre, lat/lng, tipos_barra[], maps_url, foto opcional) → admin CRUD reutilizando el patrón de ExercisesManager.
- Hub `/calistenia-en-parque/` añade un H2 "Parques de calistenia por ciudad" con grid de 10 cards enlazando a cada subpágina.

Captura el clúster local: "parque calistenia madrid/barcelona/valencia…" (cada uno 100-700/mo) y refuerza "parque de barras cerca de mi" (1,300/mo).

## 7. Orden de ejecución del Sprint 1

```text
1. Migration: ALTER exercises + nueva policy RLS pública
2. Seed: insert/update ejercicios espalda canónicos con is_public_seo=true
3. Hook usePublicExercises + componente <ExercisesTable />
4. Refactor RutinaEspalda.tsx (eliminar gym, nuevos H2, montar tabla)
5. Refactor CalisteniaParque.tsx (H2 "Tipos de barras", "Qué es", "Cómo encontrar", FAQ ampliada, ItemList schema)
6. Ampliar ExercisesManager admin con campos SEO
```

¿Apruebo y arranco?
