-- Disable RLS temporarily to allow operations
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories DISABLE ROW LEVEL SECURITY;

-- Delete any existing admin user completely
DELETE FROM public.user_stories WHERE user_id IN (SELECT id FROM public.users WHERE email = 'admin@masaldunyasi.com');
DELETE FROM public.users WHERE email = 'admin@masaldunyasi.com';
DELETE FROM auth.users WHERE email = 'admin@masaldunyasi.com';

-- Create a new admin user with a simple password: 'admin123'
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
        -- This is the encrypted version of 'admin123'
        '$2a$10$uxPm0qeJAz70e/G9oDNkUOzCLi1tc8dREYcEu83kSk7F9nGsuJx2W',
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