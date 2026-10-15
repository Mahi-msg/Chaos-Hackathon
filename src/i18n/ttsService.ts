import { LanguageCode } from '../logic/types';

export interface TTSStatus {
  isSpeaking: boolean;
  voiceMissingWarning: boolean;
  supported: boolean;
}

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public isSupported(): boolean {
    return Boolean(this.synth);
  }

  private getLangCode(lang: LanguageCode): string {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'kn':
        return 'kn-IN';
      case 'en':
      default:
        return 'en-IN';
    }
  }

  /**
   * Finds the best voice for the chosen language.
   * Looks for exact match (e.g. 'hi-IN' or 'kn-IN'), then prefix match (e.g. 'hi' or 'kn').
   */
  public findVoiceForLang(lang: LanguageCode): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const target = this.getLangCode(lang).toLowerCase();
    const prefix = lang.toLowerCase();

    if (this.voices.length === 0) {
      this.loadVoices();
    }
    const voices = this.voices.length > 0 ? this.voices : this.synth.getVoices();
    // Exact match
    const exact = voices.find((v) => v.lang.toLowerCase() === target || v.lang.toLowerCase().replace('_', '-') === target);
    if (exact) return exact;

    // Language prefix match
    const prefixMatch = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
    if (prefixMatch) return prefixMatch;

    return null;
  }

  /**
   * Reads text aloud using Web Speech API.
   * If regional voice is unavailable, informs caller via callback so a gentle notice is shown.
   */
  public speak(
    text: string,
    lang: LanguageCode,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (error: any) => void;
      onVoiceMissing?: () => void;
    }
  ): void {
    if (!this.synth) {
      callbacks?.onError?.('SpeechSynthesis not supported');
      return;
    }

    this.stop();

    const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const langCode = this.getLangCode(lang);
    utterance.lang = langCode;
    utterance.rate = 0.95; // Friendly, calm pacing
    utterance.pitch = 1.0;

    const voice = this.findVoiceForLang(lang);
    if (voice) {
      utterance.voice = voice;
    } else if (lang !== 'en') {
      // For Hindi or Kannada, if specific regional voice is absent, notify gently
      callbacks?.onVoiceMissing?.();
    }

    utterance.onstart = () => {
      callbacks?.onStart?.();
    };

    utterance.onend = () => {
      callbacks?.onEnd?.();
    };

    utterance.onerror = (e) => {
      callbacks?.onError?.(e);
    };

    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSpeaking(): boolean {
    return Boolean(this.synth?.speaking);
  }
}

export const tts = new TTSService();
