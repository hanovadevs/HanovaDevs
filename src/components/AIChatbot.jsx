import { useState, useEffect, useRef } from 'react'
import { saveAppointment, saveChatTranscript, getAppointments } from '../lib/supabaseClient'
import './AIChatbot.css'

// Simulated local intelligence engine for local testing offline/without key
const generateSimulatedResponse = async (userText, history, bookingState, setBookingState, bookingData, setBookingData) => {
  const text = userText.toLowerCase()
  
  // Handlers for the booking state machine in simulated mode
  if (bookingState === 'collecting_name') {
    setBookingData(prev => ({ ...prev, name: userText }))
    setBookingState('collecting_email')
    return {
      content: `Nice to meet you, ${userText}! Could you please share your email address so we can send the meeting link?`
    }
  }
  
  if (bookingState === 'collecting_email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userText.trim())) {
      return {
        content: "Hmm, that doesn't look like a valid email. Could you please double check and type it again?"
      }
    }
    setBookingData(prev => ({ ...prev, email: userText.trim() }))
    setBookingState('collecting_service')
    return {
      content: "Thank you! What service area are you interested in? (e.g. AI Automation, Web Design, Shopify Store Setup, UGC Ads, Branding, SEO)"
    }
  }

  if (bookingState === 'collecting_service') {
    let matchedService = 'ai-automation'
    if (text.includes('design') || text.includes('web') || text.includes('dev')) matchedService = 'web-design'
    else if (text.includes('shopify') || text.includes('store') || text.includes('commerce')) matchedService = 'shopify-development'
    else if (text.includes('ugc') || text.includes('ad') || text.includes('marketing')) matchedService = 'ugc-ads'
    else if (text.includes('brand') || text.includes('logo')) matchedService = 'branding'
    else if (text.includes('seo') || text.includes('search')) matchedService = 'seo'

    setBookingData(prev => ({ ...prev, service: matchedService }))
    setBookingState('collecting_timezone')
    return {
      content: `Got it! Which timezone are you in? (You can check or change it via the timezone bar at the bottom of the chat, or simply tell me).`
    }
  }

  if (bookingState === 'collecting_timezone') {
    setBookingData(prev => ({ ...prev, timezone: userText }))
    setBookingState('collecting_datetime')
    return {
      content: `Understood, setting timezone to ${userText}. Let's choose a date and time slot. Please provide your preferred date in YYYY-MM-DD format (e.g., 2026-07-20) and time (e.g. 10:00, 14:00, 16:00).`
    }
  }

  if (bookingState === 'collecting_datetime') {
    // Basic date/time parser
    const dateMatch = userText.match(/\d{4}-\d{2}-\d{2}/)
    const timeMatch = userText.match(/\d{2}:\d{2}/)

    const dateStr = dateMatch ? dateMatch[0] : ''
    const timeStr = timeMatch ? timeMatch[0] : ''

    if (!dateStr || !timeStr) {
      return {
        content: "I couldn't quite catch the date and time. Please type the date in YYYY-MM-DD format (e.g., 2026-07-20) and time slot in HH:MM format (e.g. 14:00)."
      }
    }

    // Check availability against local mock db/Supabase
    try {
      const currentAppointments = await getAppointments()
      const isTaken = currentAppointments.some(
        a => a.date === dateStr && a.time === timeStr && a.status !== 'cancelled'
      )
      if (isTaken) {
        return {
          content: `I'm sorry, the slot on ${dateStr} at ${timeStr} is already booked. Could you please select another date or time slot?`
        }
      }
    } catch (e) {
      console.warn("DB check bypassed in simulation:", e)
    }

    const finalBookingData = {
      ...bookingData,
      date: dateStr,
      time: timeStr
    }

    try {
      // Auto-inject timezone prefix to notes message to prevent DB schemas missing a dedicated column from erroring out
      const savePayload = {
        ...finalBookingData,
        message: `[Timezone: ${finalBookingData.timezone || 'UTC'}] ${finalBookingData.message || ''}`.trim()
      }
      await saveAppointment(savePayload)

      // Send initial request notification email to client
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: finalBookingData.email,
          name: finalBookingData.name,
          date: finalBookingData.date,
          time: finalBookingData.time,
          timezone: finalBookingData.timezone || 'UTC',
          service: finalBookingData.service || 'ai-automation',
          type: 'request'
        })
      }).catch(e => console.warn("Simulated email send error:", e))

      setBookingData(finalBookingData)
      setBookingState('confirmed')
      return {
        content: `🎉 **Booking Confirmed!**\n\nThank you, **${finalBookingData.name}**. I have registered your discovery call on **${finalBookingData.date}** at **${finalBookingData.time}** (${finalBookingData.timezone}) for your **${finalBookingData.service.replace('-', ' ')}** project.\n\n📬 **Please check your email inbox (and your Spam / Promotions folder just in case!)** for a confirmation note. Our engineering team is reviewing your details, and a **Google Meet link will be shared with you soon**!`
      }
    } catch (err) {
      console.error(err)
      return {
        content: "I processed your request, but was unable to write it to our database. Could you please try again?"
      }
    }
  }

  // Joke handler
  if (text.includes('joke') || text.includes('funny') || text.includes('laugh')) {
    const jokes = [
      "Why don't scientists trust atoms? ...Because they make up everything! ⚛️\n\nSpeaking of building things, what kind of digital project are you looking to launch?",
      "Why do programmers prefer dark mode? ...Because light attracts bugs! 🐛\n\nLuckily, our custom Next.js builds at HanovaDevs are bug-free and lightning fast!",
      "There are 10 types of people in the world: those who understand binary, and those who don't! 😉\n\nCan I help you automate any tech or design workflows today?"
    ]
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
    return { content: randomJoke }
  }

  // Refusal / Negative response handler ("no", "nope", "not really")
  if (text === 'no' || text === 'nope' || text.includes('not now') || text.includes('no thanks') || text.includes('cancel')) {
    return {
      content: "No problem at all! 😊 I'm right here whenever you need assistance. Feel free to ask about our projects, estimate costs on our **/calculator** page, or reach out anytime."
    }
  }

  // Gratitude / Praise
  if (text.includes('thank') || text.includes('awesome') || text.includes('great') || text.includes('cool')) {
    return {
      content: "You're very welcome! 🚀 We love building high-performance systems. Is there anything else I can assist you with today?"
    }
  }

  // General Q&A handlers
  if (text.includes('book') || text.includes('schedule') || text.includes('appointment') || text.includes('call')) {
    setBookingState('collecting_name')
    return {
      content: "I'd love to help you book a discovery call! To get started, what is your full name?"
    }
  }

  if (text.includes('price') || text.includes('cost') || text.includes('rate') || text.includes('how much')) {
    return {
      content: "At HanovaDevs, we tailormade our systems to fit your exact business goals. Our simple web layouts, Shopify builds, and UGC ad testing campaigns start from around **$300 - $500**. Custom software and advanced AI calling assistants depend on complexity. You can check our interactive **/calculator** page for an instant cost estimate, or we can schedule a consultation call to discuss your project!"
    }
  }

  if (text.includes('ai') || text.includes('bot') || text.includes('automation') || text.includes('chatbot') || text.includes('assistant')) {
    return {
      content: "AI Automation is our signature capability! We build three key solutions:\n1. **Website AI Chatbots** (just like me!) to qualify leads and answer support.\n2. **AI Calling Assistants** that handle outbound phone bookings naturally.\n3. **Unified AI dashboards** to track logs and transcripts.\nWould you like to book a call to set this up for your company?"
    }
  }

  if (text.includes('web') || text.includes('design') || text.includes('react') || text.includes('next')) {
    return {
      content: "We engineer lightning-fast websites and web applications using React, Next.js, and Vite. Our sites achieve 100/100 Lighthouse performance scores to maximize search indexing. Would you like to schedule a call to discuss a website project?"
    }
  }

  if (text.includes('shopify') || text.includes('e-commerce') || text.includes('store')) {
    return {
      content: "We design conversion-optimized Shopify stores and custom Liquid themes. We handle integrations with Klaviyo, subscription setups, and checkout customization. Would you like to schedule a call to plan your store launch?"
    }
  }

  if (text.includes('work') || text.includes('portfolio') || text.includes('project') || text.includes('done') || text.includes('omnai') || text.includes('eunoia') || text.includes('codator')) {
    return {
      content: "We have built some amazing systems recently!\n• **Omnai**: AI vector document workspace for enterprise research\n• **Eunoia**: Premium luxury brand digital showcase\n• **CODATOR**: Gamified coding league portal for FAST-NUCES\n• **TerraSol**: Real-time solar telemetry monitoring\n\nYou can explore our full interactive gallery on our **/projects** page!"
    }
  }

  if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greet')) {
    return {
      content: "Hello! 👋 I'm Aria, your HanovaDevs AI Guide. How can I help you automate operations or elevate your digital brand today?"
    }
  }

  return {
    content: "Understood! We specialize in custom web apps, AI automation, Shopify development, and UGC marketing. How can I assist you today? Feel free to ask about our projects, calculate costs, or schedule a free 15-minute discovery call!"
  }
}

