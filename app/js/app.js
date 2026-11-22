// ==========================================================================
// HtetLingo Core Application Controller
// Duolingo-style Interactive Language Learning Platform
// Units, Levels, Word Banks, Matching Games, Audio Feedback & Open Datasets
// ==========================================================================

class HtetLingoApp {
  constructor() {
    this.currentTab = 'learn';
    this.targetLang = localStorage.getItem('htetlingo_target_lang') || 'ja';
    this.nativeLang = localStorage.getItem('htetlingo_native_lang') || 'my';

    // Gamification & Progress State
    this.hearts = parseInt(localStorage.getItem('htetlingo_hearts') || '5', 10);
    this.gems = parseInt(localStorage.getItem('htetlingo_gems') || '120', 10);
    this.streak = parseInt(localStorage.getItem('htetlingo_streak') || '5', 10);
    this.xp = parseInt(localStorage.getItem('htetlingo_xp') || '150', 10);
    this.completedLevels = JSON.parse(localStorage.getItem('htetlingo_completed_levels') || '["ja_u1_l1"]');

    // Lesson Runner State
    this.activeLesson = null;
    this.questionIndex = 0;
    this.selectedChoice = null;
    this.placedWords = [];
    this.selectedMatchA = null;
    this.selectedMatchB = null;
    this.matchedPairs = [];
    this.isAnswerChecked = false;
    this.isAnswerCorrect = false;

    // Flashcard & Practice State
    this.flashcardIndex = 0;
    this.isCardFlipped = false;

    // Datasets memory cache
    this.engMyanCache = null;
    this.femaleNamesCache = null;
    this.engEngCache = null;
    this.karenCache = null;
    this.dictTab = 'all';

    this.loadExternalDatasets();
    this.init();
  }

