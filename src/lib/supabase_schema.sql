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

-- 4. Create RLS Policies
-- Note: Adjust policies according to your specific authorization rules.
-- The policies below permit anyone to insert (so clients can submit bookings/chats anonymously)
-- and permit read access for viewing in the admin portal.

DROP POLICY IF EXISTS "Allow anon insert on appointments" ON appointments;
CREATE POLICY "Allow anon insert on appointments" ON appointments 
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select for all on appointments" ON appointments;
CREATE POLICY "Allow select for all on appointments" ON appointments 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow update for all on appointments" ON appointments;
CREATE POLICY "Allow update for all on appointments" ON appointments 
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow anon insert on chat_transcripts" ON chat_transcripts;
CREATE POLICY "Allow anon insert on chat_transcripts" ON chat_transcripts 
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select for all on chat_transcripts" ON chat_transcripts;
CREATE POLICY "Allow select for all on chat_transcripts" ON chat_transcripts 
  FOR SELECT USING (true);
