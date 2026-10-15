import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { Sparkles, Utensils, Footprints, Moon, BookMarked } from 'lucide-react';

interface LifestyleHabitsProps {
  tips: string[];
}

export const LifestyleHabits: React.FC<LifestyleHabitsProps> = ({ tips }) => {
  const { t, tEn, language } = useI18n();
  const showBilingual = language !== 'en';

  const getTipIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Utensils className="w-5 h-5 text-rose-600" />;
      case 1:
        return <Footprints className="w-5 h-5 text-teal-600" />;
      case 2:
        return <Moon className="w-5 h-5 text-indigo-600" />;
      case 3:
      default:
        return <BookMarked className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-600" />
            <span>{t('section_lifestyle_habits')}</span>
          </h3>
          {showBilingual && (
            <p className="text-xs text-stone-500 font-medium">
              {tEn('section_lifestyle_habits')}
            </p>
          )}
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full">
          General Wellness
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((tipKey, idx) => (
          <div
            key={tipKey}
            className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-stone-100 flex items-center justify-center shrink-0">
              {getTipIcon(idx)}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
                {t(tipKey)}
              </p>
              {showBilingual && (
                <p className="text-[11px] text-stone-500 mt-1">
                  {tEn(tipKey)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
