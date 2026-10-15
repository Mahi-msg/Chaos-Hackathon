import React from 'react';
import { Sparkles, Trash2, Heart, ArrowLeft } from 'lucide-react';
import { useI18n } from '../../i18n/i18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SpeakerButton } from './SpeakerButton';
import { ThemeToggle } from './ThemeToggle';

export type ActiveNavTab = 'home' | 'check' | 'journal' | 'findcare' | 'pcos_guide' | 'explore';

interface StepHeaderProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onClearData: () => void;
  onLoadDemo: () => void;
  screenTextToRead: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  activeTab,
  onSelectTab,
  currentStep,
  totalSteps,
  onBack,
  onClearData,
  onLoadDemo,
  screenTextToRead,
}) => {
  const { t } = useI18n();

  const navItems: { id: ActiveNavTab; labelKey: string }[] = [
    { id: 'home', labelKey: 'nav_home' },
    { id: 'check', labelKey: 'nav_check' },
    { id: 'pcos_guide', labelKey: 'nav_pcos_guide' },
    { id: 'journal', labelKey: 'nav_journal' },
    { id: 'findcare', labelKey: 'nav_findcare' },
    { id: 'explore', labelKey: 'nav_explore' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors shadow-xs">
      {/* Top Bar: Brand, Actions & Theme */}
      <div className="max-w-4xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Left: Brand & Back */}
        <div className="flex items-center gap-2">
          {activeTab === 'check' && onBack && currentStep > 1 && (
            <button
              type="button"
              onClick={onBack}
              aria-label={t('btn_back')}
              className="min-h-touch min-w-touch p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-1.5 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white leading-tight">
                Yajnaseni
              </h1>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
                {activeTab === 'check'
                  ? `Assessment (${currentStep}/${totalSteps})`
                  : t('app_tagline')}
              </p>
            </div>
          </button>
        </div>

        {/* Right: Demo button, Theme, Speaker, Language, Delete */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Demo Profile button */}
          <button
            type="button"
            onClick={onLoadDemo}
            className="px-2.5 py-1.5 bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 hover:bg-rose-100 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-semibold flex items-center gap-1 min-h-[36px] transition"
            title="Pre-fills a sample PCOS-like pattern for quick review"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden md:inline">{t('demo_button')}</span>
            <span className="md:hidden">Demo</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Speaker Button */}
          <SpeakerButton textToRead={screenTextToRead} />

          {/* Language Switcher */}
          <LanguageSwitcher compact />

          {/* Delete Data button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t('btn_clear_data') + '?')) {
                onClearData();
              }
            }}
            aria-label={t('btn_clear_data')}
            className="min-h-touch min-w-touch p-2 rounded-xl text-stone-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition flex items-center justify-center"
            title={t('btn_clear_data')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar (Scrollable on mobile) */}
      <nav className="border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-900/60 overflow-x-auto no-scrollbar">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-1 sm:gap-2 min-w-max py-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-pressed={isActive}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center whitespace-nowrap min-h-[36px] ${
                  isActive
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                }`}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Progress bar active only on Check Assessment tab */}
      {activeTab === 'check' && (
        <div className="w-full bg-stone-100 dark:bg-stone-800 h-1 overflow-hidden">
          <div
            className="bg-rose-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
};
