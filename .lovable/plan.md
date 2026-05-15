## Contexto

Página actual: 13 secciones, 1.401 líneas, posición #20 para "rutina calistenia en casa" (390/mo). Datos Semrush (DB es):

| Keyword objetivo | Volumen | KDI | Estado |
|---|---|---|---|
| calistenia en casa | 4.400/mo | 49 | sin H2 propio |
| ejercicios calistenia en casa | 1.000/mo | 45 | sin H2 propio |
| rutina calistenia en casa | 390/mo | 36 | H1 cubre |
| calistenia en casa principiantes | 140/mo | 38 | parcial |
| tabla calistenia en casa | 90/mo | 26 | cubierto (nuevo) |
| que es la calistenia | 1.900/mo | 06 | parcial |

Problemas: 4 pares de secciones duplicadas, ejercicios sin H3 (usan span), H2 actuales sin keywords exactas, ritmo visual monotono.

## Nueva jerarquia H2/H3 (basada en Semrush)

```text
H1  Calistenia en Casa: Rutina Completa sin Equipamiento
H2  Que es la calistenia en casa y por que funciona       [4.400 + 1.900/mo]
H2  Beneficios de entrenar calistenia en casa             [refuerzo semantico]
H2  Calentamiento y prevencion de lesiones                [fusion #5+#11]
H2  Ejercicios de calistenia en casa para principiantes   [1.000 + 140/mo]
    H3  Sentadillas (squats) en casa
    H3  Flexiones (push-ups) sin material
    H3  Plancha (plank) y variantes
    H3  Zancadas (lunges) en espacio reducido
    H3  Mountain climbers para core y cardio
    H3  Bird-dog para estabilidad lumbar
    H3  Pike push-ups (camino al HSPU)            (nuevo)
    H3  Remo invertido con mesa o toalla          (nuevo)
H2  Tabla de rutina de calistenia en casa                 [90/mo, ya hecho]
H2  Plan de calistenia en casa: progresion 4 semanas      [absorbe #9+#10]
    H3  Semana 1 - Adaptacion y tecnica
    H3  Semana 2 - Volumen
    H3  Semana 3 - Intensidad
    H3  Semana 4 - Descarga y test
H2  Videos de calistenia en casa
H2  Preguntas frecuentes sobre calistenia en casa
H2  Empieza con un plan personalizado (CTA -> trial)
```

Total: 9 H2 + 12 H3 nuevos.

## Fase 1 - Jerarquia H2/H3 + reescritura de titulos

Riesgo bajo, ganancia SEO inmediata, sin tocar layout.

- Reescribir los 13 H2 actuales segun la tabla (incluir keyword exacta).
- Convertir los 6 titulos de ejercicios (span dentro de AccordionTrigger) a h3 semanticos manteniendo estilo visual.
- Anadir id a cada H2 para anclas (TOC fase 5).
- Actualizar title y meta description para incluir "ejercicios" y "principiantes".

Ficheros: src/pages/RutinaCasa.tsx.

## Fase 2 - Deduplicacion de secciones (13 -> 8)

| Accion | Origen | Destino |
|---|---|---|
| Fusionar | "Por que entrenar en casa" + "Que es calistenia en casa" + "Beneficios" | Que es la calistenia en casa + Beneficios (2 H2 limpios) |
| Fusionar | "Preparacion" + "Prevencion de lesiones" | Calentamiento y prevencion de lesiones (warm-up + cool-down + senales) |
| Fusionar | "Como disenar tu rutina semanal" + "Progresion sin equipamiento" | Plan 4 semanas (Fase 4) |

Resultado: ~−400 lineas de JSX duplicado, misma cobertura lexica.

## Fase 3 - Tarjetas-coach por ejercicio

Rediseñar el accordion con campos de coach reales:

```text
H3  Nombre (ES + EN)
    Tecnica (5 puntos clave)
    Series x reps recomendadas
    Musculos trabajados
    Regresion (como empezar mas facil)   (nuevo)
    Progresion (siguiente paso)           (nuevo)
    Errores comunes
```

Anadir 2 ejercicios: Pike push-ups (hombros / camino HSPU) y Remo invertido (traccion, falta clamoroso). Total 8 ejercicios.

## Fase 4 - Plan progresivo 4 semanas

Sustituye las 2 secciones de planificacion duplicadas por un bloque con Tabs:

```text
Semana 1 - Adaptacion        ->  3 dias, RIR 3, foco tecnica
Semana 2 - Volumen           ->  4 dias, RIR 2, +1 serie
Semana 3 - Intensidad        ->  4 dias, RIR 1, progresiones duras
Semana 4 - Descarga + test   ->  3 dias suaves + test max reps
```

Cada tab: mini-tabla + parrafo "que buscamos". Cubre "plan calistenia en casa" + "calistenia en casa principiantes".

Schema: extender ExercisePlan con 4 fases (hasPart con sub-planes semanales).

## Fase 5 - Ritmo visual y navegacion

Romper la monotonia de 8 secciones py-20 bg-muted/30 sin tocar contenido:

- TOC sticky en desktop (sidebar fina derecha, anclas a los 9 H2). Crear RoutineTOC.tsx hermano de RoutineBreadcrumbs.
- Chips horizontales scrollables en movil (sticky tras hero), reutilizar FilterChip.
- Hero compacto: 3 KPIs sobre la imagen (dias/semana, min/sesion, equipamiento = 0).
- Tabla full-bleed con border-y bg-card.
- Patron de fondos ampliado: bg-background, bg-muted/30, bg-gradient-to-b from-primary/5.

## Fase 6 - CTA a area privada (lead magnet, sustituye al PDF)

- Banner sticky inferior en movil: "Plan personalizado en tu area privada - prueba gratis" -> /auth?next=/app/onboarding.
- Bloque CTA tras la tabla y antes del FAQ: valor del trial (rutina adaptada, seguimiento, videos guiados).
- Reutilizar DualCTA o crear TrialCTA especifico.
- En ExercisePlan schema anadir offers con price: "0" + category: "Trial".

Pendiente confirmar: la ruta /app/onboarding ya existe segun memoria del proyecto; se usa esa.

## Orden de ejecucion

```text
Fase 1  ->  Fase 2  ->  Fase 3  ->  Fase 4  ->  Fase 5  ->  Fase 6
(H2/H3)    (dedup)    (coach)   (4 sem)    (visual)   (trial CTA)
```

Cada fase es independiente y desplegable por separado. Empezamos por Fase 1 (max ratio impacto/esfuerzo SEO) y Fase 2 para limpiar el terreno antes de las creativas.

## Detalles tecnicos

- Cambios concentrados en src/pages/RutinaCasa.tsx; nuevos RoutineTOC.tsx (Fase 5) y posible TrialCTA.tsx (Fase 6).
- Schemas existentes intactos; solo se amplia ExercisePlan en Fase 4 (sub-planes semanales) y Fase 6 (offers trial).
- Sin nuevas dependencias npm. Se usan Tabs, Accordion, Table ya disponibles en src/components/ui/.
- Espanol de Espana, tokens semanticos del design system.

## Resultado esperado

- Pagina 13 -> 8/9 secciones, ~400 lineas menos.
- 9 H2 con keywords exactas Semrush + 12 H3 nuevos.
- Cobertura lexica de 6 keywords objetivo (~6.000 busquedas/mes acumuladas).
- Lead magnet integrado en la app (trial) en lugar de PDF.
- Posicion esperada 4-8 semanas: #20 -> top 10 para "rutina calistenia en casa", primeras posiciones para "tabla calistenia en casa" (KDI 26).
