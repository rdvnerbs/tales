-- Create visitors table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT,
  user_agent TEXT,
  language TEXT,
  referrer TEXT,
  page_visited TEXT,
  visit_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_activities table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) NULL,
  story_id UUID REFERENCES public.stories(id) NULL,
  activity_type TEXT,
  value INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS but add policies to allow all operations
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for visitors table
DROP POLICY IF EXISTS "Allow all operations on visitors" ON public.visitors;
CREATE POLICY "Allow all operations on visitors"
  ON public.visitors
  FOR ALL
  USING (true);

-- Create policies for user_activities table
DROP POLICY IF EXISTS "Allow all operations on user_activities" ON public.user_activities;
CREATE POLICY "Allow all operations on user_activities"
  ON public.user_activities
  FOR ALL
  USING (true);

-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_activities;
