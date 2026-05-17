## Problemas detectados

### 1. El feedback del alumno no se ve en el Panel de Coach
En `ClientDetailDialog` (pestaña "Historial de sesiones") solo se leen 4 campos del check-in:
`difficulty_rating, energy_rating, completed_workout, comment`.

Pero `SessionCheckinDialog` guarda además: `session_feeling` (😀/😐/😖), `pain_level`, `pain_location`, `rpe`, `duration_minutes_real`.
→ El coach nunca ve esos campos, y por eso da la sensación de "no hay feedback".

### 2. En `/admin/onboarding` no aparece el programa asignado
La tabla muestra objetivo, nivel, días/sem, lugar — pero ningún enlace al programa activo del alumno. Hay que poder pinchar y abrir el programa para editarlo/consultarlo.

---

## Cambios propuestos

### A. `src/components/admin/ClientDetailDialog.tsx`
1. Ampliar la query `coach-client-sessions`:
   ```
   session_checkins (
     difficulty_rating, energy_rating, completed_workout, comment,
     session_feeling, pain_level, pain_location, rpe, duration_minutes_real, created_at
   )
   ```
2. En cada tarjeta de sesión añadir, debajo de Dificultad/Energía:
   - Emoji de `session_feeling` (great / good / ok / tough / bad) con etiqueta.
   - `RPE x/10` cuando exista.
   - `Duración real: X min` cuando exista.
   - Aviso ámbar si `pain_level >= 4` con `pain_location`.
3. Asegurar que `invalidateQueries(['coach-client-sessions'])` se dispare al abrir el diálogo (ya lo hace via `enabled: open`), no requiere más.

### B. `src/pages/admin/OnboardingManager.tsx`
1. Añadir al `useQuery` una consulta paralela:
   ```ts
   supabase
     .from('programs')
     .select('id, name, status, start_date, client_id')
     .eq('is_template', false)
     .in('status', ['active', 'draft'])
   ```
   y construir `programsByClient: Map<clientId, Program>`.
2. Añadir columna **"Programa"** entre "Lugar" y "Actualizado":
   - Si tiene programa: `<Link to={"/admin/programs/" + program.id}>` con el nombre del programa + badge de estado.
   - Si no tiene: botón pequeño "Asignar" que abra el diálogo de asignación existente (reutilizar el flujo de `CoachPanel` extrayéndolo a un hook/componente compartido, o como atajo: link directo a `/admin/` (panel de coach) ya que aquí el foco es consulta).
3. Mantener "Ver ficha" (abre `ClientDetailDialog`) y añadir "Abrir programa" cuando exista.

### C. Sin cambios de schema
Los campos ya existen en `session_checkins`. Solo cambia el frontend.

---

## Verificación

- Entrar como admin a `/admin/` → pestaña "Sesiones" de cualquier alumno con check-ins → ver feeling/rpe/duración.
- Entrar a `/admin/onboarding/` → ver columna "Programa" con enlace al editor del programa activo del alumno.

