'use client';

import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function EmojiCanvas() {
  const [canvas, setCanvas] = useState<string[][]>(
    Array(10).fill(null).map(() => Array(10).fill('⬜'))
  );
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [showPicker, setShowPicker] = useState(false);
  const [savedDrawings, setSavedDrawings] = useState<string[][][]>([]);

  const handleCellClick = (row: number, col: number) => {
    const newCanvas = [...canvas];
    newCanvas[row][col] = selectedEmoji;
    setCanvas(newCanvas);
  };

  const saveDrawing = () => {
    setSavedDrawings([...savedDrawings, canvas]);
    alert('🎨 Dibujo guardado en la galería!');
  };

  const loadDrawing = (drawing: string[][]) => {
    setCanvas(drawing);
  };

  const clearCanvas = () => {
    setCanvas(Array(10).fill(null).map(() => Array(10).fill('⬜')));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🎨 Emoji Canvas Colaborativo</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        
        {/* Selector de emoji */}
        <div className="mb-4 flex gap-4 items-center">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg text-2xl"
          >
            {selectedEmoji} 🖌️
          </button>
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            🧹 Limpiar
          </button>
          <button
            onClick={saveDrawing}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            💾 Guardar
          </button>
        </div>

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

        {/* Grid de dibujo */}
        <div className="grid grid-cols-10 gap-1 mb-8">
          {canvas.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => handleCellClick(i, j)}
                className="w-12 h-12 text-2xl border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center"
              >
                {cell}
              </button>
            ))
          )}
        </div>

        {/* Galería de dibujos guardados */}
        {savedDrawings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">📸 Galería Colaborativa ({savedDrawings.length})</h2>
            <div className="grid grid-cols-3 gap-4">
              {savedDrawings.map((drawing, idx) => (
                <button
                  key={idx}
                  onClick={() => loadDrawing(drawing)}
                  className="p-2 border rounded hover:shadow-lg transition"
                >
                  <div className="grid grid-cols-5 gap-0">
                    {drawing.slice(0, 5).map((row, i) =>
                      row.slice(0, 5).map((cell, j) => (
                        <span key={`thumb-${idx}-${i}-${j}`} className="text-xl">
                          {cell}
                        </span>
                      ))
                    )}
                  </div>
                  <p className="text-xs mt-2 text-gray-600">Cargar este dibujo</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}