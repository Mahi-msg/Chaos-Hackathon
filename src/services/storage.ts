import { JournalEntry, LanguageCode, RedFlagState, SelectedSymptom } from '../logic/types';

export interface AppStoredState {
  language: LanguageCode;
  privacyConsented: boolean;
  selectedSymptoms: SelectedSymptom[];
  periodDates: string[];
  redFlags: RedFlagState;
  llmFeatureFlag: boolean;
  theme: 'light' | 'dark';
  journalEntries: JournalEntry[];
}

const STORAGE_KEY = 'sakhi_health_card_data';

const DEFAULT_STATE: AppStoredState = {
  language: 'en',
  privacyConsented: false,
  selectedSymptoms: [],
  periodDates: [],
  redFlags: {},
  llmFeatureFlag: false,
  theme: 'light',
  journalEntries: [],
};

export function loadStoredData(): AppStoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
    };
  } catch (e) {
    console.warn('Could not read from localStorage, using default state', e);
    return DEFAULT_STATE;
  }
}

export function saveStoredData(state: Partial<AppStoredState>): void {
  try {
    const current = loadStoredData();
    const updated = { ...current, ...state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }
}

export function clearAllStoredData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear localStorage', e);
  }
}

/**
 * Predefined demo profile (PCOS-like pattern) for judge 30-second walkthrough:
 * - 42, 65, and 95-day cycle gaps (highly irregular with long gap)
 * - Symptoms: irregular periods, acne, extra hair, belly weight gain, mood swings
 * - Red flags: all false (routine consultation)
 */
export function getDemoProfile(): Partial<AppStoredState> {
  return {
    privacyConsented: true,
    selectedSymptoms: [
      { id: 'irregular_periods', duration: 'over_1_year' },
      { id: 'long_gaps', duration: 'over_1_year' },
      { id: 'extra_hair', duration: 'over_1_year' },
      { id: 'acne', duration: '3_to_12_months' },
      { id: 'weight_gain', duration: 'over_1_year' },
      { id: 'mood_swings', duration: '3_to_12_months' },
    ],
    // 3 period start dates spaced ~42 and 95 days apart
    periodDates: ['2025-10-15', '2025-11-26', '2026-03-01'],
    redFlags: {
      heavy_bleeding: false,
      severe_pelvic_pain: false,
      fainting_dizziness: false,
      pregnancy_with_pain: false,
      rapid_voice_or_hair: false,
    },
  };
}
