import { LanguageCode, SelectedSymptom } from '../logic/types';

/**
 * Mock LLM service (Strictly behind feature flag, off by default).
 * Complies strictly with safety rules:
 * - NEVER determines urgency or care routing.
 * - Only used for (a) rewording explanation simply, and (b) voice input simulation.
 * - Completely offline stubs.
 */

export interface VoiceExtractionResult {
  transcript: string;
  suggestedSymptoms: SelectedSymptom[];
}

export async function rewordExplanation(
  _originalText: string,
  lang: LanguageCode
): Promise<string> {
  // Simulated small delay
  await new Promise((resolve) => setTimeout(resolve, 350));

  switch (lang) {
    case 'hi':
      return 'सरल शब्दों में: ये संकेत हार्मोनल असंतुलन (जैसे पीसीओएस या थायरॉयड) या दैनिक तनाव में देखे जाते हैं। सही जांच केवल डॉक्टर ही कर सकते हैं।';
    case 'kn':
      return 'ಸರಳವಾಗಿ ಹೇಳುವುದಾದರೆ: ಈ ಲಕ್ಷಣಗಳು ಹಾರ್ಮೋನ್ ಏರುಪೇರು (ಉದಾಹರಣೆಗೆ PCOS ಅಥವಾ ಥೈರಾಯ್ಡ್) ಅಥವಾ ಒತ್ತಡದಲ್ಲಿ ಕಂಡುಬರುತ್ತವೆ. ಸರಿಯಾದ ಕಾರಣವನ್ನು ವೈದ್ಯರು ಮಾತ್ರ ತಿಳಿಸಬಲ್ಲರು.';
    case 'en':
    default:
      return 'In simple terms: these signs are often seen when hormones fluctuate (such as in PCOS or thyroid), or during stressful periods. Only a medical doctor can check and confirm.';
  }
}

export async function simulateVoiceSymptomExtraction(
  lang: LanguageCode
): Promise<VoiceExtractionResult> {
  // Simulate 1.2s processing delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (lang === 'hi') {
    return {
      transcript: 'मुझे पिछले 6 महीने से पीरियड्स देर से आ रहे हैं और चेहरे पर थोड़े बाल दिख रहे हैं...',
      suggestedSymptoms: [
        { id: 'irregular_periods', duration: '3_to_12_months' },
        { id: 'extra_hair', duration: '3_to_12_months' },
      ],
    };
  }

  if (lang === 'kn') {
    return {
      transcript: 'ಕಳೆದ ಕೆಲವು ತಿಂಗಳುಗಳಿಂದ ನನಗೆ ಮುಟ್ಟು ತಡವಾಗಿ ಬರುತ್ತಿದೆ ಮತ್ತು ಮುಖದಲ್ಲಿ ಕೂದಲು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...',
      suggestedSymptoms: [
        { id: 'irregular_periods', duration: '3_to_12_months' },
        { id: 'extra_hair', duration: '3_to_12_months' },
      ],
    };
  }

  return {
    transcript: 'My periods have been delayed for about 6 months now, and I have noticed some chin hair and breakouts...',
    suggestedSymptoms: [
      { id: 'irregular_periods', duration: '3_to_12_months' },
      { id: 'extra_hair', duration: '3_to_12_months' },
      { id: 'acne', duration: '3_to_12_months' },
    ],
  };
}
