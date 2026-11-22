// HtetLingo High-Accuracy Multilingual Search Engine
// Precision ranking: Exact Match -> Prefix Match -> Burmese Keyword -> Definition
// Highlights matching query tokens and handles bilingual queries

class HtetSearchEngine {
  constructor() {
    this.lexicon = [];
    this.femaleNames = [];
    this.englishToEnglish = {};
    this.karenWords = [];
    this.isLoaded = false;
  }

  setDatasets({ lexicon, femaleNames, englishToEnglish, karenWords }) {
    if (lexicon) this.lexicon = lexicon;
    if (femaleNames) this.femaleNames = femaleNames;
    if (englishToEnglish) this.englishToEnglish = englishToEnglish;
    if (karenWords) this.karenWords = karenWords;
    this.isLoaded = true;
  }

  isMyanmarText(str) {
    return /[\u1000-\u109F]/.test(str);
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  highlightMatch(text, query) {
    if (!text || !query) return text;
    const escaped = this.escapeRegExp(query);
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark class="hl-match">$1</mark>');
  }

  search(rawQuery, filter = 'all', limit = 30) {
    const q = rawQuery.trim();
    if (!q) return [];

    const isMm = this.isMyanmarText(q);
    const qLower = q.toLowerCase();
    const scoredResults = [];

    // 1. Search in EMDictionary Lexicon (21,052 words)
    if (filter === 'all' || filter === 'em' || filter === 'en_my') {
      for (let i = 0; i < this.lexicon.length; i++) {
        const item = this.lexicon[i];
        const wLower = item.w.toLowerCase();
        let score = 0;
        let matchField = '';

        if (!isMm) {
          // English search query
          if (wLower === qLower) {
            score = 1000; // Perfect exact match
            matchField = 'word';
          } else if (wLower.startsWith(qLower)) {
            score = 700 - Math.min(200, (wLower.length - qLower.length) * 5); // Prefix match, shorter is better
            matchField = 'word_prefix';
          } else if (wLower.includes(qLower)) {
            score = 300 - Math.min(100, wLower.length);
            matchField = 'word_contains';
          } else if (item.d.toLowerCase().includes(qLower)) {
            score = 100;
            matchField = 'def_contains';
          }
        } else {
          // Burmese search query
          if (item.m && item.m.includes(q)) {
            if (item.m.startsWith(q)) {
              score = 800;
              matchField = 'my_prefix';
            } else {
              score = 600;
              matchField = 'my_contains';
            }
          } else if (item.d.includes(q)) {
            score = 250;
            matchField = 'def_my_contains';
          }
        }

        if (score > 0) {
          scoredResults.push({
            type: 'em',
            badge: 'EMDictionary',
            badgeColor: 'var(--rose-primary)',
            title: item.w,
            phonetic: item.p,
            pos: item.pos,
            meaning: item.m,
            definition: item.d,
            score,
            matchField
          });
        }
      }
    }

    // 2. Search in Myanmar Female Names (2,304 names)
    if (filter === 'all' || filter === 'names') {
      for (let i = 0; i < this.femaleNames.length; i++) {
        const item = this.femaleNames[i];
        let score = 0;

        if (isMm) {
          if (item.mm === q) score = 950;
          else if (item.mm.startsWith(q)) score = 750;
          else if (item.mm.includes(q)) score = 450;
        } else {
          const enLower = item.en.toLowerCase();
          if (enLower === qLower) score = 950;
          else if (enLower.startsWith(qLower)) score = 720;
          else if (enLower.includes(qLower)) score = 420;
        }

        if (score > 0) {
          scoredResults.push({
            type: 'female_name',
            badge: 'Female Name',
            badgeColor: '#ec4899',
            title: item.mm,
            subtitle: item.en,
            meaning: `Authentic Myanmar Female Name • Transliteration: ${item.en}`,
            definition: `${item.mm} (${item.en}) — Cultural female name from Myanmar Names Repository.`,
            score,
            matchField: 'female_name'
          });
        }
      }
    }

    // 3. Search in English Monolingual Dictionary
    if ((filter === 'all' || filter === 'eng_eng') && !isMm && this.englishToEnglish) {
      const keys = Object.keys(this.englishToEnglish);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const kLower = k.toLowerCase();
        let score = 0;

        if (kLower === qLower) score = 850;
        else if (kLower.startsWith(qLower)) score = 550 - Math.min(150, (kLower.length - qLower.length) * 4);
        else if (kLower.includes(qLower)) score = 200;

        if (score > 0) {
          scoredResults.push({
            type: 'eng_eng',
            badge: 'LexiVerse Monolingual',
            badgeColor: '#8b5cf6',
            title: k,
            meaning: this.englishToEnglish[k],
            definition: this.englishToEnglish[k],
            score,
            matchField: 'eng_eng'
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

window.htetSearchEngine = new HtetSearchEngine();
