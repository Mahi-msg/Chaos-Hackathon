import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { DoctorQuestion } from '../../logic/types';
import { HelpCircle, CheckSquare, Square } from 'lucide-react';

interface DoctorQuestionsProps {
  questions: DoctorQuestion[];
}

export const DoctorQuestions: React.FC<DoctorQuestionsProps> = ({ questions }) => {
  const { t, tEn, language } = useI18n();
  const showBilingual = language !== 'en';
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-600" />
            <span>{t('section_questions_doctor')}</span>
          </h3>
          {showBilingual && (
            <p className="text-xs text-stone-500 font-medium">
              {tEn('section_questions_doctor')}
            </p>
          )}
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-full">
          {questions.length} questions
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isChecked = Boolean(checkedIds[q.id]);

          return (
            <div
              key={q.id}
              onClick={() => toggleCheck(q.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                isChecked
                  ? 'border-teal-300 bg-teal-50/50'
                  : 'border-stone-200 bg-stone-50/60 hover:bg-stone-100/70'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-stone-400 hover:text-stone-700 shrink-0"
                aria-label={`Toggle question ${idx + 1}`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-teal-700" />
                ) : (
                  <Square className="w-5 h-5 text-stone-400" />
                )}
              </button>

              <div className="flex-1">
                <p
                  className={`text-sm sm:text-base font-semibold leading-relaxed ${
                    isChecked ? 'text-teal-950 line-through opacity-70' : 'text-stone-900'
                  }`}
                >
                  {t(q.questionKey)}
                </p>

                {showBilingual && (
                  <p className="text-xs text-stone-600 mt-1 font-medium italic">
                    {tEn(q.questionKey)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
