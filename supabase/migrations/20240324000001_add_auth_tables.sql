-- Kullanıcı rolleri için enum tipi oluştur
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Kullanıcı tablosunu güncelle
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'user';

-- Kullanıcı aktiviteleri tablosu
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  story_id UUID REFERENCES stories(id),
  activity_type TEXT NOT NULL,
  value INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kullanıcı hikaye ilişkileri tablosu
CREATE TABLE IF NOT EXISTS public.user_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  story_id UUID REFERENCES stories(id),
  is_favorite BOOLEAN DEFAULT false,
  is_bookmarked BOOLEAN DEFAULT false,
  progress INTEGER DEFAULT 0,
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);

-- Ziyaretçi tablosu
CREATE TABLE IF NOT EXISTS public.visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT,
  user_agent TEXT,
  language TEXT,
  referrer TEXT,
  page_visited TEXT,
  visit_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
-- Kullanıcılar kendi verilerini okuyabilir ve güncelleyebilir
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);

-- Admin kullanıcıları tüm kullanıcı verilerine erişebilir
CREATE POLICY "Admins can do anything" 
ON public.users 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Kullanıcı aktiviteleri için politikalar
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activities" 
ON public.user_activities FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities" 
ON public.user_activities FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can do anything with activities" 
ON public.user_activities 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Kullanıcı hikaye ilişkileri için politikalar
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own story relations" 
ON public.user_stories FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own story relations" 
ON public.user_stories FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own story relations" 
ON public.user_stories FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can do anything with story relations" 
ON public.user_stories 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Ziyaretçi tablosu için politikalar (herkes ekleyebilir, sadece admin görebilir)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert visitors" 
ON public.visitors FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can view visitors" 
ON public.visitors FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Hikayeler ve kategoriler için politikalar (herkes okuyabilir)
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stories" 
ON public.stories FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view categories" 
ON public.categories FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify stories" 
ON public.stories 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can modify categories" 
ON public.categories 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- İstatistikler için politikalar
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stats" 
ON public.stats FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify stats" 
ON public.stats 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
