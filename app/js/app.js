// HtetLingo Core Application Controller
// Orchestrates Views, Learning Engine, SRS, Supabase & RevenueCat

class HtetLingoApp {
  constructor() {
    this.currentTab = 'home';
    this.targetLang = localStorage.getItem('htetlingo_target_lang') || 'ja';
    this.nativeLang = localStorage.getItem('htetlingo_native_lang') || 'my';
    this.currentCardIndex = 0;
    this.filteredVocab = [];
    this.currentQuiz = null;
    this.quizIndex = 0;
    this.quizScore = 0;

    this.userStats = {
      xp: parseInt(localStorage.getItem('htetlingo_xp') || '120', 10),
      streak: parseInt(localStorage.getItem('htetlingo_streak') || '3', 10),
      mastered: parseInt(localStorage.getItem('htetlingo_mastered') || '18', 10)
    };

    this.init();
  }

  async init() {
    this.bindEvents();
    this.filterVocab();
    this.updateStatsUI();
    this.renderCurrentTab();
    this.checkOnlineStatus();

    // Check service worker registration
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
        console.log('[HtetLingo] Service Worker Registered');
      } catch (e) {
        console.log('[HtetLingo] Service Worker registration failed:', e);
      }
    }
  }

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-tab-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
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
      banner.innerHTML = '<span>⚡ Offline Learning Mode Active — All local lessons, vocabulary & dictionary available!</span>';
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
    if (headerStreakEl) headerStreakEl.textContent = `🔥 ${this.userStats.streak}d`;

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

    container.innerHTML = `
      <div class="hero-card">
        <div class="hero-tagline">Learn Languages • Understand Words • Connect Cultures</div>
        <h1 class="hero-title">Master ${targetObj.name} ${targetObj.flag} with HtetLingo</h1>
        <p class="hero-desc">Cross-platform, offline-first multilingual learning with spaced repetition, native speech synthesis, and AI tutoring.</p>
        
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="pill-btn" onclick="app.switchTab('vocab')" style="background: #ffffff; color: #4f46e5; border: none; font-weight: 700;">
            🚀 Daily Flashcards
          </button>
          <button class="pill-btn" onclick="app.switchTab('aitutor')" style="background: rgba(255,255,255,0.2); color: #ffffff; border: 1px solid rgba(255,255,255,0.4);">
            🤖 Chat with AI Tutor
          </button>
          ${!isPremium ? `
            <button class="pill-btn" onclick="app.switchTab('pricing')" style="background: #ec4899; color: #ffffff; border: none;">
              💎 Upgrade Premium
            </button>
          ` : `
            <span class="pill-btn" style="background: #10b981; color: white; border: none;">
              ⭐ Premium Active
            </span>
          `}
        </div>

        <div class="hero-stats">
          <div class="stat-box">
            <div class="stat-val" id="statStreak">${this.userStats.streak} Days</div>
            <div class="stat-lbl">Daily Streak</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" id="statXp">${this.userStats.xp}</div>
            <div class="stat-lbl">Total XP</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" id="statMastered">${this.userStats.mastered}</div>
            <div class="stat-lbl">Mastered Words</div>
          </div>
          <div class="stat-box">
            <div class="stat-val">${isPremium ? 'VIP' : 'Free'}</div>
            <div class="stat-lbl">Account Tier</div>
          </div>
        </div>
      </div>

      <!-- Quick Feature Access Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
        
        <div class="card" onclick="app.switchTab('vocab')" style="cursor: pointer;">
          <div class="card-header">
            <div class="card-title">📚 Vocabulary & Flashcards</div>
            <span style="font-size: 0.75rem; background: var(--primary-light); color: var(--primary); padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 700;">SRS Engine</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Practice high-frequency words with active recall, audio pronunciation, and automatic review scheduling.
          </p>
          <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">Start Flashcard Session →</div>
        </div>

        <div class="card" onclick="app.switchTab('grammar')" style="cursor: pointer;">
          <div class="card-header">
            <div class="card-title">✍️ Grammar & Structure</div>
            <span style="font-size: 0.75rem; background: var(--bg-card-subtle); color: var(--text-main); padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 700;">All Levels</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Clear, step-by-step grammatical guides with side-by-side Burmese & English explanations and cultural nuances.
          </p>
          <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">Explore Grammar Guides →</div>
        </div>

        <div class="card" onclick="app.switchTab('quiz')" style="cursor: pointer;">
          <div class="card-header">
            <div class="card-title">🎯 Quizzes & Exercises</div>
            <span style="font-size: 0.75rem; background: #fef3c7; color: #b45309; padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 700;">+20 XP</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Test your knowledge with multiple-choice, audio listening challenges, and sentence reconstruction.
          </p>
          <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">Take a Quick Quiz →</div>
        </div>

        <div class="card" onclick="app.switchTab('dict')" style="cursor: pointer;">
          <div class="card-header">
            <div class="card-title">📖 Multilingual Dictionary</div>
            <span style="font-size: 0.75rem; background: var(--bg-card-subtle); color: var(--text-main); padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 700;">Offline Ready</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Look up words instantly across English, Burmese, Japanese, Chinese, Thai, French, German, and Korean.
          </p>
          <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">Search Dictionary →</div>
        </div>

      </div>
    `;
  }

  // 2. Vocabulary & Flashcard View
  renderVocabView(container) {
    if (!this.filteredVocab.length) this.filterVocab();
    const item = this.filteredVocab[this.currentCardIndex];
    const targetData = item.translations[this.targetLang] || item.translations['en'];
    const nativeData = item.translations[this.nativeLang] || item.translations['my'] || item.translations['en'];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800;">📚 Vocabulary Flashcards</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Card ${this.currentCardIndex + 1} of ${this.filteredVocab.length}</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="pill-btn" onclick="app.filterVocab('all'); app.renderCurrentTab();">All</button>
          <button class="pill-btn" onclick="app.filterVocab('greetings'); app.renderCurrentTab();">Greetings</button>
          <button class="pill-btn" onclick="app.filterVocab('travel'); app.renderCurrentTab();">Travel</button>
          <button class="pill-btn" onclick="app.filterVocab('food'); app.renderCurrentTab();">Food</button>
        </div>
      </div>

      <div class="flashcard-wrapper">
        <div class="flashcard" id="activeFlashcard" onclick="this.classList.toggle('flipped');">
          <span class="flashcard-category">${item.category} • ${item.level}</span>
          
          <div class="flashcard-word">${targetData.word}</div>
          <div class="flashcard-phonetic">${targetData.phonetic || ''}</div>

          <div style="display: flex; gap: 0.5rem; justify-content: center; margin: 0.5rem 0;">
            <button class="icon-btn" onclick="event.stopPropagation(); app.speakCurrent('${targetData.word.replace(/'/g, "\\'")}', '${this.targetLang}');" title="Listen to pronunciation">
              🔊 Pronounce
            </button>
            <button class="icon-btn" onclick="event.stopPropagation(); app.bookmarkWord('${item.id}');" title="Bookmark">
              ⭐ Save
            </button>
          </div>

          <div class="flashcard-translation">
            ${nativeData.word}
          </div>

          <div class="flashcard-example">
            "${targetData.example}"<br/>
            <span style="font-size: 0.8rem; color: var(--text-muted);">(${nativeData.example || ''})</span>
          </div>

          <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--text-dim);">
            Tap card to toggle translation / details
          </div>
        </div>
      </div>

      <!-- Spaced Repetition Rating Buttons -->
      <div class="srs-controls">
        <button class="srs-btn again" onclick="app.rateCard('again')">
          <span>Again</span>
          <span style="font-size: 0.7rem; opacity: 0.85;">1 Day</span>
        </button>
        <button class="srs-btn hard" onclick="app.rateCard('hard')">
          <span>Hard</span>
          <span style="font-size: 0.7rem; opacity: 0.85;">2 Days</span>
        </button>
        <button class="srs-btn good" onclick="app.rateCard('good')">
          <span>Good</span>
          <span style="font-size: 0.7rem; opacity: 0.85;">4 Days</span>
        </button>
        <button class="srs-btn easy" onclick="app.rateCard('easy')">
          <span>Easy</span>
          <span style="font-size: 0.7rem; opacity: 0.85;">7 Days</span>
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
    alert(`"${targetData.word}" saved to your personal vocabulary book!`);
  }

  // 3. Grammar Modules View
  renderGrammarView(container) {
    const lessons = window.HTET_DATA.grammar.filter(g => g.language === this.targetLang || g.language === 'ja' || g.language === 'zh' || g.language === 'my');

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; font-weight: 800;">✍️ Structured Grammar Lessons</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Understand sentence mechanics, particles, and polite forms with clear Burmese & English explanations.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${lessons.map(g => `
          <div class="card">
            <div class="card-header">
              <div>
                <span style="font-size: 0.75rem; background: var(--primary-light); color: var(--primary); padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 700; text-transform: uppercase;">
                  ${g.level}
                </span>
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 0.4rem;">${g.title}</h3>
              </div>
              <button class="icon-btn" onclick="app.speakCurrent('${g.examples[0].target.replace(/'/g, "\\'")}', '${g.language}')">
                🔊 Listen
              </button>
            </div>

            <div style="background: var(--bg-card-subtle); padding: 0.75rem 1rem; border-radius: var(--radius-md); font-family: monospace; font-size: 0.9rem; font-weight: 600; color: var(--primary); margin-bottom: 0.85rem; border-left: 3px solid var(--primary);">
              Formula: ${g.formula}
            </div>

            <div style="margin-bottom: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
              <strong>မြန်မာလို ရှင်းလင်းချက်:</strong> ${g.burmeseExplanation}
            </div>

            <div style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
              <strong>English Guide:</strong> ${g.englishExplanation}
            </div>

            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.75rem; margin-bottom: 0.75rem;">
              <div style="font-weight: 700; font-size: 0.85rem; margin-bottom: 0.4rem; color: var(--primary);">💡 Example Sentences:</div>
              ${g.examples.map(ex => `
                <div style="margin-bottom: 0.5rem; font-size: 0.9rem;">
                  <div style="font-weight: 600;">${ex.target}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${ex.meaningMy} • ${ex.meaningEn}</div>
                </div>
              `).join('')}
            </div>

            <div style="font-size: 0.8rem; color: #b45309; background: #fef3c7; padding: 0.4rem 0.75rem; border-radius: var(--radius-sm);">
              ${g.culturalTip}
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
          <h2 style="font-size: 1.4rem; font-weight: 800;">🎯 Interactive Quiz & Practice</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Question ${this.quizIndex + 1} of ${quizzes.length} • Score: ${this.quizScore}</p>
        </div>
        <div style="font-size: 0.9rem; font-weight: 700; color: #d97706; background: #fef3c7; padding: 0.3rem 0.75rem; border-radius: var(--radius-full);">
          +15 XP per correct
        </div>
      </div>

      <div class="quiz-question-box">
        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--primary); margin-bottom: 0.5rem;">
          ${q.topic} • ${q.type.toUpperCase()}
        </div>

        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">${q.question}</h3>

        ${q.type === 'listening' ? `
          <div style="margin-bottom: 1.25rem;">
            <button class="pill-btn" onclick="app.speakCurrent('${q.audioText}', '${q.language}')" style="background: var(--primary); color: white; border: none; font-size: 1rem; padding: 0.6rem 1.25rem;">
              🔊 Click to Listen to Audio
            </button>
          </div>
        ` : ''}

        <div style="display: flex; flex-direction: column; gap: 0.5rem;" id="quizOptionsContainer">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option" onclick="app.checkAnswer(${idx})">
              <span>${opt}</span>
              <span class="quiz-check-icon"></span>
            </button>
          `).join('')}
        </div>

        <div id="quizFeedback" style="display: none; margin-top: 1rem; padding: 0.75rem 1rem; border-radius: var(--radius-md);"></div>

        <div style="margin-top: 1.25rem; display: flex; justify-content: flex-end;">
          <button id="nextQuizBtn" class="pill-btn" style="display: none; background: var(--primary); color: white; border: none; padding: 0.6rem 1.25rem;" onclick="app.nextQuizQuestion()">
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
        this.awardXP(15);
        feedback.style.background = 'rgba(16, 185, 129, 0.15)';
        feedback.style.color = 'var(--success)';
        feedback.innerHTML = `<strong>🎉 Correct! (+15 XP)</strong><br/><span style="font-size: 0.85rem; color: var(--text-main);">${q.explanation}</span>`;
      } else {
        feedback.style.background = 'rgba(239, 68, 68, 0.15)';
        feedback.style.color = 'var(--danger)';
        feedback.innerHTML = `<strong>❌ Not quite.</strong><br/><span style="font-size: 0.85rem; color: var(--text-main);">${q.explanation}</span>`;
      }
    }

    if (nextBtn) nextBtn.style.display = 'inline-block';
  }

  nextQuizQuestion() {
    this.quizIndex += 1;
    this.renderCurrentTab();
  }

  // 5. Multilingual Dictionary View
  renderDictView(container) {
    const dict = window.HTET_DATA.dictionary;

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; font-weight: 800;">📖 Multilingual Dictionary</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Instant cross-reference definitions, phonetic transcriptions, and usage examples.
        </p>
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
            <span style="font-size: 0.75rem; background: var(--bg-card-subtle); color: var(--text-dim); padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 600; text-transform: uppercase;">
              ${item.pos}
            </span>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 0.3rem;">${item.term} <span style="font-size: 0.9rem; font-weight: 500; color: var(--primary); font-family: monospace;">${item.ipa}</span></h3>
          </div>
          <button class="icon-btn" onclick="app.speakCurrent('${item.term}', 'en')">
            🔊 Speak
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.5rem; margin-bottom: 0.85rem; font-size: 0.875rem;">
          <div style="background: var(--bg-card-subtle); padding: 0.5rem; border-radius: var(--radius-sm);">
            <strong>🇲🇲 မြန်မာ:</strong> ${item.translations.my}
          </div>
          <div style="background: var(--bg-card-subtle); padding: 0.5rem; border-radius: var(--radius-sm);">
            <strong>🇯🇵 日本語:</strong> ${item.translations.ja}
          </div>
          <div style="background: var(--bg-card-subtle); padding: 0.5rem; border-radius: var(--radius-sm);">
            <strong>🇨🇳 中文:</strong> ${item.translations.zh}
          </div>
          <div style="background: var(--bg-card-subtle); padding: 0.5rem; border-radius: var(--radius-sm);">
            <strong>🇹🇭 ภาษาไทย:</strong> ${item.translations.th}
          </div>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-muted); font-style: italic; border-left: 2px solid var(--primary); padding-left: 0.5rem;">
          Example: "${item.example}"
        </div>
      </div>
    `;
  }

  searchDict(query) {
    const list = document.getElementById('dictResultsList');
    if (!list) return;
    const q = query.toLowerCase().trim();
    if (!q) {
      list.innerHTML = window.HTET_DATA.dictionary.map(item => this.formatDictEntry(item)).join('');
      return;
    }

    const filtered = window.HTET_DATA.dictionary.filter(item => {
      if (item.term.toLowerCase().includes(q)) return true;
      if (item.translations.my.includes(q)) return true;
      if (item.translations.ja.toLowerCase().includes(q)) return true;
      if (item.translations.zh.toLowerCase().includes(q)) return true;
      if (item.translations.th.toLowerCase().includes(q)) return true;
      return false;
    });

    if (filtered.length) {
      list.innerHTML = filtered.map(item => this.formatDictEntry(item)).join('');
    } else {
      list.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          No dictionary entry found for "<strong>${query}</strong>".<br/>
          <button class="pill-btn" style="margin-top: 1rem;" onclick="app.switchTab('translate')">Translate with Phrasebook →</button>
        </div>
      `;
    }
  }

  // 6. Translation & Phrasebook View
  renderTranslateView(container) {
    container.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; font-weight: 800;">🔄 Translation & Phrasebook</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Translate phrases offline between any of the 8 supported languages with speech synthesis.
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
          <span style="font-weight: 800; color: var(--primary);">⇄</span>
          <select id="transTargetLang" class="lang-selector-btn" style="width: 100%;">
            <option value="ja" selected>Japanese (🇯🇵)</option>
            <option value="en">English (🇺🇸)</option>
            <option value="zh">Chinese (🇨🇳)</option>
            <option value="my">Burmese (🇲🇲)</option>
            <option value="th">Thai (🇹🇭)</option>
          </select>
        </div>

        <textarea id="transInput" class="search-input" rows="3" placeholder="Enter text to translate or pick from phrasebook below..." style="resize: none;"></textarea>

        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.75rem;">
          <button class="pill-btn" onclick="app.doQuickTranslate()">Translate Now</button>
        </div>

        <div id="transOutputBox" style="display: none; margin-top: 1rem; padding: 1rem; background: var(--bg-card-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">Result</span>
            <button class="icon-btn" id="transAudioBtn">🔊 Listen</button>
          </div>
          <div id="transOutputText" style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);"></div>
        </div>
      </div>

      <!-- Essential Situational Phrasebook -->
      <h3 style="font-size: 1.1rem; font-weight: 700; margin: 1.5rem 0 0.75rem;">Essential Offline Phrasebook</h3>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${window.HTET_DATA.vocabulary.slice(0, 4).map(v => `
          <div class="card" style="padding: 0.85rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 700;">${v.translations.en.word} • ${v.translations.my.word}</div>
              <div style="font-size: 0.85rem; color: var(--primary); font-family: monospace;">${v.translations[this.targetLang]?.word || v.translations.ja.word}</div>
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

    // Search dictionary or vocabulary match
    let match = window.HTET_DATA.vocabulary.find(v => {
      const src = v.translations[srcLang]?.word?.toLowerCase();
      return src && src.includes(query);
    });

    let result = '';
    if (match) {
      result = match.translations[tgtLang]?.word || 'Translation ready';
    } else {
      // Mock smart translation response
      result = `[${tgtLang.toUpperCase()}] ${input.value}`;
    }

    outBox.style.display = 'block';
    outText.textContent = result;
    audioBtn.onclick = () => window.htetSpeech.speak(result, tgtLang);
  }

  // 7. AI Tutor View
  renderAITutorView(container) {
    const isPremium = window.htetRevenueCat.isPremium();

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800;">🤖 HtetAI Language Tutor</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Practice authentic conversations, grammar explanations & pronunciation with AI.
          </p>
        </div>
        ${!isPremium ? `
          <button class="pill-btn" onclick="app.switchTab('pricing')" style="background: var(--accent); color: white; border: none;">
            💎 Unlock Unlimited AI
          </button>
        ` : ''}
      </div>

      <!-- Scenarios Selector -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; overflow-x: auto; padding-bottom: 0.25rem;">
        ${window.htetAITutor.scenarios.map(sc => `
          <button class="pill-btn" onclick="app.selectScenario('${sc.id}')" style="${window.htetAITutor.activeScenario === sc.id ? 'border-color: var(--primary); background: var(--primary-light); color: var(--primary);' : ''}">
            ${sc.title}
          </button>
        `).join('')}
      </div>

      <div class="card">
        <div class="chat-thread" id="chatThread">
          <div class="chat-bubble assistant">
            <div>${window.htetAITutor.scenarios.find(s => s.id === window.htetAITutor.activeScenario)?.starter[this.targetLang] || window.htetAITutor.scenarios[0].starter.en}</div>
            <div class="chat-tip">💡 Tap the speaker icon to listen and repeat aloud!</div>
          </div>
        </div>

        <div class="chat-input-row">
          <input type="text" id="chatInput" class="search-input" placeholder="Type your response in ${this.targetLang.toUpperCase()} or Burmese..." style="margin-bottom: 0;" onkeypress="if(event.key === 'Enter') app.sendChatMessage();">
          <button class="icon-btn" onclick="app.voiceInputChat()" title="Speak with Microphone" style="padding: 0.75rem 1rem;">
            🎙️
          </button>
          <button class="pill-btn" onclick="app.sendChatMessage()" style="background: var(--primary); color: white; border: none; padding: 0.75rem 1.25rem;">
            Send
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

    // Append user message
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = userText;
    thread.appendChild(userBubble);

    // Generate AI response
    setTimeout(() => {
      const resp = window.htetAITutor.generateResponse(userText, this.targetLang, this.nativeLang);
      const aiBubble = document.createElement('div');
      aiBubble.className = 'chat-bubble assistant';
      aiBubble.innerHTML = `
        <div>${resp.reply}</div>
        <div style="margin-top: 0.4rem; display: flex; gap: 0.5rem;">
          <button class="icon-btn" style="padding: 0.2rem 0.6rem; font-size: 0.75rem;" onclick="app.speakCurrent('${resp.reply.replace(/'/g, "\\'")}', '${this.targetLang}')">
            🔊 Listen
          </button>
        </div>
        <div class="chat-tip">${resp.tip}</div>
      `;
      thread.appendChild(aiBubble);
      thread.scrollTop = thread.scrollHeight;
      this.awardXP(5);
    }, 400);

    thread.scrollTop = thread.scrollHeight;
  }

  voiceInputChat() {
    const input = document.getElementById('chatInput');
    window.htetSpeech.listen(this.targetLang, (text) => {
      if (input) input.value = text;
    }, (err) => {
      alert('Microphone input note: ' + err);
    });
  }

  // 8. Monetization & Pricing View
  renderPricingView(container) {
    const plans = window.htetRevenueCat.plans;
    const activePlan = window.htetRevenueCat.activePlan;
    const addOnPacks = window.htetRevenueCat.addonPacks;

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--accent); background: var(--accent-light); padding: 0.3rem 0.8rem; border-radius: var(--radius-full);">
          Flexible Monetization
        </span>
        <h2 style="font-size: 1.8rem; font-weight: 900; margin-top: 0.5rem;">Upgrade Your Language Journey</h2>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 580px; margin: 0 auto;">
          Choose a subscription, lifetime pass, or specialized learning packs with RevenueCat integration.
        </p>
      </div>

      <div class="pricing-grid">
        ${plans.map(p => `
          <div class="price-card ${p.popular ? 'popular' : ''}">
            ${p.badge ? `<div class="price-badge">${p.badge}</div>` : ''}
            <div class="price-title">${p.name}</div>
            <div class="price-amount">${p.price} <span style="font-size: 0.9rem; font-weight: 500; color: var(--text-muted);">/${p.period}</span></div>
            <ul class="price-features">
              ${p.features.map(f => `<li>✓ ${f}</li>`).join('')}
            </ul>
            <div style="margin-top: auto;">
              ${activePlan === p.id ? `
                <button class="btn-secondary" disabled style="background: var(--bg-card-subtle);">Current Plan</button>
              ` : `
                <button class="btn-primary" onclick="app.purchasePlan('${p.id}')">
                  ${p.id === 'free' ? 'Select Free' : (p.id === 'lifetime_access' ? 'Get Lifetime VIP' : 'Subscribe Now')}
                </button>
              `}
            </div>
          </div>
        `).join('')}
      </div>

      <h3 style="font-size: 1.25rem; font-weight: 800; margin: 2rem 0 1rem;">Specialized Add-on Learning Packs</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        ${addOnPacks.map(pack => {
          const owned = window.htetRevenueCat.hasPack(pack.id);
          return `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-weight: 800; font-size: 1.05rem;">${pack.name}</span>
                  <span style="font-weight: 800; color: var(--primary);">${pack.price}</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${pack.description}</p>
              </div>
              <div>
                ${owned ? `
                  <button class="btn-secondary" disabled>✓ Unlocked & Installed</button>
                ` : `
                  <button class="btn-primary" style="padding: 0.5rem 1rem;" onclick="app.purchaseAddonPack('${pack.id}')">Unlock Pack (${pack.price})</button>
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
      alert(`🎉 Congratulations! You have unlocked ${planId === 'lifetime_access' ? 'Lifetime VIP' : 'Premium'}!`);
      this.renderCurrentTab();
    }
  }

  async purchaseAddonPack(packId) {
    const res = await window.htetRevenueCat.purchasePack(packId);
    if (res.success) {
      alert(`🎉 Special Pack Unlocked!`);
      this.renderCurrentTab();
    }
  }

  // 9. Settings & Supabase User Account View
  renderSettingsView(container) {
    const user = window.htetSupabase.getCurrentUser();

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; font-weight: 800;">⚙️ Settings & User Account</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Manage your profile, cloud sync with Supabase, and preferences.</p>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">👤 User Account (Supabase Auth)</div>
          <span style="font-size: 0.75rem; background: #dcfce7; color: #166534; padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 700;">
            ${user ? 'Logged In' : 'Guest / Local Mode'}
          </span>
        </div>

        ${user ? `
          <div style="margin-bottom: 1rem;">
            <div><strong>Email:</strong> ${user.email}</div>
            <div><strong>Display Name:</strong> ${user.displayName || 'Htet Learner'}</div>
            <div><strong>Membership:</strong> ${window.htetRevenueCat.isPremium() ? '⭐ Premium VIP' : 'Free Starter'}</div>
          </div>
          <button class="pill-btn" onclick="window.htetSupabase.signOut(); app.renderCurrentTab();" style="border-color: var(--danger); color: var(--danger);">
            Sign Out
          </button>
        ` : `
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">
            Create an account or sign in to sync your streak, XP, and bookmarks across all your devices.
          </p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button class="pill-btn" style="background: var(--primary); color: white; border: none;" onclick="app.openAuthModal('signin')">
              Sign In
            </button>
            <button class="pill-btn" onclick="app.openAuthModal('signup')">
              Create New Account
            </button>
          </div>
        `}
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">🎨 Appearance & Audio</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div>
            <div style="font-weight: 600;">Theme Mode</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Toggle Light or Dark interface</div>
          </div>
          <button class="pill-btn" onclick="app.toggleTheme()">
            🌓 Switch Theme
          </button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600;">Speech Pronunciation Speed</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Adjust native voice playback rate</div>
          </div>
          <select class="lang-selector-btn" onchange="window.htetSpeech.setRate(this.value)">
            <option value="0.75">0.75x (Slow)</option>
            <option value="1.0" selected>1.0x (Normal)</option>
            <option value="1.25">1.25x (Fast)</option>
          </select>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">🌐 Active Languages</div>
        </div>
        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 0.3rem;">Target Learning Language:</label>
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
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem;">
          ${mode === 'signin' ? 'Sign In to HtetLingo' : 'Create Free Account'}
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Powered by Supabase Authentication. Safe & encrypted.
        </p>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${mode === 'signup' ? `
            <div>
              <label style="font-size: 0.8rem; font-weight: 600;">Full Name</label>
              <input type="text" id="modalName" class="search-input" placeholder="e.g. Htet Myat" style="margin-bottom: 0;">
            </div>
          ` : ''}
          <div>
            <label style="font-size: 0.8rem; font-weight: 600;">Email</label>
            <input type="email" id="modalEmail" class="search-input" placeholder="name@example.com" style="margin-bottom: 0;">
          </div>
          <div>
            <label style="font-size: 0.8rem; font-weight: 600;">Password</label>
            <input type="password" id="modalPassword" class="search-input" placeholder="••••••••" style="margin-bottom: 0;">
          </div>

          <button class="btn-primary" style="margin-top: 0.5rem;" onclick="app.submitAuth('${mode}')">
            ${mode === 'signin' ? 'Sign In' : 'Sign Up'}
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
      alert('Please enter email and password.');
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
      alert(`Welcome, ${res.user.displayName}! Sync active.`);
      document.querySelector('.modal-backdrop')?.remove();
      this.renderCurrentTab();
    }
  }
}

// Instantiate Global App
window.addEventListener('DOMContentLoaded', () => {
  window.app = new HtetLingoApp();
});
