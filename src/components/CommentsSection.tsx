'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
}

interface CommentsSectionProps {
  articleId: string;
  articleTitle: string;
}

export default function CommentsSection({ articleId, articleTitle }: CommentsSectionProps) {
  console.log('🚀 CommentsSection se está renderizando!', { articleId, articleTitle });
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simular comentarios existentes
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: '1',
        author: 'María García',
        content: '¡Excelente artículo! Me ayudó mucho a entender mejor el tema.',
        timestamp: new Date(Date.now() - 3600000),
        likes: 5,
        replies: []
      },
      {
        id: '2',
        author: 'Carlos López',
        content: 'Muy útil, especialmente la parte sobre las mejores prácticas.',
        timestamp: new Date(Date.now() - 7200000),
        likes: 3,
        replies: []
      }
    ];
    setComments(mockComments);
  }, []);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName,
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleLike = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return `Hace ${Math.floor(diffInMinutes / 1440)}d`;
  };

  return (
    <div className="mt-12 bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-6">
        💬 Comentarios ({comments.length})
      </h3>

      {/* Formulario de comentario */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            required
          />
          <textarea
            placeholder="¿Qué opinas sobre este artículo?"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : '🚀 Publicar comentario'}
          </button>
        </div>
      </form>

      {/* Lista de comentarios */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {comment.author[0]}
                </div>
                <div>
                  <p className="text-white font-semibold">{comment.author}</p>
                  <p className="text-gray-400 text-sm">{formatTimeAgo(comment.timestamp)}</p>
                </div>
              </div>
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors"
              >
                <span>❤️</span>
                <span>{comment.likes}</span>
              </button>
            </div>
            <p className="text-gray-200 leading-relaxed">{comment.content}</p>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">Sé el primero en comentar sobre este artículo</p>
        </div>
      )}
    </div>
  );
} 