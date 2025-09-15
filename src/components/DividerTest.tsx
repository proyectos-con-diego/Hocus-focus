export default function DividerTest() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-white text-2xl mb-8">Prueba de Separadores</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-white mb-4">Separador Simple</h2>
          <div className="divider divider-simple">
            <div className="divider-line"></div>
          </div>
        </div>
        
        <div>
          <h2 className="text-white mb-4">Separador Punteado</h2>
          <div className="divider divider-dotted">
            <div className="divider-line"></div>
          </div>
        </div>
        
        <div>
          <h2 className="text-white mb-4">Separador Sofisticado</h2>
          <div className="divider divider-sophisticated">
            <div className="divider-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 