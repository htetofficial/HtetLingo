// ==========================================================================
// HtetLingo Interactive Multilingual Platform (v2.4.0)
// Integrated English Grammar Handbook (旋元佑 25-Chapter System)
// Complete Auth (Supabase), Vocabulary Learning Studio (SRS, Flashcards,
// Speed Match, Word Bank), Smart Search, and Learning Roadmap.
// Designed with love by Htet for learners & polyglots worldwide. 🌸
// ==========================================================================

class HtetLingoApp {
  constructor() {
    this.currentTab = 'learn';
    this.targetLang = localStorage.getItem('htetlingo_target_lang') || 'ja';
    this.nativeLang = localStorage.getItem('htetlingo_native_lang') || 'my';

    // Original HtetLingo Metrics
    this.streak = parseInt(localStorage.getItem('htetlingo_streak') || '5', 10);
    this.xp = parseInt(localStorage.getItem('htetlingo_xp') || '150', 10);
    this.energy = parseInt(localStorage.getItem('htetlingo_energy') || '100', 10);
    this.gems = parseInt(localStorage.getItem('htetlingo_gems') || '120', 10);
    this.completedLevels = JSON.parse(localStorage.getItem('htetlingo_completed_levels') || '["ja_u1_l1"]');
    this.completedGrammarQuizzes = JSON.parse(localStorage.getItem('htetlingo_grammar_quizzes') || '[]');

    // Auth State
    this.currentUser = window.htetSupabase?.getCurrentUser() || null;

    // Roadmap Lesson State
    this.activeLesson = null;
    this.questionIndex = 0;
    this.selectedChoice = null;
    this.placedWords = [];
    this.selectedMatchA = null;
    this.selectedMatchB = null;
    this.matchedPairs = [];
    this.isAnswerChecked = false;
    this.isAnswerCorrect = false;

    // Vocabulary Learning Studio State
    this.vocabDeck = 'feminism'; // 'feminism', 'grammar_book', 'em_verbs', 'em_adjectives', 'heritage_names', 'daily_life', 'karen', 'bookmarks'
    this.vocabMode = 'flashcards'; // 'flashcards', 'match', 'explorer'
    this.vocabCardIndex = 0;
    this.isVocabCardFlipped = false;
    this.vocabSearchQuery = '';
    this.vocabMatchPairs = [];
    this.vocabSelectedA = null;
    this.vocabSelectedB = null;
    this.vocabMatchedIds = [];

    // English Grammar Handbook State (旋元佑 25 Chapters)
    this.grammarChapters = [];
    this.grammarCategory = 'all'; // 'all', 'foundation', 'verbs_tenses', 'clauses_syntax'
    this.grammarSearchQuery = '';
    this.activeGrammarChapterId = null;

    // Search Engine & Datasets State
    this.dictTab = 'all';
    this.lexiconData = [];
    this.femaleNamesData = [];
    this.commonErrorsData = null;
    this.engEngData = {};
    this.karenData = [];
    this.bookmarks = [];

    // Pre-curated Decks
    this.initDecks();
    this.loadDatasets();
    this.init();
  }

  initDecks() {
    this.decks = {
      feminism: {
        id: 'feminism',
        title: '🌸 Feminism & Sisterhood',
        titleMy: 'အမျိုးသမီးစွမ်းဆောင်ရည်နှင့် တန်းတူညီမျှရေး',
        badge: 'Core',
        items: [] // populated from HTET_DATA.vocabulary
      },
      grammar_book: {
        id: 'grammar_book',
        title: '📘 Grammar Masterclass (25 Ch)',
        titleMy: '旋元佑 အဆင့်မြင့် အင်္ဂလိပ်သဒ္ဒါ လက်စွဲ (၂၅ ခန်း)',
        badge: '旋元佑',
        items: [] // populated from grammar_handbook.json
      },
      em_verbs: {
        id: 'em_verbs',
        title: '⚡ Essential Verbs',
        titleMy: 'EMDictionary အရေးပါသော ကြိယာများ',
        badge: 'EMDict',
        items: [
          { word: 'learn', phonetic: '/lɜːn/', pos: 'v', my: 'သင်ယူသည်။ လေ့လာသည်။', example: 'She is eager to learn new languages.', ja: '学ぶ (まなぶ)', zh: '学习 (Xuéxí)' },
          { word: 'speak', phonetic: '/spiːk/', pos: 'v', my: 'ပြောဆိုသည်။ စကားပြောသည်။', example: 'Speak your truth with courage and clarity.', ja: '話す (はなす)', zh: '说 (Shuō)' },
          { word: 'achieve', phonetic: '/əˈtʃiːv/', pos: 'v', my: 'အောင်မြင်စွာ ဆောင်ရွက်နိုင်သည်။', example: 'Women achieve remarkable milestones every day.', ja: '達成する (たっせいする)', zh: '实现 (Shíxiàn)' },
          { word: 'empower', phonetic: '/ɪmˈpaʊər/', pos: 'v', my: 'လုပ်ပိုင်ခွင့်ပေးသည်။ စွမ်းရည်မြှင့်တင်ပေးသည်။', example: 'Knowledge empowers every individual.', ja: '力を与える (ちからをあたえる)', zh: '赋能 (Fùnéng)' },
          { word: 'support', phonetic: '/səˈpɔːt/', pos: 'v', my: 'ထောက်ပံ့သည်။ အားပေးကူညီသည်။', example: 'Sisters support each other through every step.', ja: '支える (ささえる)', zh: '支持 (Zhīchí)' },
          { word: 'inspire', phonetic: '/ɪnˈspaɪər/', pos: 'v', my: 'စိတ်ဓာတ်တက်ကြွစေသည်။ အားကျဖွယ်ဖြစ်စေသည်။', example: 'Her courage inspires generations of women.', ja: '鼓舞する (こぶする)', zh: '激励 (Jīlì)' },
          { word: 'create', phonetic: '/kriˈeɪt/', pos: 'v', my: 'ဖန်တီးသည်။ တီထွင်သည်။', example: 'She creates opportunities where none existed.', ja: '創る (つくる)', zh: '创造 (Chuàngzào)' },
          { word: 'succeed', phonetic: '/səkˈsiːd/', pos: 'v', my: 'အောင်မြင်သည်။ ဖြစ်မြောက်သည်။', example: 'With determination, we will succeed.', ja: '成功する (せいこうする)', zh: '成功 (Chénggōng)' },
          { word: 'protect', phonetic: '/prəˈtekt/', pos: 'v', my: 'ကာကွယ်စောင့်ရှောက်သည်။', example: 'Laws must protect human rights and dignity.', ja: '守る (まもる)', zh: '保护 (Bǎohù)' },
          { word: 'encourage', phonetic: '/ɪnˈkʌrɪdʒ/', pos: 'v', my: 'အားပေးသည်။ သွေးထိုးလှုံ့ဆော်သည်။', example: 'Teachers encourage students to reach their potential.', ja: '励ます (はげます)', zh: '鼓励 (Gǔlì)' },
          { word: 'persevere', phonetic: '/ˌpɜːsɪˈvɪər/', pos: 'v', my: 'ဇွဲရှိရှိကြိုးစားသည်။ မလျှော့သောဇွဲဖြင့်လုပ်သည်။', example: 'Persevere through difficulties to reach your dreams.', ja: '耐え抜く (たえぬく)', zh: '坚持 (Jiānchí)' },
          { word: 'strengthen', phonetic: '/ˈstreŋθn/', pos: 'v', my: 'သန်မာစေသည်။ ပိုမိုခိုင်မာစေသည်။', example: 'Unity strengthens our community.', ja: '強化する (きょうかする)', zh: '加强 (Jiāqiáng)' }
        ]
      },
      em_adjectives: {
        id: 'em_adjectives',
        title: '✨ Descriptive Adjectives',
        titleMy: 'EMDictionary စွမ်းရည်ဖော်ပြ နာမဝိသေသနများ',
        badge: 'EMDict',
        items: [
          { word: 'courageous', phonetic: '/kəˈreɪdʒəs/', pos: 'adj', my: 'ရဲရင့်သော။ သတ္တိရှိသော။', example: 'A courageous voice can change the entire world.', ja: '勇敢な (ゆうかんな)', zh: '勇敢的 (Yǒnggǎn de)' },
          { word: 'brilliant', phonetic: '/ˈbrɪliənt/', pos: 'adj', my: 'ထူးချွန်ပြောင်မြောက်သော။ တောက်ပသော။', example: 'Her brilliant mind unlocked new scientific paths.', ja: '輝かしい (かがやかしい)', zh: '聪颖的 (Cōngyǐng de)' },
          { word: 'resilient', phonetic: '/rɪˈzɪliənt/', pos: 'adj', my: 'ကြံ့ခိုင်သော။ ပြန်လည်နာလန်ထူလွယ်သော။', example: 'Women are inherently resilient leaders.', ja: '回復力のある (かいふくりょく)', zh: '有韧性的 (Yǒu rènxìng de)' },
          { word: 'radiant', phonetic: '/ˈreɪdiənt/', pos: 'adj', my: 'တောက်ပရွှန်းလဲ့သော။ ကျက်သရေရှိသော။', example: 'Her radiant confidence lit up the entire room.', ja: '輝く (かがやく)', zh: '容光焕发的 (Róngguāng)' },
          { word: 'independent', phonetic: '/ˌɪndɪˈpendənt/', pos: 'adj', my: 'လွတ်လပ်သော။ ကိုယ့်အားကိုယ်ကိုးသော။', example: 'Financial independence brings freedom and dignity.', ja: '自立した (じりつした)', zh: '独立的 (Dúlì de)' },
          { word: 'compassionate', phonetic: '/kəmˈpæʃənət/', pos: 'adj', my: 'စာနာထောက်ထားတတ်သော။ ကြင်နာသော။', example: 'Compassionate leadership inspires true loyalty.', ja: '思いやりのある', zh: '富有同情心的' },
          { word: 'creative', phonetic: '/kriˈeɪtɪv/', pos: 'adj', my: 'တီထွင်ဖန်တီးနိုင်စွမ်းရှိသော။', example: 'Creative thinking solves complex challenges.', ja: '創造的な (そうぞうてきな)', zh: '创新的 (Chuàngxīn de)' },
          { word: 'diligent', phonetic: '/ˈdɪlɪdʒənt/', pos: 'adj', my: 'ဝီရိယရှိသော။ လုံ့လဝိရိယနှင့်ပြည့်စုံသော။', example: 'Diligent effort always yields meaningful growth.', ja: '勤勉な (きんべんな)', zh: '勤奋的 (Qínfèn de)' }
        ]
      },
      heritage_names: {
        id: 'heritage_names',
        title: '🇲🇲 Myanmar Names & Heritage',
        titleMy: 'မြန်မာအမျိုးသမီးအမည်များနှင့် ဂုဏ်ပုဒ်များ',
        badge: 'Heritage',
        items: [
          { word: 'သဇင် (Thazin)', phonetic: '/θəzɪ̀ɴ/', pos: 'n', my: 'တော်ဝင်သဇင်ပန်း၊ သန့်ရှင်းစင်ကြယ်ခြင်းနှင့် ကျက်သရေရှိခြင်း', example: 'သဇင်ပန်းသည် မြန်မာ့ရိုးရာတွင် တော်ဝင်ပန်းအဖြစ် တန်ဖိုးထားကြသည်။', ja: 'ロイヤル・オーキッド (純潔)', zh: '皇室兰花 (高雅纯洁)' },
          { word: 'မေ (May)', phonetic: '/mè/', pos: 'n', my: 'ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော သမီးငယ်၊ ချစ်စနိုးခေါ်ဆိုသောအမည်', example: 'မေမေက သမီးလေး မေ ကို ချစ်ခင်ယုယစွာ စောင့်ရှောက်သည်။', ja: '愛される愛娘 (めい)', zh: '被挚爱的女儿 (梅)' },
          { word: 'ထက် (Htet)', phonetic: '/tʰeʔ/', pos: 'adj/n', my: 'ထူးချွန်ထက်မြက်သော၊ ထိပ်တန်းကျသော၊ စူးရှထက်မြက်သော', example: 'ထက်မြက်သော ဉာဏ်ပညာဖြင့် အခက်အခဲများကို ကျော်ဖြတ်နိုင်သည်။', ja: '卓越した・鋭い (すばらしい)', zh: '卓越而敏锐的 (杰出)' },
          { word: 'ခင် (Khin)', phonetic: '/kʰɪ̀ɴ/', pos: 'adj/n', my: 'ခင်မင်ရင်းနှီးသော၊ သံယောဇဉ်ရှိသော၊ ချစ်ခင်ဖွယ်ကောင်းသော', example: 'ခင်မင်ရင်းနှီးမှုသည် ညီအစ်မများကြား သံယောဇဉ်ကို ခိုင်မြဲစေသည်။', ja: '親切で親しみやすい (きん)', zh: '亲切和睦的 (友好)' },
          { word: 'နွေး (Nwe)', phonetic: '/nwé/', pos: 'adj', my: 'နွေးထွေးသော၊ ကြင်နာယုယမှုရှိသော မေတ္တာဓာတ်', example: 'နွေးထွေးသော မေတ္တာဖြင့် အားပေးစကားဆိုသည်။', ja: '温かい (おもいやり)', zh: '温暖的 (真挚关怀)' },
          { word: 'ပန်း (Pan)', phonetic: '/páɴ/', pos: 'n', my: 'ပန်းပွင့်၊ လှပမွှေးကြူသော အရာ', example: 'ပန်းကလေးများပမာ လှပဆန်းသစ်သော ဘဝခရီး။', ja: '花 (うつくしい花)', zh: '鲜花 (芬芳美丽)' },
          { word: 'ကြည် (Kyi)', phonetic: '/tʃì/', pos: 'adj', my: 'ကြည်လင်သော၊ သန့်စင်သော၊ စိတ်နှလုံးရွှင်လန်းကြည်လင်သော', example: 'ကြည်လင်သော စိတ်ဓာတ်ဖြင့် လောကကို အလှဆင်ပါ။', ja: '澄みきった・純粋な', zh: '明澈澄净的' },
          { word: 'ရွှေ (Shwe)', phonetic: '/ʃwè/', pos: 'n/adj', my: 'ရွှေရောင်၊ တန်ဖိုးကြီးမားသော၊ အဖိုးတန်သော အရာ', example: 'ရွှေကဲ့သို့ အဖိုးတန်သော လူသားတစ်ယောက်အဖြစ် ရှင်သန်ပါ။', ja: '黄金の・尊い (きん)', zh: '黄金般宝贵的' }
        ]
      },
      daily_life: {
        id: 'daily_life',
        title: '💬 Daily Essentials',
        titleMy: 'နေ့စဉ်သုံး စကားပြောအခြေခံများ',
        badge: 'Everyday',
        items: [
          { word: 'Konnichiwa (こんにちは)', phonetic: 'Konnichiwa', pos: 'phrase', my: 'မင်္ဂလာပါ (နေ့ခင်းနှုတ်ခွန်းဆက်)', example: 'こんにちは、今日も素敵な一日にしましょう。', ja: 'こんにちは', zh: '你好 (Nǐ hǎo)', en: 'Hello / Good afternoon' },
          { word: 'Arigatou (ありがとう)', phonetic: 'Arigatō gozaimasu', pos: 'phrase', my: 'ကျေးဇူးတင်ပါတယ်', example: '温かいサポートをありがとうございます。', ja: 'ありがとうございます', zh: '谢谢 (Xièxiè)', en: 'Thank you very much' },
          { word: 'Gambatte (がんばって)', phonetic: 'Ganbatte kudasai', pos: 'phrase', my: 'ကြိုးစားပါ! အားတင်းထားပါ!', example: '夢に向かってがんばってください！', ja: 'がんばって！', zh: '加油！ (Jiāyóu)', en: 'Do your best! / Keep it up!' },
          { word: 'Daijoubu (だいじょうぶ)', phonetic: 'Daijōbu desu', pos: 'phrase', my: 'အဆင်ပြေပါတယ် / ကိစ္စမရှိပါဘူး', example: '心配しないで、すべてだいじょうぶです。', ja: '大丈夫です', zh: '没关系 (Méi guānxi)', en: 'Everything is okay' },
          { word: 'Sawadee kha (สวัสดีค่ะ)', phonetic: 'Sawatdee kha', pos: 'phrase', my: 'မင်္ဂလာပါ (ထိုင်းအမျိုးသမီးသုံး နှုတ်ဆက်စကား)', example: 'สวัสดีค่ะ ยินดีที่ได้รู้จักค่ะ', ja: 'タイの丁寧な挨拶', zh: '你好 (泰语女性)', en: 'Hello (Thai polite female)' }
        ]
      },
      karen: {
        id: 'karen',
        title: '🌿 Sgaw Karen Heritage',
        titleMy: 'စကောကရင် တိုင်းရင်းသားစကားလုံးများ',
        badge: 'Ethnic',
        items: [
          { word: 'တာဘလူး (Ta-blu)', phonetic: 'Ta-blu', pos: 'phrase', my: 'ကျေးဇူးတင်ပါသည် (ကရင်ရိုးရာနှုတ်ခွန်းဆက်)', example: 'တာဘလူး - စကောကရင်တိုင်းရင်းသားတို့၏ မေတ္တာစကား။', ja: 'カレン族の「ありがとう」', zh: '克伦语「谢谢」', en: 'Thank you (Sgaw Karen)' },
          { word: 'မုဂ့ၤ (Mu-geh)', phonetic: 'Mu-geh', pos: 'phrase', my: 'မင်္ဂလာပါ / ကောင်းသောနေ့ဖြစ်ပါစေ', example: 'မုဂ့ၤ - ညီအစ်မအချင်းချင်း နွေးထွေးစွာနှုတ်ဆက်ခြင်း။', ja: 'カレン族の「こんにちは」', zh: '克伦语「你好」', en: 'Good day / Greetings' },
          { word: 'အဲ (Ah-eh)', phonetic: 'Ah-eh', pos: 'v/n', my: 'ချစ်ခြင်းမေတ္တာ / ချစ်သည်', example: 'မေတ္တာတရားသည် လူမျိုးပေါင်းစုံကို ချိတ်ဆက်ပေးသည်။', ja: '愛 (カレン語)', zh: '爱 (克伦语)', en: 'Love / Affection' },
          { word: 'ကညီ (P\'wa K\'nyaw)', phonetic: 'K\'nyaw', pos: 'n', my: 'ကရင်လူမျိုး / လူသား', example: 'ကရင်ရိုးရာယဉ်ကျေးမှုသည် လှပဆန်းပြားသည်။', ja: 'カレンの人々', zh: '克伦族人', en: 'Karen People / Human' }
        ]
      },
      bookmarks: {
        id: 'bookmarks',
        title: '⭐ My Saved Words',
        titleMy: 'ကိုယ်တိုင်မှတ်သားထားသော ဝေါဟာရများ',
        badge: 'Saved',
        items: [] // populated dynamically from htetDB
      }
    };
  }