  async init() {
    this.updateTopBarUI();
    this.bindEvents();
    this.renderCurrentTab();
    this.checkOnlineStatus();

    // Register Service Worker with cache busting
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js?v=2.1.0');
        console.log('[HtetLingo] Duolingo Kawaii Service Worker active');
      } catch (e) {}
    }
  }

  bindEvents() {
    // Bottom Navigation tabs
    document.querySelectorAll('.nav-tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Online / Offline
    window.addEventListener('online', () => this.checkOnlineStatus());
    window.addEventListener('offline', () => this.checkOnlineStatus());
  }

  updateTopBarUI() {
    const cur = window.HTET_CURRICULUM[this.targetLang] || window.HTET_CURRICULUM.ja;
    const langLabel = document.getElementById('topLangLabel');
    if (langLabel) langLabel.textContent = `${cur.flag} ${cur.language}`;

    const streakEl = document.getElementById('topStreakCount');
    if (streakEl) streakEl.textContent = this.streak;

    const gemsEl = document.getElementById('topGemsCount');
    if (gemsEl) gemsEl.textContent = this.gems;

    const heartsEl = document.getElementById('topHeartsCount');
    if (heartsEl) {
      if (window.htetRevenueCat?.isPremium()) {
        heartsEl.innerHTML = '∞ VIP';
      } else {
        heartsEl.textContent = this.hearts;
      }
    }

    localStorage.setItem('htetlingo_hearts', this.hearts);
    localStorage.setItem('htetlingo_gems', this.gems);
    localStorage.setItem('htetlingo_streak', this.streak);
    localStorage.setItem('htetlingo_xp', this.xp);
    localStorage.setItem('htetlingo_completed_levels', JSON.stringify(this.completedLevels));
  }

  checkOnlineStatus() {
    const banner = document.getElementById('offlineBanner');
    if (!banner) return;
    if (navigator.onLine) {
      banner.style.display = 'none';
    } else {
      banner.style.display = 'flex';
      banner.innerHTML = '<span>🌸 Offline Mode Active — Duolingo lessons & dictionaries work 100% offline!</span>';
    }
  }

  toggleTheme() {
    const metaTheme = document.querySelector('meta[name="color-scheme"]');
    if (!metaTheme) return;
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = localStorage.getItem('color-scheme') || (isDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';

    if ((next === 'dark' && isDark) || (next === 'light' && !isDark)) {
      localStorage.removeItem('color-scheme');
      metaTheme.content = 'light dark';
    } else {
      localStorage.setItem('color-scheme', next);
      metaTheme.content = next;
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

  speakCurrent(text, lang = null) {
    const target = lang || this.targetLang;
    if (window.htetSpeech) {
      window.htetSpeech.speak(text, target);
    }
  }

  // --- View Router ---
  renderCurrentTab() {
    const viewport = document.getElementById('mainViewport');
    if (!viewport) return;

    this.updateTopBarUI();

    switch (this.currentTab) {
      case 'learn':
        this.renderLearnView(viewport);
        break;
      case 'practice':
        this.renderPracticeView(viewport);
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

  // ========================================================================
  // 1. LEARN VIEW (DUOLINGO-STYLE ROADMAP WITH UNITS & LESSON NODES)
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

        // Shift zigzag position
        const shifts = ['', 'shift-left', 'shift-right', ''];
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
          hintHtml = '<div class="node-mascot-hint">START! 🌸</div>';
        }

        nodesHtml += `
          <div class="node-row ${shiftClass}">
            <button class="lesson-circle-btn ${stateClass}" 
                    onclick="${isLocked ? `alert('Please complete earlier lessons first! 🌸')` : `app.startLesson('${unit.id}', '${lvl.id}')`}"
                    title="${lvl.title}">
              ${hintHtml}
              <span>${iconContent}</span>
            </button>
          </div>
        `;
      });

      unitsHtml += `
        <div class="unit-card-header" style="background: linear-gradient(135deg, ${unit.color || '#f43f5e'}, #ec4899);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <span class="unit-badge">${unit.title}</span>
              <div class="unit-title">${unit.icon} ${unit.subtitle}</div>
            </div>
            <button class="duo-btn duo-btn-subtle" style="padding: 0.45rem 0.9rem; font-size: 0.85rem;" onclick="app.showUnitGuide('${unit.id}')">
              📖 Guide
            </button>
          </div>
        </div>

        <div class="path-nodes-flow" style="margin-bottom: 2.5rem;">
          ${nodesHtml}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="roadmap-container">
        <!-- Cute Mascot Welcome Banner -->
        <div style="background: var(--bg-card); border: 2px solid var(--border-color); border-radius: 20px; padding: 1.15rem 1.35rem; margin-bottom: 1.75rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--shadow-sm);">
          <div style="font-size: 2.8rem; line-height: 1;">🌸</div>
          <div>
            <div style="font-weight: 900; font-size: 1.15rem; color: var(--text-main);">
              Welcome to ${cur.language} Learning!
            </div>
            <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.2rem;">
              Tap any lesson on the map below to start interactive exercises!
            </div>
          </div>
        </div>

        ${unitsHtml}
      </div>
    `;
  }

  showUnitGuide(unitId) {
    const cur = window.HTET_CURRICULUM[this.targetLang];
    const unit = cur.units.find(u => u.id === unitId);
    if (!unit) return;

    alert(`📖 ${unit.title}\n\n${unit.subtitle}\n\nTopics covered:\n${unit.levels.map(l => `• ${l.title}: ${l.desc}`).join('\n')}\n\nReady to learn? Tap the circle icon to begin!`);
  }

  // ========================================================================
  // 2. DUOLINGO INTERACTIVE LESSON RUNNER (FULLSCREEN ENGINE)
  // ========================================================================
  startLesson(unitId, levelId) {
    const cur = window.HTET_CURRICULUM[this.targetLang];
    const unit = cur.units.find(u => u.id === unitId);
    const level = unit?.levels.find(l => l.id === levelId);
    if (!level || !level.questions?.length) return;

    if (this.hearts <= 0 && !window.htetRevenueCat?.isPremium()) {
      alert('❤️ Out of hearts! Please visit the Shop tab to refill with gems or upgrade to VIP with unlimited lives!');
      this.switchTab('shop');
      return;
    }

    if (window.htetSound) window.htetSound.playClick();

    this.activeLesson = {
      unit,
      level,
      questions: level.questions
    };
    this.questionIndex = 0;
    this.resetQuestionState();
    this.renderLessonRunner();
  }

  resetQuestionState() {
    this.selectedChoice = null;
    this.placedWords = [];
    this.selectedMatchA = null;
    this.selectedMatchB = null;
    this.matchedPairs = [];
    this.isAnswerChecked = false;
    this.isAnswerCorrect = false;
  }

  renderLessonRunner() {
    let overlay = document.getElementById('lessonRunnerOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'lessonRunnerOverlay';
      overlay.className = 'lesson-runner-overlay';
      document.body.appendChild(overlay);
    }

    const q = this.activeLesson.questions[this.questionIndex];
    const progressPercent = Math.round((this.questionIndex / this.activeLesson.questions.length) * 100);

    overlay.innerHTML = `
      <div class="runner-header">
        <button class="runner-close-btn" onclick="app.quitLesson()" title="Quit Lesson">✕</button>
        <div class="runner-progress-track">
          <div class="runner-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="stat-pill stat-hearts" style="font-size: 1rem;">
          ❤️ ${window.htetRevenueCat?.isPremium() ? '∞' : this.hearts}
        </div>
      </div>

      <div class="runner-body">
        <!-- Cute Mascot Header Prompt -->
        <div class="runner-mascot-bubble">
          <div class="mascot-avatar">🐰</div>
          <div class="bubble-text-box">
            <span>${q.prompt}</span>
            ${q.audioText ? `
              <button class="audio-play-circle-btn" onclick="app.speakCurrent('${q.audioText.replace(/'/g, "\\\\'")}', '${q.audioLang || this.targetLang}')" title="Play Native Audio">
                🔊
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Question Type Content -->
        <div id="exerciseSlot" style="flex: 1;">
          ${this.renderQuestionTypeHtml(q)}
        </div>
      </div>

      <!-- Tactile Bottom Sheet Action Bar -->
      <div id="runnerBottomSheet" class="runner-bottom-sheet">
        <div id="feedbackText" class="sheet-feedback-text"></div>
        <button id="runnerActionBtn" class="duo-btn duo-btn-primary" onclick="app.handleRunnerAction()">
          CHECK
        </button>
      </div>
    `;

    // Auto-pronounce if audioText exists
    if (q.audioText) {
      setTimeout(() => this.speakCurrent(q.audioText, q.audioLang || this.targetLang), 300);
    }
  }

  renderQuestionTypeHtml(q) {
    if (q.type === 'choice') {
      return `
        <div class="choice-cards-grid">
          ${q.options.map((opt, i) => `
            <div class="choice-option-card ${this.selectedChoice === i ? 'selected' : ''}" 
                 onclick="app.selectChoice(${i})">
              <span class="choice-index-badge">${['A', 'B', 'C', 'D'][i]}</span>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (q.type === 'word_bank') {
      const remainingBank = q.words.filter(w => {
        const countInTarget = q.words.filter(x => x === w).length;
        const countInPlaced = this.placedWords.filter(x => x === w).length;
        return countInPlaced < countInTarget;
      });

      return `
        <div class="sentence-builder-slot">
          ${this.placedWords.length === 0 ? `
            <span style="color: var(--text-muted); font-size: 0.95rem;">Tap words below in correct sequence...</span>
          ` : this.placedWords.map((w, idx) => `
            <button class="word-chip" style="background: var(--rose-light); border-color: var(--rose-primary); color: var(--rose-primary);" 
                    onclick="app.removePlacedWord(${idx})">
              ${w}
            </button>
          `).join('')}
        </div>

        <div class="word-bank-chips-pool">
          ${q.words.map((w, idx) => {
            const isUsed = this.placedWords.filter(x => x === w).length >= q.words.filter(x => x === w).length;
            return `
              <button class="word-chip ${isUsed ? 'used' : ''}" 
                      onclick="${isUsed ? '' : `app.addWordToSlot('${w.replace(/'/g, "\\\\'")}')`}">
                ${w}
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    if (q.type === 'match') {
      return `
        <div class="matching-pairs-grid">
          ${q.pairs.map((p, idx) => {
            const isMatchedA = this.matchedPairs.includes(p.a);
            const isSelectedA = this.selectedMatchA === p.a;
            return `
              <button class="match-card-btn ${isMatchedA ? 'matched' : ''} ${isSelectedA ? 'selected' : ''}"
                      onclick="${isMatchedA ? '' : `app.selectMatchCard('a', '${p.a.replace(/'/g, "\\\\'")}')`}">
                ${p.a}
              </button>
            `;
          }).join('')}

          ${q.pairs.map((p, idx) => {
            const isMatchedB = this.matchedPairs.includes(p.b);
            const isSelectedB = this.selectedMatchB === p.b;
            return `
              <button class="match-card-btn ${isMatchedB ? 'matched' : ''} ${isSelectedB ? 'selected' : ''}"
                      onclick="${isMatchedB ? '' : `app.selectMatchCard('b', '${p.b.replace(/'/g, "\\\\'")}')`}">
                ${p.b}
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    return `<div>Unknown question type</div>`;
  }

  selectChoice(index) {
    if (this.isAnswerChecked) return;
    if (window.htetSound) window.htetSound.playClick();
    this.selectedChoice = index;
    const exerciseSlot = document.getElementById('exerciseSlot');
    if (exerciseSlot) {
      exerciseSlot.innerHTML = this.renderQuestionTypeHtml(this.activeLesson.questions[this.questionIndex]);
    }
  }

  addWordToSlot(word) {
    if (this.isAnswerChecked) return;
    if (window.htetSound) window.htetSound.playClick();
    this.placedWords.push(word);
    const exerciseSlot = document.getElementById('exerciseSlot');
    if (exerciseSlot) {
      exerciseSlot.innerHTML = this.renderQuestionTypeHtml(this.activeLesson.questions[this.questionIndex]);
    }
  }

  removePlacedWord(index) {
    if (this.isAnswerChecked) return;
    if (window.htetSound) window.htetSound.playClick();
    this.placedWords.splice(index, 1);
    const exerciseSlot = document.getElementById('exerciseSlot');
    if (exerciseSlot) {
      exerciseSlot.innerHTML = this.renderQuestionTypeHtml(this.activeLesson.questions[this.questionIndex]);
    }
  }

  selectMatchCard(col, val) {
    if (this.isAnswerChecked) return;
    if (window.htetSound) window.htetSound.playClick();

    if (col === 'a') this.selectedMatchA = val;
    if (col === 'b') this.selectedMatchB = val;

    const q = this.activeLesson.questions[this.questionIndex];

    if (this.selectedMatchA && this.selectedMatchB) {
      // Check pair match
      const pair = q.pairs.find(p => p.a === this.selectedMatchA && p.b === this.selectedMatchB);
      if (pair) {
        if (window.htetSound) window.htetSound.playMatch();
        this.matchedPairs.push(pair.a, pair.b);
        this.selectedMatchA = null;
        this.selectedMatchB = null;

        if (this.matchedPairs.length >= q.pairs.length * 2) {
          // All matched!
          this.isAnswerChecked = true;
          this.isAnswerCorrect = true;
          this.showFeedbackSheet(true, '🎉 All pairs matched perfectly!');
        }
      } else {
        if (window.htetSound) window.htetSound.playIncorrect();
        setTimeout(() => {
          this.selectedMatchA = null;
          this.selectedMatchB = null;
          const slot = document.getElementById('exerciseSlot');
          if (slot) slot.innerHTML = this.renderQuestionTypeHtml(q);
        }, 300);
      }
    }

    const slot = document.getElementById('exerciseSlot');
    if (slot) slot.innerHTML = this.renderQuestionTypeHtml(q);
  }

  handleRunnerAction() {
    if (this.isAnswerChecked) {
      // Proceed to next question or complete
      this.questionIndex++;
      if (this.questionIndex >= this.activeLesson.questions.length) {
        this.finishLesson();
      } else {
        this.resetQuestionState();
        this.renderLessonRunner();
      }
      return;
    }

    // Checking answer
    const q = this.activeLesson.questions[this.questionIndex];
    let correct = false;
    let tip = q.tip || '';

    if (q.type === 'choice') {
      if (this.selectedChoice === null) {
        alert('Please select an option before checking! 🌸');
        return;
      }
      correct = (this.selectedChoice === q.correctIndex);
      if (!correct) {
        tip = `Correct answer: ${q.options[q.correctIndex]}`;
      }
    } else if (q.type === 'word_bank') {
      if (this.placedWords.length === 0) {
        alert('Please arrange the words to form your answer! 🌸');
        return;
      }
      correct = (this.placedWords.join(' ') === q.targetSentence.join(' '));
      if (!correct) {
        tip = `Correct answer: ${q.targetSentence.join(' ')}`;
      }
    } else if (q.type === 'match') {
      if (this.matchedPairs.length < q.pairs.length * 2) {
        alert('Please match all pairs first! 🌸');
        return;
      }
      correct = true;
    }

    this.isAnswerChecked = true;
    this.isAnswerCorrect = correct;

    if (correct) {
      if (window.htetSound) window.htetSound.playCorrect();
      this.showFeedbackSheet(true, tip || 'Excellent! အဖြေမှန်ပါတယ်ရှင်!');
    } else {
      if (window.htetSound) window.htetSound.playIncorrect();
      if (!window.htetRevenueCat?.isPremium()) {
        this.hearts = Math.max(0, this.hearts - 1);
        this.updateTopBarUI();
      }
      this.showFeedbackSheet(false, tip || 'Keep trying! မမှန်သေးပါဘူးနော်။');

      if (this.hearts <= 0 && !window.htetRevenueCat?.isPremium()) {
        setTimeout(() => {
          alert('💔 Out of hearts! Visit the Shop tab to refill with gems!');
          this.quitLesson();
          this.switchTab('shop');
        }, 1200);
      }
    }
  }

  showFeedbackSheet(isCorrect, message) {
    const sheet = document.getElementById('runnerBottomSheet');
    const feedbackText = document.getElementById('feedbackText');
    const actionBtn = document.getElementById('runnerActionBtn');
    if (!sheet || !feedbackText || !actionBtn) return;

    sheet.className = `runner-bottom-sheet ${isCorrect ? 'sheet-correct' : 'sheet-incorrect'}`;
    feedbackText.innerHTML = `
      <div class="sheet-feedback-title">
        ${isCorrect ? '✅ Excellent!' : '❌ Incorrect'}
      </div>
      <div class="sheet-feedback-tip">${message}</div>
    `;

    actionBtn.className = `duo-btn ${isCorrect ? 'duo-btn-success' : 'duo-btn-primary'}`;
    actionBtn.textContent = 'CONTINUE →';
  }

  finishLesson() {
    if (window.htetSound) window.htetSound.playComplete();

    // Mark completed
    if (!this.completedLevels.includes(this.activeLesson.level.id)) {
      this.completedLevels.push(this.activeLesson.level.id);
    }
    this.xp += this.activeLesson.level.xp || 20;
    this.gems += 10;
    this.updateTopBarUI();

    const overlay = document.getElementById('lessonRunnerOverlay');
    if (overlay) {
      overlay.innerHTML = `
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
          <div style="font-size: 5rem; margin-bottom: 1rem; animation: duoPulse 1.2s infinite ease-in-out;">🎉</div>
          <h1 style="font-size: 2.2rem; font-weight: 900; color: var(--rose-primary); margin-bottom: 0.5rem;">
            Lesson Complete!
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 2rem;">
            ဂုဏ်ယူပါတယ်! You mastered <strong>${this.activeLesson.level.title}</strong>!
          </p>

          <div style="display: flex; gap: 1rem; margin-bottom: 2.5rem;">
            <div class="card" style="padding: 1.25rem 1.75rem; text-align: center; border-color: #f59e0b;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #f59e0b;">+${this.activeLesson.level.xp || 20}</div>
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">TOTAL XP</div>
            </div>
            <div class="card" style="padding: 1.25rem 1.75rem; text-align: center; border-color: #06b6d4;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #06b6d4;">+10 💎</div>
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">GEMS EARNED</div>
            </div>
          </div>

          <button class="duo-btn duo-btn-success" style="width: 100%; max-width: 320px; font-size: 1.2rem;" onclick="app.quitLesson()">
            CONTINUE LEARNING
          </button>
        </div>
      `;
    }
  }

  quitLesson() {
    const overlay = document.getElementById('lessonRunnerOverlay');
    if (overlay) overlay.remove();
    this.activeLesson = null;
    this.renderCurrentTab();
  }

  // ========================================================================
  // 3. PRACTICE HUB (MATCH MADNESS, FLASHCARDS, VOCAB DRILLS)
  // ========================================================================
  renderPracticeView(container) {
    const vocab = window.HTET_DATA?.vocabulary || [];
    const item = vocab[this.flashcardIndex % vocab.length];
    const trans = item?.translations[this.targetLang] || item?.translations.en;
    const myTrans = item?.translations.my;

    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; padding: 1.5rem 1rem 5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--rose-primary);">⚡ Practice Hub</h2>
            <p style="font-size: 0.88rem; color: var(--text-muted);">Interactive Flashcards & Rapid Mastery Drills</p>
          </div>
          <span class="pill-btn" style="background: var(--rose-light); color: var(--rose-primary); font-weight: 900;">
            Card ${this.flashcardIndex + 1} / ${vocab.length}
          </span>
        </div>

        <!-- Interactive 3D Flip Flashcard -->
        <div class="card" 
             style="min-height: 260px; padding: 2.5rem 1.5rem; text-align: center; cursor: pointer; border-radius: 24px; box-shadow: var(--shadow-md); display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 1.5rem;"
             onclick="app.flipCard()">
          <div style="font-size: 0.78rem; text-transform: uppercase; font-weight: 900; color: var(--rose-primary); margin-bottom: 0.75rem;">
            ${this.isCardFlipped ? '🇲🇲 BURMESE MEANING' : 'TARGET PHRASE • TAP TO FLIP'}
          </div>

          ${!this.isCardFlipped ? `
            <div style="font-size: 2.2rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.5rem;">
              ${trans?.word || 'Empowerment'}
            </div>
            <div style="font-size: 1.05rem; color: var(--lavender); font-family: monospace; font-weight: 700; margin-bottom: 1.25rem;">
              ${trans?.phonetic || '/ɪmˈpaʊ.ər.mənt/'}
            </div>
            <button class="audio-play-circle-btn" onclick="event.stopPropagation(); app.speakCurrent('${(trans?.word || '').replace(/'/g, "\\\\'")}', '${this.targetLang}')">
              🔊
            </button>
          ` : `
            <div style="font-size: 1.8rem; font-weight: 900; color: var(--rose-primary); margin-bottom: 0.75rem;">
              ${myTrans?.word || 'စွမ်းရည်မြှင့်တင်မှု'}
            </div>
            <div style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; max-width: 440px;">
              "${myTrans?.example || ''}"
            </div>
          `}
        </div>

        <!-- Controls -->
        <div style="display: flex; gap: 0.75rem; justify-content: center;">
          <button class="duo-btn duo-btn-subtle" onclick="app.prevCard()" style="flex: 1;">
            ← PREVIOUS
          </button>
          <button class="duo-btn duo-btn-primary" onclick="app.nextCard()" style="flex: 1;">
            NEXT CARD →
          </button>
        </div>
      </div>
    `;
  }

  flipCard() {
    if (window.htetSound) window.htetSound.playClick();
    this.isCardFlipped = !this.isCardFlipped;
    this.renderCurrentTab();
  }

  nextCard() {
    if (window.htetSound) window.htetSound.playClick();
    this.flashcardIndex++;
    this.isCardFlipped = false;
    this.renderCurrentTab();
  }

  prevCard() {
    if (window.htetSound) window.htetSound.playClick();
    this.flashcardIndex = Math.max(0, this.flashcardIndex - 1);
    this.isCardFlipped = false;
    this.renderCurrentTab();
  }

  // ========================================================================
  // 4. MULTILINGUAL DICTIONARY (WITH 15 DOWNLOADED OPEN SOURCE DATASETS)
  // ========================================================================
  setDictTab(tab) {
    this.dictTab = tab;
    this.renderCurrentTab();
  }

  renderDictView(container) {
    if (!this.dictTab) this.dictTab = 'all';

    container.innerHTML = `
      <div style="max-width: 750px; margin: 0 auto; padding: 1.25rem 1rem 5rem;">
        <div style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--rose-primary);">📖 Multilingual Lexicon & Datasets</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Integrated with 21,984 EMDictionary entries, 2,304 Myanmar Female Names, 49,500+ English definitions & Karen wordlists.
          </p>

          <!-- Dataset Category Tabs -->
          <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.4rem; margin-bottom: 1rem;">
            <button class="pill-btn ${this.dictTab === 'all' ? 'active' : ''}" onclick="app.setDictTab('all')">🌸 All Datasets</button>
            <button class="pill-btn ${this.dictTab === 'em' ? 'active' : ''}" onclick="app.setDictTab('em')">📚 EMDictionary (21,984)</button>
            <button class="pill-btn ${this.dictTab === 'names' ? 'active' : ''}" onclick="app.setDictTab('names')">🌸 Female Names (2,304)</button>
            <button class="pill-btn ${this.dictTab === 'eng' ? 'active' : ''}" onclick="app.setDictTab('eng')">📖 English Monolingual</button>
            <button class="pill-btn ${this.dictTab === 'karen' ? 'active' : ''}" onclick="app.setDictTab('karen')">🌿 Karen Lexicon</button>
            <button class="pill-btn ${this.dictTab === 'sources' ? 'active' : ''}" onclick="app.setDictTab('sources')">🗂️ Stored Datasets (15)</button>
          </div>

          <div class="search-input-group">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="dictSearchInput" class="search-input" placeholder="Search words or names in English, မြန်မာ, 日本語, 中文..." oninput="app.searchDict(this.value)">
          </div>
        </div>

        <div id="dictResultsList" style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${this.renderActiveDictTabContent()}
        </div>
      </div>
    `;
  }

  renderActiveDictTabContent() {
    if (this.dictTab === 'em') {
      const items = (this.engMyanCache || []).slice(0, 30);
      return `
        <div style="font-weight: 800; color: var(--rose-primary); font-size: 0.95rem;">
          📚 EMDictionary Database (Showing top 30 of ${this.engMyanCache ? this.engMyanCache.length.toLocaleString() : '21,984'} words)
        </div>
        ${items.map(item => `
          <div class="card" style="padding: 1.15rem;">
            <div class="card-header" style="margin-bottom: 0.4rem;">
              <div>
                <span style="font-size: 0.72rem; background: var(--rose-light); color: var(--rose-primary); padding: 0.15rem 0.55rem; border-radius: var(--radius-full); font-weight: 800;">EMDictionary</span>
                <h3 style="font-size: 1.25rem; font-weight: 900; margin-top: 0.2rem;">${item.w}</h3>
              </div>
              <button class="icon-btn" onclick="app.speakCurrent('${item.w.replace(/'/g, "\\\\'")}', 'en')">🔊 Speak</button>
            </div>
            <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">${item.d}</div>
          </div>
        `).join('')}
      `;
    }

    if (this.dictTab === 'names') {
      const items = (this.femaleNamesCache || []).slice(0, 30);
      return `
        <div style="font-weight: 800; color: #d63384; font-size: 0.95rem;">
          🌸 Myanmar Female Names & Identity (Showing top 30 of ${this.femaleNamesCache ? this.femaleNamesCache.length.toLocaleString() : '2,304'} names)
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
          ${items.map(item => `
            <div class="card" style="padding: 0.9rem 1.15rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 900; font-size: 1.15rem; color: var(--rose-primary);">${item.mm}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${item.en} • Female Name</div>
              </div>
              <button class="icon-btn" onclick="app.speakCurrent('${item.en}', 'en')">🔊</button>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (this.dictTab === 'eng') {
      const keys = Object.keys(this.engEngCache || {}).slice(0, 25);
      return `
        <div style="font-weight: 800; color: var(--lavender-dark); font-size: 0.95rem;">
          📖 English Monolingual Lexicon (Showing top 25 definitions)
        </div>
        ${keys.map(k => `
          <div class="card" style="padding: 1.15rem;">
            <div class="card-header" style="margin-bottom: 0.4rem;">
              <div>
                <span style="font-size: 0.72rem; background: var(--lavender-light); color: var(--lavender-dark); padding: 0.15rem 0.55rem; border-radius: var(--radius-full); font-weight: 800;">LexiVerse Monolingual</span>
                <h3 style="font-size: 1.2rem; font-weight: 900; margin-top: 0.2rem;">${k}</h3>
              </div>
              <button class="icon-btn" onclick="app.speakCurrent('${k.replace(/'/g, "\\\\'")}', 'en')">🔊 Speak</button>
            </div>
            <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">${this.engEngCache[k]}</div>
          </div>
        `).join('')}
      `;
    }

    if (this.dictTab === 'karen') {
      const items = (this.karenCache || []).filter(w => !w.startsWith('#')).slice(0, 30);
      return `
        <div style="font-weight: 800; color: #059669; font-size: 0.95rem;">
          🌿 Sgaw & Pwo Karen Words & Syllables
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.6rem;">
          ${items.map(w => `
            <div class="card" style="padding: 0.75rem 1rem; font-weight: 800; font-size: 1.05rem; color: var(--text-main); text-align: center;">
              ${w}
            </div>
          `).join('')}
        </div>
      `;
    }

    if (this.dictTab === 'sources') {
      return `
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1.25rem; font-weight: 900; color: var(--rose-primary); margin-bottom: 0.5rem;">
            🗂️ Stored Open Source Datasets in HtetLingo
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            All datasets provided have been downloaded directly into the repository <code>data/</code> folder and indexed.
          </p>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
              <thead>
                <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted);">
                  <th style="padding: 0.5rem;">Dataset</th>
                  <th style="padding: 0.5rem;">File Path</th>
                  <th style="padding: 0.5rem;">Size / Entries</th>
                  <th style="padding: 0.5rem;">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">EMDictionary</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/EMDictionary.db</td>
                  <td style="padding: 0.6rem;">35.8 MB (21,984 words)</td>
                  <td style="padding: 0.6rem;">Eng-Myan SQLite DB by soeminnminn</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">English Monolingual</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/english_to_english.json</td>
                  <td style="padding: 0.6rem;">4.7 MB (49,537 words)</td>
                  <td style="padding: 0.6rem;">English-to-English dictionary</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">dwyl English Words</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/words_alpha.txt</td>
                  <td style="padding: 0.6rem;">4.0 MB (370k words)</td>
                  <td style="padding: 0.6rem;">dwyl/english-words wordlist</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">MCFNLP Dictionary</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/mcfnlp/*.xls</td>
                  <td style="padding: 0.6rem;">13.2 MB</td>
                  <td style="padding: 0.6rem;">Myanmar Computer Federation NLP</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">Burmese Segment</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/burmese-word-list.txt</td>
                  <td style="padding: 0.6rem;">1.1 MB (41,343 words)</td>
                  <td style="padding: 0.6rem;">lwinmoe/segment wordlist</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">Myanmar Common</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/mydict-common-words.txt</td>
                  <td style="padding: 0.6rem;">771 KB (28,854 words)</td>
                  <td style="padding: 0.6rem;">trhura/pango-myanmar</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">Myanmar Names EN-MM</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/MyanmarName-en-mm.csv</td>
                  <td style="padding: 0.6rem;">341 KB (12,044 pairs)</td>
                  <td style="padding: 0.6rem;">MgHla/Myanmar-Name_en-2-mm</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">Female Names</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/sorted_females.txt</td>
                  <td style="padding: 0.6rem;">28 KB (2,304 names)</td>
                  <td style="padding: 0.6rem;">L16H7/Myanmar_Names</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Default 'all'
    const dict = window.HTET_DATA?.dictionary || [];
    return `
      <div style="font-weight: 800; color: var(--rose-primary); font-size: 0.95rem; margin-bottom: 0.25rem;">
        🌸 Curated Sisterhood & Multilingual Vocabulary
      </div>
      ${dict.map(item => this.formatDictEntry(item)).join('')}
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
    } catch(e) {}
  }

  async searchDict(query) {
    const list = document.getElementById('dictResultsList');
    if (!list) return;
    const q = query.toLowerCase().trim();
    if (!q) {
      list.innerHTML = this.renderActiveDictTabContent();
      return;
    }

    let resultsHtml = '';
    const curatedMatches = (window.HTET_DATA?.dictionary || []).filter(item => {
      if (item.term.toLowerCase().includes(q)) return true;
      if (item.translations.my.includes(q)) return true;
      if (item.translations.ja && item.translations.ja.toLowerCase().includes(q)) return true;
      if (item.translations.zh && item.translations.zh.toLowerCase().includes(q)) return true;
      return false;
    });

    if (curatedMatches.length) {
      resultsHtml += '<div style="margin-bottom: 0.5rem; font-weight: 800; color: var(--rose-primary); font-size: 0.95rem;">🌸 Sisterhood Curated Terms</div>';
      resultsHtml += curatedMatches.map(item => this.formatDictEntry(item)).join('');
    }

    // EMDictionary
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
              <button class="icon-btn" onclick="app.speakCurrent('${item.w.replace(/'/g, "\\\\'")}', 'en')">🔊 Speak</button>
            </div>
            <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
              ${item.d}
            </div>
          </div>
        `).join('');
      }
    }

    // Female Names
    if (this.femaleNamesCache && this.femaleNamesCache.length) {
      const fnMatches = this.femaleNamesCache.filter(item => {
        return item.en.toLowerCase().includes(q) || item.mm.includes(q);
      }).slice(0, 8);

      if (fnMatches.length) {
        resultsHtml += '<div style="margin: 1.25rem 0 0.6rem; font-weight: 800; color: #d63384; font-size: 0.95rem;">🌸 Myanmar Female Names & Identity (L16H7 Collection)</div>';
        resultsHtml += fnMatches.map(item => `
          <div class="card" style="padding: 0.9rem 1.15rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 900; font-size: 1.15rem; color: var(--rose-primary);">${item.mm}</div>
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
          No exact match found for "<strong>${query}</strong>" across open source datasets.<br/>
          Try another word or explore Myanmar Female Names!
        </div>
      `;
    }
  }

  // ========================================================================
  // 5. AI TUTOR VIEW
  // ========================================================================
  renderAITutorView(container) {
    container.innerHTML = `
      <div style="max-width: 650px; margin: 0 auto; padding: 1.5rem 1rem 5rem;">
        <div style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--rose-primary);">🤖 Safe Space AI Tutor</h2>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            Practice conversational speaking with encouraging, empathetic AI.
          </p>
        </div>

        <div class="card" id="aiChatBox" style="min-height: 320px; max-height: 440px; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1rem;">
          <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
            <div style="font-size: 2rem;">🌸</div>
            <div style="background: var(--bg-card-subtle); padding: 0.85rem 1.15rem; border-radius: 18px; border: 1.5px solid var(--border-color); font-size: 0.95rem; line-height: 1.5;">
              Welcome, lovely learner! 🌸 How has your day been? What would you like to practice in <strong>${this.targetLang.toUpperCase()}</strong> today?
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <input type="text" id="aiChatInput" class="search-input" placeholder="Type a message or response..." onkeydown="if(event.key === 'Enter') app.sendChatMessage()">
          <button class="duo-btn duo-btn-primary" onclick="app.sendChatMessage()" style="padding: 0.6rem 1.2rem;">
            SEND
          </button>
        </div>
      </div>
    `;
  }

  sendChatMessage() {
    const input = document.getElementById('aiChatInput');
    const text = input?.value?.trim();
    if (!text) return;
    input.value = '';

    const chatBox = document.getElementById('aiChatBox');
    if (!chatBox) return;

    chatBox.innerHTML += `
      <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
        <div style="background: var(--rose-primary); color: white; padding: 0.85rem 1.15rem; border-radius: 18px; font-size: 0.95rem; max-width: 80%;">
          ${text}
        </div>
      </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      const resp = window.htetAITutor?.respond(text, this.targetLang) || { reply: "You speak with great clarity! Keep up the brilliant work! 🌸", tip: "Great sentence structure." };
      chatBox.innerHTML += `
        <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
          <div style="font-size: 2rem;">🌸</div>
          <div style="background: var(--bg-card-subtle); padding: 0.85rem 1.15rem; border-radius: 18px; border: 1.5px solid var(--border-color); font-size: 0.95rem; line-height: 1.5;">
            ${resp.reply}
            <div style="font-size: 0.8rem; color: var(--rose-primary); margin-top: 0.4rem; font-weight: 800;">
              ✨ Tip: ${resp.tip}
            </div>
          </div>
        </div>
      `;
      chatBox.scrollTop = chatBox.scrollHeight;
      this.speakCurrent(resp.reply, this.targetLang);
    }, 600);
  }

  // ========================================================================
  // 6. SHOP & VIP VIEW
  // ========================================================================
  renderShopView(container) {
    const isVIP = window.htetRevenueCat?.isPremium();

    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; padding: 1.5rem 1rem 5rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">👑</div>
          <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--rose-primary);">HtetLingo Shop & VIP</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Refill lives or unlock permanent VIP benefits!</p>
        </div>

        <!-- Hearts Refill Card -->
        <div class="card" style="padding: 1.5rem; margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 2.5rem;">❤️</div>
            <div>
              <div style="font-weight: 900; font-size: 1.2rem;">Full Hearts Refill</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Restore your hearts to 5 right now</div>
            </div>
          </div>
          <button class="duo-btn duo-btn-success" onclick="app.refillHearts()">
            ${this.hearts >= 5 ? 'FULL' : 'REFILL 100 💎'}
          </button>
        </div>

        <!-- VIP Membership Card -->
        <div class="card" style="padding: 1.75rem; border: 2.5px solid #f59e0b; background: linear-gradient(135deg, var(--bg-card), #fefce8); margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
              <span class="unit-badge" style="background: #f59e0b; color: white;">👑 VIP UPGRADE</span>
              <h3 style="font-size: 1.35rem; font-weight: 900; margin-top: 0.35rem;">HtetLingo VIP Pass</h3>
            </div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #b45309;">$7.99 <span style="font-size: 0.85rem;">/mo</span></div>
          </div>
          <ul style="font-size: 0.92rem; line-height: 1.8; margin-bottom: 1.5rem; list-style: none; padding-left: 0;">
            <li>✨ <strong>Unlimited Hearts (∞)</strong> — never stop learning</li>
            <li>✨ <strong>AI Tutor Conversations</strong> — unlimited voice chats</li>
            <li>✨ <strong>All 8 Languages Unlocked</strong></li>
            <li>✨ <strong>Offline Lexicon & Datasets Download</strong></li>
          </ul>
          <button class="duo-btn duo-btn-primary" style="width: 100%;" onclick="app.buyVIP()">
            ${isVIP ? '⭐ VIP ACTIVE' : 'UPGRADE TO VIP (TEST RC)'}
          </button>
        </div>
      </div>
    `;
  }

  refillHearts() {
    if (this.hearts >= 5) {
      alert('❤️ Your hearts are already full!');
      return;
    }
    if (this.gems < 100) {
      alert('💎 You need 100 gems to refill hearts! Complete more lessons to earn gems.');
      return;
    }
    this.gems -= 100;
    this.hearts = 5;
    this.updateTopBarUI();
    if (window.htetSound) window.htetSound.playCorrect();
    alert('❤️ Hearts refilled to 5! Keep shining!');
    this.renderCurrentTab();
  }

  buyVIP() {
    if (window.htetRevenueCat) {
      window.htetRevenueCat.purchase('premium_monthly').then(() => {
        if (window.htetSound) window.htetSound.playComplete();
        alert('🎉 Welcome to HtetLingo VIP! You now have unlimited hearts and unlocked AI tutoring!');
        this.updateTopBarUI();
        this.renderCurrentTab();
      });
    }
  }

  // ========================================================================
  // 7. PROFILE & SETTINGS VIEW
  // ========================================================================
  renderProfileView(container) {
    const user = window.htetSupabase?.getCurrentUser();

    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; padding: 1.5rem 1rem 5rem;">
        <!-- Avatar Header -->
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 86px; height: 86px; border-radius: 50%; background: linear-gradient(135deg, #f43f5e, #a855f7); color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 2.8rem; box-shadow: var(--shadow-md); margin-bottom: 0.75rem;">
            🌸
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 900;">${user ? user.displayName : 'Htet (Lovely Learner)'}</h2>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            ${user ? user.email : 'Signed in as Local Guest'}
          </p>
        </div>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
          <div class="card" style="padding: 1.25rem; text-align: center;">
            <div style="font-size: 2rem; font-weight: 900; color: #f97316;">🔥 ${this.streak}</div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">DAY STREAK</div>
          </div>
          <div class="card" style="padding: 1.25rem; text-align: center;">
            <div style="font-size: 2rem; font-weight: 900; color: #f59e0b;">⚡ ${this.xp}</div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">TOTAL XP</div>
          </div>
          <div class="card" style="padding: 1.25rem; text-align: center;">
            <div style="font-size: 2rem; font-weight: 900; color: #06b6d4;">💎 ${this.gems}</div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">GEMS</div>
          </div>
          <div class="card" style="padding: 1.25rem; text-align: center;">
            <div style="font-size: 2rem; font-weight: 900; color: #10b981;">🏆 ${this.completedLevels.length}</div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">LEVELS PASSED</div>
          </div>
        </div>

        <!-- Language Selector -->
        <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 900; margin-bottom: 0.75rem;">Change Target Language</h3>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="pill-btn ${this.targetLang === 'ja' ? 'active' : ''}" onclick="app.setTargetLang('ja')">🇯🇵 Japanese</button>
            <button class="pill-btn ${this.targetLang === 'en' ? 'active' : ''}" onclick="app.setTargetLang('en')">🇺🇸 English</button>
            <button class="pill-btn ${this.targetLang === 'zh' ? 'active' : ''}" onclick="app.setTargetLang('zh')">🇨🇳 Chinese</button>
            <button class="pill-btn ${this.targetLang === 'th' ? 'active' : ''}" onclick="app.setTargetLang('th')">🇹🇭 Thai</button>
            <button class="pill-btn ${this.targetLang === 'my' ? 'active' : ''}" onclick="app.setTargetLang('my')">🇲🇲 Burmese</button>
          </div>
        </div>
      </div>
    `;
  }

  setTargetLang(langCode) {
    if (window.HTET_CURRICULUM[langCode]) {
      this.targetLang = langCode;
      localStorage.setItem('htetlingo_target_lang', langCode);
      if (window.htetSound) window.htetSound.playClick();
      this.renderCurrentTab();
    }
  }

  openLanguageModal() {
    this.switchTab('profile');
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
            <p>Initializing platform components... Please refresh.</p>
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
