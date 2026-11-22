// ==========================================================================
// HtetLingo Grapheme POS Analyzer (Derived from rossettistone/grapheme & Penn Treebank)
// Real-time Part-of-Speech Tagging, Syntactic Color Tokenizer & Myanmar Translation
// ==========================================================================

class HtetPOSAnalyzer {
  constructor() {
    this.posMap = {};
    this.isLoaded = false;

    this.categoryInfo = {
      noun: { label: 'Noun', my: 'နာမ်', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)' },
      verb: { label: 'Verb', my: 'ကြိယာ', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' },
      adjective: { label: 'Adjective', my: 'နာမဝိသေသန', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
      adverb: { label: 'Adverb', my: 'ကြိယာဝိသေသန', color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)' },
      pronoun: { label: 'Pronoun', my: 'နာမ်စား', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)' },
      preposition: { label: 'Preposition', my: 'ဝိဘတ် / ရှေ့ဆက်', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)' },
      conjunction: { label: 'Conjunction', my: 'စကားစပ်', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
      determiner: { label: 'Determiner', my: 'ညွှန်းပုဒ်', color: '#64748b', bg: 'rgba(100, 116, 139, 0.12)' },
      interjection: { label: 'Interjection', my: 'အာမေဍိတ်', color: '#eab308', bg: 'rgba(234, 179, 8, 0.12)' },
      punctuation: { label: 'Punctuation', my: 'ပုဒ်ဖြတ်ပုဒ်ရပ်', color: '#94a3b8', bg: 'transparent' }
    };

    // Closed-class fallback mappings
    this.closedClass = {
      // Determiners
      'the': 'DT', 'a': 'DT', 'an': 'DT', 'this': 'DT', 'that': 'DT', 'these': 'DT', 'those': 'DT', 'each': 'DT', 'every': 'DT',
      // Pronouns
      'i': 'PRP', 'you': 'PRP', 'he': 'PRP', 'she': 'PRP', 'it': 'PRP', 'we': 'PRP', 'they': 'PRP',
      'me': 'PRP', 'him': 'PRP', 'her': 'PRP', 'us': 'PRP', 'them': 'PRP',
      'my': 'PRP$', 'your': 'PRP$', 'his': 'PRP$', 'her': 'PRP$', 'its': 'PRP$', 'our': 'PRP$', 'their': 'PRP$',
      'mine': 'PRP', 'yours': 'PRP', 'hers': 'PRP', 'ours': 'PRP', 'theirs': 'PRP',
      'who': 'WP', 'whom': 'WP', 'whose': 'WP$', 'which': 'WDT', 'what': 'WP',
      // Prepositions
      'in': 'IN', 'on': 'IN', 'at': 'IN', 'to': 'TO', 'for': 'IN', 'with': 'IN', 'by': 'IN', 'from': 'IN', 'of': 'IN',
      'about': 'IN', 'into': 'IN', 'through': 'IN', 'during': 'IN', 'before': 'IN', 'after': 'IN', 'above': 'IN',
      'below': 'IN', 'between': 'IN', 'under': 'IN', 'since': 'IN', 'without': 'IN', 'within': 'IN',
      // Conjunctions
      'and': 'CC', 'but': 'CC', 'or': 'CC', 'so': 'CC', 'yet': 'CC', 'for': 'CC', 'nor': 'CC',
      'because': 'IN', 'although': 'IN', 'though': 'IN', 'while': 'IN', 'if': 'IN', 'unless': 'IN',
      // Auxiliary & Modal Verbs
      'is': 'VBZ', 'am': 'VBP', 'are': 'VBP', 'was': 'VBD', 'were': 'VBD', 'be': 'VB', 'been': 'VBN', 'being': 'VBG',
      'have': 'VBP', 'has': 'VBZ', 'had': 'VBD', 'having': 'VBG',
      'do': 'VBP', 'does': 'VBZ', 'did': 'VBD',
      'can': 'MD', 'could': 'MD', 'may': 'MD', 'might': 'MD', 'will': 'MD', 'would': 'MD', 'shall': 'MD', 'should': 'MD', 'must': 'MD',
      // Common Adverbs
      'not': 'RB', 'always': 'RB', 'never': 'RB', 'often': 'RB', 'sometimes': 'RB', 'usually': 'RB', 'rarely': 'RB',
      'very': 'RB', 'quite': 'RB', 'really': 'RB', 'too': 'RB', 'well': 'RB', 'fast': 'RB'
    };
  }

  setLexicon(data) {
    if (data && typeof data === 'object') {
      this.posMap = data;
      this.isLoaded = true;
    }
  }

  tagToCategory(tag) {
    if (!tag) return 'noun';
    const t = String(tag).toUpperCase();

    if (['NN', 'NNS', 'NNP', 'NNPS', 'CD'].includes(t)) return 'noun';
    if (['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'MD'].includes(t)) return 'verb';
    if (['JJ', 'JJR', 'JJS'].includes(t)) return 'adjective';
    if (['RB', 'RBR', 'RBS', 'WRB'].includes(t)) return 'adverb';
    if (['PRP', 'PRP$', 'WP', 'WP$'].includes(t)) return 'pronoun';
    if (['IN', 'TO'].includes(t)) return 'preposition';
    if (['CC'].includes(t)) return 'conjunction';
    if (['DT', 'PDT', 'WDT'].includes(t)) return 'determiner';
    if (['UH'].includes(t)) return 'interjection';

    return 'noun';
  }

  tokenize(text) {
    if (!text) return [];
    // Split keeping words, punctuation and whitespace
    const regex = /([a-zA-Z0-9'-]+|[.,!?;:()"]|\s+)/g;
    const rawTokens = text.match(regex) || [];
    return rawTokens.filter(t => t.trim().length > 0);
  }

  tagWord(word, index = 0) {
    if (!word) return { tag: 'NN', category: 'noun' };
    const clean = word.toLowerCase().replace(/[^a-z0-9'-]/g, '');

    // 1. Check punctuation
    if (/^[.,!?;:()"]+$/.test(word)) {
      return { tag: '.', category: 'punctuation' };
    }

    // 2. Check numerals
    if (/^\d+(\.\d+)?$/.test(clean)) {
      return { tag: 'CD', category: 'noun' };
    }

    // 3. Closed-class words
    if (this.closedClass[clean]) {
      const tag = this.closedClass[clean];
      return { tag, category: this.tagToCategory(tag) };
    }

    // 4. Lexicon lookup
    if (this.posMap && this.posMap[clean]) {
      const tag = this.posMap[clean];
      return { tag, category: this.tagToCategory(tag) };
    }

    // 5. Morphological heuristics (Eric Brill / Grapheme rules)
    if (clean.endsWith('ing')) return { tag: 'VBG', category: 'verb' };
    if (clean.endsWith('ed')) return { tag: 'VBD', category: 'verb' };
    if (clean.endsWith('ly')) return { tag: 'RB', category: 'adverb' };
    if (clean.endsWith('tion') || clean.endsWith('sion') || clean.endsWith('ment') || clean.endsWith('ness') || clean.endsWith('ity') || clean.endsWith('ship')) {
      return { tag: 'NN', category: 'noun' };
    }
    if (clean.endsWith('able') || clean.endsWith('ible') || clean.endsWith('ful') || clean.endsWith('less') || clean.endsWith('ous') || clean.endsWith('ive') || clean.endsWith('al')) {
      return { tag: 'JJ', category: 'adjective' };
    }

    // 6. Capitalized proper nouns (not at index 0)
    if (index > 0 && /^[A-Z][a-z]/.test(word)) {
      return { tag: 'NNP', category: 'noun' };
    }

    // 7. Default to Noun
    return { tag: 'NN', category: 'noun' };
  }

  analyzeSentence(sentence) {
    if (!sentence || !sentence.trim()) return [];
    const tokens = this.tokenize(sentence);

    return tokens.map((word, idx) => {
      const isPunct = /^[.,!?;:()"]+$/.test(word);
      const { tag, category } = isPunct ? { tag: '.', category: 'punctuation' } : this.tagWord(word, idx);
      const info = this.categoryInfo[category] || this.categoryInfo.noun;

      return {
        word,
        cleanWord: word.toLowerCase().replace(/[^a-z0-9'-]/g, ''),
        tag,
        category: info.label,
        categoryKey: category,
        categoryMy: info.my,
        color: info.color,
        bgColor: info.bg,
        isPunct
      };
    });
  }
}

// Global exports
if (typeof window !== 'undefined') {
  window.HtetPOSAnalyzer = HtetPOSAnalyzer;
  window.htetPOSAnalyzer = new HtetPOSAnalyzer();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HtetPOSAnalyzer, htetPOSAnalyzer: new HtetPOSAnalyzer() };
}
