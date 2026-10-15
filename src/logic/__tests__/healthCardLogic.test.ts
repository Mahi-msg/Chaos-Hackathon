import { describe, it, expect } from 'vitest';
import {
  analyzeCycles,
  evaluateUrgency,
  groupSymptomsIntoThemes,
  determineCareRouting,
  generateDoctorQuestions,
  evaluateHealthCard,
} from '../healthCardLogic';
import { SelectedSymptom, RedFlagState } from '../types';

describe('Sakhi Health Card - Deterministic Logic Engine', () => {
  describe('analyzeCycles', () => {
    it('correctly classifies a regular cycle (e.g. 28, 29, 28 days)', () => {
      // 4 periods roughly 28 days apart
      const dates = ['2026-01-01', '2026-01-29', '2026-02-26', '2026-03-26'];
      const refDate = new Date('2026-04-10');
      const result = analyzeCycles(dates, refDate);

      expect(result.pattern).toBe('regular');
      expect(result.cycleGaps).toEqual([28, 28, 28]);
      expect(result.averageCycleLength).toBe(28);
      expect(result.summaryKey).toBe('cycle_summary_regular');
    });

    it('correctly flags irregular cycle when cycle length is over 35 days or highly variable', () => {
      // Gaps of 42 days and 24 days (spread > 8 days and max > 35)
      const dates = ['2026-01-01', '2026-02-12', '2026-03-08'];
      const refDate = new Date('2026-03-20');
      const result = analyzeCycles(dates, refDate);

      expect(result.pattern).toBe('irregular');
      expect(result.summaryKey).toBe('cycle_summary_irregular');
    });

    it('correctly flags irregular cycle when cycle is shorter than 21 days', () => {
      // Gap of 18 days
      const dates = ['2026-01-01', '2026-01-19', '2026-02-07'];
      const refDate = new Date('2026-02-15');
      const result = analyzeCycles(dates, refDate);

      expect(result.pattern).toBe('irregular');
    });

    it('flags very_long_gap when any cycle interval is >= 90 days', () => {
      // 100 days gap
      const dates = ['2025-10-01', '2026-01-09'];
      const refDate = new Date('2026-02-01');
      const result = analyzeCycles(dates, refDate);

      expect(result.pattern).toBe('very_long_gap');
      expect(result.summaryKey).toBe('cycle_summary_long_gap');
    });

    it('flags very_long_gap when time since last period is >= 90 days', () => {
      const dates = ['2025-10-01', '2025-10-29'];
      // Reference date is 100 days after last period
      const refDate = new Date('2026-02-06');
      const result = analyzeCycles(dates, refDate);

      expect(result.pattern).toBe('very_long_gap');
      expect(result.daysSinceLastPeriod).toBeGreaterThanOrEqual(90);
    });

    it('handles empty or single date gracefully as insufficient_data', () => {
      const emptyResult = analyzeCycles([]);
      expect(emptyResult.pattern).toBe('insufficient_data');

      const singleResult = analyzeCycles(['2026-01-01'], new Date('2026-01-15'));
      expect(singleResult.pattern).toBe('insufficient_data');
    });
  });

  describe('groupSymptomsIntoThemes', () => {
    it('groups cycle, androgen, and metabolic symptoms without risk scores', () => {
      const symptoms: SelectedSymptom[] = [
        { id: 'irregular_periods', duration: '3_to_12_months' },
        { id: 'extra_hair', duration: 'over_1_year' },
        { id: 'acne', duration: '3_to_12_months' },
        { id: 'weight_gain', duration: 'over_1_year' },
        { id: 'mood_fatigue', duration: 'under_3_months' },
      ];

      const result = groupSymptomsIntoThemes(symptoms);

      const themeIds = result.groupedThemes.map((t) => t.id);
      expect(themeIds).toContain('cycle_irregularity');
      expect(themeIds).toContain('androgen_signs');
      expect(themeIds).toContain('metabolic_signs');

      // General symptoms
      expect(result.otherSymptoms).toContain('mood_fatigue');

      // Strict safety check: must NOT produce risk probability or score
      expect((result as any).pcosProbability).toBeUndefined();
      expect((result as any).score).toBeUndefined();
    });
  });

  describe('evaluateUrgency and Red Flags', () => {
    it('returns ROUTINE urgency when no red flags are active', () => {
      const redFlags: RedFlagState = {
        heavy_bleeding: false,
        severe_pelvic_pain: false,
        fainting_dizziness: false,
        pregnancy_with_pain: false,
        rapid_voice_or_hair: false,
      };

      const result = evaluateUrgency(redFlags);
      expect(result.urgency).toBe('ROUTINE');
      expect(result.activeRedFlags).toHaveLength(0);
      expect(result.urgencyReasonKey).toBe('urgency_banner_routine_desc');
    });

    it('elevates to SEE_SOON when heavy bleeding is positive', () => {
      const redFlags: RedFlagState = {
        heavy_bleeding: true,
      };

      const result = evaluateUrgency(redFlags);
      expect(result.urgency).toBe('SEE_SOON');
      expect(result.activeRedFlags).toContain('heavy_bleeding');
      expect(result.urgencyReasonKey).toBe('urgency_banner_see_soon_desc');
    });

    it('elevates to SEE_SOON when severe pelvic pain is positive', () => {
      const redFlags: RedFlagState = {
        severe_pelvic_pain: true,
      };

      const result = evaluateUrgency(redFlags);
      expect(result.urgency).toBe('SEE_SOON');
      expect(result.activeRedFlags).toContain('severe_pelvic_pain');
    });
  });

  describe('determineCareRouting', () => {
    it('routes to Gynecologist for primary cycle symptoms', () => {
      const { groupedThemes } = groupSymptomsIntoThemes([
        { id: 'irregular_periods', duration: '3_to_12_months' },
      ]);
      const routing = determineCareRouting(groupedThemes, []);

      expect(routing.primaryDoctorKey).toBe('doctor_gynecologist');
      expect(routing.secondaryDoctorKey).toBeUndefined();
    });

    it('suggests Endocrinologist when both androgen and metabolic signs are present', () => {
      const { groupedThemes } = groupSymptomsIntoThemes([
        { id: 'extra_hair', duration: 'over_1_year' },
        { id: 'dark_patches', duration: 'over_1_year' },
      ]);
      const routing = determineCareRouting(groupedThemes, []);

      expect(routing.primaryDoctorKey).toBe('doctor_gynecologist');
      expect(routing.secondaryDoctorKey).toBe('doctor_endocrinologist');
    });

    it('suggests urgent care clinic when red flags are present', () => {
      const routing = determineCareRouting([], ['heavy_bleeding']);
      expect(routing.primaryDoctorKey).toBe('doctor_gynecologist_or_urgent');
    });
  });

  describe('generateDoctorQuestions', () => {
    it('provides 5 base questions and adds fertility question when fertility trouble is selected', () => {
      const symptoms: SelectedSymptom[] = [
        { id: 'fertility_trouble', duration: 'over_1_year' },
      ];
      const cycle = analyzeCycles(['2026-01-01', '2026-01-29']);
      const questions = generateDoctorQuestions(symptoms, cycle);

      expect(questions.length).toBe(6);
      expect(questions.map((q) => q.questionKey)).toContain('doctor_q_fertility');
    });
  });

  describe('evaluateHealthCard comprehensive evaluation', () => {
    it('orchestrates full card without diagnosis or medical prescription', () => {
      const symptoms: SelectedSymptom[] = [
        { id: 'irregular_periods', duration: '3_to_12_months' },
        { id: 'acne', duration: '3_to_12_months' },
      ];
      const dates = ['2026-01-01', '2026-02-15', '2026-03-30']; // irregular
      const redFlags: RedFlagState = {};

      const evaluation = evaluateHealthCard(symptoms, dates, redFlags, new Date('2026-04-10'));

      expect(evaluation.urgency).toBe('ROUTINE');
      expect(evaluation.cycleAnalysis.pattern).toBe('irregular');
      expect(evaluation.groupedThemes.length).toBeGreaterThanOrEqual(1);
      expect(evaluation.testsToDiscuss.length).toBe(4);
      expect(evaluation.lifestyleTips.length).toBe(4);
      expect(evaluation.questionsForDoctor.length).toBeGreaterThanOrEqual(5);
      expect(evaluation.hierarchicalPossibilities.length).toBe(6);
    });

    it('generates hierarchical possibilities with Tier 1, 2, and 3 without diagnosing', () => {
      const symptoms: SelectedSymptom[] = [
        { id: 'irregular_periods', duration: 'over_1_year' },
        { id: 'extra_hair', duration: 'over_1_year' },
        { id: 'mood_swings', duration: '3_to_12_months' },
      ];
      const dates = ['2026-01-01', '2026-02-20']; // 50 day cycle
      const evaluation = evaluateHealthCard(symptoms, dates, {}, new Date('2026-03-01'));

      const pcosItem = evaluation.hierarchicalPossibilities.find((h) => h.id === 'pcos_possibility');
      expect(pcosItem).toBeDefined();
      expect(pcosItem?.tier).toBe(1);
      expect(pcosItem?.isSuggested).toBe(true);

      const perimenopauseItem = evaluation.hierarchicalPossibilities.find((h) => h.id === 'perimenopause_possibility');
      expect(perimenopauseItem?.tier).toBe(2);

      expect(evaluation.otherSymptoms).toContain('mood_swings');
    });
  });
});
