import React, { useState } from 'react';
import { Language } from '../types';

interface Props {
  onStart: () => void;
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
}

// Контент для разных этапов
const CONTENT = {
  en: {
    // Step 0: Welcome
    welcomeTitle: "Welcome to MathLogic Nexus",
    welcomeSubtitle: "Interactive 3D Knowledge Graph",
    introText: "Explore the foundations of mathematics: from Peano Arithmetic to Set Theory. We have prepared a short tour of the interface.",
    btnStartTour: "Take a Tour",
    btnSkip: "Skip",

    // Step 1: Language & Search
    step1Title: "Language & Search",
    step1Desc: "Use the top bar to switch languages (RU/EN) and search for specific theorems or concepts.",
    
    // Step 2: Legend
    step2Title: "Interactive Legend",
    step2Desc: "Nodes are colored by discipline. Use the panel on the right to filter visible nodes.",

    // Step 3: Controls
    step3Title: "Navigation",
    step3Desc: "Use the joystick here (or mouse) to move. Left click to rotate, right click to pan, scroll to zoom.",

    // Actions
    next: "Next",
    back: "Back",
    finish: "Done! Let's Go 🚀"
  },
  ru: {
    // Step 0: Welcome
    welcomeTitle: "Добро пожаловать в MathLogic Nexus",
    welcomeSubtitle: "Интерактивный 3D Граф Знаний",
    introText: "Исследуйте основания математики: от Арифметики Пеано до Теории Множеств. Мы подготовили короткую экскурсию по интерфейсу.",
    btnStartTour: "Пройти обучение",
    btnSkip: "Пропустить",

    // Step 1: Language & Search
    step1Title: "Язык и Поиск",
    step1Desc: "В верхней панели переключайте язык (RU/EN) и ищите теоремы через поиск.",

    // Step 2: Legend
    step2Title: "Интерактивная Легенда",
    step2Desc: "Узлы раскрашены по дисциплинам. Правая панель позволяет фильтровать отображение.",

    // Step 3: Controls
    step3Title: "Навигация",
    step3Desc: "Джойстик для управления без мыши. ЛКМ — вращение, ПКМ — сдвиг, Колесо — масштаб.",

    // Actions
    next: "Далее",
    back: "Назад",
    finish: "Готово! Поехали 🚀"
  }
};

export const WelcomeModal: React.FC<Props> = ({ onStart, currentLang, onToggleLang }) => {
  const [tourStep, setTourStep] = useState(0); // 0 = Welcome Card, 1+ = Tour steps
  const t = CONTENT[currentLang];

  // Обработчики тура
  const handleNext = () => setTourStep(prev => prev + 1);
  const handleBack = () => setTourStep(prev => Math.max(0, prev - 1));
  const handleSkip = () => onStart(); // Кнопка "Пропустить" просто запускает приложение

  // Координаты подсветки (Spotlight) и позиция тултипа для каждого шага
  // Используем фиксированные классы Tailwind для позиционирования
  const getStepStyles = (step: number) => {
    switch (step) {
      case 1: // Язык и поиск (Верх)
        return {
          spotlight: "top-14 left-1/2 -translate-x-1/2 w-96 h-16 rounded-xl", // Опустили ниже (top-14)
          tooltip: "top-32 left-1/2 -translate-x-1/2",
          arrow: "-top-2 left-1/2 -translate-x-1/2 border-b-slate-800"
        };
      case 2: // Легенда (Справа)
        return {
          spotlight: "top-20 right-16 w-64 h-80 rounded-xl", // Сдвинули влево (right-16)
          tooltip: "top-40 right-[22rem]", // Тултип слева от легенды
          arrow: "top-8 -right-2 border-l-slate-800"
        };
      case 3: // Управление (Слева внизу)
        return {
          spotlight: "bottom-4 left-4 w-64 h-48 rounded-xl", // Увеличили зону (w-64 h-48)
          tooltip: "bottom-16 left-[18rem]", // Тултип справа от джойстика
          arrow: "bottom-8 -left-2 border-r-slate-800"
        };
      default:
        return { spotlight: "", tooltip: "", arrow: "" };
    }
  };

  const styles = getStepStyles(tourStep);

  // --- Рендер 0: Стартовая карточка ---
  if (tourStep === 0) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative overflow-hidden text-center">
          
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Язык внутри модалки для удобства */}
          <div className="absolute top-4 right-4 flex space-x-1 bg-slate-800 p-1 rounded-lg">
            <button onClick={() => onToggleLang('ru')} className={`px-2 py-1 rounded text-xs font-bold ${currentLang === 'ru' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>RU</button>
            <button onClick={() => onToggleLang('en')} className={`px-2 py-1 rounded text-xs font-bold ${currentLang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>EN</button>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 mt-4">{t.welcomeTitle}</h2>
          <p className="text-blue-400 text-lg mb-6">{t.welcomeSubtitle}</p>
          
          <p className="text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto">
            {t.introText}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setTourStep(1)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              {t.btnStartTour}
            </button>
            <button 
              onClick={handleSkip}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all border border-slate-700"
            >
              {t.btnSkip}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Рендер 1-3: Тур (Экскурсия) ---
  return (
    <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Затемнение фона (с вырезом "Spotlight" через box-shadow hack или просто рамку) 
          Поскольку честный mask сложен без библиотек, используем полупрозрачный бордер вокруг зоны интереса.
          Здесь используем упрощенный вариант: подсвеченная рамка + затемнение остального.
      */}
      
      {/* Глобальная подложка, чтобы перехватить клики вне зон (опционально, сейчас pointer-events-none на контейнере) */}
      
      {/* Зона подсветки (Spotlight Box) */}
      <div className={`absolute border-2 border-yellow-400/60 shadow-[0_0_0_9999px_rgba(0,0,0,0.75)] transition-all duration-500 ease-in-out z-40 ${styles.spotlight}`}>
         {/* Пульсирующий эффект */}
         <div className="absolute inset-0 bg-yellow-400/10 animate-pulse rounded-xl"></div>
      </div>

      {/* Карточка с подсказкой (Tooltip) */}
      <div className={`absolute z-50 w-80 bg-slate-800 border border-slate-600 rounded-xl p-5 shadow-2xl transition-all duration-500 ease-in-out pointer-events-auto ${styles.tooltip}`}>
        {/* Стрелочка (декоративная) */}
        <div className={`absolute w-0 h-0 border-8 border-transparent ${styles.arrow}`}></div>

        <div className="flex justify-between items-center mb-2">
           <h3 className="text-lg font-bold text-white">{
             tourStep === 1 ? t.step1Title : 
             tourStep === 2 ? t.step2Title : 
             t.step3Title
           }</h3>
           <span className="text-xs font-mono text-slate-500">{tourStep} / 3</span>
        </div>
        
        <p className="text-slate-300 text-sm mb-4 leading-snug">
           {
             tourStep === 1 ? t.step1Desc : 
             tourStep === 2 ? t.step2Desc : 
             t.step3Desc
           }
        </p>

        <div className="flex justify-between mt-2">
          <button 
            onClick={handleBack}
            className="text-slate-400 hover:text-white text-sm font-semibold px-2 py-1"
          >
            {t.back}
          </button>
          
          {tourStep < 3 ? (
            <button 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors"
            >
              {t.next}
            </button>
          ) : (
            <button 
              onClick={onStart} // Кнопка Готово вызывает onStart
              className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-green-500/20"
            >
              {t.finish}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
