import React from 'react';

interface Props {
  onStart: () => void;
}

export const WelcomeModal: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      
      {/* Карточка увеличилась по ширине (max-w-2xl), чтобы вместить 4 колонки */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center relative overflow-hidden">
        
        {/* Декоративная линия */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <h2 className="text-4xl font-bold text-white mb-2 mt-2">
          MathLogic <span className="text-blue-400">Nexus</span>
        </h2>
        <p className="text-slate-400 mb-8 text-lg">Interactive 3D Knowledge Graph</p>

        {/* Сетка теперь 2x2 на мобильных и 4 в ряд на десктопе */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-slate-300 text-sm">
          
          {/* 1. Вращение */}
          <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-3xl mb-2">🖱️</div>
            <strong className="text-white mb-1">Left Drag</strong>
            <span className="text-slate-500 text-xs">Rotate View</span>
          </div>

          {/* 2. Перемещение */}
          <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-3xl mb-2">✋</div>
            <strong className="text-white mb-1">Right Drag</strong>
            <span className="text-slate-500 text-xs">Move Camera</span>
          </div>

          {/* 3. Зум */}
          <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-3xl mb-2">📜</div>
            <strong className="text-white mb-1">Scroll</strong>
            <span className="text-slate-500 text-xs">Zoom In / Out</span>
          </div>

          {/* 4. Клик (ГЛАВНОЕ ДЕЙСТВИЕ - выделено цветом) */}
          <div className="flex flex-col items-center p-4 bg-blue-900/20 rounded-xl border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] transform hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">👆</div>
            <strong className="text-blue-100 mb-1">Click Node</strong>
            <span className="text-blue-300 text-xs">Read Details</span>
          </div>

        </div>

        <div className="text-slate-400 mb-8 text-sm leading-relaxed max-w-lg mx-auto">
          <p>
            Explore the foundations of mathematics: from <strong>Peano Arithmetic</strong> to <strong>Set Theory</strong>. 
            Use the search bar to find theorems and switch languages.
          </p>
        </div>

        <button 
          onClick={onStart}
          className="px-12 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/25 active:scale-95"
        >
          Start Exploring 🚀
        </button>
      </div>
    </div>
  );
};
