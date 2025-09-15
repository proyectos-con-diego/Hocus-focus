import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes/index'

export default defineConfig({
  name: 'default',
  title: 'Blog de Diego Gonzalez Vaccaro',
  projectId: 'mygynsxk',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Artículos de Blog')
              .icon(() => '📝')
              .child(S.documentTypeList('post').title('Artículos')),
            S.listItem()
              .title('Autores')
              .icon(() => '👤')
              .child(S.documentTypeList('author').title('Autores')),
            S.listItem()
              .title('Categorías')
              .icon(() => '🏷️')
              .child(S.documentTypeList('category').title('Categorías')),
            S.listItem()
              .title('Productos')
              .icon(() => '🛍️')
              .child(S.documentTypeList('producto').title('Productos')),
            S.divider(),
            S.listItem()
              .title('Vision (Query Tool)')
              .icon(() => '👁️')
              .child(S.component(() => import('@sanity/vision').then(mod => ({default: mod.Vision}))).options({apiVersion: '2024-01-01'}).id('vision')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
