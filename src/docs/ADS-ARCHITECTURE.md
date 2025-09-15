# 🎯 Arquitectura de Anuncios (ADS) - Documentación Completa

## 📋 Resumen Ejecutivo

Este documento describe la arquitectura completa de anuncios en el proyecto, incluyendo dónde se definen, cómo se renderizan y qué componentes editar para hacer cambios.

## 🏗️ Arquitectura General

### **Flujo de Renderizado de Anuncios**

```
Artículo de Blog → BlogWrapper.tsx → Banners Dinámicos
                    ↓
            Componentes Específicos
                    ↓
            Imágenes de Animalitos + Fallbacks
```

## 📍 Ubicación Real de los Banners en Artículos de Blog

### **1. Banner Superior (Después del Hero)**
- **Archivo**: `src/app/blog/[slug]/BlogWrapper.tsx`
- **Línea**: ~67
- **Clase CSS**: `product-banner-superior`
- **Imagen del animalito**: `className="w-16 h-16 object-contain"` (64px × 64px)
- **Fallback emoji**: `text-4xl` (36px)

### **2. Banner Lateral Sticky (Sidebar)**
- **Archivo**: `src/app/blog/[slug]/BlogWrapper.tsx`
- **Línea**: ~165
- **Ubicación**: Sidebar del artículo
- **Imagen del animalito**: `className="w-16 h-16 object-contain"` (64px × 64px)
- **Fallback emoji**: `text-4xl` (36px)

### **3. Banner Intermedio (Dentro del Contenido)**
- **Archivo**: `src/components/ProductBannerIntermedio.tsx`
- **Clase CSS**: `product-banner-intermedio`
- **Imagen del animalito**: `className="w-16 h-16 object-contain"` (64px × 64px)
- **Fallback emoji**: `text-4xl` (36px)

## ❌ Componentes que NO se usan en Artículos de Blog

### **1. BannerSuperior.tsx (ads/)**
- **Ubicación**: `src/components/ads/BannerSuperior.tsx`
- **Problema**: Solo muestra emojis, no imágenes de animalitos
- **Uso**: No se renderiza en artículos de blog

### **2. ProductBannerSuperior.tsx**
- **Ubicación**: `src/components/ProductBannerSuperior.tsx`
- **Problema**: No se renderiza en artículos de blog
- **Uso**: Solo en páginas de productos

### **3. PackStickyBanner.tsx**
- **Ubicación**: `src/components/PackStickyBanner.tsx`
- **Problema**: Solo se usa en páginas de productos
- **Uso**: No en artículos de blog

## 🔧 Guía para Modificar Tamaños de Imágenes

### **En Artículos de Blog:**

#### **Para Banners Superior y Lateral Sticky:**
```tsx
// Editar: src/app/blog/[slug]/BlogWrapper.tsx
// Línea ~67 (Banner Superior)
className="w-16 h-16 object-contain"  // Cambiar w-16 h-16 por el tamaño deseado

// Línea ~165 (Banner Lateral Sticky)
className="w-16 h-16 object-contain"  // Cambiar w-16 h-16 por el tamaño deseado
```

#### **Para Banner Intermedio:**
```tsx
// Editar: src/components/ProductBannerIntermedio.tsx
// Línea ~82
className="w-16 h-16 object-contain"  // Cambiar w-16 h-16 por el tamaño deseado
```

### **En Páginas de Productos:**

#### **Para ProductCard:**
```tsx
// Editar: src/components/ProductCard.tsx
// Línea ~2130-2150
className="w-60 h-60 object-contain"  // Cambiar w-60 h-60 por el tamaño deseado
```

#### **Para PackStickyBanner:**
```tsx
// Editar: src/components/PackStickyBanner.tsx
// Línea ~130
className="w-12 h-12 md:w-16 md:h-16"  // Cambiar por el tamaño deseado
```

## 📱 Tamaños Actuales de Imágenes

