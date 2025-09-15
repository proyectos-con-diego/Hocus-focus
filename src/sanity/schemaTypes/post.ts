import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Artículo de Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del artículo',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'excerpt',
      title: 'Descripción corta',
      type: 'string',
      validation: Rule => Rule.max(180),
    }),
    defineField({
      name: 'slug',
      title: 'URL del artículo',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Contenido del artículo',
      type: 'blockContent',
    }),
    defineField({
      name: 'relatedProduct',
      title: 'Producto relacionado',
      type: 'reference',
      to: [{type: 'producto'}],
      description: 'Selecciona el producto relacionado con este artículo (opcional)',
    }),
    defineField({
      name: 'isHidden',
      title: 'Ocultar artículo',
      type: 'boolean',
      description: 'Marcar para ocultar este artículo del blog',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'mainImage' },
    prepare(selection) {
      const {author} = selection
      return { ...selection, subtitle: author && `por ${author}` }
    },
  },
})
