import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface Props {
  onStart: () => void;
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
}

const CONTENT = {
  en: {
    welcomeTitle: "Welcome to MathLogic Nexus",
    welcomeSubtitle: "Interactive 3D Knowledge Graph",
    introText: "Explore the foundations of mathematics: from Peano Arithmetic to Set Theory.",
    mobileWarning: "For the best experience, please use a desktop computer (FullHD+). This interface is optimized for large screens.",
    btnStartTour: "Take a Tour",
    btnSkip: "Skip",
    step1Title: "Language & Search",
    step1Desc: "Toggle RU/EN and search for theorems in the top-right panel.",
    step2Title: "Interactive Legend",
    step2Desc: "Nodes are colored by Discipline. You can filter visibility by Sections and Types here.",
    step3Title: "Navigation",
    step3Desc: "Use the joystick (bottom-left) or mouse: Left Click to rotate, Right Click to pan, Scroll to zoom.",
    next: "Next",
    back: "Back",
    finish: "Let's Go 🚀"
  },
  ru: {
    welcomeTitle: "Добро пожаловать в MathLogic Nexus",
    welcomeSubtitle: "Интерактивный 3D Граф Знаний",
    introText: "Исследуйте основания математики: от Арифметики Пеано до Теории Множеств.",
    mobileWarning: "Для работы с графом рекомендуется использовать компьютер (экран FullHD). Интерфейс оптимизирован для мыши и большого экрана.",
    btnStartTour: "Пройти обучение",
    btnSkip: "Пропустить",
    step1Title: "Язык и Поиск",
    step1Desc: "Переключение языка (RU/EN) и поиск понятий находятся в правой верхней части экрана.",
    step2Title: "Интерактивная Легенда",
    step2Desc: "Узлы раскрашены по дисциплинам. Здесь можно фильтровать граф по Разделам и Типам.",
    step3Title: "Навигация",
    step3Desc: "Джойстик (слева внизу) или мышь: ЛКМ — вращение, ПКМ — сдвиг, Колесо — масштаб.",
    next: "Далее",
    back: "Назад",
    finish: "Поехали 🚀"
  }
};

export const WelcomeModal: React.FC<Props> = ({ onStart, currentLang, onToggleLang }) => {
  const [tourStep, setTourStep] = useState(0); 
  const [isMobile, setIsMobile] = useState(false);
  const t = CONTENT[currentLang];

  // Проверка ширины экрана
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = () => setTourStep(prev => prev + 1);
  const handleBack = () => setTourStep(prev => Math.max(0, prev - 1));
  const handleSkip = () => onStart();

  // --- КООРДИНАТЫ ПОДСВЕТКИ (Скорректированные) ---
  const getStepStyles = (step: number) => {
    switch (step) {
      case 1: // Язык и поиск (Правый верхний угол)
        return {
          // Привязываем к правому углу, где обычно живут контролы
          spotlight: "top-2 right-4 w-80 h-16 rounded-xl", 
          tooltip: "top-24 right-8", 
          arrow: "-top-2 right-10 border-b-slate-800"
        };
      case 2: // Легенда (Правый край, середина-низ)
        return {
          // Сдвигаем ближе к краю (right-2) и делаем выше/длиннее
          spotlight: "top-24 right-2 w-64 h-[70vh] rounded-xl", 
          tooltip: "top-40 right-[18rem]", 
          arrow: "top-8 -right-2 border-l-slate-800"
        };
      case 3: // Навигация (Левый нижний угол)
        return {
          // Чуть поднимаем (bottom-8) и уменьшаем размеры, чтобы не светить в пустоту
          spotlight: "bottom-8 left-8 w-40 h-40 rounded-full", 
          tooltip: "bottom-16 left-56", 
          arrow: "bottom-8 -left-2 border-r-slate-800"
        };
      default:
        return { spotlight: "", tooltip: "", arrow: "" };
    }
  };

  const styles = getStepStyles(tourStep);

  // --- Рендер: Мобильная заглушка ---
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 p-6 text-center">
        <div className="max-w-md text-white">
          <div className="text-4xl mb-4">🖥️</div>
          <h2 className="text-2xl font-bold mb-2">MathLogic Nexus</h2>
          <p className="text-slate-400">{t.mobileWarning}</p>
          <button onClick={handleSkip} className="mt-8 text-sm text-slate-600 underline">
            {currentLang === 'en' ? "Continue anyway" : "Всё равно продолжить"}
          </button>
        </div>
      </div>
    );
  }

  // --- Рендер 0: Приветствие ---
  if (tourStep === 0) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="absolute top-4 right-4 flex space-x-1 bg-slate-800 p-1 rounded-lg">
            <button onClick={() => onToggleLang('ru')} className={`px-2 py-1 rounded text-xs font-bold ${currentLang === 'ru' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>RU</button>
            <button onClick={() => onToggleLang('en')} className={`px-2 py-1 rounded text-xs font-bold ${currentLang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>EN</button>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 mt-4">{t.welcomeTitle}</h2>
          <p className="text-blue-400 text-lg mb-6">{t.welcomeSubtitle}</p>
          <p className="text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto">{t.introText}</p>

          <div className="flex justify-center gap-4">
            <button onClick={() => setTourStep(1)} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
              {t.btnStartTour}
            </button>
            <button onClick={handleSkip} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all border border-slate-700">
              {t.btnSkip}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Рендер 1-3: Тур ---
  return (
    <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
      <div className={`absolute border-2 border-yellow-400/60 shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] transition-all duration-500 ease-in-out z-40 ${styles.spotlight}`}>
         <div className="absolute inset-0 bg-yellow-400/10 animate-pulse rounded-xl"></div>
      </div>

      <div className={`absolute z-50 w-80 bg-slate-800 border border-slate-600 rounded-xl p-5 shadow-2xl transition-all duration-500 ease-in-out pointer-events-auto ${styles.tooltip}`}>
        <div className={`absolute w-0 h-0 border-8 border-transparent ${styles.arrow}`}></div>
        <div className="flex justify-between items-center mb-2">
           <h3 className="text-lg font-bold text-white">{tourStep === 1 ? t.step1Title : tourStep === 2 ? t.step2Title : t.step3Title}</h3>
           <span className="text-xs font-mono text-slate-500">{tourStep} / 3</span>
        </div>
        <p className="text-slate-300 text-sm mb-4 leading-snug">{tourStep === 1 ? t.step1Desc : tourStep === 2 ? t.step2Desc : t.step3Desc}</p>
        <div className="flex justify-between mt-2">
          <button onClick={handleBack} className="text-slate-400 hover:text-white text-sm font-semibold px-2 py-1">{t.back}</button>
          {tourStep < 3 ? (
            <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors">{t.next}</button>
          ) : (
            <button onClick={onStart} className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-green-500/20">{t.finish}</button>
          )}
        </div>
      </div>
    </div>
  );
};
