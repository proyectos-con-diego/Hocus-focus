import { sanityClient } from '@/sanity';
import { NextResponse } from 'next/server';

export async function GET() {
  // Obtener los slugs de los posts (solo artículos públicos)
  const posts = await sanityClient.fetch(`*[_type == "post" && defined(slug.current) && (isHidden != true)]{ "slug": slug.current, publishedAt }`);

  const baseUrl = 'https://diegogonzalezvaccaro.com';
  
  // URLs estáticas principales
  const staticUrls = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/productos', priority: '0.9', changefreq: 'weekly' },
    { path: '/servicios', priority: '0.9', changefreq: 'weekly' },
    { path: '/sobre-mi-experimental', priority: '0.8', changefreq: 'monthly' },
    { path: '/ghost-gpts', priority: '0.7', changefreq: 'weekly' },
  ];

  let urls = staticUrls.map(({ path, priority, changefreq }) =>
    `<url><loc>${baseUrl}${path}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  );

  // URLs de artículos del blog
  urls = urls.concat(
    posts.map((post: any) =>
      `<url><loc>${baseUrl}/blog/${post.slug}</loc><lastmod>${post.publishedAt ? new Date(post.publishedAt).toISOString() : ''}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
    )
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n')}
    </urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 