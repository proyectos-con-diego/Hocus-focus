const servicios = [
  {
    nombre: 'Plan de Marketing',
    badge: 'Early Access',
    descripcion: 'Mi metodología completa para generar leads y hacer crecer tu negocio usando sistemas automatizados',
    precio: 35,
    precioOriginal: 120,
  },
  {
    nombre: 'Sistema Notion',
    badge: 'Popular',
    descripcion: 'Mi setup personal de productividad que me ahorra 15+ horas semanales. Incluye plantillas y capacitación',
    precio: 35,
    precioOriginal: 100,
  },
  {
    nombre: 'Asistente IA',
    badge: 'Beta',
    descripcion: 'Automatización inteligente configurada específicamente para tu negocio. Incluye chatbots y workflows',
    precio: 35,
    precioOriginal: 150,
  },
];

export default function ServicesSectionSobreMiV2() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-orange-500/5 to-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-3">Mis Servicios</h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">Metodologías probadas con atención personalizada y precios de lanzamiento</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {servicios.map((s, i) => (
            <div key={s.nombre} className="relative bg-gradient-to-br from-orange-900/60 to-gray-900/80 border border-orange-500/20 rounded-3xl pt-10 pb-10 px-8 text-center shadow-lg hover:scale-105 transition cursor-pointer overflow-visible">
              <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-2 rounded-t-2xl font-bold text-xs uppercase shadow-xl">
                {s.badge}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-2">{s.nombre}</h3>
              <p className="text-gray-300 mb-6 min-h-[72px]">{s.descripcion}</p>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-4xl font-extrabold text-orange-400">${s.precio}</span>
                <span className="text-lg text-gray-400 line-through">${s.precioOriginal}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-full shadow hover:scale-105 transition text-lg">Reservar Spot</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 