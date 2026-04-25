## Actualizar copy del Hero en `/coaching/`

Reemplazo el contenido de la sección Hero en `src/pages/Coaching.tsx` (líneas 203–243) con el nuevo copy, manteniendo intacto el diseño (badge superior, layout, botón CTA, prueba social de "+500 alumnos / 4.9/5").

### Cambios concretos

1. **H1** (línea 203–207):
   > Tu cuerpo no está diseñado para estar todo el día **sentado**
   (palabra "sentado" resaltada en `text-primary` naranja, manteniendo el patrón visual actual)

2. **Subtítulo principal** (línea 209–213) — fusionando los dos primeros párrafos del nuevo copy:
   > Recupera fuerza, movilidad y energía con entrenamientos de 30 minutos en casa, adaptados a tu ritmo y nivel. Carlos y Nico te enseñan el sistema que usan para ayudar a personas ocupadas a volver a sentirse fuertes, ágiles y sin molestias en solo 90 días.

3. **Lista de 3 bullets con check** (líneas 215–226) — sustituyo los actuales por:
   - El mayor error que te hace estancarte
   - Cómo entrenar sin dolores ni sobrecargas
   - El método que seguimos con nuestros alumnos

4. **Línea de cierre antes del CTA** — añado un párrafo corto destacado (`text-white font-semibold`) entre los bullets y el botón:
   > 👉 Te mostramos nuestro método en este vídeo

5. **Botón CTA** (línea 240–243): mantengo *"Reservar llamada con Carlos y Nico"* con scroll al CTA final (sin cambios).

### Lo que NO cambia

- Badge superior *"Formación gratuita en vídeo"*.
- Bloque de prueba social (+500 alumnos · 4.9/5).
- Sección de vídeo justo debajo (`fzk_o2qyXDY`).
- Lógica de desbloqueo automático por scroll, formulario GHL, ni resto de la página.