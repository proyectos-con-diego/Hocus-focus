# Configuración del Formulario VIP List

## Variables de Entorno Requeridas

Para que el formulario VIP funcione correctamente, necesitas configurar las siguientes variables de entorno en Vercel:

### Variables de Notion

1. **NOTION_TOKEN** (ya existe)
   - Token de integración de Notion
   - Usado para autenticación con la API de Notion

2. **NOTION_DATABASE_ID** (ya existe)
   - ID de la base de datos de suscripciones/newsletter
   - Donde se guardan los datos básicos (nombre, email) si el usuario se suscribe

3. **NOTION_VIP_DATABASE_ID** (NUEVA - necesitas crearla)
   - ID de la nueva base de datos para perfiles VIP
   - Donde se guarda toda la información del perfil del usuario

## Configuración de la Base de Datos VIP en Notion

### Crear la Base de Datos VIP

1. Ve a Notion y crea una nueva base de datos llamada "VIP List" o similar
2. Configura las siguientes propiedades:

#### Propiedades Requeridas:

- **Nombres** (Título) - Tipo: Title
- **Correo** - Tipo: Email
- **Producto** - Tipo: Select
  - Opciones: Bafet, Navio, Otros
- **Sector** - Tipo: Select
  - Opciones: Tecnología, Marketing, Ventas, Consultoría, Finanzas, Educación, Salud, Emprendimiento, Freelance, Otro
- **Experiencia con IA** - Tipo: Select
  - Opciones: Ninguna, Básica, Intermedia, Avanzada, Experta
- **Desafíos Actuales** - Tipo: Rich text
- **Objetivos** - Tipo: Rich text
- **Nivel IA** - Tipo: Select
  - Opciones: Principiante, Básico, Intermedio, Avanzado, Experto
- **Suscribirse Newsletter** - Tipo: Checkbox
- **Origen** - Tipo: Rich text
- **Fecha** - Tipo: Date

### Obtener el Database ID

1. Abre la base de datos en Notion
2. Copia la URL de la base de datos
3. El ID es la parte larga entre `/` y `?` en la URL
4. Ejemplo: `https://www.notion.so/workspace/1234567890abcdef1234567890abcdef?v=...`
5. El ID sería: `1234567890abcdef1234567890abcdef`

## Configuración en Vercel

1. Ve a tu proyecto en Vercel
2. Ve a Settings > Environment Variables
3. Agrega la nueva variable:
   - **Name**: `NOTION_VIP_DATABASE_ID`
   - **Value**: El ID de tu base de datos VIP
   - **Environment**: Production (y Preview si quieres)

## Funcionalidad del Formulario

### Qué hace el formulario:

1. **Siempre guarda** el perfil completo en la tabla VIP con toda la información
2. **Solo si el usuario marca "Sí"** para suscribirse al newsletter:
   - Guarda nombre y email en la tabla de newsletter existente
   - Marca como suscrito

### Campos del Formulario:

- **Información básica**: Nombre, Email
- **Perfil del usuario**: Sector, Experiencia con IA, Desafíos, Objetivos
- **Preferencias**: Suscripción al newsletter

### Productos que usan VIP List:

Actualmente configurados para usar el formulario VIP:
- **Bafet** (producto de crypto)
- **Navio** (producto de colaboración)

Estos productos tienen `ctaClass: "tertiary"` en su configuración.

## Testing

Para probar el formulario:

1. Ve a la página de un producto VIP (ej: `/productos/bafet`)
2. Haz clic en cualquier botón "Únirme a la lista VIP"
3. Se abrirá el modal con el formulario
4. Completa y envía el formulario
5. Verifica en Notion que se crearon las entradas correctas

## Logs y Debugging

Los logs del endpoint están en la consola de Vercel:
- Ve a Functions > vip-list > Logs
- Busca mensajes que empiecen con 🔍, 📝, ✅, o ❌
