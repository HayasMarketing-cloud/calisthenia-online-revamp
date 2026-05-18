## Objetivo

Reforzar la intención de búsqueda de la keyword principal de cada página en los H2/H3, sin canibalizar las otras URLs de la web (espalda, parque, core, principiantes, full body, abdominales, brazos, piernas, casa).

## Reglas que aplico

- 1 H1 por página (ya optimizado, no se toca).
- La keyword principal aparece **literal o en variante muy cercana** en al menos 3 H2 de cada página, repartida (no toda al inicio).
- En el resto de H2/H3 uso variantes semánticas (sinónimos, long-tails de intención informacional) para cubrir más SERP sin repetir.
- **Cero canibalización**: si un H2 va a contener "espalda", "parque" o "core" como sustantivo principal, solo lo dejo en la página que rankea para esa keyword. En las otras, lo enlazo (interno) en lugar de titularlo.
- H3 de ejercicios concretos (Dominadas, Plancha, Bird Dog…) se mantienen, son entidades.

---

## 1) `/rutina-espalda-calistenia/` — keyword: **ejercicios de espalda calistenia** (140/mo)

H2 actuales → propuestos:

| # | Actual | Propuesto | Motivo |
|---|---|---|---|
| 1 | Tabla completa de ejercicios de espalda calistenia | *(sin cambios)* | Ya contiene keyword exacta |
| 2 | Ejercicios de espalda en casa sin material | *(sin cambios)* | Variante long-tail útil |
| 3 | Ejercicios de espalda con barra: dominadas y remo invertido | **Ejercicios de espalda calistenia con barra: dominadas y remo invertido** | Añade keyword exacta |
| 4 | Cómo entrenar dorsales en casa con calistenia | **Cómo entrenar dorsales con calistenia (en casa y en parque)** | Quita "casa" duplicada, expande intención |
| 5 | Rutina de espalda calistenia para principiantes | **Rutina con ejercicios de espalda calistenia para principiantes** | Conecta rutina↔ejercicios sin canibalizar `/calistenia-principiantes/` |
| 6 | Programación semanal: cuántos días, series y repeticiones | **Programación semanal de ejercicios de espalda: días, series y repeticiones** | Refuerza entidad |
| 7 | Errores comunes al entrenar la espalda en calistenia | *(sin cambios)* | OK |
| 8 | Preguntas frecuentes sobre ejercicios de espalda calistenia | *(sin cambios)* | Keyword exacta |
| 9 | 📹 Vídeos de entrenamiento de espalda | **📹 Vídeos de ejercicios de espalda calistenia** | Refuerzo |
| 10 | Construye una espalda en V solo con calistenia | *(sin cambios)* | CTA, OK |

---

## 2) `/calistenia-en-parque/` — keyword: **calistenia parque** (480/mo)

| # | Actual | Propuesto | Motivo |
|---|---|---|---|
| 1 | Por Qué Entrenar en Parques | **Por qué entrenar calistenia en el parque** | Añade keyword |
| 2 | Qué es un parque de calistenia | *(sin cambios)* | Variante semántica fuerte |
| 3 | Tipos de barras de parques de calistenia | **Tipos de barras en un parque de calistenia** | Singular = más cerca de la keyword |
| 4 | Cómo encontrar un parque de calistenia cerca de ti | *(sin cambios)* | Long-tail de intención local |
| 5 | Beneficios de Entrenar en Parques de Calistenia | **Beneficios de la calistenia en el parque** | Keyword exacta |
| 6 | Cómo Empezar en Calistenia en Parques | **Cómo empezar a hacer calistenia en el parque** | Más natural + keyword |
| 7 | Ejercicios Esenciales para Empezar | **Ejercicios esenciales de calistenia en parque para empezar** | No canibaliza `/rutina-espalda-calistenia/` ni guías de ejercicios; intención local |

H3 de los Cards (Aire Libre, Equipamiento Completo, Comunidad…) → se quedan: son atributos, no compiten.

---

## 3) `/rutina-core-calistenia/` — keyword: **rutina core calistenia** (40) + **rutina core** (390)

Riesgo: H2 actuales repiten mucho "core" pero pocas veces "rutina core". Refuerzo intención de rutina sin canibalizar `/rutina-abdominales-calistenia/`.

| # | Actual | Propuesto | Motivo |
|---|---|---|---|
| 1 | La importancia de un core fuerte en tu entrenamiento | **Por qué necesitas una rutina de core en tu entrenamiento** | Inyecta "rutina de core" |
| 2 | Core Ejercicios: Fortalece tu Centro Paso a Paso | **Ejercicios de la rutina de core: fortalece tu centro paso a paso** | Conecta ejercicios↔rutina |
| 3 | Planificación Semanal de Core Funcional | **Rutina de core semanal: planificación paso a paso** | Keyword exacta + intención plan |
| 4 | Qué es el Core: Más que Abdominales Visibles | *(sin cambios)* | Diferenciador vs abdominales — evita canibalizar `/rutina-abdominales-calistenia/` |
| 5 | Maximiza tus Resultados en el Entrenamiento de Core | **Maximiza los resultados de tu rutina de core** | Keyword |
| 6 | Técnica Correcta en Ejercicios de Core | *(sin cambios)* | OK, variante |
| 7 | Variaciones y Ejercicios Complementarios | **Variaciones avanzadas de la rutina de core y ejercicios complementarios** | Keyword + nivel |
| 8 | Preguntas Frecuentes sobre Entrenamiento de Core | **Preguntas frecuentes sobre la rutina de core con calistenia** | Long-tail completo |
| 9 | Fortalece tu Core y Mejora tu Rendimiento *(CTA)* | *(sin cambios)* | OK |

---

## Cobertura final por página

- **Espalda**: "ejercicios de espalda calistenia" en 5 H2 (1, 3, 5, 8, 9) + variantes en el resto. Sin canibalizar core/parque.
- **Parque**: "calistenia parque / calistenia en el parque / parque de calistenia" en 6 H2. Sin canibalizar espalda/core.
- **Core**: "rutina de core" en 6 H2; "calistenia" como modificador solo en FAQ y CTA → no canibaliza `/rutina-abdominales-calistenia/` ni `/rutina-full-body/`.

## Detalles técnicos

- Cambios solo de texto dentro de etiquetas `<h2>`/`<h3>` en:
  - `src/pages/RutinaEspalda.tsx`
  - `src/pages/CalisteniaParque.tsx`
  - `src/pages/RutinaCore.tsx`
- Mantengo el `<span className="text-primary">…</span>` envolviendo la parte con la keyword principal cuando ya existía (para conservar el estilo de highlight).
- No toco H1, meta, OG, schema, ni componentes compartidos.
- Tras los cambios, verificación rápida: `rg "<h2|<h3"` en los tres ficheros para confirmar jerarquía intacta.
