import {
  CycleAnalysis,
  CyclePatternType,
  CareRouting,
  DoctorDiscussionItem,
  DoctorQuestion,
  HealthCardEvaluation,
  HierarchyCondition,
  RedFlagId,
  RedFlagState,
  SelectedSymptom,
  SymptomId,
  SymptomTheme,
  UrgencyLevel,
} from './types';

/**
 * Analyzes period start dates (chronologically sorted or unsorted).
 * Calculates gaps between consecutive cycle start dates.
 * Flags:
 * - 'very_long_gap': gap >= 90 days or current gap since last period >= 90 days.
 * - 'irregular': cycle lengths < 21 days or > 35 days, or cycle length spread > 8 days.
 * - 'regular': consistent 21-35 days with low variance.
 */
export function analyzeCycles(
  periodStartDates: string[],
  referenceDate: Date = new Date()
): CycleAnalysis {
  if (!periodStartDates || periodStartDates.length === 0) {
    return {
      pattern: 'insufficient_data',
      cycleGaps: [],
      daysSinceLastPeriod: null,
      averageCycleLength: null,
      minCycleLength: null,
      maxCycleLength: null,
      summaryKey: 'cycle_summary_no_data',
    };
  }

  // Parse and sort dates chronologically (oldest to newest)
  const timestamps = periodStartDates
    .map((d) => new Date(d).getTime())
    .filter((t) => !isNaN(t))
    .sort((a, b) => a - b);

  if (timestamps.length < 2) {
    const lastTimestamp = timestamps[0];
    const msSinceLast = referenceDate.getTime() - lastTimestamp;
    const daysSinceLast = Math.max(0, Math.floor(msSinceLast / (1000 * 60 * 60 * 24)));

    if (daysSinceLast >= 90) {
      return {
        pattern: 'very_long_gap',
        cycleGaps: [],
        daysSinceLastPeriod: daysSinceLast,
        averageCycleLength: null,
        minCycleLength: null,
        maxCycleLength: null,
        summaryKey: 'cycle_summary_long_gap',
      };
    }

    return {
      pattern: 'insufficient_data',
      cycleGaps: [],
      daysSinceLastPeriod: daysSinceLast,
      averageCycleLength: null,
      minCycleLength: null,
      maxCycleLength: null,
      summaryKey: 'cycle_summary_few_dates',
    };
  }

  // Calculate gaps in days between consecutive periods
  const cycleGaps: number[] = [];
  for (let i = 0; i < timestamps.length - 1; i++) {
    const diffMs = timestamps[i + 1] - timestamps[i];
    const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (days > 0) {
      cycleGaps.push(days);
    }
  }

  const latestDate = timestamps[timestamps.length - 1];
  const daysSinceLastPeriod = Math.max(
    0,
    Math.floor((referenceDate.getTime() - latestDate) / (1000 * 60 * 60 * 24))
  );

  const minGap = Math.min(...cycleGaps);
  const maxGap = Math.max(...cycleGaps);
  const avgGap = Math.round(cycleGaps.reduce((sum, g) => sum + g, 0) / cycleGaps.length);

  let pattern: CyclePatternType = 'regular';
  let summaryKey = 'cycle_summary_regular';

  // Check for very long gaps (90+ days without period or gap >= 90)
  if (daysSinceLastPeriod >= 90 || cycleGaps.some((g) => g >= 90)) {
    pattern = 'very_long_gap';
    summaryKey = 'cycle_summary_long_gap';
  } else if (minGap < 21 || maxGap > 35 || maxGap - minGap > 8) {
    pattern = 'irregular';
    summaryKey = 'cycle_summary_irregular';
  } else {
    pattern = 'regular';
    summaryKey = 'cycle_summary_regular';
  }

  return {
    pattern,
    cycleGaps,
    daysSinceLastPeriod,
    averageCycleLength: avgGap,
    minCycleLength: minGap,
    maxCycleLength: maxGap,
    summaryKey,
  };
}

/**
 * Groups symptoms into three clinical themes:
 * 1. Cycle irregularity
 * 2. Signs of excess androgen effects
 * 3. Metabolic signs
 * Plus other supportive signs (fertility, mood/fatigue, mood swings).
 * Note: Never generates a PCOS probability score.
 */
