import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { JournalEntry } from '../../logic/types';
import {
  BookMarked,
  Plus,
  Droplet,
  Smile,
  Check,
  Trash2,
} from 'lucide-react';

interface JournalScreenProps {
  entries: JournalEntry[];
  onSaveEntry: (entry: JournalEntry) => void;
  onDeleteEntry: (id: string) => void;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({
  entries,
  onSaveEntry,
  onDeleteEntry,
}) => {
  const { t } = useI18n();

  const todayStr = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState<string>(todayStr);
  const [isPeriodDay, setIsPeriodDay] = useState<boolean>(false);
  const [flow, setFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [mood, setMood] = useState<'calm' | 'sensitive' | 'mood_swings' | 'tired' | 'anxious'>('mood_swings');
  const [painScale, setPainScale] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date,
      isPeriodDay,
      flow: isPeriodDay ? flow : undefined,
      mood,
      painScale,
      notes: notes.trim(),
      symptomsLogged: isPeriodDay ? ['irregular_periods'] : [],
    };
    onSaveEntry(newEntry);
    setNotes('');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col gap-8">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 mb-2">
          <BookMarked className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('journal_title')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1 max-w-xl mx-auto">
          {t('journal_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Log Form on Left / Top */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-xs">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Date Input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                {t('journal_date_label')}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white font-semibold text-sm"
              />
            </div>

            {/* Period Day Toggle */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center">
                  <Droplet className="w-5 h-5 fill-rose-600 text-rose-600" />
                </div>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  {t('journal_period_toggle')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPeriodDay(!isPeriodDay)}
                className={`min-h-touch px-4 py-2 rounded-xl text-xs font-bold transition ${
                  isPeriodDay
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                {isPeriodDay ? t('btn_yes') : t('btn_no')}
              </button>
            </div>

            {/* Flow Intensity if period day */}
            {isPeriodDay && (
              <div className="animate-fade-in">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  {t('journal_flow_label')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'medium', 'heavy'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFlow(f)}
                      className={`min-h-touch py-2.5 rounded-xl text-xs font-bold transition capitalize ${
                        flow === f
                          ? 'bg-rose-700 text-white shadow-xs'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {t(`journal_flow_${f}`)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mood & Emotions Selector (Includes explicit Mood Swings!) */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                {t('journal_mood_label')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'calm', labelKey: 'journal_mood_calm' },
                  { id: 'mood_swings', labelKey: 'journal_mood_swings' },
                  { id: 'tired', labelKey: 'journal_mood_tired' },
                  { id: 'anxious', labelKey: 'journal_mood_anxious' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id as any)}
                    className={`min-h-touch px-3 py-2.5 rounded-xl text-xs font-bold transition text-left flex items-center gap-2 ${
                      mood === m.id
                        ? 'bg-indigo-700 text-white shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    <Smile className="w-4 h-4 shrink-0" />
                    <span>{t(m.labelKey)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pain / Cramp Scale (0 to 5) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  {t('journal_pain_label')}
                </label>
                <span className="text-sm font-extrabold text-stone-900 dark:text-white px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg">
                  {painScale}/5
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={painScale}
                onChange={(e) => setPainScale(Number(e.target.value))}
                className="w-full accent-rose-600 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Notes */}
            <div>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('journal_notes_placeholder')}
                className="w-full p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm placeholder:text-stone-400 resize-none"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="min-h-touch py-3.5 px-6 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm sm:text-base shadow-md transition flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>{t('journal_btn_save')}</span>
            </button>

            {savedNotice && (
              <div className="p-3 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 rounded-xl text-xs font-bold text-center animate-fade-in flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Saved successfully on your device!</span>
              </div>
            )}
          </form>
        </div>

        {/* Recent Entries List on Right */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <h3 className="font-bold text-stone-900 dark:text-white text-base">
            {t('journal_recent_logs')} ({entries.length})
          </h3>

          {entries.length === 0 ? (
            <div className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500">
              {t('journal_no_logs')}
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-extrabold text-stone-900 dark:text-white text-xs">
                        {entry.date}
                      </span>
                      {entry.isPeriodDay && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 text-[10px] font-bold">
                          Period ({entry.flow || 'Normal'})
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-stone-600 dark:text-stone-400 flex items-center gap-2 flex-wrap">
                      {entry.mood && (
                        <span className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {t(`journal_mood_${entry.mood}`)}
                        </span>
                      )}
                      <span>Pain: {entry.painScale}/5</span>
                    </div>

                    {entry.notes && (
                      <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 italic">
                        "{entry.notes}"
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
