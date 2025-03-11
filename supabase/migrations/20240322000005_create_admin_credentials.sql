-- Create admin user with password
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@masaldunyasi.com',
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}'  
)
ON CONFLICT (id) DO NOTHING;

-- Set password for admin user (password is 'admin123')
UPDATE auth.users
SET encrypted_password = '$2a$10$Ht9QXvMcJVnGKmx.XnLxC.Jo8qQrJxLQh9UvZ9QVmFRTOQGgrjMdq'
WHERE email = 'admin@masaldunyasi.com';

-- Create admin user in public.users table
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
