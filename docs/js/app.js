// ==========================================================================
// HtetLingo Interactive Language Learning Platform
// Original Learning Studio Engine & High-Accuracy Multilingual Search
// Powered by Open-Source Lexical Datasets (EMDictionary, Myanmar POS, Names)
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

    // Studio Exercise State
    this.activeLesson = null;
    this.questionIndex = 0;
    this.selectedChoice = null;
    this.placedWords = [];
    this.selectedMatchA = null;
    this.selectedMatchB = null;
    this.matchedPairs = [];
    this.isAnswerChecked = false;
    this.isAnswerCorrect = false;

    // Practice Hub State
    this.flashcardIndex = 0;
    this.isCardFlipped = false;

    // Search Engine & Datasets State
    this.dictTab = 'all';
    this.lexiconData = [];
    this.femaleNamesData = [];
    this.engEngData = {};
    this.karenData = [];

    this.loadDatasets();
    this.init();
  }

  async init() {
    this.updateStatusHeader();
    this.bindEvents();
    this.renderCurrentTab();
    this.checkNetworkState();

    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js?v=2.2.0');
        console.log('[HtetLingo] Learning Studio service worker active');
      } catch (e) {}
    }
  }

  bindEvents() {
    document.querySelectorAll('.nav-tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    window.addEventListener('online', () => this.checkNetworkState());
    window.addEventListener('offline', () => this.checkNetworkState());
  }

  updateStatusHeader() {
    const cur = window.HTET_CURRICULUM[this.targetLang] || window.HTET_CURRICULUM.ja;
    const langLabel = document.getElementById('topLangLabel');
    if (langLabel) langLabel.textContent = `${cur.flag} ${cur.language}`;

    const streakEl = document.getElementById('topStreakCount');
    if (streakEl) streakEl.textContent = this.streak;

    const xpEl = document.getElementById('topXpCount');
    if (xpEl) xpEl.textContent = this.xp;

    const energyEl = document.getElementById('topEnergyCount');
    if (energyEl) energyEl.textContent = `${this.energy}%`;

    localStorage.setItem('htetlingo_streak', this.streak);
    localStorage.setItem('htetlingo_xp', this.xp);
    localStorage.setItem('htetlingo_energy', this.energy);
    localStorage.setItem('htetlingo_gems', this.gems);
    localStorage.setItem('htetlingo_completed_levels', JSON.stringify(this.completedLevels));
  }

  checkNetworkState() {
    const banner = document.getElementById('offlineBanner');
    if (!banner) return;
    if (navigator.onLine) {
      banner.style.display = 'none';
    } else {
      banner.style.display = 'flex';
      banner.innerHTML = '<span>🌸 100% Offline Mode — Lessons, Lexicon & Audio synthesizer are ready!</span>';
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

  // --- Load Open-Source Datasets & Wire High-Accuracy Search Engine ---
  async loadDatasets() {
    try {
      const [lexRes, fnRes, eeRes, kwRes] = await Promise.all([
        fetch('./data/lexicon_quick.json').catch(() => null),
        fetch('./data/female_names.json').catch(() => null),
        fetch('./data/eng_eng_quick.json').catch(() => null),
        fetch('./data/karen_words.json').catch(() => null)
      ]);

      if (lexRes && lexRes.ok) this.lexiconData = await lexRes.json();
      if (fnRes && fnRes.ok) this.femaleNamesData = await fnRes.json();
      if (eeRes && eeRes.ok) this.engEngData = await eeRes.json();
      if (kwRes && kwRes.ok) this.karenData = await kwRes.json();

      if (window.htetSearchEngine) {
        window.htetSearchEngine.setDatasets({
          lexicon: this.lexiconData,
          femaleNames: this.femaleNamesData,
          englishToEnglish: this.engEngData,
          karenWords: this.karenData
        });
        console.log('[HtetLingo] High-Accuracy Search Engine indexed', this.lexiconData.length, 'EMDictionary words');
      }

      // Background load full 21k index for complete deep search
      fetch('./data/lexicon_index.json')
        .then(r => r.ok ? r.json() : null)
        .then(fullLex => {
          if (fullLex && window.htetSearchEngine) {
            this.lexiconData = fullLex;
            window.htetSearchEngine.setDatasets({
              lexicon: fullLex,
              femaleNames: this.femaleNamesData,
              englishToEnglish: this.engEngData,
              karenWords: this.karenData
            });
            console.log('[HtetLingo] Deep Lexicon Index upgraded to full', fullLex.length, 'words');
          }
        })
        .catch(() => {});
    } catch (e) {
      console.warn('Dataset load note:', e);
    }
  }

  // --- View Switcher ---
  renderCurrentTab() {
    const viewport = document.getElementById('mainViewport');
    if (!viewport) return;

    this.updateStatusHeader();

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
  // 1. LEARN STUDIO (ROADMAP PATH INTEGRATING DATASET MODULES)
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
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <div>
              <span class="htet-unit-badge">${unit.title}</span>
              <div class="htet-unit-title">${unit.icon} ${unit.subtitle}</div>
            </div>
            <button class="htet-btn htet-btn-outline" style="padding: 0.4rem 0.85rem; font-size: 0.85rem;" onclick="app.showUnitGuide('${unit.id}')">
              📖 Overview
            </button>
          </div>
        </div>

        <div class="htet-quest-flow" style="margin-bottom: 2.5rem;">
          ${nodesHtml}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="htet-roadmap-wrap">
        <div style="background: var(--bg-card); border: 2px solid var(--border-color); border-radius: 20px; padding: 1.15rem 1.35rem; margin-bottom: 1.75rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--shadow-sm);">
          <div style="font-size: 2.8rem; line-height: 1;">🌸</div>
          <div>
            <div style="font-weight: 900; font-size: 1.15rem; color: var(--text-main);">
              HtetLingo Learning Studio: ${cur.language}
            </div>
            <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.2rem;">
              Step-by-step interactive lessons powered by open-source lexical datasets.
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

    alert(`📖 ${unit.title}\n\n${unit.subtitle}\n\nLessons in this unit:\n${unit.levels.map(l => `• ${l.title}: ${l.desc}`).join('\n')}\n\nTap the active lesson circle on the path to start practicing!`);
  }

  // ========================================================================
  // 2. ORIGINAL INTERACTIVE STUDIO LESSON RUNNER
  // ========================================================================
  startStudioLesson(unitId, levelId) {
    const cur = window.HTET_CURRICULUM[this.targetLang];
    const unit = cur.units.find(u => u.id === unitId);
    const level = unit?.levels.find(l => l.id === levelId);
    if (!level || !level.questions?.length) return;

    if (window.htetSound) window.htetSound.playClick();

    this.activeLesson = {
      unit,
      level,
      questions: level.questions
    };
    this.questionIndex = 0;
    this.resetLessonState();
    this.renderStudioLessonModal();
  }

  resetLessonState() {
    this.selectedChoice = null;
    this.placedWords = [];
    this.selectedMatchA = null;
    this.selectedMatchB = null;
    this.matchedPairs = [];
    this.isAnswerChecked = false;
    this.isAnswerCorrect = false;
  }

  renderStudioLessonModal() {
    let overlay = document.getElementById('htetStudioModal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'htetStudioModal';
      overlay.className = 'htet-studio-overlay';
      document.body.appendChild(overlay);
    }

    const q = this.activeLesson.questions[this.questionIndex];
    const progressPercent = Math.round((this.questionIndex / this.activeLesson.questions.length) * 100);

    overlay.innerHTML = `
      <div class="studio-top-bar">
        <button class="studio-close-btn" onclick="app.closeStudioLesson()" title="Quit Session">✕</button>
        <div class="studio-progress-track">
          <div class="studio-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="htet-stat-badge stat-energy">
          ⚡ ${this.energy}%
        </div>
      </div>

      <div class="studio-content-body">
        <div class="studio-prompt-card">
          <div class="mascot-blossom">🌸</div>
          <div class="prompt-speech-bubble">
            <span>${q.prompt}</span>
            ${q.audioText ? `
              <button class="htet-audio-btn" onclick="app.speakCurrent('${q.audioText.replace(/'/g, "\\\\'")}', '${q.audioLang || this.targetLang}')" title="Play Pronunciation">
                🔊
              </button>
            ` : ''}
          </div>
        </div>

        <div id="studioExerciseSlot" style="flex: 1;">
          ${this.renderExerciseQuestion(q)}
        </div>
      </div>

      <div id="studioBottomDrawer" class="studio-feedback-drawer">
        <div id="feedbackTextWrap" class="feedback-text-wrap"></div>
        <button id="studioActionBtn" class="htet-btn htet-btn-primary" onclick="app.handleStudioCheck()">
          CHECK ANSWER
        </button>
      </div>
    `;

    if (q.audioText) {
      setTimeout(() => this.speakCurrent(q.audioText, q.audioLang || this.targetLang), 300);
    }
  }

  renderExerciseQuestion(q) {
    if (q.type === 'choice') {
      return `
        <div class="studio-choices-grid">
          ${q.options.map((opt, i) => `
            <div class="studio-choice-item ${this.selectedChoice === i ? 'selected' : ''}" 
                 onclick="app.selectStudioChoice(${i})">
              <span class="choice-key-badge">${['A', 'B', 'C', 'D'][i]}</span>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (q.type === 'word_bank') {
      return `
        <div class="assembly-target-slot">
          ${this.placedWords.length === 0 ? `
            <span style="color: var(--text-muted); font-size: 0.95rem;">Tap word chips below to construct the translation...</span>
          ` : this.placedWords.map((w, idx) => `
            <button class="vocab-chip-btn" style="background: var(--rose-light); border-color: var(--rose-primary); color: var(--rose-primary);" 
                    onclick="app.removeAssemblyWord(${idx})">
              ${w}
            </button>
          `).join('')}
        </div>

        <div class="assembly-chips-bank">
          ${q.words.map((w, idx) => {
            const isUsed = this.placedWords.filter(x => x === w).length >= q.words.filter(x => x === w).length;
            return `
              <button class="vocab-chip-btn ${isUsed ? 'used' : ''}" 
                      onclick="${isUsed ? '' : `app.addAssemblyWord('${w.replace(/'/g, "\\\\'")}')`}">
                ${w}
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    if (q.type === 'match') {
      return `
        <div class="pairing-cards-grid">
          ${q.pairs.map((p) => {
            const isMatchedA = this.matchedPairs.includes(p.a);
            const isSelectedA = this.selectedMatchA === p.a;
            return `
              <button class="pair-card-cell ${isMatchedA ? 'matched' : ''} ${isSelectedA ? 'selected' : ''}"
                      onclick="${isMatchedA ? '' : `app.selectPairMatch('a', '${p.a.replace(/'/g, "\\\\'")}')`}">
                ${p.a}
              </button>
            `;
          }).join('')}

          ${q.pairs.map((p) => {
            const isMatchedB = this.matchedPairs.includes(p.b);
            const isSelectedB = this.selectedMatchB === p.b;
            return `
              <button class="pair-card-cell ${isMatchedB ? 'matched' : ''} ${isSelectedB ? 'selected' : ''}"
                      onclick="${isMatchedB ? '' : `app.selectPairMatch('b', '${p.b.replace(/'/g, "\\\\'")}')`}">
                ${p.b}
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    return `<div>Ready</div>`;
  }

  selectStudioChoice(index) {
    if (this.isAnswerChecked) return;
    if (window.htetSound) window.htetSound.playClick();
    this.selectedChoice = index;
    const slot = document.getElementById('studioExerciseSlot');
    if (slot) slot.innerHTML = this.renderExerciseQuestion(this.activeLesson.questions[this.questionIndex]);
  }

  addAssemblyWord(word) {
    if (this.isAnswerChecked) return;
    if (window.htetSound) window.htetSound.playClick();
    this.placedWords.push(word);
    const slot = document.getElementById('studioExerciseSlot');
    if (slot) slot.innerHTML = this.renderExerciseQuestion(this.activeLesson.questions[this.questionIndex]);
  }

  removeAssemblyWord(index) {
    if (this.isAnswerChecked) return;
    if (window.htetSound) window.htetSound.playClick();
    this.placedWords.splice(index, 1);
    const slot = document.getElementById('studioExerciseSlot');
    if (slot) slot.innerHTML = this.renderExerciseQuestion(this.activeLesson.questions[this.questionIndex]);
  }

  selectPairMatch(col, val) {
    if (this.isAnswerChecked) return;
    if (window.htetSound) window.htetSound.playClick();

    if (col === 'a') this.selectedMatchA = val;
    if (col === 'b') this.selectedMatchB = val;

    const q = this.activeLesson.questions[this.questionIndex];

    if (this.selectedMatchA && this.selectedMatchB) {
      const pair = q.pairs.find(p => p.a === this.selectedMatchA && p.b === this.selectedMatchB);
      if (pair) {
        if (window.htetSound) window.htetSound.playMatch();
        this.matchedPairs.push(pair.a, pair.b);
        this.selectedMatchA = null;
        this.selectedMatchB = null;

        if (this.matchedPairs.length >= q.pairs.length * 2) {
          this.isAnswerChecked = true;
          this.isAnswerCorrect = true;
          this.showDrawerFeedback(true, '🎉 All pairs matched correctly!');
        }
      } else {
        if (window.htetSound) window.htetSound.playIncorrect();
        setTimeout(() => {
          this.selectedMatchA = null;
          this.selectedMatchB = null;
          const slot = document.getElementById('studioExerciseSlot');
          if (slot) slot.innerHTML = this.renderExerciseQuestion(q);
        }, 300);
      }
    }

    const slot = document.getElementById('studioExerciseSlot');
    if (slot) slot.innerHTML = this.renderExerciseQuestion(q);
  }

  handleStudioCheck() {
    if (this.isAnswerChecked) {
      this.questionIndex++;
      if (this.questionIndex >= this.activeLesson.questions.length) {
        this.completeStudioLesson();
      } else {
        this.resetLessonState();
        this.renderStudioLessonModal();
      }
      return;
    }

    const q = this.activeLesson.questions[this.questionIndex];
    let correct = false;
    let tip = q.tip || '';

    if (q.type === 'choice') {
      if (this.selectedChoice === null) {
        alert('Please choose an answer before checking! 🌸');
        return;
      }
      correct = (this.selectedChoice === q.correctIndex);
      if (!correct) {
        tip = `Correct answer: ${q.options[q.correctIndex]}`;
      }
    } else if (q.type === 'word_bank') {
      if (this.placedWords.length === 0) {
        alert('Please construct your sentence first! 🌸');
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
      this.showDrawerFeedback(true, tip || 'Correct! အဖြေမှန်ပါတယ်ရှင်!');
    } else {
      if (window.htetSound) window.htetSound.playIncorrect();
      this.showDrawerFeedback(false, tip || 'Keep going! နောက်တစ်ခါ ထပ်ကြိုးစားကြည့်ပါနော်။');
    }
  }

  showDrawerFeedback(isCorrect, message) {
    const drawer = document.getElementById('studioBottomDrawer');
    const textWrap = document.getElementById('feedbackTextWrap');
    const actionBtn = document.getElementById('studioActionBtn');
    if (!drawer || !textWrap || !actionBtn) return;

    drawer.className = `studio-feedback-drawer ${isCorrect ? 'drawer-success' : 'drawer-incorrect'}`;
    textWrap.innerHTML = `
      <div class="feedback-headline">
        ${isCorrect ? '✨ Well done!' : '💡 Learning Insight'}
      </div>
      <div class="feedback-explanation">${message}</div>
    `;

    actionBtn.className = `htet-btn ${isCorrect ? 'htet-btn-success' : 'htet-btn-primary'}`;
    actionBtn.textContent = 'CONTINUE →';
  }

  completeStudioLesson() {
    if (window.htetSound) window.htetSound.playComplete();

    if (!this.completedLevels.includes(this.activeLesson.level.id)) {
      this.completedLevels.push(this.activeLesson.level.id);
    }
    this.xp += this.activeLesson.level.xp || 25;
    this.gems += 15;
    this.updateStatusHeader();

    const overlay = document.getElementById('htetStudioModal');
    if (overlay) {
      overlay.innerHTML = `
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
          <div style="font-size: 5rem; margin-bottom: 1rem;">🌸</div>
          <h1 style="font-size: 2.2rem; font-weight: 900; color: var(--rose-primary); margin-bottom: 0.5rem;">
            Lesson Mastered!
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 2rem;">
            ဂုဏ်ယူပါတယ်! You completed <strong>${this.activeLesson.level.title}</strong>!
          </p>

          <div style="display: flex; gap: 1rem; margin-bottom: 2.5rem;">
            <div class="card" style="padding: 1.25rem 1.75rem; text-align: center; border-color: var(--rose-primary);">
              <div style="font-size: 1.8rem; font-weight: 900; color: var(--rose-primary);">+${this.activeLesson.level.xp || 25}</div>
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">BLOOM XP</div>
            </div>
            <div class="card" style="padding: 1.25rem 1.75rem; text-align: center; border-color: #f59e0b;">
              <div style="font-size: 1.8rem; font-weight: 900; color: #f59e0b;">+15 ⭐</div>
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">GEMS</div>
            </div>
          </div>

          <button class="htet-btn htet-btn-success" style="width: 100%; max-width: 320px; font-size: 1.15rem;" onclick="app.closeStudioLesson()">
            CONTINUE LEARNING
          </button>
        </div>
      `;
    }
  }

  closeStudioLesson() {
    const overlay = document.getElementById('htetStudioModal');
    if (overlay) overlay.remove();
    this.activeLesson = null;
    this.renderCurrentTab();
  }

  // ========================================================================
  // 3. PRACTICE HUB (RAPID VOCABULARY & FLASHCARDS)
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
            <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--rose-primary);">⚡ Practice Studio</h2>
            <p style="font-size: 0.88rem; color: var(--text-muted);">Interactive Flashcards & Spaced Repetition Drills</p>
          </div>
          <span class="pill-btn" style="background: var(--rose-light); color: var(--rose-primary); font-weight: 900;">
            Card ${this.flashcardIndex + 1} / ${vocab.length}
          </span>
        </div>

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
            <button class="htet-audio-btn" onclick="event.stopPropagation(); app.speakCurrent('${(trans?.word || '').replace(/'/g, "\\\\'")}', '${this.targetLang}')">
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

        <div style="display: flex; gap: 0.75rem; justify-content: center;">
          <button class="htet-btn htet-btn-outline" onclick="app.prevCard()" style="flex: 1;">
            ← PREVIOUS
          </button>
          <button class="htet-btn htet-btn-primary" onclick="app.nextCard()" style="flex: 1;">
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
  // 4. HIGH-ACCURACY SEARCH & DATASET EXPLORER
  // ========================================================================
  setDictTab(tab) {
    this.dictTab = tab;
    const input = document.getElementById('dictSearchInput');
    const q = input?.value || '';
    if (q) {
      this.searchDict(q);
    } else {
      this.renderCurrentTab();
    }
  }

  renderDictView(container) {
    if (!this.dictTab) this.dictTab = 'all';

    container.innerHTML = `
      <div style="max-width: 750px; margin: 0 auto; padding: 1.25rem 1rem 5rem;">
        <div style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--rose-primary);">📖 Multilingual Lexicon & High-Accuracy Search</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Real-time indexed search across 21,984 EMDictionary entries, Myanmar female names, and English definitions.
          </p>

          <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.4rem; margin-bottom: 1rem;">
            <button class="pill-btn ${this.dictTab === 'all' ? 'active' : ''}" onclick="app.setDictTab('all')">🌸 All (21,984+)</button>
            <button class="pill-btn ${this.dictTab === 'em' ? 'active' : ''}" onclick="app.setDictTab('em')">📚 EMDictionary</button>
            <button class="pill-btn ${this.dictTab === 'names' ? 'active' : ''}" onclick="app.setDictTab('names')">🌸 Female Names (2,304)</button>
            <button class="pill-btn ${this.dictTab === 'eng_eng' ? 'active' : ''}" onclick="app.setDictTab('eng_eng')">📖 English Monolingual</button>
            <button class="pill-btn ${this.dictTab === 'sources' ? 'active' : ''}" onclick="app.setDictTab('sources')">🗂️ Stored Datasets (15)</button>
          </div>

          <div class="search-input-group">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="dictSearchInput" class="search-input" placeholder="Type in English (e.g. love, courage) or Burmese (e.g. မေတ္တာ, အောင်)..." oninput="app.searchDict(this.value)">
          </div>
        </div>

        <div id="dictResultsList" style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${this.renderDefaultDictContent()}
        </div>
      </div>
    `;
  }

  renderDefaultDictContent() {
    if (this.dictTab === 'sources') {
      return `
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1.25rem; font-weight: 900; color: var(--rose-primary); margin-bottom: 0.5rem;">
            🗂️ Integrated Open Source Datasets
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
                  <th style="padding: 0.5rem;">Role in HtetLingo</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">EMDictionary</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/EMDictionary.db</td>
                  <td style="padding: 0.6rem;">35.8 MB (21,984 entries)</td>
                  <td style="padding: 0.6rem;">High-accuracy search & Vocab units</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">English Monolingual</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/english_to_english.json</td>
                  <td style="padding: 0.6rem;">4.7 MB (49,537 words)</td>
                  <td style="padding: 0.6rem;">English definitions & phonetics</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">Myanmar POS List</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/myanmar-pos/</td>
                  <td style="padding: 0.6rem;">8 POS JSON files</td>
                  <td style="padding: 0.6rem;">Grammar, verb and adjective units</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 800;">Myanmar Female Names</td>
                  <td style="padding: 0.6rem; font-family: monospace;">data/sorted_females.txt</td>
                  <td style="padding: 0.6rem;">2,304 names</td>
                  <td style="padding: 0.6rem;">Heritage unit & name search</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    const items = (this.lexiconData || []).slice(0, 25);
    return `
      <div style="font-weight: 800; color: var(--rose-primary); font-size: 0.95rem;">
        📚 High-Frequency Lexicon (Showing 25 of ${this.lexiconData.length.toLocaleString()} indexed words)
      </div>
      ${items.map(item => `
        <div class="card" style="padding: 1.15rem;">
          <div class="card-header" style="margin-bottom: 0.4rem;">
            <div>
              <span style="font-size: 0.72rem; background: var(--rose-light); color: var(--rose-primary); padding: 0.15rem 0.55rem; border-radius: var(--radius-full); font-weight: 800;">
                ${item.pos ? `[${item.pos}]` : 'EMDictionary'}
              </span>
              <h3 style="font-size: 1.25rem; font-weight: 900; margin-top: 0.2rem;">
                ${item.w} <span style="font-size: 0.92rem; font-weight: 600; color: var(--lavender); font-family: monospace;">${item.p || ''}</span>
              </h3>
            </div>
            <button class="icon-btn" onclick="app.speakCurrent('${item.w.replace(/'/g, "\\\\'")}', 'en')">🔊 Speak</button>
          </div>
          <div style="font-weight: 700; color: var(--rose-primary); font-size: 1.05rem; margin-bottom: 0.25rem;">
            ${item.m || ''}
          </div>
          <div style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
            ${item.d}
          </div>
        </div>
      `).join('')}
    `;
  }

  searchDict(query) {
    const list = document.getElementById('dictResultsList');
    if (!list) return;
    const q = query.trim();
    if (!q) {
      list.innerHTML = this.renderDefaultDictContent();
      return;
    }

    if (!window.htetSearchEngine) {
      list.innerHTML = `<div class="card" style="padding: 1.5rem; text-align: center;">Initializing search engine...</div>`;
      return;
    }

    const results = window.htetSearchEngine.search(q, this.dictTab, 30);

    if (results.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md); border: 1.5px dashed var(--border-color);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌸</div>
          No exact match found for "<strong>${q}</strong>".<br/>
          Check spelling or try searching in Burmese or English!
        </div>
      `;
      return;
    }

    list.innerHTML = `
      <div style="font-weight: 800; color: var(--rose-primary); font-size: 0.95rem; margin-bottom: 0.25rem;">
        🔍 Found ${results.length} high-relevance matches for "${q}"
      </div>
      ${results.map(r => `
        <div class="card" style="padding: 1.15rem;">
          <div class="card-header" style="margin-bottom: 0.4rem;">
            <div>
              <span style="font-size: 0.72rem; background: var(--rose-light); color: ${r.badgeColor || 'var(--rose-primary)'}; padding: 0.15rem 0.55rem; border-radius: var(--radius-full); font-weight: 800;">
                ${r.pos ? `[${r.pos}] ` : ''}${r.badge}
              </span>
              <h3 style="font-size: 1.25rem; font-weight: 900; margin-top: 0.2rem;">
                ${window.htetSearchEngine.highlightMatch(r.title, q)}
                ${r.phonetic ? `<span style="font-size: 0.92rem; font-weight: 600; color: var(--lavender); font-family: monospace;">${r.phonetic}</span>` : ''}
              </h3>
            </div>
            <button class="icon-btn" onclick="app.speakCurrent('${(r.subtitle || r.title).replace(/'/g, "\\\\'")}', 'en')">🔊 Speak</button>
          </div>
          ${r.meaning ? `
            <div style="font-weight: 700; color: var(--rose-primary); font-size: 1.05rem; margin-bottom: 0.25rem;">
              ${window.htetSearchEngine.highlightMatch(r.meaning, q)}
            </div>
          ` : ''}
          <div style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
            ${window.htetSearchEngine.highlightMatch(r.definition, q)}
          </div>
        </div>
      `).join('')}
    `;
  }

  // ========================================================================
  // 5. AI TUTOR
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
          <button class="htet-btn htet-btn-primary" onclick="app.sendChatMessage()" style="padding: 0.6rem 1.2rem;">
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
  // 6. VIP STUDIO & SHOP
  // ========================================================================
  renderShopView(container) {
    const isVIP = window.htetRevenueCat?.isPremium();

    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; padding: 1.5rem 1rem 5rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">👑</div>
          <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--rose-primary);">HtetLingo VIP Studio</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Empower your learning journey with VIP benefits!</p>
        </div>

        <div class="card" style="padding: 1.75rem; border: 2.5px solid #f59e0b; background: linear-gradient(135deg, var(--bg-card), #fefce8); margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
              <span class="htet-unit-badge" style="background: #f59e0b; color: white;">👑 VIP MEMBERSHIP</span>
              <h3 style="font-size: 1.35rem; font-weight: 900; margin-top: 0.35rem;">HtetLingo Studio Pass</h3>
            </div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #b45309;">$7.99 <span style="font-size: 0.85rem;">/mo</span></div>
          </div>
          <ul style="font-size: 0.92rem; line-height: 1.8; margin-bottom: 1.5rem; list-style: none; padding-left: 0;">
            <li>✨ <strong>All 8 Languages Unlocked</strong></li>
            <li>✨ <strong>Complete EMDictionary 21,984 Audio Lexicon</strong></li>
            <li>✨ <strong>Unlimited AI Tutor Voice Chats</strong></li>
            <li>✨ <strong>100% Offline Learning & Zero Ads</strong></li>
          </ul>
          <button class="htet-btn htet-btn-primary" style="width: 100%;" onclick="app.buyVIP()">
            ${isVIP ? '⭐ VIP ACTIVE' : 'UPGRADE TO VIP (TEST REVENUECAT)'}
          </button>
        </div>
      </div>
    `;
  }

  buyVIP() {
    if (window.htetRevenueCat) {
      window.htetRevenueCat.purchase('premium_monthly').then(() => {
        if (window.htetSound) window.htetSound.playComplete();
        alert('🎉 Welcome to HtetLingo VIP! All features and full lexicons are unlocked!');
        this.updateStatusHeader();
        this.renderCurrentTab();
      });
    }
  }

  // ========================================================================
  // 7. PROFILE & ACCOUNTS
  // ========================================================================
  renderProfileView(container) {
    const user = window.htetSupabase?.getCurrentUser();

    container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; padding: 1.5rem 1rem 5rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 86px; height: 86px; border-radius: 50%; background: linear-gradient(135deg, #f43f5e, #a855f7); color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 2.8rem; box-shadow: var(--shadow-md); margin-bottom: 0.75rem;">
            🌸
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 900;">${user ? user.displayName : 'Htet (Lovely Learner)'}</h2>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            ${user ? user.email : 'Local Guest Mode (Sync available)'}
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
          <div class="card" style="padding: 1.25rem; text-align: center;">
            <div style="font-size: 2rem; font-weight: 900; color: #f97316;">🔥 ${this.streak}</div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">DAY STREAK</div>
          </div>
          <div class="card" style="padding: 1.25rem; text-align: center;">
            <div style="font-size: 2rem; font-weight: 900; color: #f43f5e;">🌸 ${this.xp}</div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">BLOOM XP</div>
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

        <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 900; margin-bottom: 0.75rem;">Switch Learning Language</h3>
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
