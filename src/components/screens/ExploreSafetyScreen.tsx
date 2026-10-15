import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
} from 'lucide-react';

export const ExploreSafetyScreen: React.FC = () => {
  const { t } = useI18n();
  const [openMyth, setOpenMyth] = useState<number | null>(0);

  const toggleMyth = (idx: number) => {
    setOpenMyth((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col gap-8">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 mb-2">
          <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('explore_title')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1 max-w-xl mx-auto">
          {t('explore_subtitle')}
        </p>
      </div>

      {/* 3 Integrity Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-900 dark:text-white text-base">
            {t('explore_guarantee_1_title')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {t('explore_guarantee_1_desc')}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-900 dark:text-white text-base">
            {t('explore_guarantee_2_title')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {t('explore_guarantee_2_desc')}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-900 dark:text-white text-base">
            {t('explore_guarantee_3_title')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {t('explore_guarantee_3_desc')}
          </p>
        </div>
      </div>

      {/* PCOS Myth Busters */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs flex flex-col gap-4">
        <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-600" />
          <span>{t('explore_mythbusters_title')}</span>
        </h2>

        <div className="flex flex-col gap-3">
          {[
            { qKey: 'explore_myth_1_q', aKey: 'explore_myth_1_a' },
            { qKey: 'explore_myth_2_q', aKey: 'explore_myth_2_a' },
          ].map((myth, idx) => {
            const isOpen = openMyth === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleMyth(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                >
                  <span className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
                    {t(myth.qKey)}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-stone-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed animate-fade-in">
                    {t(myth.aKey)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
