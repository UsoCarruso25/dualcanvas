'use client';

import { useState } from 'react';

// Partes disponibles para construir tu emoji
const PARTES = {
  ojos: ['👀', '😍', '😜', '😎', '👁️', '🤩', '😏', '😳'],
  boca: ['😊', '😂', '😮', '😘', '😭', '😡', '🤔', '😴'],
  accesorios: ['🎩', '👑', '🕶️', '🧢', '💍', '🌸', '⭐', '🌈'],
  fondo: ['⬜', '💛', '❤️', '💙', '💚', '💜', '🧡', '🖤']
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  // Emoji 1 (tuyo)
  const [emoji1, setEmoji1] = useState({
    ojos: '👀',
    boca: '😊',
    accesorio: '🎩',
    fondo: '⬜'
  });
  
  // Emoji 2. (pareja)
  const [emoji2, setEmoji2] = useState({
    ojos: '😍',
    boca: '😂',
    accesorio: '👑',
    fondo: '💛'
  });
  
  const [emojiFinal, setEmojiFinal] = useState<any>(null);
  const [guardados, setGuardados] = useState<any[]>([]);

  // Cambiar parte de un emoji
  const cambiarParte = (jugador: 1 | 2, parte: string, valor: string) => {
    if (jugador === 1) {
      setEmoji1({ ...emoji1, [parte]: valor });
    } else {
      setEmoji2({ ...emoji2, [parte]: valor });
    }
  };

  // Generar emoji visual (string combinada)
  const generarEmojiVisual = (emoji: any) => {
    return `${emoji.fondo}${emoji.ojos}${emoji.boca}${emoji.accesorio}`;
  };

  // Fusionar ambos emojis
  const fusionarEmojis = () => {
    const fusion = {
      ojos: emoji1.ojos,
      boca: emoji2.boca,
      accesorio: emoji1.accesorio,
      fondo: emoji2.fondo,
      nombre: `${emoji1.ojos}${emoji2.boca} Fusion`
    };
    setEmojiFinal(fusion);
    return fusion;
  };

  // Guardar fusión
  const guardarFusion = () => {
    const fusion = emojiFinal || fusionarEmojis();
    const nuevaFusion = {
      ...fusion,
      emoji1: { ...emoji1 },
      emoji2: { ...emoji2 },
      fecha: new Date().toLocaleTimeString()
    };
    setGuardados([...guardados, nuevaFusion]);
    alert('✅ Emoji fusionado guardado!');
  };

  // Hacer fork
  const hacerFork = (item: any) => {
    setEmoji1({ ...item.emoji1 });
    setEmoji2({ ...item.emoji2 });
    setEmojiFinal(null);
    setActiveTab('tab1');
    alert('🔀 Fork creado! Modifica los emojis');
  };

  // Renderizar constructor de emoji
  const renderConstructor = (emoji: any, titulo: string, jugador: 1 | 2) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-center mb-4">{titulo}</h2>
      
      {/* Vista previa del emoji */}
      <div className="flex justify-center mb-6">
        <div className="text-8xl bg-gray-100 p-8 rounded-2xl shadow-inner">
          {generarEmojiVisual(emoji)}
        </div>
      </div>
      
      {/* Selectores de partes */}
      <div className="space-y-4">
        <div>
          <label className="font-bold block mb-2">👁️ Ojos:</label>
          <div className="flex gap-2 flex-wrap">
            {PARTES.ojos.map((opcion) => (
              <button
                key={opcion}
                onClick={() => cambiarParte(jugador, 'ojos', opcion)}
                className={`text-3xl p-2 border-2 rounded-lg hover:bg-gray-100 transition ${
                  emoji.ojos === opcion ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="font-bold block mb-2">👄 Boca:</label>
          <div className="flex gap-2 flex-wrap">
            {PARTES.boca.map((opcion) => (
              <button
                key={opcion}
                onClick={() => cambiarParte(jugador, 'boca', opcion)}
                className={`text-3xl p-2 border-2 rounded-lg hover:bg-gray-100 transition ${
                  emoji.boca === opcion ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="font-bold block mb-2">✨ Accesorio:</label>
          <div className="flex gap-2 flex-wrap">
            {PARTES.accesorios.map((opcion) => (
              <button
                key={opcion}
                onClick={() => cambiarParte(jugador, 'accesorio', opcion)}
                className={`text-3xl p-2 border-2 rounded-lg hover:bg-gray-100 transition ${
                  emoji.accesorio === opcion ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="font-bold block mb-2">🎨 Fondo:</label>
          <div className="flex gap-2 flex-wrap">
            {PARTES.fondo.map((opcion) => (
              <button
                key={opcion}
                onClick={() => cambiarParte(jugador, 'fondo', opcion)}
                className={`text-3xl p-2 border-2 rounded-lg hover:bg-gray-100 transition ${
                  emoji.fondo === opcion ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-center text-purple-600">
          🎨 Creador de Emojis Personalizados
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Construye tu emoji único y fúndelo con el de tu pareja
        </p>
      </header>

      <div className="max-w-5xl mx-auto p-4">
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('tab1')}
            className={`flex-1 py-2 rounded-lg font-bold ${
              activeTab === 'tab1' ? 'bg-pink-500 text-white' : 'bg-white text-pink-500'
            }`}
          >
            🎨 Tu Emoji
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className={`flex-1 py-2 rounded-lg font-bold ${
              activeTab === 'tab2' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'
            }`}
          >
            🤝 Emoji Pareja
          </button>
          <button
            onClick={() => {
              fusionarEmojis();
              setActiveTab('fusion');
            }}
            className={`flex-1 py-2 rounded-lg font-bold ${
              activeTab === 'fusion' ? 'bg-green-500 text-white' : 'bg-white text-green-500'
            }`}
          >
            🌟 Emoji Fusión
          </button>
        </div>

        {activeTab === 'tab1' && renderConstructor(emoji1, '🎨 Construye tu Emoji', 1)}
        {activeTab === 'tab2' && renderConstructor(emoji2, '🤝 Emoji de tu Pareja', 2)}

        {activeTab === 'fusion' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">🌟 Emoji Ultimate Fusión</h2>
            
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-8 mb-6">
              <div className="flex justify-center gap-8 items-center flex-wrap">
                {/* Emoji 1 */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Tu Emoji</p>
                  <div className="text-7xl">{generarEmojiVisual(emoji1)}</div>
                </div>
                
                <div className="text-4xl">➕</div>
                
                {/* Emoji 2 */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Emoji Pareja</p>
                  <div className="text-7xl">{generarEmojiVisual(emoji2)}</div>
                </div>
                
                <div className="text-4xl">✨</div>
                
                {/* Fusión */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Emoji Fusión</p>
                  <div className="text-8xl bg-white p-4 rounded-full shadow-lg">
                    {emojiFinal ? 
                      `${emojiFinal.fondo}${emojiFinal.ojos}${emojiFinal.boca}${emojiFinal.accesorio}` :
                      `${emoji2.fondo}${emoji1.ojos}${emoji2.boca}${emoji1.accesorio}`
                    }
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={guardarFusion}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
            >
              💾 Guardar esta Fusión
            </button>

            {guardados.length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold mb-3">🔀 Fusiones Guardadas ({guardados.length})</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {guardados.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">
                          {item.fondo}{item.ojos}{item.boca}{item.accesorio}
                        </span>
                        <span className="text-sm text-gray-500">{item.fecha}</span>
                      </div>
                      <button
                        onClick={() => hacerFork(item)}
                        className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                      >
                        🔀 Fork
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}