export function groupSymptomsIntoThemes(selectedSymptoms: SelectedSymptom[]): {
  groupedThemes: SymptomTheme[];
  otherSymptoms: SymptomId[];
} {
  const selectedIds = new Set(selectedSymptoms.map((s) => s.id));

  const cycleSymptoms: SymptomId[] = ['irregular_periods', 'long_gaps'];
  const androgenSymptoms: SymptomId[] = ['extra_hair', 'acne', 'hair_thinning'];
  const metabolicSymptoms: SymptomId[] = ['weight_gain', 'dark_patches'];
  const generalSymptoms: SymptomId[] = ['fertility_trouble', 'mood_fatigue', 'mood_swings'];

  const matchedCycle = cycleSymptoms.filter((id) => selectedIds.has(id));
  const matchedAndrogen = androgenSymptoms.filter((id) => selectedIds.has(id));
  const matchedMetabolic = metabolicSymptoms.filter((id) => selectedIds.has(id));
  const matchedGeneral = generalSymptoms.filter((id) => selectedIds.has(id));

  const groupedThemes: SymptomTheme[] = [];

  if (matchedCycle.length > 0) {
    groupedThemes.push({
      id: 'cycle_irregularity',
      titleKey: 'theme_cycle_title',
      descriptionKey: 'theme_cycle_desc',
      symptoms: matchedCycle,
    });
  }

  if (matchedAndrogen.length > 0) {
    groupedThemes.push({
      id: 'androgen_signs',
      titleKey: 'theme_androgen_title',
      descriptionKey: 'theme_androgen_desc',
      symptoms: matchedAndrogen,
    });
  }

  if (matchedMetabolic.length > 0) {
    groupedThemes.push({
      id: 'metabolic_signs',
      titleKey: 'theme_metabolic_title',
      descriptionKey: 'theme_metabolic_desc',
      symptoms: matchedMetabolic,
    });
  }

  return {
    groupedThemes,
    otherSymptoms: matchedGeneral,
  };
}

/**
 * Evaluates red-flag symptoms.
 * If ANY red-flag condition is checked 'yes', urgency is raised to SEE_SOON.
 */
export function evaluateUrgency(redFlags: RedFlagState): {
  urgency: UrgencyLevel;
  urgencyReasonKey: string;
  activeRedFlags: RedFlagId[];
} {
  const recognizedRedFlags: RedFlagId[] = [
    'heavy_bleeding',
    'severe_pelvic_pain',
    'fainting_dizziness',
    'pregnancy_with_pain',
    'rapid_voice_or_hair',
  ];

  const activeRedFlags = recognizedRedFlags.filter((flag) => redFlags[flag] === true);

  if (activeRedFlags.length > 0) {
    return {
      urgency: 'SEE_SOON',
      urgencyReasonKey: 'urgency_banner_see_soon_desc',
      activeRedFlags,
    };
  }

  return {
    urgency: 'ROUTINE',
    urgencyReasonKey: 'urgency_banner_routine_desc',
    activeRedFlags: [],
  };
}

/**
 * Recommends care routing:
 * - Gynecologist as the primary starting point.
 * - Endocrinologist if metabolic or androgen signs are prominent.
 */
export function determineCareRouting(
  groupedThemes: SymptomTheme[],
  activeRedFlags: RedFlagId[]
): CareRouting {
  const hasAndrogen = groupedThemes.some((t) => t.id === 'androgen_signs');
  const hasMetabolic = groupedThemes.some((t) => t.id === 'metabolic_signs');
  const hasMultipleAndrogen =
    (groupedThemes.find((t) => t.id === 'androgen_signs')?.symptoms.length ?? 0) >= 2;

  if (activeRedFlags.length > 0) {
    return {
      primaryDoctorKey: 'doctor_gynecologist_or_urgent',
      secondaryDoctorKey: undefined,
      routingReasonKey: 'routing_reason_urgent',
    };
  }

  if ((hasAndrogen && hasMetabolic) || hasMultipleAndrogen) {
    return {
      primaryDoctorKey: 'doctor_gynecologist',
      secondaryDoctorKey: 'doctor_endocrinologist',
      routingReasonKey: 'routing_reason_combined',
    };
  }

  return {
    primaryDoctorKey: 'doctor_gynecologist',
    secondaryDoctorKey: undefined,
    routingReasonKey: 'routing_reason_primary',
  };
}

