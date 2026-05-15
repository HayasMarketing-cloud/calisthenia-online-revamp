## Análisis Semrush · /programas/base/

### Keywords YA ocupadas por otras URLs (evitar como principales)

Confirmado vía Semrush domain_analysis (database `es`):

| Keyword principal | URL que ya la posee |
|---|---|
| calistenia online | `/` |
| calistenia en casa / rutina calistenia en casa | `/rutina-calistenia-en-casa/` |
| calistenia en parque(s) / barras de parques | `/calistenia-en-parque/` |
| calistenia para principiantes / rutina full body principiante | `/calistenia-para-principiantes/` y `/la-mejor-rutina-...-fullbody-principiantes/` |
| rutina core calistenia | `/rutina-core-calistenia/` |
| ejercicios espalda calistenia | `/rutina-espalda-calistenia/` |
| calistenia mujeres | `/calistenia-para-mujeres/` |
| que es calistenia | `/blog/que-es-la-calistenia/` |

### Hueco real para BASE (datos Semrush · es)

El ángulo libre es **iniciación guiada para adultos +30, sedentarios, recuperar movilidad y fuerza funcional** — distinto de "calistenia para principiantes" (que es informacional). Volúmenes verificados:

| Keyword candidata | Vol. | KDI | Estado |
|---|---|---|---|
| como empezar calistenia | 70/mo | 21 (easy) | libre |
| calistenia desde cero | 40/mo | 28 (easy) | libre |
| rutina de movilidad | 110/mo | 24 (easy) | libre |
| movilidad articular | 1.900/mo | low | libre |
| entrenamiento funcional para principiantes | 40/mo | 0 | libre |
| calistenia iniciacion | 20/mo | 0 | libre |
| calistenia funcional | 20/mo | 0 | libre |
| calistenia para sedentarios | 10/mo | 0 | libre, alta intención |
| recuperar movilidad | 10/mo | 0 | libre, alta intención |
| plan de calistenia | 20/mo | 0 | libre |
| programa calistenia principiantes | 20/mo | 0 | libre (long-tail comercial) |

Volúmenes individuales bajos, pero **suma agregada y alta intención comercial**; perfecto para una landing de programa de pago.

---

### Propuesta de estructura H1/H2/H3

**Meta title (≤60 chars):**
`Programa de Calistenia desde Cero | Iniciación +30 Online`

**Meta description (≤160):**
`Programa BASE: 12 semanas de calistenia desde cero online para mayores de 30, sedentarios o sin experiencia. Recupera movilidad y fuerza funcional con Nico.`

**H1 (único):**
`Programa de calistenia desde cero para volver a moverte con fuerza`
— combina "calistenia desde cero" (40/mo, KDI 28) + intención emocional.

**H2 (uno por sección, en este orden):**

1. `Cómo empezar calistenia si llevas años sin entrenar` — captura "como empezar calistenia" (70/mo).
2. `Para quién es este programa de iniciación a la calistenia` — refuerza "calistenia iniciacion" + audiencia.
3. `Calistenia funcional para sedentarios y mayores de 30` — long-tail "calistenia para sedentarios" + "calistenia funcional".
4. `Recupera movilidad articular y fuerza desde el primer día` — "movilidad articular" (1.900/mo) + "recuperar movilidad".
5. `Cómo funciona el plan de calistenia de 12 semanas` — "plan de calistenia" (20/mo) + diferenciador temporal.
6. `Entrenamiento funcional para principiantes paso a paso` — "entrenamiento funcional para principiantes" (40/mo).
7. `Qué incluye el programa BASE` — marca + features (no SEO, comercial).
8. `Preguntas frecuentes sobre el programa de iniciación`

**H3 (apoyo dentro de cada H2):**

- Bajo H1: `Sin gimnasio, sin material, sin experiencia previa`
- Bajo H2.1: `Evaluación inicial`, `Llamada de onboarding`, `Plan adaptado a tu nivel real`
- Bajo H2.3: `Sedentarios y teletrabajadores`, `Personas +30 que vuelven a entrenar`, `Sobrepeso o molestias de espalda`
- Bajo H2.4: `Rutina de movilidad guiada` (captura "rutina de movilidad", 110/mo), `Fuerza funcional progresiva`, `Hábitos sostenibles`
- Bajo H2.5: `Semana 1-4: base y movilidad`, `Semana 5-8: fuerza funcional`, `Semana 9-12: control y resistencia`
- Bajo H2.6: `Ejercicios fundamentales`, `Progresiones por nivel`, `Revisión técnica por WhatsApp`

### Reglas de canibalización

- **NO usar** en H1/H2: "calistenia en casa", "calistenia en parque", "calistenia para principiantes", "rutina core", "rutina full body", "calistenia para mujeres", "qué es calistenia".
- Si necesitas mencionarlas en el cuerpo, hazlo como **enlace interno** hacia la URL que ya posiciona (refuerza arquitectura, no compite).

### Notas técnicas

- Mantener un único `<h1>` (la versión actual cumple).
- Cambiar el copy emocional actual del H1 ("Vuelve a sentirte ágil…") por la variante con keyword o, si quieres conservar el tono, ponerlo como `<p>` lead y subir el H2.1 a H1.
- Schema `Course` ya está presente — añadir `audience.audienceType: "Adultos +30 sedentarios o sin experiencia"` para alinear con la semántica de las nuevas keywords.
- Actualizar `og:title` para reflejar el nuevo title.

### Qué implementar si apruebas

1. Editar `<title>`, `<meta description>`, `og:title`/`og:description` en `src/pages/programas/Base.tsx`.
2. Reescribir el H1 y los 8 H2 con la lista de arriba.
3. Añadir/reordenar los H3 indicados dentro de las secciones existentes (mismo contenido, nuevos encabezados).
4. Añadir `audienceType` al `courseSchema`.
5. Añadir 2-3 enlaces internos contextuales hacia `/calistenia-para-principiantes/`, `/rutina-calistenia-en-casa/` y `/blog/que-es-la-calistenia/` desde el cuerpo (no desde H2).

Fuente de datos: Semrush (database `es`), keyword_compare + keyword_research + domain_analysis sobre calisthenia.online.
