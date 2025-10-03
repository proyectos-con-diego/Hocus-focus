# Integración con Make.com Webhook

## Configuración Completada

### Endpoint Principal
- **URL**: `https://hook.us2.make.com/jyh6038vmn3iqvsobgo0qcf3vumcdtbr`
- **Método**: POST
- **Content-Type**: application/json

### Estructura de Datos Enviados

Todos los formularios envían datos con esta estructura base:
```json
{
  "timestamp": "2025-01-28T10:30:00.000Z",
  "formType": "newsletter|contact|spirit_idea|vip_list",
  "source": "origen_especifico",
  "userAgent": "navegador_del_usuario",
  "Tipo": "suscripcion|message"
}
```

### Campos por Tipo de Formulario

#### 1. Newsletter (Tipo: "suscripcion")
```json
{
  "name": "Nombre del usuario",
  "email": "email@ejemplo.com",
  "subscribeNewsletter": true,
  "origin": "newsletter_signup"
}
```

#### 2. Contacto (Tipo: "message")
```json
{
  "name": "Nombre del usuario",
  "email": "email@ejemplo.com",
  "message": "Mensaje del usuario",
  "subscribeNewsletter": true,
  "origin": "contact_form"
}
```

#### 3. Idea de Spirit (Tipo: "message")
```json
{
  "name": "Nombre del usuario",
  "email": "email@ejemplo.com",
  "idea": "Descripción de la idea de Spirit",
  "subscribeNewsletter": false,
  "origin": "spirit_ideas"
}
```

#### 4. VIP List (Tipo: "message")
```json
{
  "name": "Nombre del usuario",
  "email": "email@ejemplo.com",
  "product": "Bafet|Navio",
  "sector": "Tecnología|Marketing|...",
  "experience": "Ninguna|Básica|Intermedia|Avanzada|Experta",
  "currentChallenges": "Desafíos actuales del usuario",
  "goals": "Objetivos del usuario",
  "aiFamiliarity": "Principiante|Básico|Intermedio|Avanzado|Experto",
  "subscribeNewsletter": true,
  "origin": "vip_list"
}
```

## Formularios Integrados

### ✅ Newsletter
- **Componente**: `NewsletterSignup.tsx`
- **Hook**: `useMakeWebhook` con `formType: 'newsletter'`
- **Ubicaciones**: Múltiples páginas del sitio

### ✅ Formulario de Contacto
- **Página**: `/sobre-mi`
- **Hook**: `useMakeWebhook` con `formType: 'contact'`
- **Campos**: Nombre, Email, Mensaje, Suscripción

### ✅ Ideas de Spirit
- **Página**: `/spirit-gpts`
- **Hook**: `useMakeWebhook` con `formType: 'spirit_idea'`
- **Campos**: Nombre, Email, Idea, Suscripción

### ⏳ VIP List (Pendiente)
- **Componente**: `VipListModal.tsx`
- **Hook**: `useMakeWebhook` con `formType: 'vip_list'`
- **Campos**: Perfil completo del usuario

## Testing

### Endpoint de Prueba
- **URL**: `/api/test-make-webhook`
- **Método GET**: Ver estructura de datos de prueba
- **Método POST**: Enviar datos de prueba a Make.com

### Ejemplo de Prueba
```bash
# Ver datos de prueba
curl https://tu-dominio.com/api/test-make-webhook

# Enviar prueba de newsletter
curl -X POST https://tu-dominio.com/api/test-make-webhook \
  -H "Content-Type: application/json" \
  -d '{"testType": "newsletter"}'

# Enviar prueba de contacto
curl -X POST https://tu-dominio.com/api/test-make-webhook \
  -H "Content-Type: application/json" \
  -d '{"testType": "contact"}'
```

## Configuración en Make.com

### Campos a Mapear
1. **Tipo** - Distinguir entre "suscripcion" y "message"
2. **formType** - Tipo específico de formulario
3. **source** - Origen para tracking
4. **name, email** - Datos básicos del usuario
5. **message/idea** - Contenido (solo en Tipo: "message")
6. **subscribeNewsletter** - Preferencia de suscripción
7. **timestamp** - Fecha y hora del envío

### Flujos Sugeridos
1. **Suscripciones** (Tipo: "suscripcion")
   - Agregar a lista de newsletter
   - Enviar email de bienvenida

2. **Mensajes** (Tipo: "message")
   - Crear ticket de soporte
   - Notificar al equipo
   - Agregar a newsletter si subscribeNewsletter = true

## Logs y Debugging

Los logs del endpoint están disponibles en:
- **Vercel Functions**: `/api/make-webhook` > Logs
- **Console**: Buscar mensajes con 🔗, 📊, 📤, ✅, ❌

## Próximos Pasos

1. **Configurar Make.com** con los campos especificados
2. **Probar** con el endpoint de prueba
3. **Verificar** que los datos lleguen correctamente
4. **Activar** formularios en producción
