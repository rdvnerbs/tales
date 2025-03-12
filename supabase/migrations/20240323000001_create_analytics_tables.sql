-- Kullanıcı aktivitelerini takip etmek için tablo
CREATE TABLE IF NOT EXISTS user_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  story_id UUID REFERENCES stories(id),
  activity_type TEXT NOT NULL,
  value INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ziyaretçileri takip etmek için tablo
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT,
  user_agent TEXT,
  language TEXT,
  referrer TEXT,
  page_visited TEXT,
  visit_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İstatistikleri sıfırla
UPDATE stories SET views = 0, likes = 0, bookmarks = 0, listens = 0;
UPDATE stats SET views = 0, likes = 0, bookmarks = 0, listens = 0;

-- Aktivite tablosu için indeksler
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_story_id ON user_activities(story_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_activity_type ON user_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON user_activities(created_at);

-- Ziyaretçi tablosu için indeksler
CREATE INDEX IF NOT EXISTS idx_visitors_ip_address ON visitors(ip_address);
CREATE INDEX IF NOT EXISTS idx_visitors_visit_time ON visitors(visit_time);
CREATE INDEX IF NOT EXISTS idx_visitors_page_visited ON visitors(page_visited);

-- RLS politikaları
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Admin kullanıcıları için tam erişim
CREATE POLICY "Admin has full access to user_activities" ON user_activities
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

CREATE POLICY "Admin has full access to visitors" ON visitors
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Kullanıcılar kendi aktivitelerini görebilir
CREATE POLICY "Users can read their own activities" ON user_activities
  FOR SELECT USING (auth.uid() = user_id);

-- Kullanıcılar kendi aktivitelerini ekleyebilir
CREATE POLICY "Users can insert their own activities" ON user_activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Anonim kullanıcılar aktivite ekleyebilir (user_id NULL olduğunda)
CREATE POLICY "Anonymous users can insert activities" ON user_activities
  FOR INSERT WITH CHECK (user_id IS NULL);

-- Anonim kullanıcılar ziyaretçi kaydı ekleyebilir
CREATE POLICY "Anyone can insert visitor records" ON visitors
  FOR INSERT WITH CHECK (true);
