-- ====================================================================
-- HtetLingo Supabase PostgreSQL Database Schema
-- Multi-language Learning, Dictionary, Translation & Tutoring Platform
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  native_language TEXT DEFAULT 'my', -- Default Burmese
  target_languages TEXT[] DEFAULT ARRAY['en', 'ja', 'zh', 'th', 'ko'],
  streak_days INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  xp_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  is_premium BOOLEAN DEFAULT FALSE,
  plan_type TEXT DEFAULT 'free', -- 'free', 'premium_monthly', 'lifetime'
  subscription_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Learning Progress & SRS (Spaced Repetition System) Table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  language TEXT NOT NULL,          -- 'en', 'ja', 'zh', 'my', 'th', 'fr', 'de', 'ko'
  category TEXT NOT NULL,          -- 'greetings', 'travel', 'food', 'grammar_n5', etc.
  item_id TEXT NOT NULL,           -- word or lesson identifier
  item_type TEXT NOT NULL,         -- 'vocab', 'grammar', 'phrase'
  mastery_level INTEGER DEFAULT 0, -- 0 to 5 (SRS Stage)
  ease_factor NUMERIC(4,2) DEFAULT 2.50,
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  next_review_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()),
  last_studied_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(user_id, language, item_id)
);

-- 4. Bookmarked Words & Personal Dictionary
CREATE TABLE IF NOT EXISTS public.bookmarked_words (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  source_lang TEXT NOT NULL,
  target_lang TEXT NOT NULL,
  word TEXT NOT NULL,
  phonetic TEXT,
  definition TEXT NOT NULL,
  example_sentence TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Quiz & Exercise History
CREATE TABLE IF NOT EXISTS public.quiz_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  language TEXT NOT NULL,
  quiz_type TEXT NOT NULL,         -- 'mcq', 'listening', 'sentence_builder', 'flashcard'
  topic TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Subscriptions & In-App Purchases (RevenueCat synced)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  revenuecat_id TEXT,
  product_id TEXT NOT NULL,       -- 'htetlingo_premium_monthly', 'htetlingo_lifetime', etc.
  status TEXT NOT NULL,           -- 'active', 'canceled', 'expired', 'lifetime'
  is_lifetime BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ====================================================================
-- Row Level Security (RLS) Configuration
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarked_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- User Progress Policies
CREATE POLICY "Users can view their own progress" 
  ON public.user_progress FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
  ON public.user_progress FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.user_progress FOR UPDATE 
  USING (auth.uid() = user_id);

-- Bookmarks Policies
CREATE POLICY "Users can manage their bookmarks" 
  ON public.bookmarked_words FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

-- Quiz History Policies
CREATE POLICY "Users can view and insert quiz history" 
  ON public.quiz_history FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

-- Subscriptions Policies
CREATE POLICY "Users can read own subscriptions" 
  ON public.subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

-- ====================================================================
-- Automatic Trigger: Profile creation on Auth Sign Up
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_user_progress_review ON public.user_progress(user_id, language, next_review_at);
CREATE INDEX IF NOT EXISTS idx_bookmarked_user ON public.bookmarked_words(user_id, source_lang);
CREATE INDEX IF NOT EXISTS idx_quiz_user ON public.quiz_history(user_id, created_at DESC);
