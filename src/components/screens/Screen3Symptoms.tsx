import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { SelectedSymptom, SymptomDuration, SymptomId } from '../../logic/types';
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
  Check,
  Volume2,
  Mic,
  ArrowRight,
} from 'lucide-react';
import { simulateVoiceSymptomExtraction } from '../../services/mockLlmService';

interface SymptomConfig {
  id: SymptomId;
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  bgGradient: string;
}

interface Screen3Props {
  selectedSymptoms: SelectedSymptom[];
  onChange: (symptoms: SelectedSymptom[]) => void;
  onNext: () => void;
  llmEnabled?: boolean;
}

export const Screen3Symptoms: React.FC<Screen3Props> = ({
  selectedSymptoms,
  onChange,
  onNext,
  llmEnabled = false,
}) => {
  const { t, speak, language } = useI18n();
  const [isVoiceProcessing, setIsVoiceProcessing] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const symptomList: SymptomConfig[] = [
    {
      id: 'irregular_periods',
      titleKey: 'symptom_irregular_periods_title',
      descKey: 'symptom_irregular_periods_desc',
      icon: <CalendarClock className="w-7 h-7 text-rose-600" />,
      bgGradient: 'from-rose-50 to-pink-50',
    },
    {
      id: 'long_gaps',
      titleKey: 'symptom_long_gaps_title',
      descKey: 'symptom_long_gaps_desc',
      icon: <Clock className="w-7 h-7 text-amber-600" />,
      bgGradient: 'from-amber-50 to-orange-50',
    },
    {
      id: 'extra_hair',
      titleKey: 'symptom_extra_hair_title',
      descKey: 'symptom_extra_hair_desc',
      icon: <User className="w-7 h-7 text-teal-600" />,
      bgGradient: 'from-teal-50 to-emerald-50',
    },
    {
      id: 'acne',
      titleKey: 'symptom_acne_title',
      descKey: 'symptom_acne_desc',
      icon: <Flame className="w-7 h-7 text-rose-500" />,
      bgGradient: 'from-red-50 to-rose-50',
    },
    {
      id: 'hair_thinning',
      titleKey: 'symptom_hair_thinning_title',
      descKey: 'symptom_hair_thinning_desc',
      icon: <Scissors className="w-7 h-7 text-purple-600" />,
      bgGradient: 'from-purple-50 to-indigo-50',
    },
    {
      id: 'weight_gain',
      titleKey: 'symptom_weight_gain_title',
      descKey: 'symptom_weight_gain_desc',
      icon: <Activity className="w-7 h-7 text-blue-600" />,
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      id: 'dark_patches',
      titleKey: 'symptom_dark_patches_title',
      descKey: 'symptom_dark_patches_desc',
      icon: <Layers className="w-7 h-7 text-stone-600" />,
      bgGradient: 'from-stone-50 to-neutral-100',
    },
    {
      id: 'fertility_trouble',
      titleKey: 'symptom_fertility_trouble_title',
      descKey: 'symptom_fertility_trouble_desc',
      icon: <Baby className="w-7 h-7 text-emerald-600" />,
      bgGradient: 'from-emerald-50 to-teal-50',
    },
    {
      id: 'mood_fatigue',
      titleKey: 'symptom_mood_fatigue_title',
      descKey: 'symptom_mood_fatigue_desc',
      icon: <Smile className="w-7 h-7 text-violet-600" />,
      bgGradient: 'from-violet-50 to-purple-50',
    },
    {
      id: 'mood_swings',
      titleKey: 'symptom_mood_swings_title',
      descKey: 'symptom_mood_swings_desc',
      icon: <Smile className="w-7 h-7 text-pink-600" />,
      bgGradient: 'from-pink-50 to-rose-50',
    },
  ];

  const durations: { value: SymptomDuration; labelKey: string }[] = [
    { value: 'under_3_months', labelKey: 'duration_under_3_months' },
    { value: '3_to_12_months', labelKey: 'duration_3_to_12_months' },
    { value: 'over_1_year', labelKey: 'duration_over_1_year' },
  ];

  const isSelected = (id: SymptomId) => selectedSymptoms.some((s) => s.id === id);

  const getDuration = (id: SymptomId): SymptomDuration => {
    return selectedSymptoms.find((s) => s.id === id)?.duration || '3_to_12_months';
  };

  const toggleSymptom = (id: SymptomId) => {
    if (isSelected(id)) {
      onChange(selectedSymptoms.filter((s) => s.id !== id));
    } else {
      onChange([...selectedSymptoms, { id, duration: '3_to_12_months' }]);
    }
  };

  const setDuration = (id: SymptomId, duration: SymptomDuration) => {
    onChange(
      selectedSymptoms.map((s) => (s.id === id ? { ...s, duration } : s))
    );
  };

  const handleVoiceDemo = async () => {
    setIsVoiceProcessing(true);
    setVoiceNotice(t('voice_input_simulating'));
    try {
      const result = await simulateVoiceSymptomExtraction(language);
      // Merge extracted symptoms
      const currentIds = new Set(selectedSymptoms.map((s) => s.id));
      const newItems = result.suggestedSymptoms.filter((s) => !currentIds.has(s.id));
      onChange([...selectedSymptoms, ...newItems]);
      setVoiceNotice(`"${result.transcript}"`);
    } finally {
      setIsVoiceProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* Screen Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {t('symptoms_title')}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-xl mx-auto">
          {t('symptoms_subtitle')}
        </p>

        {/* Optional Voice Input Feature (Behind Feature Flag or Demo) */}
        {llmEnabled && (
          <div className="mt-4 inline-block">
            <button
              type="button"
              onClick={handleVoiceDemo}
              disabled={isVoiceProcessing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-50 border border-rose-300 text-rose-900 text-xs sm:text-sm font-semibold hover:bg-rose-100 transition shadow-xs"
            >
              <Mic className={`w-4 h-4 text-rose-600 ${isVoiceProcessing ? 'animate-bounce' : ''}`} />
              <span>{t('voice_input_label')}</span>
            </button>
            {voiceNotice && (
              <p className="text-xs text-rose-700 mt-1 italic max-w-md">{voiceNotice}</p>
            )}
          </div>
        )}
      </div>

      {/* Multi-Select Symptom Cards Grid (Responsive: 1 col on mobile, 2 col sm, 3 col lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {symptomList.map((item) => {
          const selected = isSelected(item.id);
          const currentDur = getDuration(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-2xl border-2 transition-all overflow-hidden flex flex-col justify-between ${
                selected
                  ? 'border-rose-600 bg-white ring-2 ring-rose-500/20 shadow-md'
                  : 'border-stone-200 bg-white hover:border-rose-300 shadow-xs'
              }`}
            >
              {/* Clickable Card Header */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleSymptom(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSymptom(item.id);
                  }
                }}
                className={`p-4 cursor-pointer select-none bg-gradient-to-br ${item.bgGradient} flex-1`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-stone-100 flex items-center justify-center">
                    {item.icon}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Speaker audio button specifically for this symptom card */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(`${t(item.titleKey)}. ${t(item.descKey)}`);
                      }}
                      aria-label={`${t('speaker_button_label')}: ${t(item.titleKey)}`}
                      className="w-9 h-9 rounded-full bg-white/90 text-stone-600 hover:text-rose-700 hover:bg-white flex items-center justify-center shadow-xs transition"
                      title={t('speaker_button_label')}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Selection Checkbox */}
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition ${
                        selected
                          ? 'border-rose-600 bg-rose-600 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {selected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {t(item.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>

              {/* 1 Simple Follow-up Question when selected */}
              {selected && (
                <div className="p-3.5 bg-rose-50/70 border-t border-rose-100 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-950">
                      {t('symptom_how_long_prompt')}
                    </span>
                    <button
                      type="button"
                      onClick={() => speak(t('symptom_how_long_prompt'))}
                      className="text-rose-700 hover:text-rose-900 p-0.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {durations.map((dur) => {
                      const isDurActive = currentDur === dur.value;
                      return (
                        <button
                          key={dur.value}
                          type="button"
                          onClick={() => setDuration(item.id, dur.value)}
                          className={`min-h-touch py-2 px-1 text-[11px] sm:text-xs font-semibold rounded-xl transition text-center flex items-center justify-center ${
                            isDurActive
                              ? 'bg-rose-700 text-white shadow-xs font-bold'
                              : 'bg-white text-stone-700 border border-rose-200 hover:bg-rose-100/60'
                          }`}
                        >
                          {t(dur.labelKey)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky / Accessible Navigation Bar */}
      <div className="sticky bottom-4 z-30 max-w-xl mx-auto">
        <button
          type="button"
          onClick={onNext}
          className="min-h-touch w-full py-4 px-6 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
        >
          <span>
            {t('btn_next')} {selectedSymptoms.length > 0 ? `(${selectedSymptoms.length})` : ''}
          </span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
