export const routes = {
  home: '/',
  productos: '/productos',
  servicios: '/servicios',
  spiritGpts: '/spirit-gpts',
  blog: '/blog',
  sobreMi: '/sobre-mi-experimental',
} as const;

export const navigationLinks = [
  { href: routes.productos, label: 'Asistentes IA' },
  { href: routes.servicios, label: 'Servicios' },
  { href: routes.blog, label: 'Blog' },
  { href: routes.sobreMi, label: 'Sobre Mí' }
] as const;
