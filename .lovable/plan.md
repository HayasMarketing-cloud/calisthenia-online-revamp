
# Plan: Completar Fases 4-6 + ajustes visuales en `/rutina-calistenia-en-casa/`

Continuamos el plan progresivo de SEO/UX en `src/pages/RutinaCasa.tsx`. Las Fases 1-3 ya están aplicadas (H2/H3 con keywords Semrush, deduplicación de secciones, tarjetas de ejercicios con regresión/progresión).

## Fase 4 — Plan progresivo de 4 semanas con Tabs

**Sección objetivo:** `#planificacion` (línea ~1200, "Plan de calistenia en casa: progresión 4 semanas").
Ahora muestra texto estático genérico. Lo sustituimos por un `<Tabs>` (shadcn) con 4 pestañas: **Semana 1 · Adaptación**, **Semana 2 · Volumen**, **Semana 3 · Intensidad**, **Semana 4 · Deload**.

Cada pestaña incluye:
- Objetivo de la semana (1 frase) + RPE diana.
- Tabla resumida (3-4 ejercicios canónicos: sentadillas, flexiones, remo invertido, plancha) con `series × reps × descanso`.
- Nota técnica del coach (1-2 líneas).

**Schema:** extender `ExercisePlan` (JSON-LD) que ya inyectamos para incluir `hasPart` con 4 `ExercisePlan` semanales (`exerciseType`, `repetitions`, `restPeriods`, `workload`). Esto desbloquea rich snippet "HowTo / Course".

Archivos: `src/pages/RutinaCasa.tsx` (sección + componente extraído `WeeklyPlanTabs.tsx` en `src/components/seo/`), `src/components/seo/StructuredData.tsx` (extensión schema).

## Fase 5 — TOC sticky + ritmo visual

1. **Sticky TOC en desktop:** nuevo componente `<StickyTOC items={[{id,label}]}/>` posicionado `lg:sticky lg:top-24` en columna lateral derecha (solo `lg:`). Resalta sección activa con `IntersectionObserver`. En mobile: chips horizontales con scroll, sticky bajo el header (`top-16`), ocultos al hacer scroll abajo.
2. **Ritmo visual / contraste de fondos** (responde a tu petición):
   - Hoy hay dos secciones consecutivas con `bg-muted/30` (líneas 267 y 318) → rompe la alternancia.
   - Definir 3 superficies en lugar de 2:
     - `bg-background` (default)
     - `bg-muted/40` (ligeramente más marcado que el actual `/30`)
     - `bg-gradient-to-b from-primary/5 via-background to-background` para la sección estrella (Tabla rutina) y CTA trial.
   - Aplicar alternancia estricta: que-es → muted, beneficios → background, calentamiento → muted, ejercicios → background, vídeos → muted, tabla-rutina → gradient, planificacion → muted, progresion → background, faq → muted, cta-trial → gradient primary.
3. **Reducir whitespace vertical** (responde a tu petición):
   - `py-20 md:py-24` → `py-12 md:py-16` en todas las secciones.
   - Quitar márgenes redundantes del primer/último hijo (`mb-12` del H2 → `mb-8`; eliminar `mt-*` del último bloque cuando la sección ya tiene padding inferior).
   - Hero: `py-20 md:py-28` → `py-12 md:py-20`.
4. **Separadores sutiles** entre secciones del mismo tono (border-top `border-border/40` 1px) para que el cambio se perciba aunque el fondo sea similar.

## Fase 6 — CTA al área privada como lead magnet trial

**Sección objetivo:** `#cta-trial` (línea ~1448) y secundario tras la tabla de rutina.

- Reescribir copy: "Empieza tu plan personalizado gratis · 7 días de acceso al área privada".
- Bullets de valor: rutina adaptada a tu nivel, seguimiento de progreso, vídeos paso a paso del coach.
- CTA primario `Empezar prueba gratuita` → `/auth?next=/app/onboarding&utm_source=rutina-casa&utm_medium=cta-trial`.
- CTA secundario "Ya tengo cuenta" → `/auth`.
- Card central con `bg-gradient-to-br from-primary/10 to-background`, badge "Sin tarjeta · Cancela cuando quieras".
- Insertar **mini-CTA inline** después de la sección "Tabla rutina" (banner una línea con botón) para captar usuarios que no llegan al final.
- Schema: añadir `Offer` (price 0, priceValidUntil 7 días) anidado al `Course`.

Sin modificaciones de auth ni de rutas (`/auth?next=...` ya soportado).

## Detalles técnicos

- Componentes nuevos: `src/components/seo/WeeklyPlanTabs.tsx`, `src/components/seo/StickyTOC.tsx`, `src/components/seo/TrialCTA.tsx`.
- `RutinaCasa.tsx`: importar los 3 + ajustar grid global a `lg:grid-cols-[1fr_240px]` para acomodar el TOC sticky (solo en secciones de contenido, hero y CTA quedan full-width).
- Tokens HSL: usar `--primary`, `--muted`, `--border` existentes; no introducir colores nuevos.
- Sin migración SQL ni cambios de backend.
- Verificación: capturar el preview tras los cambios y revisar (a) alternancia de fondos, (b) que el TOC sticky no tape el header, (c) que las 4 tabs se ven en mobile.

## Orden de ejecución

1. Reducir `py-*` y arreglar alternancia de fondos (Fase 5 visual base).
2. Crear `WeeklyPlanTabs` + integrar (Fase 4).
3. Extender JSON-LD `ExercisePlan` (Fase 4 schema).
4. Crear `StickyTOC` + integrar layout (Fase 5 TOC).
5. Crear `TrialCTA` + reemplazar `#cta-trial` + mini-CTA inline (Fase 6).
6. QA en preview.
