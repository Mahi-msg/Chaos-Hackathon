import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import {
  HealthCardEvaluation,
  RedFlagState,
  SelectedSymptom,
} from '../../logic/types';
import { UrgencyBanner } from '../healthCard/UrgencyBanner';
import { WhatYouToldUs } from '../healthCard/WhatYouToldUs';
import { CycleTimelineGraphic } from '../healthCard/CycleTimelineGraphic';
import { AssociatedConditions } from '../healthCard/AssociatedConditions';
import { HierarchicalPossibilities } from '../healthCard/HierarchicalPossibilities';
import { CareRoutingAndTests } from '../healthCard/CareRoutingAndTests';
import { DoctorQuestions } from '../healthCard/DoctorQuestions';
import { LifestyleHabits } from '../healthCard/LifestyleHabits';
import { CardActions } from '../healthCard/CardActions';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';
import en from '../../i18n/en.json';
import hi from '../../i18n/hi.json';
import kn from '../../i18n/kn.json';

interface Screen6Props {
  evaluation: HealthCardEvaluation;
  selectedSymptoms: SelectedSymptom[];
  periodDates: string[];
  redFlags: RedFlagState;
  onStartOver: () => void;
}

export const Screen6HealthCard: React.FC<Screen6Props> = ({
  evaluation,
  selectedSymptoms,
  periodDates,
  onStartOver,
}) => {
  const { t, language } = useI18n();

  // Build audio summary text for full card narration
  const cardSummaryToRead = `
    ${t('card_title')}.
    ${evaluation.urgency === 'SEE_SOON' ? t('urgency_see_soon_title') : t('urgency_routine_title')}.
    ${t(evaluation.urgencyReasonKey)}.
    ${t('associated_text_primary')}.
    ${t('pcos_suggestion_intro')}.
    ${t('pcos_non_diagnosis_disclaimer')}.
    ${t('section_who_to_see')}: ${t(evaluation.careRouting.primaryDoctorKey)}.
  `.trim();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* Printable / Viewable Card Container */}
      <div
        id="visit-ready-card"
        className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-sm flex flex-col gap-6"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                  {t('card_title')}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                  Visit-Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">
                {t('card_subtitle')}
              </p>
            </div>
          </div>

          {/* Bilingual indication pill */}
          {language !== 'en' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>{t('card_bilingual_notice')}</span>
            </div>
          )}
        </div>

        {/* 1. Urgency Banner */}
        <UrgencyBanner
          urgency={evaluation.urgency}
          activeRedFlagsCount={evaluation.activeRedFlags.length}
        />

        {/* 2. What You Told Us */}
        <WhatYouToldUs selectedSymptoms={selectedSymptoms} />

        {/* 3. Cycle Spacing Graphic Timeline */}
        <CycleTimelineGraphic
          cycleAnalysis={evaluation.cycleAnalysis}
          periodDates={periodDates}
        />

        {/* 4. What These Are Commonly Associated With + PCOS Awareness */}
        <AssociatedConditions
          groupedThemes={evaluation.groupedThemes}
          hasPcosFeatures={evaluation.groupedThemes.length > 0}
        />

        {/* 4b. Non-Diagnostic Hierarchical Pattern Possibilities */}
        <HierarchicalPossibilities
          conditions={evaluation.hierarchicalPossibilities}
        />

        {/* 5. Who to See & Tests Doctors Discuss */}
        <CareRoutingAndTests
          careRouting={evaluation.careRouting}
          testsToDiscuss={evaluation.testsToDiscuss}
        />

        {/* 6. Questions to Ask Doctor */}
        <DoctorQuestions questions={evaluation.questionsForDoctor} />

        {/* 7. Supportive Everyday Habits */}
        <LifestyleHabits tips={evaluation.lifestyleTips} />

        {/* 8. Mandatory Multi-Language Safety Footer */}
        <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200/80 text-center flex flex-col gap-1.5">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-stone-600" />
            <span>Safety Disclaimer / अस्वीकरण / ಹಕ್ಕುತ್ಯಾಗ</span>
          </div>
          <p className="text-xs text-stone-600 font-medium leading-relaxed">
            {en.card_footer_disclaimer}
          </p>
          <p className="text-xs text-stone-600 font-medium leading-relaxed">
            {hi.card_footer_disclaimer}
          </p>
          <p className="text-xs text-stone-600 font-medium leading-relaxed">
            {kn.card_footer_disclaimer}
          </p>
        </div>
      </div>

      {/* Action Buttons: Audio, PDF, Image Share, Start Over */}
      <div className="mt-8">
        <CardActions
          cardElementId="visit-ready-card"
          cardSummaryToRead={cardSummaryToRead}
          onStartOver={onStartOver}
        />
      </div>
    </div>
  );
};
