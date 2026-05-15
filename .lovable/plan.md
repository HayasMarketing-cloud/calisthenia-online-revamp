## Objetivo

Convertir `/app/dashboard` en la pantalla inicial de la app móvil del alumno, replicando el layout de la imagen de referencia pero con la identidad de Calisthenia Online (naranja `--primary` + tipografía actual + tokens semánticos). Datos siempre privados por usuario gracias a las políticas RLS ya existentes.

## Alcance

1. **Rediseño de `src/pages/app/Dashboard.tsx`** con cuatro bloques:
   - **Header de la app**: logo Calisthenia Online (`src/assets`), saludo dinámico ("Buenos días/tardes/noches, NOMBRE"). Sobre un fondo con un sutil glow naranja en degradado (versión sobria de la referencia, usando `--gradient-primary` con baja opacidad — sin imágenes externas).
   - **Plan de hoy**: tarjeta con el nombre de la sesión asignada hoy + meta (nº de bloques / ejercicios o "Día de descanso"). Botón ">" que lleva a `/app/training`. Si no hay sesión asignada, mensaje vacío amable. Enlace "Ver agenda" a la derecha (placeholder hacia `/app/training` por ahora).
   - **Resumen semanal**: dos tarjetas compactas reutilizando los datos de `client_adherence` ya disponibles — racha actual + adherencia 7 días — con un mini gráfico tipo donut (recharts ya en stack si está; si no, SVG simple) representando "sesiones completadas vs programadas esta semana".
   - **Conecta con otras aplicaciones** *(stub visual, sin lógica)*: tarjeta deshabilitada con icono de Apple Health / Google Fit / Garmin y texto "Próximamente". Esto deja el espacio reservado para la fase final.

2. **Datos (todo bajo RLS existente, sin nuevas tablas)**:
   - `programs` activa del usuario → `program_weeks` → `program_days` con `scheduled_date = CURRENT_DATE` (o `day_number` mapeado por week start) → nombre de la sesión.
   - `workout_sessions` del usuario para marcar si ya está completada hoy (cambia el CTA a "Continuar" / "Ver resumen").
   - `client_adherence` para racha + % semanal (ya consumido).
   - Conteo de `program_days` programados esta semana vs `workout_sessions completed` para el donut.
   - Todas las consultas filtradas por `client_id = auth.uid()`; las RLS de `programs`, `program_weeks`, `program_days` y `workout_sessions` ya restringen el acceso al alumno propietario, así que **no se requiere migración**.

3. **Quitar "Reservas" del nav inferior**: el `AppLayout` actual ya no tiene "Reservas" (los items son Inicio, Entreno, Progreso, Perfil). Confirmamos que no se añade. Renombrado opcional para alinear con la referencia: Inicio → Home, Entreno → Agenda… **¿lo dejamos como está o renombramos?** (ver pregunta abierta).

4. **Estilo / marca**:
   - Tipografía: la global del proyecto (sans actual). Títulos grandes y rotundos como en la referencia (`text-3xl font-bold`).
   - Color primario naranja existente (`hsl(16 82% 54%)`) en iconos, acentos y CTA.
   - Tarjetas con `bg-card`, sombras suaves, esquinas `rounded-2xl`.
   - Iconos: `lucide-react` (Activity, Zap, Calendar, Heart, etc.).
   - Mobile-first, max-w-lg, padding seguro (`safe-area-top`).

## Detalles técnicos

- Sin migraciones: aprovechamos `programs`, `program_weeks`, `program_days`, `workout_sessions` y `client_adherence`, todas con RLS ya configurada (`Users can view days of their programs`, etc.).
- Nueva query `useTodaySession` con React Query:
  ```text
  programs (status='active', client_id=user)
    └─ program_weeks
        └─ program_days where scheduled_date = today
  ```
  + lookup en `workout_sessions` para saber si está iniciada/completada.
- Donut semanal: SVG inline (sin nuevas deps) o `recharts` si ya está instalado.
- Logo: si no existe `src/assets/logo-calisthenia.*`, usar texto estilizado con el wordmark "CALISTHENIA / ONLINE" (igual que el header público) hasta que se suba el logo definitivo.
- "Conecta con otras aplicaciones": tarjeta visual con badges (Apple Health, Google Fit, Garmin) + label "Próximamente". Sin lógica.

## Archivos a tocar

- `src/pages/app/Dashboard.tsx` — rediseño completo.
- `src/components/app/AppLayout.tsx` — solo si decidimos renombrar items del nav (pendiente de respuesta).
- *(Opcional)* `src/components/app/TodayPlanCard.tsx`, `WeeklySummaryCard.tsx`, `ConnectAppsCard.tsx` para mantener el Dashboard limpio.

## Fuera de alcance (queda para después)

- Conexión real con Apple Health / Google Fit / Garmin.
- Página `/app/agenda` independiente.
- Notificaciones push del plan diario.

## Pregunta abierta

¿Renombramos los items del nav inferior para alinearlos con la referencia (Home, Agenda, Vídeos, Evolución, Perfil) o mantenemos los actuales (Inicio, Entreno, Progreso, Perfil)? Lo dejo como está salvo que indiques lo contrario.
