## Reemplazar el CTA de WhatsApp por el formulario "Cuerpo Atlético" en `/coaching/`

Sustituyo el botón "Reservar llamada por WhatsApp" de la sección CTA final por el formulario embebido de GHL **Formulario lead Webinar Cuerpo Atlético** (`data-form-id: sbWhGZBx1i4npEeAZgKy`).

### Cambios concretos en `src/pages/Coaching.tsx`

1. **Actualizar las constantes del formulario GHL** (las que ya existen en el archivo):
   - `GHL_FORM_ID = "sbWhGZBx1i4npEeAZgKy"`
   - `GHL_FORM_URL = "https://link.calisthenia.online/widget/form/sbWhGZBx1i4npEeAZgKy"`
   - Nombre del formulario: `"Formulario lead Webinar Cuerpo Atlético"`

2. **Refundir la sección "CTA FINAL" + "FORMULARIO OPCIONAL"** (líneas 562–655) en una sola sección sobre el mismo fondo degradado actual (`bg-gradient-to-br from-secondary via-secondary to-primary/30`):
   - Conservo el badge superior, el H2 ("Reserva tu llamada con el equipo de Calisthenia Online") y el párrafo descriptivo ajustado al nuevo flujo (sin mención a WhatsApp).
   - Debajo, embebo el iframe de GHL dentro de una `Card` blanca centrada (max-width ~640px) con la altura recomendada por GHL (`551px`).
   - Mantengo la línea de cierre "Respondemos en menos de 24h en horario laboral".

3. **Eliminar todo lo relativo al CTA de WhatsApp en esta sección**:
   - Botón verde "Reservar llamada por WhatsApp".
   - Enlace secundario "¿Prefieres que te llamemos? Déjanos tus datos" y la función `scrollToForm` si deja de usarse.
   - Las refs `ctaFinalRef` y `formSectionRef` se consolidan en una sola (`ctaFinalRef`) que apunta a la nueva sección unificada.

4. **Comprobar el resto de la página**: cualquier botón anterior (hero, sticky, etc.) que hiciera `scrollTo(ctaFinalRef)` sigue funcionando porque la ref se mantiene apuntando a la nueva sección con el formulario.

### Lo que NO cambia

- Resto de secciones de `/coaching/` (hero, vídeo, beneficios, testimonios de Raúl/Charlie/Isabel, FAQ, etc.).
- Otros usos de WhatsApp en el sitio (`PromotionBanner`, `Programas`).
- Diseño general, colores y tipografía de la sección.

### Detalle técnico del embed

Mantengo el patrón de iframe que ya usa el proyecto (mismo set de `data-*` atributos, `id` dinámico basado en el form ID, `title` accesible) y conservo la carga del script `https://link.calisthenia.online/js/form_embed.js` mediante el efecto que ya existe — si no lo hubiera en `Coaching.tsx` lo añado con `useEffect` (igual que en `Contacto.tsx`) para garantizar que el iframe se renderiza correctamente y limpia el script al desmontar.
