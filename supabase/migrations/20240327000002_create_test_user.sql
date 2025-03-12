-- Test kullanıcısı oluştur
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'test@masaldunyasi.com',
  '$2a$10$Xt9Hn8QpNP8nT5zYvOXxDuiPcEUhN5kBnNMiQW0kEAI/Jxm0V5lHe', -- Şifre: Admin123!
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Test Kullanıcı"}',
  false
);

-- Test kullanıcısını users tablosuna ekle
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'test@masaldunyasi.com',
  'Test Kullanıcı',
  'user',
  NOW(),
  NOW()
);
