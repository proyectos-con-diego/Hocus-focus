# Sanity CMS - Configuración y Esquemas

Esta carpeta contiene todos los archivos relacionados con Sanity CMS para el proyecto.

## Estructura

```
sanity/
├── README.md                 # Este archivo
├── sanity.ts                 # Cliente de Sanity y configuración
├── sanity.config.ts          # Configuración principal de Sanity
├── schemaTypes/              # Esquemas de contenido
│   ├── index.ts             # Exportación de todos los esquemas
│   ├── post.ts              # Esquema de artículos del blog
│   ├── author.ts            # Esquema de autores
│   ├── category.ts          # Esquema de categorías
│   ├── blockContent.ts      # Esquema de contenido de bloques
│   ├── callout.ts           # Esquema de callouts
│   ├── columns.ts           # Esquema de columnas
│   ├── divider.ts           # Esquema de separadores
│   ├── roadmap.ts           # Esquema de roadmaps
│   ├── symbolList.ts        # Esquema de listas con símbolos
│   ├── table.ts             # Esquema de tablas
│   └── producto.ts          # Esquema de productos
├── author.ts                # Esquema de autor (copia)
├── blockContent.ts          # Esquema de contenido (copia)
├── callout.ts               # Esquema de callout (copia)
├── category.ts              # Esquema de categoría (copia)
├── columns.ts               # Esquema de columnas (copia)
└── divider.ts               # Esquema de separador (copia)
```

## Uso

Los archivos originales se mantienen en sus ubicaciones para evitar problemas de importación. Esta carpeta sirve como respaldo y documentación de la configuración de Sanity.

## Configuración

- **Project ID**: mygynsxk
- **Dataset**: production
- **API Version**: 2023-07-04
- **CDN**: Habilitado para mejor rendimiento

## Scripts Disponibles

```bash
npm run sanity:dev    # Iniciar Sanity Studio en modo desarrollo
npm run sanity:start  # Iniciar Sanity Studio
npm run sanity:build  # Construir Sanity Studio
npm run sanity:deploy # Desplegar Sanity Studio
```


