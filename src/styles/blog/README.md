# Estructura de Estilos de Blog

## 📁 Organización de Archivos

```
src/styles/blog/
├── index.css          # Archivo principal - NO MODIFICAR
├── base.css           # Variables CSS y estilos base
├── components.css     # Componentes específicos
├── typography.css     # Estilos de texto
├── layout.css         # Layout y estructura
├── responsive.css     # Media queries
├── utilities.css      # Clases utilitarias
└── README.md          # Esta documentación
```

## 🚨 Reglas Importantes

### ✅ **HACER:**
- Modificar solo el archivo específico para el cambio
- Usar variables CSS definidas en `base.css`
- Agregar nuevos estilos en el archivo correspondiente
- Probar cambios en `/blog/articulo-de-prueba`

### ❌ **NO HACER:**
- Modificar `index.css` directamente
- Usar `!important` sin justificación
- Crear estilos duplicados
- Modificar archivos CSS fuera de esta carpeta

## 🔧 Proceso de Desarrollo

1. **Identificar el tipo de cambio:**
   - Componente → `components.css`
   - Tipografía → `typography.css`
   - Layout → `layout.css`
   - Responsive → `responsive.css`

2. **Hacer el cambio** en el archivo correspondiente

3. **Probar** en `/blog/articulo-de-prueba`

4. **Verificar** que no rompe otros componentes

## 📝 Convenciones de Nomenclatura

- **Clases de componentes:** `.component-name`
- **Clases de blog:** `.blog-component-name`
- **Utilidades:** `.blog-utility-name`
- **Estados:** `.component-name--state`

## 🎨 Variables CSS Disponibles

```css
/* Colores */
--blog-primary: #8b5cf6
--blog-accent: #3b82f6
--blog-gradient: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)

/* Espaciado */
--blog-spacing-xs: 0.5rem
--blog-spacing-sm: 1rem
--blog-spacing-md: 1.5rem
--blog-spacing-lg: 2rem
--blog-spacing-xl: 3rem

/* Tipografía */
--blog-font-size-sm: 0.875rem
--blog-font-size-base: 1rem
--blog-font-size-lg: 1.125rem
--blog-font-size-xl: 1.25rem
--blog-font-size-2xl: 1.5rem
--blog-font-size-3xl: 1.875rem
--blog-font-size-4xl: 2.25rem
``` 