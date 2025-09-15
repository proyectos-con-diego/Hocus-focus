const proyectos = [
  {
    nombre: 'AutomatizaTuPyme',
    descripcion: 'Plataforma para automatizar tareas repetitivas en pequeñas empresas.',
    imagen: null, // Imagen simulada SVG
  },

  {
    nombre: 'OptiFlow',
    descripcion: 'Consultoría digital para optimizar procesos internos.',
    imagen: null,
  },
];

export default function ProjectsSectionSobreMi() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[#FF9800] mb-6 text-center">Proyectos Destacados</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {proyectos.map((p, i) => (
          <div key={p.nombre} className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-[#FF9800]/20">
            <div className="w-20 h-20 mb-4 rounded-full bg-[#FFF3E0] flex items-center justify-center">
              {/* Imagen simulada */}
              <svg width="48" height="48" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#FFC107" />
                <text x="50%" y="55%" textAnchor="middle" fontSize="16" fill="#FF9800" fontWeight="bold" dy=".3em">{p.nombre[0]}</text>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#FF9800] mb-2">{p.nombre}</h3>
            <p className="text-gray-700 text-center text-sm">{p.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 