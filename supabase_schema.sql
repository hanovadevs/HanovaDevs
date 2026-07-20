-- ============================================================
-- HANOVA DEVS SUPABASE DATABASE MIGRATION SCRIPT
-- Copy and paste this script into your Supabase SQL Editor to
-- create all required tables for Appointments, Transcripts,
-- Projects CMS, Chatbot Knowledge Base Q&A, and Config!
-- ============================================================

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

-- Row Level Security (RLS) Enablement & Policies (Public Read/Write for Anon Access)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_config ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access for the app APIs
CREATE POLICY "Allow public all on appointments" ON public.appointments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on chat_transcripts" ON public.chat_transcripts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on chatbot_qa" ON public.chatbot_qa FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on chatbot_config" ON public.chatbot_config FOR ALL USING (true) WITH CHECK (true);
