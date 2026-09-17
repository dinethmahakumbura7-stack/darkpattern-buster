import { useState } from 'react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="w-80 p-4 bg-slate-900 text-slate-100 font-sans">
      <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-4">
        <h1 className="text-lg font-bold text-emerald-400">DarkPattern Buster</h1>
        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">v1.0</span>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl text-center mb-4 border border-slate-700">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Deception Score</p>
        <div className="text-4xl font-extrabold text-emerald-400">{score}/100</div>
        <p className="text-xs text-emerald-500 mt-1">Page looks clean</p>
      </div>

      <button
        onClick={() => setScore(prev => (prev === 0 ? 65 : 0))}
        className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition shadow"
      >
        Simulate Scan
      </button>
    </div>
  );
}