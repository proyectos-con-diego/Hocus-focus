import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del producto',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL del producto',
      type: 'slug',
      options: { source: 'nombre', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen del producto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'estado',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          {title: 'Disponible', value: 'disponible'},
          {title: 'Agotado', value: 'agotado'},
          {title: 'Próximamente', value: 'proximamente'},
        ],
      },
      initialValue: 'disponible',
    }),
    defineField({
      name: 'precio',
      title: 'Precio',
      type: 'string',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'estado', media: 'imagen' },
    prepare(selection) {
      const {title, subtitle} = selection
      return { ...selection, subtitle: `${subtitle || 'Sin estado'}` }
    },
  },
}) 