### **Artículos de Blog:**
- **Banner superior**: 64px × 64px (`w-16 h-16`)
- **Banner lateral sticky**: 64px × 64px (`w-16 h-16`)
- **Banner intermedio**: 64px × 64px (`w-16 h-16`)
- **Fallbacks emoji**: 36px (`text-4xl`)

### **Páginas de Productos:**
- **Hero del producto**: 240px × 240px (`w-60 h-60`)
- **PackStickyBanner**: 48px/64px (`w-12 h-12 md:w-16 md:h-16`)

### **Anuncios de Sidebar:**
- **ProductRelatedAd Banner**: 96px × 96px (`w-24 h-24`)
- **ProductRelatedAd Sidebar**: 48px (`text-5xl`)
- **ProductRelatedAd Sidebar-Long**: 72px (`text-7xl`)
- **ProductRelatedAd Inline**: 80px × 80px (`w-[80px] h-[80px]`)

## 🚨 Problemas Comunes y Soluciones

### **Problema 1: Imágenes no cambian de tamaño**
- **Causa**: Editando componentes incorrectos
- **Solución**: Verificar que se edite `BlogWrapper.tsx` para artículos de blog

### **Problema 2: CSS no se aplica**
- **Causa**: Estilos CSS personalizados sobrescribiendo Tailwind
- **Solución**: Usar `!important` o editar `blog-article-styles.css`

### **Problema 3: Cambios no se ven**
- **Causa**: Cache del navegador
- **Solución**: Hard refresh (Ctrl+F5 / Cmd+Shift+R)

## 📚 Archivos de Configuración

### **1. ads-config.ts**
- **Ubicación**: `src/data/ads-config.ts`
- **Propósito**: Configuración de anuncios generales
- **⚠️ Importante**: NO maneja banners de artículos de blog

### **2. product-banners-config.ts**
- **Ubicación**: `src/data/product-banners-config.ts`
- **Propósito**: Configuración de banners de productos
- **⚠️ Importante**: NO maneja banners de artículos de blog

### **3. blog-article-styles.css**
- **Ubicación**: `src/app/blog/[slug]/blog-article-styles.css`
- **Propósito**: Estilos CSS personalizados para banners
- **⚠️ Importante**: Solo afecta a componentes que usan estas clases CSS

## 🔍 Cómo Verificar qué Componente se está Usando

### **1. Inspeccionar el DOM:**
- Abrir DevTools (F12)
- Buscar elementos con clase `product-banner-superior`
- Verificar la estructura del HTML

### **2. Revisar el Código:**
- Verificar `BlogWrapper.tsx` para banners superior y lateral
- Verificar `ProductBannerIntermedio.tsx` para banner intermedio
- NO revisar componentes de `ads/` ni `ProductBannerSuperior.tsx`

### **3. Verificar Imports:**
- Buscar en el archivo de la página qué componentes se importan
- Verificar que se esté usando el componente correcto

## 📝 Checklist para Modificaciones

- [ ] Identificar el tipo de banner a modificar
- [ ] Localizar el archivo correcto según la ubicación
- [ ] Hacer el cambio en el componente correcto
- [ ] Verificar que no haya CSS personalizado interfiriendo
- [ ] Probar en diferentes dispositivos
- [ ] Verificar fallbacks de emoji
- [ ] Actualizar esta documentación si es necesario

## 🎯 Resumen de Acciones

### **Para Artículos de Blog:**
1. **Banner Superior**: Editar `BlogWrapper.tsx` línea ~67
2. **Banner Lateral**: Editar `BlogWrapper.tsx` línea ~165
3. **Banner Intermedio**: Editar `ProductBannerIntermedio.tsx`

### **Para Páginas de Productos:**
1. **Hero**: Editar `ProductCard.tsx`
2. **Sidebar**: Editar `PackStickyBanner.tsx`

### **Para Anuncios de Sidebar:**
1. **Todos los tipos**: Editar `ProductRelatedAd.tsx`

---

**Última actualización**: Diciembre 2024
**Autor**: Asistente IA
**Versión**: 1.0
