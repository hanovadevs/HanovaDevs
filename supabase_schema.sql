-- ============================================================
-- HANOVA DEVS SUPABASE DATABASE MIGRATION SCRIPT
-- Copy and paste this script into your Supabase SQL Editor to
-- create all required tables for Appointments, Transcripts,
-- Projects CMS, Chatbot Knowledge Base Q&A, and Config!
-- ============================================================
--
-- 1. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    message TEXT,
    budget TEXT,
    status TEXT DEFAULT 'pending'
);

-- 2. Chat Transcripts Audit Table
CREATE TABLE IF NOT EXISTS public.chat_transcripts (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_name TEXT,
    user_email TEXT,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 3. CMS: Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    metrics TEXT,
    image_url TEXT,
    live_url TEXT
);

-- 4. AI Chatbot: Custom Q&A Knowledge Base Table
CREATE TABLE IF NOT EXISTS public.chatbot_qa (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General'
);

-- 5. AI Chatbot: System Configuration & Promo Banner Table
CREATE TABLE IF NOT EXISTS public.chatbot_config (
    id INT PRIMARY KEY DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    persona_mode TEXT DEFAULT 'consultative',
    promo_banner TEXT,
    system_notes TEXT
);

-- Row Level Security (RLS). Administrative access requires a Supabase Auth
-- user with { "role": "admin" } in app_metadata. Never place this role in
-- user_metadata because users can edit their own user_metadata.
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public all on appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow public all on chat_transcripts" ON public.chat_transcripts;
DROP POLICY IF EXISTS "Allow public all on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow public all on chatbot_qa" ON public.chatbot_qa;
DROP POLICY IF EXISTS "Allow public all on chatbot_config" ON public.chatbot_config;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
$$;

-- Public lead capture: create only. Returned rows are intentionally hidden.
CREATE POLICY "Public can create appointments" ON public.appointments
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins manage appointments" ON public.appointments
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can create chat transcripts" ON public.chat_transcripts
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins manage chat transcripts" ON public.chat_transcripts
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Public content may be read by the website; only administrators may mutate it.
CREATE POLICY "Public can read projects" ON public.projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage projects" ON public.projects
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can read chatbot Q and A" ON public.chatbot_qa FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage chatbot Q and A" ON public.chatbot_qa
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can read chatbot config" ON public.chatbot_config FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage chatbot config" ON public.chatbot_config
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
