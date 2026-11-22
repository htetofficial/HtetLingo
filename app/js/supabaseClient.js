// HtetLingo Supabase Integration Layer
// Connects authentication and cloud database with offline-first failover

class HtetSupabaseService {
  constructor() {
    // Only safe, public publishable keys belong in browser client
    this.publishableKey = 'sb_publishable_kBxm9l-qdy5dMfJIURYCGw_RwKCLV-E';
    this.projectUrl = localStorage.getItem('htetlingo_supabase_url') || 'https://htetlingo.supabase.co';
    this.currentUser = JSON.parse(localStorage.getItem('htetlingo_auth_user') || 'null');
    this.isConfigured = Boolean(this.projectUrl && this.publishableKey);
  }

  setProjectUrl(url) {
    if (!url) return;
    this.projectUrl = url.trim().replace(/\/$/, '');
    localStorage.setItem('htetlingo_supabase_url', this.projectUrl);
    this.isConfigured = true;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'apikey': this.publishableKey,
      'Authorization': `Bearer ${this.currentUser?.token || this.publishableKey}`
    };
    return headers;
  }

  // --- Auth Simulation & Rest API integration ---
  async signUp(email, password, displayName) {
    if (!this.projectUrl || this.projectUrl.includes('placeholder')) {
      // Offline fallback mock user
      const user = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email,
        displayName: displayName || email.split('@')[0],
        isPremium: false,
        planType: 'free',
        token: 'mock_token_' + Date.now()
      };
      this.currentUser = user;
      localStorage.setItem('htetlingo_auth_user', JSON.stringify(user));
      return { user, error: null };
    }

    try {
      const res = await fetch(`${this.projectUrl}/auth/v1/signup`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          email,
          password,
          data: { full_name: displayName }
        })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        const user = {
          id: data.user.id,
          email: data.user.email,
          displayName: displayName || email.split('@')[0],
          token: data.access_token || this.publishableKey,
          isPremium: false,
          planType: 'free'
        };
        this.currentUser = user;
        localStorage.setItem('htetlingo_auth_user', JSON.stringify(user));
        return { user, error: null };
      }
      return { user: null, error: data.msg || data.message || 'Registration failed' };
    } catch (err) {
      // Fallback offline signup
      const user = {
        id: 'local_' + Date.now(),
        email,
        displayName: displayName || email.split('@')[0],
        isPremium: false,
        planType: 'free'
      };
      this.currentUser = user;
      localStorage.setItem('htetlingo_auth_user', JSON.stringify(user));
      return { user, error: null, isOfflineFallback: true };
    }
  }

  async signIn(email, password) {
    if (!this.projectUrl || this.projectUrl.includes('placeholder')) {
      const user = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email,
        displayName: email.split('@')[0],
        isPremium: false,
        planType: 'free',
        token: 'mock_token_' + Date.now()
      };
      this.currentUser = user;
      localStorage.setItem('htetlingo_auth_user', JSON.stringify(user));
      return { user, error: null };
    }

    try {
      const res = await fetch(`${this.projectUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        const user = {
          id: data.user.id,
          email: data.user.email,
          displayName: data.user.user_metadata?.full_name || email.split('@')[0],
          token: data.access_token,
          isPremium: false,
          planType: 'free'
        };
        this.currentUser = user;
        localStorage.setItem('htetlingo_auth_user', JSON.stringify(user));
        return { user, error: null };
      }
      return { user: null, error: data.error_description || data.msg || 'Sign in failed' };
    } catch (err) {
      // Local fallback
      const user = {
        id: 'local_' + Date.now(),
        email,
        displayName: email.split('@')[0],
        isPremium: false,
        planType: 'free'
      };
      this.currentUser = user;
      localStorage.setItem('htetlingo_auth_user', JSON.stringify(user));
      return { user, error: null, isOfflineFallback: true };
    }
  }

  signOut() {
    this.currentUser = null;
    localStorage.removeItem('htetlingo_auth_user');
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

window.htetSupabase = new HtetSupabaseService();
