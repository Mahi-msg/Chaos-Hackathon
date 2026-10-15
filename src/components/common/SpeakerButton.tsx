import React from 'react';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { useI18n } from '../../i18n/i18nContext';

interface SpeakerButtonProps {
  textToRead: string;
  className?: string;
  label?: string;
}

export const SpeakerButton: React.FC<SpeakerButtonProps> = ({
  textToRead,
  className = '',
  label,
}) => {
  const { speak, stopSpeaking, isSpeaking, voiceNotice, clearVoiceNotice, t } = useI18n();

  const handleToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(textToRead);
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={label || t('speaker_button_label')}
        aria-pressed={isSpeaking}
        className={`min-h-touch min-w-touch p-2.5 rounded-full flex items-center justify-center transition-all shadow-sm ${
          isSpeaking
            ? 'bg-rose-700 text-white ring-4 ring-rose-200 animate-pulse'
            : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
        } ${className}`}
        title={t('speaker_button_label')}
      >
        {isSpeaking ? (
          <VolumeX className="w-6 h-6 stroke-[2.2]" />
        ) : (
          <Volume2 className="w-6 h-6 stroke-[2.2]" />
        )}
      </button>

      {/* Voice missing notice or guidance */}
      {voiceNotice && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-12 z-50 w-64 p-2.5 text-xs bg-amber-50 border border-amber-300 text-amber-900 rounded-xl shadow-lg flex items-start gap-2 animate-fade-in"
        >
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{voiceNotice}</p>
            <button
              type="button"
              onClick={clearVoiceNotice}
              className="mt-1 text-[11px] font-semibold underline text-amber-800"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
