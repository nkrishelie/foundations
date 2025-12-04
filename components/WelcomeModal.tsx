import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface Props {
  onClose: () => void;
  currentLang: Language;
  // Делаем опциональным, чтобы не ломать App.tsx, если проп не передан
  onToggleLang?: (lang: Language) => void; 
}

// Описание шагов тура
const STEPS = [
  {
    id: 'intro',
    position: 'center', // Логическая позиция
    highlight: 'center',
    content: {
      ru: {
        title: 'Добро пожаловать в MathLogic Nexus',
        text: 'Это интерактивная карта оснований математики. Давайте я быстро покажу вам, как здесь всё устроено.'
      },
      en: {
        title: 'Welcome to MathLogic Nexus',
        text: 'This is an interactive map of mathematical foundations. Let me quickly show you how it works.'
      }
    }
  },
  {
    id: 'search',
    position: 'top-left',
    highlight: 'top-left',
    content: {
      ru: {
        title: 'Поиск и Навигация',
        text: 'Введите название теоремы или понятия здесь. Используйте выпадающий список для быстрого перехода к узлу.'
      },
      en: {
        title: 'Search & Navigation',
        text: 'Type a theorem or concept name here. Use the dropdown list to quickly jump to a specific node.'
      }
    }
  },
  {
    id: 'controls',
    position: 'top-right',
    highlight: 'top-right',
    content: {
      ru: {
        title: 'Настройки и Экспорт',
        text: 'Переключайте язык (RU/EN), тему (Dark/Light) и скачивайте данные графа в CSV формате.'
      },
      en: {
        title: 'Settings & Export',
        text: 'Switch languages (RU/EN), themes (Dark/Light), and download graph data in CSV format.'
      }
    }
  },
  {
    id: 'legend',
    position: 'right', // Чуть ниже
    highlight: 'right-sidebar',
    content: {
      ru: {
        title: 'Легенда и Фильтры',
        text: 'Кликайте по элементам легенды, чтобы скрывать или показывать целые разделы математики или типы узлов (теоремы, аксиомы).'
      },
      en: {
        title: 'Legend & Filters',
        text: 'Click on legend items to hide or show entire mathematical disciplines or node types (theorems, axioms).'
      }
    }
  },
  {
    id: 'graph',
    position: 'center',
    highlight: 'center-glow',
    content: {
      ru: {
        title: 'Интерактивный Граф',
        text: 'Вращайте граф (ЛКМ), перемещайте (ПКМ) и приближайте (Колесо). Кликните по любому узлу, чтобы сфокусироваться на нем.'
      },
      en: {
        title: 'Interactive Graph',
        text: 'Rotate (LMB), pan (RMB), and zoom (Wheel) the graph. Click on any node to focus and see details.'
      }
    }
  },
  {
    id: 'details',
    position: 'bottom-right',
    highlight: 'bottom-card',
    content: {
      ru: {
        title: 'Карточка Узла',
        text: 'Здесь появится подробная информация: описание, формулы и список связанных понятий. Карточку можно перетаскивать!'
      },
      en: {
        title: 'Node Details',
        text: 'Detailed info appears here: description, formulas, and related concepts. You can drag this card around!'
      }
    }
  }
];

