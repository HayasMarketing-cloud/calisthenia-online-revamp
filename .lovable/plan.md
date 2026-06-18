## Flujo de recuperación de contraseña

Añadir el flujo completo "Olvidé mi contraseña" usando el sistema nativo de Supabase Auth + emails por defecto de Lovable Cloud.

### Páginas nuevas

1. **`/forgot-password`** (`src/pages/ForgotPassword.tsx`)
   - Formulario con un solo campo: email
   - Llama a `supabase.auth.resetPasswordForEmail(email, { redirectTo: \`${window.location.origin}/reset-password\` })`
   - Mensaje genérico tras envío ("Si el email existe, recibirás un enlace") para no filtrar qué emails están registrados
   - Header + Footer, estilo coherente con `/auth`
   - SEO: `noindex` (página utilitaria)

2. **`/reset-password`** (`src/pages/ResetPassword.tsx`)
   - Ruta pública (no protegida)
   - Al montar, detecta el `type=recovery` en el hash y deja que el listener `onAuthStateChange` capture el evento `PASSWORD_RECOVERY` que crea la sesión temporal
   - Formulario con dos campos: nueva contraseña + confirmación (mínimo 6 caracteres, validación de coincidencia)
   - Llama a `supabase.auth.updateUser({ password })`
   - Tras éxito: toast + redirección a `/auth` (cierra sesión temporal con `signOut` previo para que el usuario inicie sesión limpia)
   - Si se entra sin token de recovery válido: mostrar mensaje "Enlace inválido o caducado" + botón para volver a `/forgot-password`

### Cambios menores

3. **`src/pages/Auth.tsx`** — añadir enlace "¿Olvidaste tu contraseña?" debajo del campo de contraseña en la pestaña "Iniciar Sesión", apuntando a `/forgot-password`.

4. **`src/App.tsx`** — registrar las dos rutas nuevas como públicas.

### Detalles técnicos

- **Emails**: se usan los emails por defecto de Lovable Cloud (no hace falta scaffold de plantillas custom ni dominio propio). El asunto/cuerpo será el genérico de Supabase Auth en español si está configurado, o en inglés por defecto.
- **Redirect URL**: `window.location.origin + '/reset-password'` se debe añadir como URL permitida. Lovable Cloud ya acepta el dominio del proyecto y `calisthenia.online` por defecto, así que no requiere acción adicional.
- **Seguridad**:
  - No revelar si un email existe (mensaje genérico).
  - `/reset-password` valida sesión de tipo recovery antes de mostrar el formulario.
  - Forzar `signOut` tras `updateUser` para que el usuario re-inicie sesión con la nueva contraseña.
- **No** se toca `useAuth.ts` (el listener actual ya gestiona los cambios de sesión correctamente).

### Archivos

- Crear: `src/pages/ForgotPassword.tsx`, `src/pages/ResetPassword.tsx`
- Editar: `src/App.tsx`, `src/pages/Auth.tsx`

### Fuera de alcance

- Plantillas de email custom con marca (puedo añadirlas después si lo pides).
- Política de contraseñas fuertes / HIBP (se puede activar aparte).
- Rate limiting adicional (Supabase ya aplica el suyo).
