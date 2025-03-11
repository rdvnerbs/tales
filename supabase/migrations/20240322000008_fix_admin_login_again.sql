-- Önce auth.users tablosundaki kullanıcıyı sil
DELETE FROM auth.users WHERE email = 'admin@masaldunyasi.com';

-- Sonra public.users tablosundaki kullanıcıyı sil
DELETE FROM public.users WHERE email = 'admin@masaldunyasi.com';

-- Önce public.users tablosuna kullanıcı ekle
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@masaldunyasi.com',
  'Admin',
  'admin',
  now(),
  now()
);

-- Sonra auth.users tablosuna kullanıcı ekle
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, aud, role)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@masaldunyasi.com',
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  false,
  '$2a$10$Ht9QXvMcJVnGKmx.XnLxC.Jo8qQrJxLQh9UvZ9QVmFRTOQGgrjMdq',
  'authenticated',
  'authenticated'
);
