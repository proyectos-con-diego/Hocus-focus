import { sanityClient, urlFor } from '../../../sanity/sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReadingContext, getTagClass, calculateReadingTime, formatDate } from '../../../data/blog';
import './blog-article-styles.css';
import BlogWrapper from './BlogWrapper';
import RelatedArticles from '../../../components/RelatedArticles';
import BlogNewsletterForm from './BlogNewsletterForm';

// Función para generar rutas estáticas (solo artículos públicos)
export async function generateStaticParams() {
  try {
    console.log('🔍 Generating static params for blog posts...');
    
    const query = `*[_type == "post" && defined(slug.current) && !isHidden] {
      "slug": slug.current
    }`;
    
    const posts = await sanityClient.fetch(query);
    console.log('📊 Found posts for static generation:', posts?.length || 0);
    
    if (!Array.isArray(posts)) {
      console.error('❌ Posts is not an array:', posts);
      return [];
    }
    
    const params = posts.map((post: any) => ({
      slug: post.slug,
    }));
    
    console.log('✅ Generated params:', params);
    return params;
  } catch (error) {
    console.error('❌ Error generating static params:', error);
    return [];
  }
}

// Función para obtener los datos del post con mejor manejo de errores
async function getPost(slug: string) {
  try {
    console.log('🔍 Fetching post with slug:', slug);
    
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      excerpt,
      body,
      publishedAt,
      readTime,
      categories[]->{title},
      author->{name, image, bio},
      mainImage,
      slug,
      isHidden,
      "relatedProduct": relatedProduct->{
        nombre,
        slug,
        descripcion,
        imagen,
        estado
      }
    }`;
    
    const post = await sanityClient.fetch(query, { slug });
    console.log('📊 Post data received:', post ? 'Found' : 'Not found');
    
    if (!post) {
      console.log('❌ Post not found for slug:', slug);
      return null;
    }
    
    return post;
  } catch (error) {
    console.error('❌ Error fetching post:', error);
    return null;
  }
}

// Eliminar la definición local de SubtleAdSpace y AdSeparator, así como cualquier uso de useState, useEffect, useRef, para que solo se usen los importados del componente Client.

// Componentes personalizados para PortableText con data-testid
const components = {
  types: {
    image: ({ value }: any) => (
      <img
        src={urlFor(value).width(800).url()}
        alt={value.alt || 'Imagen del blog'}
        style={{ borderRadius: '1em', margin: '2em 0', maxWidth: '100%' }}
        data-testid="blog-image"
        loading="lazy"
        decoding="async"
      />
    ),
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4" data-testid="code-block">
          <code className="text-green-400">{value.code}</code>
        </pre>
      );
    },
    table: ({ value }: any) => {
      // Validar que headers y rows sean arrays
      const headers = Array.isArray(value.headers) ? value.headers : [];
      const rows = Array.isArray(value.rows) ? value.rows : [];
      
      // Determinar el estilo de la tabla
      const tableStyle = value.style || 'standard';
      const tableClass = tableStyle === 'bordered' ? 'comparison-table bordered' : 'comparison-table';
      
      return (
        <div className="table-container" data-testid="table-container">
          {value.title && (
            <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
          )}
          <table className={tableClass}>
            <thead>
              <tr>
                {headers.map((header: string, index: number) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any, rowIndex: number) => {
                // Según el esquema de Sanity, row es un objeto con propiedad 'cells'
                const cells = row && row.cells && Array.isArray(row.cells) ? row.cells : [];
                return (
                  <tr key={rowIndex}>
                    {cells.map((cell: any, cellIndex: number) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    },
    columns: ({ value }: any) => {
      // Definir layouts de columnas
      const layouts = {
        'two-columns': 'grid-cols-1 lg:grid-cols-2',
        'two-columns-60-40': 'grid-cols-1 lg:grid-cols-5',
        'two-columns-40-60': 'grid-cols-1 lg:grid-cols-5',
        'three-columns': 'grid-cols-1 lg:grid-cols-3',
        'three-columns-50-25-25': 'grid-cols-1 lg:grid-cols-4',
        'text-image': 'grid-cols-1 lg:grid-cols-2',
        'image-text': 'grid-cols-1 lg:grid-cols-2',
      };

      // Definir estilos experimentales para las columnas (basados en la página experimental)
      const styles = {
        standard: {
          container: 'columns-container my-12',
          column: 'column p-6 bg-gray-800/5 rounded-[15px] border border-purple-500/20 hover:bg-gray-800/10 hover:translate-y-[-5px] hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all duration-300 relative overflow-hidden',
          title: 'text-xl font-bold text-purple-500 mb-4 text-center',
          content: 'text-gray-200'
        },
        'with-borders': {
          container: 'columns-container my-12',
          column: 'column p-6 bg-gray-800/5 rounded-[15px] border border-blue-500/20 hover:bg-gray-800/10 hover:translate-y-[-5px] hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] transition-all duration-300 relative overflow-hidden',
          title: 'text-xl font-bold text-blue-500 mb-3 text-center',
          content: 'text-gray-200'
        },
        'with-backgrounds': {
          container: 'columns-container my-12',
          column: 'column p-6 bg-gray-800/5 rounded-[15px] border border-green-500/20 hover:bg-gray-800/10 hover:translate-y-[-5px] hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] transition-all duration-300 relative overflow-hidden',
          title: 'text-xl font-bold text-green-500 mb-4 text-center',
          content: 'text-gray-200'
        },
        highlighted: {
          container: 'columns-container my-12',
          column: 'column p-6 bg-gray-800/5 rounded-[15px] border border-purple-500/20 hover:bg-gray-800/10 hover:translate-y-[-5px] hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all duration-300 relative overflow-hidden',
          title: 'text-xl font-bold text-purple-500 mb-4 text-center',
          content: 'text-gray-200'
        },
        minimal: {
          container: 'columns-container my-12',
          column: 'column p-6 bg-gray-800/10 rounded-lg border border-gray-700/30 transition-all duration-200',
          title: 'text-lg font-semibold text-blue-300 mb-3 text-center',
          content: 'text-gray-300'
        },
        modern: {
          container: 'columns-container my-12',
          column: 'column p-6 bg-gray-800/5 rounded-[15px] border border-purple-500/20 hover:bg-gray-800/10 hover:translate-y-[-5px] hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all duration-300 relative overflow-hidden',
          title: 'text-xl font-bold text-purple-500 mb-4 text-center',
          content: 'text-gray-200'
        },
        glass: {
          container: 'columns-container my-12',
          column: 'column p-6 bg-gray-800/5 rounded-[15px] border border-purple-500/20 hover:bg-gray-800/10 hover:translate-y-[-5px] hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all duration-300 relative overflow-hidden backdrop-blur-sm',
          title: 'text-xl font-bold text-purple-500 mb-4 text-center',
          content: 'text-gray-200'
        }
      };

      // Definir colores de acento
      const accentColors = {
        none: '',
        red: 'border-l-4 border-red-500 bg-red-500/5',
        green: 'border-l-4 border-green-500 bg-green-500/5',
        blue: 'border-l-4 border-blue-500 bg-blue-500/5',
        yellow: 'border-l-4 border-yellow-500 bg-yellow-500/5',
        purple: 'border-l-4 border-purple-500 bg-purple-500/5',
        orange: 'border-l-4 border-orange-500 bg-orange-500/5',
      };

      const layout = layouts[value.layout as keyof typeof layouts] || layouts['two-columns'];
      const style = styles[value.style as keyof typeof styles] || styles.standard;

      // Calcular clases específicas para layouts asimétricos
      const getColumnClasses = (index: number) => {
        if (value.layout === 'two-columns-60-40') {
          return index === 0 ? 'lg:col-span-3' : 'lg:col-span-2';
        }
        if (value.layout === 'two-columns-40-60') {
          return index === 0 ? 'lg:col-span-2' : 'lg:col-span-3';
        }
        if (value.layout === 'three-columns-50-25-25') {
          return index === 0 ? 'lg:col-span-2' : 'lg:col-span-1';
        }
        return '';
      };

      return (
        <div className={style.container} data-testid="columns-container">
          {value.title && (
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white">{value.title}</h3>
            </div>
          )}
          <div className={`grid gap-6 ${layout}`}>
            {value.columns?.map((column: any, index: number) => {
              // Determinar si es un layout de imagen + texto
              const isImageTextLayout = value.layout === 'text-image' || value.layout === 'image-text';
              const isImageColumn = (value.layout === 'text-image' && index === 1) || (value.layout === 'image-text' && index === 0);
              
              return (
                <div 
                  key={index} 
                  className={`${style.column} ${getColumnClasses(index)} ${accentColors[column.color as keyof typeof accentColors] || ''} ${value.style === 'minimal' ? 'minimal' : ''} ${isImageTextLayout ? 'flex flex-col' : ''}`}
                  data-testid={`column-${index}`}
                >
                  {column.icon && !isImageColumn && (
                    <div className="text-center mb-3">
                      <span className="text-3xl">{column.icon}</span>
                    </div>
                  )}
                  
                  {isImageColumn && column.image ? (
                    <div className="image-column">
                      <img
                        src={urlFor(column.image).width(600).height(400).fit('crop').url()}
                        alt={column.image.alt || 'Imagen de la columna'}
                        className="w-full h-auto rounded-lg shadow-lg mb-4"
                        data-testid="column-image"
                        loading="lazy"
                        decoding="async"
                      />
                      {column.image.caption && (
                        <p className="text-sm text-gray-400 text-center italic mb-4">
                          {column.image.caption}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <h4 className={style.title}>{column.title}</h4>
                      <div className={style.content}>
                        <PortableText value={column.content} components={components} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    },
    callout: ({ value }: any) => {
      // Definir estilos experimentales por tipo
      const typeStyles: Record<string, {icon: string, title: string, className: string}> = {
        info: {
          icon: '💡',
          title: 'Información',
          className: 'callout-info',
        },
        warning: {
          icon: '⚠️',
          title: 'Advertencia',
          className: 'callout-warning',
        },
        success: {
          icon: '🎉',
          title: 'Éxito',
          className: 'callout-success',
        },
        error: {
          icon: '❗',
          title: 'Error',
          className: 'callout-error',
        },
        note: {
          icon: '💭',
          title: 'Nota',
          className: 'callout-note',
        },
        example: {
          icon: '🧑‍🏫',
          title: 'Ejemplo',
          className: 'callout-example',
        },
      };
      const style = typeStyles[value.type] || typeStyles.info;
      return (
        <div 
          className={`callout-container ${style.className} mb-8`}
          data-testid={`callout-${value.type}`}
        >
          <div className="callout-header">
            <span className="callout-icon text-2xl">{style.icon}</span>
            <h3 className="callout-title text-xl font-bold mb-0 uppercase tracking-wider">
              {value.title || style.title}
            </h3>
          </div>
          <div className="callout-content text-gray-200 text-base leading-relaxed">
            <PortableText value={value.content} components={components} />
          </div>
        </div>
      );
    },
    divider: ({ value }: any) => {
      const style = value.style || 'simple';
      console.log('Rendering divider with style:', style, 'value:', value);
      
      // Asegurar que el estilo sea válido
      const validStyles = ['simple', 'sophisticated', 'dotted'];
      const finalStyle = validStyles.includes(style) ? style : 'simple';
      
      return (
        <div 
          className={`divider divider-${finalStyle}`} 
          data-testid={`divider-${finalStyle}`}
        >
          <div className="divider-line"></div>
        </div>
      );
    },
    symbolList: ({ value }: any) => {
      // Debug: Log de los valores que llegan desde Sanity
      console.log('🔍 SymbolList Debug:', {
        style: value.style,
        numbered: value.numbered,
        numberedType: typeof value.numbered,
        title: value.title,
        itemsCount: value.items?.length,
        rawValue: value
      });

      const parseText = (text: string) => {
        const colonIndex = text.indexOf(':');
        if (colonIndex === -1) {
          return { title: '', description: text };
        }
        return {
          title: text.substring(0, colonIndex).trim(),
          description: text.substring(colonIndex + 1).trim()
        };
      };

      const getStyleClass = (style: string, numbered: any = false) => {
        let baseClass = '';
        switch (style) {
          case 'withIcons': baseClass = 'withIcons'; break;
          case 'red': baseClass = 'red'; break;
          case 'green': baseClass = 'green'; break;
          case 'blue': baseClass = 'blue'; break;
          case 'purple': baseClass = 'purple'; break;
          case 'yellow': baseClass = 'yellow'; break;
          default: baseClass = 'standard'; break;
        }
        
        // Mejorar la lógica para manejar valores booleanos
        const isNumbered = Boolean(numbered);
        
        // Agregar clase de numeración si está activada
        const finalClass = isNumbered ? `${baseClass} numerada` : baseClass;
        console.log('🎨 Style Class Generated:', { 
          style, 
          numbered, 
          isNumbered, 
          baseClass, 
          finalClass 
        });
        return finalClass;
      };

      return (
        <div className="symbol-list-container" data-testid={`symbol-list-${value.style}-${value.numbered ? 'numbered' : 'normal'}`}>
          {value.title && (
            <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
          )}
          <ul className={`symbol-list ${getStyleClass(value.style, value.numbered)}`}>
            {value.items?.map((item: any, index: number) => {
              const { title, description } = parseText(item.text);
              return (
                <li key={index} data-testid={`symbol-list-item-${index}`}>
                  {item.icon && (
                    <span className="item-icon">{item.icon}</span>
                  )}
                  <div className="item-text">
                    {title ? (
                      <>
                        <strong>{title}</strong>
                        {description && (
                          <div className="item-description">{description}</div>
                        )}
                      </>
                    ) : (
                      <span>{description}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    },
    roadmap: ({ value }: any) => {
      // Validar que steps sea un array
      const steps = Array.isArray(value.steps) ? value.steps : [];
      
      // Determinar el estilo
      const style = value.style || 'standard';
      
      return (
        <div className="roadmap-container" data-testid={`roadmap-${style}`}>
          {/* Título del roadmap */}
          {value.title && (
            <h3 className="text-xl font-bold text-blue-400 mb-6">
              {value.title}
            </h3>
          )}
          
          {/* Descripción del roadmap */}
          {value.description && (
            <p className="text-gray-300 mb-8 leading-relaxed">
              {value.description}
            </p>
          )}
          
          {/* Pasos del roadmap */}
          <div className="roadmap-steps">
            {steps.map((step: any, index: number) => (
              <div key={index} className="roadmap-step" data-testid={`roadmap-step-${index}`}>
                {/* Número del paso */}
                <div className="roadmap-number">
                  {index + 1}
                </div>
                
                {/* Contenido del paso */}
                <div className="roadmap-content">
                  <h4 className="roadmap-title">{step.title}</h4>
                  {step.duration && (
                    <span className="roadmap-duration">{step.duration}</span>
                  )}
                  {step.description && (
                    <p className="roadmap-description">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-white mb-6" data-testid="heading-h1">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl font-bold text-blue-400 mb-6" data-testid="heading-h2">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-blue-400 mb-3" data-testid="heading-h3">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-blue-300 mb-2" data-testid="heading-h4">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-200 leading-relaxed mb-4" data-testid="paragraph">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 my-6 italic text-gray-300 bg-gray-800/50 p-4 rounded-r-lg" data-testid="blockquote">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2" data-testid="bullet-list">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside text-gray-200 mb-4 space-y-2" data-testid="numbered-list">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }: any) => (
    <li className="text-gray-200" data-testid="list-item">
      {children}
    </li>
  ),
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white" data-testid="strong-text">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-300" data-testid="emphasized-text">
        {children}
      </em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-700 px-2 py-1 rounded text-green-400 text-sm" data-testid="inline-code">
        {children}
      </code>
    ),
  },
};

// SEO dinámico para cada artículo
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const imageUrl = post.mainImage ? (typeof post.mainImage === 'string' ? post.mainImage : post.mainImage.asset?.url) : '/blog-default.png';
  return {
    title: post.title + ' | Diego Gonzalez Vaccaro',
    description: post.excerpt || 'Artículo del blog de Diego Gonzalez Vaccaro sobre optimización, productividad y tecnología.',
    openGraph: {
      title: post.title + ' | Diego Gonzalez Vaccaro',
      description: post.excerpt || 'Artículo del blog de Diego Gonzalez Vaccaro sobre optimización, productividad y tecnología.',
      type: 'article',
              url: `https://tusitio.com/blog/${post.slug.current}`,
      siteName: 'Diego Gonzalez Vaccaro',
      locale: 'es_ES',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title + ' | Diego Gonzalez Vaccaro',
      description: post.excerpt || 'Artículo del blog de Diego Gonzalez Vaccaro sobre optimización, productividad y tecnología.',
      images: [imageUrl],
      creator: '@tu_usuario',
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  // Calcular tiempo de lectura
  const readingTime = calculateReadingTime(post.body);
  const formattedDate = formatDate(post.publishedAt);

  // Dividir el contenido en dos mitades para el banner intermedio
  const blocks = post.body || [];
  const mid = Math.ceil(blocks.length / 2);
  const firstHalf = blocks.slice(0, mid);
  const secondHalf = blocks.slice(mid);

  // Obtener URL de la imagen principal con fallback
  const mainImageUrl = post.mainImage ? 
    (typeof post.mainImage === 'string' ? post.mainImage : post.mainImage.asset?.url) : 
    '/blog-default.png';

  return (
    <div className="bg-black min-h-screen text-gray-300" data-testid="blog-post-page">
      <BlogWrapper post={post} firstHalf={firstHalf} secondHalf={secondHalf}>
        {/* Hero Section con imagen de fondo */}
        <section className="relative h-[60vh] flex overflow-hidden" data-testid="hero-section">
          {/* Imagen de fondo con overlay */}
          <div 
            className="hero-image absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${mainImageUrl})`,
            }}
            data-testid="hero-background-image"
          />
          
          {/* Overlay más claro para dar protagonismo a la imagen */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/70" />
          
          {/* Overlay de patrón muy sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/2 via-pink-600/1 to-blue-500/2" />
          
          {/* Contenido del hero */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 h-full flex flex-col justify-between">
            {/* Bloque superior: solo breadcrumb */}
            <div className="pt-8">
              <Link 
                href="/blog"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300 inline-flex items-center gap-2 text-sm font-medium"
              >
                <span className="text-lg">←</span> Volver al blog
              </Link>
            </div>

            {/* Bloque inferior: badge, título, descripción y metadata */}
            <div className="pb-8 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {post.categories?.map((category: any, index: number) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${getTagClass(category.title)}`}
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight" data-testid="post-title">
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="text-xl text-gray-200 leading-relaxed max-w-3xl" data-testid="post-excerpt">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4" data-testid="post-meta">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white" data-testid="author-avatar">
                  {post.author?.name ? post.author.name[0] : 'A'}
                </div>
                <div>
                  <div className="font-semibold text-white text-base leading-tight">
                    <Link 
                      href="/sobre-mi"
                      className="hover:text-purple-300 transition-colors duration-300 cursor-pointer"
                      data-testid="author-name"
                    >
                      {post.author?.name || 'Autor'}
                    </Link>
                  </div>
                  <div className="text-gray-300 text-sm mt-0.5" data-testid="post-date-reading">
                    {formattedDate}
                    {readingTime && (
                      <>
                        {' '}• <span className={`${getReadingContext(readingTime).color} font-medium`}>
                          <span className="mr-1">{getReadingContext(readingTime).icon}</span>
                          {readingTime} min
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BlogWrapper>

      {/* Artículos relacionados - Server Component */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <RelatedArticles 
          currentSlug={post.slug?.current || ''} 
          categories={post.categories || []} 
        />
      </div>

      {/* Newsletter Signup con diseño consistente */}
      <div className="max-w-7xl mx-auto px-6">
        <BlogNewsletterForm />
      </div>

      {/* Navegación mejorada */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
            >
              <span className="text-xl">←</span> Volver al blog
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
            >
              Ir al inicio <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 