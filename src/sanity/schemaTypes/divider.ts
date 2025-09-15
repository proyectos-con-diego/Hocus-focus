import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'divider',
  title: 'Separador',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      type: 'string',
      title: 'Estilo del separador',
      options: {
        list: [
          {title: 'Línea sofisticada', value: 'sophisticated'},
          {title: 'Línea con puntos', value: 'dotted'},
          {title: 'Línea simple', value: 'simple'},
        ],
      },
      initialValue: 'simple',
    }),
  ],
  preview: {
    select: { style: 'style' },
    prepare(selection) {
      const {style} = selection
      return { title: `Separador (${style || 'sophisticated'})` }
    },
  },
}) 