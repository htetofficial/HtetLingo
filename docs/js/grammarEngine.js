// ==========================================================================
// HtetLingo Typed English Grammar Engine (Derived from typedgrammar/typed-english)
// Type-Safe Orthographic Rules: Verb Conjugation, Pluralization, Comparison & SVO
// ==========================================================================

class HtetGrammarEngine {
  constructor() {
    // Irregular verb lookup table
    this.irregularVerbs = {
      'be': { third: 'is', past: 'was', participle: 'been', gerund: 'being' },
      'have': { third: 'has', past: 'had', participle: 'had', gerund: 'having' },
      'do': { third: 'does', past: 'did', participle: 'done', gerund: 'doing' },
      'go': { third: 'goes', past: 'went', participle: 'gone', gerund: 'going' },
      'say': { third: 'says', past: 'said', participle: 'said', gerund: 'saying' },
      'see': { third: 'sees', past: 'saw', participle: 'seen', gerund: 'seeing' },
      'come': { third: 'comes', past: 'came', participle: 'come', gerund: 'coming' },
      'take': { third: 'takes', past: 'took', participle: 'taken', gerund: 'taking' },
      'get': { third: 'gets', past: 'got', participle: 'gotten', gerund: 'getting' },
      'give': { third: 'gives', past: 'gave', participle: 'given', gerund: 'giving' },
      'make': { third: 'makes', past: 'made', participle: 'made', gerund: 'making' },
      'know': { third: 'knows', past: 'knew', participle: 'known', gerund: 'knowing' },
      'think': { third: 'thinks', past: 'thought', participle: 'thought', gerund: 'thinking' },
      'run': { third: 'runs', past: 'ran', participle: 'run', gerund: 'running' },
      'write': { third: 'writes', past: 'wrote', participle: 'written', gerund: 'writing' },
      'speak': { third: 'speaks', past: 'spoke', participle: 'spoken', gerund: 'speaking' },
      'understand': { third: 'understands', past: 'understood', participle: 'understood', gerund: 'understanding' },
      'lead': { third: 'leads', past: 'led', participle: 'led', gerund: 'leading' },
      'teach': { third: 'teaches', past: 'taught', participle: 'taught', gerund: 'teaching' },
      'sing': { third: 'sings', past: 'sang', participle: 'sung', gerund: 'singing' }
    };

    // Irregular nouns
    this.irregularNouns = {
      'woman': 'women',
      'man': 'men',
      'child': 'children',
      'person': 'people',
      'foot': 'feet',
      'tooth': 'teeth',
      'mouse': 'mice',
      'goose': 'geese',
      'ox': 'oxen',
      'crisis': 'crises',
      'focus': 'foci',
      'datum': 'data'
    };

    // Irregular Adjectives
    this.irregularAdjectives = {
      'good': { comp: 'better', sup: 'best' },
      'bad': { comp: 'worse', sup: 'worst' },
      'far': { comp: 'further', sup: 'furthest' },
      'little': { comp: 'less', sup: 'least' },
      'many': { comp: 'more', sup: 'most' },
      'much': { comp: 'more', sup: 'most' }
    };
  }

  isVowel(c) {
    return 'aeiouAEIOU'.includes(c);
  }

