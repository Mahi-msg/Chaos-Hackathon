import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import {
  BookOpen,

  
  Activity,
  Layers,
  HelpCircle,
  Apple,
  
  Info,
  
} from 'lucide-react';

export const PcosMenopauseGuide: React.FC = () => {
  const { t, language } = useI18n();
  const showBilingual = language !== 'en';
  const [activeTab, setActiveTab] = useState<'pcos' | 'menopause' | 'overlap'>('pcos');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col gap-6">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 mb-2">
          <BookOpen className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          PCOS & Menopause Guide
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1 max-w-xl mx-auto">
          Clear, evidence-aligned awareness on hormones, cycles, and life transitions.
        </p>
      </div>

      {/* Guide Tabs Selector */}
      <div className="flex rounded-2xl bg-stone-100 dark:bg-stone-800 p-1.5 border border-stone-200 dark:border-stone-700 max-w-xl mx-auto w-full">
        <button
          type="button"
          onClick={() => setActiveTab('pcos')}
          className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition text-center ${
            activeTab === 'pcos'
              ? 'bg-white dark:bg-stone-900 text-rose-700 dark:text-rose-300 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          {t('guide_tab_pcos')}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('menopause')}
          className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition text-center ${
            activeTab === 'menopause'
              ? 'bg-white dark:bg-stone-900 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          {t('guide_tab_menopause')}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('overlap')}
          className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition text-center ${
            activeTab === 'overlap'
              ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-300 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          {t('guide_tab_overlap')}
        </button>
      </div>

      {/* Tab 1: PCOS In-Depth Guide */}
      {activeTab === 'pcos' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs flex flex-col gap-6 animate-fade-in">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
              Awareness & Education
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-2">
              {t('guide_pcos_header')}
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
              {t('guide_pcos_body')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-600" />
                <span>Pillar 1: Androgen Effects</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                All women produce androgens (male-type hormones like testosterone). In PCOS, slightly elevated levels or sensitive receptors can trigger facial or chin hair, acne on the jawline, or thinning scalp hair.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-600" />
                <span>Pillar 2: Insulin Resistance</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                Insulin helps cells absorb glucose. When cells become resistant, the pancreas produces more insulin. Higher insulin signals the ovaries to produce more androgens and makes weight management around the midsection harder.
              </p>
            </div>
          </div>

          {/* Supportive Nutrition & Lifestyle */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 flex flex-col gap-3">
            <h3 className="font-bold text-rose-950 dark:text-rose-200 text-sm sm:text-base flex items-center gap-2">
              <Apple className="w-5 h-5 text-rose-700 dark:text-rose-400" />
              <span>Evidence-Based Daily Habits</span>
            </h3>
            <ul className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 flex flex-col gap-2 list-disc list-inside">
              <li><strong>Balanced Plate:</strong> Pair carbohydrates with protein and healthy fats to prevent glucose spikes.</li>
              <li><strong>Gentle Daily Movement:</strong> Walking for 20 minutes after meals improves muscle insulin sensitivity.</li>
              <li><strong>Restorative Sleep:</strong> Getting 7-8 hours lowers cortisol, which helps stabilize cycles.</li>
              <li><strong>Track Consistently:</strong> Logging periods and mood in the Sakhi Journal helps your gynecologist identify your personal pattern.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Perimenopause & Menopause */}
      {activeTab === 'menopause' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs flex flex-col gap-6 animate-fade-in">
          <div>
            <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
              Lifecycle Transition
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-2">
              {t('guide_menopause_header')}
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
              {t('guide_menopause_body')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col gap-1">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Phase 1</span>
              <h3 className="font-bold text-stone-900 dark:text-white text-base">Perimenopause</h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                Typically begins in the 40s (sometimes late 30s). Ovary hormone output fluctuates, causing periods to arrive earlier or months apart.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col gap-1">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Phase 2</span>
              <h3 className="font-bold text-stone-900 dark:text-white text-base">Menopause</h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                Diagnosed retroactively after 12 consecutive months without a period. Average age in India is 46 to 48 years.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col gap-1">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Phase 3</span>
              <h3 className="font-bold text-stone-900 dark:text-white text-base">Postmenopause</h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                The years following menopause. Focus shifts to bone density (osteoporosis prevention), heart health, and vitality.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-teal-900 dark:text-teal-200 leading-relaxed">
              <strong>Common signs to discuss with your doctor:</strong> hot flashes, night sweats, unexpected cycle gaps, mood swings, vaginal dryness, and sleep disruption. Modern medicine offers safe lifestyle and medical interventions to smooth this transition.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: PCOS + Menopause Overlap */}
      {activeTab === 'overlap' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs flex flex-col gap-6 animate-fade-in">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              Specialized Overlap Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-2">
              {t('guide_overlap_header')}
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
              {t('guide_overlap_body')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-white text-base">
                Why PCOS Persists Beyond Periods
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                While ovulation ceases at menopause, metabolic factors (like how your liver and tissues handle glucose and triglycerides) persist. Women with a history of PCOS continue to benefit from regular HbA1c and lipid testing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <h3 className="font-bold text-stone-900 dark:text-white text-base">
                Cardiovascular & Bone Wellness
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                Estrogen naturally protects blood vessels and bone density. As estrogen levels drop during perimenopause, weight-bearing exercise (strength training, brisk walking) and dietary calcium/Vitamin D are essential.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200">
              <span className="font-bold block mb-1">Questions to Ask Your Gynecologist:</span>
              <ul className="list-disc list-inside flex flex-col gap-1 opacity-90">
                <li>"Given my history of PCOS, how should we monitor my blood sugar and cardiovascular markers during perimenopause?"</li>
                <li>"Are my current irregular periods caused by perimenopause, my PCOS pattern, or both?"</li>
                <li>"Would I be a candidate for Hormone Replacement Therapy (HRT) or non-hormonal symptom management?"</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
