import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'table',
  title: 'Tabla',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título de la tabla',
    }),
    defineField({
      name: 'headers',
      type: 'array',
      title: 'Encabezados',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'rows',
      type: 'array',
      title: 'Filas',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          fields: [
            {
              name: 'cells',
              type: 'array',
              title: 'Celdas',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'style',
      type: 'string',
      title: 'Estilo',
      options: {
        list: [
          {title: 'Estándar', value: 'standard'},
          {title: 'Bordes', value: 'bordered'},
        ],
      },
      initialValue: 'standard',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection) {
      const {title} = selection
      return { title: title || 'Tabla sin título' }
    },
  },
}) 