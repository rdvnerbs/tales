-- Disable RLS temporarily to allow operations
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories DISABLE ROW LEVEL SECURITY;

-- Delete any references to users in user_stories
DELETE FROM public.user_stories;

-- Drop the users table with CASCADE to remove dependencies
DROP TABLE IF EXISTS public.users CASCADE;

-- Create the users table with proper structure
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate the foreign key constraint in user_stories
ALTER TABLE public.user_stories ADD CONSTRAINT user_stories_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.users(id);

-- Create a new admin user with a simple password: 'admin123'
DO $$
DECLARE
    new_admin_id uuid := gen_random_uuid();
BEGIN
    -- Delete any existing admin user in auth.users
    DELETE FROM auth.users WHERE email = 'admin@masaldunyasi.com';
    
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
    
    -- Create a regular user for testing
    DECLARE
        regular_user_id uuid := gen_random_uuid();
    BEGIN
        -- Insert regular user into auth.users
        INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, aud, role)
        VALUES (
            regular_user_id,
            'user@masaldunyasi.com',
            now(),
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            '{"name":"Test User"}',
            false,
            -- This is the encrypted version of 'user123'
            '$2a$10$uxPm0qeJAz70e/G9oDNkUOzCLi1tc8dREYcEu83kSk7F9nGsuJx2W',
            'authenticated',
            'authenticated'
        );

        -- Insert regular user into public.users
        INSERT INTO public.users (id, email, name, role, created_at, updated_at)
        VALUES (
            regular_user_id,
            'user@masaldunyasi.com',
            'Test User',
            'user',
            now(),
            now()
        );
    END;
END $$;

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;

-- Add policies for users table
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
CREATE POLICY "Users can view their own data" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id OR auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admin has full access" ON public.users;
CREATE POLICY "Admin has full access" 
  ON public.users FOR ALL 
  USING (auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin'));