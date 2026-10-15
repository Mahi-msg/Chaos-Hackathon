import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';

interface Screen1Props {
  onNext: () => void;
  onLoadDemo: () => void;
}

export const Screen1Language: React.FC<Screen1Props> = ({ onNext, onLoadDemo }) => {
  const { t } = useI18n();

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-rose-100 text-rose-700 flex items-center justify-center mb-6 shadow-inner">
        <HeartHandshake className="w-10 h-10 sm:w-12 sm:h-12" />
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
        {t('language_select_title')}
      </h1>
      <p className="text-base sm:text-lg text-stone-600 mb-8 max-w-md">
        {t('language_select_subtitle')}
      </p>

      {/* 3 Large Native Script Buttons */}
      <div className="w-full mb-8">
        <LanguageSwitcher compact={false} />
      </div>

      {/* Action Buttons: Next & Demo */}
      <div className="w-full flex flex-col gap-3">
        <button
          type="button"
          onClick={onNext}
          className="min-h-touch w-full py-4 px-6 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-lg sm:text-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <span>{t('btn_next')}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={onLoadDemo}
          className="min-h-touch w-full py-3 px-5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-sm sm:text-base transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>{t('demo_button')}</span>
        </button>
      </div>

      <p className="mt-8 text-xs text-stone-400 font-medium">
        {t('card_footer_disclaimer')}
      </p>
    </div>
  );
};
