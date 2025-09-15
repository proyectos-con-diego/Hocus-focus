import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'columns',
  title: 'Columnas',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Diseño',
      options: {
        list: [
          {title: 'Dos columnas', value: 'two-columns'},
          {title: 'Tres columnas', value: 'three-columns'},
        ],
      },
      initialValue: 'two-columns',
    }),
    defineField({
      name: 'columns',
      type: 'array',
      title: 'Columnas',
      of: [
        {
          type: 'object',
          name: 'column',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título de la columna',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icono (emoji)',
              description: 'Emoji para la columna (ej: 🚀, 💡, ⚡)',
            },
            {
              name: 'color',
              type: 'string',
              title: 'Color',
              options: {
                list: [
                  {title: 'Sin color', value: 'none'},
                  {title: 'Azul', value: 'blue'},
                  {title: 'Verde', value: 'green'},
                  {title: 'Púrpura', value: 'purple'},
                  {title: 'Rojo', value: 'red'},
                  {title: 'Amarillo', value: 'yellow'},
                ],
              },
              initialValue: 'none',
            },
            {
              name: 'content',
              type: 'array',
              title: 'Contenido',
              of: [{type: 'block'}],
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
          {title: 'Mínimo', value: 'minimal'},
          {title: 'Bordes', value: 'bordered'},
        ],
      },
      initialValue: 'minimal',
    }),
  ],
  preview: {
    select: { layout: 'layout', style: 'style' },
    prepare(selection) {
      const {layout, style} = selection
      return { title: `Columnas (${layout})`, subtitle: style }
    },
  },
}) 