
## Objetivo
Llevar el estilo del hero recién implementado en la home a la página `/rutina-calistenia-en-casa/` y mejorar la jerarquía y el ritmo visual del resto de secciones.

## 1. Nuevo hero (estilo Home)

Reemplazar el hero actual (centrado, icono + h1 + p sobre fondo difuminado) por uno alineado a la izquierda con el mismo lenguaje que `HeroSectionImproved.tsx`:

- Imagen `entrena-casa.jpg` como `<img>` con `object-cover`, `fetchPriority="high"`.
- Doble overlay: `bg-gradient-to-r from-secondary via-secondary/85 to-secondary/30 md:via-secondary/70` + `bg-gradient-to-t from-secondary via-transparent to-transparent`.
- Contenedor `max-w-3xl` alineado a la izquierda, padding `py-20 md:py-28`, `min-h-[600px] lg:min-h-[80vh]`.
- Eyebrow badge: punto naranja pulsante + texto `RUTINA EN CASA · SIN MATERIAL`.
- H1 `font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-white`, con palabra clave en gradiente primary→accent: "Rutina de calistenia <gradient>en casa</gradient>".
- Subtítulo en `text-gray-300 max-w-2xl`: "Entrena desde cualquier lugar sin material. Tu cuerpo es tu gimnasio: rutinas, ejercicios y planificación semanal para empezar hoy mismo."
- 2 CTAs: primario "Ver rutina completa" → `#video-rutina` con `ArrowRight`; secundario outline glassmorphism "Encuentra tu nivel" → `#planificacion` con `ChevronDown`.
- Quitar el `<Home>` icono central (queda integrado en el badge si hace falta).

Los breadcrumbs se mantienen justo debajo del hero como ahora.

## 2. Refinamientos de maquetación

**Ritmo de secciones:** unificar a `py-20 md:py-24` (en lugar del `py-16` actual) y alternar fondos `bg-background` ↔ `bg-muted/30` de forma estricta para crear ritmo claro.

**Headers de sección consistentes:** todos los `<h2>` con eyebrow opcional + título display + lead centrado max-w-2xl. Patrón:
```
<eyebrow chip color primary/10>
<h2 display, palabra clave en text-primary>
<p lead text-muted-foreground>
```
Aplicar resaltado de palabra clave en naranja en los h2 actuales (igual que la home: "¿Por qué entrenar en casa?" → "casa" en `text-primary`).

**"¿Por qué entrenar en casa?":** sustituir los 3 `CheckCircle` repetidos por iconos diferenciados (`Home`, `Clock`, `Wallet` o `PiggyBank`) en contenedor `w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20` para alinearlo con el lenguaje duotone de los iconos calistenia ya creados.

**"Beneficios" (6 cards):** mantener cards pero:
- Mover el icono al mismo contenedor `bg-primary/10 border border-primary/20 rounded-2xl w-14 h-14` arriba.
- Reducir padding del CardHeader y dar `gap-4` consistente.
- Hover: `hover:-translate-y-1 hover:border-primary/30 transition-all`.

**Bloque "¿Qué es la calistenia en casa?":** quitar la Card que envuelve (rompe el ritmo de un único bloque centrado). Pasar a un layout de prosa centrado max-w-3xl + un callout `Diferencia vs Gimnasio` como aside lateral en desktop (grid 2 cols 60/40).

**"Preparación / Calentamiento":** la Card grande con 3 sub-cards funciona bien; igualar paddings (`p-6`) y añadir números 1·2·3 en cada sub-card como en "Estructura de una sesión efectiva" para coherencia.

**"Ejercicios básicos" (Accordion):** sustituir los emojis por los iconos lucide ya existentes a tamaño w-6 h-6 con color primary; trigger con badge `Principiante / Intermedio / Avanzado` a la derecha.

**"Planificación semanal":** las 3 columnas de niveles ya están bien; añadir borde superior coloreado (`border-t-4`) con tono progresivo (primary/40, primary/70, primary) para reforzar la progresión visual de niveles.

**"Progresión sin equipamiento":** está bien; solo armonizar tamaños de icono (w-10 → w-12) y añadir numeración 01-05 como detalle tipográfico de gran tamaño en `text-primary/20` detrás del título.

**FAQ:** ya está alineada con el patrón de la home, sin cambios.

**CTA final:** ampliar a `max-w-4xl`, fondo con `bg-gradient-to-br from-secondary via-secondary to-primary/20`, texto blanco y botón primario sólido más grande (igual al CTA del hero) para cerrar la página con fuerza.

## 3. Detalles técnicos

- Archivo a editar: `src/pages/RutinaCasa.tsx`.
- Imports adicionales: `Wallet`, `Sparkles` de `lucide-react` si se usan en el bloque "Por qué".
- Reutilizar tokens semánticos (`primary`, `secondary`, `muted-foreground`, `accent`); nada hardcodeado.
- Mantener intactos schemas JSON-LD, Helmet/SEO, breadcrumbs, FAQs (solo se ajusta el JSX).
- Responsive: validar en mobile (839px y 375px) que el hero respira y los CTAs apilan en columna.

## 4. Verificación

1. Build pasa.
2. Navegar a `/rutina-calistenia-en-casa/` en preview, comprobar hero y ritmo de secciones en desktop y mobile.
3. Confirmar que el botón "Ver rutina completa" hace scroll a `#video-rutina` y "Encuentra tu nivel" a `#planificacion` (añadir id a la sección de "Planificación semanal").

## Fuera de alcance
- No tocar contenido textual de FAQs ni de cards (solo el resaltado tipográfico de los h2).
- No reemplazar la imagen `entrena-casa.jpg`.
- No modificar el componente `HeroSectionImproved` de la home.