/**
 * Generates a hierarchical breakdown of potential conditions for doctor evaluation.
 * NOT a diagnosis. Tier 1: Primary pattern overlap; Tier 2: Lifecycle & secondary; Tier 3: Underlying / rule-out.
 */
export function generateHierarchicalPossibilities(
  selectedSymptoms: SelectedSymptom[],
  cycleAnalysis: CycleAnalysis
): HierarchyCondition[] {
  const selectedIds = new Set(selectedSymptoms.map((s) => s.id));
  const hasCycleIssues =
    cycleAnalysis.pattern === 'irregular' ||
    cycleAnalysis.pattern === 'very_long_gap' ||
    selectedIds.has('irregular_periods') ||
    selectedIds.has('long_gaps');
  const hasAndrogen =
    selectedIds.has('extra_hair') || selectedIds.has('acne') || selectedIds.has('hair_thinning');
  const hasMetabolic = selectedIds.has('weight_gain') || selectedIds.has('dark_patches');
  const hasMoodOrFatigue = selectedIds.has('mood_fatigue') || selectedIds.has('mood_swings');

  const conditions: HierarchyCondition[] = [
    // Tier 1: Primary Pattern Overlap
    {
      id: 'pcos_possibility',
      tier: 1,
      tierLabelKey: 'hierarchy_tier_1_title',
      titleKey: 'hierarchy_pcos_title',
      subtitleKey: 'hierarchy_pcos_subtitle',
      explanationKey: 'hierarchy_pcos_desc',
      differentiatingTestsKey: 'hierarchy_pcos_tests',
      keyQuestionsKey: 'hierarchy_pcos_questions',
      isSuggested: hasCycleIssues && (hasAndrogen || hasMetabolic),
    },
    {
      id: 'thyroid_possibility',
      tier: 1,
      tierLabelKey: 'hierarchy_tier_1_title',
      titleKey: 'hierarchy_thyroid_title',
      subtitleKey: 'hierarchy_thyroid_subtitle',
      explanationKey: 'hierarchy_thyroid_desc',
      differentiatingTestsKey: 'hierarchy_thyroid_tests',
      keyQuestionsKey: 'hierarchy_thyroid_questions',
      isSuggested: hasCycleIssues || hasMoodOrFatigue || selectedIds.has('weight_gain'),
    },

    // Tier 2: Secondary / Lifecycle Possibilities
    {
      id: 'perimenopause_possibility',
      tier: 2,
      tierLabelKey: 'hierarchy_tier_2_title',
      titleKey: 'hierarchy_perimenopause_title',
      subtitleKey: 'hierarchy_perimenopause_subtitle',
      explanationKey: 'hierarchy_perimenopause_desc',
      differentiatingTestsKey: 'hierarchy_perimenopause_tests',
      keyQuestionsKey: 'hierarchy_perimenopause_questions',
      isSuggested: hasCycleIssues && hasMoodOrFatigue,
    },
    {
      id: 'prolactin_possibility',
      tier: 2,
      tierLabelKey: 'hierarchy_tier_2_title',
      titleKey: 'hierarchy_prolactin_title',
      subtitleKey: 'hierarchy_prolactin_subtitle',
      explanationKey: 'hierarchy_prolactin_desc',
      differentiatingTestsKey: 'hierarchy_prolactin_tests',
      keyQuestionsKey: 'hierarchy_prolactin_questions',
      isSuggested: cycleAnalysis.pattern === 'very_long_gap' || selectedIds.has('long_gaps'),
    },

    // Tier 3: Underlying & Rule-Out Factors
    {
      id: 'insulin_resistance_possibility',
      tier: 3,
      tierLabelKey: 'hierarchy_tier_3_title',
      titleKey: 'hierarchy_insulin_title',
      subtitleKey: 'hierarchy_insulin_subtitle',
      explanationKey: 'hierarchy_insulin_desc',
      differentiatingTestsKey: 'hierarchy_insulin_tests',
      keyQuestionsKey: 'hierarchy_insulin_questions',
      isSuggested: hasMetabolic,
    },
    {
      id: 'stress_fha_possibility',
      tier: 3,
      tierLabelKey: 'hierarchy_tier_3_title',
      titleKey: 'hierarchy_fha_title',
      subtitleKey: 'hierarchy_fha_subtitle',
      explanationKey: 'hierarchy_fha_desc',
      differentiatingTestsKey: 'hierarchy_fha_tests',
      keyQuestionsKey: 'hierarchy_fha_questions',
      isSuggested: hasCycleIssues && !hasAndrogen,
    },
  ];

  return conditions;
}

