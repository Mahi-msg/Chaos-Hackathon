import React, { useState, useEffect } from 'react';
import { I18nProvider, useI18n } from './i18n/i18nContext';
import {
  clearAllStoredData,
  getDemoProfile,
  loadStoredData,
  saveStoredData,
} from './services/storage';
import {
  JournalEntry,
  RedFlagState,
  SelectedSymptom,
} from './logic/types';
import { evaluateHealthCard } from './logic/healthCardLogic';
import { ActiveNavTab, StepHeader } from './components/common/StepHeader';
import { HomeScreen } from './components/screens/HomeScreen';
import { PcosMenopauseGuide } from './components/screens/PcosMenopauseGuide';
import { JournalScreen } from './components/screens/JournalScreen';
import { FindCareScreen } from './components/screens/FindCareScreen';
import { ExploreSafetyScreen } from './components/screens/ExploreSafetyScreen';
import { Screen1Language } from './components/screens/Screen1Language';
import { Screen2Privacy } from './components/screens/Screen2Privacy';
import { Screen3Symptoms } from './components/screens/Screen3Symptoms';
import { Screen4Calendar } from './components/screens/Screen4Calendar';
import { Screen5RedFlags } from './components/screens/Screen5RedFlags';
import { Screen6HealthCard } from './components/screens/Screen6HealthCard';
import { AppFooter } from './components/common/AppFooter';

