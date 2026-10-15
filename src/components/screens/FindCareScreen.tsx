import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import {
  Search,
  MapPin,
  Phone,
  ExternalLink,
  CheckCircle2,
  Stethoscope,
  Building2,
  Navigation,
} from 'lucide-react';

export const FindCareScreen: React.FC = () => {
  const { t } = useI18n();
  const [searchLocation, setSearchLocation] = useState<string>('');

  const handleGoogleMapsSearch = (query: string) => {
    const finalQuery = searchLocation ? `${query} near ${searchLocation}` : query;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalQuery)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const sampleClinics = [
    {
      id: 'clinic-1',
      name: "Fortis La Femme & Women's Specialized Care",
      specialty: 'Obstetrics, Gynecology & Reproductive Endocrinology',
      location: 'Major Metro Centers & Online Teleconsultation',
      phone: '1800-102-4466',
      mapsQuery: 'Fortis La Femme hospital',
      rating: '4.8 ★',
    },
    {
      id: 'clinic-2',
      name: 'Apollo Cradle & Fertility Clinics',
      specialty: 'PCOS Management, Hormone Health & Ultrasound Imaging',
      location: 'Pan-India Locations (Bengaluru, Delhi, Mumbai, Hyderabad)',
      phone: '1860-500-1066',
      mapsQuery: 'Apollo Cradle clinic',
      rating: '4.7 ★',
    },
    {
      id: 'clinic-3',
      name: 'Manipal Women Care & Endocrine Department',
      specialty: 'Multidisciplinary Gynecologist & Endocrinologist Consultation',
      location: 'Karnataka, Tamil Nadu, Maharashtra, NCR',
      phone: '1800-102-5555',
      mapsQuery: 'Manipal Hospital womens clinic',
      rating: '4.9 ★',
    },
    {
      id: 'clinic-4',
      name: 'Cloudnine Maternity & Women Wellness Clinic',
      specialty: 'Adolescent & Adult PCOS, Cycle Wellness, Perimenopause',
      location: 'Bengaluru, Chennai, Pune, Gurugram, Chandigarh',
      phone: '99728-99728',
      mapsQuery: 'Cloudnine hospital women',
      rating: '4.8 ★',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col gap-8">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 mb-2">
          <Search className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('findcare_title')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1 max-w-xl mx-auto">
          {t('findcare_subtitle')}
        </p>
      </div>

      {/* Google Maps Real-Time Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGoogleMapsSearch('Gynecologist women clinic');
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <MapPin className="w-5 h-5 text-rose-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder={t('findcare_search_placeholder')}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
            />
          </div>

          <button
            type="submit"
            className="min-h-touch px-6 py-3.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Navigation className="w-4 h-4" />
            <span>{t('findcare_btn_search')}</span>
          </button>
        </form>

        {/* Quick Directory Filters */}
        <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
            {t('findcare_quick_searches')}:
          </span>
          <button
            type="button"
            onClick={() => handleGoogleMapsSearch('Gynecologists near me')}
            className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 text-xs font-semibold hover:bg-rose-100 border border-rose-200 dark:border-rose-800 transition flex items-center gap-1"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{t('findcare_quick_gyn')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleGoogleMapsSearch('Endocrinologists hormone doctors near me')}
            className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 text-xs font-semibold hover:bg-teal-100 border border-teal-200 dark:border-teal-800 transition flex items-center gap-1"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('findcare_quick_endo')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleGoogleMapsSearch('Womens health clinic near me')}
            className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 transition flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('findcare_quick_clinic')}</span>
          </button>
        </div>
      </div>

      {/* Recommended Facilities Directory */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
          {t('findcare_sample_clinics_title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-stone-900 dark:text-white text-base leading-snug">
                    {clinic.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-extrabold shrink-0">
                    {clinic.rating}
                  </span>
                </div>
                <p className="text-xs text-rose-700 dark:text-rose-400 font-semibold mt-1">
                  {clinic.specialty}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{clinic.location}</span>
                </p>
              </div>

              {/* Action Buttons: Call, Directions, Book */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                <a
                  href={`tel:${clinic.phone}`}
                  className="min-h-touch flex-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('findcare_btn_call')}</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleGoogleMapsSearch(clinic.mapsQuery)}
                  className="min-h-touch flex-1 py-2 px-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t('findcare_btn_directions')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist: What to bring */}
      <div className="p-6 rounded-3xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 flex flex-col gap-3">
        <h3 className="font-extrabold text-teal-950 dark:text-teal-100 text-base flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-teal-700 dark:text-teal-400" />
          <span>{t('findcare_checklist_title')}</span>
        </h3>
        <ul className="text-xs sm:text-sm text-teal-900 dark:text-teal-200 flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>{t('findcare_checklist_1')}</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>{t('findcare_checklist_2')}</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>{t('findcare_checklist_3')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
