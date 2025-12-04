import React, { useState } from 'react';
import { Language } from '../types';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

interface Props {
  onStart: () => void;
  currentLang: Language;
  onToggleLang: (lang: Language) => void; 
}

// Описание шагов тура
const STEPS = [
  {
    id: 'intro',
    position: 'center',
    highlight: 'none',
    content: {
      ru: {
        title: 'Добро пожаловать в MathLogic Nexus',
        text: 'Это интерактивная 3D-карта оснований математики. Давайте я быстро покажу вам основные инструменты управления.'
      },
      en: {
        title: 'Welcome to MathLogic Nexus',
        text: 'This is an interactive 3D map of mathematical foundations. Let me quickly show you the main controls.'
      }
    }
  },
  {
    id: 'search',
    position: 'bottom-left-of-target',
    highlight: 'search-bar',
    content: {
      ru: {
        title: 'Поиск (Search)',
        text: 'Введите название теоремы или понятия. Выпадающий список позволит мгновенно сфокусироваться на нужном узле.'
      },
      en: {
        title: 'Search',
        text: 'Type a theorem or concept name. The dropdown list lets you instantly focus on the desired node.'
      }
    }
  },
  {
    id: 'controls',
    position: 'bottom-right-of-target',
    highlight: 'top-controls',
    content: {
      ru: {
        title: 'Настройки и Данные',
        text: 'Здесь можно переключить язык интерфейса (RU/EN) или скачать текущие данные графа в формате CSV.'
      },
      en: {
        title: 'Settings & Data',
        text: 'Here you can switch the interface language (RU/EN) or download the current graph data as CSV.'
      }
    }
  },
  {
    id: 'legend',
    position: 'left-of-target',
    highlight: 'legend-sidebar',
    content: {
      ru: {
        title: 'Легенда и Фильтры',
        text: 'Интерактивная легенда. Кликайте по кружкам или названиям, чтобы скрывать/показывать разделы. Цвета соответствуют дисциплинам.'
      },
      en: {
        title: 'Legend & Filters',
        text: 'Interactive legend. Click circles or names to hide/show sections. Colors correspond to disciplines.'
      }
    }
  },
  {
    id: 'nav-controls',
    position: 'right-of-target',
    highlight: 'bottom-left-nav',
    content: {
      ru: {
        title: 'Навигация',
        text: 'Кнопки для управления масштабом (+) (-) и быстрого возврата камеры в центр графа.'
      },
      en: {
        title: 'Navigation',
        text: 'Buttons to control zoom (+) (-) and quickly recenter the camera on the graph.'
      }
    }
  },
  {
    id: 'graph',
    position: 'bottom-left-corner',
    highlight: 'center-glow',
    content: {
      ru: {
        title: 'Граф (Graph View)',
        text: 'Вращение (ЛКМ), перемещение (ПКМ), зум (Колесо). Наведите мышь на узел или связь, чтобы увидеть название во всплывающей подсказке.'
      },
      en: {
        title: 'Graph View',
        text: 'Rotate (LMB), pan (RMB), zoom (Wheel). Hover over a node or a link to see its label in a tooltip.'
      }
    }
  },
  {
    id: 'details',
    position: 'left-of-card',
    highlight: 'mock-card-area',
    showMockCard: true,
    content: {
      ru: {
        title: 'Карточка Узла',
        text: 'Появляется при клике на узел. Содержит описание, формулы и связи. Карточку можно перетаскивать за заголовок.'
      },
      en: {
        title: 'Node Details',
        text: 'Appears when you click a node. Contains descriptions, formulas, and links. You can drag the card by its header.'
      }
    }
  }
];

