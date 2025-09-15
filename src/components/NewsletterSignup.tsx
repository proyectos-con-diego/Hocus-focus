export default function NewsletterSignup() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative mt-16 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
          boxShadow: '0 0 0 4px #a21caf55, 0 0 40px 8px #a21caf33'
        }} />
        <div className="relative bg-[#181a2a] bg-opacity-90 rounded-3xl text-center py-10 px-6">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            ¿Quieres más contenido como este?
          </h3>
          <p className="text-white/90 mb-6 text-base">
            Recibe mis mejores reflexiones sobre productividad y optimización directamente en tu email.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" role="form" aria-label="Formulario de suscripción al newsletter">
            <input 
              type="email" 
              className="flex-1 px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-sm" 
              placeholder="Tu mejor email" 
              aria-label="Email para suscripción"
              required
            />
            <button 
              type="submit" 
              className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold transition-all hover:scale-105 text-sm sm:text-base"
              aria-label="Suscribirse al newsletter"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 