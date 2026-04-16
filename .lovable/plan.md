

## Plan: Crear usuario administrador

**Email:** contacto@calisthenia.online
**Contraseña:** Focus_2010

### Pasos

1. **Crear el usuario** en el sistema de autenticación con auto-confirmación de email (para que pueda iniciar sesión inmediatamente sin verificar correo).

2. **Asignar rol admin** — insertar en la tabla `user_roles` el rol `admin` para el nuevo usuario. El trigger `handle_new_user` ya creará automáticamente el perfil y el rol `user`, así que solo hay que añadir el rol `admin`.

3. **Verificar acceso** — confirmar que el login funciona en `/auth`.

### Detalles técnicos
- Se usará `configure_auth` para activar temporalmente auto-confirm si no está activo.
- Se creará el usuario vía la API de autenticación del backend.
- Se insertará `INSERT INTO user_roles (user_id, role) VALUES ('<new_user_id>', 'admin')`.

