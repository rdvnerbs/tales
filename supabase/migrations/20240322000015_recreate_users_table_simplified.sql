-- Disable RLS temporarily to allow operations
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories DISABLE ROW LEVEL SECURITY;

-- Delete any references to users in user_stories
DELETE FROM public.user_stories;

-- Drop the users table with CASCADE to remove dependencies
DROP TABLE IF EXISTS public.users CASCADE;

-- Create the users table with proper structure
CREATE TABLE public.users (
  id UUID PRIMARY KEY,
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

-- Create a new admin user
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    'admin@masaldunyasi.com',
    'Admin',
    'admin',
    now(),
    now()
);

-- Create a regular user for testing
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'user@masaldunyasi.com',
    'Test User',
    'user',
    now(),
    now()
);

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;

-- Add policies for users table
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
CREATE POLICY "Users can view their own data" 
  ON public.users FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Admin has full access" ON public.users;
CREATE POLICY "Admin has full access" 
  ON public.users FOR ALL 
  USING (true);