const popularTimezones = [
  "Africa/Cairo", "Africa/Johannesburg", "Africa/Lagos", "Africa/Nairobi",
  "America/Anchorage", "America/Argentina/Buenos_Aires", "America/Bogota",
  "America/Chicago", "America/Denver", "America/Halifax", "America/Los_Angeles",
  "America/Mexico_City", "America/New_York", "America/Phoenix", "America/Santiago",
  "America/Sao_Paulo", "America/St_Johns", "America/Toronto", "America/Vancouver",
  "Asia/Baghdad", "Asia/Bangkok", "Asia/Dubai", "Asia/Hong_Kong", "Asia/Jakarta",
  "Asia/Jerusalem", "Asia/Kabul", "Asia/Karachi", "Asia/Kolkata", "Asia/Manila",
  "Asia/Riyadh", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Taipei",
  "Asia/Tehran", "Asia/Tokyo", "Atlantic/Azores", "Australia/Adelaide",
  "Australia/Brisbane", "Australia/Darwin", "Australia/Melbourne", "Australia/Perth",
  "Australia/Sydney", "Europe/Amsterdam", "Europe/Athens", "Europe/Belgrade",
  "Europe/Berlin", "Europe/Brussels", "Europe/Budapest", "Europe/Dublin",
  "Europe/Helsinki", "Europe/Istanbul", "Europe/Lisbon", "Europe/London",
  "Europe/Madrid", "Europe/Moscow", "Europe/Paris", "Europe/Prague", "Europe/Rome",
  "Europe/Stockholm", "Europe/Vienna", "Europe/Warsaw", "Europe/Zurich",
  "Pacific/Auckland", "Pacific/Fiji", "Pacific/Honolulu", "UTC"
];

