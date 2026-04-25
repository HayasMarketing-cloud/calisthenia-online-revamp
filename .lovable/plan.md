
# Rediseño landing `/coaching/` — versión draft con vídeo abierto

## Objetivo
Que el visitante vea el vídeo desde el inicio (sin fricción) y solo tenga que dejar sus datos para acceder a los **planes y precios** + secciones de conversión. Reutilizamos componentes de diseño de `FuncionalBodybuilding.tsx` para elevar la calidad visual.

## Cambios principales

### 1. Vídeo abierto desde el inicio
- Embeber el vídeo del canal de Nico (`fzk_o2qyXDY`) usando el mismo patrón que ya tenemos en `src/components/VideoEmbed.tsx` (iframe `youtube.com/embed/`, lazy load, aspect 16:9, sombra elegante).
- Se renderiza inmediatamente debajo del Hero, **sin gate**.

### 2. Gate solo en planes y conversión
- El formulario GHL (`JYFtKJd7tgX86dXtbRhS`) se mueve a una sección intermedia con título tipo *"Ver planes y reservar plaza"*.
- Tras enviar el formulario (vía `postMessage` `form-submit-success` ya implementado + `sessionStorage` para persistir), se desbloquean:
  - Cards de los 3 planes (197 / 397 / 797) con CTA WhatsApp
  - Testimonios (placeholder)
  - Garantía
  - FAQ
  - CTA final
- Antes del gate seguirán visibles: Hero, Vídeo, "¿Para quién es / no es?" y "Conoce a tus coaches".

### 3. Mejoras visuales (reutilizando FBB)
- **Hero oscuro** estilo `FuncionalBodybuilding` (`bg-secondary`, grid overlay, badge naranja) adaptado a teletrabajadores.
- **Bloque de coaches** con foto grande tipo card (Carlos Plaza + Nicolás Reyero), reemplazando los avatares circulares actuales.
- Mantener tipografía y tokens del sistema de diseño.

### 4. Estructura final de la página
1. Hero oscuro (headline para teletrabajadores)
2. **Vídeo `fzk_o2qyXDY`** (visible para todos)
3. ¿Para quién es / para quién no es?
4. Conoce a tus coaches (Carlos + Nico, formato FBB)
5. **🔒 Gate — Formulario GHL** ("Accede a los planes")
6. ⬇️ *Solo tras enviar formulario:*
   - 3 planes con CTAs WhatsApp
   - Testimonios
   - Garantía
   - FAQ específica de teletrabajadores
   - CTA final

## Archivos afectados
- `src/pages/Coaching.tsx` — refactor (mover vídeo fuera del gate, reorganizar secciones, aplicar estilo FBB).
- No se tocan `App.tsx`, integraciones Supabase ni otros componentes.

## Lo que NO cambia
- SEO `noindex, nofollow` (página de campaña).
- Mecánica del gate (`postMessage` + `sessionStorage`).
- Patrón WhatsApp CTA verde `#25D366`.
- Estructura de planes y precios.

## Pendiente para una segunda iteración (no en este plan)
- Teaser público corto + gate del vídeo completo (cuando lo grabéis).
- Testimonios reales y bios definitivas de los coaches.
- Confirmación del número de WhatsApp final.
