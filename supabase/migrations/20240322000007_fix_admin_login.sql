-- Mevcut admin kullanıcısını tamamen sil
DELETE FROM auth.users WHERE email = 'admin@masaldunyasi.com';
DELETE FROM public.users WHERE email = 'admin@masaldunyasi.com';

-- Yeni admin kullanıcısı oluştur (şifre: admin123)
INSERT INTO auth.users (id, email, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, email_confirmed_at, created_at, updated_at, confirmation_token, recovery_token, aud, role)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@masaldunyasi.com',
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  false,
  '$2a$10$Ht9QXvMcJVnGKmx.XnLxC.Jo8qQrJxLQh9UvZ9QVmFRTOQGgrjMdq',
  now(),
  now(),
  now(),
  '',
  '',
  'authenticated',
  'authenticated'
);

-- Admin kullanıcısını public.users tablosuna ekle
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@masaldunyasi.com',
  'Admin',
  'admin',
  now(),
  now()
);