  async init() {
    this.updateStatusHeader();
    this.bindEvents();
    await this.refreshBookmarks();
    this.renderCurrentTab();
    this.checkNetworkState();

    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js?v=2.4.0');
        console.log('[HtetLingo] Service worker v2.4.0 active');
      } catch (e) {}
    }
  }

  bindEvents() {
    // Navigation Tabs
    const navItems = document.querySelectorAll('.nav-tab-item');
    navItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Keyboard shortcuts in Lesson
    window.addEventListener('keydown', (e) => {
      if (this.activeLesson) {
        if (e.key >= '1' && e.key <= '4') {
          const idx = parseInt(e.key, 10) - 1;
          this.selectChoiceByIndex(idx);
        } else if (e.key === 'Enter') {
          const btn = document.getElementById('studioActionBtn');
          if (btn && !btn.disabled) btn.click();
        }
      } else if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  async refreshBookmarks() {
    if (window.htetDB) {
      try {
        this.bookmarks = await window.htetDB.getBookmarks();
        this.decks.bookmarks.items = this.bookmarks.map(b => ({
          word: b.word,
          phonetic: b.phonetic || '',
          pos: b.pos || 'n',
          my: b.translation || b.my || '',
          example: b.example || '',
          ja: b.ja || '',
          zh: b.zh || '',
          isBookmarked: true
        }));
      } catch (e) {
        this.bookmarks = [];
      }
    }
  }

  async loadDatasets() {
    // 1. Populate feminism deck from HTET_DATA
    if (window.HTET_DATA?.vocabulary) {
      this.decks.feminism.items = window.HTET_DATA.vocabulary.map(v => {
        const t = v.translations[this.targetLang] || v.translations.en;
        const my = v.translations.my;
        return {
          id: v.id,
          word: t.word,
          phonetic: t.phonetic,
          pos: 'n',
          my: my.word,
          example: my.example,
          raw: v
        };
      });
    }

    // 2. Fetch grammar handbook (旋元佑 25 chapters)
    try {
      const grammarRes = await fetch('./data/grammar_handbook.json').catch(() => null);
      if (grammarRes && grammarRes.ok) {
        const gData = await grammarRes.json();
        this.grammarChapters = gData.chapters || [];
        this.decks.grammar_book.items = this.grammarChapters.map(ch => ({
          word: ch.titleEn,
          phonetic: `Chapter ${ch.chapter}`,
          pos: ch.category,
          my: ch.titleMy,
          example: ch.formula,
          chapterData: ch
        }));
      }
    } catch (e) {
      console.warn('Grammar handbook load failed');
    }

    // 3. Fetch quick lexicon, female names & common errors for background search
    try {
      const [lexRes, namesRes, errorsRes] = await Promise.all([
        fetch('./data/lexicon_quick.json').catch(() => null),
        fetch('./data/female_names.json').catch(() => null),
        fetch('./data/common_errors.json').catch(() => null)
      ]);
      if (lexRes && lexRes.ok) this.lexiconData = await lexRes.json();
      if (namesRes && namesRes.ok) this.femaleNamesData = await namesRes.json();
      if (errorsRes && errorsRes.ok) this.commonErrorsData = await errorsRes.json();

      if (window.htetSearchEngine) {
        window.htetSearchEngine.setDatasets({
          lexicon: this.lexiconData,
          femaleNames: this.femaleNamesData,
          commonErrors: this.commonErrorsData
        });
      }
    } catch (e) {
      console.warn('Dataset load failed, using local offline fallback');
    }
  }

  switchTab(tabName) {
    if (tabName === 'practice') tabName = 'vocab';
    if (tabName === 'grammar') {
      this.currentTab = 'vocab';
      this.vocabDeck = 'grammar_book';
    } else {
      this.currentTab = tabName;
    }

    document.querySelectorAll('.nav-tab-item').forEach(btn => {
      const t = btn.getAttribute('data-tab');
      btn.classList.toggle('active', t === this.currentTab || (this.currentTab === 'vocab' && t === 'practice'));
    });

    const viewport = document.getElementById('mainViewport');
    if (!viewport) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.renderCurrentTab();
  }

  renderCurrentTab() {
    const viewport = document.getElementById('mainViewport');
    if (!viewport) return;

    switch (this.currentTab) {
      case 'learn':
        this.renderLearnView(viewport);
        break;
      case 'vocab':
        this.renderVocabView(viewport);
        break;
      case 'dict':
        this.renderDictView(viewport);
        break;
      case 'aitutor':
        this.renderAITutorView(viewport);
        break;
      case 'shop':
        this.renderShopView(viewport);
        break;
      case 'profile':
        this.renderProfileView(viewport);
        break;
      default:
        this.renderLearnView(viewport);
    }
  }

  updateStatusHeader() {
    const streakEl = document.getElementById('topStreakCount');
    const xpEl = document.getElementById('topXpCount');
    const energyEl = document.getElementById('topEnergyCount');
    const langLabel = document.getElementById('topLangLabel');
    const userAvatarEl = document.getElementById('topUserAvatar');

    if (streakEl) streakEl.textContent = this.streak;
    if (xpEl) xpEl.textContent = this.xp;
    if (energyEl) energyEl.textContent = `${this.energy}%`;

    const langNames = {
      ja: '🇯🇵 Japanese',
      en: '🇺🇸 English',
      zh: '🇨🇳 Chinese',
      th: '🇹🇭 Thai',
      my: '🇲🇲 Burmese',
      fr: '🇫🇷 French',
      de: '🇩🇪 German',
      ko: '🇰🇷 Korean'
    };
    if (langLabel) langLabel.textContent = langNames[this.targetLang] || '🇯🇵 Japanese';

    if (userAvatarEl) {
      const user = window.htetSupabase?.getCurrentUser();
      if (user) {
        userAvatarEl.textContent = `🌸 ${user.displayName?.split(' ')[0] || 'Htet'}`;
      } else {
        userAvatarEl.textContent = '👤 Sign In';
      }
    }
  }

  handleUserBtnClick() {
    const user = window.htetSupabase?.getCurrentUser();
    if (user) {
      this.switchTab('profile');
    } else {
      this.openAuthModal('signin');
    }
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('htetToast');
    if (!toast) return;

    let icon = '🌸';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠️';
    if (type === 'cloud') icon = '☁️';
    if (type === 'grammar') icon = '📘';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toast.style.display = 'flex';

    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.style.display = 'none';
    }, 3200);
  }

  openModal(contentHtml) {
    const overlay = document.getElementById('htetModalOverlay');
    const card = document.getElementById('htetModalCard');
    if (overlay && card) {
      card.innerHTML = contentHtml;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(event) {
    if (event && event.target && event.target.id !== 'htetModalOverlay' && !event.target.classList.contains('htet-modal-close-btn')) {
      return;
    }
    const overlay = document.getElementById('htetModalOverlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // ========================================================================
  // AUTHENTICATION MODAL & SUPABASE METHODS
  // ========================================================================
  openAuthModal(activeTab = 'signin') {
    const html = `
      <button class="htet-modal-close-btn" onclick="app.closeModal()">✕</button>
      
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 2.4rem; margin-bottom: 0.3rem;">🌸</div>
        <h2 style="font-size: 1.45rem; font-weight: 900; color: var(--rose-primary);">HtetLingo Sisterhood Account</h2>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
          Sign in to sync your Bloom XP, daily streaks & saved words to Supabase.
        </p>
      </div>

      <div class="auth-segmented-tabs">
        <button class="auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}" onclick="app.openAuthModal('signin')">
          Sign In (ဝင်မည်)
        </button>
        <button class="auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}" onclick="app.openAuthModal('signup')">
          Create Account (အသစ်ဖွင့်)
        </button>
      </div>

      ${activeTab === 'signin' ? `
        <form onsubmit="event.preventDefault(); app.submitSignIn();">
          <div class="auth-field-group">
            <label class="auth-field-label">Email Address</label>
            <input type="email" id="authEmailInput" class="auth-input" placeholder="e.g. htet@htetlingo.app" required value="htet@htetlingo.app">
          </div>

          <div class="auth-field-group">
            <label class="auth-field-label">Password</label>
            <input type="password" id="authPassInput" class="auth-input" placeholder="••••••••" required value="lovelyhtet123">
          </div>

          <button type="submit" class="htet-btn htet-btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.85rem;">
            Sign In with Supabase 🌸
          </button>
        </form>

        <button class="auth-quick-demo-btn" onclick="app.quickDemoLogin()">
          ✨ One-Click Fast Test Login (Htet Founder)
        </button>
      ` : `
        <form onsubmit="event.preventDefault(); app.submitSignUp();">
          <div class="auth-field-group">
            <label class="auth-field-label">Your Name / Nickname</label>
            <input type="text" id="authRegNameInput" class="auth-input" placeholder="e.g. Thazin / Htet" required value="Htet">
          </div>

          <div class="auth-field-group">
            <label class="auth-field-label">Email Address</label>
            <input type="email" id="authRegEmailInput" class="auth-input" placeholder="e.g. learner@htetlingo.app" required>
          </div>

          <div class="auth-field-group">
            <label class="auth-field-label">Password (Min 6 chars)</label>
            <input type="password" id="authRegPassInput" class="auth-input" placeholder="••••••••" minlength="6" required>
          </div>

          <button type="submit" class="htet-btn htet-btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.85rem;">
            Create Free Account 💖
          </button>
        </form>
      `}
    `;

    this.openModal(html);
  }

  async submitSignIn() {
    const email = document.getElementById('authEmailInput')?.value;
    const pass = document.getElementById('authPassInput')?.value;
    if (!email || !pass) return;

    this.showToast('Signing in to Supabase...', 'cloud');
    const res = await window.htetSupabase?.signIn(email, pass);
    if (res && res.user) {
      this.currentUser = res.user;
      this.updateStatusHeader();
      this.closeModal();
      this.showToast(`🌸 Welcome back, ${res.user.displayName}!`, 'success');
      if (this.currentTab === 'profile') this.renderProfileView(document.getElementById('mainViewport'));
    } else {
      this.showToast(res?.error || 'Sign in failed. Check credentials.', 'error');
    }
  }

  async submitSignUp() {
    const name = document.getElementById('authRegNameInput')?.value;
    const email = document.getElementById('authRegEmailInput')?.value;
    const pass = document.getElementById('authRegPassInput')?.value;
    if (!email || !pass) return;

    this.showToast('Creating account on Supabase...', 'cloud');
    const res = await window.htetSupabase?.signUp(email, pass, name);
    if (res && res.user) {
      this.currentUser = res.user;
      this.updateStatusHeader();
      this.closeModal();
      this.showToast(`💖 Welcome to HtetLingo, ${res.user.displayName}!`, 'success');
      if (this.currentTab === 'profile') this.renderProfileView(document.getElementById('mainViewport'));
    } else {
      this.showToast(res?.error || 'Registration failed.', 'error');
    }
  }

  quickDemoLogin() {
    const demoUser = {
      id: 'usr_htet_demo_founder',
      email: 'htet@htetlingo.app',
      displayName: 'Htet (Founder & Polyglot)',
      isPremium: true,
      planType: 'lifetime_access',
      token: 'demo_token_' + Date.now()
    };
    this.currentUser = demoUser;
    localStorage.setItem('htetlingo_auth_user', JSON.stringify(demoUser));
    this.updateStatusHeader();
    this.closeModal();
    this.showToast('🌸 Signed in as Htet (VIP Founder Mode)!', 'success');
    if (this.currentTab === 'profile') this.renderProfileView(document.getElementById('mainViewport'));
  }

  signOut() {
    if (!confirm('Are you sure you want to sign out? Your offline progress is safely stored.')) return;
    window.htetSupabase?.signOut();
    this.currentUser = null;
    this.updateStatusHeader();
    this.showToast('Signed out safely.', 'info');
    if (this.currentTab === 'profile') this.renderProfileView(document.getElementById('mainViewport'));
  }

  async syncProgressToCloud() {
    this.showToast('Syncing with Supabase Cloud...', 'cloud');
    setTimeout(() => {
      localStorage.setItem('htetlingo_last_sync', new Date().toISOString());
      this.showToast('☁️ All progress & bookmarks synced to Supabase!', 'success');
      if (this.currentTab === 'profile') this.renderProfileView(document.getElementById('mainViewport'));
    }, 800);
  }

  // ========================================================================
  // 1. LEARN STUDIO (ROADMAP VIEW WITH GRAMMAR MASTERCLASS PROMOTION)
  // ========================================================================
  renderLearnView(container) {
    const cur = window.HTET_CURRICULUM[this.targetLang] || window.HTET_CURRICULUM.ja;

    let unitsHtml = '';
    cur.units.forEach((unit, uIdx) => {
      let nodesHtml = '';
      unit.levels.forEach((lvl, lIdx) => {
        const isCompleted = this.completedLevels.includes(lvl.id);
        const isFirstUnfinished = !isCompleted && (lIdx === 0 || this.completedLevels.includes(unit.levels[lIdx - 1]?.id));
        const isLocked = !isCompleted && !isFirstUnfinished;

        const shifts = ['', 'shift-l', 'shift-r', ''];
        const shiftClass = shifts[lIdx % 4];

        let stateClass = 'locked';
        let iconContent = '🔒';
        let hintHtml = '';

        if (isCompleted) {
          stateClass = 'completed';
          iconContent = '✓';
        } else if (isFirstUnfinished) {
          stateClass = 'active';
          iconContent = lvl.icon || '🌸';
          hintHtml = '<div class="htet-active-tooltip">START 🌸</div>';
        }

        nodesHtml += `
          <div class="htet-node-step ${shiftClass}">
            <button class="quest-circle-node ${stateClass}" 
                    onclick="${isLocked ? `alert('Complete earlier lessons to unlock! 🌸')` : `app.startStudioLesson('${unit.id}', '${lvl.id}')`}"
                    title="${lvl.title}">
              ${hintHtml}
              <span>${iconContent}</span>
            </button>
          </div>
        `;
      });

      unitsHtml += `
        <div class="htet-unit-banner" style="background: linear-gradient(135deg, ${unit.color || '#f43f5e'}, #ec4899);">
          <span class="htet-unit-badge">UNIT ${uIdx + 1} • ${unit.badge || 'CURRICULUM'}</span>
          <div class="htet-unit-title">${unit.title}</div>
          <div class="htet-unit-subtitle">${unit.subtitle}</div>
        </div>
        <div class="htet-quest-flow" style="margin-bottom: 3.5rem;">
          ${nodesHtml}
        </div>
      `;
    });

    // Grammar handbook quick banner
    const grammarBannerHtml = `
      <div class="card" style="padding: 1.25rem 1.4rem; border-radius: 20px; border: 2px solid #3b82f6; background: linear-gradient(135deg, light-dark(#eff6ff, #1e293b), light-dark(#dbeafe, #0f172a)); margin-bottom: 2rem; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 1rem; box-shadow: 0 4px 16px rgba(59, 130, 246, 0.14);"
           onclick="app.openGrammarHandbook()">
        <div>
          <span style="font-size: 0.75rem; font-weight: 900; background: #3b82f6; color: white; padding: 0.2rem 0.6rem; border-radius: 9999px;">
            旋元佑 MASTERCLASS
          </span>
          <h3 style="font-size: 1.15rem; font-weight: 900; margin-top: 0.35rem; color: var(--text-main);">
            📘 25 English Grammar Chapters
          </h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.15rem;">
            Master sentence patterns, clauses, inversions, and reduced clauses with audio & quizzes.
          </p>
        </div>
        <div style="font-size: 1.5rem; color: #3b82f6; font-weight: 900;">→</div>
      </div>
    `;

    container.innerHTML = `
      <div class="htet-roadmap-wrap">
        ${grammarBannerHtml}
        ${unitsHtml}
      </div>
    `;
  }

  openGrammarHandbook() {
    this.vocabDeck = 'grammar_book';
    this.switchTab('vocab');
  }

  // ========================================================================
  // 2. VOCABULARY & GRAMMAR LEARNING STUDIO
  // ========================================================================
  renderVocabView(container) {
    const deck = this.decks[this.vocabDeck] || this.decks.feminism;
    const items = deck.items || [];
    const deckKeys = Object.keys(this.decks);

    // If Grammar Deck is selected, render the dedicated 25-Chapter Grammar Masterclass!
    if (this.vocabDeck === 'grammar_book') {
      this.renderGrammarMasterclassView(container);
      return;
    }

    // Deck pills HTML
    const deckPillsHtml = deckKeys.map(k => {
      const d = this.decks[k];
      const count = d.items?.length || 0;
      const isActive = this.vocabDeck === k;
      return `
        <button class="vocab-deck-pill ${isActive ? 'active' : ''}" onclick="app.setVocabDeck('${k}')">
          <span>${d.title}</span>
          <span style="font-size: 0.76rem; opacity: 0.85; background: rgba(0,0,0,0.12); padding: 0.15rem 0.45rem; border-radius: 9999px;">${count}</span>
        </button>
      `;
    }).join('');

    let contentHtml = '';

    if (this.vocabMode === 'flashcards') {
      contentHtml = this.renderVocabFlashcardMode(deck, items);
    } else if (this.vocabMode === 'match') {
      contentHtml = this.renderVocabMatchMode(deck, items);
    } else {
      contentHtml = this.renderVocabExplorerMode(deck, items);
    }

    container.innerHTML = `
      <div style="max-width: 620px; margin: 0 auto; padding: 1.25rem 1rem 6rem;">
        <!-- Header -->
        <div style="margin-bottom: 1.25rem;">
          <span style="font-size: 0.8rem; font-weight: 900; text-transform: uppercase; color: var(--rose-primary); background: var(--rose-light); padding: 0.3rem 0.8rem; border-radius: 9999px;">
            📚 VOCABULARY LEARNING STUDIO
          </span>
          <h2 style="font-size: 1.6rem; font-weight: 900; margin-top: 0.45rem; color: var(--text-main);">
            ${deck.title}
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">${deck.titleMy}</p>
        </div>

        <!-- Deck Selector Horizontal Scroll -->
        <div class="vocab-deck-scroller">
          ${deckPillsHtml}
        </div>

        <!-- Mode Segmented Control -->
        <div class="vocab-mode-strip">
          <button class="vocab-mode-btn ${this.vocabMode === 'flashcards' ? 'active' : ''}" onclick="app.setVocabMode('flashcards')">
            🃏 3D Flashcards (SRS)
          </button>
          <button class="vocab-mode-btn ${this.vocabMode === 'match' ? 'active' : ''}" onclick="app.setVocabMode('match')">
            ⚡ Speed Match
          </button>
          <button class="vocab-mode-btn ${this.vocabMode === 'explorer' ? 'active' : ''}" onclick="app.setVocabMode('explorer')">
            📖 Word Bank (${items.length})
          </button>
        </div>

        <!-- Active Mode View Container -->
        ${contentHtml}
      </div>
    `;
  }

  // ========================================================================
  // 2B. ENGLISH GRAMMAR MASTERCLASS (旋元佑 25-CHAPTER VIEWER)
  // ========================================================================
  renderGrammarMasterclassView(container) {
    const deckKeys = Object.keys(this.decks);
    const deckPillsHtml = deckKeys.map(k => {
      const d = this.decks[k];
      const count = d.items?.length || 0;
      const isActive = this.vocabDeck === k;
      return `
        <button class="vocab-deck-pill ${isActive ? 'active' : ''}" onclick="app.setVocabDeck('${k}')">
          <span>${d.title}</span>
          <span style="font-size: 0.76rem; opacity: 0.85; background: rgba(0,0,0,0.12); padding: 0.15rem 0.45rem; border-radius: 9999px;">${count}</span>
        </button>
      `;
    }).join('');

    // Filter chapters by category & search query
    const q = this.grammarSearchQuery.toLowerCase().trim();
    const filteredChapters = this.grammarChapters.filter(ch => {
      const matchesCat = this.grammarCategory === 'all' || ch.category === this.grammarCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        ch.titleEn.toLowerCase().includes(q) ||
        ch.titleZh.includes(q) ||
        ch.titleMy.includes(q) ||
        ch.formula.toLowerCase().includes(q) ||
        ch.summaryMy.includes(q)
      );
    });

    const categoryTabsHtml = `
      <div class="auth-segmented-tabs" style="margin-bottom: 1.25rem;">
        <button class="auth-tab-btn ${this.grammarCategory === 'all' ? 'active' : ''}" onclick="app.setGrammarCategory('all')">
          All (25)
        </button>
        <button class="auth-tab-btn ${this.grammarCategory === 'foundation' ? 'active' : ''}" onclick="app.setGrammarCategory('foundation')">
          🟢 Foundation (7)
        </button>
        <button class="auth-tab-btn ${this.grammarCategory === 'verbs_tenses' ? 'active' : ''}" onclick="app.setGrammarCategory('verbs_tenses')">
          🟡 Verbs & Tenses (7)
        </button>
        <button class="auth-tab-btn ${this.grammarCategory === 'clauses_syntax' ? 'active' : ''}" onclick="app.setGrammarCategory('clauses_syntax')">
          🟣 Clauses & Syntax (11)
        </button>
      </div>
    `;

    const chaptersHtml = filteredChapters.map(ch => {
      const isQuizDone = this.completedGrammarQuizzes.includes(ch.id);

      const examplesHtml = (ch.examples || []).map(ex => `
        <div class="grammar-example-box">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <strong style="font-size: 1.05rem; color: var(--text-main);">${ex.en}</strong>
            <button class="htet-audio-btn" style="width: 34px; height: 34px; font-size: 0.95rem;" 
                    onclick="app.speakCurrent('${ex.en.replace(/'/g, "\\'")}', 'en')" title="Pronounce">
              🔊
            </button>
          </div>
          <div style="font-size: 0.78rem; font-weight: 800; color: #3b82f6; margin-top: 0.2rem; font-family: monospace;">
            [Structure] ${ex.breakdown}
          </div>
          <div style="font-size: 0.92rem; color: var(--rose-primary); font-weight: 800; margin-top: 0.25rem;">
            ${ex.my}
          </div>
        </div>
      `).join('');

      const keyPointsHtml = (ch.keyPoints || []).map(kp => `
        <li style="margin-bottom: 0.35rem;">🌸 ${kp}</li>
      `).join('');

      const quiz = ch.quiz;
      const quizOptionsHtml = quiz.options.map((opt, optIdx) => `
        <button class="pair-card-cell" style="padding: 0.75rem 1rem; text-align: left; font-size: 0.95rem; width: 100%; margin-bottom: 0.5rem;"
                onclick="app.answerGrammarQuiz('${ch.id}', ${optIdx}, ${quiz.correct}, '${(quiz.explanation || '').replace(/'/g, "\\'")}')">
          <span style="font-weight: 900; margin-right: 0.4rem;">${String.fromCharCode(65 + optIdx)}.</span> ${opt}
        </button>
      `).join('');

      return `
        <div class="grammar-chapter-card" id="grammar_card_${ch.id}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <div>
              <span style="font-size: 0.75rem; font-weight: 900; background: light-dark(#e0e7ff, #1e1b4b); color: #4338ca; padding: 0.2rem 0.6rem; border-radius: 9999px;">
                CHAPTER ${ch.chapter} • ${ch.titleZh}
              </span>
              <h3 style="font-size: 1.35rem; font-weight: 900; margin-top: 0.4rem; color: var(--text-main);">
                ${ch.titleEn}
              </h3>
              <p style="font-size: 0.95rem; color: var(--rose-primary); font-weight: 800;">
                ${ch.titleMy}
              </p>
            </div>
            ${isQuizDone ? '<span style="font-size: 0.8rem; font-weight: 900; background: #ecfdf5; color: #047857; padding: 0.25rem 0.65rem; border-radius: 9999px;">✓ PASSED (+15 XP)</span>' : ''}
          </div>

          <div class="grammar-formula-chip">
            📐 FORMULA: ${ch.formula}
          </div>

          <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6; margin-bottom: 1rem; background: var(--bg-card-subtle); padding: 0.85rem 1.1rem; border-radius: 14px;">
            ${ch.summaryMy}
          </div>

          <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem; font-size: 0.88rem; line-height: 1.6;">
            ${keyPointsHtml}
          </ul>

          <h4 style="font-size: 1rem; font-weight: 900; margin-bottom: 0.65rem; color: var(--text-main);">
            ✨ Core Authentic Examples:
          </h4>
          <div style="margin-bottom: 1.25rem;">
            ${examplesHtml}
          </div>

          <!-- Interactive Chapter Quiz -->
          <div class="grammar-quiz-box" id="quiz_box_${ch.id}">
            <div style="font-size: 0.8rem; font-weight: 900; color: #3b82f6; text-transform: uppercase; margin-bottom: 0.4rem;">
              🧠 Chapter ${ch.chapter} Mastery Check (+15 Bloom XP)
            </div>
            <div style="font-size: 1.05rem; font-weight: 900; margin-bottom: 0.85rem; color: var(--text-main);">
              ${quiz.question}
            </div>
            <div>
              ${quizOptionsHtml}
            </div>
            <div id="quiz_feedback_${ch.id}" style="margin-top: 0.6rem; font-size: 0.9rem; font-weight: 800;"></div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div style="max-width: 650px; margin: 0 auto; padding: 1.25rem 1rem 6rem;">
        <!-- Header -->
        <div style="margin-bottom: 1.25rem;">
          <span style="font-size: 0.8rem; font-weight: 900; text-transform: uppercase; color: #3b82f6; background: light-dark(#eff6ff, #1e293b); padding: 0.3rem 0.8rem; border-radius: 9999px;">
            📘 旋元佑 ADVANCED ENGLISH GRAMMAR (25 CHAPTERS)
          </span>
          <h2 style="font-size: 1.6rem; font-weight: 900; margin-top: 0.45rem; color: var(--text-main);">
            English Grammar Handbook
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">
            Master all 25 chapters from basic sentence patterns to clause reductions with formulas, audio, and quizzes.
          </p>
        </div>

        <!-- Deck Selector Horizontal Scroll -->
        <div class="vocab-deck-scroller">
          ${deckPillsHtml}
        </div>

        <!-- Search Bar -->
        <div style="margin-bottom: 1.25rem;">
          <input type="text" class="auth-input" placeholder="Search grammar rules (e.g. inversion, relative clause, tenses, S+V+C)..." 
                 value="${this.grammarSearchQuery}" 
                 oninput="app.filterGrammarHandbook(this.value)">
        </div>

        <!-- Category Tabs -->
        ${categoryTabsHtml}

        <!-- Chapters List -->
        <div>
          ${chaptersHtml || '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No grammar chapters match your search.</div>'}
        </div>
      </div>
    `;
  }

  setGrammarCategory(cat) {
    this.grammarCategory = cat;
    this.renderVocabView(document.getElementById('mainViewport'));
  }

  filterGrammarHandbook(val) {
    this.grammarSearchQuery = val;
    this.renderVocabView(document.getElementById('mainViewport'));
  }

  answerGrammarQuiz(chId, selectedOpt, correctOpt, explanation) {
    const feedbackEl = document.getElementById(`quiz_feedback_${chId}`);
    if (selectedOpt === correctOpt) {
      if (!this.completedGrammarQuizzes.includes(chId)) {
        this.completedGrammarQuizzes.push(chId);
        localStorage.setItem('htetlingo_grammar_quizzes', JSON.stringify(this.completedGrammarQuizzes));
        this.xp += 15;
        localStorage.setItem('htetlingo_xp', this.xp);
      }
      if (window.htetSound) window.htetSound.playDing();
      if (feedbackEl) {
        feedbackEl.innerHTML = `<span style="color: #059669;">✓ Correct! Brilliant understanding! +15 Bloom XP 🌸</span><div style="font-weight: normal; margin-top: 0.2rem; color: var(--text-muted);">${explanation}</div>`;
      }
      this.showToast('✓ Chapter rule mastered! +15 Bloom XP', 'grammar');
    } else {
      if (window.htetSound) window.htetSound.playBuzz();
      if (feedbackEl) {
        feedbackEl.innerHTML = `<span style="color: #dc2626;">✕ Incorrect. Review rule and try again!</span><div style="font-weight: normal; margin-top: 0.2rem; color: var(--text-muted);">${explanation}</div>`;
      }
    }
    this.updateStatusHeader();
  }

  setVocabDeck(deckKey) {
    this.vocabDeck = deckKey;
    this.vocabCardIndex = 0;
    this.isVocabCardFlipped = false;
    this.vocabMatchPairs = [];
    this.vocabMatchedIds = [];
    this.renderVocabView(document.getElementById('mainViewport'));
  }

  setVocabMode(mode) {
    this.vocabMode = mode;
    this.isVocabCardFlipped = false;
    if (mode === 'match') {
      this.initVocabMatchRound();
    }
    this.renderVocabView(document.getElementById('mainViewport'));
  }

  // --- Mode 1: 3D SRS Flashcards ---
  renderVocabFlashcardMode(deck, items) {
    if (!items.length) {
      return `
        <div class="card" style="padding: 3rem 1.5rem; text-align: center;">
          <div style="font-size: 2.8rem; margin-bottom: 0.5rem;">⭐</div>
          <h3 style="font-size: 1.25rem; font-weight: 900;">No Saved Words Yet</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.35rem;">
            Click the star (⭐) in the Word Bank or Dictionary to save words here for SRS review!
          </p>
          <button class="htet-btn htet-btn-primary" style="margin-top: 1.25rem;" onclick="app.setVocabDeck('feminism')">
            Explore Feminism Deck 🌸
          </button>
        </div>
      `;
    }

    const curIdx = this.vocabCardIndex % items.length;
    const item = items[curIdx];
    const targetWord = item.word;
    const phonetic = item.phonetic || '';
    const pos = item.pos || 'word';
    const myMeaning = item.my;
    const example = item.example || '';
    const isBookmarked = this.bookmarks.some(b => b.word === item.word);

    return `
      <!-- Card Progress Indicator -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem;">
        <span style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">
          CARD ${curIdx + 1} OF ${items.length}
        </span>
        <button class="star-bookmark-btn ${isBookmarked ? 'active' : ''}" 
                title="Bookmark Word" 
                onclick="event.stopPropagation(); app.toggleBookmarkWord('${item.word.replace(/'/g, "\\'")}', '${myMeaning.replace(/'/g, "\\'")}', '${phonetic.replace(/'/g, "\\'")}')">
          ${isBookmarked ? '★' : '☆'}
        </button>
      </div>

      <!-- 3D Flashcard -->
      <div class="vocab-card-scene" onclick="app.flipVocabCard()">
        <div class="vocab-flip-card ${this.isVocabCardFlipped ? 'is-flipped' : ''}">
          <!-- FRONT FACE -->
          <div class="vocab-card-face">
            <span style="font-size: 0.78rem; font-weight: 900; text-transform: uppercase; color: var(--rose-primary); background: var(--rose-light); padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 1rem;">
              ${pos.toUpperCase()} • TAP TO REVEAL BURMESE
            </span>
            <div style="font-size: 2.4rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.4rem; line-height: 1.2;">
              ${targetWord}
            </div>
            ${phonetic ? `<div style="font-size: 1.15rem; color: var(--lavender); font-family: monospace; font-weight: 700; margin-bottom: 1.5rem;">${phonetic}</div>` : ''}
            
            <button class="htet-audio-btn" onclick="event.stopPropagation(); app.speakCurrent('${targetWord.replace(/'/g, "\\'")}', '${this.targetLang}')" title="Pronounce">
              🔊
            </button>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 1.5rem;">
              💡 Click anywhere to flip & check definition
            </div>
          </div>

          <!-- BACK FACE -->
          <div class="vocab-card-face card-back">
            <span style="font-size: 0.78rem; font-weight: 900; text-transform: uppercase; color: var(--rose-primary); margin-bottom: 0.75rem;">
              🇲🇲 မြန်မာအဓိပ္ပာယ် & ရှင်းလင်းချက်
            </span>
            <div style="font-size: 1.85rem; font-weight: 900; color: var(--rose-primary); margin-bottom: 1rem; line-height: 1.3;">
              ${myMeaning}
            </div>
            ${example ? `
              <div style="font-size: 0.95rem; color: var(--text-main); background: var(--bg-card); padding: 0.85rem 1rem; border-radius: 14px; border: 1px solid var(--border-color); line-height: 1.6; max-width: 440px;">
                "${example}"
              </div>
            ` : ''}
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 1.25rem;">
              Rate your recall below to set SRS interval 🌸
            </div>
          </div>
        </div>
      </div>

      <!-- SRS 4-Rating Action Bar -->
      <div class="srs-ratings-bar">
        <button class="srs-btn srs-again" onclick="app.handleSRSReview('again')">
          <span>❌</span>
          <span>Again</span>
          <span style="font-size: 0.72rem; opacity: 0.8;">မမှတ်မိ</span>
        </button>
        <button class="srs-btn srs-hard" onclick="app.handleSRSReview('hard')">
          <span>🟡</span>
          <span>Hard</span>
          <span style="font-size: 0.72rem; opacity: 0.8;">ခက်သည်</span>
        </button>
        <button class="srs-btn srs-good" onclick="app.handleSRSReview('good')">
          <span>🟢</span>
          <span>Good</span>
          <span style="font-size: 0.72rem; opacity: 0.8;">မှတ်မိ</span>
        </button>
        <button class="srs-btn srs-easy" onclick="app.handleSRSReview('easy')">
          <span>🌸</span>
          <span>Master</span>
          <span style="font-size: 0.72rem; opacity: 0.8;">ကျွမ်းကျင်</span>
        </button>
      </div>
    `;
  }

  flipVocabCard() {
    this.isVocabCardFlipped = !this.isVocabCardFlipped;
    const card = document.querySelector('.vocab-flip-card');
    if (card) card.classList.toggle('is-flipped', this.isVocabCardFlipped);
  }

  async handleSRSReview(rating) {
    const deck = this.decks[this.vocabDeck] || this.decks.feminism;
    const items = deck.items || [];
    if (!items.length) return;

    const cur = items[this.vocabCardIndex % items.length];

    let xpGain = 5;
    if (rating === 'good') xpGain = 10;
    if (rating === 'easy') xpGain = 20;
    this.xp += xpGain;
    localStorage.setItem('htetlingo_xp', this.xp);

    if (window.htetDB) {
      await window.htetDB.updateSRSProgress(cur.word, this.targetLang, rating);
    }

    if (window.htetSound) window.htetSound.playDing();
    this.showToast(`+${xpGain} Bloom XP! (${rating.toUpperCase()})`, 'success');

    this.vocabCardIndex += 1;
    this.isVocabCardFlipped = false;
    this.updateStatusHeader();
    this.renderVocabView(document.getElementById('mainViewport'));
  }

  // --- Mode 2: Speed Word Match Quiz ---
  initVocabMatchRound() {
    const deck = this.decks[this.vocabDeck] || this.decks.feminism;
    const items = [...(deck.items || [])].sort(() => 0.5 - Math.random()).slice(0, 4);

    this.vocabMatchPairs = items;
    this.vocabSelectedA = null;
    this.vocabSelectedB = null;
    this.vocabMatchedIds = [];

    this.vocabLeftWords = items.map((it, i) => ({ id: i, word: it.word })).sort(() => 0.5 - Math.random());
    this.vocabRightMeanings = items.map((it, i) => ({ id: i, my: it.my })).sort(() => 0.5 - Math.random());
  }

  renderVocabMatchMode(deck, items) {
    if (!this.vocabMatchPairs.length || this.vocabMatchPairs.length < 2) {
      this.initVocabMatchRound();
    }

    const isAllMatched = this.vocabMatchedIds.length === this.vocabMatchPairs.length;

    let leftButtons = this.vocabLeftWords.map(w => {
      const isMatched = this.vocabMatchedIds.includes(w.id);
      const isSelected = this.vocabSelectedA === w.id;
      return `
        <button class="pair-card-cell ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                onclick="app.handleVocabMatchSelect('left', ${w.id})"
                ${isMatched ? 'disabled' : ''}>
          ${w.word}
        </button>
      `;
    }).join('');

    let rightButtons = this.vocabRightMeanings.map(m => {
      const isMatched = this.vocabMatchedIds.includes(m.id);
      const isSelected = this.vocabSelectedB === m.id;
      return `
        <button class="pair-card-cell ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                onclick="app.handleVocabMatchSelect('right', ${m.id})"
                ${isMatched ? 'disabled' : ''}>
          ${m.my}
        </button>
      `;
    }).join('');

    return `
      <div class="card" style="padding: 1.5rem; text-align: center; margin-bottom: 1.5rem;">
        <span style="font-size: 0.8rem; font-weight: 800; color: var(--rose-primary); text-transform: uppercase;">
          ⚡ SPEED PAIR DRILL • TAP WORD THEN BURMESE MEANING
        </span>
        <div style="font-size: 1.25rem; font-weight: 900; margin-top: 0.4rem; color: var(--text-main);">
          Matched: ${this.vocabMatchedIds.length} / ${this.vocabMatchPairs.length} Pairs
        </div>

        ${isAllMatched ? `
          <div style="padding: 2rem 1rem;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🌸</div>
            <h3 style="font-size: 1.4rem; font-weight: 900; color: #059669;">Round Completed! Wonderful Job!</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; margin-top: 0.35rem;">
              You earned +40 Bloom XP for perfect pairing speed.
            </p>
            <button class="htet-btn htet-btn-primary" style="margin-top: 1.25rem;" onclick="app.initVocabMatchRound(); app.renderVocabView(document.getElementById('mainViewport'));">
              Play Next Round ⚡
            </button>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-top: 1.25rem;">
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">${leftButtons}</div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">${rightButtons}</div>
          </div>
        `}
      </div>
    `;
  }

  handleVocabMatchSelect(side, id) {
    if (side === 'left') {
      this.vocabSelectedA = id;
    } else {
      this.vocabSelectedB = id;
    }

    if (this.vocabSelectedA !== null && this.vocabSelectedB !== null) {
      if (this.vocabSelectedA === this.vocabSelectedB) {
        this.vocabMatchedIds.push(this.vocabSelectedA);
        this.xp += 10;
        localStorage.setItem('htetlingo_xp', this.xp);
        if (window.htetSound) window.htetSound.playDing();
        this.showToast('🌸 Matched! +10 Bloom XP', 'success');
      } else {
        if (window.htetSound) window.htetSound.playBuzz();
        this.showToast('Try again! Keep going.', 'error');
      }
      this.vocabSelectedA = null;
      this.vocabSelectedB = null;
      this.updateStatusHeader();
      this.renderVocabView(document.getElementById('mainViewport'));
    } else {
      this.renderVocabView(document.getElementById('mainViewport'));
    }
  }

  // --- Mode 3: Word Bank & Audio Explorer ---
  renderVocabExplorerMode(deck, items) {
    const q = this.vocabSearchQuery.toLowerCase().trim();
    const filtered = items.filter(it => {
      if (!q) return true;
      return it.word.toLowerCase().includes(q) || (it.my && it.my.includes(q)) || (it.phonetic && it.phonetic.includes(q));
    });

    const rowsHtml = filtered.map(it => {
      const isBookmarked = this.bookmarks.some(b => b.word === it.word);
      return `
        <div class="word-bank-row">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <strong style="font-size: 1.15rem; color: var(--text-main);">${it.word}</strong>
              <span style="font-size: 0.72rem; font-weight: 800; background: var(--bg-card-subtle); padding: 0.15rem 0.45rem; border-radius: 6px; color: var(--text-muted); border: 1px solid var(--border-color);">
                ${it.pos || 'word'}
              </span>
            </div>
            ${it.phonetic ? `<div style="font-size: 0.85rem; color: var(--lavender); font-family: monospace;">${it.phonetic}</div>` : ''}
            <div style="font-size: 0.95rem; color: var(--rose-primary); font-weight: 800; margin-top: 0.25rem;">
              ${it.my}
            </div>
            ${it.example ? `<div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">${it.example}</div>` : ''}
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="htet-audio-btn" style="width: 36px; height: 36px; font-size: 1rem;" 
                    onclick="app.speakCurrent('${it.word.replace(/'/g, "\\'")}', '${this.targetLang}')">
              🔊
            </button>
            <button class="star-bookmark-btn ${isBookmarked ? 'active' : ''}" 
                    onclick="app.toggleBookmarkWord('${it.word.replace(/'/g, "\\'")}', '${(it.my || '').replace(/'/g, "\\'")}', '${(it.phonetic || '').replace(/'/g, "\\'")}')">
              ${isBookmarked ? '★' : '☆'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div>
        <div style="margin-bottom: 1rem;">
          <input type="text" class="auth-input" placeholder="Search within ${deck.title}..." 
                 value="${this.vocabSearchQuery}" 
                 oninput="app.filterVocabBank(this.value)">
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${rowsHtml || '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No words found matching query.</div>'}
        </div>
      </div>
    `;
  }

  filterVocabBank(val) {
    this.vocabSearchQuery = val;
    this.renderVocabView(document.getElementById('mainViewport'));
  }

  async toggleBookmarkWord(word, translation, phonetic) {
    if (!window.htetDB) return;
    const isBookmarked = this.bookmarks.some(b => b.word === word);

    if (isBookmarked) {
      await window.htetDB.removeBookmark(`${this.targetLang}_${word}`);
      this.showToast(`Removed "${word}" from saved words.`, 'info');
    } else {
      await window.htetDB.addBookmark({
        word,
        translation,
        phonetic,
        language: this.targetLang
      });
      this.showToast(`⭐ Saved "${word}" to Word Bank!`, 'success');
    }

    await this.refreshBookmarks();
    this.renderVocabView(document.getElementById('mainViewport'));
  }

  // ========================================================================
  // 3. DICTIONARY SEARCH VIEW (HIGH-ACCURACY MULTI-TIERED SEARCH ENGINE)
  // ========================================================================
  renderDictView(container) {
    container.innerHTML = `
      <div style="max-width: 650px; margin: 0 auto; padding: 1.25rem 1rem 6rem;">
        <div style="margin-bottom: 1.25rem;">
          <span style="font-size: 0.8rem; font-weight: 900; text-transform: uppercase; color: var(--rose-primary); background: var(--rose-light); padding: 0.3rem 0.8rem; border-radius: 9999px;">
            🔍 HIGH-PRECISION DICTIONARY
          </span>
          <h2 style="font-size: 1.6rem; font-weight: 900; margin-top: 0.45rem;">Multilingual Lexicon & Names</h2>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            21,000+ EMDictionary entries, Myanmar female names, Karen vocabulary & phonetics.
          </p>
        </div>

        <div style="position: relative; margin-bottom: 1.25rem;">
          <input type="text" id="dictQueryInput" class="auth-input" 
                 placeholder="Search English or မြန်မာလို (e.g. love, empower, သဇင်, မေ)..." 
                 oninput="app.handleDictSearch(this.value)">
        </div>

        <div id="dictResultsList" style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
            Type any English word or Myanmar meaning to search.
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const inp = document.getElementById('dictQueryInput');
      if (inp) {
        inp.value = 'empower';
        this.handleDictSearch('empower');
      }
    }, 150);
  }

  handleDictSearch(query) {
    const listEl = document.getElementById('dictResultsList');
    if (!listEl) return;

    if (!query || !query.trim()) {
      listEl.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Type any English word or Myanmar meaning to search.</div>';
      return;
    }

    const engine = window.htetSearchEngine || (window.HtetSearchEngine ? new window.HtetSearchEngine() : null);
    if (engine) {
      if (!engine.isLoaded && this.lexiconData.length) {
        engine.setDatasets({
          lexicon: this.lexiconData,
          femaleNames: this.femaleNamesData,
          commonErrors: this.commonErrorsData
        });
      }

      const results = engine.search(query, this.dictTab || 'all', 25);

      if (!results.length) {
        listEl.innerHTML = `
          <div class="card" style="padding: 2.5rem 1.5rem; text-align: center;">
            <div style="font-size: 2.4rem; margin-bottom: 0.5rem;">🔍</div>
            <h3 style="font-size: 1.2rem; font-weight: 900;">No exact matches found</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
              Try a different spelling or keyword.
            </p>
          </div>
        `;
        return;
      }

      listEl.innerHTML = results.map(r => `
        <div class="card" style="padding: 1.25rem; border-radius: 20px; ${r.type === 'common_error' ? 'border: 2px solid #f97316; background: rgba(249, 115, 22, 0.05);' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                <span style="font-size: 1.25rem; font-weight: 900; color: var(--text-main);">${r.displayWord || r.word || r.title}</span>
                ${r.badge ? `<span style="font-size: 0.72rem; font-weight: 800; background: ${r.badgeColor || 'var(--rose-primary)'}; color: #fff; padding: 0.15rem 0.55rem; border-radius: 9999px;">${r.badge}</span>` : ''}
                ${r.pos ? `<span style="font-size: 0.72rem; font-weight: 800; background: var(--bg-card-subtle); border: 1px solid var(--border-color); padding: 0.15rem 0.45rem; border-radius: 6px; color: var(--text-muted);">${r.pos}</span>` : ''}
              </div>
              ${r.phonetic ? `<div style="font-size: 0.88rem; color: var(--lavender); font-family: monospace; font-weight: 700; margin-top: 0.2rem;">${r.phonetic}</div>` : ''}
            </div>

            <button class="htet-audio-btn" style="width: 36px; height: 36px; font-size: 1rem; flex-shrink: 0;" 
                    onclick="app.speakCurrent('${(r.word || r.title || '').replace(/'/g, "\\'")}', 'en')">
              🔊
            </button>
          </div>

          <div style="font-size: 1rem; font-weight: 800; color: ${r.type === 'common_error' ? '#ea580c' : 'var(--rose-primary)'}; margin-top: 0.6rem; line-height: 1.5;">
            ${r.meaning || r.definition}
          </div>
          ${r.type === 'common_error' && r.definition ? `
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.4rem; font-style: italic;">
              ${r.definition}
            </div>
          ` : ''}
        </div>
      `).join('');
    }
  }

  // ========================================================================
  // 4. AI TUTOR CONVERSATION VIEW
  // ========================================================================
  renderAITutorView(container) {
    if (window.htetAITutor) {
      window.htetAITutor.render(container);
    }
  }

  // ========================================================================
  // 5. VIP STUDIO & SUBSCRIPTIONS
  // ========================================================================
  renderShopView(container) {
    const rc = window.htetRevenueCat;
    const plans = rc?.plans || [];

    const planCardsHtml = plans.map(p => `
      <div class="card" style="padding: 1.5rem; margin-bottom: 1rem; border-radius: 22px; position: relative; ${p.popular ? 'border-color: var(--rose-primary); box-shadow: 0 8px 24px rgba(244, 63, 94, 0.18);' : ''}">
        ${p.badge ? `<span style="position: absolute; top: 1rem; right: 1rem; font-size: 0.75rem; font-weight: 900; background: var(--rose-light); color: var(--rose-primary); padding: 0.25rem 0.65rem; border-radius: 9999px;">${p.badge}</span>` : ''}
        <h3 style="font-size: 1.3rem; font-weight: 900; margin-bottom: 0.35rem;">${p.name}</h3>
        <div style="font-size: 1.8rem; font-weight: 900; color: var(--rose-primary); margin-bottom: 0.75rem;">
          ${p.price} <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;">/ ${p.period}</span>
        </div>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem; font-size: 0.88rem; line-height: 1.8;">
          ${p.features.map(f => `<li>🌸 ${f}</li>`).join('')}
        </ul>
        <button class="htet-btn ${p.popular ? 'htet-btn-primary' : 'htet-btn-outline'}" style="width: 100%; padding: 0.75rem;" onclick="app.purchasePlan('${p.id}')">
          ${p.id === 'free' ? 'Current Plan' : 'Unlock Access 💎'}
        </button>
      </div>
    `).join('');

    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; padding: 1.25rem 1rem 6rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="font-size: 2.8rem; margin-bottom: 0.4rem;">💎</div>
          <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--rose-primary);">HtetLingo VIP Studio</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 420px; margin: 0.35rem auto 0;">
            Support female empowerment and unlock unlimited AI tutoring, JLPT & HSK master packs.
          </p>
        </div>

        <div>
          ${planCardsHtml}
        </div>
      </div>
    `;
  }

  async purchasePlan(planId) {
    if (planId === 'free') {
      this.showToast('You are on the Free Starter plan.', 'info');
      return;
    }
    this.showToast('Connecting to RevenueCat...', 'cloud');
    if (window.htetRevenueCat) {
      await window.htetRevenueCat.purchase(planId);
      this.energy = 100;
      this.updateStatusHeader();
      this.showToast('💎 VIP Membership unlocked successfully!', 'success');
      this.renderShopView(document.getElementById('mainViewport'));
    }
  }

  // ========================================================================
  // 6. PROFILE & ACCOUNT VIEW (SUPABASE INTEGRATION, STATS & LANGUAGE MODAL)
  // ========================================================================
  renderProfileView(container) {
    const user = window.htetSupabase?.getCurrentUser();

    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; padding: 1.5rem 1rem 6rem;">
        
        <!-- User Profile Header Card -->
        <div class="card" style="padding: 1.75rem 1.5rem; text-align: center; border-radius: 24px; margin-bottom: 1.5rem;">
          <div style="width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, #f43f5e, #a855f7); color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 2.5rem; box-shadow: 0 8px 20px rgba(244, 63, 94, 0.28); margin-bottom: 0.85rem;">
            🌸
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 0.2rem;">
            ${user ? user.displayName : 'Guest Learner'}
          </h2>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            ${user ? user.email : 'Local Offline Mode (Sync Available)'}
          </p>

          ${user ? `
            <div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;">
              <button class="htet-btn htet-btn-outline" style="padding: 0.6rem 1.2rem; font-size: 0.88rem;" onclick="app.syncProgressToCloud()">
                ☁️ Sync to Supabase
              </button>
              <button class="htet-btn htet-btn-outline" style="padding: 0.6rem 1.2rem; font-size: 0.88rem; color: #dc2626;" onclick="app.signOut()">
                🚪 Sign Out
              </button>
            </div>
          ` : `
            <div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;">
              <button class="htet-btn htet-btn-primary" style="padding: 0.65rem 1.4rem; font-size: 0.92rem;" onclick="app.openAuthModal('signin')">
                Sign In to Supabase 🌸
              </button>
              <button class="htet-btn htet-btn-outline" style="padding: 0.65rem 1.4rem; font-size: 0.92rem;" onclick="app.openAuthModal('signup')">
                Create Account
              </button>
            </div>
          `}
        </div>

        <!-- Learning Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem; margin-bottom: 1.5rem;">
          <div class="card" style="padding: 1.25rem; text-align: center; border-radius: 20px;">
            <div style="font-size: 1.85rem; font-weight: 900; color: #f97316;">🔥 ${this.streak}</div>
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">DAY STREAK</div>
          </div>
          <div class="card" style="padding: 1.25rem; text-align: center; border-radius: 20px;">
            <div style="font-size: 1.85rem; font-weight: 900; color: #f43f5e;">🌸 ${this.xp}</div>
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">BLOOM XP</div>
          </div>
          <div class="card" style="padding: 1.25rem; text-align: center; border-radius: 20px;">
            <div style="font-size: 1.85rem; font-weight: 900; color: #3b82f6;">📘 ${this.completedGrammarQuizzes.length}</div>
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">GRAMMAR MASTERY</div>
          </div>
          <div class="card" style="padding: 1.25rem; text-align: center; border-radius: 20px;">
            <div style="font-size: 1.85rem; font-weight: 900; color: #10b981;">🏆 ${this.completedLevels.length}</div>
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">UNITS UNLOCKED</div>
          </div>
        </div>

        <!-- Target Language Switcher Card -->
        <div class="card" style="padding: 1.35rem; border-radius: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 900;">Learning Language</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Choose your current study target</p>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="vocab-deck-pill ${this.targetLang === 'ja' ? 'active' : ''}" onclick="app.setTargetLang('ja')">🇯🇵 Japanese</button>
            <button class="vocab-deck-pill ${this.targetLang === 'en' ? 'active' : ''}" onclick="app.setTargetLang('en')">🇺🇸 English</button>
            <button class="vocab-deck-pill ${this.targetLang === 'zh' ? 'active' : ''}" onclick="app.setTargetLang('zh')">🇨🇳 Chinese</button>
            <button class="vocab-deck-pill ${this.targetLang === 'th' ? 'active' : ''}" onclick="app.setTargetLang('th')">🇹🇭 Thai</button>
            <button class="vocab-deck-pill ${this.targetLang === 'my' ? 'active' : ''}" onclick="app.setTargetLang('my')">🇲🇲 Burmese</button>
            <button class="vocab-deck-pill ${this.targetLang === 'fr' ? 'active' : ''}" onclick="app.setTargetLang('fr')">🇫🇷 French</button>
            <button class="vocab-deck-pill ${this.targetLang === 'de' ? 'active' : ''}" onclick="app.setTargetLang('de')">🇩🇪 German</button>
            <button class="vocab-deck-pill ${this.targetLang === 'ko' ? 'active' : ''}" onclick="app.setTargetLang('ko')">🇰🇷 Korean</button>
          </div>
        </div>
      </div>
    `;
  }

  setTargetLang(langCode) {
    this.targetLang = langCode;
    localStorage.setItem('htetlingo_target_lang', langCode);
    this.updateStatusHeader();
    this.showToast(`Switched target language to ${langCode.toUpperCase()}`, 'success');
    this.renderCurrentTab();
  }

  openLanguageModal() {
    const html = `
      <button class="htet-modal-close-btn" onclick="app.closeModal()">✕</button>
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 2.2rem; margin-bottom: 0.3rem;">🌐</div>
        <h2 style="font-size: 1.4rem; font-weight: 900;">Choose Target Language</h2>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
          Select the language you want to study today
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.65rem;">
        <button class="htet-btn ${this.targetLang === 'ja' ? 'htet-btn-primary' : 'htet-btn-outline'}" onclick="app.setTargetLang('ja'); app.closeModal();">🇯🇵 Japanese (日本語)</button>
        <button class="htet-btn ${this.targetLang === 'en' ? 'htet-btn-primary' : 'htet-btn-outline'}" onclick="app.setTargetLang('en'); app.closeModal();">🇺🇸 English</button>
        <button class="htet-btn ${this.targetLang === 'zh' ? 'htet-btn-primary' : 'htet-btn-outline'}" onclick="app.setTargetLang('zh'); app.closeModal();">🇨🇳 Chinese (中文)</button>
        <button class="htet-btn ${this.targetLang === 'th' ? 'htet-btn-primary' : 'htet-btn-outline'}" onclick="app.setTargetLang('th'); app.closeModal();">🇹🇭 Thai (ภาษาไทย)</button>
        <button class="htet-btn ${this.targetLang === 'my' ? 'htet-btn-primary' : 'htet-btn-outline'}" onclick="app.setTargetLang('my'); app.closeModal();">🇲🇲 Burmese (မြန်မာဘာသာ)</button>
        <button class="htet-btn ${this.targetLang === 'fr' ? 'htet-btn-primary' : 'htet-btn-outline'}" onclick="app.setTargetLang('fr'); app.closeModal();">🇫🇷 French (Français)</button>
        <button class="htet-btn ${this.targetLang === 'de' ? 'htet-btn-primary' : 'htet-btn-outline'}" onclick="app.setTargetLang('de'); app.closeModal();">🇩🇪 German (Deutsch)</button>
        <button class="htet-btn ${this.targetLang === 'ko' ? 'htet-btn-primary' : 'htet-btn-outline'}" onclick="app.setTargetLang('ko'); app.closeModal();">🇰🇷 Korean (한국어)</button>
      </div>
    `;
    this.openModal(html);
  }

  // ========================================================================
  // 7. STUDIO LESSON RUNNER (EXERCISES, SOUNDS & XP)
  // ========================================================================
  startStudioLesson(unitId, levelId) {
    const cur = window.HTET_CURRICULUM[this.targetLang] || window.HTET_CURRICULUM.ja;
    const unit = cur.units.find(u => u.id === unitId);
    const level = unit?.levels.find(l => l.id === levelId);
    if (!level) return;

    this.activeLesson = { unitId, levelId, level };
    this.questionIndex = 0;
    this.selectedChoice = null;
    this.placedWords = [];
    this.selectedMatchA = null;
    this.selectedMatchB = null;
    this.matchedPairs = [];
    this.isAnswerChecked = false;
    this.isAnswerCorrect = false;

    this.renderStudioLessonStep();
  }

  renderStudioLessonStep() {
    const viewport = document.getElementById('mainViewport');
    if (!viewport || !this.activeLesson) return;

    const questions = this.activeLesson.level.questions;
    if (this.questionIndex >= questions.length) {
      this.finishStudioLesson();
      return;
    }

    const q = questions[this.questionIndex];
    const progressPct = ((this.questionIndex) / questions.length) * 100;

    let bodyHtml = '';
    const qType = q.type || (q.options ? 'multiple_choice' : q.words || q.wordBank ? 'sentence_build' : 'match_pairs');
    if (qType === 'multiple_choice' || qType === 'choice') {
      bodyHtml = this.renderMultipleChoiceStep(q);
    } else if (qType === 'sentence_build' || qType === 'word_bank') {
      bodyHtml = this.renderSentenceBuildStep(q);
    } else if (qType === 'match_pairs' || qType === 'match') {
      bodyHtml = this.renderMatchPairsStep(q);
    }

    viewport.innerHTML = `
      <div class="studio-lesson-container">
        <!-- Top Studio Lesson Bar -->
        <div class="studio-lesson-bar">
          <button class="studio-quit-btn" onclick="app.quitStudioLesson()" title="Exit Lesson">✕</button>
          <div class="studio-progress-track">
            <div class="studio-progress-fill" style="width: ${progressPct}%;"></div>
          </div>
          <div style="font-weight: 800; font-size: 0.88rem; color: #10b981;">⚡ ${this.energy}%</div>
        </div>

        <!-- Question Body -->
        <div class="studio-body-wrap">
          <div class="studio-prompt-card">
            <span class="mascot-blossom">🌸</span>
            <div class="prompt-speech-bubble">
              <span>${q.prompt}</span>
              ${q.audioText ? `
                <button class="htet-audio-btn" style="width: 38px; height: 38px; font-size: 1.1rem;" 
                        onclick="app.speakCurrent('${q.audioText.replace(/'/g, "\\'")}', '${this.targetLang}')">
                  🔊
                </button>
              ` : ''}
            </div>
          </div>

          ${bodyHtml}
        </div>

        <!-- Bottom Feedback Drawer -->
        <div id="studioBottomDrawer" class="studio-feedback-drawer">
          <div class="feedback-text-wrap" id="studioFeedbackContent">
            <!-- Populated on check -->
          </div>
          <button id="studioActionBtn" class="htet-btn htet-btn-primary" onclick="app.handleStudioAction()">
            CHECK
          </button>
        </div>
      </div>
    `;

    this.updateStudioActionButton();
  }

  renderMultipleChoiceStep(q) {
    const choicesHtml = q.options.map((opt, idx) => {
      const isSelected = this.selectedChoice === idx;
      return `
        <div class="studio-choice-item ${isSelected ? 'selected' : ''}" onclick="app.selectChoiceByIndex(${idx})">
          <span class="choice-key-badge">${idx + 1}</span>
          <span>${opt}</span>
        </div>
      `;
    }).join('');

    return `<div class="studio-choices-grid">${choicesHtml}</div>`;
  }

  renderSentenceBuildStep(q) {
    const placedChips = this.placedWords.map((word, idx) => `
      <button class="vocab-chip-btn" onclick="app.removePlacedWord(${idx})">${word}</button>
    `).join('');

    const bankWords = q.wordBank || q.words || [];
    const bankChips = bankWords.map((word, idx) => {
      const usedCount = this.placedWords.filter(w => w === word).length;
      const totalInBankBefore = bankWords.slice(0, idx).filter(w => w === word).length;
      const isUsed = usedCount > totalInBankBefore;
      return `
        <button class="vocab-chip-btn ${isUsed ? 'used' : ''}" 
                onclick="app.placeBankWord('${word.replace(/'/g, "\\'")}')" 
                ${isUsed ? 'disabled' : ''}>
          ${word}
        </button>
      `;
    }).join('');

    return `
      <div>
        <div class="assembly-target-slot">${placedChips || '<span style="color: var(--text-muted); font-size: 0.92rem;">Tap words below to build sentence</span>'}</div>
        <div class="assembly-chips-bank">${bankChips}</div>
      </div>
    `;
  }

  renderMatchPairsStep(q) {
    const pairs = q.pairs || [];
    const cardsHtml = pairs.map((p, idx) => {
      const targetVal = p.target || p.a || '';
      const isMatched = this.matchedPairs.includes(targetVal);
      const isSelected = this.selectedMatchA === idx;
      return `
        <button class="pair-card-cell ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                onclick="app.selectMatchA(${idx})"
                ${isMatched ? 'disabled' : ''}>
          ${targetVal}
        </button>
      `;
    }).join('');

    const meaningsHtml = pairs.map((p, idx) => {
      const targetVal = p.target || p.a || '';
      const myVal = p.my || p.b || '';
      const isMatched = this.matchedPairs.includes(targetVal);
      const isSelected = this.selectedMatchB === idx;
      return `
        <button class="pair-card-cell ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                onclick="app.selectMatchB(${idx})"
                ${isMatched ? 'disabled' : ''}>
          ${myVal}
        </button>
      `;
    }).join('');

    return `
      <div class="pairing-cards-grid">
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">${cardsHtml}</div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">${meaningsHtml}</div>
      </div>
    `;
  }

  selectChoiceByIndex(idx) {
    if (this.isAnswerChecked) return;
    this.selectedChoice = idx;
    this.renderStudioLessonStep();
  }

  placeBankWord(word) {
    if (this.isAnswerChecked) return;
    this.placedWords.push(word);
    this.renderStudioLessonStep();
  }

  removePlacedWord(idx) {
    if (this.isAnswerChecked) return;
    this.placedWords.splice(idx, 1);
    this.renderStudioLessonStep();
  }

  selectMatchA(idx) {
    if (this.isAnswerChecked) return;
    this.selectedMatchA = idx;
    this.checkPairMatch();
  }

  selectMatchB(idx) {
    if (this.isAnswerChecked) return;
    this.selectedMatchB = idx;
    this.checkPairMatch();
  }

  checkPairMatch() {
    if (this.selectedMatchA !== null && this.selectedMatchB !== null) {
      const q = this.activeLesson.level.questions[this.questionIndex];
      const targetVal = q.pairs?.[this.selectedMatchA]?.target || q.pairs?.[this.selectedMatchA]?.a || '';
      if (this.selectedMatchA === this.selectedMatchB) {
        this.matchedPairs.push(targetVal);
        if (window.htetSound) window.htetSound.playDing();
      } else {
        if (window.htetSound) window.htetSound.playBuzz();
      }
      this.selectedMatchA = null;
      this.selectedMatchB = null;
      this.renderStudioLessonStep();
    } else {
      this.renderStudioLessonStep();
    }
  }

  updateStudioActionButton() {
    const btn = document.getElementById('studioActionBtn');
    if (!btn || !this.activeLesson) return;

    const q = this.activeLesson.level.questions[this.questionIndex];
    if (this.isAnswerChecked) {
      btn.textContent = 'CONTINUE →';
      btn.className = this.isAnswerCorrect ? 'htet-btn htet-btn-success' : 'htet-btn htet-btn-primary';
      btn.disabled = false;
    } else {
      btn.textContent = 'CHECK';
      btn.className = 'htet-btn htet-btn-primary';
      const qType = q.type || (q.options ? 'multiple_choice' : q.words || q.wordBank ? 'sentence_build' : 'match_pairs');
      if (qType === 'multiple_choice' || qType === 'choice') {
        btn.disabled = this.selectedChoice === null;
      } else if (qType === 'sentence_build' || qType === 'word_bank') {
        btn.disabled = this.placedWords.length === 0;
      } else if (qType === 'match_pairs' || qType === 'match') {
        btn.disabled = this.matchedPairs.length !== (q.pairs?.length || 0);
      }
    }
  }

  handleStudioAction() {
    if (!this.activeLesson) return;

    if (this.isAnswerChecked) {
      this.questionIndex += 1;
      this.selectedChoice = null;
      this.placedWords = [];
      this.selectedMatchA = null;
      this.selectedMatchB = null;
      this.matchedPairs = [];
      this.isAnswerChecked = false;
      this.isAnswerCorrect = false;
      this.renderStudioLessonStep();
      return;
    }

    const q = this.activeLesson.level.questions[this.questionIndex];
    let isCorrect = false;
    const qType = q.type || (q.options ? 'multiple_choice' : q.words || q.wordBank ? 'sentence_build' : 'match_pairs');

    if (qType === 'multiple_choice' || qType === 'choice') {
      const targetCorrect = q.correct !== undefined ? q.correct : q.correctIndex;
      isCorrect = this.selectedChoice === targetCorrect;
    } else if (qType === 'sentence_build' || qType === 'word_bank') {
      const sep = (this.targetLang === 'ja' || this.targetLang === 'zh') ? '' : ' ';
      const built = this.placedWords.join(sep);
      const expected = q.correct || (Array.isArray(q.targetSentence) ? q.targetSentence.join(sep) : '');
      isCorrect = built.trim() === expected.trim();
    } else if (qType === 'match_pairs' || qType === 'match') {
      isCorrect = this.matchedPairs.length === (q.pairs?.length || 0);
    }

    this.isAnswerChecked = true;
    this.isAnswerCorrect = isCorrect;

    const drawer = document.getElementById('studioBottomDrawer');
    const content = document.getElementById('studioFeedbackContent');

    if (drawer && content) {
      if (isCorrect) {
        drawer.className = 'studio-feedback-drawer drawer-success';
        content.innerHTML = `
          <div class="feedback-headline"><span>✓</span> <span>Brilliant! Exactly right!</span></div>
          <div class="feedback-explanation">+10 Bloom XP • Keep shining 🌸</div>
        `;
        if (window.htetSound) window.htetSound.playCorrect();
        this.xp += 10;
        localStorage.setItem('htetlingo_xp', this.xp);
      } else {
        drawer.className = 'studio-feedback-drawer drawer-incorrect';
        content.innerHTML = `
          <div class="feedback-headline"><span>✕</span> <span>Not quite there</span></div>
          <div class="feedback-explanation">${q.explanation || q.tip || 'Review the correct phrasing and try again.'}</div>
        `;
        if (window.htetSound) window.htetSound.playIncorrect();
      }
    }

    this.updateStatusHeader();
    this.updateStudioActionButton();
  }

  finishStudioLesson() {
    const lvlId = this.activeLesson.levelId;
    if (!this.completedLevels.includes(lvlId)) {
      this.completedLevels.push(lvlId);
      localStorage.setItem('htetlingo_completed_levels', JSON.stringify(this.completedLevels));
    }

    this.xp += 25;
    localStorage.setItem('htetlingo_xp', this.xp);
    if (window.htetSound) window.htetSound.playFanfare();

    const viewport = document.getElementById('mainViewport');
    if (viewport) {
      viewport.innerHTML = `
        <div style="max-width: 500px; margin: 3rem auto; padding: 2rem 1.5rem; text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 0.5rem;">🌸</div>
          <h2 style="font-size: 2rem; font-weight: 900; color: var(--rose-primary);">Lesson Completed!</h2>
          <p style="font-size: 1.05rem; color: var(--text-main); margin: 0.5rem 0 1.5rem;">
            You mastered this lesson with grace and perseverance.
          </p>
          <div style="background: var(--bg-card); border: 2px solid var(--border-color); border-radius: 20px; padding: 1.25rem; display: flex; justify-content: space-around; margin-bottom: 2rem;">
            <div>
              <div style="font-size: 1.6rem; font-weight: 900; color: #f43f5e;">+35</div>
              <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">TOTAL XP</div>
            </div>
            <div>
              <div style="font-size: 1.6rem; font-weight: 900; color: #10b981;">100%</div>
              <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">ACCURACY</div>
            </div>
          </div>
          <button class="htet-btn htet-btn-primary" style="width: 100%;" onclick="app.exitStudioToRoadmap()">
            CONTINUE ROADMAP 🌸
          </button>
        </div>
      `;
    }

    this.activeLesson = null;
    this.updateStatusHeader();
  }

  quitStudioLesson() {
    if (confirm('Leave lesson? Your progress for this session will not be saved.')) {
      this.activeLesson = null;
      this.renderLearnView(document.getElementById('mainViewport'));
    }
  }

  exitStudioToRoadmap() {
    this.activeLesson = null;
    this.renderLearnView(document.getElementById('mainViewport'));
  }

  speakCurrent(text, lang) {
    if (window.htetSpeech) {
      window.htetSpeech.speak(text, lang);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    }
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('color-scheme', next);
    try {
      document.querySelector('meta[name="color-scheme"]').content = next;
    } catch (e) {}
  }

  checkNetworkState() {
    const banner = document.getElementById('offlineBanner');
    if (!banner) return;
    const update = () => {
      if (!navigator.onLine) {
        banner.style.display = 'block';
        banner.textContent = '⚡ Offline Mode Active — All core datasets & learning cached locally.';
      } else {
        banner.style.display = 'none';
      }
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }
}

function startApp() {
  if (!window.app) {
    try {
      window.app = new HtetLingoApp();
    } catch (e) {
      console.error('App init error:', e);
      const viewport = document.getElementById('mainViewport');
      if (viewport) {
        viewport.innerHTML = `
          <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--rose-primary);">
            <h2>🌸 Welcome to HtetLingo</h2>
            <p>Initializing Learning Studio... Please refresh.</p>
          </div>
        `;
      }
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
