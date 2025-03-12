-- Auth tablosuna eksik kolonları ekle
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS encrypted_password TEXT;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS email_confirmed_at TIMESTAMP WITH TIME ZONE;

-- Tüm kullanıcıların email_confirmed_at değerini şimdiki zaman olarak ayarla
UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;

-- Kullanıcı kayıt işlemlerinde email onayını devre dışı bırak
ALTER TABLE auth.users ALTER COLUMN email_confirmed_at SET DEFAULT NOW();

-- Kullanıcı aktivitelerini takip etmek için gerekli tabloları güncelle
ALTER TABLE public.user_activities ALTER COLUMN story_id TYPE TEXT;
ALTER TABLE public.user_stories ALTER COLUMN story_id TYPE TEXT;

-- Kullanıcı hikaye ilişkilerini takip etmek için indeks oluştur
CREATE INDEX IF NOT EXISTS idx_user_stories_user_id ON public.user_stories(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stories_story_id ON public.user_stories(story_id);
