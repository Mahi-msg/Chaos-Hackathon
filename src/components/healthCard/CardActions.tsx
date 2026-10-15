import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { Volume2, Printer, Share2, RotateCcw, Check, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CardActionsProps {
  cardElementId: string;
  cardSummaryToRead: string;
  onStartOver: () => void;
}

export const CardActions: React.FC<CardActionsProps> = ({
  cardElementId,
  cardSummaryToRead,
  onStartOver,
}) => {
  const { t, speak, stopSpeaking, isSpeaking } = useI18n();
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [imageDownloaded, setImageDownloaded] = useState(false);

  // 1. Audio narration
  const handleListen = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(cardSummaryToRead);
    }
  };

  // 2. Print or Save as PDF (triggers native high-res browser print dialog)
  const handlePrint = () => {
    window.print();
  };

  // 3. Share as Image (html2canvas)
  const handleShareImage = async () => {
    const cardEl = document.getElementById(cardElementId);
    if (!cardEl) return;

    try {
      setIsExportingImage(true);
      const canvas = await html2canvas(cardEl, {
        scale: 2, // high-res
        useCORS: true,
        backgroundColor: '#fafaf9',
        logging: false,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Sakhi-Health-Card-${new Date().toISOString().slice(0, 10)}.png`;
      link.click();

      setImageDownloaded(true);
      setTimeout(() => setImageDownloaded(false), 3000);
    } catch (err) {
      console.error('Error generating card image:', err);
    } finally {
      setIsExportingImage(false);
    }
  };

  return (
    <div className="print:hidden w-full flex flex-col sm:flex-row items-center justify-center gap-3">
      {/* Listen to Card */}
      <button
        type="button"
        onClick={handleListen}
        className={`min-h-touch px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-xs w-full sm:w-auto ${
          isSpeaking
            ? 'bg-rose-700 text-white animate-pulse'
            : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300'
        }`}
      >
        <Volume2 className="w-5 h-5 stroke-[2.2]" />
        <span>{t('btn_listen_card')}</span>
      </button>

      {/* Save as PDF / Print */}
      <button
        type="button"
        onClick={handlePrint}
        className="min-h-touch px-5 py-3.5 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-md w-full sm:w-auto"
      >
        <Printer className="w-5 h-5" />
        <span>{t('btn_save_pdf')}</span>
      </button>

      {/* Share as Image */}
      <button
        type="button"
        onClick={handleShareImage}
        disabled={isExportingImage}
        className="min-h-touch px-5 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-xs w-full sm:w-auto"
      >
        {isExportingImage ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : imageDownloaded ? (
          <Check className="w-5 h-5" />
        ) : (
          <Share2 className="w-5 h-5" />
        )}
        <span>{imageDownloaded ? 'Saved!' : t('btn_share_image')}</span>
      </button>

      {/* Start Over */}
      <button
        type="button"
        onClick={() => {
          if (window.confirm(t('btn_start_over') + '?')) {
            onStartOver();
          }
        }}
        className="min-h-touch px-5 py-3.5 rounded-2xl bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 font-semibold text-sm transition flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <RotateCcw className="w-4 h-4" />
        <span>{t('btn_start_over')}</span>
      </button>
    </div>
  );
};
