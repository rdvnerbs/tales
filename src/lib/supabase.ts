import { createClient } from "@supabase/supabase-js";

// Supabase istemcisini oluştur
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://your-supabase-url.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-supabase-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase SQL komutları - Veritabanı tabloları oluşturmak için
/*
-- Kategoriler tablosu
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  count INTEGER DEFAULT 0,
  age_group TEXT DEFAULT 'hepsi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hikayeler tablosu
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  cover_image TEXT,
  category_id UUID REFERENCES categories(id),
  category TEXT,
  is_favorite BOOLEAN DEFAULT false,
  is_bookmarked BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  bookmarks INTEGER DEFAULT 0,
  listens INTEGER DEFAULT 0,
  read_time INTEGER DEFAULT 5,
  audio_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kullanıcılar tablosu (Auth ile entegre)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kullanıcı Hikayeleri İlişki Tablosu
CREATE TABLE user_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  story_id UUID REFERENCES stories(id),
  is_favorite BOOLEAN DEFAULT false,
  is_bookmarked BOOLEAN DEFAULT false,
  progress INTEGER DEFAULT 0,
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);

-- İstatistikler tablosu
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  bookmarks INTEGER DEFAULT 0,
  listens INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Politikaları
-- Sadece admin kullanıcıları için tam erişim
CREATE POLICY "Admin has full access" ON categories
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

CREATE POLICY "Admin has full access" ON stories
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

CREATE POLICY "Admin has full access" ON users
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

CREATE POLICY "Admin has full access" ON user_stories
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

CREATE POLICY "Admin has full access" ON stats
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Kullanıcılar için okuma erişimi
CREATE POLICY "Anyone can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read stories" ON stories
  FOR SELECT USING (true);

CREATE POLICY "Users can read their own data" ON user_stories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own data" ON user_stories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own data" ON user_stories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read stats" ON stats
  FOR SELECT USING (true);
*/
