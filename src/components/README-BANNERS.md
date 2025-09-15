# 🎯 Componentes de Banners - Guía de Uso

## 📁 Ubicación
```
src/components/
├── ProductBannerSuperior.tsx          # Banner superior de artículos
├── ProductBannerIntermedio.tsx        # Banner intermedio de artículos
├── PackStickyBanner.tsx               # Banner lateral sticky de packs
├── RotatingProductBanner.tsx          # Banner rotativo del blog principal
├── RotatingServiceBanner.tsx          # Banner lateral del blog
└── README-BANNERS.md                  # Este archivo
```

## 🔧 **Componentes Principales**

### **1. ProductBannerSuperior.tsx**
- **Propósito**: Banner superior en páginas de productos
- **Props**: `{ product }`
- **Imágenes**: ✅ Usa `getPetImageName()` para imágenes de mascotas
- **Fallback**: Emoji si la imagen falla
- **Estado**: ✅ **FUNCIONANDO**

### **2. ProductBannerIntermedio.tsx**
- **Propósito**: Banner incrustado en contenido de artículos
- **Props**: `{ product }`
- **Imágenes**: ✅ Usa `getPetImageName()` para imágenes de mascotas
- **Fallback**: Emoji si la imagen falla
- **Estado**: ✅ **FUNCIONANDO**

### **3. PackStickyBanner.tsx**
- **Propósito**: Banner lateral sticky para packs de productos
- **Props**: `{ packs }`
- **Imágenes**: ✅ Usa `getPetImageName()` para imágenes de mascotas
- **Fallback**: Emoji si la imagen falla
- **Estado**: ✅ **FUNCIONANDO**

### **4. RotatingProductBanner.tsx**
- **Propósito**: Banner rotativo entre artículos del blog
- **Props**: Ninguna (usa datos internos)
- **Imágenes**: ✅ Usa `getPetImageName()` para imágenes de mascotas
- **Fallback**: Emoji si la imagen falla
- **Estado**: ✅ **FUNCIONANDO**

### **5. RotatingServiceBanner.tsx**
- **Propósito**: Banner lateral del blog con servicios
- **Props**: Ninguna (usa datos internos)
- **Imágenes**: ✅ Usa `getPetImageName()` para imágenes de mascotas
- **Fallback**: Emoji si la imagen falla
- **Estado**: ✅ **FUNCIONANDO**

## 🚨 **IMPORTANTE: Implementaciones Diferentes**

### **Banners de Artículos Individuales** (`/blog/[slug]`)
Estos banners **NO** usan estos componentes, sino implementaciones hardcodeadas:

- **Banner Superior**: Implementado en `BlogWrapper.tsx` (línea ~47)
- **Banner Lateral**: Implementado en `BlogWrapper.tsx` (línea ~130)
- **Banner Intermedio**: Usa `ProductBannerIntermedio.tsx` (este sí es componente)

### **¿Por qué esta diferencia?**
- **Histórico**: Los banners superior y lateral se implementaron directamente en el JSX
- **Consistencia**: El banner intermedio usa el patrón de componentes
- **Mantenimiento**: Los hardcodeados son más difíciles de mantener

## 🔧 **Función Helper `getPetImageName()`**

### **Implementación Estándar**:
```typescript
function getPetImageName(productName: string): string {
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
  
  return imageMapping[productName] || productName;
}
```

### **Uso en Componentes**:
```tsx
<img 
  src={`/Cabezas pets/${getPetImageName(product.name)}.png`}
  alt={`${product.name} mascota`}
  className="w-8 h-8 object-contain"
  onError={(e) => {
    // Fallback al emoji si la imagen no carga
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.className = 'text-2xl';
    fallback.textContent = product.emoji;
    target.parentNode?.insertBefore(fallback, target);
  }}
/>
```

## 📝 **Agregar Nuevos Productos**

### **1. Actualizar `getPetImageName()`**
```typescript
const imageMapping: { [key: string]: string } = {
  // ... productos existentes ...
  'Nuevo Producto': 'nuevo-producto', // Agregar aquí
};
```

### **2. Verificar Imagen**
- Asegurar que existe `/public/Cabezas pets/nuevo-producto.png`
- Verificar que el nombre del archivo coincida exactamente

### **3. Probar Fallback**
- Verificar que el emoji se muestre si la imagen falla
- Comprobar que el `onError` funcione correctamente

## 🚀 **Mejoras Futuras Sugeridas**

### **1. Estandarización**
- Convertir banners hardcodeados a componentes React
- Unificar la implementación de todos los banners

### **2. Centralización**
- Crear un hook personalizado `useProductImage()`
- Centralizar la lógica de fallback

### **3. Tipado**
- Agregar interfaces TypeScript para todos los props
- Validar tipos de productos en tiempo de compilación

## ✅ **Checklist de Verificación**

Antes de hacer cambios en banners, verificar:

- [ ] ¿La función `getPetImageName()` está implementada?
- [ ] ¿La ruta `/Cabezas pets/` es correcta?
- [ ] ¿El fallback al emoji funciona?
- [ ] ¿El componente se renderiza correctamente?
- [ ] ¿Las imágenes se cargan sin errores?

## 🔍 **Debugging Común**

### **Problema**: Imagen no se carga
- **Solución**: Verificar ruta en `/Cabezas pets/`
- **Verificar**: Consola del navegador para errores 404

### **Problema**: Fallback no funciona
- **Solución**: Verificar implementación de `onError`
- **Verificar**: Que `product.emoji` tenga valor

### **Problema**: Componente no se renderiza
- **Solución**: Verificar props y estructura de datos
- **Verificar**: Consola para errores de JavaScript

---

**Última actualización**: $(date)
**Responsable**: Equipo de desarrollo
**Versión**: 1.0
