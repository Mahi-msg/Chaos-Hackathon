import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { analyzeCycles } from '../../logic/healthCardLogic';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Droplet,
} from 'lucide-react';

interface Screen4Props {
  periodDates: string[]; // array of 'YYYY-MM-DD'
  onChange: (dates: string[]) => void;
  onNext: () => void;
  onOpenJournal: () => void;
}

export const Screen4Calendar: React.FC<Screen4Props> = ({
  periodDates,
  onChange,
  onNext,
  onOpenJournal,
}) => {
  const { t } = useI18n();

  // Current calendar viewing month (defaults to current month or latest selected date)
  const [currentViewDate, setCurrentViewDate] = useState<Date>(() => {
    if (periodDates.length > 0) {
      const sorted = [...periodDates].sort();
      return new Date(sorted[sorted.length - 1] + 'T00:00:00');
    }
    return new Date();
  });

  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth(); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate calendar grid days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Previous month navigation
  const prevMonth = () => {
    setCurrentViewDate(new Date(year, month - 1, 1));
  };

  // Next month navigation
  const nextMonth = () => {
    setCurrentViewDate(new Date(year, month + 1, 1));
  };

  // Format date to 'YYYY-MM-DD'
  const formatDateString = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const isDateSelected = (dateStr: string) => periodDates.includes(dateStr);

  // A cycle runs from one recorded period-start date up to (but not including)
  // the next recorded start date. Colors distinguish cycles, not medical phases.
  const cyclePalette = [
    { day: 'bg-rose-100 text-rose-950 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-100 dark:hover:bg-rose-900', dot: 'bg-rose-600', border: 'border-rose-400', label: 'Cycle 1' },
    { day: 'bg-violet-100 text-violet-950 hover:bg-violet-200 dark:bg-violet-950 dark:text-violet-100 dark:hover:bg-violet-900', dot: 'bg-violet-600', border: 'border-violet-400', label: 'Cycle 2' },
    { day: 'bg-teal-100 text-teal-950 hover:bg-teal-200 dark:bg-teal-950 dark:text-teal-100 dark:hover:bg-teal-900', dot: 'bg-teal-600', border: 'border-teal-400', label: 'Cycle 3' },
    { day: 'bg-amber-100 text-amber-950 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:hover:bg-amber-900', dot: 'bg-amber-600', border: 'border-amber-400', label: 'Cycle 4' },
    { day: 'bg-sky-100 text-sky-950 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-100 dark:hover:bg-sky-900', dot: 'bg-sky-600', border: 'border-sky-400', label: 'Cycle 5' },
    { day: 'bg-fuchsia-100 text-fuchsia-950 hover:bg-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-100 dark:hover:bg-fuchsia-900', dot: 'bg-fuchsia-600', border: 'border-fuchsia-400', label: 'Cycle 6' },
  ];
  const getCycleIndexForDate = (dateStr: string) => {
    for (let idx = 0; idx < sortedDates.length - 1; idx++) {
      if (dateStr >= sortedDates[idx] && dateStr < sortedDates[idx + 1]) return idx;
    }
    return -1;
  };

  const toggleDate = (dateStr: string) => {
    if (isDateSelected(dateStr)) {
      onChange(periodDates.filter((d) => d !== dateStr));
    } else {
      // Keep up to 8 dates sorted
      const updated = [...periodDates, dateStr].sort();
      onChange(updated);
    }
  };

  // Compute deterministic cycle analysis from marked dates
  const cycleAnalysis = analyzeCycles(periodDates);

  // Sorted dates for the timeline
  const sortedDates = [...periodDates].sort();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* Title & Instructions */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 mb-2">
          <CalendarIcon className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('calendar_title')}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-1 max-w-xl mx-auto">
          {t('calendar_subtitle')}
        </p>

        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-xs font-semibold text-rose-900">
          <Droplet className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>{t('calendar_marked_count', { count: periodDates.length })}</span>
        </div>
      </div>

      {/* Main Responsive Layout: Calendar on Left, Timeline / Analysis on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
        {/* Pace-Style Calendar Grid (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 sm:p-6 shadow-xs">
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100 dark:border-stone-700">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="min-h-touch min-w-touch p-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>

            <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
              {monthNames[month]} {year}
            </h3>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="min-h-touch min-w-touch p-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>

          {/* Weekday Row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekdayNames.map((day) => (
              <span key={day} className="text-xs font-bold text-stone-400 dark:text-stone-400 py-1 uppercase">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {/* Prev month padded days */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => {
              const prevD = daysInPrevMonth - firstDayOfMonth + i + 1;
              return (
                <div
                  key={`prev-${i}`}
                  className="min-h-[46px] sm:min-h-[52px] rounded-xl flex items-center justify-center text-xs text-stone-300 font-medium select-none"
                >
                  {prevD}
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = formatDateString(year, month, dayNum);
              const selected = isDateSelected(dateStr);
              const cycleIndex = getCycleIndexForDate(dateStr);
              const cycleColor = cycleIndex >= 0 ? cyclePalette[cycleIndex % cyclePalette.length] : null;

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => toggleDate(dateStr)}
                  aria-pressed={selected}
                  aria-label={`${monthNames[month]} ${dayNum}, ${year}`}
                  className={`min-h-[46px] sm:min-h-[52px] rounded-2xl flex flex-col items-center justify-center text-sm font-semibold transition relative ${
                    selected
                      ? 'bg-rose-700 text-white shadow-md ring-2 ring-rose-400 scale-[1.03]'
                      : cycleColor
                      ? `${cycleColor.day} border ${cycleColor.border}`
                      : 'bg-stone-50 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-stone-800 dark:text-stone-100 hover:text-rose-900 dark:hover:text-rose-200'
                  }`}
                >
                  <span>{dayNum}</span>
                  {selected ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
                  ) : cycleColor ? (
                    <div className={`w-1 h-1 rounded-full mt-0.5 ${cycleColor.dot}`} />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700 space-y-3 text-xs text-stone-600 dark:text-stone-300">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-700" />
                <span>Recorded period start</span>
              </div>
              {sortedDates.slice(0, -1).map((startDate, idx) => {
                const colors = cyclePalette[idx % cyclePalette.length];
                return (
                  <div key={`legend-${startDate}`} className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-md ${colors.dot}`} />
                    <span>Cycle {idx + 1}</span>
                  </div>
                );
              })}
            </div>
            <p className="italic">{t('calendar_instructions')}</p>
            <p className="text-[11px] leading-relaxed">Cycle colors show the interval between recorded period start dates. The next start date marks the end of the previous interval; unlogged future dates are not predicted.</p>
          </div>
        </div>

        {/* Right Panel: Cycle Interval Bars & Plain Language Pattern (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Pattern Summary Card */}
          <div
            className={`rounded-3xl border-2 p-5 transition ${
              cycleAnalysis.pattern === 'very_long_gap'
                ? 'border-amber-400 bg-amber-50/60'
                : cycleAnalysis.pattern === 'irregular'
                ? 'border-rose-400 bg-rose-50/60'
                : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {cycleAnalysis.pattern === 'regular' ? (
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              ) : cycleAnalysis.pattern === 'insufficient_data' ? (
                <Clock className="w-5 h-5 text-stone-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <h4 className="font-bold text-stone-900 dark:text-white text-base">
                {t('calendar_pattern_title')}
              </h4>
            </div>

            <p className="text-sm font-medium text-stone-700 dark:text-stone-200 leading-relaxed">
              {t(cycleAnalysis.summaryKey)}
            </p>

            {cycleAnalysis.daysSinceLastPeriod !== null && (
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                Days since most recent marked period: <strong className="text-stone-800 dark:text-stone-100">{cycleAnalysis.daysSinceLastPeriod}</strong>
              </p>
            )}
          </div>

          {/* Cycle Interval Timeline Bars */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-700 p-5 shadow-xs">
            <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-3">
              {t('calendar_cycle_gaps_title')}
            </h4>

            {cycleAnalysis.cycleGaps.length === 0 ? (
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 text-center text-xs text-stone-500 dark:text-stone-300">
                {t('cycle_summary_few_dates')}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {cycleAnalysis.cycleGaps.map((gap, idx) => {
                  const startDate = sortedDates[idx];
                  const endDate = sortedDates[idx + 1];

                  // Color categorization
                  const isLongGap = gap >= 90;
                  const isIrregular = gap < 21 || gap > 35;

                  // Bar width representation relative to 60 days
                  const barWidthPercent = Math.min(100, Math.max(15, (gap / 90) * 100));

                  return (
                    <div key={`gap-${idx}`} className={`flex flex-col gap-1 rounded-2xl border p-3 ${cyclePalette[idx % cyclePalette.length].border}`}>
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-stone-700 dark:text-stone-200">
                        <span className="min-w-0">
                          <span className="block font-bold">Cycle {idx + 1}</span>
                          <span className="block mt-1 text-[11px] font-medium">Start: {startDate}</span>
                          <span className="block text-[11px] font-medium">End: {endDate}</span>
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

                      {/* Visual Spacing Bar */}
                      <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLongGap
                              ? 'bg-amber-500'
                              : isIrregular
                              ? 'bg-rose-500'
                              : 'bg-teal-600'
                          }`}
                          style={{ width: `${barWidthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Log entry shortcut sits below the calendar, as requested. */}
      <div className="max-w-xl mx-auto -mt-2 mb-5 w-full">
        <button
          type="button"
          onClick={onOpenJournal}
          className="min-h-touch w-full py-3.5 px-6 rounded-2xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-stone-900 text-rose-800 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-stone-800 font-bold text-sm sm:text-base transition flex items-center justify-center gap-2"
        >
          <CalendarIcon className="w-5 h-5" />
          <span>Log an entry</span>
        </button>
      </div>

      {/* Navigation Continue Button */}
      <div className="max-w-xl mx-auto">
        <button
          type="button"
          onClick={onNext}
          className="min-h-touch w-full py-4 px-6 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <span>{t('btn_next')}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
