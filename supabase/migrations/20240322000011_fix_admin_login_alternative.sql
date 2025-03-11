-- Disable RLS temporarily to allow operations
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories DISABLE ROW LEVEL SECURITY;

-- Find any references to the problematic user ID in user_stories
DELETE FROM public.user_stories WHERE user_id = '00000000-0000-0000-0000-000000000000';

-- Create a new admin user with a different UUID
DO $$
DECLARE
    new_admin_id uuid := gen_random_uuid();
BEGIN
    -- Insert the new admin user into public.users
    INSERT INTO public.users (id, email, name, role, created_at, updated_at)
    VALUES (
        new_admin_id,
        'admin@masaldunyasi.com',
        'Admin',
        'admin',
        now(),
        now()
    );

    -- Insert the new admin user into auth.users
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

    -- Now try to delete the problematic user if it exists in public.users
    -- but not in auth.users (which would cause the constraint error)
    DELETE FROM public.users 
    WHERE id = '00000000-0000-0000-0000-000000000000' 
    AND NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000000');

END $$;

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;