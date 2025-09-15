"use client";
import { useState } from 'react';

const tabs = [
  { label: '📖 Mi Historia' },
  { label: '🛠️ Cómo Trabajo' },
  { label: '💭 En qué Creo' },
  { label: '🏆 Mis Logros' },
  { label: '📬 Conectemos' },
];

export default function PersonalTabsSobreMi() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full font-semibold transition border-2
              ${active === i ? 'bg-[#FF9800] text-white border-[#FF9800]' : 'bg-white text-[#FF9800] border-[#FF9800] hover:bg-[#FFF3E0]'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow p-6 min-h-[220px]">
        {active === 0 && (
          <div>
            <h3 className="font-bold text-xl mb-2 text-[#FF9800]">Mi Historia</h3>
            <ul className="timeline">
              <li><b>2015:</b> Primer emprendimiento digital</li>
              <li><b>2018:</b> Fracaso y aprendizaje clave</li>
              <li><b>2020:</b> Lanzamiento de consultoría</li>
              <li><b>2023:</b> +50 empresas ayudadas</li>
              <li><b>2025:</b> Meta: ayudar a 500 personas</li>
            </ul>
          </div>
        )}
        {active === 1 && (
          <div>
            <h3 className="font-bold text-xl mb-2 text-[#FF9800]">Cómo Trabajo</h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#FFF3E0] rounded-lg p-4 flex-1 min-w-[140px]">
                <b>Herramientas:</b>
                <ul className="list-disc ml-4 text-sm">
                  <li>Notion</li>
                  <li>Zapier</li>
                  <li>ClickUp</li>
                </ul>
              </div>
              <div className="bg-[#FFF3E0] rounded-lg p-4 flex-1 min-w-[140px]">
                <b>Métodos:</b>
                <ul className="list-disc ml-4 text-sm">
                  <li>Automatización</li>
                  <li>Hábitos atómicos</li>
                  <li>Optimización Kaizen</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {active === 2 && (
          <div>
            <h3 className="font-bold text-xl mb-2 text-[#FF9800]">En qué Creo</h3>
            <ul className="list-disc ml-4">
              <li>La simplicidad es poder</li>
              <li>El tiempo es el recurso más valioso</li>
              <li>El fracaso es parte del éxito</li>
              <li>Ayudar a otros es la mejor inversión</li>
            </ul>
          </div>
        )}
        {active === 3 && (
          <div>
            <h3 className="font-bold text-xl mb-2 text-[#FF9800]">Mis Logros</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF9800]">+50</span>
                <span className="text-sm">Empresas ayudadas</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF9800]">20h</span>
                <span className="text-sm">Semanales recuperadas</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#FF9800]">100%</span>
                <span className="text-sm">Satisfacción</span>
              </div>
            </div>
          </div>
        )}
        {active === 4 && (
          <div>
            <h3 className="font-bold text-xl mb-2 text-[#FF9800]">Conectemos</h3>
            <p className="mb-2">¿Quieres optimizar tu tiempo o tu negocio? Escríbeme:</p>
            <ul className="ml-4">
              <li>Email: <a href="mailto:diego@email.com" className="text-[#FF9800] underline">diego@email.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/5491112345678" className="text-[#FF9800] underline">+54 9 11 1234-5678</a></li>
            </ul>
            <p className="mt-2 text-xs text-gray-500">Garantía: Si no te ayudo, no pagas.</p>
          </div>
        )}
      </div>
    </div>
  );
} 