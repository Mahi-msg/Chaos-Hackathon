import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { SymptomTheme } from '../../logic/types';
import { BookOpen, AlertCircle, Sparkles } from 'lucide-react';

interface AssociatedConditionsProps {
  groupedThemes: SymptomTheme[];
  hasPcosFeatures?: boolean;
}

export const AssociatedConditions: React.FC<AssociatedConditionsProps> = ({
  groupedThemes,
}) => {
  const { t, tEn, language } = useI18n();
  const showBilingual = language !== 'en';

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col gap-5">
      {/* Section Header */}
      <div className="border-b border-stone-100 pb-2">
        <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-rose-600" />
          <span>{t('section_associated_conditions')}</span>
        </h3>
        {showBilingual && (
          <p className="text-xs text-stone-500 font-medium">
            {tEn('section_associated_conditions')}
          </p>
        )}
      </div>

      {/* Primary Plain-Language Association Text */}
      <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80">
        <p className="text-sm sm:text-base font-semibold text-rose-950 leading-relaxed">
          {t('associated_text_primary')}
        </p>
        <p className="text-xs sm:text-sm text-rose-800 mt-1.5 font-medium">
          {t('associated_text_disclaimer')}
        </p>

        {showBilingual && (
          <div className="mt-3 pt-3 border-t border-rose-200 text-xs text-rose-900/80">
            <p className="font-semibold">{tEn('associated_text_primary')}</p>
            <p className="mt-0.5">{tEn('associated_text_disclaimer')}</p>
          </div>
        )}
      </div>

      {/* PCOS Awareness & Suggestive Framing (NOT a diagnosis) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h4 className="text-base font-extrabold text-amber-950">
              {t('pcos_awareness_title')}
            </h4>
            {showBilingual && (
              <p className="text-xs font-semibold text-amber-800">
                {tEn('pcos_awareness_title')}
              </p>
            )}

            {/* Suggestion language: might be related / shares features, NOT a diagnosis */}
            <p className="text-sm text-amber-900 mt-2 font-medium leading-relaxed">
              {t('pcos_suggestion_intro')}
            </p>
            {showBilingual && (
              <p className="text-xs text-amber-800 mt-1 italic">
                {tEn('pcos_suggestion_intro')}
              </p>
            )}

            {/* Strict Non-Diagnosis Disclaimer Alert */}
            <div className="mt-3 p-3 bg-white/80 rounded-xl border border-amber-300 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{t('pcos_non_diagnosis_disclaimer')}</p>
                {showBilingual && (
                  <p className="mt-1 text-stone-600 font-normal">
                    {tEn('pcos_non_diagnosis_disclaimer')}
                  </p>
                )}
              </div>
            </div>

            {/* Plain educational awareness: What is PCOS? */}
            <div className="mt-4 pt-3 border-t border-amber-200/80">
              <h5 className="text-xs sm:text-sm font-bold text-amber-950">
                {t('pcos_what_is_title')}
              </h5>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                {t('pcos_what_is_desc')}
              </p>
              <p className="text-xs text-amber-800 font-medium mt-2">
                {t('pcos_why_see_doctor')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Themes Identified (Without risk scoring) */}
      {groupedThemes.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Symptom Themes Present in Your Log:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {groupedThemes.map((theme) => (
              <div
                key={theme.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between"
              >
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">
                    {t(theme.titleKey)}
                  </h5>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {t(theme.descriptionKey)}
                  </p>
                </div>
                {showBilingual && (
                  <div className="mt-2 pt-2 border-t border-stone-200 text-[11px] text-stone-500">
                    <p className="font-medium text-stone-700">{tEn(theme.titleKey)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
