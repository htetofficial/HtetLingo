// ==========================================================================
// HtetLingo High-Accuracy Multilingual Search Engine (v2.4.0)
// Features: Multi-tiered Relevance Scoring, Safe Highlight Matching,
// Bilingual (English <-> Myanmar), Max Mapper Common Errors Detection,
// Myanmar Female Names & 21,000+ EMDictionary Lexical Entries.
// ==========================================================================

class HtetSearchEngine {
  constructor() {
    this.lexicon = [];
    this.femaleNames = [];
    this.commonErrors = null;
    this.isLoaded = false;
  }

  setDatasets({ lexicon, femaleNames, commonErrors }) {
    if (lexicon && Array.isArray(lexicon)) this.lexicon = lexicon;
    if (femaleNames && Array.isArray(femaleNames)) this.femaleNames = femaleNames;
    if (commonErrors) this.commonErrors = commonErrors;
    this.isLoaded = true;
  }

  static search(arg1, arg2, arg3) {
    const instance = (typeof window !== 'undefined' && window.htetSearchEngine) ? window.htetSearchEngine : (HtetSearchEngine._defaultInstance || (HtetSearchEngine._defaultInstance = new HtetSearchEngine()));
    return instance.search(arg1, arg2, arg3);
  }

  isMyanmarText(str) {
    return /[\u1000-\u109F]/.test(str);
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  highlightMatch(text, query) {
    if (!text || !query) return text || '';
    try {
      const escaped = this.escapeRegExp(query.trim());
      if (!escaped) return text;
      const regex = new RegExp(`(${escaped})`, 'gi');
      return String(text).replace(regex, '<mark class="hl-match">$1</mark>');
    } catch (e) {
      return text || '';
    }
  }

  search(arg1, arg2, arg3) {
    let rawQuery = '';
    let filter = 'all';
    let limit = 30;

    if (Array.isArray(arg1)) {
      this.lexicon = arg1;
      rawQuery = arg2 || '';
      const opts = arg3 || {};
      if (opts.femaleNames && Array.isArray(opts.femaleNames)) {
        this.femaleNames = opts.femaleNames;
      }
      if (opts.commonErrors) {
        this.commonErrors = opts.commonErrors;
      }
      limit = typeof opts.limit === 'number' ? opts.limit : 30;
      filter = opts.filter || 'all';
    } else {
      rawQuery = arg1 || '';
      filter = typeof arg2 === 'string' ? arg2 : 'all';
      limit = typeof arg3 === 'number' ? arg3 : (arg2?.limit || 30);
    }

    if (!rawQuery) return [];
    const q = String(rawQuery).trim();
    if (!q) return [];

    const isMm = this.isMyanmarText(q);
    const qLower = q.toLowerCase();
    const scoredResults = [];

    // ------------------------------------------------------------------------
    // 0. Max Mapper Common English Errors Detection (High Priority Alert)
    // ------------------------------------------------------------------------
    if (this.commonErrors && !isMm) {
      const misusedWords = this.commonErrors.misusedWords || {};
      const misusedPhrases = this.commonErrors.misusedPhrases || {};

      let correction = null;
      let errType = 'misused_word';

      if (misusedWords[qLower]) {
        correction = misusedWords[qLower];
      } else if (misusedPhrases[qLower]) {
        correction = misusedPhrases[qLower];
        errType = 'misused_phrase';
      }

      if (correction) {
        scoredResults.push({
          type: 'common_error',
          badge: '⚠️ Common English Error',
          badgeColor: '#f97316',
          word: correction,
          title: `${q} ➔ ${correction}`,
          displayWord: `<span style="text-decoration: line-through; color: #dc2626;">${q}</span> ➔ <span style="color: #10b981; font-weight: 900;">${correction}</span>`,
          phonetic: '/kəˈrekʃn/',
          pos: 'error check',
          meaning: `⚠️ သတိပြုရန် အင်္ဂလိပ်စာအမှား! မှန်ကန်သော အသုံးမှာ "${correction}" ဖြစ်ပါသည်။`,
          definition: `Max Mapper Common English Errors Dataset: "${q}" is commonly misused instead of "${correction}".`,
          score: 1500, // Top priority
          matchField: 'common_error'
        });
      }
    }

    // ------------------------------------------------------------------------
    // 1. EMDictionary Lexicon Search (21,052 words)
    // ------------------------------------------------------------------------
    if (this.lexicon && this.lexicon.length) {
      for (let i = 0; i < this.lexicon.length; i++) {
        const item = this.lexicon[i];
        if (!item || !item.w) continue;

        const wLower = String(item.w).toLowerCase();
        const meaningText = item.m || '';
        const defText = item.d || meaningText;
        let score = 0;
        let matchField = '';

        if (!isMm) {
          // English Query
          if (wLower === qLower) {
            score = 1000; // Exact match
            matchField = 'word_exact';
          } else if (wLower.startsWith(qLower)) {
            score = 700 - Math.min(200, (wLower.length - qLower.length) * 5);
            matchField = 'word_prefix';
          } else if (wLower.includes(qLower)) {
            score = 300 - Math.min(100, wLower.length);
            matchField = 'word_contains';
          } else if (defText && defText.toLowerCase().includes(qLower)) {
            score = 100;
            matchField = 'def_contains';
          }
        } else {
          // Burmese Query
          if (meaningText && meaningText.includes(q)) {
            if (meaningText.startsWith(q)) {
              score = 800;
              matchField = 'my_prefix';
            } else {
              score = 600;
              matchField = 'my_contains';
            }
          } else if (defText && defText.includes(q)) {
            score = 250;
            matchField = 'def_my_contains';
          }
        }

        if (score > 0) {
          scoredResults.push({
            type: 'em',
            badge: 'EMDictionary',
            badgeColor: 'var(--rose-primary)',
            word: item.w,
            title: item.w,
            displayWord: this.highlightMatch(item.w, q),
            phonetic: item.p || '',
            pos: item.pos || '',
            meaning: this.highlightMatch(meaningText, q),
            definition: defText,
            score,
            matchField
          });
        }
      }
    }

    // ------------------------------------------------------------------------
    // 2. Myanmar Female Names Search (2,304 names)
    // ------------------------------------------------------------------------
    if (this.femaleNames && this.femaleNames.length) {
      for (let i = 0; i < this.femaleNames.length; i++) {
        const item = this.femaleNames[i];
        if (!item || !item.mm) continue;

        let score = 0;
        if (isMm) {
          if (item.mm === q) score = 950;
          else if (item.mm.startsWith(q)) score = 750;
          else if (item.mm.includes(q)) score = 450;
        } else {
          const enLower = String(item.en || '').toLowerCase();
          if (enLower === qLower) score = 950;
          else if (enLower.startsWith(qLower)) score = 720;
          else if (enLower.includes(qLower)) score = 420;
        }

        if (score > 0) {
          scoredResults.push({
            type: 'female_name',
            badge: 'Female Name',
            badgeColor: '#ec4899',
            word: item.en || item.mm,
            title: item.mm,
            displayWord: `${this.highlightMatch(item.mm, q)} <span style="font-size: 0.85rem; color: var(--lavender); font-weight: normal;">(${this.highlightMatch(item.en || '', q)})</span>`,
            phonetic: item.en || '',
            pos: 'name',
            meaning: `မြန်မာ့ရိုးရာ အမျိုးသမီးအမည် • အင်္ဂလိပ်အသံထွက်: ${item.en || ''}`,
            definition: `${item.mm} (${item.en}) — Authentic Myanmar Female Name.`,
            score,
            matchField: 'female_name'
          });
        }
      }
    }

    // Sort descending by score, tie-break by shorter title
    scoredResults.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.title || '').length - (b.title || '').length;
    });

    return scoredResults.slice(0, limit);
  }
}

// Global exports for both class and singleton
if (typeof window !== 'undefined') {
  window.HtetSearchEngine = HtetSearchEngine;
  window.htetSearchEngine = new HtetSearchEngine();
}
if (typeof module !== 'undefined' && module.exports) {
  const engine = new HtetSearchEngine();
  module.exports = { HtetSearchEngine, htetSearchEngine: engine };
}
