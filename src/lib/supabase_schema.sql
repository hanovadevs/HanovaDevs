-- =========================================================================
-- HANOVADEVS: AI BOT & BOOKING SYSTEM SCHEMA
-- Run these queries in your Supabase SQL Editor to set up the tables
-- =========================================================================

-- 1. Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  message TEXT,
  budget TEXT,
  status TEXT DEFAULT 'pending' NOT NULL
);

-- 2. Create chat_transcripts table
CREATE TABLE IF NOT EXISTS chat_transcripts (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_name TEXT,
  user_email TEXT,
  messages JSONB NOT NULL
);

-- 3. Enable Row Level Security (RLS) for security best practices
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_transcripts ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies. Admin users must receive role=admin in app_metadata.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY INVOKER SET search_path = ''
AS $$ SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false) $$;

DROP POLICY IF EXISTS "Allow anon insert on appointments" ON appointments;
CREATE POLICY "Allow anon insert on appointments" ON appointments 
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select for all on appointments" ON appointments;
DROP POLICY IF EXISTS "Allow update for all on appointments" ON appointments;
DROP POLICY IF EXISTS "Admins manage appointments" ON appointments;
CREATE POLICY "Admins manage appointments" ON appointments FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow anon insert on chat_transcripts" ON chat_transcripts;
CREATE POLICY "Allow anon insert on chat_transcripts" ON chat_transcripts 
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select for all on chat_transcripts" ON chat_transcripts;
DROP POLICY IF EXISTS "Admins manage chat transcripts" ON chat_transcripts;
CREATE POLICY "Admins manage chat transcripts" ON chat_transcripts FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
