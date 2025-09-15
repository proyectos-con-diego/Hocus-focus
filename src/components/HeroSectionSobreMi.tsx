export default function HeroSectionSobreMi() {
  return (
    <section className="w-full bg-gradient-to-br from-[#FF9800]/90 to-[#FFC107]/80 py-16 px-4 flex flex-col items-center text-center rounded-b-3xl shadow-lg">
      <span className="inline-block bg-white/80 text-[#FF9800] font-bold px-4 py-1 rounded-full mb-4 text-sm shadow">10+ años optimizando procesos</span>
      <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-gray-900">Hola, soy Diego. Recuperé 20+ horas semanales</h1>
      <blockquote className="italic text-lg md:text-2xl text-[#FF9800] mb-4">“En 2018 toqué fondo, hoy ayudo a otros a evitarlo”</blockquote>
      <p className="max-w-xl mx-auto text-gray-800 mb-6">¿Te gustaría tener más tiempo libre y menos estrés? Descubre cómo puedes optimizar tu vida y tu negocio con sistemas simples y hábitos efectivos.</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <a href="#" className="bg-[#FF9800] hover:bg-[#FFC107] text-white font-bold py-2 px-6 rounded-full shadow transition">Descargar guía gratis</a>
        <a href="#" className="bg-white border-2 border-[#FF9800] text-[#FF9800] font-bold py-2 px-6 rounded-full shadow hover:bg-[#FFF3E0] transition">Agendar llamada</a>
      </div>
      <div className="flex items-center justify-center gap-6 mb-6">
        <span className="flex items-center gap-2 text-gray-700 text-sm"><span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>+50 empresas ayudadas</span>
        <span className="flex items-center gap-2 text-gray-700 text-sm"><span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>100% satisfacción</span>
      </div>
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF9800] shadow-lg mx-auto animate-bounce-slow bg-white">
        {/* Imagen de perfil simulada */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="40" r="25" fill="#FFC107" />
          <ellipse cx="50" cy="80" rx="28" ry="18" fill="#FF9800" />
        </svg>
      </div>
    </section>
  );
} 