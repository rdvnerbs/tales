-- Check if admin user already exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@masaldunyasi.com') THEN
    -- Admin kullanıcısı oluştur
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin)
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      'admin@masaldunyasi.com',
      '$2a$10$Xt9Hn8QpNP8nT5zYvOXxDuiPcEUhN5kBnNMiQW0kEAI/Jxm0V5lHe', -- Şifre: Admin123!
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Admin Kullanıcı"}',
      false
    );
  END IF;

  -- Check if admin user exists in public.users
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'admin@masaldunyasi.com') THEN
    -- Admin kullanıcısını users tablosuna ekle
    INSERT INTO public.users (id, email, name, role, created_at, updated_at)
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      'admin@masaldunyasi.com',
      'Admin Kullanıcı',
      'admin',
      NOW(),
      NOW()
    );
  END IF;
END
$$;