/**
 * Standard diagnostic discussions doctors commonly consider.
 * Clearly framed: The doctor decides what is needed.
 */
export function getTestsDoctorsDiscuss(): DoctorDiscussionItem[] {
  return [
    {
      id: 'pelvic_ultrasound',
      nameKey: 'test_ultrasound_title',
      purposeKey: 'test_ultrasound_purpose',
    },
    {
      id: 'hormone_panel',
      nameKey: 'test_hormones_title',
      purposeKey: 'test_hormones_purpose',
    },
    {
      id: 'thyroid_panel',
      nameKey: 'test_thyroid_title',
      purposeKey: 'test_thyroid_purpose',
    },
    {
      id: 'blood_sugar_metabolic',
      nameKey: 'test_blood_sugar_title',
      purposeKey: 'test_blood_sugar_purpose',
    },
  ];
}

/**
 * 5-6 empowering questions for the user to ask their doctor.
 */
export function generateDoctorQuestions(
  selectedSymptoms: SelectedSymptom[],
  cycleAnalysis: CycleAnalysis
): DoctorQuestion[] {
  const questions: DoctorQuestion[] = [
    {
      id: 'q_cause',
      questionKey: 'doctor_q_cause',
    },
    {
      id: 'q_tests',
      questionKey: 'doctor_q_tests',
    },
    {
      id: 'q_warning_signs',
      questionKey: 'doctor_q_warning_signs',
    },
    {
      id: 'q_lifestyle',
      questionKey: 'doctor_q_lifestyle',
    },
    {
      id: 'q_followup',
      questionKey: 'doctor_q_followup',
    },
  ];

  const hasFertility = selectedSymptoms.some((s) => s.id === 'fertility_trouble');
  if (hasFertility) {
    questions.push({
      id: 'q_fertility',
      questionKey: 'doctor_q_fertility',
    });
  } else if (cycleAnalysis.pattern === 'very_long_gap' || cycleAnalysis.pattern === 'irregular') {
    questions.push({
      id: 'q_cycle_regulation',
      questionKey: 'doctor_q_cycle_regulation',
    });
  }

  return questions;
}

/**
 * Generic, non-prescriptive supportive lifestyle habits.
 */
export function getGenericLifestyleTips(): string[] {
  return [
    'lifestyle_tip_nutrition',
    'lifestyle_tip_movement',
    'lifestyle_tip_sleep',
    'lifestyle_tip_tracking',
  ];
}

/**
 * Main evaluation orchestrator:
 * Pure deterministic pipeline producing the complete Visit-Ready Health Card state.
 */
export function evaluateHealthCard(
  selectedSymptoms: SelectedSymptom[],
  periodStartDates: string[],
  redFlags: RedFlagState,
  referenceDate: Date = new Date()
): HealthCardEvaluation {
  const cycleAnalysis = analyzeCycles(periodStartDates, referenceDate);
  const { groupedThemes, otherSymptoms } = groupSymptomsIntoThemes(selectedSymptoms);
  const urgencyResult = evaluateUrgency(redFlags);
  const careRouting = determineCareRouting(groupedThemes, urgencyResult.activeRedFlags);
  const testsToDiscuss = getTestsDoctorsDiscuss();
  const questionsForDoctor = generateDoctorQuestions(selectedSymptoms, cycleAnalysis);
  const lifestyleTips = getGenericLifestyleTips();
  const hierarchicalPossibilities = generateHierarchicalPossibilities(selectedSymptoms, cycleAnalysis);

  return {
    urgency: urgencyResult.urgency,
    urgencyReasonKey: urgencyResult.urgencyReasonKey,
    activeRedFlags: urgencyResult.activeRedFlags,
    cycleAnalysis,
    groupedThemes,
    otherSymptoms,
    careRouting,
    testsToDiscuss,
    questionsForDoctor,
    lifestyleTips,
    hierarchicalPossibilities,
  };
}
