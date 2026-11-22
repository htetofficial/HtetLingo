// HtetLingo IndexedDB Offline Storage Engine
// Provides 100% offline learning capabilities with local persistence and Supabase sync

class HtetLingoDB {
  constructor() {
    this.dbName = 'HtetLingoLocalDB';
    this.version = 1;
    this.db = null;
  }

  async init() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // 1. Profile / Settings store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }

        // 2. Vocabulary & Grammar SRS Progress store
        if (!db.objectStoreNames.contains('progress')) {
          const progressStore = db.createObjectStore('progress', { keyPath: 'id' });
          progressStore.createIndex('language', 'language', { unique: false });
          progressStore.createIndex('nextReview', 'nextReview', { unique: false });
        }

        // 3. Bookmarks store
        if (!db.objectStoreNames.contains('bookmarks')) {
          const bookmarkStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
          bookmarkStore.createIndex('language', 'language', { unique: false });
          bookmarkStore.createIndex('created_at', 'created_at', { unique: false });
        }

        // 4. Quiz History store
        if (!db.objectStoreNames.contains('quizHistory')) {
          const quizStore = db.createObjectStore('quizHistory', { keyPath: 'id' });
          quizStore.createIndex('language', 'language', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  // --- Settings & User State ---
  async getSetting(key, defaultValue = null) {
    await this.init();
    return new Promise((resolve) => {
      const tx = this.db.transaction('settings', 'readonly');
      const store = tx.objectStore('settings');
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ? req.result.value : defaultValue);
      req.onerror = () => resolve(defaultValue);
    });
  }

  async setSetting(key, value) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('settings', 'readwrite');
      const store = tx.objectStore('settings');
      const req = store.put({ key, value });
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  // --- Vocabulary Progress (SRS) ---
  async getProgress(itemId, language) {
    await this.init();
    return new Promise((resolve) => {
      const id = `${language}_${itemId}`;
      const tx = this.db.transaction('progress', 'readonly');
      const store = tx.objectStore('progress');
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  }

  async getAllProgress(language = null) {
    await this.init();
    return new Promise((resolve) => {
      const tx = this.db.transaction('progress', 'readonly');
      const store = tx.objectStore('progress');
      const req = store.getAll();
      req.onsuccess = () => {
        const results = req.result || [];
        if (language) {
          resolve(results.filter(item => item.language === language));
        } else {
          resolve(results);
        }
      };
      req.onerror = () => resolve([]);
    });
  }

  async updateSRSProgress(itemId, language, rating) {
    // rating: 'again' (1), 'hard' (2), 'good' (3), 'easy' (4)
    await this.init();
    const id = `${language}_${itemId}`;
    const existing = await this.getProgress(itemId, language) || {
      id,
      itemId,
      language,
      repetitions: 0,
      intervalDays: 1,
      easeFactor: 2.5,
      mastery: 0,
      lastReviewed: null
    };

    let { repetitions, intervalDays, easeFactor, mastery } = existing;

    if (rating === 'again') {
      repetitions = 0;
      intervalDays = 1;
      mastery = Math.max(0, mastery - 20);
    } else {
      if (repetitions === 0) {
        intervalDays = 1;
      } else if (repetitions === 1) {
        intervalDays = rating === 'easy' ? 4 : 2;
      } else {
        const mult = rating === 'easy' ? 1.5 : (rating === 'hard' ? 0.8 : 1.2);
        intervalDays = Math.round(intervalDays * easeFactor * mult);
      }
      repetitions += 1;
      mastery = Math.min(100, mastery + (rating === 'easy' ? 30 : 20));
    }

    // Adjust ease factor
    if (rating === 'easy') easeFactor += 0.15;
    if (rating === 'hard') easeFactor = Math.max(1.3, easeFactor - 0.15);
    if (rating === 'again') easeFactor = Math.max(1.3, easeFactor - 0.2);

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);

    const record = {
      ...existing,
      repetitions,
      intervalDays,
      easeFactor,
      mastery,
      lastReviewed: new Date().toISOString(),
      nextReview: nextReviewDate.toISOString()
    };

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('progress', 'readwrite');
      const store = tx.objectStore('progress');
      const req = store.put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = () => reject(req.error);
    });
  }

  // --- Bookmarks ---
  async addBookmark(item) {
    await this.init();
    const id = `${item.language}_${item.word}`;
    const record = {
      id,
      ...item,
      created_at: new Date().toISOString()
    };
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('bookmarks', 'readwrite');
      const store = tx.objectStore('bookmarks');
      const req = store.put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = () => reject(req.error);
    });
  }

  async removeBookmark(id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('bookmarks', 'readwrite');
      const store = tx.objectStore('bookmarks');
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  async getBookmarks(language = null) {
    await this.init();
    return new Promise((resolve) => {
      const tx = this.db.transaction('bookmarks', 'readonly');
      const store = tx.objectStore('bookmarks');
      const req = store.getAll();
      req.onsuccess = () => {
        let results = req.result || [];
        if (language) results = results.filter(b => b.language === language);
        resolve(results);
      };
      req.onerror = () => resolve([]);
    });
  }

  // --- Quiz History ---
  async recordQuiz(quizData) {
    await this.init();
    const id = 'quiz_' + Date.now();
    const record = { id, ...quizData, date: new Date().toISOString() };
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('quizHistory', 'readwrite');
      const store = tx.objectStore('quizHistory');
      const req = store.put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = () => reject(req.error);
    });
  }

  async getQuizHistory() {
    await this.init();
    return new Promise((resolve) => {
      const tx = this.db.transaction('quizHistory', 'readonly');
      const store = tx.objectStore('quizHistory');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }
}

// Global instance
window.htetDB = new HtetLingoDB();
