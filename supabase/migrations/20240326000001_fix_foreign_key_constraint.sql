-- Drop the foreign key constraint that's causing issues
ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS users_id_fkey;

-- Modify the trigger function to handle null IDs
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only insert if ID is not null
  IF NEW.id IS NOT NULL THEN
    INSERT INTO public.users (id, email, name, role, created_at, updated_at)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
      'user',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure the users table has the correct columns
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Make sure the role column is of the correct type
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
  END IF;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

-- Add role column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
    ALTER TABLE public.users ADD COLUMN role user_role NOT NULL DEFAULT 'user';
  END IF;
EXCEPTION WHEN undefined_column THEN
  NULL;
END $$;

-- Create admin user if it doesn't exist
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@example.com',
  'Admin User',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;
