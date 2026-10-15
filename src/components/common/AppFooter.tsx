import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { PhoneCall, BookOpen, ShieldAlert, Heart, ExternalLink } from 'lucide-react';
import en from '../../i18n/en.json';
import hi from '../../i18n/hi.json';
import kn from '../../i18n/kn.json';

export const AppFooter: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="print:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-colors pt-10 pb-8 px-4 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Row 1: Helplines & Medical Citations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Helplines */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" />
              <span>{t('footer_helplines_title')}</span>
            </h4>
            <ul className="text-xs text-stone-600 dark:text-stone-400 flex flex-col gap-2">
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700">
                <span className="font-semibold">{t('footer_helpline_1')}</span>
                <a href="tel:1091" className="text-rose-600 font-bold underline">1091</a>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700">
                <span className="font-semibold">{t('footer_helpline_2')}</span>
                <a href="tel:112" className="text-rose-600 font-bold underline">112</a>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700">
                <span className="font-semibold">{t('footer_helpline_3')}</span>
                <a href="tel:14416" className="text-teal-600 font-bold underline">14416</a>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700">
                <span className="font-semibold">{t('footer_helpline_4')}</span>
                <a href="tel:08046110007" className="text-teal-600 font-bold underline">080-46110007</a>
              </li>
            </ul>
          </div>

          {/* Evidence Sources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{t('footer_sources_title')}</span>
            </h4>
            <ul className="text-xs text-stone-600 dark:text-stone-400 flex flex-col gap-2">
              <li className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700">
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-stone-800 dark:text-stone-200 hover:text-rose-600 flex items-center justify-between gap-2"
                >
                  <span>{t('footer_source_who')}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </li>
              <li className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700">
                <a
                  href="https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/06/polycystic-ovary-syndrome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-stone-800 dark:text-stone-200 hover:text-rose-600 flex items-center justify-between gap-2"
                >
                  <span>{t('footer_source_acog')}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </li>
              <li className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {t('footer_source_endocrine')}
                </span>
              </li>
              <li className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {t('footer_source_icmr')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Banner in All 3 Languages */}
        <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center flex flex-col gap-1.5">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-stone-500" />
            <span>Medical Disclaimer / अस्वीकरण / ಹಕ್ಕುತ್ಯಾಗ</span>
          </div>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 font-medium">
            {en.card_footer_disclaimer}
          </p>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 font-medium">
            {hi.card_footer_disclaimer}
          </p>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 font-medium">
            {kn.card_footer_disclaimer}
          </p>
        </div>

        {/* Bottom credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-2 border-t border-stone-100 dark:border-stone-800 pt-4">
          <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Sakhi Health Card • 100% On-Device Privacy</span>
          </div>
          <span>General symptom exploration & awareness only. Not a medical diagnosis.</span>
        </div>
      </div>
    </footer>
  );
};
