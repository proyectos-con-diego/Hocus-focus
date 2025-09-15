const articulos = [
  {
    titulo: 'Cómo recuperé 20 horas semanales',
    resumen: 'Descubre los sistemas y hábitos que me permitieron liberar tiempo y reducir el estrés.',
    link: '#',
  },
  {
    titulo: 'Automatiza tu negocio en 5 pasos',
    resumen: 'Guía práctica para empezar a automatizar tareas repetitivas y ganar eficiencia.',
    link: '#',
  },
  {
    titulo: 'El poder de los hábitos atómicos',
    resumen: 'Cómo pequeños cambios diarios pueden transformar tu productividad.',
    link: '#',
  },
];

export default function BlogSectionSobreMi() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[#FF9800] mb-6 text-center">Últimos Artículos</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {articulos.map((a, i) => (
          <a
            key={a.titulo}
            href={a.link}
            className="flex-1 bg-white rounded-2xl shadow-lg p-6 border border-[#FF9800]/20 hover:border-[#FF9800] transition block"
          >
            <h3 className="text-lg font-bold text-[#FF9800] mb-2">{a.titulo}</h3>
            <p className="text-gray-700 text-sm mb-2">{a.resumen}</p>
            <span className="text-[#FF9800] text-xs font-semibold underline">Leer más</span>
          </a>
        ))}
      </div>
    </section>
  );
} 