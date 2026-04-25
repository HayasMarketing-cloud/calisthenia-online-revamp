
# Rediseño `/coaching/` — funnel high-ticket sin precios + desbloqueo automático

## Objetivo estratégico
Pasar de un funnel tipo SaaS (3 cards de precios) a un **funnel de coaching premium**: el visitante ve el vídeo, percibe el valor del método y lo único que puede hacer es **reservar una llamada/WhatsApp** con Carlos y Nico. Los precios se discuten en la conversación, no en la web.

## Cambios principales

### 1. Eliminar las cards de precios (197 / 397 / 797)
- Se borra el array `plans` y la sección de pricing actual.
- Se borra también la FAQ "¿Qué diferencia hay entre los 3 planes?".
- Se reemplaza la FAQ "¿Cómo se hace el pago?" por una nueva: **"¿Cuánto cuesta el coaching?"** con respuesta tipo *"Tenemos varios formatos según tu objetivo, disponibilidad y nivel. Lo vemos juntos en la llamada para recomendarte el que de verdad encaja contigo. Hay opciones desde acompañamiento grupal hasta coaching premium 1 a 1."*

### 2. Nueva sección desbloqueada: estructura de funnel premium
Cuando se desbloquea (por scroll o submit del form), aparece en este orden:

1. **"Cómo trabajamos contigo"** — 3 pasos visuales con iconos:
   1. **Reservas tu llamada gratuita** (20 min por WhatsApp/Zoom)
   2. **Diagnóstico + plan a medida** (Carlos y Nico analizan tu caso)
   3. **Empiezas a entrenar con seguimiento real**
2. **"Qué incluye trabajar con nosotros"** — bloque de bullets de valor SIN precio:
   - Programa 100% adaptado a tu nivel y agenda
   - Revisiones de técnica por vídeo
   - WhatsApp directo con tus coaches
   - Plan nutricional práctico
   - Comunidad privada de alumnos
   - Ajustes según progreso
3. **Testimonios reales** (los 3 que ya tenemos: Raúl, Charlie, Isabel) — se mantienen tal cual.
4. **Garantía** (se mantiene).
5. **FAQ** (actualizada — sin la pregunta de "diferencias entre planes", añadida la de "¿cuánto cuesta?").
6. **CTA final único** — banner grande verde WhatsApp:
   *"Reserva tu llamada gratuita con Carlos y Nico"* → `+34645079692` con mensaje pre-rellenado: *"Hola Carlos y Nico, he visto el vídeo de la formación y me gustaría reservar una llamada para ver si encajo con vuestro coaching."*

### 3. Desbloqueo automático por scroll (Opción 1)
- Añadir `IntersectionObserver` en un sentinela colocado **justo debajo del vídeo** (al final de la sección de vídeo o al inicio de "¿Para quién es?").
- Cuando ese sentinela entra en viewport (`threshold: 0.1`), se ejecuta `unlockPlans()` automáticamente: marca `sessionStorage` y muestra todo el contenido desbloqueado.
- Se mantiene el listener de `postMessage` del form GHL como vía alternativa (por si alguien va al form antes de scrollear).
- Se mantiene `sessionStorage` para no volver a "bloquear" al recargar.

### 4. Reposicionar el formulario GHL
Como ya no es el gate, el formulario pasa a ser **opcional / secundario**:
- Sigue existiendo como sección al final ("¿Prefieres que te llamemos? Déjanos tus datos") pero pierde el rol de "puerta".
- O bien lo eliminamos en esta iteración y dejamos solo el CTA WhatsApp como único punto de conversión.
- **Recomendación:** dejarlo como segunda opción para perfiles más tímidos que prefieren formulario antes que escribir por WhatsApp.

### 5. Ajustes del Hero
- Cambiar el texto del botón del Hero de *"Ver los planes de coaching"* a **"Reservar llamada con Carlos y Nico"** (scroll directo al CTA WhatsApp final, no al form).

## Archivos afectados
- `src/pages/Coaching.tsx` — refactor de la sección desbloqueada, eliminación de pricing, añadir IntersectionObserver, nuevo CTA final único, FAQ actualizada.

## Lo que NO cambia
- Hero oscuro, vídeo abierto, "Para quién es / no es", coaches, testimonios.
- SEO `noindex, nofollow`.
- Listener `postMessage` del form GHL (se mantiene como red de seguridad).
- WhatsApp `+34645079692` y patrón visual verde `#25D366`.

## Pendiente (futuras iteraciones)
- Sustituir iniciales de testimonios por fotos reales.
- A/B test: con form GHL vs. sin él.
- Añadir Calendly embebido para reserva directa de llamada (alternativa a WhatsApp).