export const WelcomeModal: React.FC<Props> = ({ onClose, currentLang: initialLang, onToggleLang }) => {
  const [stepIndex, setStepIndex] = useState(0);
  // Локальное состояние языка для демо, если функция переключения не передана сверху
  const [localLang, setLocalLang] = useState<Language>(initialLang);

  // Используем переданный переключатель или локальный
  const activeLang = localLang;
  const toggleLang = (lang: Language) => {
    setLocalLang(lang);
    if (onToggleLang) onToggleLang(lang);
  };

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  // Функция вычисления классов позиционирования
  const getPositionClasses = (pos: string) => {
    switch (pos) {
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'top-left':
        return 'top-20 left-4 md:left-10 md:top-24';
      case 'top-right':
        return 'top-20 right-4 md:right-32 md:top-20';
      case 'right':
        return 'top-40 right-4 md:right-10';
      case 'bottom-right':
        return 'bottom-20 right-4 md:right-10 md:bottom-10';
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  // Функция вычисления позиции "прожектора" (подсветки)
  const getHighlightStyle = (highlight: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      borderRadius: '50%',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)', // Затемнение всего остального
      transition: 'all 0.5s ease-in-out',
      pointerEvents: 'none',
      zIndex: 40,
    };

    switch (highlight) {
      case 'top-left':
        return { ...base, top: '60px', left: '20px', width: '300px', height: '60px', borderRadius: '10px' };
      case 'top-right':
        return { ...base, top: '10px', right: '10px', width: '200px', height: '60px', borderRadius: '10px' };
      case 'right-sidebar':
        return { ...base, top: '100px', right: '10px', width: '220px', height: '400px', borderRadius: '10px' };
      case 'center-glow':
         // Просто свечение в центре
         return { ...base, top: '50%', left: '50%', width: '0px', height: '0px', boxShadow: '0 0 100px 100px rgba(59, 130, 246, 0.2), 0 0 0 9999px rgba(0,0,0,0.6)' }; 
      case 'bottom-card':
         // Имитация позиции карточки
         return { ...base, bottom: '20px', right: '20px', width: '350px', height: '400px', borderRadius: '12px' };
      default: // center
         return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1px', height: '1px', boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)' };
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStepIndex(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* 1. Highlight / Backdrop Layer */}
      <div style={getHighlightStyle(currentStep.highlight)}></div>

      {/* 2. Skip Button (Always visible, high z-index) */}
      <button 
        onClick={onClose}
        className="absolute top-4 left-4 z-[70] px-4 py-2 bg-slate-800/90 text-slate-400 hover:text-white rounded-full text-sm font-bold border border-slate-700 backdrop-blur-md transition-colors"
      >
        {activeLang === 'en' ? 'Skip Tutorial' : 'Пропустить'}
      </button>

      {/* 3. Main Content Card (Floating) */}
      <div 
        className={`absolute z-[70] w-[90vw] md:w-[400px] bg-slate-900 border border-blue-500/30 rounded-xl shadow-2xl p-6 transition-all duration-500 ease-in-out flex flex-col`}
        style={{}} // Позиция управляется классами Tailwind ниже
        className={getPositionClasses(currentStep.position) + " absolute z-[70] w-[90vw] md:w-[400px] bg-slate-900 border border-blue-500/30 rounded-xl shadow-2xl p-6 transition-all duration-500 ease-in-out flex flex-col"}
      >
        {/* Header: Title + Lang Switch */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-white leading-tight">
            {currentStep.content[activeLang].title}
          </h2>
          <div className="flex gap-1 ml-2 shrink-0">
             <button 
               onClick={() => toggleLang('ru')}
               className={`text-xs px-2 py-1 rounded transition-colors ${activeLang === 'ru' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
             >RU</button>
             <button 
               onClick={() => toggleLang('en')}
               className={`text-xs px-2 py-1 rounded transition-colors ${activeLang === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
             >EN</button>
          </div>
        </div>

        {/* Text Body */}
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {currentStep.content[activeLang].text}
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-auto">
          {/* Back Button (Hidden on step 0) */}
          <div className="w-20">
            {stepIndex > 0 && (
              <button 
                onClick={handleBack}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                {activeLang === 'en' ? '← Back' : '← Назад'}
              </button>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-1.5">
            {STEPS.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === stepIndex ? 'bg-blue-500 scale-125' : 'bg-slate-700'}`}
              />
            ))}
          </div>

          {/* Next/Finish Button */}
          <button 
            onClick={handleNext}
            className="w-24 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            {isLastStep 
              ? (activeLang === 'en' ? 'Start!' : 'Начать!') 
              : (activeLang === 'en' ? 'Next →' : 'Далее →')}
          </button>
        </div>
      </div>
    </div>
  );
};
