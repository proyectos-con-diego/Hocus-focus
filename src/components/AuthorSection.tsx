import { urlFor } from '@/sanity/sanity';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

interface AuthorSectionProps {
  author: {
    name: string;
    image?: any;
    bio?: any[];
    slug?: string;
  };
  className?: string;
}

export default function AuthorSection({ author, className = '' }: AuthorSectionProps) {
  if (!author) {
    return null;
  }

  return (
    <div className={`bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm ${className}`}>
      <div className="flex items-start gap-4">
        {/* Foto del autor */}
        <div className="flex-shrink-0">
          {author.image ? (
            <img
              src={urlFor(author.image).width(80).height(80).url()}
              alt={author.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/30"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl border-2 border-purple-500/30">
              {author.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Información del autor */}
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">El autor</span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3">
            {author.name}
          </h3>
          
          {author.bio && Array.isArray(author.bio) && author.bio.length > 0 ? (
            <div className="text-gray-300 text-sm leading-relaxed mb-4">
              <PortableText 
                value={author.bio} 
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
                    ),
                  },
                }}
              />
            </div>
          ) : (
            <div className="text-gray-300 text-sm leading-relaxed mb-4 space-y-2">
              <p>
                Especialista en productividad y desarrollo profesional con más de 10 años de experiencia ayudando a personas y empresas a optimizar sus procesos y alcanzar sus objetivos de manera más eficiente.
              </p>
            </div>
          )}
          
          {/* Enlace para ver más del autor */}
          <Link
                            href={author.slug ? `/sobre-mi` : `/sobre-mi`}
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
          >
            Más de {author.name.split(' ')[0]}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 