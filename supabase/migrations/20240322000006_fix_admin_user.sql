-- Mevcut admin kullanıcısını sil
DELETE FROM auth.users WHERE email = 'admin@masaldunyasi.com';
DELETE FROM public.users WHERE email = 'admin@masaldunyasi.com';

-- Yeni admin kullanıcısı oluştur
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, encrypted_password)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@masaldunyasi.com',
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  '$2a$10$Ht9QXvMcJVnGKmx.XnLxC.Jo8qQrJxLQh9UvZ9QVmFRTOQGgrjMdq'
)
ON CONFLICT (id) DO NOTHING;

-- Admin kullanıcısını public.users tablosuna ekle
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@masaldunyasi.com',
  'Admin',
  'admin',
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;
