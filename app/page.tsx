'use client';

import { useState } from 'react';

// Banco de palabras para adivinar
const PALABRAS = [
  { palabra: "manzana", emojis: "🍎", pista: "Fruta roja o verde" },
  { palabra: "perro", emojis: "🐕", pista: "Mejor amigo del hombre" },
  { palabra: "gato", emojis: "🐈", pista: "Maúlla" },
  { palabra: "pizza", emojis: "🍕", pista: "Comida italiana con queso" },
  { palabra: "futbol", emojis: "⚽", pista: "Deporte con balón" },
  { palabra: "cine", emojis: "🎬", pista: "Donde ves películas" },
  { palabra: "música", emojis: "🎵", pista: "Se escucha con los oídos" },
  { palabra: "playa", emojis: "🏖️", pista: "Arena y mar" },
  { palabra: "avión", emojis: "✈️", pista: "Vuela por el cielo" },
  { palabra: "computadora", emojis: "💻", pista: "Sirve para trabajar o jugar" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  // Estado del juego 1
  const [palabraActual1, setPalabraActual1] = useState(PALABRAS[0]);
  const [respuesta1, setRespuesta1] = useState('');
  const [mensaje1, setMensaje1] = useState('');
  const [puntaje1, setPuntaje1] = useState(0);
  const [indice1, setIndice1] = useState(0);
  
  // Estado del juego 2
  const [palabraActual2, setPalabraActual2] = useState(PALABRAS[0]);
  const [respuesta2, setRespuesta2] = useState('');
  const [mensaje2, setMensaje2] = useState('');
  const [puntaje2, setPuntaje2] = useState(0);
  const [indice2, setIndice2] = useState(0);
  
  // Objetos guardados (rondas ganadas)
  const [rondasGuardadas, setRondasGuardadas] = useState<any[]>([]);

  // Verificar respuesta Jugador 1
  const verificar1 = () => {
    if (respuesta1.toLowerCase() === palabraActual1.palabra) {
      setMensaje1('✅ ¡Correcto! +1 punto');
      setPuntaje1(puntaje1 + 1);
      siguientePalabra(1);
    } else {
      setMensaje1(`❌ Incorrecto. Era: ${palabraActual1.palabra}`);
      setTimeout(() => {
        siguientePalabra(1);
      }, 1500);
    }
    setRespuesta1('');
  };

  // Verificar respuesta Jugador 2
  const verificar2 = () => {
    if (respuesta2.toLowerCase() === palabraActual2.palabra) {
      setMensaje2('✅ ¡Correcto! +1 punto');
      setPuntaje2(puntaje2 + 1);
      siguientePalabra(2);
    } else {
      setMensaje2(`❌ Incorrecto. Era: ${palabraActual2.palabra}`);
      setTimeout(() => {
        siguientePalabra(2);
      }, 1500);
    }
    setRespuesta2('');
  };

  // Siguiente palabra
  const siguientePalabra = (jugador: 1 | 2) => {
    if (jugador === 1) {
      const nuevoIndice = (indice1 + 1) % PALABRAS.length;
      setIndice1(nuevoIndice);
      setPalabraActual1(PALABRAS[nuevoIndice]);
      setMensaje1('');
    } else {
      const nuevoIndice = (indice2 + 1) % PALABRAS.length;
      setIndice2(nuevoIndice);
      setPalabraActual2(PALABRAS[nuevoIndice]);
      setMensaje2('');
    }
  };

  // Reiniciar juego
  const reiniciarJuego = (jugador: 1 | 2) => {
    if (jugador === 1) {
      setPuntaje1(0);
      setIndice1(0);
      setPalabraActual1(PALABRAS[0]);
      setRespuesta1('');
      setMensaje1('');
    } else {
      setPuntaje2(0);
      setIndice2(0);
      setPalabraActual2(PALABRAS[0]);
      setRespuesta2('');
      setMensaje2('');
    }
  };

  // Guardar objeto (ronda final con puntajes)
  const guardarObjeto = () => {
    const objeto = {
      puntaje1: puntaje1,
      puntaje2: puntaje2,
      ganador: puntaje1 > puntaje2 ? 'Jugador 1' : puntaje2 > puntaje1 ? 'Jugador 2' : 'Empate',
      fecha: new Date().toLocaleTimeString(),
      totalRondas: indice1
    };
    setRondasGuardadas([...rondasGuardadas, objeto]);
    alert('✅ Partida guardada!');
  };

  // Hacer fork (cargar una partida guardada)
  const hacerFork = (partida: any) => {
    setPuntaje1(partida.puntaje1);
    setPuntaje2(partida.puntaje2);
    alert(`🔀 Fork creado! Partida del ${partida.fecha}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200">
      
      {/* Encabezado */}
      <header className="bg-white shadow p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          🤔 Adivina el Emoji
        </h1>
        <p className="text-center text-gray-500 text-sm">
          ¿Quién adivina más palabras?
        </p>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('tab1')}
            className={`flex-1 py-3 rounded-lg font-bold transition ${
              activeTab === 'tab1' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white text-blue-500 hover:bg-blue-100'
            }`}
          >
            🎮 Jugador 1
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className={`flex-1 py-3 rounded-lg font-bold transition ${
              activeTab === 'tab2' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-white text-green-500 hover:bg-green-100'
            }`}
          >
            🎯 Jugador 2
          </button>
          <button
            onClick={() => setActiveTab('objeto')}
            className={`flex-1 py-3 rounded-lg font-bold transition ${
              activeTab === 'objeto' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-white text-purple-500 hover:bg-purple-100'
            }`}
          >
            🏆 Objeto Final
          </button>
        </div>

        {/* Panel Jugador 1 */}
        {activeTab === 'tab1' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">🎮 Jugador 1</h2>
              <div className="text-xl font-bold">⭐ Puntaje: {puntaje1}</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 text-center mb-6">
              <p className="text-gray-500 mb-2">¿Qué palabra representa estos emojis?</p>
              <div className="text-8xl my-6">{palabraActual1.emojis}</div>
              <p className="text-sm text-gray-500">📌 Pista: {palabraActual1.pista}</p>
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={respuesta1}
                onChange={(e) => setRespuesta1(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && verificar1()}
                placeholder="Escribe tu respuesta..."
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={verificar1}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
              >
                Adivinar
              </button>
            </div>
            
            {mensaje1 && (
              <div className={`mt-4 p-3 rounded-lg text-center ${mensaje1.includes('Correcto') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {mensaje1}
              </div>
            )}
            
            <button
              onClick={() => reiniciarJuego(1)}
              className="mt-4 w-full py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
            >
              🔄 Reiniciar mi juego
            </button>
          </div>
        )}

        {/* Panel Jugador 2 */}
        {activeTab === 'tab2' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-600">🎯 Jugador 2</h2>
              <div className="text-xl font-bold">⭐ Puntaje: {puntaje2}</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 text-center mb-6">
              <p className="text-gray-500 mb-2">¿Qué palabra representa estos emojis?</p>
              <div className="text-8xl my-6">{palabraActual2.emojis}</div>
              <p className="text-sm text-gray-500">📌 Pista: {palabraActual2.pista}</p>
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={respuesta2}
                onChange={(e) => setRespuesta2(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && verificar2()}
                placeholder="Escribe tu respuesta..."
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={verificar2}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
              >
                Adivinar
              </button>
            </div>
            
            {mensaje2 && (
              <div className={`mt-4 p-3 rounded-lg text-center ${mensaje2.includes('Correcto') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {mensaje2}
              </div>
            )}
            
            <button
              onClick={() => reiniciarJuego(2)}
              className="mt-4 w-full py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
            >
              🔄 Reiniciar mi juego
            </button>
          </div>
        )}

        {/* Objeto Final / Resultados */}
        {activeTab === 'objeto' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">🏆 Resultado Final</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-4xl mb-2">🎮</p>
                <p className="font-bold text-blue-600">Jugador 1</p>
                <p className="text-3xl font-bold mt-2">{puntaje1}</p>
                <p className="text-sm text-gray-500">puntos</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <p className="text-4xl mb-2">🎯</p>
                <p className="font-bold text-green-600">Jugador 2</p>
                <p className="text-3xl font-bold mt-2">{puntaje2}</p>
                <p className="text-sm text-gray-500">puntos</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 text-center mb-6">
              <p className="text-xl font-bold">
                🏅 Ganador: {puntaje1 > puntaje2 ? 'Jugador 1' : puntaje2 > puntaje1 ? 'Jugador 2' : 'Empate'}
              </p>
            </div>

            <button
              onClick={guardarObjeto}
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600 transition mb-4"
            >
              💾 Guardar esta Partida
            </button>

            {/* Partidas guardadas (para Fork) */}
            {rondasGuardadas.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  🔀 Partidas Guardadas ({rondasGuardadas.length})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {rondasGuardadas.map((partida, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border flex justify-between items-center">
                      <div>
                        <div className="flex gap-4 text-sm">
                          <span>🎮 {partida.puntaje1}</span>
                          <span>🎯 {partida.puntaje2}</span>
                          <span className="font-bold text-purple-600">🏆 {partida.ganador}</span>
                        </div>
                        <p className="text-xs text-gray-500">{partida.fecha}</p>
                      </div>
                      <button
                        onClick={() => hacerFork(partida)}
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