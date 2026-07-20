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

// ----------------------------------------------------
// CMS: PROJECTS MANAGEMENT
// ----------------------------------------------------
export async function getProjects() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) return data
    } catch (err) {
      console.warn('Supabase projects fetch error, falling back to local:', err)
    }
  }

  const local = localStorage.getItem('hd_projects')
  if (local) return JSON.parse(local)

  // Default initial projects list if empty
  const defaultProjects = [
    {
      id: 'omnai',
      title: 'Omnai Browser',
      category: 'AI Desktop App',
      description: 'An AI-native browser workspace combining real-time search, multi-model execution, and spatial canvas tabs.',
      metrics: '15,000+ Active Downloads',
      image_url: '/codator_thumbnail_1783701656463.png',
      live_url: '/products/omnai',
      created_at: new Date().toISOString()
    },
    {
      id: 'eunoia',
      title: 'Eunoia Mobile App',
      category: 'React Native & iOS',
      description: 'AI-driven wellness journal featuring voice sentiment analysis, sleep optimization telemetry, and biometric sync.',
      metrics: '4.9★ App Store Rating',
      image_url: '/cute_bot_avatar_1784487626582.png',
      live_url: '/products/eunoia',
      created_at: new Date().toISOString()
    },
    {
      id: 'codator',
      title: 'CODATOR IDE Plugin',
      category: 'Developer Tools',
      description: 'Intelligent code generation and automated test suite synthesizer built for high-scale TypeScript teams.',
      metrics: '2.4M Code Snippets Generated',
      image_url: '/codator_thumbnail_1783701656463.png',
      live_url: '#',
      created_at: new Date().toISOString()
    }
  ]
  localStorage.setItem('hd_projects', JSON.stringify(defaultProjects))
  return defaultProjects
}

export async function saveProject(project) {
  const item = {
    id: project.id || Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    ...project
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .upsert([item])
        .select()
      if (!error && data) return data[0]
    } catch (err) {
      console.warn('Supabase save project error, saving locally:', err)
    }
  }

  const current = await getProjects()
  const filtered = current.filter(p => p.id !== item.id)
  const updated = [item, ...filtered]
  localStorage.setItem('hd_projects', JSON.stringify(updated))
  return item
}

export async function deleteProject(id) {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('projects').delete().eq('id', id)
    } catch (err) {
      console.warn('Supabase delete project error:', err)
    }
  }

  const current = await getProjects()
  const updated = current.filter(p => p.id !== id)
  localStorage.setItem('hd_projects', JSON.stringify(updated))
  return { id }
}

// ----------------------------------------------------
// AI CHATBOT: KNOWLEDGE BASE Q&A & CONFIG
// ----------------------------------------------------
export async function getChatbotQA() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('chatbot_qa')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) return data
    } catch (err) {
      console.warn('Supabase chatbot_qa fetch error, falling back to local:', err)
    }
  }

  const local = localStorage.getItem('hd_chatbot_qa')
  if (local) return JSON.parse(local)

  const defaultQA = [
    {
      id: 'qa-1',
      question: 'What is your typical project timeline?',
      answer: 'Our standard web app development sprint ranges from 2 to 4 weeks. AI automation bots and integrations take between 1 to 2 weeks.',
      category: 'Services',
      created_at: new Date().toISOString()
    },
    {
      id: 'qa-2',
      question: 'Do you offer ongoing retainer & maintenance plans?',
      answer: 'Yes! We offer monthly retainer packages for system maintenance, continuous AI fine-tuning, and cloud infrastructure monitoring.',
      category: 'Pricing',
      created_at: new Date().toISOString()
    }
  ]
  localStorage.setItem('hd_chatbot_qa', JSON.stringify(defaultQA))
  return defaultQA
}

export async function saveChatbotQA(item) {
  const qaItem = {
    id: item.id || Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    ...item
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('chatbot_qa')
        .upsert([qaItem])
        .select()
      if (!error && data) return data[0]
    } catch (err) {
      console.warn('Supabase save QA error, saving locally:', err)
    }
  }

  const current = await getChatbotQA()
  const filtered = current.filter(q => q.id !== qaItem.id)
  const updated = [qaItem, ...filtered]
  localStorage.setItem('hd_chatbot_qa', JSON.stringify(updated))
  return qaItem
}

export async function deleteChatbotQA(id) {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('chatbot_qa').delete().eq('id', id)
    } catch (err) {
      console.warn('Supabase delete QA error:', err)
    }
  }

  const current = await getChatbotQA()
  const updated = current.filter(q => q.id !== id)
  localStorage.setItem('hd_chatbot_qa', JSON.stringify(updated))
  return { id }
}

export async function getChatbotConfig() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('chatbot_config')
        .select('*')
        .single()
      if (!error && data) return data
    } catch (err) {
      console.warn('Supabase config fetch error:', err)
    }
  }

  const local = localStorage.getItem('hd_chatbot_config')
  if (local) return JSON.parse(local)

  const defaultConfig = {
    persona_mode: 'consultative',
    promo_banner: '🔥 Q3 Special: Book a free 30-min strategy call today to get 15% off AI Automation implementations!',
    system_notes: 'Focus on scaling client revenue and highlighting our 2-week turnaround time.'
  }
  localStorage.setItem('hd_chatbot_config', JSON.stringify(defaultConfig))
  return defaultConfig
}

export async function saveChatbotConfig(config) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('chatbot_config')
        .upsert([{ id: 1, updated_at: new Date().toISOString(), ...config }])
        .select()
      if (!error && data) return data[0]
    } catch (err) {
      console.warn('Supabase save config error:', err)
    }
  }

  localStorage.setItem('hd_chatbot_config', JSON.stringify(config))
  return config
}

// ----------------------------------------------------
// ADMIN INTERNAL NOTES FOR APPOINTMENTS
// ----------------------------------------------------
export async function getAdminNotes() {
  const local = localStorage.getItem('hd_admin_notes')
  return local ? JSON.parse(local) : {}
}

export async function saveAdminNote(appointmentId, noteText) {
  const current = await getAdminNotes()
  const updated = { ...current, [appointmentId]: noteText }
  localStorage.setItem('hd_admin_notes', JSON.stringify(updated))
  return updated
}
