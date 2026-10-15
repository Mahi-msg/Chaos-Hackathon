import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { RedFlagId, RedFlagState } from '../../logic/types';
import {
  ShieldAlert,
  Droplet,
  Zap,
  Activity,
  HeartPulse,
  Sparkles,
  Volume2,
  ArrowRight,
  Check,
  X,
} from 'lucide-react';

interface RedFlagItemConfig {
  id: RedFlagId;
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
}

interface Screen5Props {
  redFlags: RedFlagState;
  onChange: (flags: RedFlagState) => void;
  onNext: () => void;
}

export const Screen5RedFlags: React.FC<Screen5Props> = ({
  redFlags,
  onChange,
  onNext,
}) => {
  const { t, speak } = useI18n();

  const redFlagItems: RedFlagItemConfig[] = [
    {
      id: 'heavy_bleeding',
      titleKey: 'rf_heavy_bleeding_title',
      descKey: 'rf_heavy_bleeding_desc',
      icon: <Droplet className="w-6 h-6 text-rose-600" />,
    },
    {
      id: 'severe_pelvic_pain',
      titleKey: 'rf_severe_pelvic_pain_title',
      descKey: 'rf_severe_pelvic_pain_desc',
      icon: <Zap className="w-6 h-6 text-amber-600" />,
    },
    {
      id: 'fainting_dizziness',
      titleKey: 'rf_fainting_dizziness_title',
      descKey: 'rf_fainting_dizziness_desc',
      icon: <Activity className="w-6 h-6 text-indigo-600" />,
    },
    {
      id: 'pregnancy_with_pain',
      titleKey: 'rf_pregnancy_with_pain_title',
      descKey: 'rf_pregnancy_with_pain_desc',
      icon: <HeartPulse className="w-6 h-6 text-emerald-600" />,
    },
    {
      id: 'rapid_voice_or_hair',
      titleKey: 'rf_rapid_voice_or_hair_title',
      descKey: 'rf_rapid_voice_or_hair_desc',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
    },
  ];

  const handleSelect = (id: RedFlagId, value: boolean) => {
    onChange({
      ...redFlags,
      [id]: value,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8">
      {/* Heading */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mb-2">
          <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {t('redflags_title')}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-lg mx-auto">
          {t('redflags_subtitle')}
        </p>
      </div>

      {/* 5 Visual Questions */}
      <div className="flex flex-col gap-3.5 mb-8">
        {redFlagItems.map((item) => {
          const isYes = redFlags[item.id] === true;
          const isNo = redFlags[item.id] === false;

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isYes
                  ? 'border-amber-400 bg-amber-50/70 shadow-sm'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              {/* Question Text & Icon */}
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-stone-900">
                      {t(item.titleKey)}
                    </h3>
                    <button
                      type="button"
                      onClick={() => speak(`${t(item.titleKey)}. ${t(item.descKey)}`)}
                      aria-label={`${t('speaker_button_label')}: ${t(item.titleKey)}`}
                      className="p-1 text-stone-400 hover:text-stone-700 transition"
                      title={t('speaker_button_label')}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>

              {/* Big Yes / No Option Buttons */}
              <div className="flex items-center gap-2 sm:shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleSelect(item.id, false)}
                  className={`min-h-touch px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-1.5 ${
                    isNo
                      ? 'bg-stone-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('btn_no')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelect(item.id, true)}
                  className={`min-h-touch px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-1.5 ${
                    isYes
                      ? 'bg-amber-600 text-white ring-2 ring-amber-400 shadow-xs'
                      : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('btn_yes')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue to Visit-Ready Card */}
      <div className="max-w-xl mx-auto">
        <button
          type="button"
          onClick={onNext}
          className="min-h-touch w-full py-4 px-6 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <span>{t('btn_next')}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
