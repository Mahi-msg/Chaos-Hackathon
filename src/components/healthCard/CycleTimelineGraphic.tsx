import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { CycleAnalysis } from '../../logic/types';
import { BarChart2 } from 'lucide-react';

interface CycleTimelineGraphicProps {
  cycleAnalysis: CycleAnalysis;
  periodDates: string[];
}

export const CycleTimelineGraphic: React.FC<CycleTimelineGraphicProps> = ({
  cycleAnalysis,
  periodDates,
}) => {
  const { t, tEn, language } = useI18n();
  const showBilingual = language !== 'en';
  const sortedDates = [...periodDates].sort();

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-rose-600" />
            <span>{t('section_cycle_timeline')}</span>
          </h3>
          {showBilingual && (
            <p className="text-xs text-stone-500 font-medium">
              {tEn('section_cycle_timeline')}
            </p>
          )}
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-full">
          {sortedDates.length} cycles logged
        </span>
      </div>

      {/* Pattern summary text */}
      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 mb-4">
        <p className="text-sm font-bold text-stone-900">
          {t(cycleAnalysis.summaryKey)}
        </p>
        {showBilingual && (
          <p className="text-xs text-stone-600 mt-1">
            {tEn(cycleAnalysis.summaryKey)}
          </p>
        )}

        {cycleAnalysis.daysSinceLastPeriod !== null && (
          <p className="text-xs text-stone-500 mt-2 font-medium">
            Days since last marked period: <strong className="text-stone-800">{cycleAnalysis.daysSinceLastPeriod} days</strong>
          </p>
        )}
      </div>

      {/* Visual Bar Timeline */}
      {cycleAnalysis.cycleGaps.length > 0 ? (
        <div className="flex flex-col gap-3">
          {cycleAnalysis.cycleGaps.map((gap, idx) => {
            const startDate = sortedDates[idx];
            const endDate = sortedDates[idx + 1];
            const isLongGap = gap >= 90;
            const isIrregular = gap < 21 || gap > 35;
            const widthPct = Math.min(100, Math.max(18, (gap / 90) * 100));

            return (
              <div key={`timeline-bar-${idx}`} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                  <span>
                    Cycle {idx + 1}: {startDate} → {endDate}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isLongGap
                        ? 'bg-amber-100 text-amber-900'
                        : isIrregular
                        ? 'bg-rose-100 text-rose-900'
                        : 'bg-teal-100 text-teal-900'
                    }`}
                  >
                    {gap} {t('calendar_days_label')}
                  </span>
                </div>

                <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isLongGap
                        ? 'bg-amber-500'
                        : isIrregular
                        ? 'bg-rose-500'
                        : 'bg-teal-600'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-stone-500 italic">
          {t('cycle_summary_few_dates')}
        </p>
      )}
    </div>
  );
};
