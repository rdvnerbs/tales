-- Kullanıcı tablosunu düzelt
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Kullanıcı tablosuna eksik sütunlar ekle
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Kullanıcı tablosuna unique constraint ekle
ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS users_email_key;

ALTER TABLE public.users
ADD CONSTRAINT users_email_key UNIQUE (email);

-- Kullanıcı tablosuna foreign key constraint ekle
ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS users_id_fkey;

ALTER TABLE public.users
ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Kullanıcı aktiviteleri tablosuna cascade ekle
ALTER TABLE public.user_activities
DROP CONSTRAINT IF EXISTS user_activities_user_id_fkey;

ALTER TABLE public.user_activities
ADD CONSTRAINT user_activities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Kullanıcı hikaye ilişkileri tablosuna cascade ekle
ALTER TABLE public.user_stories
DROP CONSTRAINT IF EXISTS user_stories_user_id_fkey;

ALTER TABLE public.user_stories
ADD CONSTRAINT user_stories_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Kullanıcı tablosuna trigger ekle (auth.users tablosundan otomatik oluşturma için)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'user',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger'ı kaldır ve yeniden oluştur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
