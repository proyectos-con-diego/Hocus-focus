import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'roadmap',
  title: 'Roadmap',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título del Roadmap',
      description: 'Título principal del roadmap (opcional)',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Descripción',
      description: 'Descripción general del roadmap (opcional)',
    }),
    defineField({
      name: 'style',
      type: 'string',
      title: 'Estilo del Roadmap',
      options: {
        list: [
          {title: 'Estándar', value: 'standard'},
          {title: 'Con Iconos', value: 'withIcons'},
          {title: 'Minimalista', value: 'minimal'},
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'steps',
      type: 'array',
      title: 'Pasos del Roadmap',
      description: 'Agrega los pasos del roadmap en orden',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              type: 'number',
              title: 'Número del paso',
              description: 'Número que aparecerá en el círculo (opcional, se auto-incrementa)',
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Título del paso',
              description: 'Título del paso del roadmap',
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Descripción del paso',
              description: 'Descripción detallada del paso',
            }),
            defineField({
              name: 'duration',
              type: 'string',
              title: 'Duración',
              description: 'Duración estimada del paso (ej: "Semana 1-2", "Mes 1")',
            }),
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Icono',
              description: 'Emoji o icono para el paso (solo para estilo "Con Iconos")',
            }),
          ],
          preview: {
            select: {
              number: 'number',
              title: 'title',
              duration: 'duration',
            },
            prepare(selection) {
              const {number, title, duration} = selection
              return {
                title: `${number || '?'}. ${title}`,
                subtitle: duration,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      steps: 'steps',
      style: 'style',
    },
    prepare(selection) {
      const {title, steps, style} = selection
      const stepCount = steps?.length || 0
      return {
        title: title || 'Roadmap',
        subtitle: `${stepCount} paso${stepCount !== 1 ? 's' : ''} - Estilo: ${style || 'standard'}`,
      }
    },
  },
}) 