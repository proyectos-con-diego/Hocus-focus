export default {
  name: 'symbolList',
  title: 'Lista con Símbolos',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Título de la lista (opcional)',
      type: 'string',
      description: 'Un título descriptivo para la lista'
    },
    {
      name: 'items',
      title: 'Elementos de la lista',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texto del elemento',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              description: 'Formato: "Texto en negrita: descripción". El texto antes de ":" aparecerá en negrita'
            },
            {
              name: 'icon',
              title: 'Icono (opcional)',
              type: 'string',
              description: 'Emoji o símbolo para el elemento (ej: 🚀, ⚡, 💡)'
            }
          ],
          preview: {
            select: {
              text: 'text',
              icon: 'icon'
            },
            prepare({ text, icon }: { text: string; icon?: string }) {
              const displayText = text.length > 50 ? text.substring(0, 50) + '...' : text;
              return {
                title: icon ? `${icon} ${displayText}` : displayText
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'style',
      title: 'Estilo de la lista',
      type: 'string',
      options: {
        list: [
          { title: 'Estándar (Gris - Neutral)', value: 'standard' },
          { title: 'Con iconos (Verde - Informativo)', value: 'withIcons' },
          { title: 'Numerada (Rojo - Importante)', value: 'numbered' },
          { title: 'Azul (Profesional)', value: 'blue' },
          { title: 'Púrpura (Creativo)', value: 'purple' },
          { title: 'Amarillo (Destacado)', value: 'yellow' }
        ]
      },
      initialValue: 'standard'
    }
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items'
    },
    prepare(value: any) {
      const { title, items } = value || {};
      return {
        title: title || `Lista con ${items?.length || 0} elementos`,
        subtitle: items?.length ? `${items.length} elemento${items.length > 1 ? 's' : ''}` : 'Sin elementos'
      };
    }
  }
}; 