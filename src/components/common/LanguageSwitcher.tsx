import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { LanguageCode } from '../../logic/types';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage } = useI18n();

  const languages: { code: LanguageCode; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'English' },
    { code: 'hi', label: 'Hindi', script: 'हिन्दी' },
    { code: 'kn', label: 'Kannada', script: 'ಕನ್ನಡ' },
  ];

  if (compact) {
    return (
      <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200/80 shadow-sm" role="group" aria-label="Language selection">
        {languages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              aria-pressed={isActive}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all min-h-[36px] flex items-center justify-center ${
                isActive
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {lang.script}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full" role="group" aria-label="Language selector">
      {languages.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={isActive}
            className={`min-h-touch px-5 py-4 rounded-2xl border-2 font-bold text-lg sm:text-xl transition-all flex flex-col items-center justify-center gap-1 shadow-sm ${
              isActive
                ? 'border-rose-700 bg-rose-50 text-rose-900 ring-2 ring-rose-600/30 shadow-md'
                : 'border-stone-200 bg-white text-stone-800 hover:border-rose-300 hover:bg-stone-50'
            }`}
          >
            <span className="text-xl sm:text-2xl font-bold">{lang.script}</span>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};
