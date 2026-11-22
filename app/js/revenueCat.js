// HtetLingo RevenueCat In-App Purchases & Subscriptions Engine
// Handles Free, Premium, Lifetime, and Specialty Language Packs

class HtetRevenueCatService {
  constructor() {
    this.apiKey = 'test_MlxZnHIsSDemVwtetEoTrDHUrrB';
    this.appUserId = localStorage.getItem('htetlingo_rc_user_id') || this.generateUserId();
    this.plans = [
      {
        id: 'free',
        name: 'Free Starter',
        price: '$0',
        period: 'forever',
        features: [
          'Core vocabulary flashcards for 8 languages',
          'Standard multilingual dictionary lookup',
          'Basic daily practice quizzes',
          '100% offline learning mode'
        ],
        badge: 'Free Tier',
        popular: false
      },
      {
        id: 'premium_monthly',
        name: 'HtetLingo Premium',
        price: '$7.99',
        period: 'month',
        features: [
          'All Free features included',
          'Unlimited interactive AI Tutoring conversations',
          'Advanced Grammar Lessons & In-depth Exercises',
          'Speech & Pronunciation Analyzer with audio playback',
          'Cloud Sync across Web, iPad, Android & Mac',
          '100% Ad-Free learning experience'
        ],
        badge: 'Most Popular',
        popular: true
      },
      {
        id: 'lifetime_access',
        name: 'Lifetime VIP Access',
        price: '$79.99',
        period: 'one-time',
        features: [
          'All Premium features permanently unlocked',
          'Never pay a subscription fee again',
          'All future language additions included automatically',
          'All specialty learning packs (JLPT, HSK, Business) included',
          'VIP early access to new AI models & tools'
        ],
        badge: 'Best Value',
        popular: false
      }
    ];

    this.addonPacks = [
      {
        id: 'pack_jlpt',
        name: 'Japanese JLPT N5–N1 Complete Mastery Pack',
        language: 'ja',
        price: '$4.99',
        description: 'Comprehensive kanji, grammar patterns, and mock listening exercises for JLPT.'
      },
      {
        id: 'pack_hsk',
        name: 'Mandarin Chinese HSK 1–6 Fluency Pack',
        language: 'zh',
        price: '$4.99',
        description: 'Complete vocabulary lists with tone indicators, character stroke orders, and dialogue.'
      },
      {
        id: 'pack_business_en',
        name: 'Professional Business English & Emailing',
        language: 'en',
        price: '$4.99',
        description: 'Executive vocabulary, meeting dialogues, presentation templates, and email scripts.'
      },
      {
        id: 'pack_thai_travel',
        name: 'Thai Travel & Conversational Survival Pack',
        language: 'th',
        price: '$3.99',
        description: 'Everyday Bangkok & Phuket street phrases, food orders, bargaining, and cultural etiquette.'
      }
    ];

    this.activePlan = localStorage.getItem('htetlingo_plan') || 'free';
    this.purchasedPacks = JSON.parse(localStorage.getItem('htetlingo_purchased_packs') || '[]');
  }

  generateUserId() {
    const id = 'rc_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('htetlingo_rc_user_id', id);
    return id;
  }

  isPremium() {
    return this.activePlan === 'premium_monthly' || this.activePlan === 'lifetime_access';
  }

  isLifetime() {
    return this.activePlan === 'lifetime_access';
  }

  async purchase(planId) {
    // In production, uses RevenueCat Web Purchases / Native SDK
    return new Promise((resolve) => {
      setTimeout(() => {
        this.activePlan = planId;
        localStorage.setItem('htetlingo_plan', planId);

        // Update current user if exists
        const user = window.htetSupabase?.getCurrentUser();
        if (user) {
          user.isPremium = this.isPremium();
          user.planType = planId;
          localStorage.setItem('htetlingo_auth_user', JSON.stringify(user));
        }

        resolve({ success: true, planId });
      }, 500);
    });
  }

  async purchasePack(packId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.purchasedPacks.includes(packId)) {
          this.purchasedPacks.push(packId);
          localStorage.setItem('htetlingo_purchased_packs', JSON.stringify(this.purchasedPacks));
        }
        resolve({ success: true, packId });
      }, 400);
    });
  }

  hasPack(packId) {
    if (this.isLifetime()) return true; // Lifetime includes all packs
    return this.purchasedPacks.includes(packId);
  }
}

window.htetRevenueCat = new HtetRevenueCatService();
