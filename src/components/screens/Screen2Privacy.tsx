import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { ShieldCheck, HardDrive, EyeOff, Trash2, ArrowRight } from 'lucide-react';

interface Screen2Props {
  onConsent: () => void;
  onClearData: () => void;
}

export const Screen2Privacy: React.FC<Screen2Props> = ({ onConsent, onClearData }) => {
  const { t } = useI18n();

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 sm:py-10 flex flex-col items-center">
      <div className="w-16 h-16 rounded-3xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
        <ShieldCheck className="w-10 h-10 stroke-[2.2]" />
      </div>

      <span className="inline-block px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
        {t('privacy_badge')}
      </span>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 text-center mb-6">
        {t('privacy_title')}
      </h1>

      {/* 3 Plain-language points */}
      <div className="w-full bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-base">On-Device Only</h3>
            <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">
              {t('privacy_point_1')}
            </p>
          </div>
        </div>

        <div className="h-px bg-stone-100" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-base">No Accounts or Tracking</h3>
            <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">
              {t('privacy_point_2')}
            </p>
          </div>
        </div>

        <div className="h-px bg-stone-100" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-base">Complete Control</h3>
            <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">
              {t('privacy_point_3')}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full flex flex-col gap-3">
        <button
          type="button"
          onClick={onConsent}
          className="min-h-touch w-full py-4 px-6 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <span>{t('privacy_consent_affirm')}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={() => {
            if (window.confirm(t('btn_clear_data') + '?')) {
              onClearData();
            }
          }}
          className="min-h-touch w-full py-3 px-5 rounded-2xl bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 font-semibold text-sm transition flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t('btn_clear_data')}</span>
        </button>
      </div>
    </div>
  );
};
