import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/sanity';
import OptimizedImage from './OptimizedImage';

// Componentes personalizados para PortableText
export const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full my-8">
        <OptimizedImage
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Imagen del blog'}
          width={800}
          height={600}
          className="rounded-lg max-w-full h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px"
        />
      </div>
    ),
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
          <code className="text-green-400">{value.code}</code>
        </pre>
      );
    },
    table: ({ value }: any) => {
      // Definir estilos de tabla según el tipo
      const tableStyles = {
        standard: {
          container: 'overflow-x-auto my-8 rounded-lg border border-gray-700',
          table: 'min-w-full',
          header: 'bg-gray-800 text-white font-semibold',
          cell: 'border-b border-gray-700 px-4 py-3 text-gray-200',
          headerCell: 'border-b border-gray-600 px-4 py-3 text-white font-semibold'
        },
        bordered: {
          container: 'overflow-x-auto my-8 rounded-lg border-2 border-gray-600',
          table: 'min-w-full',
          header: 'bg-gray-800 text-white font-semibold',
          cell: 'border border-gray-600 px-4 py-3 text-gray-200',
          headerCell: 'border border-gray-600 px-4 py-3 text-white font-semibold'
        },
        minimal: {
          container: 'overflow-x-auto my-8',
          table: 'min-w-full',
          header: 'bg-transparent text-gray-300 font-medium',
          cell: 'border-b border-gray-700/50 px-4 py-3 text-gray-200',
          headerCell: 'border-b border-gray-600 px-4 py-3 text-gray-300 font-medium'
        },
        highlighted: {
          container: 'overflow-x-auto my-8 rounded-lg border border-purple-500/30 bg-purple-500/5',
          table: 'min-w-full',
          header: 'bg-purple-500/20 text-purple-200 font-semibold',
          cell: 'border-b border-purple-500/20 px-4 py-3 text-gray-200',
          headerCell: 'border-b border-purple-500/30 px-4 py-3 text-purple-200 font-semibold'
        }
      };

      const style = tableStyles[value.style as keyof typeof tableStyles] || tableStyles.standard;
      
      return (
        <div className={style.container}>
          {value.title && (
            <div className="px-4 py-3 bg-gray-800/50 border-b border-gray-700">
              <h4 className="text-lg font-semibold text-white m-0">{value.title}</h4>
            </div>
          )}
          <table className={style.table}>
            <thead className={style.header}>
              <tr>
                {value.headers?.map((header: string, index: number) => (
                  <th key={index} className={style.headerCell}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows?.map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex} className={style.cell}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
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
      };

      // Definir estilos visuales
      const styles = {
        standard: {
          container: 'my-12',
          column: 'p-6',
          title: 'text-xl font-bold text-white mb-4',
          content: 'text-gray-200'
        },
        bordered: {
          container: 'my-12 border border-gray-700 rounded-lg overflow-hidden',
          column: 'p-6 border-r border-gray-700 last:border-r-0',
          title: 'text-xl font-bold text-white mb-4',
          content: 'text-gray-200'
        },
        'with-backgrounds': {
          container: 'my-12',
          column: 'p-6 bg-gray-800/50 rounded-lg',
          title: 'text-xl font-bold text-white mb-4',
          content: 'text-gray-200'
        },
        highlighted: {
          container: 'my-12 border border-purple-500/30 rounded-lg bg-purple-500/5',
          column: 'p-6',
          title: 'text-xl font-bold text-white mb-4',
          content: 'text-gray-200'
        },
        minimal: {
          container: 'my-12',
          column: 'p-4',
          title: 'text-lg font-semibold text-gray-300 mb-3',
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
        <div className={style.container}>
          {value.title && (
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white">{value.title}</h3>
            </div>
          )}
          <div className={`grid gap-6 ${layout}`}>
            {value.columns?.map((column: any, index: number) => (
              <div 
                key={index} 
                className={`${style.column} ${getColumnClasses(index)} ${accentColors[column.color as keyof typeof accentColors] || ''}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {column.icon && (
                    <span className="text-2xl">{column.icon}</span>
                  )}
                  <h4 className={style.title}>{column.title}</h4>
                </div>
                <div className={style.content}>
                  <PortableText value={column.content} components={portableTextComponents} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },
    callout: ({ value }: any) => {
      // Definir estilos y emojis por tipo
      const typeStyles: Record<string, {bg: string, border: string, icon: string, title: string, titleColor: string}> = {
        info: {
          bg: 'rgba(59, 130, 246, 0.1)',
          border: 'border-blue-400',
          icon: '💡',
          title: 'Información',
          titleColor: 'text-blue-400',
        },
        warning: {
          bg: 'rgba(245, 158, 11, 0.1)',
          border: 'border-yellow-400',
          icon: '⚠️',
          title: 'Advertencia',
          titleColor: 'text-yellow-400',
        },
        success: {
          bg: 'rgba(16, 185, 129, 0.1)',
          border: 'border-green-400',
          icon: '✅',
          title: 'Éxito',
          titleColor: 'text-green-400',
        },
        error: {
          bg: 'rgba(239, 68, 68, 0.1)',
          border: 'border-red-400',
          icon: '❌',
          title: 'Error',
          titleColor: 'text-red-400',
        },
        note: {
          bg: 'rgba(156, 163, 175, 0.1)',
          border: 'border-gray-400',
          icon: '💭',
          title: 'Nota',
          titleColor: 'text-gray-200',
        },
        example: {
          bg: 'rgba(139, 92, 246, 0.1)',
          border: 'border-purple-400',
          icon: '🧩',
          title: 'Ejemplo',
          titleColor: 'text-purple-400',
        },
      };
      const style = typeStyles[value.type] || typeStyles.info;
      return (
        <div 
          className="callout-container mb-8"
          style={{
            background: style.bg,
            borderLeft: `4px solid ${style.border.replace('border-', '').includes('blue') ? '#60a5fa' : 
              style.border.replace('border-', '').includes('yellow') ? '#fbbf24' :
              style.border.replace('border-', '').includes('green') ? '#34d399' :
              style.border.replace('border-', '').includes('red') ? '#f87171' :
              style.border.replace('border-', '').includes('gray') ? '#9ca3af' :
              style.border.replace('border-', '').includes('purple') ? '#a78bfa' : '#60a5fa'}`,
            borderRadius: '15px',
            padding: '2rem',
            position: 'relative',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="callout-header">
            <span className="callout-icon text-2xl">{style.icon}</span>
            <h3 className={`callout-title text-xl font-bold mb-0 ${style.titleColor} uppercase tracking-wider`}>
              {value.title || style.title}
            </h3>
          </div>
          <div className="callout-content text-gray-200 text-base leading-relaxed">
            <PortableText value={value.content} components={portableTextComponents} />
          </div>
        </div>
      );
    },
    divider: ({ value }: any) => {
      const style = value?.style || 'simple';
      
      // Asegurar que el estilo sea válido
      const validStyles = ['simple', 'dotted', 'sophisticated'];
      const finalStyle = validStyles.includes(style) ? style : 'simple';
      
      // Debug: Log para ver qué estilo se está aplicando
      console.log('🔍 Divider Debug:', {
        originalStyle: value?.style,
        finalStyle: finalStyle,
        className: `divider divider-${finalStyle}`
      });
      
      // Estilos inline como respaldo
      const getInlineStyles = (styleType: string) => {
        switch (styleType) {
          case 'sophisticated':
            return {
              background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.2) 20%, #8b5cf6 50%, rgba(139, 92, 246, 0.2) 80%, transparent 100%)',
              borderRadius: '2px',
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.1)',
              maxWidth: '300px',
              height: '3px'
            };
          case 'dotted':
            return {
              background: 'repeating-linear-gradient(to right, #8b5cf6 0, #8b5cf6 6px, transparent 6px, transparent 16px)',
              borderRadius: '3px',
              maxWidth: '250px',
              height: '4px',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)'
            };
          case 'simple':
          default:
            return {
              background: 'rgba(156, 163, 175, 0.4)',
              borderRadius: '0',
              maxWidth: '100%',
              height: '1px',
              boxShadow: 'none'
            };
        }
      };
      
      const inlineStyles = getInlineStyles(finalStyle);
      
      return (
        <div className={`divider divider-${finalStyle}`} data-style={finalStyle} data-debug="true">
          <div className="divider-line" style={inlineStyles}></div>
        </div>
      );
    },
    symbolList: ({ value }: any) => {
      const parseText = (text: string) => {
        const colonIndex = text.indexOf(':');
        if (colonIndex === -1) {
          return { title: text, description: '' };
        }
        return {
          title: text.substring(0, colonIndex).trim(),
          description: text.substring(colonIndex + 1).trim()
        };
      };

      return (
        <div className="symbol-list-container">
          {value.title && (
            <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
          )}
          <ul className={`symbol-list ${value.style === 'numbered' ? 'numerada' : value.style === 'withIcons' ? 'withIcons' : value.style === 'blue' ? 'blue' : value.style === 'purple' ? 'purple' : value.style === 'yellow' ? 'yellow' : 'standard'}`}>
            {value.items?.map((item: any, index: number) => {
              const { title, description } = parseText(item.text);
              return (
                <li key={index}>
                  {item.icon && (
                    <span className="item-icon">{item.icon}</span>
                  )}
                  <div className="item-text">
                    <strong>{title}</strong>
                    {description && (
                      <div className="item-description">{description}</div>
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
        <div className="roadmap-container">
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
              <div key={index} className="roadmap-step">
                {/* Número del paso */}
                <div className="roadmap-number">
                  {step.number || index + 1}
                </div>
                
                {/* Contenido del paso */}
                <div className="roadmap-content">
                  {/* Título con duración */}
                  <h4 className="roadmap-title">
                    {step.title}
                    {step.duration && (
                      <span className="roadmap-duration text-sm text-gray-400 ml-2">
                        ({step.duration})
                      </span>
                    )}
                  </h4>
                  
                  {/* Descripción */}
                  <p className="roadmap-description">
                    {step.description}
                  </p>
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
      <h1 className="text-4xl font-bold text-white mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-blue-400 mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-blue-300 mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-blue-200 mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-200 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 my-6 italic text-gray-300 bg-gray-800/50 p-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside text-gray-200 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: ({ children }: any) => (
    <li className="text-gray-200">{children}</li>
  ),
  marks: {
    link: ({ children, value }: any) => (
      <a 
        href={value.href} 
        className="text-purple-400 hover:text-purple-300 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-300">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-800 px-2 py-1 rounded text-green-400 text-sm">{children}</code>
    ),
  },
}; 