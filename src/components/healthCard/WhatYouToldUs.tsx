import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { SelectedSymptom, SymptomId } from '../../logic/types';
import {
  CalendarClock,
  Clock,
  User,
  Flame,
  Scissors,
  Activity,
  Layers,
  Baby,
  Smile,
} from 'lucide-react';

interface WhatYouToldUsProps {
  selectedSymptoms: SelectedSymptom[];
}

export const WhatYouToldUs: React.FC<WhatYouToldUsProps> = ({ selectedSymptoms }) => {
  const { t, tEn, language } = useI18n();
  const showBilingual = language !== 'en';

  const getSymptomIcon = (id: SymptomId) => {
    switch (id) {
      case 'irregular_periods':
        return <CalendarClock className="w-5 h-5 text-rose-600" />;
      case 'long_gaps':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'extra_hair':
        return <User className="w-5 h-5 text-teal-600" />;
      case 'acne':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'hair_thinning':
        return <Scissors className="w-5 h-5 text-purple-600" />;
      case 'weight_gain':
        return <Activity className="w-5 h-5 text-blue-600" />;
      case 'dark_patches':
        return <Layers className="w-5 h-5 text-stone-600" />;
      case 'fertility_trouble':
        return <Baby className="w-5 h-5 text-emerald-600" />;
      case 'mood_fatigue':
      default:
        return <Smile className="w-5 h-5 text-violet-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            {t('section_what_you_told')}
          </h3>
          {showBilingual && (
            <p className="text-xs text-stone-500 font-medium">
              {tEn('section_what_you_told')} (Bilingual)
            </p>
          )}
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-full">
          {selectedSymptoms.length} reported
        </span>
      </div>

      {selectedSymptoms.length === 0 ? (
        <p className="text-sm text-stone-500 italic py-2">
          No specific symptoms were selected during this review.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {selectedSymptoms.map((item) => {
            const titleKey = `symptom_${item.id}_title`;
            const durKey = item.duration;

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-stone-100 flex items-center justify-center shrink-0">
                  {getSymptomIcon(item.id)}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Left / Chosen Language */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                      {t(titleKey)}
                    </h4>
                    <span className="inline-block self-start sm:self-auto text-[11px] font-semibold px-2 py-0.5 bg-rose-100 text-rose-800 rounded-lg">
                      {t(durKey)}
                    </span>
                  </div>

                  {/* Side-by-side or stacked English translation for clinician review */}
                  {showBilingual && (
                    <div className="mt-1.5 pt-1.5 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-stone-600 gap-0.5">
                      <span className="font-medium text-stone-700">
                        {tEn(titleKey)}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {tEn(durKey)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
