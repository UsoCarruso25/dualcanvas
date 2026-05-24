'use client';

import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'result'>('tab1');
  
  // Canvas 1 y 2 (matrices 8x8)
  const [canvas1, setCanvas1] = useState<string[][]>(
    Array(8).fill(null).map(() => Array(8).fill('⬜'))
  );
  const [canvas2, setCanvas2] = useState<string[][]>(
    Array(8).fill(null).map(() => Array(8).fill('⬜'))
  );
  
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [showPicker, setShowPicker] = useState(false);
  const [currentCanvas, setCurrentCanvas] = useState<'tab1' | 'tab2'>('tab1');
  const [savedObjects, setSavedObjects] = useState<{canvas1: string[][], canvas2: string[][], merged: string}[]>([]);

  const handleCellClick = (row: number, col: number) => {
    if (currentCanvas === 'tab1') {
      const newCanvas = [...canvas1];
      newCanvas[row][col] = selectedEmoji;
      setCanvas1(newCanvas);
    } else {
      const newCanvas = [...canvas2];
      newCanvas[row][col] = selectedEmoji;
      setCanvas2(newCanvas);
    }
  };

  const saveObject = () => {
    // Crear objeto fusionado (combinación visual)
    let merged = '';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (canvas1[i][j] !== '⬜' && canvas2[i][j] !== '⬜') {
          merged += canvas1[i][j];
        } else if (canvas1[i][j] !== '⬜') {
          merged += canvas1[i][j];
        } else {
          merged += canvas2[i][j];
        }
      }
      merged += '\n';
    }
    
    setSavedObjects([...savedObjects, { canvas1, canvas2, merged }]);
    alert('✅ Objeto compartido guardado!');
  };

  const renderCanvas = (canvas: string[][], isEditable: boolean) => (
    <div className="grid grid-cols-8 gap-1">
      {canvas.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            onClick={() => isEditable && handleCellClick(i, j)}
            className="w-14 h-14 text-2xl border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center"
            disabled={!isEditable}
          >
            {cell}
          </button>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-center text-purple-600">✏️🎨 Dual Canvas PWA</h1>
        <p className="text-center text-sm text-gray-600">Dibuja con emojis en parejas</p>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex gap-2 border-b mb-4">
          <button
            onClick={() => { setActiveTab('tab1'); setCurrentCanvas('tab1'); }}
            className={`px-4 py-2 ${activeTab === 'tab1' ? 'border-b-2 border-pink-500 text-pink-600 font-bold' : ''}`}
          >
            🎨 Pestaña 1: Mi Lienzo
          </button>
          <button
            onClick={() => { setActiveTab('tab2'); setCurrentCanvas('tab2'); }}
            className={`px-4 py-2 ${activeTab === 'tab2' ? 'border-b-2 border-purple-500 text-purple-600 font-bold' : ''}`}
          >
            🖌️ Pestaña 2: Lienzo Pareja
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`px-4 py-2 ${activeTab === 'result' ? 'border-b-2 border-green-500 text-green-600 font-bold' : ''}`}
          >
            🌟 Objeto Compartido
          </button>
        </div>

        {/* Selector de emoji (visible en pestañas 1 y 2) */}
        {(activeTab === 'tab1' || activeTab === 'tab2') && (
          <div className="mb-4 flex gap-2 items-center">
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg text-2xl"
            >
              {selectedEmoji} 🖌️
            </button>
            <span className="text-sm text-gray-600">Pincel actual</span>
          </div>
        )}

        {showPicker && (
          <div className="absolute z-10">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                setSelectedEmoji(emoji.emoji);
                setShowPicker(false);
              }}
            />
          </div>
        )}

        {/* Pestaña 1 */}
        {activeTab === 'tab1' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">🎨 Tu creación con emojis</h2>
            {renderCanvas(canvas1, true)}
            <button
              onClick={() => setCanvas1(Array(8).fill(null).map(() => Array(8).fill('⬜')))}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              🧹 Limpiar mi lienzo
            </button>
          </div>
        )}

        {/* Pestaña 2 */}
        {activeTab === 'tab2' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">🖌️ La creación de tu pareja</h2>
            {renderCanvas(canvas2, true)}
            <button
              onClick={() => setCanvas2(Array(8).fill(null).map(() => Array(8).fill('⬜')))}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              🧹 Limpiar lienzo pareja
            </button>
          </div>
        )}

        {/* Objeto Compartido */}
        {activeTab === 'result' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">🌟 Objeto Final Compartido</h2>
            <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <div className="grid grid-cols-8 gap-1">
                {canvas1.map((row, i) =>
                  row.map((cell, j) => {
                    const cell2 = canvas2[i][j];
                    let finalEmoji = cell;
                    if (cell !== '⬜' && cell2 !== '⬜') finalEmoji = '💞';
                    else if (cell2 !== '⬜') finalEmoji = cell2;
                    return (
                      <div key={`result-${i}-${j}`} className="w-14 h-14 text-2xl border border-gray-200 flex items-center justify-center bg-white">
                        {finalEmoji}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
            <button onClick={saveObject} className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg">
              💾 Guardar Objeto Compartido
            </button>

            {savedObjects.length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold mb-2">📦 Objetos guardados ({savedObjects.length})</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {savedObjects.map((obj, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded border text-sm">
                      <pre className="text-xs">{obj.merged.substring(0, 100)}...</pre>
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