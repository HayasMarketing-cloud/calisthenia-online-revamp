

## Plan: Automatizar mensaje al responder el formulario de contacto

El formulario actual (`/contacto/`) es un iframe externo de **Go High Level**. Las respuestas se guardan en GHL, no en la base de datos de Lovable. Hay dos formas de automatizar el envío de un mensaje:

---

### Opción A — Automatización nativa en Go High Level (recomendada, sin código)

Es lo más rápido y no requiere tocar el código del proyecto.

**Pasos a hacer en tu cuenta de GHL:**
1. Entra en **Automations → Workflows → Create Workflow**.
2. Trigger: **Form Submitted** → selecciona "Formulario lead español" (`JYFtKJd7tgX86dXtbRhS`).
3. Añade una acción:
   - **Send Email**: respuesta automática al lead.
   - **Send SMS / WhatsApp**: si tienes esos canales conectados en GHL.
   - **Internal Notification**: aviso a tu email/teléfono cada vez que llega un lead.
4. Personaliza el mensaje usando campos del formulario (`{{contact.first_name}}`, etc.).
5. Publica el workflow.

**Ventajas:** cero código, GHL ya tiene los datos, soporta email + SMS + WhatsApp.
**Limitación:** depende 100% de GHL.

---

### Opción B — Webhook desde GHL hacia Lovable (si quieres lógica propia)

Si quieres que Lovable reciba cada lead y haga algo personalizado (ej. enviar un email con Resend, guardar en la base de datos, notificar por Telegram, etc.):

**Lo que se construiría en el proyecto:**
1. **Edge function nueva** `ghl-webhook` que:
   - Recibe el POST de GHL con los datos del lead.
   - Valida un secreto compartido (`GHL_WEBHOOK_SECRET`) para evitar abuso.
   - Envía el mensaje automático según el canal elegido (email, WhatsApp, etc.).
2. **Configuración en GHL:** en el mismo workflow del paso A, añadir acción **Webhook** apuntando a la URL de la edge function.

**Decisiones que necesito de ti:**
- **Canal del mensaje automático**: email (Resend / Lovable Emails), WhatsApp (Twilio), Telegram, otro.
- **Destinatario**: ¿el mensaje va al lead que rellena el formulario, o a ti como aviso interno?
- **Contenido**: texto fijo o personalizado con los campos del formulario.

---

### Mi recomendación

Para un mensaje automático simple (confirmación al lead o aviso a ti), **Opción A** es muy superior: 5 minutos de configuración en GHL, sin mantenimiento, sin coste extra.

Solo iría a Opción B si necesitas lógica que GHL no cubre (ej. cruzar el lead con datos de Supabase, integrarlo en el panel `/admin/leads/`, o usar un canal que no tienes en GHL).

