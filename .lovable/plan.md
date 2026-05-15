## Objetivo

Reemplazar los iconos actuales de las secciones **"¿Qué estás buscando?"** y **"Beneficios"** de la home por una nueva línea **duotone calistenia**: iconos SVG con trazo principal en color primary (naranja) y un trazo/relleno secundario más tenue, sobre un contenedor cuadrado con esquinas redondeadas. Más diferencial, deportivo y coherente con el tema de calistenia / entrenamiento funcional.

## Línea visual propuesta

- **Trazo principal:** stroke `hsl(var(--primary))`, grosor 1.75–2px
- **Trazo/relleno secundario:** mismo color al 25–35% de opacidad (efecto duotone)
- **Contenedor:** 64×64 px, `rounded-2xl`, fondo `bg-primary/10` con borde `border-primary/20`
- **Hover:** ligero scale + saturación (sin cambiar color base)
- **Estilo de dibujo:** líneas redondeadas (linecap/linejoin round), inspirado en Phosphor Duotone pero con metáforas de calistenia

## Cambios por sección

### 1. `src/components/QuickPathSelector.tsx` (sustituir emojis 🌱📈🎯)

Crear 3 SVGs duotone propios:
- **Empiezo desde cero** → silueta de persona haciendo flexión básica (push-up)
- **Quiero progresar** → silueta haciendo dominada (pull-up) con flecha ascendente duotone
- **Quiero un entrenador** → silbato + figura coach (o dos figuras: coach señalando atleta)

Reemplazar `<div className="text-6xl">{path.emoji}</div>` por el componente SVG dentro del contenedor duotone descrito arriba.

### 2. `src/components/BenefitsSection.tsx` (sustituir Dumbbell/Target/Trophy/Users2)

Crear 4 SVGs duotone propios alineados con calistenia:
- **Sin Equipos, Sin Excusas** → cuerpo humano en plancha (silueta lateral)
- **Adaptado a Tu Nivel** → 3 barras escalonadas (progresión) con figura
- **Metodología Probada** → medalla/insignia con check duotone
- **Comunidad Activa** → 3 figuras entrenando juntas

Mantener la grid actual y el layout. Sustituir el `bg-gradient-primary` por `bg-primary/10 border border-primary/20` para el efecto duotone (el icono ya aporta el color primary).

## Estructura de archivos nueva

```text
src/components/icons/calisthenia/
  ├── BeginnerIcon.tsx       (push-up básico)
  ├── ProgressIcon.tsx       (pull-up + flecha)
  ├── CoachIcon.tsx          (silbato + figura)
  ├── NoEquipmentIcon.tsx    (plancha lateral)
  ├── LevelAdaptIcon.tsx     (barras progresión)
  ├── MethodologyIcon.tsx    (medalla check)
  ├── CommunityIcon.tsx      (3 figuras)
  └── index.ts               (re-exports)
```

Cada componente acepta `className?: string` y usa `currentColor` para el trazo principal y `fill-opacity="0.25"` para el secundario, de modo que se puedan recolorear vía Tailwind (`text-primary`).

## Sección no afectada

`TrainingCategories` (BRAZOS, ESPALDA…) se mantiene intacta (los webp actuales ya son ilustrados y temáticos).

## Verificación

- Inspeccionar la home en preview tras los cambios: los 3 iconos de "¿Qué estás buscando?" deben verse con la misma altura visual y los 4 iconos de Beneficios alineados en una sola línea duotone naranja.
- Comprobar contraste del icono sobre fondo claro (`bg-primary/10`) y oscuro (modo oscuro si aplica).
- Verificar que no hay reflow ni cambio de altura de las cards.
