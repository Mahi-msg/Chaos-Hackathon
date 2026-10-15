import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { CareRouting, DoctorDiscussionItem } from '../../logic/types';
import { Stethoscope, TestTube2, Info } from 'lucide-react';

interface CareRoutingAndTestsProps {
  careRouting: CareRouting;
  testsToDiscuss: DoctorDiscussionItem[];
}

export const CareRoutingAndTests: React.FC<CareRoutingAndTestsProps> = ({
  careRouting,
  testsToDiscuss,
}) => {
  const { t, tEn, language } = useI18n();
  const showBilingual = language !== 'en';

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col gap-6">
      {/* 1. Who To See */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-rose-600" />
              <span>{t('section_who_to_see')}</span>
            </h3>
            {showBilingual && (
              <p className="text-xs text-stone-500 font-medium">
                {tEn('section_who_to_see')}
              </p>
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-700 text-white text-xs font-bold uppercase tracking-wider">
              Primary Specialist
            </span>
            <h4 className="font-bold text-teal-950 text-base">
              {t(careRouting.primaryDoctorKey)}
            </h4>
          </div>

          {showBilingual && (
            <p className="text-xs text-teal-800 font-medium">
              {tEn(careRouting.primaryDoctorKey)}
            </p>
          )}

          {careRouting.secondaryDoctorKey && (
            <div className="mt-2 pt-2 border-t border-teal-200/80">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-bold uppercase tracking-wider">
                  Additional Specialist
                </span>
                <h5 className="font-semibold text-stone-900 text-sm">
                  {t(careRouting.secondaryDoctorKey)}
                </h5>
              </div>
              {showBilingual && (
                <p className="text-xs text-stone-600 mt-0.5">
                  {tEn(careRouting.secondaryDoctorKey)}
                </p>
              )}
            </div>
          )}

          <p className="text-xs sm:text-sm text-teal-900 mt-1">
            {t(careRouting.routingReasonKey)}
          </p>
        </div>
      </div>

      {/* 2. Tests Doctors Commonly Discuss */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <TestTube2 className="w-5 h-5 text-rose-600" />
              <span>{t('section_tests_to_discuss')}</span>
            </h3>
            {showBilingual && (
              <p className="text-xs text-stone-500 font-medium">
                {tEn('section_tests_to_discuss')}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3 flex items-start gap-2 p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
          <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <p>{t('tests_disclaimer_note')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {testsToDiscuss.map((test) => (
            <div
              key={test.id}
              className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-stone-900 text-sm leading-snug">
                  {t(test.nameKey)}
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {t(test.purposeKey)}
                </p>
              </div>

              {showBilingual && (
                <div className="mt-2 pt-2 border-t border-stone-200 text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">{tEn(test.nameKey)}</span>
                  <p className="text-[10px] text-stone-500">{tEn(test.purposeKey)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
