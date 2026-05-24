'use client';

import { useState, useEffect } from 'react';

// Tipos de datos
interface SharedObject {
  tab1Content: string;
  tab2Content: string;
  mergedObject: string;
  forkBase: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'result'>('tab1');
  const [tab1Text, setTab1Text] = useState('');
  const [tab2Text, setTab2Text] = useState('');
  const [forkTemplate, setForkTemplate] = useState('🌱 Plantilla original');
  const [showForkModal, setShowForkModal] = useState(false);
  const [savedObjects, setSavedObjects] = useState<SharedObject[]>([]);

  // Cargar datos guardados
  useEffect(() => {
    const saved = localStorage.getItem('dualCanvas_objects');
    if (saved) {
      setSavedObjects(JSON.parse(saved));
    }
  }, []);

  // Guardar objeto
  const saveObject = () => {
    const newObject: SharedObject = {
      tab1Content: tab1Text,
      tab2Content: tab2Text,
      mergedObject: `${tab1Text} 🤝 ${tab2Text}`,
      forkBase: forkTemplate
    };
    const updated = [...savedObjects, newObject];
    setSavedObjects(updated);
    localStorage.setItem('dualCanvas_objects', JSON.stringify(updated));
    alert('✅ Objeto guardado!');
  };

  // Hacer fork de un objeto existente
  const handleFork = (object: SharedObject) => {
    setTab1Text(object.tab1Content);
    setTab2Text(object.tab2Content);
    setForkTemplate(`🔀 Fork de: ${object.forkBase}`);
    setShowForkModal(false);
    alert('🎨 Fork creado! Ahora puedes modificar los contenidos');
  };

  // Objeto fusionado final
  const mergedResult = `${tab1Text || '...'} 💞 ${tab2Text || '...'}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      {/* Header con icono */}
      <header className="bg-white shadow-lg p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="text-3xl">✏️❤️</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Dual Canvas PWA
            </h1>
          </div>
          <button
            onClick={() => setShowForkModal(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
          >
            🔀 Fork
          </button>
        </div>
      </header>

      {/* Tabs originales */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('tab1')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'tab1'
                ? 'border-b-2 border-pink-500 text-pink-600'
                : 'text-gray-500 hover:text-pink-400'
            }`}
          >
            📝 Pestaña Original 1 - Mi Lienzo
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'tab2'
                ? 'border-b-2 border-purple-500 text-purple-600'
                : 'text-gray-500 hover:text-purple-400'
            }`}
          >
            🎨 Pestaña Original 2 - Lienzo Pareja
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'result'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-green-400'
            }`}
          >
            🌟 Objeto Compartido
          </button>
        </div>

        {/* Contenido Pestaña 1 */}
        {activeTab === 'tab1' && (
          <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">✏️ Tu creación original</h2>
            <textarea
              value={tab1Text}
              onChange={(e) => setTab1Text(e.target.value)}
              placeholder="Escribe o dibuja algo aquí... (ej: una idea, un poema, un doodle)"
              className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Tip: Puedes escribir una frase, un código, o lo que quieras compartir
            </p>
          </div>
        )}

        {/* Contenido Pestaña 2 */}
        {activeTab === 'tab2' && (
          <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">🎨 La creación de tu pareja</h2>
            <textarea
              value={tab2Text}
              onChange={(e) => setTab2Text(e.target.value)}
              placeholder="Tu pareja escribe aquí... (pueden turnarse o simular ambos roles)"
              className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Coordina con tu pareja o usa este espacio como segunda persona
            </p>
          </div>
        )}

        {/* Contenido Objeto Compartido */}
        {activeTab === 'result' && (
          <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">🌟 Objeto Final Compartido</h2>
            <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border-2 border-pink-200">
              <p className="text-2xl font-bold text-center text-purple-700">
                {mergedResult}
              </p>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button
                onClick={saveObject}
                disabled={!tab1Text && !tab2Text}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                💾 Guardar Objeto Compartido
              </button>
            </div>

            {/* Lista de objetos guardados */}
            {savedObjects.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-3">📦 Objetos guardados ({savedObjects.length})</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {savedObjects.map((obj, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded border">
                      <p className="font-medium">{obj.mergedObject}</p>
                      <p className="text-xs text-gray-500 mt-1">Base: {obj.forkBase}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botón flotante de ayuda */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>💡 Completa las dos pestañas originales y mira el objeto compartido</p>
        </div>
      </div>

      {/* Modal de Fork */}
      {showForkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">🔀 Elegir objeto para Fork</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {savedObjects.length === 0 ? (
                <p className="text-gray-500">No hay objetos guardados aún. Crea uno primero.</p>
              ) : (
                savedObjects.map((obj, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleFork(obj)}
                    className="w-full text-left p-3 border rounded hover:bg-purple-50 transition"
                  >
                    <p className="font-medium">{obj.mergedObject}</p>
                    <p className="text-xs text-gray-500">Fork de: {obj.forkBase}</p>
                  </button>
                ))
              )}
            </div>
            <button
              onClick={() => setShowForkModal(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}