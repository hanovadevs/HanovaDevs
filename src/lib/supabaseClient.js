import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

// Helper to seed initial mock data into localStorage if empty
const seedLocalStorage = () => {
  if (!localStorage.getItem('hd_appointments')) {
    const mockAppointments = [
      {
        id: 'mock-1',
        name: 'Sarah Jenkins',
        email: 'sarah@aurawellness.com',
        phone: '+1 (555) 234-5678',
        service: 'ai-automation',
        date: '2026-07-22',
        time: '14:00',
        message: 'Looking to set up an AI calling assistant for outbound lead scheduling and website customer support chatbot.',
        budget: '$1,000 - $3,000',
        status: 'pending',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString() // 4 hours ago
      },
      {
        id: 'mock-2',
        name: 'Michael Chen',
        email: 'm.chen@omnitech.io',
        phone: '+1 (555) 876-5432',
        service: 'web-design',
        date: '2026-07-24',
        time: '10:30',
        message: 'Need a high-performance Next.js site with custom graphics.',
        budget: '$3,000 - $5,000',
        status: 'approved',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString() // 24 hours ago
      }
    ]
    localStorage.setItem('hd_appointments', JSON.stringify(mockAppointments))
  }

  if (!localStorage.getItem('hd_transcripts')) {
    const mockTranscripts = [
      {
        id: 'chat-mock-1',
        user_name: 'Sarah Jenkins',
        user_email: 'sarah@aurawellness.com',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        messages: [
          { role: 'assistant', content: 'Hello! I am Aria, your AI guide for HanovaDevs. How can I help you scale operations today?' },
          { role: 'user', content: 'Hi, I run a wellness group and want to automate our bookings. Do you build bots?' },
          { role: 'assistant', content: 'Absolutely! AI Automation is one of our core specialties. We design custom website chatbots for 24/7 client triage and conversational voice assistants that can call leads and book schedules directly into your CRM. Would you like to check out our cost estimator or book a consultation call?' },
          { role: 'user', content: 'I would love to book a consultation call.' },
          { role: 'assistant', content: 'Perfect! I can help you book that. Please pick a date and time.' },
          { role: 'user', content: 'Let\'s do July 22nd at 2:00 PM.' },
          { role: 'assistant', content: 'Great, July 22nd at 2:00 PM works. May I have your name, email, and phone number to finalize?' },
          { role: 'user', content: 'My name is Sarah Jenkins, email is sarah@aurawellness.com, and phone is +1 (555) 234-5678. We have a budget of about $2,000.' },
          { role: 'assistant', content: 'Perfect, I have all details! I am booking the call now...' }
        ]
      }
    ]
    localStorage.setItem('hd_transcripts', JSON.stringify(mockTranscripts))
  }
}

// Seed on module evaluation
seedLocalStorage()

export async function getAppointments() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) return data
      console.error('Supabase fetch error, falling back to localStorage:', error)
    } catch (err) {
      console.error('Supabase connection error:', err)
    }
  }

  const local = localStorage.getItem('hd_appointments')
  return local ? JSON.parse(local) : []
}

export async function saveAppointment(appointment) {
  const newAppointment = {
    id: appointment.id || Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    status: 'pending',
    ...appointment
  }

  if (isSupabaseConfigured) {
    try {
      // Exclude timezone from the payload sent to Supabase to prevent schema mismatch errors
      const { timezone, ...supabasePayload } = newAppointment
      const { data, error } = await supabase
        .from('appointments')
        .insert([supabasePayload])
        .select()
      if (!error) {
        // Return full appointment (with timezone) to keep UI state unified
        return { ...data[0], timezone }
      }
      console.error('Supabase save error, falling back to localStorage:', error)
    } catch (err) {
      console.error('Supabase connection error:', err)
    }
  }

  // Local storage fallback
  const current = await getAppointments()
  const updated = [newAppointment, ...current]
  localStorage.setItem('hd_appointments', JSON.stringify(updated))
  return newAppointment
}

export async function updateAppointmentStatus(id, status) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)
        .select()
      if (!error) return data[0]
      console.error('Supabase update error, falling back to localStorage:', error)
    } catch (err) {
      console.error('Supabase update connection error:', err)
    }
  }

  // Local storage fallback
  const current = await getAppointments()
  const updated = current.map(app => app.id === id ? { ...app, status } : app)
  localStorage.setItem('hd_appointments', JSON.stringify(updated))
  return { id, status }
}

export async function getChatTranscripts() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('chat_transcripts')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) return data
      console.error('Supabase fetch transcripts error:', error)
    } catch (err) {
      console.error('Supabase connection error:', err)
    }
  }

  const local = localStorage.getItem('hd_transcripts')
  return local ? JSON.parse(local) : []
}

export async function saveChatTranscript(transcript) {
  const newTranscript = {
    id: transcript.id || Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    ...transcript
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('chat_transcripts')
        .insert([newTranscript])
        .select()
      if (!error) return data[0]
      console.error('Supabase save transcript error:', error)
    } catch (err) {
      console.error('Supabase connection error:', err)
    }
  }

  // Local storage fallback
  const current = await getChatTranscripts()
  const updated = [newTranscript, ...current]
  localStorage.setItem('hd_transcripts', JSON.stringify(updated))
  return newTranscript
}
