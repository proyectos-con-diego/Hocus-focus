import { sanityClient } from '@/sanity/sanity';
import { notFound } from 'next/navigation';
import '@/styles/blog/index.css';

// Función para obtener el artículo de prueba
async function getTestArticle() {
  const query = `*[_type == "post" && slug.current == "articulo-de-prueba"][0] {
    _id,
    title,
    excerpt,
    body,
    publishedAt,
    readTime,
    categories[]->{title},
    author->{name, image},
    mainImage,
    slug,
    "relatedProduct": relatedProduct->{
      nombre,
      slug,
      descripcion,
      imagen,
      estado
    }
  }`;
  
  try {
    const post = await sanityClient.fetch(query);
    return post;
  } catch (error) {
    console.error('Error fetching test article:', error);
    return null;
  }
}

export default async function TestArticlePage() {
  const post = await getTestArticle();
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="blog-container">
        <h1 className="blog-title">{post.title}</h1>
        
        <div className="blog-layout">
          <main className="blog-main">
            <div className="blog-content">
              <p className="blog-paragraph">
                Esta es la página de prueba para verificar que todos los estilos funcionan correctamente.
                Aquí puedes probar cualquier cambio en los estilos de blog.
              </p>
              
              <h2 className="blog-h2">Separadores de Prueba</h2>
              
              <div className="divider divider-simple">
                <div className="divider-line"></div>
              </div>
              
              <div className="divider divider-dotted">
                <div className="divider-line"></div>
              </div>
              
              <div className="divider divider-sophisticated">
                <div className="divider-line"></div>
              </div>
              
              <h3 className="blog-h3">Callouts de Prueba</h3>
              
              <div className="callout-container callout-info">
                <div className="callout-header">
                  <span className="callout-icon">ℹ️</span>
                  <h4 className="callout-title">Información</h4>
                </div>
                <div className="callout-content">
                  <p>Este es un callout de información.</p>
                </div>
              </div>
              
              <div className="callout-container callout-warning">
                <div className="callout-header">
                  <span className="callout-icon">⚠️</span>
                  <h4 className="callout-title">Advertencia</h4>
                </div>
                <div className="callout-content">
                  <p>Este es un callout de advertencia.</p>
                </div>
              </div>
              
              <h3 className="blog-h3">Tipografía de Prueba</h3>
              
              <p className="blog-paragraph">
                Este es un párrafo normal para probar la tipografía. 
                <a href="#" className="blog-link">Este es un enlace de ejemplo</a>.
              </p>
              
              <blockquote className="blog-blockquote">
                Esta es una cita de ejemplo para probar los blockquotes.
              </blockquote>
              
              <ul className="blog-list">
                <li>Primer elemento de la lista</li>
                <li>Segundo elemento de la lista</li>
                <li>Tercer elemento de la lista</li>
              </ul>
              
              <pre className="blog-pre">
                <code>console.log('Código de ejemplo');</code>
              </pre>
              
              <h3 className="blog-h3">Banner de Prueba</h3>
              
              <div className="blog-banner">
                <div className="blog-banner-content">
                  <div className="blog-banner-icon">🚀</div>
                  <div className="blog-banner-text">
                    <h3>Banner de Producto</h3>
                    <p>Este es un banner de producto para probar los estilos.</p>
                  </div>
                </div>
                <a href="#" className="blog-banner-cta">
                  Ver Producto 🚀
                </a>
              </div>
            </div>
          </main>
          
          <aside className="blog-sidebar">
            <div className="blog-banner">
              <div className="blog-banner-content">
                <div className="blog-banner-icon">📧</div>
                <div className="blog-banner-text">
                  <h3>Newsletter</h3>
                  <p>Suscríbete para recibir contenido exclusivo.</p>
                </div>
              </div>
              <a href="#" className="blog-banner-cta">
                Suscribirse 📧
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
} 