# 🎯 Arquitectura de Banners - Documentación Técnica

## 📋 Resumen Ejecutivo

Este documento describe la arquitectura y implementación de los diferentes tipos de banners publicitarios en el proyecto, con especial énfasis en las **diferencias clave** entre los banners de artículos individuales del blog.

## 🏗️ Tipos de Banners

### 1. **Banner Principal del Blog** (`/blog`)
- **Componente**: `RotatingProductBanner.tsx`
- **Ubicación**: Entre artículos en la grilla principal
- **Implementación**: Componente React independiente
- **Imágenes**: ✅ Usa imágenes de mascotas desde `/Cabezas pets/`
- **Estado**: ✅ **FUNCIONANDO CORRECTAMENTE**

### 2. **Banner Lateral del Blog** (`/blog`)
- **Componente**: `RotatingServiceBanner.tsx`
- **Ubicación**: Sidebar derecho, sticky
- **Implementación**: Componente React independiente
- **Imágenes**: ✅ Usa imágenes de mascotas desde `/Cabezas pets/`
- **Estado**: ✅ **FUNCIONANDO CORRECTAMENTE**

## 📄 **Banners de Artículos Individuales** (`/blog/[slug]`)

### ⚠️ **IMPORTANTE: Implementaciones Diferentes**

Los banners en artículos individuales tienen **TRES implementaciones completamente diferentes**, lo que puede causar confusión:

---

### **Banner Superior (Header)**
- **Ubicación**: Después del hero del artículo
- **Archivo**: `src/app/blog/[slug]/BlogWrapper.tsx` (línea ~47)
- **Implementación**: **HARDCODED** en el JSX del BlogWrapper
- **Fuente de datos**: `product-banners-config.ts`
- **Imágenes**: ✅ **ACTUALIZADO** - Usa función `getPetImageName()`
- **Código**:
```tsx
<img 
  src={`/Cabezas pets/${getPetImageName(productConfig.name)}.png`}
  alt={`${productConfig.name} mascota`}
  className="w-8 h-8 object-contain"
  onError={/* fallback al emoji */}
/>
```

---

### **Banner Lateral Sticky (Sidebar)**
- **Ubicación**: Barra lateral derecha, sticky
- **Archivo**: `src/app/blog/[slug]/BlogWrapper.tsx` (línea ~130)
- **Implementación**: **HARDCODED** en el JSX del BlogWrapper
- **Fuente de datos**: `product-banners-config.ts`
- **Imágenes**: ✅ **ACTUALIZADO** - Usa función `getPetImageName()`
- **Código**:
```tsx
<img 
  src={`/Cabezas pets/${getPetImageName(productConfig.name)}.png`}
  alt={`${productConfig.name} mascota`}
  className="w-8 h-8 object-contain"
  onError={/* fallback al emoji */}
/>
```

---

### **Banner Intermedio (Embedded)**
- **Ubicación**: Incrustado en el contenido del artículo
- **Archivo**: `src/app/blog/[slug]/IntermediateBanner.tsx` → `ProductBannerIntermedio.tsx`
- **Implementación**: **COMPONENTE REACT** reutilizable
- **Fuente de datos**: `post.relatedProduct` (datos del artículo)
- **Imágenes**: ✅ **ACTUALIZADO** - Usa función `getPetImageName()`
- **Código**:
```tsx
<img 
  src={`/Cabezas pets/${getPetImageName(product.nombre)}.png`}
  alt={`${product.nombre} mascota`}
  className="w-8 h-8 object-contain"
  onError={/* fallback al emoji */}
/>
```

---

## 🔧 **Configuración de Datos**

### **Fuente 1: `product-banners-config.ts`**
- **Usado por**: Banner Superior y Banner Lateral
- **Estructura**: Configuración hardcodeada con emojis
- **Problema**: Los emojis están hardcodeados, no se actualizan automáticamente

### **Fuente 2: `post.relatedProduct`**
- **Usado por**: Banner Intermedio
- **Estructura**: Datos dinámicos del artículo desde Sanity CMS
- **Ventaja**: Se actualiza automáticamente según el producto relacionado

