'use client';

import { useState } from 'react';

export default function FusionPage() {
  const [texto1, setTexto1] = useState('');
  const [texto2, setTexto2] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🧪 Calculadora de Fusión</h1>
      <div className="bg-white rounded-xl p-6 shadow">
        <label className="block mb-2">Texto 1:</label>
        <input 
          type="text" 
          value={texto1}
          onChange={(e) => setTexto1(e.target.value)} 
          placeholder="Ej: Hola" 
          className="w-full p-2 border rounded mb-4"
        />
        
        <label className="block mb-2">Texto 2:</label>
        <input 
          type="text" 
          value={texto2}
          onChange={(e) => setTexto2(e.target.value)} 
          placeholder="Ej: Mundo" 
          className="w-full p-2 border rounded mb-4"
        />

        <div className="mt-4 p-4 bg-purple-100 rounded text-center">
          <p className="font-bold">Fusión:</p>
          <p>{texto1} + {texto2} = {texto1}{texto2}</p>
        </div>
      </div>
    </div>
  );
}