-- Tüm kullanıcıları sil
DELETE FROM public.users;
DELETE FROM auth.users;

-- Admin kullanıcısı oluştur
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@masaldunyasi.com',
  '$2a$10$Xt9Hn8QpNP8nT5zYvOXxDuiPcEUhN5kBnNMiQW0kEAI/Jxm0V5lHe', -- Şifre: Admin123!
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin Kullanıcı"}',
  false
);

-- Admin kullanıcısını users tablosuna ekle
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@masaldunyasi.com',
  'Admin Kullanıcı',
  'admin',
  NOW(),
  NOW()
);

-- Auth kurallarını gevşet
ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Tüm tablolarda RLS'yi devre dışı bırak
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors DISABLE ROW LEVEL SECURITY;
