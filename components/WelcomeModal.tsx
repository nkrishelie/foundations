import React from 'react';

interface Props {
  onStart: () => void;
}

export const WelcomeModal: React.FC<Props> = ({ onStart }) => {
  return (
    // Затемненный фон на весь экран
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      
      {/* Карточка */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center relative overflow-hidden">
        
        {/* Декоративная цветная полоска сверху */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Заголовок */}
        <h2 className="text-4xl font-bold text-white mb-2 mt-2">
          MathLogic <span className="text-blue-400">Nexus</span>
        </h2>
        <p className="text-slate-400 mb-8 text-lg">Interactive 3D Knowledge Graph</p>

        {/* Инструкция по управлению */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-slate-300 text-sm">
          <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-3xl mb-2">🖱️</div>
            <strong className="text-white mb-1">Left Click</strong>
            <span className="text-slate-500 text-xs">Rotate / Select</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-3xl mb-2">✋</div>
            <strong className="text-white mb-1">Right Click</strong>
            <span className="text-slate-500 text-xs">Pan / Move</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-3xl mb-2">📜</div>
            <strong className="text-white mb-1">Scroll</strong>
            <span className="text-slate-500 text-xs">Zoom In / Out</span>
          </div>
        </div>

        {/* Описание функционала */}
        <div className="text-slate-400 mb-8 text-sm leading-relaxed space-y-2">
          <p>
            Explore the foundations of mathematics: from <strong>Peano Arithmetic</strong> to <strong>Set Theory</strong> and <strong>Model Theory</strong>.
          </p>
          <p>
            <span className="inline-block bg-slate-800 rounded px-1.5 py-0.5 text-xs border border-slate-700">Search</span> nodes, 
            <span className="inline-block bg-slate-800 rounded px-1.5 py-0.5 text-xs border border-slate-700 mx-1">Switch Language</span> 
            and discover connections.
          </p>
        </div>

        {/* Кнопка старта */}
        <button 
          onClick={onStart}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/25 active:scale-95"
        >
          Start Exploring 🚀
        </button>
      </div>
    </div>
  );
};