const MainApp: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  // Load initial stored state
  const [initialData] = useState(() => loadStoredData());

  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');

  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (!initialData.privacyConsented) return 1;
    return 3;
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>(
    initialData.selectedSymptoms || []
  );
  const [periodDates, setPeriodDates] = useState<string[]>(
    initialData.periodDates || []
  );
  const [redFlags, setRedFlags] = useState<RedFlagState>(
    initialData.redFlags || {}
  );
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(
    initialData.journalEntries || []
  );
  const [llmEnabled] = useState<boolean>(
    initialData.llmFeatureFlag || false
  );

  // Sync state to localStorage
  useEffect(() => {
    saveStoredData({
      language,
      privacyConsented: currentStep > 2,
      selectedSymptoms,
      periodDates,
      redFlags,
      journalEntries,
      llmFeatureFlag: llmEnabled,
    });
  }, [language, currentStep, selectedSymptoms, periodDates, redFlags, journalEntries, llmEnabled]);

  // Load sample PCOS-like demo profile for judges (takes user straight to Health Card)
  const handleLoadDemo = () => {
    const demo = getDemoProfile();
    if (demo.selectedSymptoms) setSelectedSymptoms(demo.selectedSymptoms);
    if (demo.periodDates) setPeriodDates(demo.periodDates);
    if (demo.redFlags) setRedFlags(demo.redFlags);
    setActiveTab('check');
    setCurrentStep(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Permanently delete all local data
  const handleClearData = () => {
    clearAllStoredData();
    setSelectedSymptoms([]);
    setPeriodDates([]);
    setRedFlags({});
    setJournalEntries([]);
    setCurrentStep(1);
    setActiveTab('home');
    setLanguage('en');
  };

  // Step navigation in Check Assessment
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(6, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Journal handlers
  const handleSaveJournalEntry = (entry: JournalEntry) => {
    setJournalEntries((prev) => [entry, ...prev]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Compute deterministic evaluation
  const evaluation = evaluateHealthCard(selectedSymptoms, periodDates, redFlags);

  // Screen narration text for the top audio button
  const getScreenNarrationText = (): string => {
    if (activeTab === 'home') {
      return `${t('home_hero_title')}. ${t('home_hero_desc')}. ${t('home_about_desc')}`;
    }
    if (activeTab === 'pcos_guide') {
      return `${t('guide_pcos_header')}. ${t('guide_pcos_body')}. ${t('guide_menopause_header')}`;
    }
    if (activeTab === 'journal') {
      return `${t('journal_title')}. ${t('journal_subtitle')}`;
    }
    if (activeTab === 'findcare') {
      return `${t('findcare_title')}. ${t('findcare_subtitle')}`;
    }
    if (activeTab === 'explore') {
      return `${t('explore_title')}. ${t('explore_subtitle')}`;
    }

    // Inside 'check' assessment
    switch (currentStep) {
      case 1:
        return `${t('language_select_title')}. ${t('language_select_subtitle')}`;
      case 2:
        return `${t('privacy_title')}. ${t('privacy_point_1')}. ${t('privacy_point_2')}. ${t('privacy_point_3')}`;
      case 3:
        return `${t('symptoms_title')}. ${t('symptoms_subtitle')}`;
      case 4:
        return `${t('calendar_title')}. ${t('calendar_subtitle')}. ${t('calendar_instructions')}`;
      case 5:
        return `${t('redflags_title')}. ${t('redflags_subtitle')}`;
      case 6:
      default:
        return `${t('card_title')}. ${t('card_subtitle')}`;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-between text-stone-900 dark:text-stone-100 font-sans transition-colors">
      {/* Universal Step Header with Tabs, Dark Mode, Audio, Language, Demo Button */}
      <StepHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentStep={currentStep}
        totalSteps={6}
        onBack={activeTab === 'check' && currentStep > 1 ? prevStep : undefined}
        onClearData={handleClearData}
        onLoadDemo={handleLoadDemo}
        screenTextToRead={getScreenNarrationText()}
      />

      {/* Main Flow Content (Responsive: Centers comfortably on desktop & mobile) */}
      <main className="flex-1 flex flex-col justify-center py-4">
        {/* Tab 1: Home */}
        {activeTab === 'home' && (
          <HomeScreen
            onStartAssessment={() => {
              setActiveTab('check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGuide={() => {
              setActiveTab('pcos_guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenJournal={() => {
              setActiveTab('journal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenFindCare={() => {
              setActiveTab('findcare');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenExplore={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {/* Tab 2: Check Symptoms Assessment Flow (Steps 1-6) */}
        {activeTab === 'check' && (
          <>
            {currentStep === 1 && (
              <Screen1Language onNext={nextStep} onLoadDemo={handleLoadDemo} />
            )}

            {currentStep === 2 && (
              <Screen2Privacy onConsent={nextStep} onClearData={handleClearData} />
            )}

            {currentStep === 3 && (
              <Screen3Symptoms
                selectedSymptoms={selectedSymptoms}
                onChange={setSelectedSymptoms}
                onNext={nextStep}
                llmEnabled={llmEnabled}
              />
            )}

            {currentStep === 4 && (
              <Screen4Calendar
                periodDates={periodDates}
                onChange={setPeriodDates}
                onNext={nextStep}
                onOpenJournal={() => {
                  setActiveTab('journal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentStep === 5 && (
              <Screen5RedFlags
                redFlags={redFlags}
                onChange={setRedFlags}
                onNext={nextStep}
              />
            )}

            {currentStep === 6 && (
              <Screen6HealthCard
                evaluation={evaluation}
                selectedSymptoms={selectedSymptoms}
                periodDates={periodDates}
                redFlags={redFlags}
                onStartOver={() => setCurrentStep(1)}
              />
            )}
          </>
        )}

        {/* Tab 3: PCOS & Menopause Guide */}
        {activeTab === 'pcos_guide' && <PcosMenopauseGuide />}

        {/* Tab 4: Daily Journal */}
        {activeTab === 'journal' && (
          <JournalScreen
            entries={journalEntries}
            onSaveEntry={handleSaveJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
          />
        )}

        {/* Tab 5: Find Care */}
        {activeTab === 'findcare' && <FindCareScreen />}

        {/* Tab 6: Explore & Safety */}
        {activeTab === 'explore' && <ExploreSafetyScreen />}
      </main>

      {/* Comprehensive Medical Helplines & Sources Footer */}
      <AppFooter />
    </div>
  );
};

export default function App() {
  const initial = loadStoredData();

  return (
    <I18nProvider initialLang={initial.language}>
      <MainApp />
    </I18nProvider>
  );
}
