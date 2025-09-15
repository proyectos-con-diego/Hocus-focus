const servicios = [
  {
    nombre: 'Optimización de Procesos',
    badge: 'Early Access',
    precio: 35,
    precioOriginal: 70,
    descripcion: 'Automatiza tareas y recupera tiempo con sistemas a medida.',
    destacado: true,
  },
  {
    nombre: 'Mentoría de Productividad',
    badge: 'Popular',
    precio: 35,
    precioOriginal: 60,
    descripcion: 'Sesiones 1:1 para implementar hábitos y rutinas efectivas.',
    destacado: false,
  },
  {
    nombre: 'Auditoría Exprés',
    badge: 'Beta',
    precio: 35,
    precioOriginal: 50,
    descripcion: 'Diagnóstico rápido de cuellos de botella en tu negocio.',
    destacado: false,
  },
];

export default function ServicesSectionSobreMi() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[#FF9800] mb-6 text-center">Servicios</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {servicios.map((s, i) => (
          <div
            key={s.nombre}
            className={`flex-1 bg-white rounded-2xl shadow-lg p-6 border-2 transition hover:scale-105 hover:border-[#FFC107] ${s.destacado ? 'border-[#FF9800]' : 'border-transparent'}`}
          >
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${s.badge === 'Early Access' ? 'bg-[#FF9800] text-white' : s.badge === 'Popular' ? 'bg-[#FFC107] text-white' : 'bg-[#FF9800]/30 text-[#FF9800]'}`}>{s.badge}</span>
            <h3 className="text-xl font-bold mb-2 text-[#FF9800]">{s.nombre}</h3>
            <p className="mb-4 text-gray-700 min-h-[48px]">{s.descripcion}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold text-[#FF9800] mr-2">${s.precio}</span>
              <span className="line-through text-gray-400 text-sm">${s.precioOriginal}</span>
              <span className="ml-2 text-xs text-gray-500">USD</span>
            </div>
            <button className="w-full bg-[#FF9800] hover:bg-[#FFC107] text-white font-bold py-2 rounded-full transition shadow">Reservar Spot</button>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">Precios Early Access por tiempo limitado.</p>
    </section>
  );
} 