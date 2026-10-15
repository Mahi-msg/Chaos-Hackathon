# 🌸 Sakhi Health Card (सखी हेल्थ कार्ड / ಸಖಿ ಹೆಲ್ತ್ ಕಾರ್ಡ್)

> **A supportive, mobile-first & desktop responsive PWA for women to understand everyday reproductive health symptoms, build PCOS awareness, and prepare visit-ready consultation cards for doctors.**

---

## 🌟 Overview & Purpose

Many women—especially in regional-language and low-literacy communities—face significant hesitation or confusion when explaining reproductive symptoms to clinicians. Conditions like **PCOS (Polycystic Ovary Syndrome)** often go undiagnosed for years due to a lack of awareness and fragmented symptom recall.

**Sakhi Health Card** is **NOT a chatbot** and **NEVER claims to diagnose**. Instead, it provides an intuitive, high-touch, icon-driven interface where a woman can tap through symptom cards, mark her period history on an interactive **Pace-style calendar**, complete a safety check, and receive a **visit-ready bilingual health summary** to show her doctor.

---

## 🚀 Quick Start (One Command Run)

```bash
# Install dependencies
npm install

# Start local development server (accessible on mobile & desktop)
npm run dev

# Run automated logic and i18n key-parity unit tests
npm test

# Build production bundle
npm run build
```

---

## ⚡ 30-Second Judge Walkthrough ("Try Demo Profile")

To inspect the full experience immediately:
1. Open the app (`http://localhost:5173`).
2. Tap the **"Try Demo Profile (PCOS Pattern)"** button in the top navigation bar or on the language screen.
3. The app instantly populates a sample pattern (irregular cycles spaced 42, 65, and 95 days apart, facial hair, persistent acne, and belly weight changes) and presents the **Visit-Ready Health Card** complete with cycle bar timeline, bilingual medical reference, PCOS awareness, and questions to ask the doctor.

---

## 📱 Mobile-First & Desktop Design

- **Mobile Viewport**: Tailored for single-thumb navigation, $\ge 48\text{px}$ high-contrast touch targets, rounded cards, tactile feedback, and minimal text density.
- **Desktop Viewport**: Responsive multi-column layout with generous spacing, side-by-side calendar and cycle analytics panel, and comfortable readable typography.
- **Pace-Style Period Calendar**:
  - Interactive monthly grid with previous/next month navigation.
  - Tap-to-mark period start days with soft rose circular indicators.
  - Automatic calculation of cycle gaps between consecutive periods.
  - Visual horizontal bar timeline showing normal (21–35 days), irregular, or long gaps ($90+$ days).
- **PWA & Offline Support**:
  - Web App Manifest (`manifest.json`) and Service Worker (`sw.js`).
  - Fully functional offline without internet access.

---

## 🌐 Regional Languages & i18n Parity

Sakhi Health Card supports three languages:
- **English** (`en`)
- **हिन्दी** (`hi` - Hindi)
- **ಕನ್ನಡ** (`kn` - Kannada)

### Localization Architecture:
- All strings are organized in single JSON files per language: `src/i18n/en.json`, `src/i18n/hi.json`, and `src/i18n/kn.json`.
- Strict automated unit test (`i18nParity.test.ts`) verifies **100% key parity** across all languages and fails the build if any key is missing or empty.
- Fonts bundled/loaded: **Noto Sans Devanagari** and **Noto Sans Kannada** to guarantee proper script rendering across mobile browsers, desktop displays, print PDFs, and exported images.
- **Bilingual Health Card**: Shows the user's chosen regional language alongside English for medical review, or English-only if English was selected.

---

## 🔊 Accessibility & Text-to-Speech (TTS)

- Every screen includes a prominent **Speaker Icon** that reads screen instructions aloud in the user's chosen language using the **Web Speech API** (`en-IN`, `hi-IN`, `kn-IN`).
- Individual symptom cards feature dedicated audio buttons so low-literacy users can listen to each symptom description before selecting.
- **Graceful Fallback**: If a device lacks regional voice synthesizers, a gentle notification banner is shown while keeping the high-contrast text fully visible.

---

## 🛡️ Safety Guardrails & Clinical Philosophy

| Principle | Implementation |
|---|---|
| **No Diagnostic Claims** | Sakhi Health Card **never** states "you have PCOS", calculates risk percentages, or outputs a diagnostic verdict. |
| **Suggestive & Awareness Framing** | Phrases findings neutrally: *"These signs share common features with Polycystic Ovary Syndrome (PCOS). Only a doctor can determine the cause."* |
| **PCOS Education & Awareness** | Dedicated plain-language module explaining what PCOS is, how common it is (1 in 5 women), and why early doctor consultation matters. |
| **No Medication Prescriptions** | Never recommends drugs, supplements, or dosages. Lifestyle habits are strictly generic (nutrition, gentle movement, sleep, tracking). |
| **Urgency Escalation** | 5 deterministic red flags (heavy bleeding soaking pads hourly, sudden severe pain, fainting with bleeding, pregnancy with pain, rapid voice/hair changes) trigger a high-visibility **Urgent Care Banner**. |
| **Care Routing** | Routes to **Gynecologist** as the primary specialist, and suggests an **Endocrinologist** if androgen or metabolic signs are prominent. |
| **Tests to Discuss** | Frames tests neutrally as *"Tests doctors commonly discuss"* (Pelvic Ultrasound, Hormone Panel, Thyroid TSH, Blood Sugar/HbA1c) noting that the physician decides what is needed. |
| **100% On-Device Privacy** | All health data is saved exclusively in browser `localStorage`. No analytics, no cookies, no cloud servers, and a permanent **"Delete My Data"** action. |

---

## 🧪 Logic Layer & Test Coverage

The deterministic rules engine is completely separated from the UI in `src/logic/healthCardLogic.ts` and tested with Vitest:

- `healthCardLogic.test.ts`:
  - Cycle spacing classification (regular 21–35 days, irregular variance $> 8$ days, long gaps $\ge 90$ days).
  - Theme clustering (cycle irregularity, excess androgen signs, metabolic signs).
  - Red-flag urgency elevation (`SEE_SOON` vs `ROUTINE`).
  - Specialist routing logic and doctor question generation.
- `i18nParity.test.ts`:
  - 100% key parity between English, Hindi, and Kannada.
  - Non-empty string validation.
  - Presence of clinical review notice comments.

Run tests anytime with:
```bash
npm test
```

---

## 🤖 Feature-Flagged LLM Stubs

In accordance with strict safety constraints, optional LLM features remain **off by default** behind an explicit toggle in the footer:
1. **Simplified Rewording**: Rephrases clinical terms into ultra-simple regional prose.
2. **30-Second Voice Input Simulation**: Simulates verbal symptom description in English, Hindi, or Kannada, extracting symptom cards back to the user for explicit confirmation or editing.
- *Strict Rule*: The LLM **never** decides clinical urgency, red flags, or care routing.

---

## ⚠️ Clinical Disclaimer & Limitations

> **NOTICE**: Sakhi Health Card is a prototype developed for awareness, patient education, and consultation preparation. It is **not** a diagnostic device, software-as-a-medical-device (SaMD), or substitute for professional medical advice.
> 
> **MANDATORY CLINICAL REVIEW**: The Hindi and Kannada translations and clinical guidance rules must be formally reviewed by qualified clinicians and native speakers before any deployment in real-world clinical or community healthcare settings.
