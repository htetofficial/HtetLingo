// HtetLingo Core Application Controller
// Cute & Feminist Empowerment Platform for Women & Girls
// Spaced Repetition, Speech Synthesis, Supabase & RevenueCat

class HtetLingoApp {
  constructor() {
    this.currentTab = 'home';
    this.targetLang = localStorage.getItem('htetlingo_target_lang') || 'ja';
    this.nativeLang = localStorage.getItem('htetlingo_native_lang') || 'my';
    this.currentCardIndex = 0;
    this.filteredVocab = [];
    this.currentCategory = 'all';
    this.currentQuiz = null;
    this.quizIndex = 0;
    this.quizScore = 0;

    this.engMyanCache = null;
    this.femaleNamesCache = null;
    this.loadExternalDatasets();
    this.userStats = {
      xp: parseInt(localStorage.getItem('htetlingo_xp') || '150', 10),
      streak: parseInt(localStorage.getItem('htetlingo_streak') || '5', 10),
      mastered: parseInt(localStorage.getItem('htetlingo_mastered') || '24', 10)
    };

    this.init();
  }

  async init() {
    this.bindEvents();
    this.filterVocab('all');
    this.updateStatsUI();
    this.renderCurrentTab();
    this.checkOnlineStatus();

    // Check service worker registration
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
        console.log('[HtetLingo] Cute Feminist Service Worker Registered');
      } catch (e) {
        console.log('[HtetLingo] Service Worker registration note:', e);
      }
    }
  }

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Theme Toggle handling compliant with modern-web-guidance
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Language Selector
    const langBtn = document.getElementById('langSelectorBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.openLanguageModal());
    }

    // Online / Offline events
    window.addEventListener('online', () => this.checkOnlineStatus());
    window.addEventListener('offline', () => this.checkOnlineStatus());
  }

  checkOnlineStatus() {
    const banner = document.getElementById('offlineBanner');
    if (!banner) return;
    if (navigator.onLine) {
      banner.style.display = 'none';
    } else {
      banner.style.display = 'flex';
      banner.innerHTML = '<span>🌸 100% Offline Mode Active — Sisterhood lessons, flashcards & dictionary always ready!</span>';
    }
  }

  toggleTheme() {
    const metaTheme = document.querySelector('meta[name="color-scheme"]');
    if (!metaTheme) return;

    const currentSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentExplicit = localStorage.getItem('color-scheme');

    let currentEffective = currentExplicit || (currentSystemDark ? 'dark' : 'light');
    let nextTheme = currentEffective === 'dark' ? 'light' : 'dark';

    // If next equals system, remove stored value to revert to system
    if ((nextTheme === 'dark' && currentSystemDark) || (nextTheme === 'light' && !currentSystemDark)) {
      localStorage.removeItem('color-scheme');
      metaTheme.content = 'light dark';
    } else {
      localStorage.setItem('color-scheme', nextTheme);
      metaTheme.content = nextTheme;
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.nav-tab-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    this.renderCurrentTab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterVocab(category = 'all') {
    this.currentCategory = category;
    const all = window.HTET_DATA.vocabulary;
    if (category === 'all') {
      this.filteredVocab = all;
    } else {
      this.filteredVocab = all.filter(v => v.category === category);
    }
    this.currentCardIndex = 0;
  }

  updateStatsUI() {
    const xpEl = document.getElementById('statXp');
    const streakEl = document.getElementById('statStreak');
    const masteredEl = document.getElementById('statMastered');
    const headerStreakEl = document.getElementById('headerStreak');

    if (xpEl) xpEl.textContent = this.userStats.xp;
    if (streakEl) streakEl.textContent = `${this.userStats.streak} Days`;
    if (masteredEl) masteredEl.textContent = this.userStats.mastered;
    if (headerStreakEl) headerStreakEl.textContent = `💖 ${this.userStats.streak}d`;

    localStorage.setItem('htetlingo_xp', this.userStats.xp);
    localStorage.setItem('htetlingo_streak', this.userStats.streak);
    localStorage.setItem('htetlingo_mastered', this.userStats.mastered);
  }

  awardXP(amount) {
    this.userStats.xp += amount;
    this.updateStatsUI();
  }

  speakCurrent(text, lang = null) {
    window.htetSpeech.speak(text, lang || this.targetLang);
  }

  // --- View Renderers ---
  renderCurrentTab() {
    const viewport = document.getElementById('mainViewport');
    if (!viewport) return;

    switch (this.currentTab) {
      case 'home':
        this.renderHomeView(viewport);
        break;
      case 'vocab':
        this.renderVocabView(viewport);
        break;
      case 'grammar':
        this.renderGrammarView(viewport);
        break;
      case 'quiz':
        this.renderQuizView(viewport);
        break;
      case 'dict':
        this.renderDictView(viewport);
        break;
      case 'names':
        this.renderFemaleNamesView(viewport);
        break;
      case 'translate':
        this.renderTranslateView(viewport);
        break;
      case 'aitutor':
        this.renderAITutorView(viewport);
        break;
      case 'pricing':
        this.renderPricingView(viewport);
        break;
      case 'settings':
        this.renderSettingsView(viewport);
        break;
      default:
        this.renderHomeView(viewport);
    }
  }

  // 1. Home Dashboard View
  renderHomeView(container) {
    const targetObj = window.HTET_DATA.languages.find(l => l.code === this.targetLang) || window.HTET_DATA.languages[2];
    const isPremium = window.htetRevenueCat.isPremium();
    const affirmation = window.HTET_DATA.dailyAffirmations[Math.floor(Math.random() * window.HTET_DATA.dailyAffirmations.length)];

    container.innerHTML = `
      <!-- Daily Affirmation Card -->
      <div class="affirmation-banner">
        <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--sakura-pink); margin-bottom: 0.25rem;">
          ✨ Daily Sisterhood Affirmation
        </div>
        <div class="affirmation-quote">"${affirmation.quote}"</div>
        <div style="font-size: 0.9rem; color: var(--text-main); font-weight: 600; margin-bottom: 0.35rem;">
          ${affirmation.quoteMy}
        </div>
        <div class="affirmation-author">— ${affirmation.author}</div>
      </div>

      <!-- Main Cute Feminist Hero Card -->
      <div class="hero-card">
        <div class="hero-tagline">🌸 Learn Languages • Empower Your Voice • Connect Cultures</div>
        <h1 class="hero-title">Shine & Speak Confidently in ${targetObj.name} ${targetObj.flag}</h1>
        <p class="hero-desc">
          A cute, feminist multilingual platform empowering women and girls worldwide to learn, speak, and lead with pride and authentic confidence.
        </p>
        
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="pill-btn" onclick="app.switchTab('vocab')" style="background: #ffffff; color: #f43f5e; border: none; font-weight: 800;">
            🌸 Start Flashcards
          </button>
          <button class="pill-btn" onclick="app.switchTab('aitutor')" style="background: rgba(255,255,255,0.25); color: #ffffff; border: 1.5px solid rgba(255,255,255,0.6);">
            🤖 Safe Space AI Tutor
          </button>
          ${!isPremium ? `
            <button class="pill-btn" onclick="app.switchTab('pricing')" style="background: #fde047; color: #831843; border: none; font-weight: 800;">
              👑 Upgrade VIP Pass
            </button>
          ` : `
            <span class="pill-btn" style="background: #10b981; color: white; border: none;">
              ⭐ VIP Active
            </span>
          `}
        </div>

        <div class="hero-stats">
          <div class="stat-box">
            <div class="stat-val" id="statStreak">${this.userStats.streak} Days</div>
            <div class="stat-lbl">Sisterhood Streak</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" id="statXp">${this.userStats.xp}</div>
            <div class="stat-lbl">Empowerment XP</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" id="statMastered">${this.userStats.mastered}</div>
            <div class="stat-lbl">Mastered Words</div>
          </div>
          <div class="stat-box">
            <div class="stat-val">${isPremium ? '👑 VIP' : '🌸 Free'}</div>
            <div class="stat-lbl">Learner Status</div>
          </div>
        </div>
      </div>

      <!-- Learning Categories Grid -->
      <h3 style="font-size: 1.2rem; font-weight: 900; margin: 1.75rem 0 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
        <span>🎀 Women-Centered Learning Categories</span>
      </h3>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        
        <div class="card" onclick="app.filterVocab('feminism'); app.switchTab('vocab');" style="cursor: pointer;">
          <div class="card-header">
            <div class="card-title">🌸 Feminism & Equality</div>
            <span style="font-size: 0.75rem; background: var(--rose-light); color: var(--rose-primary); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 800;">Rights</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Empowerment, bodily autonomy, consent, gender equality, and sisterhood solidarity across 8 languages.
          </p>
          <div style="font-size: 0.85rem; color: var(--rose-primary); font-weight: 700;">Explore Vocabulary →</div>
        </div>

        <div class="card" onclick="app.filterVocab('affirmations'); app.switchTab('vocab');" style="cursor: pointer;">
          <div class="card-header">
            <div class="card-title">💖 Self-Love & Confidence</div>
            <span style="font-size: 0.75rem; background: var(--sakura-light); color: var(--sakura-pink); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 800;">Affirmations</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Daily affirmations to build unshakeable self-worth, courage, and pride in your authentic identity.
          </p>
          <div style="font-size: 0.85rem; color: var(--rose-primary); font-weight: 700;">Start Affirmations →</div>
        </div>

        <div class="card" onclick="app.filterVocab('leadership'); app.switchTab('vocab');" style="cursor: pointer;">
          <div class="card-header">
            <div class="card-title">💼 Leadership & STEM</div>
            <span style="font-size: 0.75rem; background: var(--lavender-light); color: var(--lavender); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 800;">Career</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Assertive communication, salary negotiation, pitching innovative ideas without over-apologizing.
          </p>
          <div style="font-size: 0.85rem; color: var(--rose-primary); font-weight: 700;">Practice Leadership Words →</div>
        </div>

        <div class="card" onclick="app.filterVocab('safety'); app.switchTab('vocab');" style="cursor: pointer;">
          <div class="card-header">
            <div class="card-title">✈️ Solo Female Safety</div>
            <span style="font-size: 0.75rem; background: #dcfce7; color: #166534; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 800;">Travel</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Essential phrases for solo travel: asking for women-only train cars, setting personal boundaries, and emergency help.
          </p>
          <div style="font-size: 0.85rem; color: var(--rose-primary); font-weight: 700;">Review Safety Phrases →</div>
        </div>

      </div>
    `;
  }

  // 2. Vocabulary & Flashcard View
  renderVocabView(container) {
    if (!this.filteredVocab.length) this.filterVocab('all');
    const item = this.filteredVocab[this.currentCardIndex] || window.HTET_DATA.vocabulary[0];
    const targetData = item.translations[this.targetLang] || item.translations['en'];
    const nativeData = item.translations[this.nativeLang] || item.translations['my'] || item.translations['en'];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 900;">🌸 Empowerment Flashcards</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Card ${this.currentCardIndex + 1} of ${this.filteredVocab.length}</p>
        </div>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
          <button class="pill-btn ${this.currentCategory === 'all' ? 'active' : ''}" onclick="app.filterVocab('all'); app.renderCurrentTab();">All</button>
          <button class="pill-btn ${this.currentCategory === 'feminism' ? 'active' : ''}" onclick="app.filterVocab('feminism'); app.renderCurrentTab();">🌸 Feminism</button>
          <button class="pill-btn ${this.currentCategory === 'affirmations' ? 'active' : ''}" onclick="app.filterVocab('affirmations'); app.renderCurrentTab();">💖 Self-Love</button>
          <button class="pill-btn ${this.currentCategory === 'leadership' ? 'active' : ''}" onclick="app.filterVocab('leadership'); app.renderCurrentTab();">💼 Leadership</button>
          <button class="pill-btn ${this.currentCategory === 'safety' ? 'active' : ''}" onclick="app.filterVocab('safety'); app.renderCurrentTab();">✈️ Safety</button>
        </div>
      </div>

      <div class="flashcard-wrapper">
        <div class="flashcard" id="activeFlashcard" onclick="this.classList.toggle('flipped');">
          <span class="flashcard-category">✨ ${item.category.toUpperCase()} • ${item.level}</span>
          
          <div class="flashcard-word">${targetData.word}</div>
          <div class="flashcard-phonetic">${targetData.phonetic || ''}</div>

          <div style="display: flex; gap: 0.5rem; justify-content: center; margin: 0.5rem 0;">
            <button class="icon-btn" onclick="event.stopPropagation(); app.speakCurrent('${targetData.word.replace(/'/g, "\\'")}', '${this.targetLang}');" title="Listen to pronunciation">
              🔊 Pronounce
            </button>
            <button class="icon-btn" onclick="event.stopPropagation(); app.bookmarkWord('${item.id}');" title="Bookmark">
              💖 Save
            </button>
          </div>

          <div class="flashcard-translation">
            ${nativeData.word}
          </div>

          <div class="flashcard-example">
            "${targetData.example}"<br/>
            <span style="font-size: 0.85rem; color: var(--text-muted);">(${nativeData.example || ''})</span>
          </div>

          <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--text-dim); font-weight: 700;">
            🌸 Tap card to toggle details
          </div>
        </div>
      </div>

      <!-- Spaced Repetition Rating Buttons -->
      <div class="srs-controls">
        <button class="srs-btn again" onclick="app.rateCard('again')">
          <span>Again</span>
          <span style="font-size: 0.7rem; opacity: 0.9;">1 Day</span>
        </button>
        <button class="srs-btn hard" onclick="app.rateCard('hard')">
          <span>Hard</span>
          <span style="font-size: 0.7rem; opacity: 0.9;">2 Days</span>
        </button>
        <button class="srs-btn good" onclick="app.rateCard('good')">
          <span>Good</span>
          <span style="font-size: 0.7rem; opacity: 0.9;">4 Days</span>
        </button>
        <button class="srs-btn easy" onclick="app.rateCard('easy')">
          <span>Easy</span>
          <span style="font-size: 0.7rem; opacity: 0.9;">7 Days</span>
        </button>
      </div>
    `;
  }

  async rateCard(rating) {
    const item = this.filteredVocab[this.currentCardIndex];
    if (item) {
      await window.htetDB.updateSRSProgress(item.id, this.targetLang, rating);
      this.awardXP(rating === 'easy' ? 10 : (rating === 'good' ? 5 : 2));
    }

    this.currentCardIndex = (this.currentCardIndex + 1) % this.filteredVocab.length;
    this.renderCurrentTab();
  }

  async bookmarkWord(itemId) {
    const item = this.filteredVocab.find(v => v.id === itemId);
    if (!item) return;
    const targetData = item.translations[this.targetLang];
    const nativeData = item.translations[this.nativeLang];

    await window.htetDB.addBookmark({
      language: this.targetLang,
      word: targetData.word,
      phonetic: targetData.phonetic,
      translation: nativeData.word,
      example: targetData.example
    });
    alert(`💖 "${targetData.word}" saved to your personal sisterhood vocabulary collection!`);
  }

  // 3. Grammar Modules View
  renderGrammarView(container) {
    const lessons = window.HTET_DATA.grammar;

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; font-weight: 900;">✍️ Empowered Grammar Guides</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Speak with poise and leadership without undermining yourself. Clear Burmese & English explanations.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${lessons.map(g => `
          <div class="card">
            <div class="card-header">
              <div>
                <span style="font-size: 0.75rem; background: var(--rose-light); color: var(--rose-primary); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 800; text-transform: uppercase;">
                  ${g.level}
                </span>
                <h3 style="font-size: 1.2rem; font-weight: 800; margin-top: 0.4rem;">${g.title}</h3>
              </div>
              <button class="icon-btn" onclick="app.speakCurrent('${g.examples[0].target.replace(/'/g, "\\'")}', '${g.language}')">
                🔊 Listen
              </button>
            </div>

            <div style="background: var(--bg-card-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-md); font-family: monospace; font-size: 0.9rem; font-weight: 700; color: var(--rose-primary); margin-bottom: 0.85rem; border-left: 3.5px solid var(--rose-primary);">
              Formula: ${g.formula}
            </div>

            <div style="margin-bottom: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
              <strong>မြန်မာလို ရှင်းလင်းချက်:</strong> ${g.burmeseExplanation}
            </div>

            <div style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
              <strong>English Guide:</strong> ${g.englishExplanation}
            </div>

            <div style="background: var(--bg-main); border: 1.5px solid var(--border-color); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 0.75rem;">
              <div style="font-weight: 800; font-size: 0.85rem; margin-bottom: 0.4rem; color: var(--sakura-pink);">💡 Empowered Examples:</div>
              ${g.examples.map(ex => `
                <div style="margin-bottom: 0.5rem; font-size: 0.92rem;">
                  <div style="font-weight: 700;">${ex.target}</div>
                  <div style="font-size: 0.82rem; color: var(--text-muted);">${ex.meaningMy} • ${ex.meaningEn}</div>
                </div>
              `).join('')}
            </div>

            <div style="font-size: 0.82rem; color: #9f1239; background: var(--rose-light); padding: 0.45rem 0.85rem; border-radius: var(--radius-sm); font-weight: 600;">
              🌸 Cultural & Sisterhood Tip: ${g.culturalTip}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 4. Quizzes & Exercises View
  renderQuizView(container) {
    const quizzes = window.HTET_DATA.quizzes;
    const q = quizzes[this.quizIndex % quizzes.length];

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 900;">🎯 Sisterhood Practice Quiz</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Question ${this.quizIndex + 1} of ${quizzes.length} • Score: ${this.quizScore}</p>
        </div>
        <div style="font-size: 0.9rem; font-weight: 800; color: #e11d48; background: var(--rose-light); padding: 0.35rem 0.85rem; border-radius: var(--radius-full);">
          +20 XP per correct ✨
        </div>
      </div>

      <div class="quiz-question-box">
        <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--rose-primary); margin-bottom: 0.5rem;">
          🌸 ${q.topic} • ${q.type.toUpperCase()}
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1rem;">${q.question}</h3>

        ${q.type === 'listening' ? `
          <div style="margin-bottom: 1.25rem;">
            <button class="pill-btn" onclick="app.speakCurrent('${q.audioText}', '${q.language}')" style="background: var(--rose-primary); color: white; border: none; font-size: 1rem; padding: 0.65rem 1.35rem;">
              🔊 Click to Listen to Native Audio
            </button>
          </div>
        ` : ''}

        <div style="display: flex; flex-direction: column; gap: 0.6rem;" id="quizOptionsContainer">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option" onclick="app.checkAnswer(${idx})">
              <span>${opt}</span>
              <span class="quiz-check-icon"></span>
            </button>
          `).join('')}
        </div>

        <div id="quizFeedback" style="display: none; margin-top: 1rem; padding: 0.85rem 1.15rem; border-radius: var(--radius-md);"></div>

        <div style="margin-top: 1.25rem; display: flex; justify-content: flex-end;">
          <button id="nextQuizBtn" class="pill-btn" style="display: none; background: var(--rose-primary); color: white; border: none; padding: 0.65rem 1.35rem;" onclick="app.nextQuizQuestion()">
            Next Question →
          </button>
        </div>
      </div>
    `;
  }

  checkAnswer(selectedIndex) {
    const quizzes = window.HTET_DATA.quizzes;
    const q = quizzes[this.quizIndex % quizzes.length];
    const isCorrect = selectedIndex === q.answerIndex;

    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, idx) => {
      opt.disabled = true;
      if (idx === q.answerIndex) {
        opt.classList.add('correct');
      } else if (idx === selectedIndex) {
        opt.classList.add('wrong');
      }
    });

    const feedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('nextQuizBtn');

    if (feedback) {
      feedback.style.display = 'block';
      if (isCorrect) {
        this.quizScore += 1;
        this.awardXP(20);
        feedback.style.background = 'rgba(16, 185, 129, 0.15)';
        feedback.style.color = 'var(--mint-soft)';
        feedback.innerHTML = `<strong>🎉 Wonderful, sister! (+20 XP)</strong><br/><span style="font-size: 0.88rem; color: var(--text-main);">${q.explanation}</span>`;
      } else {
        feedback.style.background = 'rgba(244, 63, 94, 0.15)';
        feedback.style.color = 'var(--rose-primary)';
        feedback.innerHTML = `<strong>🌸 Learning moment:</strong><br/><span style="font-size: 0.88rem; color: var(--text-main);">${q.explanation}</span>`;
      }
    }

    if (nextBtn) nextBtn.style.display = 'inline-block';
  }

  nextQuizQuestion() {
    this.quizIndex += 1;
    this.renderCurrentTab();
  }

  // 5. Multilingual Dictionary View (EMDictionary & Open Source Lexicon)
  renderDictView(container) {
    const dict = window.HTET_DATA.dictionary;

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 900;">📖 Multilingual Dictionary</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Cross-referenced with EMDictionary (21,984 entries) and Lexiverse datasets.
          </p>
        </div>
        <button class="pill-btn" onclick="app.renderFemaleNamesView(document.getElementById('mainViewport'))" style="background: var(--sakura-light); color: var(--sakura-pink); border-color: var(--sakura-pink);">
          🌸 Female Names & Meanings
        </button>
      </div>

      <div class="search-input-group">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="dictSearchInput" class="search-input" placeholder="Search words in English, Burmese, Japanese, Chinese..." oninput="app.searchDict(this.value)">
      </div>

      <div id="dictResultsList" style="display: flex; flex-direction: column; gap: 1rem;">
        ${dict.map(item => this.formatDictEntry(item)).join('')}
      </div>
    `;
  }

  formatDictEntry(item) {
    return `
      <div class="card">
        <div class="card-header">
          <div>
            <span style="font-size: 0.75rem; background: var(--rose-light); color: var(--rose-primary); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 800; text-transform: uppercase;">
              ${item.pos}
            </span>
            <h3 style="font-size: 1.3rem; font-weight: 900; margin-top: 0.3rem;">
              ${item.term} <span style="font-size: 0.95rem; font-weight: 600; color: var(--lavender); font-family: monospace;">${item.ipa}</span>
            </h3>
          </div>
          <button class="icon-btn" onclick="app.speakCurrent('${item.term}', 'en')">
            🔊 Speak
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem; margin-bottom: 0.85rem; font-size: 0.88rem;">
          <div style="background: var(--bg-card-subtle); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <strong>🇲🇲 မြန်မာ:</strong> ${item.translations.my}
          </div>
          <div style="background: var(--bg-card-subtle); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <strong>🇯🇵 日本語:</strong> ${item.translations.ja}
          </div>
          <div style="background: var(--bg-card-subtle); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <strong>🇨🇳 中文:</strong> ${item.translations.zh}
          </div>
          <div style="background: var(--bg-card-subtle); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <strong>🇹🇭 ภาษาไทย:</strong> ${item.translations.th}
          </div>
        </div>

        <div style="font-size: 0.88rem; color: var(--text-dim); font-style: italic; border-left: 3px solid var(--rose-primary); padding-left: 0.6rem;">
          Example: "${item.example}"
        </div>
      </div>
    `;
  }

  async loadExternalDatasets() {
    try {
      const [emRes, fnRes, eeRes, kwRes] = await Promise.all([
        fetch('./data/eng_myan_quick.json').catch(() => null),
        fetch('./data/female_names.json').catch(() => null),
        fetch('./data/eng_eng_quick.json').catch(() => null),
        fetch('./data/karen_words.json').catch(() => null)
      ]);
      if (emRes && emRes.ok) this.engMyanCache = await emRes.json();
      if (fnRes && fnRes.ok) this.femaleNamesCache = await fnRes.json();
      if (eeRes && eeRes.ok) this.engEngCache = await eeRes.json();
      if (kwRes && kwRes.ok) this.karenCache = await kwRes.json();
      console.log('[HtetLingo] Datasets preloaded into offline memory cache');
    } catch(e) {}
  }

  async searchDict(query) {
    const list = document.getElementById('dictResultsList');
    if (!list) return;
    const q = query.toLowerCase().trim();
    if (!q) {
      list.innerHTML = window.HTET_DATA.dictionary.map(item => this.formatDictEntry(item)).join('');
      return;
    }

    // 1. In-memory curated matches
    let resultsHtml = '';
    const curatedMatches = window.HTET_DATA.dictionary.filter(item => {
      if (item.term.toLowerCase().includes(q)) return true;
      if (item.translations.my.includes(q)) return true;
      if (item.translations.ja && item.translations.ja.toLowerCase().includes(q)) return true;
      if (item.translations.zh && item.translations.zh.toLowerCase().includes(q)) return true;
      return false;
    });

    if (curatedMatches.length) {
      resultsHtml += curatedMatches.map(item => this.formatDictEntry(item)).join('');
    }

    // 2. Query EMDictionary database (from soeminnminn/EngMyanDictionary-MAC)
    if (!this.engMyanCache) {
      await this.loadExternalDatasets();
    }

    if (this.engMyanCache && this.engMyanCache.length) {
      const emMatches = this.engMyanCache.filter(item => {
        return item.w.toLowerCase().startsWith(q) || item.w.toLowerCase().includes(q) || item.d.includes(q);
      }).slice(0, 10);

      if (emMatches.length) {
        resultsHtml += '<div style="margin: 1.25rem 0 0.6rem; font-weight: 800; color: var(--rose-primary); font-size: 0.95rem;">📚 EMDictionary (Open Source Myanmar-English Database Matches)</div>';
        resultsHtml += emMatches.map(item => `
          <div class="card" style="padding: 1.15rem; margin-bottom: 0.75rem;">
            <div class="card-header" style="margin-bottom: 0.4rem;">
              <div>
                <span style="font-size: 0.72rem; background: var(--rose-light); color: var(--rose-primary); padding: 0.15rem 0.55rem; border-radius: var(--radius-full); font-weight: 800;">EMDictionary</span>
                <h3 style="font-size: 1.25rem; font-weight: 900; margin-top: 0.2rem;">${item.w}</h3>
              </div>
              <button class="icon-btn" onclick="app.speakCurrent('${item.w.replace(/'/g, "\\'")}', 'en')">🔊 Speak</button>
            </div>
            <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
              ${item.d}
            </div>
          </div>
        `).join('');
      }
    }

    // 3. Query English-to-English Dictionary (LexiVerse / adityasahu252 dataset)
    if (this.engEngCache) {
      const eeKeys = Object.keys(this.engEngCache).filter(k => k.toLowerCase().startsWith(q) || k.toLowerCase().includes(q)).slice(0, 6);
      if (eeKeys.length) {
        resultsHtml += '<div style="margin: 1.25rem 0 0.6rem; font-weight: 800; color: var(--lavender-dark); font-size: 0.95rem;">📖 English Monolingual Dictionary (LexiVerse Dataset)</div>';
        resultsHtml += eeKeys.map(k => `
          <div class="card" style="padding: 1.15rem; margin-bottom: 0.75rem;">
            <div class="card-header" style="margin-bottom: 0.4rem;">
              <div>
                <span style="font-size: 0.72rem; background: var(--lavender-light); color: var(--lavender-dark); padding: 0.15rem 0.55rem; border-radius: var(--radius-full); font-weight: 800;">English-to-English</span>
                <h3 style="font-size: 1.2rem; font-weight: 900; margin-top: 0.2rem;">${k}</h3>
              </div>
              <button class="icon-btn" onclick="app.speakCurrent('${k.replace(/'/g, "\\'")}', 'en')">🔊 Speak</button>
            </div>
            <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
              ${this.engEngCache[k]}
            </div>
          </div>
        `).join('');
      }
    }

    // 4. Query Myanmar Female Names Dataset (L16H7 dataset)
    if (this.femaleNamesCache && this.femaleNamesCache.length) {
      const fnMatches = this.femaleNamesCache.filter(item => {
        return item.en.toLowerCase().includes(q) || item.mm.includes(q);
      }).slice(0, 8);

      if (fnMatches.length) {
        resultsHtml += '<div style="margin: 1.25rem 0 0.6rem; font-weight: 800; color: #d63384; font-size: 0.95rem;">🌸 Myanmar Female Names & Identity (L16H7 Dataset)</div>';
        resultsHtml += fnMatches.map(item => `
          <div class="card" style="padding: 0.9rem 1.15rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-main);">${item.mm}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">${item.en} • Myanmar Female Name</div>
            </div>
            <button class="icon-btn" onclick="app.speakCurrent('${item.en}', 'en')">🔊</button>
          </div>
        `).join('');
      }
    }

    if (resultsHtml) {
      list.innerHTML = resultsHtml;
    } else {
      list.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md); border: 1.5px dashed var(--border-color);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌸</div>
          No exact match found for "<strong>${query}</strong>".<br/>
          Try searching in our Myanmar Female Names dictionary or use the Phrasebook below!<br/>
          <button class="pill-btn" style="margin-top: 1rem; background: var(--rose-primary); color: white; border: none;" onclick="app.switchTab('translate')">Open Live Phrasebook →</button>
        </div>
      `;
    }
  }

  // 6. Myanmar Female Names & Meanings View
  renderFemaleNamesView(container) {
    const names = window.HTET_DATA.femaleNamesCollection;

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 900;">🌸 Myanmar Female Names & Meanings</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Extracted from Myanmar Names (2,304 names) & MyanmarName-en-mm collection.
          </p>
        </div>
        <button class="pill-btn" onclick="app.switchTab('dict')">← Back to Dictionary</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
        ${names.map(n => `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-size: 1.3rem; font-weight: 900; color: var(--rose-primary);">${n.nameMm}</span>
                <span style="font-family: monospace; font-size: 0.95rem; font-weight: 700; color: var(--lavender);">${n.nameEn}</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">${n.meaning}</p>
            </div>
            <div style="margin-top: 0.85rem; display: flex; justify-content: flex-end;">
              <button class="icon-btn" onclick="app.speakCurrent('${n.nameEn}', 'en')">🔊 Audio</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 7. Translation & Phrasebook View
  renderTranslateView(container) {
    container.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; font-weight: 900;">🔄 Sisterhood Translation & Phrasebook</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Translate empowering phrases across 8 languages with speech synthesis.
        </p>
      </div>

      <div class="card">
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 0.5rem; align-items: center; margin-bottom: 1rem;">
          <select id="transSrcLang" class="lang-selector-btn" style="width: 100%;">
            <option value="en">English (🇺🇸)</option>
            <option value="my" selected>Burmese (🇲🇲)</option>
            <option value="ja">Japanese (🇯🇵)</option>
            <option value="zh">Chinese (🇨🇳)</option>
            <option value="th">Thai (🇹🇭)</option>
          </select>
          <span style="font-weight: 900; color: var(--rose-primary);">⇄</span>
          <select id="transTargetLang" class="lang-selector-btn" style="width: 100%;">
            <option value="ja" selected>Japanese (🇯🇵)</option>
            <option value="en">English (🇺🇸)</option>
            <option value="zh">Chinese (🇨🇳)</option>
            <option value="my">Burmese (🇲🇲)</option>
            <option value="th">Thai (🇹🇭)</option>
          </select>
        </div>

        <textarea id="transInput" class="search-input" rows="3" placeholder="Enter words or select from sisterhood phrases below..." style="resize: none;"></textarea>

        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.75rem;">
          <button class="pill-btn" onclick="app.doQuickTranslate()" style="background: var(--rose-primary); color: white; border: none;">
            Translate Now ✨
          </button>
        </div>

        <div id="transOutputBox" style="display: none; margin-top: 1rem; padding: 1.15rem; background: var(--bg-card-subtle); border-radius: var(--radius-md); border: 1.5px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 0.78rem; font-weight: 800; color: var(--rose-primary); text-transform: uppercase;">Translation</span>
            <button class="icon-btn" id="transAudioBtn">🔊 Listen</button>
          </div>
          <div id="transOutputText" style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);"></div>
        </div>
      </div>

      <!-- Essential Sisterhood Phrases -->
      <h3 style="font-size: 1.15rem; font-weight: 800; margin: 1.75rem 0 0.85rem;">🌸 Essential Sisterhood & Safety Phrases</h3>
      <div style="display: flex; flex-direction: column; gap: 0.6rem;">
        ${window.HTET_DATA.vocabulary.slice(0, 5).map(v => `
          <div class="card" style="padding: 0.95rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 800;">${v.translations.en.word} • <span style="color: var(--sakura-pink);">${v.translations.my.word}</span></div>
              <div style="font-size: 0.88rem; color: var(--lavender); font-family: monospace;">${v.translations[this.targetLang]?.word || v.translations.ja.word}</div>
            </div>
            <button class="icon-btn" onclick="app.speakCurrent('${(v.translations[this.targetLang]?.word || v.translations.ja.word).replace(/'/g, "\\'")}', '${this.targetLang}')">
              🔊
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  doQuickTranslate() {
    const input = document.getElementById('transInput');
    const outBox = document.getElementById('transOutputBox');
    const outText = document.getElementById('transOutputText');
    const audioBtn = document.getElementById('transAudioBtn');
    const srcLang = document.getElementById('transSrcLang').value;
    const tgtLang = document.getElementById('transTargetLang').value;

    const query = input.value.trim().toLowerCase();
    if (!query) return;

    let match = window.HTET_DATA.vocabulary.find(v => {
      const src = v.translations[srcLang]?.word?.toLowerCase();
      return src && src.includes(query);
    });

    let result = '';
    if (match) {
      result = match.translations[tgtLang]?.word || 'Translation ready';
    } else {
      result = `[${tgtLang.toUpperCase()}] ${input.value}`;
    }

    outBox.style.display = 'block';
    outText.textContent = result;
    audioBtn.onclick = () => window.htetSpeech.speak(result, tgtLang);
  }

  // 8. AI Tutor View (Sisterhood Safe Space)
  renderAITutorView(container) {
    const isPremium = window.htetRevenueCat.isPremium();

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 900;">🌸 HtetAI Sisterhood Tutor</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Practice authentic conversations, leadership, and safe space dialogues with AI.
          </p>
        </div>
        ${!isPremium ? `
          <button class="pill-btn" onclick="app.switchTab('pricing')" style="background: var(--rose-primary); color: white; border: none;">
            👑 Unlock Unlimited AI
          </button>
        ` : ''}
      </div>

      <!-- Scenarios Selector -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; overflow-x: auto; padding-bottom: 0.25rem;">
        ${window.htetAITutor.scenarios.map(sc => `
          <button class="pill-btn" onclick="app.selectScenario('${sc.id}')" style="${window.htetAITutor.activeScenario === sc.id ? 'border-color: var(--rose-primary); background: var(--rose-light); color: var(--rose-primary);' : ''}">
            ${sc.title}
          </button>
        `).join('')}
      </div>

      <div class="card">
        <div class="chat-thread" id="chatThread">
          <div class="chat-bubble assistant">
            <div>${window.htetAITutor.scenarios.find(s => s.id === window.htetAITutor.activeScenario)?.starter[this.targetLang] || window.htetAITutor.scenarios[0].starter.en}</div>
            <div class="chat-tip">💡 Tap the speaker icon to listen and repeat aloud with confidence!</div>
          </div>
        </div>

        <div class="chat-input-row">
          <input type="text" id="chatInput" class="search-input" placeholder="Type your message in ${this.targetLang.toUpperCase()} or Burmese..." style="margin-bottom: 0;" onkeypress="if(event.key === 'Enter') app.sendChatMessage();">
          <button class="icon-btn" onclick="app.voiceInputChat()" title="Speak with Microphone" style="padding: 0.85rem 1.15rem;">
            🎙️
          </button>
          <button class="pill-btn" onclick="app.sendChatMessage()" style="background: var(--rose-primary); color: white; border: none; padding: 0.85rem 1.35rem;">
            Send ✨
          </button>
        </div>
      </div>
    `;
  }

  selectScenario(scId) {
    window.htetAITutor.activeScenario = scId;
    this.renderCurrentTab();
  }

  sendChatMessage() {
    const input = document.getElementById('chatInput');
    const thread = document.getElementById('chatThread');
    if (!input || !thread || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = userText;
    thread.appendChild(userBubble);

    setTimeout(() => {
      const resp = window.htetAITutor.generateResponse(userText, this.targetLang, this.nativeLang);
      const aiBubble = document.createElement('div');
      aiBubble.className = 'chat-bubble assistant';
      aiBubble.innerHTML = `
        <div>${resp.reply}</div>
        <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
          <button class="icon-btn" style="padding: 0.25rem 0.65rem; font-size: 0.78rem;" onclick="app.speakCurrent('${resp.reply.replace(/'/g, "\\'")}', '${this.targetLang}')">
            🔊 Listen Native Audio
          </button>
        </div>
        <div class="chat-tip">${resp.tip}</div>
      `;
      thread.appendChild(aiBubble);
      thread.scrollTop = thread.scrollHeight;
      this.awardXP(10);
    }, 400);

    thread.scrollTop = thread.scrollHeight;
  }

  voiceInputChat() {
    const input = document.getElementById('chatInput');
    window.htetSpeech.listen(this.targetLang, (text) => {
      if (input) input.value = text;
    }, (err) => {
      alert('Microphone notice: ' + err);
    });
  }

  // 9. Pricing & Subscription View
  renderPricingView(container) {
    const plans = window.htetRevenueCat.plans;
    const activePlan = window.htetRevenueCat.activePlan;
    const addOnPacks = window.htetRevenueCat.addonPacks;

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <span style="font-size: 0.82rem; font-weight: 800; text-transform: uppercase; color: var(--rose-primary); background: var(--rose-light); padding: 0.35rem 0.95rem; border-radius: var(--radius-full);">
          👑 Empowering Support & Subscriptions
        </span>
        <h2 style="font-size: 1.85rem; font-weight: 900; margin-top: 0.6rem;">Invest in Your Voice & Global Fluency</h2>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 580px; margin: 0 auto;">
          Free tier forever, or upgrade for unlimited AI tutoring, advanced grammar, and lifetime access.
        </p>
      </div>

      <div class="pricing-grid">
        ${plans.map(p => `
          <div class="price-card ${p.popular ? 'popular' : ''}">
            ${p.badge ? `<div class="price-badge">${p.badge}</div>` : ''}
            <div class="price-title">${p.name}</div>
            <div class="price-amount">${p.price} <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">/${p.period}</span></div>
            <ul class="price-features">
              ${p.features.map(f => `<li>✓ ${f}</li>`).join('')}
            </ul>
            <div style="margin-top: auto;">
              ${activePlan === p.id ? `
                <button class="btn-secondary" disabled style="background: var(--bg-card-subtle);">Current Plan</button>
              ` : `
                <button class="btn-primary" onclick="app.purchasePlan('${p.id}')">
                  ${p.id === 'free' ? 'Select Free' : (p.id === 'lifetime_access' ? 'Get Lifetime VIP 👑' : 'Subscribe Now 💖')}
                </button>
              `}
            </div>
          </div>
        `).join('')}
      </div>

      <h3 style="font-size: 1.25rem; font-weight: 900; margin: 2.25rem 0 1rem;">🌸 Specialized Learning Packs</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        ${addOnPacks.map(pack => {
          const owned = window.htetRevenueCat.hasPack(pack.id);
          return `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-weight: 900; font-size: 1.05rem;">${pack.name}</span>
                  <span style="font-weight: 900; color: var(--rose-primary);">${pack.price}</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${pack.description}</p>
              </div>
              <div>
                ${owned ? `
                  <button class="btn-secondary" disabled>✓ Unlocked & Installed</button>
                ` : `
                  <button class="btn-primary" style="padding: 0.55rem 1rem;" onclick="app.purchaseAddonPack('${pack.id}')">Unlock Pack (${pack.price})</button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  async purchasePlan(planId) {
    const res = await window.htetRevenueCat.purchase(planId);
    if (res.success) {
      alert(`🎉 Congratulations, sister! You have unlocked ${planId === 'lifetime_access' ? 'Lifetime VIP 👑' : 'Premium 💖'}!`);
      this.renderCurrentTab();
    }
  }

  async purchaseAddonPack(packId) {
    const res = await window.htetRevenueCat.purchasePack(packId);
    if (res.success) {
      alert(`🎉 Special Pack Unlocked! Enjoy your learning!`);
      this.renderCurrentTab();
    }
  }

  // 10. Settings & Account View
  renderSettingsView(container) {
    const user = window.htetSupabase.getCurrentUser();

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; font-weight: 900;">⚙️ Settings & Sisterhood Account</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Manage your profile, cloud sync with Supabase, and preferences.</p>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">👤 User Account (Supabase Auth)</div>
          <span style="font-size: 0.75rem; background: var(--rose-light); color: var(--rose-primary); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 800;">
            ${user ? 'Logged In' : 'Guest / Local Mode'}
          </span>
        </div>

        ${user ? `
          <div style="margin-bottom: 1rem;">
            <div><strong>Email:</strong> ${user.email}</div>
            <div><strong>Display Name:</strong> ${user.displayName || 'Htet Sister'}</div>
            <div><strong>Membership:</strong> ${window.htetRevenueCat.isPremium() ? '👑 VIP Active' : '🌸 Free Starter'}</div>
          </div>
          <button class="pill-btn" onclick="window.htetSupabase.signOut(); app.renderCurrentTab();" style="border-color: var(--rose-primary); color: var(--rose-primary);">
            Sign Out
          </button>
        ` : `
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">
            Create an account or sign in to sync your streak, XP, and bookmarks across all your devices.
          </p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button class="pill-btn" style="background: var(--rose-primary); color: white; border: none;" onclick="app.openAuthModal('signin')">
              Sign In 💖
            </button>
            <button class="pill-btn" onclick="app.openAuthModal('signup')">
              Create Free Account ✨
            </button>
          </div>
        `}
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">🎨 Cute Aesthetics & Audio</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div>
            <div style="font-weight: 700;">Theme Mode</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Switch between Pastel Sakura and Velvet Plum</div>
          </div>
          <button class="pill-btn" onclick="app.toggleTheme()">
            🌓 Switch Theme
          </button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 700;">Speech Pronunciation Speed</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Adjust native voice playback rate</div>
          </div>
          <select class="lang-selector-btn" onchange="window.htetSpeech.setRate(this.value)">
            <option value="0.75">0.75x (Gentle / Slow)</option>
            <option value="1.0" selected>1.0x (Normal)</option>
            <option value="1.25">1.25x (Fast)</option>
          </select>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">🌐 Active Learning Language</div>
        </div>
        <div style="margin-bottom: 0.75rem;">
          <select class="lang-selector-btn" style="width: 100%;" onchange="app.changeTargetLanguage(this.value)">
            ${window.HTET_DATA.languages.map(l => `
              <option value="${l.code}" ${l.code === this.targetLang ? 'selected' : ''}>${l.flag} ${l.name} (${l.native})</option>
            `).join('')}
          </select>
        </div>
      </div>
    `;
  }

  changeTargetLanguage(code) {
    this.targetLang = code;
    localStorage.setItem('htetlingo_target_lang', code);
    const langObj = window.HTET_DATA.languages.find(l => l.code === code);
    const btn = document.getElementById('langSelectorBtn');
    if (btn && langObj) btn.innerHTML = `<span>${langObj.flag} ${langObj.name}</span>`;
    this.renderCurrentTab();
  }

  openLanguageModal() {
    this.switchTab('settings');
  }

  openAuthModal(mode = 'signin') {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-content">
        <h3 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 0.4rem; color: var(--rose-primary);">
          ${mode === 'signin' ? 'Sign In to HtetLingo 💖' : 'Join Our Sisterhood ✨'}
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Encrypted, safe & secure with Supabase.
        </p>

        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${mode === 'signup' ? `
            <div>
              <label style="font-size: 0.82rem; font-weight: 700;">Your Name / Preferred Name</label>
              <input type="text" id="modalName" class="search-input" placeholder="e.g. Htet Myat" style="margin-bottom: 0;">
            </div>
          ` : ''}
          <div>
            <label style="font-size: 0.82rem; font-weight: 700;">Email</label>
            <input type="email" id="modalEmail" class="search-input" placeholder="name@example.com" style="margin-bottom: 0;">
          </div>
          <div>
            <label style="font-size: 0.82rem; font-weight: 700;">Password</label>
            <input type="password" id="modalPassword" class="search-input" placeholder="••••••••" style="margin-bottom: 0;">
          </div>

          <button class="btn-primary" style="margin-top: 0.5rem;" onclick="app.submitAuth('${mode}')">
            ${mode === 'signin' ? 'Sign In 💖' : 'Create Account 🌸'}
          </button>
          <button class="btn-secondary" onclick="this.closest('.modal-backdrop').remove()">
            Cancel
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  async submitAuth(mode) {
    const email = document.getElementById('modalEmail')?.value?.trim();
    const pass = document.getElementById('modalPassword')?.value?.trim();
    const name = document.getElementById('modalName')?.value?.trim();

    if (!email || !pass) {
      alert('Please enter your email and password.');
      return;
    }

    let res;
    if (mode === 'signup') {
      res = await window.htetSupabase.signUp(email, pass, name);
    } else {
      res = await window.htetSupabase.signIn(email, pass);
    }

    if (res.error) {
      alert(res.error);
    } else {
      alert(`Welcome, lovely ${res.user.displayName}! 🌸 Sync is active.`);
      document.querySelector('.modal-backdrop')?.remove();
      this.renderCurrentTab();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new HtetLingoApp();
});
