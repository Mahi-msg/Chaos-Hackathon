/**
 * Data structures and types for the Sakhi Health Card logic engine.
 * Strict compliance: Deterministic, NO probabilistic risk scoring, NO diagnosis.
 */

export type LanguageCode = 'en' | 'hi' | 'kn';

export type SymptomId =
  | 'irregular_periods'
  | 'long_gaps'
  | 'extra_hair'
  | 'acne'
  | 'hair_thinning'
  | 'weight_gain'
  | 'dark_patches'
  | 'fertility_trouble'
  | 'mood_fatigue'
  | 'mood_swings';

export type SymptomDuration = 'under_3_months' | '3_to_12_months' | 'over_1_year';

export interface SelectedSymptom {
  id: SymptomId;
  duration: SymptomDuration;
}

export type RedFlagId =
  | 'heavy_bleeding'
  | 'severe_pelvic_pain'
  | 'fainting_dizziness'
  | 'pregnancy_with_pain'
  | 'rapid_voice_or_hair';

export interface RedFlagState {
  [key: string]: boolean;
}

export type CyclePatternType = 'regular' | 'irregular' | 'very_long_gap' | 'insufficient_data';

export interface CycleAnalysis {
  pattern: CyclePatternType;
  cycleGaps: number[]; // Gaps in days between consecutive marked period starts
  daysSinceLastPeriod: number | null;
  averageCycleLength: number | null;
  minCycleLength: number | null;
  maxCycleLength: number | null;
  summaryKey: string; // i18n key for plain-language pattern description
}

export type UrgencyLevel = 'ROUTINE' | 'SEE_SOON';

export type SymptomThemeId = 'cycle_irregularity' | 'androgen_signs' | 'metabolic_signs' | 'general_wellbeing';

export interface SymptomTheme {
  id: SymptomThemeId;
  titleKey: string;
  descriptionKey: string;
  symptoms: SymptomId[];
}

export interface DoctorDiscussionItem {
  id: string;
  nameKey: string;
  purposeKey: string;
}

export interface DoctorQuestion {
  id: string;
  questionKey: string;
}

export interface CareRouting {
  primaryDoctorKey: string;
  secondaryDoctorKey?: string;
  routingReasonKey: string;
}

/**
 * Non-diagnostic hierarchical possibilities structure.
 * Organizes potential conditions that a clinician commonly considers.
 */
export interface HierarchyCondition {
  id: string;
  tier: 1 | 2 | 3;
  tierLabelKey: string;
  titleKey: string;
  subtitleKey: string;
  explanationKey: string;
  differentiatingTestsKey: string;
  keyQuestionsKey: string;
  isSuggested: boolean;
}

export interface HealthCardEvaluation {
  urgency: UrgencyLevel;
  urgencyReasonKey: string;
  activeRedFlags: RedFlagId[];
  cycleAnalysis: CycleAnalysis;
  groupedThemes: SymptomTheme[];
  otherSymptoms: SymptomId[];
  careRouting: CareRouting;
  testsToDiscuss: DoctorDiscussionItem[];
  questionsForDoctor: DoctorQuestion[];
  lifestyleTips: string[];
  hierarchicalPossibilities: HierarchyCondition[];
}

export interface JournalEntry {
  id: string;
  date: string; // 'YYYY-MM-DD'
  isPeriodDay: boolean;
  flow?: 'light' | 'medium' | 'heavy';
  mood?: 'calm' | 'sensitive' | 'mood_swings' | 'tired' | 'anxious';
  painScale: number; // 0-5
  notes?: string;
  symptomsLogged: SymptomId[];
}
