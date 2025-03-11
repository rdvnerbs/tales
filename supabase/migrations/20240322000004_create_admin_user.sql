-- Admin kullanıcısı oluştur
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@masaldunyasi.com',
  now(),
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Admin kullanıcısı için şifre oluştur
INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  '{"sub":"00000000-0000-0000-0000-000000000000","email":"admin@masaldunyasi.com"}',
  'email',
  'admin@masaldunyasi.com',
  now(),
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Admin kullanıcısını users tablosuna ekle
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

-- Admin kullanıcısı için şifre ayarla
INSERT INTO auth.users (encrypted_password)
VALUES ('$2a$10$Ht9QXvMcJVnGKmx.XnLxC.Jo8qQrJxLQh9UvZ9QVmFRTOQGgrjMdq')
WHERE id = '00000000-0000-0000-0000-000000000000';