export const WelcomeModal: React.FC<Props> = ({ onStart, currentLang: initialLang, onToggleLang }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [localLang, setLocalLang] = useState<Language>(initialLang);

  const activeLang = localLang;
  
  const toggleLang = (lang: Language) => {
    setLocalLang(lang);
    if (onToggleLang) onToggleLang(lang);
  };

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  // --- Логика позиционирования плашки туториала ---
  const getModalPositionStyles = (pos: string): React.CSSProperties => {
    const isMobile = window.innerWidth < 768;
    const base: React.CSSProperties = { position: 'absolute', zIndex: 110 };

    if (isMobile) {
      return { ...base, bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '90vw' };
    }

    // Увеличил ширину плашек (width) с 350px до 420px, чтобы русский текст влезал комфортно
    switch (pos) {
      case 'center':
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '480px' };
      case 'bottom-left-of-target':
        return { ...base, top: '140px', left: '20px', width: '420px' };
      case 'bottom-right-of-target':
        return { ...base, top: '100px', right: '20px', width: '420px' };
      case 'left-of-target':
        // Сдвигаем саму плашку левее, так как прожектор легенды тоже сдвинулся
        return { ...base, top: '150px', right: '340px', width: '420px' };
      case 'right-of-target':
        // Плашка справа от навигации
        return { ...base, bottom: '40px', left: '200px', width: '420px' };
      case 'bottom-left-corner':
        return { ...base, bottom: '40px', left: '40px', width: '420px' };
      case 'left-of-card':
        return { ...base, bottom: '100px', right: '520px', width: '420px' };
      default:
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  // --- Логика "Прожектора" ---
  const getHighlightStyle = (highlight: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      borderRadius: '8px',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
      transition: 'all 0.5s ease-in-out',
      pointerEvents: 'none',
      zIndex: 100, 
    };

    switch (highlight) {
      case 'none':
        return { ...base, top: '50%', left: '50%', width: '0px', height: '0px', boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)' };
      
      case 'search-bar':
        return { ...base, top: '10px', left: '10px', width: '320px', height: '110px', borderRadius: '12px' };
      
      case 'top-controls':
        // Опустили ниже (top: 20px) и чуть увеличили высоту (height: 70px)
        return { ...base, top: '20px', right: '10px', width: '220px', height: '70px', borderRadius: '30px' };
      
      case 'legend-sidebar':
        // Сдвиг влево (right: 60px) и увеличение высоты (75vh)
        return { ...base, top: '90px', right: '60px', width: '240px', height: '75vh', borderRadius: '12px' };
      
      case 'bottom-left-nav':
        // Сдвиг вправо (left: 60px) и увеличение высоты в 1.5 раза (270px)
        return { ...base, bottom: '10px', left: '60px', width: '120px', height: '270px', borderRadius: '12px' };
      
      case 'center-glow':
        return { 
          ...base, 
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '200px', height: '200px', borderRadius: '50%',
          boxShadow: '0 0 150px 100px rgba(59, 130, 246, 0.1), 0 0 0 9999px rgba(0,0,0,0.6)' 
        };
      
      case 'mock-card-area':
        return { 
          ...base, 
          bottom: '20px', right: '20px', 
          width: '500px', height: '400px', 
          borderRadius: '12px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8)'
        };
        
      default:
        return base;
    }
  };

  const handleNext = () => {
    if (isLastStep) {
        if (onStart) onStart();
    } else {
        setStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStepIndex(prev => Math.max(0, prev - 1));
  };

  const handleSkip = () => {
      if (onStart) onStart();
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden font-sans">
      {/* 1. Слой подсветки */}
      <div style={getHighlightStyle(currentStep.highlight)}></div>

      {/* 2. ДЕМО-КАРТОЧКА */}
      {currentStep.showMockCard && (
        <div 
          className="absolute z-[105] w-[95vw] md:w-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
          style={{ bottom: '20px', right: '20px', height: '400px' }}
        >
          {/* Mock Header: PEANO ARITHMETIC */}
          <div className="p-4 border-b border-slate-700 flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white leading-tight">
              {activeLang === 'en' ? 'Peano Arithmetic (PA)' : 'Арифметика Пеано (PA)'}
            </h2>
            <button className="text-slate-400 hover:text-white">✕</button>
          </div>
          
          {/* Mock Content */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-4">
              {/* Blue color for PA */}
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,1)]" />
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {activeLang === 'en' ? 'Logic / Formal Theory' : 'Логика / Формальная Теория'}
              </span>
            </div>
            
            <div className="text-slate-300 text-sm leading-relaxed mb-4">
              {activeLang === 'en' 
                ? 'First-order theory of natural numbers with induction.' 
                : 'Теория натуральных чисел первого порядка с индукцией.'}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
               {(activeLang === 'en' ? ['Successor', 'Induction Schema', 'Arithmetic Hierarchy'] : ['Следование', 'Схема индукции', 'Арифметическая иерархия']).map((tag, i) => (
                   <span key={i} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
                       {tag}
                   </span>
               ))}
            </div>
            
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50 text-center mb-4 text-slate-200">
               {/* Формула индукции */}
               <Latex>{`$\\varphi(0) \\land \\forall x (\\varphi(x) \\to \\varphi(S(x))) \\to \\forall x \\varphi(x)$`}</Latex>
            </div>
          </div>
        </div>
      )}

      {/* 3. Плашка Туториала */}
      <div 
        className="bg-slate-900 border border-blue-500/50 rounded-xl shadow-2xl p-6 flex flex-col transition-all duration-500 ease-in-out"
        style={getModalPositionStyles(currentStep.position)}
      >
        {/* Header: Title + Lang Switch */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-bold text-white leading-tight pr-4">
            {currentStep.content[activeLang].title}
          </h2>
          <div className="flex gap-1 shrink-0">
             <button 
               onClick={() => toggleLang('ru')}
               className={`text-[10px] px-2 py-1 rounded border ${activeLang === 'ru' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-600 text-slate-400 hover:text-white'}`}
             >RU</button>
             <button 
               onClick={() => toggleLang('en')}
               className={`text-[10px] px-2 py-1 rounded border ${activeLang === 'en' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-600 text-slate-400 hover:text-white'}`}
             >EN</button>
          </div>
        </div>

        {/* Text Body */}
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {currentStep.content[activeLang].text}
        </p>

        {/* Footer: Controls */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
          
          {/* Skip Button */}
          <button 
            onClick={handleSkip}
            className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider px-2 py-1 cursor-pointer"
          >
            {activeLang === 'en' ? 'Skip' : 'Пропустить'}
          </button>

          <div className="flex items-center gap-3">
             {/* Dots */}
             <div className="flex gap-1 hidden sm:flex">
              {STEPS.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === stepIndex ? 'bg-blue-500' : 'bg-slate-700'}`}
                />
              ))}
            </div>

            {/* Back */}
            {stepIndex > 0 && (
              <button 
                onClick={handleBack}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                ←
              </button>
            )}

            {/* Next */}
            <button 
              onClick={handleNext}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              {isLastStep 
                ? (activeLang === 'en' ? 'Start Exploring!' : 'Начать!') 
                : (activeLang === 'en' ? 'Next' : 'Далее')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
