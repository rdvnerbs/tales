-- Kategoriler tablosu
CREATE TABLE IF NOT EXISTS categories (
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
CREATE TABLE IF NOT EXISTS stories (
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
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kullanıcı Hikayeleri İlişki Tablosu
CREATE TABLE IF NOT EXISTS user_stories (
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
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  bookmarks INTEGER DEFAULT 0,
  listens INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Realtime özelliğini etkinleştir
alter publication supabase_realtime add table categories;
alter publication supabase_realtime add table stories;
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table user_stories;
alter publication supabase_realtime add table stats;
