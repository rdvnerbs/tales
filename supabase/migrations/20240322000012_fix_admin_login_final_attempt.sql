-- Disable RLS temporarily to allow operations
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories DISABLE ROW LEVEL SECURITY;

-- Delete any existing admin user first
DELETE FROM public.user_stories WHERE user_id IN (SELECT id FROM public.users WHERE email = 'admin@masaldunyasi.com');
DELETE FROM public.users WHERE email = 'admin@masaldunyasi.com';
DELETE FROM auth.users WHERE email = 'admin@masaldunyasi.com';

-- Delete the problematic user with ID 00000000-0000-0000-0000-000000000000
DELETE FROM public.user_stories WHERE user_id = '00000000-0000-0000-0000-000000000000';

-- Try to delete the problematic user directly
DO $$
BEGIN
  BEGIN
    DELETE FROM public.users WHERE id = '00000000-0000-0000-0000-000000000000';
  EXCEPTION WHEN OTHERS THEN
    -- Ignore errors
  END;
END $$;

-- Create a new admin user
DO $$
DECLARE
    new_admin_id uuid := gen_random_uuid();
BEGIN
    -- Insert the new admin user into auth.users first
    INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, aud, role)
    VALUES (
        new_admin_id,
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

    -- Then insert into public.users
    INSERT INTO public.users (id, email, name, role, created_at, updated_at)
    VALUES (
        new_admin_id,
        'admin@masaldunyasi.com',
        'Admin',
        'admin',
        now(),
        now()
    );
END $$;

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;