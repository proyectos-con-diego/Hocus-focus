import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Tipo',
      options: {
        list: [
          {title: 'Info', value: 'info'},
          {title: 'Advertencia', value: 'warning'},
          {title: 'Éxito', value: 'success'},
          {title: 'Error', value: 'error'},
          {title: 'Nota', value: 'note'},
          {title: 'Ejemplo', value: 'example'},
        ],
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Contenido',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: { title: 'title', type: 'type' },
    prepare(selection) {
      const {title, type} = selection
      return { title: title || 'Callout sin título', subtitle: type }
    },
  },
}) 