import React, { useState } from 'react';
import { Language } from '../types';
import Latex from 'react-latex-next';

interface Props {
  onClose: () => void;
  currentLang: Language;
  onToggleLang?: (lang: Language) => void; 
}

// Описание шагов тура
const STEPS = [
  {
    id: 'intro',
    position: 'center',
    highlight: 'none',
    content: {
      ru: {
        title: 'Добро пожаловать!',
        text: 'Это MathLogic Nexus — интерактивная 3D-карта оснований математики. Давайте быстро настроим интерфейс под вас.'
      },
      en: {
        title: 'Welcome!',
        text: 'This is MathLogic Nexus — an interactive 3D map of mathematical foundations. Let\'s quickly set up the interface for you.'
      }
    }
  },
  {
    id: 'search',
    position: 'bottom-left-of-target', 
    highlight: 'search-bar',
    content: {
      ru: {
        title: 'Поиск',
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
        title: 'Настройки',
        text: 'Переключение языка (RU/EN), темы (День/Ночь) и кнопка повторного запуска этого обучения.'
      },
      en: {
        title: 'Settings',
        text: 'Switch languages (RU/EN), toggle theme (Day/Night), or restart this tutorial.'
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
        text: 'Кликайте по элементам легенды, чтобы скрывать или показывать целые разделы математики на графе.'
      },
      en: {
        title: 'Legend & Filters',
        text: 'Click on legend items to hide or show entire mathematical disciplines on the graph.'
      }
    }
  },
  {
    id: 'nav-controls',
    position: 'right-of-target',
    highlight: 'bottom-left-nav',
    content: {
      ru: {
        title: 'Управление',
        text: 'Кнопки для быстрого масштабирования, возврата камеры в центр и переключения режимов (2D/3D).'
      },
      en: {
        title: 'Controls',
        text: 'Buttons for quick zoom, resetting the camera to center, and switching viewing modes (2D/3D).'
      }
    }
  },
  {
    id: 'graph',
    position: 'bottom-left-corner',
    highlight: 'center-glow',
    content: {
      ru: {
        title: 'Граф',
        text: 'Вращайте (ЛКМ), двигайте (ПКМ), приближайте (Колесо). Кликните по узлу для деталей.'
      },
      en: {
        title: 'The Graph',
        text: 'Rotate (LMB), pan (RMB), zoom (Wheel). Click on any node to see details.'
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
        text: 'Появляется при клике. Содержит формулы и связи. Попробуйте перетащить её за заголовок!'
      },
      en: {
        title: 'Node Details',
        text: 'Appears on click. Contains formulas and links. Try dragging it by the header!'
      }
    }
  }
];