// Rich text formatter for chatbot messages
const renderFormattedText = (text) => {
  if (!text) return null;
  if (typeof text !== 'string') return text;

  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    let cleanLine = line;
    let isBullet = false;

    if (cleanLine.trim().startsWith('• ') || cleanLine.trim().startsWith('- ')) {
      isBullet = true;
      cleanLine = cleanLine.trim().substring(2);
    }

    const regex = /(\*\*(.*?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|(\/(?:calculator|projects|services|contact|about)))/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(cleanLine)) !== null) {
      if (match.index > lastIndex) {
        parts.push(cleanLine.substring(lastIndex, match.index));
      }

      if (match[2] !== undefined) {
        // Bold text **...**
        parts.push(<strong key={match.index}>{match[2]}</strong>);
      } else if (match[3] !== undefined) {
        // Code `...`
        parts.push(<code key={match.index}>{match[3]}</code>);
      } else if (match[4] !== undefined && match[5] !== undefined) {
        // Markdown Link [label](url)
        parts.push(
          <a key={match.index} href={match[5]} target="_blank" rel="noopener noreferrer" className="ai-chat-link">
            {match[4]}
          </a>
        );
      } else if (match[6] !== undefined) {
        // Relative path link
        parts.push(
          <a key={match.index} href={match[6]} className="ai-chat-link">
            {match[6]}
          </a>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < cleanLine.length) {
      parts.push(cleanLine.substring(lastIndex));
    }

    const contentElements = parts.length > 0 ? parts : cleanLine;

    if (isBullet) {
      return (
        <div key={lineIdx} className="ai-chat-bullet-item">
          <span className="ai-chat-bullet-dot">•</span>
          <span>{contentElements}</span>
        </div>
      );
    }

    return <p key={lineIdx}>{contentElements}</p>;
  });
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTimezonePickerOpen, setIsTimezonePickerOpen] = useState(false)
  const [timezoneSearch, setTimezoneSearch] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Aria, your AI Guide for HanovaDevs. ⚡ How can I help you automate operations or scale your digital presence today?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)

  // Booking states
  const [bookingState, setBookingState] = useState('idle') // idle, collecting_name, collecting_email, collecting_timezone, collecting_datetime, confirmed
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'ai-automation',
    date: '',
    time: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    message: '',
    budget: '$1,000 - $3,000'
  })

  const messagesEndRef = useRef(null)
  const chatSessionId = useRef(Math.random().toString(36).substr(2, 9))

  const filteredTimezones = popularTimezones.filter(tz => 
    tz.toLowerCase().replace('_', ' ').replace('/', ' ').includes(timezoneSearch.toLowerCase())
  )

  const handleTimezoneSelect = (tz) => {
    setBookingData(prev => ({ ...prev, timezone: tz }))
    setIsTimezonePickerOpen(false)
    setTimezoneSearch('')
    
    // Auto-update conversation so Claude knows their timezone immediately
    handleSend(`I have set my timezone to ${tz}`)
  }


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    // Show badge notification after 5 seconds if chat is closed
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNewMessage(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [isOpen])


  // Save/update transcript in local storage whenever message list changes
  useEffect(() => {
    if (messages.length > 1) {
      const activeName = bookingData.name || 'Anonymous Visitor'
      const activeEmail = bookingData.email || 'None'
      saveChatTranscript({
        id: chatSessionId.current,
        user_name: activeName,
        user_email: activeEmail,
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      }).catch(err => console.error(err))
    }
  }, [messages, bookingData.name, bookingData.email])

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue
    if (!text.trim()) return

    const userMessage = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Pre-fill booking details from message text if matching name/email patterns in simulated mode
    if (bookingState === 'collecting_name') {
      setBookingData(prev => ({ ...prev, name: text }))
      setBookingState('collecting_email')
    } else if (bookingState === 'collecting_email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(text.trim())) {
        setBookingData(prev => ({ ...prev, email: text }))
        setBookingState('collecting_service')
      }
    }

    // Fetch active bookings context from database
    let bookedSlots = []
    try {
      const currentAppointments = await getAppointments()
      if (Array.isArray(currentAppointments)) {
        bookedSlots = currentAppointments.map(app => ({
          date: app.date,
          time: app.time,
          status: app.status
        }))
      }
    } catch (dbErr) {
      console.warn("Could not load appointments for context:", dbErr)
    }

    try {
      // First attempt to call the serverless API proxy (Vercel Serverless Function)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          bookedSlots: bookedSlots
        })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.simulated) {
          triggerSimulationResponse(text)
        } else {
          // Process real Claude API response
          const textBlock = data.content?.find(c => c.type === 'text')
          const botText = textBlock ? textBlock.text : ''
          
          // Check for Claude Tool Use (function calling)
          const toolUse = data.content?.find(c => c.type === 'tool_use')
          if (toolUse && toolUse.name === 'book_appointment') {
            const args = toolUse.input
            const fullBookingData = {
              name: args.name || bookingData.name || 'Valued Client',
              email: args.email || bookingData.email || 'no-email@example.com',
              phone: args.phone || '',
              service: args.service || 'ai-automation',
              date: args.date || '',
              time: args.time || '',
              timezone: args.timezone || bookingData.timezone || 'UTC',
              message: args.message || '',
              budget: args.budget || 'Not Specified'
            }

            try {
              // Save to database (Double-safe message prepend so timezone is preserved even if Supabase column hasn't been added yet!)
              const savePayload = {
                ...fullBookingData,
                message: `[Timezone: ${fullBookingData.timezone}] ${fullBookingData.message || ''}`.trim()
              }
              await saveAppointment(savePayload)

              // Automatically dispatch initial request notification email to client
              fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: fullBookingData.email,
                  name: fullBookingData.name,
                  date: fullBookingData.date,
                  time: fullBookingData.time,
                  timezone: fullBookingData.timezone,
                  service: fullBookingData.service,
                  type: 'request'
                })
              }).catch(emailErr => console.warn("Initial email dispatch error:", emailErr))

              setBookingData(fullBookingData)
              setBookingState('confirmed')

              // Construct assistant message containing the tool use block
              const assistantToolUseMsg = {
                role: 'assistant',
                content: data.content
              }

              // Construct user message containing the tool result block
              const userToolResultMsg = {
                role: 'user',
                content: [
                  {
                    type: 'tool_result',
                    tool_use_id: toolUse.id,
                    content: 'success'
                  }
                ]
              }

              // Pre-render the intermediate helper text (if any)
              const intermediateMsgText = botText || "Booking your call now..."
              setMessages(prev => [...prev, { role: 'assistant', content: intermediateMsgText }])

              // Make second pass call to `/api/chat` to get Claude's natural confirmation response
              const secondRes = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  messages: [...messages, userMessage, assistantToolUseMsg, userToolResultMsg],
                  bookedSlots: bookedSlots
                })
              })

              if (secondRes.ok) {
                const secondData = await secondRes.json()
                const secondTextBlock = secondData.content?.find(c => c.type === 'text')
                const finalBotText = secondTextBlock ? secondTextBlock.text : ''
                
                if (finalBotText) {
                  // Replace the intermediate status with the actual confirmation text
                  setMessages(prev => {
                    const next = [...prev];
                    if (next.length > 0 && next[next.length - 1].role === 'assistant') {
                      next[next.length - 1].content = finalBotText;
                    } else {
                      next.push({ role: 'assistant', content: finalBotText });
                    }
                    return next;
                  });
                }
              } else {
                // Fallback to static confirmation if second pass fails
                const fallbackConfirm = `🎉 **Booking Confirmed!**\n\nThank you, **${fullBookingData.name}**. I have registered your discovery call on **${fullBookingData.date}** at **${fullBookingData.time}** (${fullBookingData.timezone}) for your **${fullBookingData.service.replace('-', ' ')}** project.\n\n📬 **Please check your email inbox (and your Spam / Promotions folder just in case!)** for a confirmation note. Our engineering team is reviewing your details, and a **Google Meet link will be shared with you soon**!`
                setMessages(prev => {
                  const next = [...prev];
                  if (next.length > 0 && next[next.length - 1].role === 'assistant') {
                    next[next.length - 1].content = fallbackConfirm;
                  } else {
                    next.push({ role: 'assistant', content: fallbackConfirm });
                  }
                  return next;
                });
              }
            } catch (dbErr) {
              console.error("Failed to save booking:", dbErr)
              setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I processed your booking details, but encountered an error saving it to our database. Please try again."
              }])
            }
          } else {
            if (botText) {
              setMessages(prev => [...prev, { role: 'assistant', content: botText }])
            }
          }
        }
      } else {
        triggerSimulationResponse(text)
      }
    } catch (error) {
      triggerSimulationResponse(text)
    } finally {
      setIsLoading(false)
    }
  }

  const triggerSimulationResponse = (text) => {
    setTimeout(async () => {
      const response = await generateSimulatedResponse(
        text, 
        messages, 
        bookingState, 
        setBookingState, 
        bookingData, 
        setBookingData
      )
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.content }])
      setIsLoading(false)
    }, 800)
  }

  const startBookingFlow = () => {
    setBookingState('collecting_name')
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "Great! Let's schedule a discovery call. May I start with your full name?"
    }])
  }

  const handleResetChat = () => {
    if (window.confirm("Restart conversation?")) {
      setMessages([
        { role: 'assistant', content: 'Hello! I am Aria, your AI Guide for HanovaDevs. ⚡ How can I help you automate operations or scale your digital presence today?' }
      ])
      setBookingState('idle')
      setBookingData({
        name: '',
        email: '',
        phone: '',
        service: 'ai-automation',
        date: '',
        time: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        message: '',
        budget: '$1,000 - $3,000'
      })
      chatSessionId.current = Math.random().toString(36).substr(2, 9)
    }
  }

  return (
    <div className="ai-chatbot-wrapper animate-fade-in">
      {/* Minimized Toggle Bubble */}
      <button 
        className={`ai-chatbot-trigger hoverable ${isOpen ? 'ai-chatbot-trigger--active' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen)
          setHasNewMessage(false)
        }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="ai-chatbot-icon-container">
            {/* Cute Bot Face SVG */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v2M9 4h6M12 8a7 7 0 0 1 7 7v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a7 7 0 0 1 7-7z" />
              <circle cx="9" cy="14" r="1" fill="currentColor" />
              <circle cx="15" cy="14" r="1" fill="currentColor" />
              <path d="M10 17c.5.5 1.5.5 2 0" />
            </svg>
            {hasNewMessage && <span className="ai-chatbot-badge" />}
          </div>
        )}
      </button>

      {/* Floating Chat Panel */}
      <div className={`ai-chatbot-panel ${isOpen ? 'ai-chatbot-panel--open' : ''}`}>
        
        {/* Panel Header */}
        <div className="ai-chatbot-header">
          <div className="ai-chatbot-profile">
            <div className="ai-chatbot-avatar-wrap">
              <img src="/cute_bot_avatar.png" alt="Aria" className="ai-chatbot-avatar" />
              <span className="ai-chatbot-status-dot" />
            </div>
            <div>
              <div className="ai-chatbot-name-row">
                <h4>Aria</h4>
                <span className="ai-chatbot-badge-tag">⚡ AI Guide</span>
              </div>
              <span className="ai-chatbot-subtitle">Online & ready to help!</span>
            </div>
          </div>
          
          <div className="ai-chatbot-header-actions">
            <button 
              className="ai-chatbot-reset-btn" 
              onClick={handleResetChat}
              title="Reset Chat"
            >
              {/* Sleek rotating refresh SVG */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Body containing chat pane */}
        <div className="ai-chatbot-body">
          {/* Chat Pane */}
          <div className="ai-chatbot-chat-pane">
            <div className="ai-chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`ai-chatbot-msg-bubble ai-chatbot-msg-bubble--${msg.role}`}>
                  <div className="ai-chatbot-msg-content">
                    {renderFormattedText(msg.content)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="ai-chatbot-msg-bubble ai-chatbot-msg-bubble--assistant ai-chatbot-msg-bubble--loading">
                  <div className="ai-chatbot-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {bookingState === 'idle' && (
              <div className="ai-chatbot-suggestions">
                <button className="suggestion-chip" onClick={() => handleSend("What services do you offer?")}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                  Services
                </button>
                <button className="suggestion-chip" onClick={() => handleSend("How much do you charge?")}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                  Rates
                </button>
                <button className="suggestion-chip suggestion-chip--primary" onClick={startBookingFlow}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  Book Call
                </button>
              </div>
            )}

            {/* Timezone Selector Bar & Dropdown Picker */}
            <div className="ai-chatbot-timezone-bar">
              <span className="timezone-label">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                Booking Zone:
              </span>
              <button 
                className="timezone-selector-toggle"
                onClick={() => setIsTimezonePickerOpen(!isTimezonePickerOpen)}
              >
                {bookingData.timezone}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '4px', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              </button>
            </div>

            {isTimezonePickerOpen && (
              <div className="ai-chatbot-timezone-picker">
                <input 
                  type="text" 
                  placeholder="Search timezone (e.g. London, Tokyo)..."
                  value={timezoneSearch}
                  onChange={e => setTimezoneSearch(e.target.value)}
                  className="timezone-search-input"
                  autoFocus
                />
                <div className="timezone-list">
                  {filteredTimezones.map(tz => (
                    <button 
                      key={tz} 
                      className={`timezone-item-btn ${bookingData.timezone === tz ? 'timezone-item-btn--active' : ''}`}
                      onClick={() => handleTimezoneSelect(tz)}
                    >
                      {tz}
                    </button>
                  ))}
                  {filteredTimezones.length === 0 && (
                    <div className="timezone-no-results">No matches found</div>
                  )}
                </div>
              </div>
            )}

            {/* Input Form Footer */}
            <div className="ai-chatbot-input-area">
              <input 
                type="text" 
                placeholder="Ask Aria anything..." 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <button 
                onClick={() => handleSend()} 
                disabled={isLoading || !inputValue.trim()}
                className="ai-chatbot-send-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
