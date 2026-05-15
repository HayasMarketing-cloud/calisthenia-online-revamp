## Nueva página: /programas/base

Landing dedicada al **Programa BASE (12 semanas)** — programa de **introducción** al entrenamiento con peso corporal. Reutiliza la plantilla y patrones visuales de `Coaching.tsx` (la página más sólida del proyecto). Se diferencia claramente de CONTROL: BASE es para empezar, CONTROL es para "volver a entrenar".

### Posicionamiento corregido

BASE NO es "vuelve a entrenar" (eso es CONTROL). BASE es el **primer escalón**, dirigido a:

- Personas +30 años
- Sedentarios y teletrabajadores
- Personas con sobrepeso
- Gente que **nunca ha entrenado**
- Personas con poca movilidad o molestias corporales
- Personas que quieren empezar sin lesionarse

Promesa central: **"Volver a sentirse ágil, fuerte y en forma sin necesidad de gimnasio."** (transformación de cansancio/rigidez/poca fuerza → movilidad/postura/energía/capacidad funcional).

### Mejoras al contenido del equipo

1. **Hero reescrito** (el original mezclaba "volver a entrenar" → confunde con CONTROL):
   - Eyebrow: `PROGRAMA BASE · 12 semanas · Online`
   - H1: **"Vuelve a sentirte ágil, fuerte y en forma — sin pisar un gimnasio"**
   - Subheadline: *"Programa de iniciación a la calistenia para personas +30, sedentarias o sin experiencia previa. Recupera movilidad, gana fuerza funcional y construye hábitos sostenibles con seguimiento personalizado."*
   - Bullets (6): entrena desde casa o donde quieras · adaptado a tu punto de partida · sin experiencia previa · seguimiento personalizado · revisión técnica por WhatsApp · sesiones de 30-45 min
2. **Sección "Para quién es" elevada** con los 7 perfiles (+30, sedentarios, teletrabajadores, sobrepeso, sin experiencia, con molestias, principiantes) — bloque visual con iconos.
3. **Sección "Problemas que resuelve"** (rigidez, falta de energía, dolor de espalda/cuello, sedentarismo, sobrepeso, pérdida de fuerza, falta de hábito, baja movilidad) — chips/tags visuales.
4. **Sección "Transformación"** con bloque visual *De → A* (cansancio/rigidez/poca fuerza/mala condición → movilidad/postura/energía/capacidad funcional).
5. **Bloque EVALUACIÓN INICIAL destacado** (alto valor percibido): card grande con los 5 puntos analizados (nivel, objetivos, experiencia, movilidad, condición) + 3 vías (formulario / llamada onboarding / fotos-vídeos opcionales).
6. **Bloque NICO reforzado como cara visible** (foto grande, bio + frase ancla *"moverte mejor, ganar fuerza real, mejorar tu condición física y construir hábitos sostenibles"*) — porque en fitness online la confianza convierte.
7. **Material necesario** convertido en 3 iconos visuales (Casa / Parque / Gimnasio) + nota sobre bandas elásticas.
8. **Fusión Sección 4 + 9** (Para ti si… / Vas a conseguir…) en 2 columnas para reducir scroll.
9. **Continuidad (sección 10)** con 2 cards enlazadas: → CONTROL (siguiente paso natural) y → ELITE (avanzado), preparando el upsell.
10. **Testimonios** (2-3) reusando los assets de `Coaching.tsx` (Raúl, Charlie, Isabel).
11. **FAQ con JSON-LD FAQPage** + **Course schema** (educationalLevel: Principiante) + **BreadcrumbList**.

### Estructura final de la página

```
Header
├── Breadcrumb (Inicio › Programas › BASE)
├── HERO (eyebrow + H1 reescrito + subheadline + 6 bullets + 2 CTAs)
├── PARA QUIÉN ES (7 perfiles con iconos)
├── PROBLEMAS QUE RESUELVE (8 chips visuales)
├── TRANSFORMACIÓN (bloque De → A)
├── QUÉ ES BASE (texto + 5 pilares de las 12 semanas)
├── CÓMO FUNCIONA (4 pasos con iconos)
├── EVALUACIÓN INICIAL (bloque destacado, alto valor percibido)
├── QUÉ INCLUYE (lista grande con checks)
├── MATERIAL NECESARIO (3 iconos: Casa / Parque / Gimnasio)
├── Testimonios (3 cards)
├── SOBRE NICO (foto + bio + frase ancla)
├── CONTINUIDAD (cards → CONTROL / → ELITE)
├── FAQ (Accordion + JSON-LD FAQPage)
├── CTA FINAL (banner con 2 CTAs)
Footer
```

### Detalles técnicos

- **Archivo nuevo**: `src/pages/programas/Base.tsx`.
- **Ruta en `src/App.tsx`**: `<Route path="/programas/base/" element={<Base />} />` (barra final, coherente con el resto).
- **Helmet**: title `Programa BASE de Calistenia | Iniciación 12 semanas | Calisthenia Online`, description optimizada (<160), canonical `https://calisthenia.online/programas/base/`, og:* completos.
- **JSON-LD**: `Course` (Principiante) + `FAQPage` + `BreadcrumbList` mediante `StructuredData` y helpers de `src/lib/schemas.ts`.
- **Prerender SEO**: añadir `/programas/base/` a `src/lib/prerender-routes.ts` para sitemap y prerender estático.
- **Header**: componente existente (ya optimizado). No tocar navegación principal en este scope.
- **Diseño**: solo tokens semánticos (`bg-background`, `text-primary`, `bg-card`, etc.), nada hardcodeado. Hover WhatsApp `#25D366`.
- **WhatsApp**: reusar patrón `WhatsAppIcon` + `buildWhatsAppUrl` de `Coaching.tsx` con mensaje específico de BASE.
- **Idioma**: español de España (sin voseo).

### Pregunta antes de implementar

¿El **CTA "Reservar llamada de onboarding"** debe usar el mismo formulario GHL que `/programa-cuerpo-atletico-en-casa/` (formId `sbWhGZBx1i4npEeAZgKy`) o tienes uno específico para BASE? Si no me dices nada, reutilizo el mismo y lo dejo en una constante al inicio del archivo para cambiarlo en 1 línea.