  conjugateVerb(rawVerb) {
    if (!rawVerb) return null;
    const v = rawVerb.trim().toLowerCase();

    // Check irregular
    if (this.irregularVerbs[v]) {
      const irr = this.irregularVerbs[v];
      return {
        base: v,
        thirdPerson: irr.third,
        past: irr.past,
        participle: irr.participle,
        gerund: irr.gerund,
        isRegular: false
      };
    }

    // Regular Third Person (-s, -es, -ies)
    let third = v + 's';
    if (/(s|sh|ch|x|z|o)$/.test(v)) {
      third = v + 'es';
    } else if (/[bcdfghjklmnpqrstvwxyz]y$/.test(v)) {
      third = v.slice(0, -1) + 'ies';
    }

    // Regular Past & Participle (-ed, -ied, doubled)
    const shouldDouble = (v.length <= 4 && !this.isVowel(v[v.length - 1]) && this.isVowel(v[v.length - 2]) && !this.isVowel(v[v.length - 3]) && !['w', 'x', 'y'].includes(v[v.length - 1])) || ['occur', 'refer', 'prefer', 'commit', 'admit', 'permit'].includes(v);

    let past = v + 'ed';
    if (v.endsWith('e')) {
      past = v + 'd';
    } else if (/[bcdfghjklmnpqrstvwxyz]y$/.test(v)) {
      past = v.slice(0, -1) + 'ied';
    } else if (shouldDouble) {
      past = v + v[v.length - 1] + 'ed';
    }

    // Regular Gerund (-ing)
    let gerund = v + 'ing';
    if (v.endsWith('ie')) {
      gerund = v.slice(0, -2) + 'ying';
    } else if (v.endsWith('e') && !v.endsWith('ee')) {
      gerund = v.slice(0, -1) + 'ing';
    } else if (shouldDouble) {
      gerund = v + v[v.length - 1] + 'ing';
    }

    return {
      base: v,
      thirdPerson: third,
      past,
      participle: past,
      gerund,
      isRegular: true
    };
  }

  pluralizeNoun(rawNoun) {
    if (!rawNoun) return '';
    const n = rawNoun.trim().toLowerCase();

    if (this.irregularNouns[n]) {
      return this.irregularNouns[n];
    }

    if (/(s|sh|ch|x|z)$/.test(n)) {
      return n + 'es';
    }
    if (/[bcdfghjklmnpqrstvwxyz]y$/.test(n)) {
      return n.slice(0, -1) + 'ies';
    }
    if (/(fe|f)$/.test(n) && !['roof', 'chief', 'cliff'].includes(n)) {
      return n.replace(/(fe|f)$/, 'ves');
    }

    return n + 's';
  }

  compareAdjective(rawAdj) {
    if (!rawAdj) return null;
    const a = rawAdj.trim().toLowerCase();

    if (this.irregularAdjectives[a]) {
      return { positive: a, comparative: this.irregularAdjectives[a].comp, superlative: this.irregularAdjectives[a].sup };
    }

    // 1-syllable or -y ending
    if (a.length <= 4 || a.endsWith('y')) {
      let comp = a + 'er';
      let sup = a + 'est';
      if (a.endsWith('e')) {
        comp = a + 'r';
        sup = a + 'st';
      } else if (a.endsWith('y')) {
        comp = a.slice(0, -1) + 'ier';
        sup = a.slice(0, -1) + 'iest';
      }
      return { positive: a, comparative: comp, superlative: sup };
    }

    // Multi-syllable: more / most
    return {
      positive: a,
      comparative: 'more ' + a,
      superlative: 'most ' + a
    };
  }

  adverbialize(rawAdj) {
    if (!rawAdj) return '';
    const a = rawAdj.trim().toLowerCase();
    if (a === 'good') return 'well';
    if (a === 'fast') return 'fast';
    if (a === 'hard') return 'hard';
    if (a.endsWith('y')) return a.slice(0, -1) + 'ily';
    if (a.endsWith('ic')) return a + 'ally';
    if (a.endsWith('le')) return a.slice(0, -1) + 'y';
    return a + 'ly';
  }

  validateSubjectVerbAgreement(subject, verb) {
    if (!subject || !verb) return { isValid: false, message: 'Missing subject or verb' };
    const s = subject.trim().toLowerCase();
    const isThirdPersonSingular = ['he', 'she', 'it'].includes(s) || (!s.endsWith('s') && !['i', 'you', 'we', 'they'].includes(s));
    const conj = this.conjugateVerb(verb);

    return {
      subject: s,
      isThirdPersonSingular,
      expectedPresentVerb: isThirdPersonSingular ? conj.thirdPerson : conj.base,
      conjugation: conj
    };
  }
}

// Global exports
if (typeof window !== 'undefined') {
  window.HtetGrammarEngine = HtetGrammarEngine;
  window.htetGrammarEngine = new HtetGrammarEngine();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HtetGrammarEngine, htetGrammarEngine: new HtetGrammarEngine() };
}
