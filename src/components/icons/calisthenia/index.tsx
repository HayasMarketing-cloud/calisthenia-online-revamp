import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const base = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  xmlns: "http://www.w3.org/2000/svg",
};

/** Push-up básico (Empiezo desde cero) */
export const BeginnerIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    {/* Suelo duotone */}
    <rect x="6" y="46" width="52" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" stroke="none" />
    {/* Cabeza */}
    <circle cx="50" cy="26" r="4" fill="currentColor" fillOpacity="0.25" />
    {/* Cuerpo plancha */}
    <path d="M46 30 L20 38" />
    {/* Brazo */}
    <path d="M44 31 L40 46" />
    {/* Pierna */}
    <path d="M22 37 L14 46" />
    {/* Pie/manos en suelo */}
    <circle cx="14" cy="46" r="1.5" fill="currentColor" />
    <circle cx="40" cy="46" r="1.5" fill="currentColor" />
  </svg>
);

/** Pull-up + flecha ascendente (Quiero progresar) */
export const ProgressIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    {/* Barra */}
    <path d="M8 14 L56 14" />
    <path d="M10 10 L10 18" />
    <path d="M54 10 L54 18" />
    {/* Brazos agarrando */}
    <path d="M26 14 L26 24" />
    <path d="M38 14 L38 24" />
    {/* Cabeza */}
    <circle cx="32" cy="28" r="3.5" fill="currentColor" fillOpacity="0.25" />
    {/* Torso */}
    <path d="M32 31 L32 42" />
    {/* Piernas */}
    <path d="M32 42 L27 52" />
    <path d="M32 42 L37 52" />
    {/* Flecha progreso duotone */}
    <path d="M48 56 L48 36 M44 40 L48 36 L52 40" stroke="currentColor" strokeOpacity="0.45" />
  </svg>
);

/** Silbato + figura coach (Quiero un entrenador) */
export const CoachIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    {/* Silbato cuerpo */}
    <path d="M14 26 H34 a6 6 0 0 1 0 12 H22 l-8 6 V26 Z" fill="currentColor" fillOpacity="0.22" />
    {/* Cuerda */}
    <path d="M14 26 C 18 14, 30 10, 40 14" stroke="currentColor" strokeOpacity="0.45" />
    {/* Brillo silbato */}
    <circle cx="30" cy="32" r="2" fill="currentColor" />
    {/* Estrella reconocimiento */}
    <path d="M48 46 l1.6 3.4 3.7 .4 -2.8 2.5 .8 3.7 L48 54.2 44.7 56 l .8 -3.7 -2.8 -2.5 3.7 -.4 Z" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

/** Cuerpo en plancha lateral (Sin Equipos) */
export const NoEquipmentIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    {/* Suelo */}
    <rect x="6" y="50" width="52" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" stroke="none" />
    {/* Cabeza */}
    <circle cx="14" cy="22" r="4" fill="currentColor" fillOpacity="0.25" />
    {/* Brazo apoyo */}
    <path d="M16 26 L16 50" />
    {/* Cuerpo diagonal (plancha) */}
    <path d="M18 26 L54 46" />
    {/* Pies */}
    <circle cx="54" cy="46" r="2" fill="currentColor" />
    {/* Refuerzo glow */}
    <path d="M22 30 L48 44" stroke="currentColor" strokeOpacity="0.35" />
  </svg>
);

/** Barras escalonadas con figura (Adaptado a tu nivel) */
export const LevelAdaptIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    {/* 3 barras crecientes duotone */}
    <rect x="10" y="40" width="10" height="14" rx="2" fill="currentColor" fillOpacity="0.2" />
    <rect x="24" y="30" width="10" height="24" rx="2" fill="currentColor" fillOpacity="0.3" />
    <rect x="38" y="18" width="10" height="36" rx="2" fill="currentColor" fillOpacity="0.45" />
    {/* Figura encima */}
    <circle cx="52" cy="12" r="3" fill="currentColor" />
    <path d="M52 15 L52 22" />
    <path d="M48 18 L56 18" />
  </svg>
);

/** Medalla con check (Metodología Probada) */
export const MethodologyIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    {/* Cintas */}
    <path d="M22 8 L28 30" stroke="currentColor" strokeOpacity="0.45" />
    <path d="M42 8 L36 30" stroke="currentColor" strokeOpacity="0.45" />
    {/* Medalla */}
    <circle cx="32" cy="40" r="14" fill="currentColor" fillOpacity="0.22" />
    <circle cx="32" cy="40" r="14" />
    {/* Check */}
    <path d="M26 40 L31 45 L39 36" />
  </svg>
);

/** 3 figuras (Comunidad Activa) */
export const CommunityIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    {/* Figura central */}
    <circle cx="32" cy="20" r="5" fill="currentColor" fillOpacity="0.3" />
    <path d="M22 44 C 22 34, 42 34, 42 44 L42 50 L22 50 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M22 44 C 22 34, 42 34, 42 44 L42 50 L22 50 Z" />
    {/* Figura izq */}
    <circle cx="14" cy="26" r="3.5" fill="currentColor" fillOpacity="0.25" />
    <path d="M8 48 C 8 40, 20 40, 20 48" stroke="currentColor" strokeOpacity="0.55" />
    {/* Figura der */}
    <circle cx="50" cy="26" r="3.5" fill="currentColor" fillOpacity="0.25" />
    <path d="M44 48 C 44 40, 56 40, 56 48" stroke="currentColor" strokeOpacity="0.55" />
  </svg>
);
