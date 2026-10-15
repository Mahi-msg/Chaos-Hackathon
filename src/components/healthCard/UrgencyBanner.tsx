import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { UrgencyLevel } from '../../logic/types';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface UrgencyBannerProps {
  urgency: UrgencyLevel;
  activeRedFlagsCount: number;
}

export const UrgencyBanner: React.FC<UrgencyBannerProps> = ({
  urgency,
  activeRedFlagsCount,
}) => {
  const { t, tEn, language } = useI18n();
  const isUrgent = urgency === 'SEE_SOON';
  const showBilingual = language !== 'en';

  return (
    <div
      role="alert"
      className={`rounded-3xl p-5 sm:p-6 border-2 shadow-xs transition-all ${
        isUrgent
          ? 'bg-amber-50 border-amber-400 text-amber-950'
          : 'bg-teal-50 border-teal-300 text-teal-950'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            isUrgent ? 'bg-amber-200 text-amber-900' : 'bg-teal-200 text-teal-900'
          }`}
        >
          {isUrgent ? (
            <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
          ) : (
            <CheckCircle className="w-7 h-7 stroke-[2.2]" />
          )}
        </div>

        <div className="flex-1">
          {/* Chosen Language */}
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {isUrgent ? t('urgency_see_soon_title') : t('urgency_routine_title')}
            </h3>
            <p className="text-sm sm:text-base mt-1 leading-relaxed opacity-90 font-medium">
              {isUrgent ? t('urgency_banner_see_soon_desc') : t('urgency_banner_routine_desc')}
            </p>
          </div>

          {/* Bilingual English subtitle if user chose Hindi or Kannada */}
          {showBilingual && (
            <div className="mt-3 pt-3 border-t border-black/10">
              <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500">
                Doctor's Reference (English)
              </span>
              <h4 className="text-sm font-bold text-stone-800">
                {isUrgent ? tEn('urgency_see_soon_title') : tEn('urgency_routine_title')}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                {isUrgent ? tEn('urgency_banner_see_soon_desc') : tEn('urgency_banner_routine_desc')}
              </p>
            </div>
          )}

          {isUrgent && activeRedFlagsCount > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 rounded-full text-xs font-bold text-amber-950">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeRedFlagsCount} urgent signs flagged for doctor review</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
