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
    position: 'bottom-left-of-target', // Плашка будет ниже и правее цели
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
    position: 'bottom-right-of-target', // Плашка ниже и левее цели
    highlight: 'top-controls',
    content: {
      ru: {
        title: 'Настройки (Settings)',
        text: 'Здесь можно переключить язык, сменить тему (День/Ночь) или открыть это обучение заново.'
      },
      en: {
        title: 'Settings',
        text: 'Here you can switch languages, toggle the theme (Day/Night), or reopen this tutorial.'
      }
    }
  },
  {
    id: 'legend',
    position: 'left-of-target', // Плашка слева от цели
    highlight: 'legend-sidebar',
    content: {
      ru: {
        title: 'Легенда и Фильтры',
        text: 'Это интерактивная легенда. Кликайте по цветным кружкам или названиям типов, чтобы скрывать/показывать целые разделы на графе.'
      },
      en: {
        title: 'Legend & Filters',
        text: 'This is an interactive legend. Click on colored circles or type names to hide/show entire sections on the graph.'
      }
    }
  },
  {
    id: 'nav-controls',
    position: 'right-of-target', // Плашка справа от цели
    highlight: 'bottom-left-nav',
    content: {
      ru: {
        title: 'Навигация',
        text: 'Используйте эти кнопки для управления масштабом, центрирования камеры или переключения режимов просмотра (2D/3D).'
      },
      en: {
        title: 'Navigation',
        text: 'Use these buttons to control zoom, recenter the camera, or switch viewing modes (2D/3D).'
      }
    }
  },
  {
    id: 'graph',
    position: 'bottom-left-corner', // Плашка в углу, чтобы не закрывать центр
    highlight: 'center-glow',
    content: {
      ru: {
        title: 'Граф (Graph View)',
        text: 'Вращайте (ЛКМ), двигайте (ПКМ) и приближайте (Колесо). Названия узлов видны всегда. Кликните по узлу, чтобы узнать детали.'
      },
      en: {
        title: 'Graph View',
        text: 'Rotate (LMB), pan (RMB), and zoom (Wheel). Node labels are always visible. Click a node to see details.'
      }
    }
  },
  {
    id: 'details',
    position: 'left-of-card', // Плашка слева от демо-карточки
    highlight: 'mock-card-area', // Подсвечиваем зону, где появится карточка
    showMockCard: true, // Флаг для рендера муляжа
    content: {
      ru: {
        title: 'Карточка Узла',
        text: 'Она появляется при клике на узел. Здесь есть описание, LaTeX-формулы и список связей. Карточку можно перетаскивать за заголовок!'
      },
      en: {
        title: 'Node Details',
        text: 'Appears when you click a node. Contains descriptions, LaTeX formulas, and links. You can drag the card by its header!'
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

  // --- Логика позиционирования плашки туториала ---
  const getModalPositionStyles = (pos: string): React.CSSProperties => {
    const isMobile = window.innerWidth < 768;
    const base: React.CSSProperties = { position: 'absolute', zIndex: 70 };

    if (isMobile) {
      // На мобильном всегда внизу или в центре, чтобы не перекрывать важное сверху
      return { ...base, bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '90vw' };
    }

    switch (pos) {
      case 'center':
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px' };
      case 'bottom-left-of-target': // Для поиска (слева сверху) -> ставим ниже
        return { ...base, top: '140px', left: '20px', width: '350px' };
      case 'bottom-right-of-target': // Для кнопок (справа сверху) -> ставим ниже и левее
        return { ...base, top: '80px', right: '20px', width: '350px' };
      case 'left-of-target': // Для легенды (справа) -> ставим левее
        return { ...base, top: '150px', right: '280px', width: '350px' }; // 280px отступ от легенды
      case 'right-of-target': // Для навигации (слева снизу) -> ставим правее
        return { ...base, bottom: '40px', left: '140px', width: '350px' };
      case 'bottom-left-corner': // Для графа -> в угол
        return { ...base, bottom: '40px', left: '40px', width: '350px' };
      case 'left-of-card': // Для карточки (справа снизу) -> ставим левее
        return { ...base, bottom: '100px', right: '520px', width: '350px' };
      default:
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  // --- Логика "Прожектора" ---
  const getHighlightStyle = (highlight: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      borderRadius: '8px',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)', // Затемнение
      transition: 'all 0.5s ease-in-out',
      pointerEvents: 'none',
      zIndex: 40,
    };

    switch (highlight) {
      case 'none':
        // Начальный экран - просто затемнение всего (точка в центре)
        return { ...base, top: '50%', left: '50%', width: '0px', height: '0px', boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)' };
      
      case 'search-bar':
        // Поиск (input) + Заголовок
        return { ...base, top: '10px', left: '10px', width: '320px', height: '110px', borderRadius: '12px' };
      
      case 'top-controls':
        // Кнопки справа сверху (учитываем их отступы)
        return { ...base, top: '10px', right: '10px', width: '220px', height: '60px', borderRadius: '30px' };
      
      case 'legend-sidebar':
        // Легенда справа (с отступом сверху)
        return { ...base, top: '90px', right: '10px', width: '240px', height: '50vh', borderRadius: '12px' };
      
      case 'bottom-left-nav':
        // Кнопки навигации слева внизу
        return { ...base, bottom: '10px', left: '10px', width: '120px', height: '180px', borderRadius: '12px' };
      
      case 'center-glow':
        // Граф (мягкое свечение в центре)
        return { 
          ...base, 
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '200px', height: '200px', borderRadius: '50%',
          boxShadow: '0 0 150px 100px rgba(59, 130, 246, 0.1), 0 0 0 9999px rgba(0,0,0,0.6)' 
        };
      
      case 'mock-card-area':
        // Место для демо-карточки (справа внизу)
        return { 
          ...base, 
          bottom: '20px', right: '20px', 
          width: '500px', height: '400px', 
          borderRadius: '12px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8)' // Сильнее затемняем фон, чтобы выделить карточку
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

      {/* 2. ДЕМО-КАРТОЧКА (Показывается только на шаге 'details') */}
      {currentStep.showMockCard && (
        <div 
          className="absolute z-50 w-[95vw] md:w-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
          style={{ bottom: '20px', right: '20px', height: '400px' }}
        >
          {/* Mock Header */}
          <div className="p-4 border-b border-slate-700 flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white leading-tight">
              {activeLang === 'en' ? 'Set Theory' : 'Теория множеств'}
            </h2>
            <button className="text-slate-400">✕</button>
          </div>
          {/* Mock Content */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,1)]" />
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {activeLang === 'en' ? 'Foundations' : 'Основания'} / {activeLang === 'en' ? 'Discipline' : 'Раздел'}
              </span>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed mb-4">
              {activeLang === 'en' 
                ? 'Set theory is the branch of mathematical logic that studies sets, which can be informally described as collections of objects.' 
                : 'Теория множеств — раздел математической логики, изучающий множества, которые в общем смысле можно понимать как совокупности объектов.'}
            </div>
            <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50 text-center mb-4 text-slate-200">
               <Latex>{`$A \\cup B = \\{x : x \\in A \\lor x \\in B\\}$`}</Latex>
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
          
          {/* Skip Button (Теперь здесь, хорошо видна) */}
          <button 
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider px-2 py-1"
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
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                ←
              </button>
            )}

            {/* Next */}
            <button 
              onClick={handleNext}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95 whitespace-nowrap"
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
