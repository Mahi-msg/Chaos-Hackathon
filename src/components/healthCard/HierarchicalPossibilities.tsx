import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { HierarchyCondition } from '../../logic/types';
import {
  GitFork,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
  Stethoscope,
  TestTube2,
  HelpCircle,
} from 'lucide-react';

interface HierarchicalPossibilitiesProps {
  conditions: HierarchyCondition[];
}

export const HierarchicalPossibilities: React.FC<HierarchicalPossibilitiesProps> = ({
  conditions,
}) => {
  const { t, tEn, language } = useI18n();
  const showBilingual = language !== 'en';
  const [expandedId, setExpandedId] = useState<string | null>(conditions[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const tiers = [1, 2, 3] as const;

  const getTierBadgeStyle = (tier: number) => {
    switch (tier) {
      case 1:
        return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800';
      case 2:
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800';
      case 3:
      default:
        return 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700';
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs flex flex-col gap-5 transition-colors">
      {/* Header */}
      <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>{t('hierarchy_section_title')}</span>
          </h3>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            Non-Diagnostic
          </span>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          {t('hierarchy_section_subtitle')}
        </p>
        {showBilingual && (
          <p className="text-xs text-stone-500 mt-0.5 italic">
            {tEn('hierarchy_section_subtitle')}
          </p>
        )}
      </div>

      {/* Prominent Non-Diagnosis Suggestion Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
        <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">
            {t('pcos_non_diagnosis_disclaimer')}
          </p>
          {showBilingual && (
            <p className="mt-1 opacity-80">{tEn('pcos_non_diagnosis_disclaimer')}</p>
          )}
        </div>
      </div>

      {/* Hierarchical Tiers */}
      <div className="flex flex-col gap-6">
        {tiers.map((tierNum) => {
          const tierConditions = conditions.filter((c) => c.tier === tierNum);
          if (tierConditions.length === 0) return null;

          const tierTitleKey = `hierarchy_tier_${tierNum}_title`;

          return (
            <div key={`tier-${tierNum}`} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${getTierBadgeStyle(
                    tierNum
                  )}`}
                >
                  {t(tierTitleKey)}
                </span>
                <div className="h-px bg-stone-200 dark:bg-stone-800 flex-1" />
              </div>

              <div className="flex flex-col gap-2.5">
                {tierConditions.map((item) => {
                  const isExpanded = expandedId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        item.isSuggested
                          ? 'border-rose-300 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                      }`}
                    >
                      {/* Accordion Bar */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-stone-100/50 dark:hover:bg-stone-800/50 transition"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                              item.isSuggested
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                            }`}
                          >
                            <Stethoscope className="w-4 h-4" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-snug">
                                {t(item.titleKey)}
                              </h4>
                              {item.isSuggested && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 text-[10px] font-bold">
                                  <Sparkles className="w-3 h-3 text-rose-600" />
                                  <span>Pattern Matches Your Log</span>
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                              {t(item.subtitleKey)}
                            </p>
                          </div>
                        </div>

                        <div className="text-stone-400 shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="p-4 pt-2 border-t border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900 text-xs sm:text-sm text-stone-700 dark:text-stone-300 flex flex-col gap-3 animate-fade-in">
                          {/* Pattern Overlap Explanation */}
                          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60">
                            <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">
                              Clinical Pattern Similarity:
                            </span>
                            <p className="leading-relaxed">{t(item.explanationKey)}</p>
                            {showBilingual && (
                              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 italic">
                                {tEn(item.explanationKey)}
                              </p>
                            )}
                          </div>

                          {/* Differentiating Tests */}
                          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 text-teal-950 dark:text-teal-200">
                            <TestTube2 className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold block mb-0.5">
                                Tests Doctors Use to Check This:
                              </span>
                              <p>{t(item.differentiatingTestsKey)}</p>
                            </div>
                          </div>

                          {/* Questions to Ask Doctor */}
                          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200">
                            <HelpCircle className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold block mb-0.5">
                                Ask Your Doctor:
                              </span>
                              <p className="italic">{t(item.keyQuestionsKey)}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
