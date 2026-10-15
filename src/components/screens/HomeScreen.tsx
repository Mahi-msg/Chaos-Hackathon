import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import {
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Search,
  BookMarked,
  Star,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface HomeScreenProps {
  onStartAssessment: () => void;
  onOpenGuide: () => void;
  onOpenJournal: () => void;
  onOpenFindCare: () => void;
  onOpenExplore: () => void;
  onLoadDemo: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartAssessment,
  onOpenGuide,
  onOpenJournal,
  onOpenFindCare,
  onOpenExplore,
  onLoadDemo,
}) => {
  const { t } = useI18n();

  return (
    <div className="yajnaseni-home w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col gap-10">
      {/* Hero Section */}
      <div className="yajnaseni-hero flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-rose-600 to-rose-400 text-white flex items-center justify-center mb-4 shadow-lg ring-8 ring-rose-100 dark:ring-rose-950/60">
          <Heart className="w-9 h-9 sm:w-11 sm:h-11 fill-white" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Sakhi Health Card • सखी • ಸಖಿ</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight max-w-2xl leading-tight">
          {t('home_hero_title')}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 mt-4 max-w-xl leading-relaxed">
          {t('home_hero_desc')}
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md">
          <button
            type="button"
            onClick={onStartAssessment}
            className="min-h-touch w-full py-4 px-6 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group"
          >
            <span>{t('home_cta_explore_symptoms')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onLoadDemo}
            className="min-h-touch w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 font-semibold text-sm transition flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <span>{t('demo_button')}</span>
          </button>
        </div>
      </div>

      <div className="yajnaseni-hero-art" aria-hidden="true">
        <div className="yajnaseni-orbit yajnaseni-orbit-one" />
        <div className="yajnaseni-orbit yajnaseni-orbit-two" />
        <div className="yajnaseni-glow yajnaseni-glow-one" />
        <div className="yajnaseni-glow yajnaseni-glow-two" />
        <div className="yajnaseni-art-card">
          <div className="yajnaseni-heart-mark"><Heart size={38} strokeWidth={1.7} /></div>
          <h2>Your body tells a story.</h2>
          <p>We help you put the pieces together.</p>
          <div className="yajnaseni-progress"><span /><span /><span /></div>
        </div>
        <div className="yajnaseni-float-card yajnaseni-safe-card"><ShieldCheck size={18} /><div><strong>Safe space</strong><small>Your details stay on this device</small></div></div>
        <div className="yajnaseni-float-card yajnaseni-time-card"><span className="yajnaseni-clock">◷</span><div><strong>About 3 minutes</strong><small>Simple, guided questions</small></div></div>
        <span className="yajnaseni-sparkle sparkle-a">✦</span><span className="yajnaseni-sparkle sparkle-b">✦</span>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={onStartAssessment}
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-left hover:border-rose-400 dark:hover:border-rose-700 shadow-xs hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h3 className="font-bold text-stone-900 dark:text-white text-base group-hover:text-rose-700 dark:group-hover:text-rose-400 transition">
            Check Symptoms
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Tap illustrated cards & get a doctor-ready health card.
          </p>
        </button>

        <button
          type="button"
          onClick={onOpenGuide}
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-left hover:border-rose-400 dark:hover:border-rose-700 shadow-xs hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h3 className="font-bold text-stone-900 dark:text-white text-base group-hover:text-rose-700 dark:group-hover:text-rose-400 transition">
            PCOS & Menopause
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Awareness guide on reproductive years & menopause overlap.
          </p>
        </button>

        <button
          type="button"
          onClick={onOpenJournal}
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-left hover:border-rose-400 dark:hover:border-rose-700 shadow-xs hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mb-3">
            <BookMarked className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h3 className="font-bold text-stone-900 dark:text-white text-base group-hover:text-rose-700 dark:group-hover:text-rose-400 transition">
            Daily Journal
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Log period days, flow intensity, mood swings & pain.
          </p>
        </button>

        <button
          type="button"
          onClick={onOpenFindCare}
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-left hover:border-rose-400 dark:hover:border-rose-700 shadow-xs hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-3">
            <Search className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h3 className="font-bold text-stone-900 dark:text-white text-base group-hover:text-rose-700 dark:group-hover:text-rose-400 transition">
            Find Care
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Search nearby gynecologists with Google Maps.
          </p>
        </button>
      </div>

      {/* About This Website Section */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
              {t('home_about_title')}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
              {t('home_about_desc')}
            </p>
            <button
              type="button"
              onClick={onOpenExplore}
              className="mt-3 text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <span>Explore our privacy, safety guarantees & myth-busters</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Why Women Trust Sakhi */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
            {t('home_trust_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-white text-base">
              {t('home_trust_device_title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t('home_trust_device_desc')}
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-white text-base">
              {t('home_trust_doctor_title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t('home_trust_doctor_desc')}
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-white text-base">
              {t('home_trust_audio_title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t('home_trust_audio_desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Community Reviews & Feedback */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
            {t('home_reviews_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed">
                "{t('home_review_1_text')}"
              </p>
            </div>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
              — {t('home_review_1_author')}
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed">
                "{t('home_review_2_text')}"
              </p>
            </div>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
              — {t('home_review_2_author')}
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed">
                "{t('home_review_3_text')}"
              </p>
            </div>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
              — {t('home_review_3_author')}
            </span>
          </div>
        </div>
      </div>

      {/* Prominent Medical Notice Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-rose-50/70 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-900 flex items-start gap-3.5">
        <AlertCircle className="w-6 h-6 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-extrabold text-rose-950 dark:text-rose-100 text-base">
            {t('home_disclaimer_title')}
          </h3>
          <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 mt-1 leading-relaxed">
            {t('home_disclaimer_desc')}
          </p>
        </div>
      </div>
    </div>
  );
};