export const WelcomeModal: React.FC<Props> = ({ onClose, currentLang: initialLang, onToggleLang }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [localLang, setLocalLang] = useState<Language>(initialLang);

  const activeLang = localLang;
  const toggleLang = (lang: Language) => {
    setLocalLang(lang);
    if (onToggleLang) onToggleLang(lang);
  };

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  // --- Позиционирование плашки (Modal) ---
  const getModalPositionStyles = (pos: string): React.CSSProperties => {
    const isMobile = window.innerWidth < 768;
    const base: React.CSSProperties = { position: 'absolute', zIndex: 70 };

    if (isMobile) {
      // На мобильном всегда внизу/центре, чтобы не перекрывать подсвечиваемый верх
      // Если подсвечиваем низ (nav), поднимаем плашку выше
      if (pos === 'right-of-target' || pos === 'bottom-left-corner' || pos === 'left-of-card') {
          return { ...base, top: '100px', left: '50%', transform: 'translateX(-50%)', width: '90vw' };
      }
      return { ...base, bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '90vw' };
    }

    switch (pos) {
      case 'center':
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px' };
      case 'bottom-left-of-target': // Поиск
        return { ...base, top: '140px', left: '20px', width: '350px' };
      case 'bottom-right-of-target': // Настройки
        return { ...base, top: '100px', right: '20px', width: '350px' };
      case 'left-of-target': // Легенда (сдвигаем левее, чтобы не наехать)
        return { ...base, top: '120px', right: '320px', width: '350px' }; 
      case 'right-of-target': // Навигация
        return { ...base, bottom: '40px', left: '140px', width: '350px' };
      case 'bottom-left-corner': // Граф
        return { ...base, bottom: '40px', left: '40px', width: '350px' };
      case 'left-of-card': // Карточка
        return { ...base, bottom: '100px', right: '540px', width: '350px' };
      default:
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  // --- Позиционирование Подсветки (Highlight) ---
  // Исправил координаты на 20px (вместо 10px), чтобы совпадать с p-4 (16px) + зазор
  const getHighlightStyle = (highlight: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      borderRadius: '12px',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)', // Затемнение
      transition: 'all 0.5s ease-in-out',
      pointerEvents: 'none',
      zIndex: 40,
    };

    switch (highlight) {
      case 'none':
        return { ...base, top: '50%', left: '50%', width: '0px', height: '0px', boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)' };
      
      case 'search-bar':
        // UIOverlay padding=4 (16px). Input height ~42px. Title ~40px.
        // Ставим top: 16px, left: 16px
        return { ...base, top: '16px', left: '16px', width: '350px', height: '100px' };
      
      case 'top-controls':
        // Кнопки справа вверху. top: 16px, right: 16px.
        // Ширина блока кнопок + Info примерно 150px
        return { ...base, top: '16px', right: '16px', width: '180px', height: '60px', borderRadius: '30px' };
      
      case 'legend-sidebar':
        // Легенда top-24 (96px). right-4 (16px).
        // Подсвечиваем всю высоту
        return { ...base, top: '96px', right: '16px', width: '250px', height: 'calc(100vh - 120px)', borderRadius: '12px' };
      
      case 'bottom-left-nav':
        // Навигация (предполагаем bottom-4 left-4)
        return { ...base, bottom: '16px', left: '16px', width: '100px', height: '120px' };
      
      case 'center-glow':
        return { 
          ...base, 
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '200px', height: '200px', borderRadius: '50%',
          boxShadow: '0 0 150px 100px rgba(59, 130, 246, 0.1), 0 0 0 9999px rgba(0,0,0,0.6)' 
        };
      
      case 'mock-card-area':
        // Карточка справа внизу. bottom-4 right-4.
        return { 
          ...base, 
          bottom: '16px', right: '16px', 
          width: '500px', height: '400px', 
          borderRadius: '12px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8)' 
        };
        
      default:
        return base;
    }
  };

  const handleNext = () => {
    if (isLastStep) onClose();
    else setStepIndex(prev => prev + 1);
  };

  const handleBack = () => {
    setStepIndex(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden font-sans">
      {/* 1. Слой подсветки */}
      <div style={getHighlightStyle(currentStep.highlight)}></div>

      {/* 2. ДЕМО-КАРТОЧКА (Только на шаге details) */}
      {currentStep.showMockCard && (
        <div 
          className="absolute z-50 w-[90vw] md:w-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
          style={{ bottom: '20px', right: '20px', height: '400px' }}
        >
          <div className="p-4 border-b border-slate-700 flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white leading-tight">
              {activeLang === 'en' ? 'Set Theory' : 'Теория множеств'}
            </h2>
            <button className="text-slate-400">✕</button>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,1)]" />
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {activeLang === 'en' ? 'Foundations' : 'Основания'}
              </span>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed mb-4">
              {activeLang === 'en' 
                ? 'Set theory is the branch of mathematical logic that studies sets.' 
                : 'Раздел математики, изучающий общие свойства множеств.'}
            </div>
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50 text-center mb-4 text-slate-200">
               <Latex>{`$x \\in A$`}</Latex>
            </div>
          </div>
        </div>
      )}

      {/* 3. Плашка Туториала */}
      <div 
        className="bg-slate-900 border border-blue-500/50 rounded-xl shadow-2xl p-5 flex flex-col transition-all duration-500 ease-in-out"
        style={getModalPositionStyles(currentStep.position)}
      >
        {/* Header Row: Title + Controls (Skip + Lang) */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-white leading-tight pr-2">
            {currentStep.content[activeLang].title}
          </h2>
          
          <div className="flex flex-col items-end gap-2">
            {/* Skip Button - Moved Here for Visibility */}
            <button 
                onClick={onClose}
                className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-wider transition-colors"
            >
                {activeLang === 'en' ? 'Skip ✕' : 'Пропустить ✕'}
            </button>

            {/* Lang Switch */}
            <div className="flex gap-1">
               <button 
                 onClick={() => toggleLang('ru')}
                 className={`text-[10px] px-1.5 py-0.5 rounded border ${activeLang === 'ru' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-600 text-slate-400 hover:text-white'}`}
               >RU</button>
               <button 
                 onClick={() => toggleLang('en')}
                 className={`text-[10px] px-1.5 py-0.5 rounded border ${activeLang === 'en' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-600 text-slate-400 hover:text-white'}`}
               >EN</button>
            </div>
          </div>
        </div>

        {/* Text Body */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4 min-h-[40px]">
          {currentStep.content[activeLang].text}
        </p>

        {/* Footer: Navigation */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800">
          
          {/* Back Button */}
          <div className="w-8">
            {stepIndex > 0 && (
              <button 
                onClick={handleBack}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-lg pb-1"
              >
                ←
              </button>
            )}
          </div>

          {/* Dots */}
          <div className="flex gap-1.5">
            {STEPS.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === stepIndex ? 'bg-blue-500 scale-125' : 'bg-slate-700'}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            {isLastStep 
              ? (activeLang === 'en' ? 'Finish' : 'Готово') 
              : (activeLang === 'en' ? 'Next' : 'Далее')}
          </button>
        </div>
      </div>
    </div>
  );
};
