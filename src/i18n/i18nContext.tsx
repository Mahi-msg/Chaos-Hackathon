import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode } from '../logic/types';
import en from './en.json';
import hi from './hi.json';
import kn from './kn.json';
import { tts } from './ttsService';

type Translations = Record<string, string>;

const translationMap: Record<LanguageCode, Translations> = {
  en: en as unknown as Translations,
  hi: hi as unknown as Translations,
  kn: kn as unknown as Translations,
};

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tEn: (key: string, params?: Record<string, string | number>) => string;
  tCurrent: (key: string, params?: Record<string, string | number>) => string;
  speak: (text: string, overrideLang?: LanguageCode) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  voiceNotice: string | null;
  clearVoiceNotice: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  let result = template;
  for (const [k, v] of Object.entries(params)) {
    result = result.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
  }
  return result;
}

export const I18nProvider: React.FC<{
  initialLang?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  children: ReactNode;
}> = ({ initialLang = 'en', onLanguageChange, children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(initialLang);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  useEffect(() => {
    setLanguageState(initialLang);
  }, [initialLang]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    tts.stop();
    setIsSpeaking(false);
    setVoiceNotice(null);
    onLanguageChange?.(lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = translationMap[language] || translationMap.en;
    const str = dict[key] || translationMap.en[key] || key;
    return interpolate(str, params);
  };

  const tEn = (key: string, params?: Record<string, string | number>): string => {
    const str = translationMap.en[key] || key;
    return interpolate(str, params);
  };

  const tCurrent = (key: string, params?: Record<string, string | number>): string => {
    return t(key, params);
  };

  const speak = (text: string, overrideLang?: LanguageCode) => {
    const targetLang = overrideLang || language;
    setVoiceNotice(null);

    if (!tts.isSupported()) {
      setVoiceNotice(t('speaker_not_supported'));
      return;
    }

    tts.speak(text, targetLang, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: (err) => {
        setIsSpeaking(false);
        console.warn('Speech synthesis error', err);
      },
      onVoiceMissing: () => {
        setVoiceNotice(t('speaker_voice_missing'));
      },
    });
  };

  const stopSpeaking = () => {
    tts.stop();
    setIsSpeaking(false);
  };

  const clearVoiceNotice = () => {
    setVoiceNotice(null);
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        tEn,
        tCurrent,
        speak,
        stopSpeaking,
        isSpeaking,
        voiceNotice,
        clearVoiceNotice,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
