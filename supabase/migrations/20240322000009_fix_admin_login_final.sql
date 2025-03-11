-- Önce user_stories tablosundaki ilişkili kayıtları temizle
DELETE FROM user_stories WHERE user_id IN (SELECT id FROM users WHERE email = 'admin@masaldunyasi.com');

-- Sonra auth.users ve public.users tablosundaki kullanıcıları sil
DELETE FROM auth.users WHERE email = 'admin@masaldunyasi.com';
DELETE FROM public.users WHERE email = 'admin@masaldunyasi.com';

-- Yeni UUID oluştur
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Yeni bir UUID ile admin kullanıcısı oluştur
DO $$
DECLARE
    new_user_id uuid := uuid_generate_v4();
BEGIN
    -- Önce public.users tablosuna kullanıcı ekle
    INSERT INTO public.users (id, email, name, role, created_at, updated_at)
    VALUES (
      new_user_id,
      'admin@masaldunyasi.com',
      'Admin',
      'admin',
      now(),
      now()
    );

    -- Sonra auth.users tablosuna kullanıcı ekle
    INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, aud, role)
    VALUES (
      new_user_id,
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
END $$;