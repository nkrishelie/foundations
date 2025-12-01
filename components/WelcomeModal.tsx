import React from 'react';
import { Language } from '../types';

interface Props {
  onStart: () => void;
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
}

// Словарь текстов
const CONTENT = {
  en: {
    subtitle: "Interactive 3D Knowledge Graph",
    mouseTitle: "MOUSE CONTROLS",
    leftDrag: "Left Drag",
    rotate: "Rotate View",
    rightDrag: "Right Drag",
    pan: "Move Camera",
    scroll: "Scroll",
    zoom: "Zoom In / Out",
    click: "Click Node",
    details: "Read Details",
    interfaceTitle: "INTERFACE & FEATURES",
    joystickTitle: "On-Screen Controls",
    joystickDesc: "Use the joystick in the bottom-left corner to rotate and zoom if you don't have a mouse.",
    langSearchTitle: "Language & Search",
    langSearchDesc: "Toggle RU/EN in the top bar. Use the search field to find theorems and concepts instantly.",
    legendTitle: "Color Legend",
    legendDesc: "Nodes are colored by Discipline. Check the Legend panel on the right to understand categories.",
    startBtn: "Start Exploring 🚀",
    descMain: "Explore the foundations of mathematics: from Peano Arithmetic to Set Theory."
  },
  ru: {
    subtitle: "Интерактивный 3D Граф Знаний",
    mouseTitle: "УПРАВЛЕНИЕ МЫШЬЮ",
    leftDrag: "ЛКМ (Тащить)",
    rotate: "Вращение",
    rightDrag: "ПКМ (Тащить)",
    pan: "Панорама / Сдвиг",
    scroll: "Колесо",
    zoom: "Масштаб",
    click: "Клик по Узлу",
    details: "Подробнее",
    interfaceTitle: "ИНТЕРФЕЙС И ФУНКЦИИ",
    joystickTitle: "Экранный Джойстик",
    joystickDesc: "Используйте джойстик в левом нижнем углу для навигации без мыши.",
    langSearchTitle: "Язык и Поиск",
    langSearchDesc: "Переключайте RU/EN в верхней панели. Используйте поиск для мгновенного нахождения теорем.",
    legendTitle: "Легенда и Категории",
    legendDesc: "Узлы раскрашены по дисциплинам. См. панель «Легенда» справа для расшифровки цветов.",
    startBtn: "Начать Исследование 🚀",
    descMain: "Исследуйте основания математики: от Арифметики Пеано до Теории Множеств."
  }
};

export const WelcomeModal: React.FC<Props> = ({ onStart, currentLang, onToggleLang }) => {
  const t = CONTENT[currentLang]; // Выбираем тексты на текущем языке

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Декоративная линия */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Переключатель языков (Абсолютное позиционирование в углу) */}
        <div className="absolute top-4 right-4 flex space-x-1 bg-slate-800/80 p-1 rounded-lg border border-slate-600/50">
          <button 
            onClick={() => onToggleLang('ru')} 
            className={`px-2 py-1 rounded text-xs font-bold transition-all ${currentLang === 'ru' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            RU
          </button>
          <button 
            onClick={() => onToggleLang('en')} 
            className={`px-2 py-1 rounded text-xs font-bold transition-all ${currentLang === 'en' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            EN
          </button>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-8 mt-2">
          <h2 className="text-4xl font-bold text-white mb-2">
            MathLogic <span className="text-blue-400">Nexus</span>
          </h2>
          <p className="text-slate-400 text-lg">{t.subtitle}</p>
        </div>

        {/* Секция 1: Мышь */}
        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700/50 pb-2">
          {t.mouseTitle}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-2xl mb-2">🖱️</div>
            <strong className="text-white mb-1 text-xs sm:text-sm">{t.leftDrag}</strong>
            <span className="text-slate-500 text-[10px] sm:text-xs">{t.rotate}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-2xl mb-2">✋</div>
            <strong className="text-white mb-1 text-xs sm:text-sm">{t.rightDrag}</strong>
            <span className="text-slate-500 text-[10px] sm:text-xs">{t.pan}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="text-2xl mb-2">📜</div>
            <strong className="text-white mb-1 text-xs sm:text-sm">{t.scroll}</strong>
            <span className="text-slate-500 text-[10px] sm:text-xs">{t.zoom}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-900/20 rounded-xl border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
            <div className="text-2xl mb-2">👆</div>
            <strong className="text-blue-100 mb-1 text-xs sm:text-sm">{t.click}</strong>
            <span className="text-blue-300 text-[10px] sm:text-xs">{t.details}</span>
          </div>
        </div>

        {/* Секция 2: Интерфейс */}
        <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 border-b border-slate-700/50 pb-2">
          {t.interfaceTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm text-slate-300">
          <div className="flex items-start space-x-3">
            <span className="text-2xl bg-slate-800 rounded p-1">🎮</span>
            <div>
              <strong className="text-white block mb-1">{t.joystickTitle}</strong>
              <p className="text-slate-400 text-xs leading-relaxed">{t.joystickDesc}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl bg-slate-800 rounded p-1">🌐</span>
            <div>
              <strong className="text-white block mb-1">{t.langSearchTitle}</strong>
              <p className="text-slate-400 text-xs leading-relaxed">{t.langSearchDesc}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl bg-slate-800 rounded p-1">🎨</span>
            <div>
              <strong className="text-white block mb-1">{t.legendTitle}</strong>
              <p className="text-slate-400 text-xs leading-relaxed">{t.legendDesc}</p>
            </div>
          </div>
        </div>

        {/* Описание и Кнопка */}
        <p className="text-slate-400 text-sm text-center mb-6 max-w-lg mx-auto">
          {t.descMain}
        </p>

        <div className="text-center mt-auto">
          <button 
            onClick={onStart}
            className="px-16 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 active:scale-95"
          >
            {t.startBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