## 🚨 **Problemas Identificados y Solucionados**

### **Problema 1: Rutas de Imágenes Incorrectas**
- **Síntoma**: Las imágenes no se cargaban
- **Causa**: Carpeta `public/Cabezas pets/` vs código `/cabezas pets/`
- **Solución**: ✅ Corregidas todas las rutas a `/Cabezas pets/`

### **Problema 2: Implementaciones Inconsistentes**
- **Síntoma**: Solo el banner intermedio mostraba imágenes
- **Causa**: Los banners superior y lateral usaban `productConfig.emoji` hardcodeado
- **Solución**: ✅ Implementada función `getPetImageName()` en BlogWrapper

## 📝 **Función Helper `getPetImageName()`**

### **Ubicación**: Implementada en múltiples archivos
- `BlogWrapper.tsx` (banners superior y lateral)
- `ProductBannerIntermedio.tsx` (banner intermedio)
- `ProductBannerSuperior.tsx` (otros usos)
- `PackStickyBanner.tsx` (banners de packs)

### **Mapeo de Nombres**:
```typescript
const imageMapping: { [key: string]: string } = {
  'OKRo': 'okro panda',
  'Grilla Viralis': 'Grilla',
  'Jaime Daily': 'Jaime Daily',
  'Navio': 'Navio | Lobo',
  'Bafet': 'Bafet',
  'Midas': 'Midas',
  'Vinxi': 'Vinxi',
  'Mythos': 'Mythos'
};
```

## 🎯 **Recomendaciones para el Futuro**

### **1. Estandarización**
- **Objetivo**: Unificar todas las implementaciones de banners
- **Propuesta**: Convertir banners superior y lateral a componentes React
- **Beneficio**: Mantenimiento más fácil, consistencia en el código

### **2. Centralización de Configuración**
- **Objetivo**: Una sola fuente de verdad para datos de productos
- **Propuesta**: Migrar de `product-banners-config.ts` a datos dinámicos de Sanity
- **Beneficio**: Actualizaciones automáticas, menos código hardcodeado

### **3. Componente Unificado**
- **Objetivo**: Crear un componente `ProductBanner` reutilizable
- **Propuesta**: Un componente que maneje todos los tipos de banners
- **Beneficio**: DRY principle, mantenimiento simplificado

## 🔍 **Archivos Clave para Mantenimiento**

### **Banners de Artículos Individuales**:
- `src/app/blog/[slug]/BlogWrapper.tsx` - Banners superior y lateral
- `src/app/blog/[slug]/IntermediateBanner.tsx` - Banner intermedio
- `src/components/ProductBannerIntermedio.tsx` - Componente del banner intermedio

### **Configuración**:
- `src/data/product-banners-config.ts` - Configuración hardcodeada

### **Función Helper**:
- Función `getPetImageName()` implementada en múltiples archivos

## ✅ **Estado Actual**

| Tipo de Banner | Estado | Imágenes | Implementación |
|----------------|--------|----------|----------------|
| **Blog Principal** | ✅ Funcionando | ✅ Mascotas | Componente React |
| **Blog Lateral** | ✅ Funcionando | ✅ Mascotas | Componente React |
| **Artículo Superior** | ✅ Funcionando | ✅ Mascotas | Hardcoded + Helper |
| **Artículo Lateral** | ✅ Funcionando | ✅ Mascotas | Hardcoded + Helper |
| **Artículo Intermedio** | ✅ Funcionando | ✅ Mascotas | Componente React |

## 🚀 **Próximos Pasos Sugeridos**

1. **Verificar funcionamiento** de todos los banners
2. **Considerar refactorización** para estandarizar implementaciones
3. **Documentar cambios** en este archivo cuando se hagan modificaciones
4. **Revisar consistencia** antes de implementar nuevos banners

---

**Última actualización**: $(date)
**Responsable**: Equipo de desarrollo
**Versión**: 1.0
