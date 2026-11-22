// HtetLingo Multilingual Speech Engine
// Handles Text-to-Speech (TTS) pronunciation and Speech Recognition (STT)

class HtetSpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.rate = 1.0;
    this.pitch = 1.0;
    this.isListening = false;
    this.recognition = null;

    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }

    this.initRecognition();
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  getBestVoice(langCode) {
    if (!this.voices.length) this.loadVoices();

    const langMap = {
      en: ['en-US', 'en-GB', 'en'],
      ja: ['ja-JP', 'ja'],
      zh: ['zh-CN', 'zh-HK', 'zh-TW', 'zh'],
      th: ['th-TH', 'th'],
      fr: ['fr-FR', 'fr'],
      de: ['de-DE', 'de'],
      ko: ['ko-KR', 'ko'],
      my: ['my-MM', 'my']
    };

    const targetPrefixes = langMap[langCode] || [langCode];

    for (const prefix of targetPrefixes) {
      const match = this.voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(prefix.toLowerCase()));
      if (match) return match;
    }
    return null;
  }

  speak(text, langCode = 'en', customRate = null) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Cancel ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = customRate || this.rate;
    utterance.pitch = this.pitch;

    const voice = this.getBestVoice(langCode);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      // Set lang attribute directly
      const bcpMap = {
        en: 'en-US', ja: 'ja-JP', zh: 'zh-CN', th: 'th-TH',
        fr: 'fr-FR', de: 'de-DE', ko: 'ko-KR', my: 'my-MM'
      };
      utterance.lang = bcpMap[langCode] || langCode;
    }

    this.synth.speak(utterance);
    return utterance;
  }

  setRate(rate) {
    this.rate = parseFloat(rate);
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  listen(langCode, onResult, onError) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return;
    }

    const bcpMap = {
      en: 'en-US', ja: 'ja-JP', zh: 'zh-CN', th: 'th-TH',
      fr: 'fr-FR', de: 'de-DE', ko: 'ko-KR'
    };
    this.recognition.lang = bcpMap[langCode] || 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      if (onResult) onResult(transcript, confidence);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('Speech recognition start failed:', e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

window.htetSpeech = new HtetSpeechEngine();
