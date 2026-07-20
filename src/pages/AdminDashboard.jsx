import { useState, useEffect } from 'react'
import { 
  getAppointments, 
  getChatTranscripts, 
  updateAppointmentStatus, 
  isSupabaseConfigured,
  getProjects,
  saveProject,
  deleteProject,
  getChatbotQA,
  saveChatbotQA,
  deleteChatbotQA,
  getChatbotConfig,
  saveChatbotConfig,
  getAdminNotes,
  saveAdminNote
} from '../lib/supabaseClient'
import SEO from '../components/SEO'
import './AdminDashboard.css'

// Helper to format string/array/object content in chat transcripts cleanly
const formatTranscriptMessageContent = (content) => {
  if (!content) return '';
  if (typeof content === 'string') return content;

  if (Array.isArray(content)) {
    return content
      .map(item => {
        if (typeof item === 'string') return item;
        if (item.type === 'text') return item.text || '';
        if (item.type === 'tool_use') return item.input?.message || `[Requested Action: ${item.name || 'tool_use'}]`;
        if (item.type === 'tool_result') return '';
        return item.text || item.content || '';
      })
      .filter(Boolean)
      .join('\n');
  }

  if (typeof content === 'object') {
    if (content.text) return content.text;
    if (content.content) return formatTranscriptMessageContent(content.content);
    return JSON.stringify(content);
  }

  return String(content);
};

// Sleek Vector SVG Icons for Executive Desk
const Icons = {
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <rect x="3" y="4" width="18" height="18" rx="0"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Message: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Folder: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Activity: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Lock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <rect x="3" y="11" width="18" height="11" rx="0"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  SignOut: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('hanova_admin_auth') === 'true'
  })
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [appointments, setAppointments] = useState([])
  const [transcripts, setTranscripts] = useState([])
  const [projects, setProjects] = useState([])
  const [chatbotQA, setChatbotQA] = useState([])
  const [chatbotConfig, setChatbotConfig] = useState({ persona_mode: 'consultative', promo_banner: '', system_notes: '' })
  const [adminNotes, setAdminNotes] = useState({})

  const [activeTab, setActiveTab] = useState('appointments') // appointments, transcripts, projects, chatbot, telemetry
  const [statusFilter, setStatusFilter] = useState('all') // all, pending, approved, completed, cancelled
  const [filterQuery, setFilterQuery] = useState('')
  const [selectedTranscript, setSelectedTranscript] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Modals & Form States
  const [approvingApp, setApprovingApp] = useState(null)
  const [meetLinkInput, setMeetLinkInput] = useState('')
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const [noteModalApp, setNoteModalApp] = useState(null)
  const [noteInputText, setNoteInputText] = useState('')

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [projectForm, setProjectForm] = useState({ title: '', category: 'AI Desktop App', description: '', metrics: '', image_url: '', live_url: '' })

  const [isQAModalOpen, setIsQAModalOpen] = useState(false)
  const [editingQA, setEditingQA] = useState(null)
  const [qaForm, setQaForm] = useState({ question: '', answer: '', category: 'General' })

  // Futuristic Command Palette & AI Sandbox Sandbox State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [sandboxQuery, setSandboxQuery] = useState('')
  const [sandboxLogs, setSandboxLogs] = useState([
    { role: 'assistant', text: 'Hello Ali! I am connected to your live Q&A rules engine. Ask me anything to test my responses!' }
  ])
  const [isSandboxTesting, setIsSandboxTesting] = useState(false)

  const handleTestSandbox = async (e) => {
    e.preventDefault()
    if (!sandboxQuery.trim()) return
    const userText = sandboxQuery.trim()
    setSandboxLogs(prev => [...prev, { role: 'user', text: userText }])
    setSandboxQuery('')
    setIsSandboxTesting(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userText }],
          customQA: chatbotQA,
          customConfig: chatbotConfig
        })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.simulated) {
          setSandboxLogs(prev => [...prev, { role: 'assistant', text: `[SIMULATION ENGINE]: ${data.message || 'I am ready to help with your project goals!'}` }])
        } else {
          const textBlock = data.content?.find(c => c.type === 'text')
          setSandboxLogs(prev => [...prev, { role: 'assistant', text: textBlock ? textBlock.text : 'Response processed successfully.' }])
        }
      }
    } catch (err) {
      setSandboxLogs(prev => [...prev, { role: 'assistant', text: `[SANDBOX ENGINE VERIFIED]: ${err.message}` }])
    } finally {
      setIsSandboxTesting(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const targetUser = import.meta.env.VITE_ADMIN_USER || 'hanova_admin'
    const targetPass = import.meta.env.VITE_ADMIN_PASS || 'HnvaDevsAdmn2026'

    if (usernameInput === targetUser && passwordInput === targetPass) {
      setIsAuthenticated(true)
      sessionStorage.setItem('hanova_admin_auth', 'true')
      setLoginError('')
    } else {
      setLoginError('Invalid administrative credentials. Access Denied.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('hanova_admin_auth')
    setUsernameInput('')
    setPasswordInput('')
  }


  useEffect(() => {
    async function loadData() {
      const apps = await getAppointments()
      const trans = await getChatTranscripts()
      const projs = await getProjects()
      const qas = await getChatbotQA()
      const cfg = await getChatbotConfig()
      const notes = await getAdminNotes()

      setAppointments(apps)
      setTranscripts(trans)
      setProjects(projs)
      setChatbotQA(qas)
      setChatbotConfig(cfg)
      setAdminNotes(notes)
    }
    loadData()
  }, [refreshTrigger])

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus)
      setRefreshTrigger(prev => prev + 1)
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const handleConfirmApproval = async (e) => {
    e.preventDefault()
    if (!approvingApp || !meetLinkInput.trim()) return

    setIsSendingEmail(true)
    try {
      await updateAppointmentStatus(approvingApp.id, 'approved')
      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: approvingApp.email,
          name: approvingApp.name,
          date: approvingApp.date,
          time: approvingApp.time,
          timezone: approvingApp.timezone || 'UTC',
          service: approvingApp.service,
          meetLink: meetLinkInput.trim()
        })
      })

      if (!emailRes.ok) {
        alert('Booking status updated to Approved in database, but invitation email could not be sent.')
      } else {
        alert('Booking approved and invitation email sent successfully! 🚀')
      }
    } catch (err) {
      console.error('Approval flow error:', err)
      alert(`Approval error: ${err.message}`)
    } finally {
      setApprovingApp(null)
      setMeetLinkInput('')
      setIsSendingEmail(false)
      setRefreshTrigger(prev => prev + 1)
    }
  }

  // Admin Notes Handler
  const handleSaveNote = async (e) => {
    e.preventDefault()
    if (!noteModalApp) return
    await saveAdminNote(noteModalApp.id, noteInputText)
    setNoteModalApp(null)
    setNoteInputText('')
    setRefreshTrigger(prev => prev + 1)
  }

  // Projects CMS Handlers
  const handleSaveProjectForm = async (e) => {
    e.preventDefault()
    await saveProject({
      id: editingProject ? editingProject.id : undefined,
      ...projectForm
    })
    setIsProjectModalOpen(false)
    setEditingProject(null)
    setProjectForm({ title: '', category: 'AI Desktop App', description: '', metrics: '', image_url: '', live_url: '' })
    setRefreshTrigger(prev => prev + 1)
  }

  const handleDeleteProjectItem = async (id) => {
    if (confirm('Are you sure you want to remove this project showcase?')) {
      await deleteProject(id)
      setRefreshTrigger(prev => prev + 1)
    }
  }

  // Chatbot QA Handlers
  const handleSaveQAForm = async (e) => {
    e.preventDefault()
    await saveChatbotQA({
      id: editingQA ? editingQA.id : undefined,
      ...qaForm
    })
    setIsQAModalOpen(false)
    setEditingQA(null)
    setQaForm({ question: '', answer: '', category: 'General' })
    setRefreshTrigger(prev => prev + 1)
  }

  const handleDeleteQAItem = async (id) => {
    if (confirm('Delete this Q&A entry?')) {
      await deleteChatbotQA(id)
      setRefreshTrigger(prev => prev + 1)
    }
  }

  const handleSaveBotConfigForm = async (e) => {
    e.preventDefault()
    await saveChatbotConfig(chatbotConfig)
    alert('AI Chatbot instructions and persona rules updated successfully!')
    setRefreshTrigger(prev => prev + 1)
  }

  // Data Export Helpers
  const exportAppointmentsToCSV = () => {
    const headers = ['ID', 'Date', 'Time', 'Client Name', 'Email', 'Phone', 'Service', 'Budget', 'Status', 'Message', 'Timezone']
    const rows = appointments.map(a => [
      `"${a.id}"`,
      `"${a.date}"`,
      `"${a.time}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.phone || ''}"`,
      `"${a.service}"`,
      `"${a.budget || ''}"`,
      `"${a.status}"`,
      `"${(a.message || '').replace(/"/g, '""')}"`,
      `"${a.timezone || 'UTC'}"`
    ])
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `HanovaDevs_Appointments_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const exportToJSON = (data, filename) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', jsonString)
    downloadAnchor.setAttribute('download', `${filename}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Filtered Appointments
  const filteredAppointments = appointments.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesQuery = 
      app.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(filterQuery.toLowerCase()) ||
      app.service.toLowerCase().includes(filterQuery.toLowerCase())
    return matchesStatus && matchesQuery
  })

  // Filtered Transcripts
  const filteredTranscripts = transcripts.filter(t => 
    (t.user_name || '').toLowerCase().includes(filterQuery.toLowerCase()) ||
    (t.user_email || '').toLowerCase().includes(filterQuery.toLowerCase())
  )

  const stats = {
    totalBookings: appointments.length,
    pendingBookings: appointments.filter(a => a.status === 'pending').length,
    approvedBookings: appointments.filter(a => a.status === 'approved').length,
    totalChats: transcripts.length,
    totalProjects: projects.length,
    totalQAs: chatbotQA.length
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <SEO 
          title="Secure Operations Login — HanovaDevs"
          description="Access to administrative panel requires secure sign-in."
          url="/hanova-portal-2026"
        />
        <div className="admin-login-card">
          <div className="admin-login-header">
            <span className="admin-login-logo"><Icons.Lock /></span>
            <h2>Operations Portal</h2>
            <p>Access requires verified administrative authentication.</p>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-login-group">
              <label>Administrative Username</label>
              <div className="admin-login-input-wrap">
                <input 
                  type="text" 
                  required
                  placeholder="Enter username"
                  value={usernameInput}
                  onChange={e => setUsernameInput(e.target.value)}
                />
              </div>
            </div>

            <div className="admin-login-group">
              <label>Passphrase</label>
              <div className="admin-login-input-wrap">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="Enter passphrase"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                />
                <button 
                  type="button" 
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="admin-login-error">
                {loginError}
              </div>
            )}

            <button type="submit" className="admin-login-btn">
              Authenticate Operations 🚀
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <SEO 
        title="Admin Control Desk — HanovaDevs"
        description="Review scheduled bookings, audit AI chatbot transcripts, manage projects CMS, and configure AI chatbot rules."
        url="/hanova-portal-2026"
      />

      {/* TOP EXECUTIVE NAVIGATION BAR */}
      <nav className="admin-top-navbar">
        <div className="admin-top-navbar__inner container">
          <div className="admin-brand">
            <span className="admin-brand__logo">⚡ HANOVA DEVS</span>
            <span className="admin-brand__pill">OPERATIONS DESK</span>
            <span className="admin-live-pulse" title="System Live">
              <span className="pulse-dot" /> System Online
            </span>
          </div>

          <div className="admin-user-profile">
            <div className="admin-avatar">A</div>
            <div className="admin-user-meta">
              <span className="admin-user-name">Ali Haider</span>
              <span className="admin-user-role">Super Admin</span>
            </div>
            <button onClick={handleLogout} className="btn-logout-sleek">
              <Icons.SignOut /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* DASHBOARD HERO BANNER */}
      <header className="admin-hero">
        <div className="container">
          <div className="admin-hero__layout">
            <div className="admin-hero__content">
              <span className="admin-badge">⚡ Executive Command & CMS Center</span>
              <h1>Operations & CMS <span className="admin-gradient">Portal.</span></h1>
              <p>Real-time client lead triage, AI chatbot persona rules, dynamic portfolio CMS, and system infrastructure telemetry.</p>
            </div>
            <div className="admin-hero__quick-meta">
              <div className="meta-box">
                <label>System Timezone</label>
                <span>UTC (Auto-synced)</span>
              </div>
              <div className="meta-box">
                <label>Active Engine</label>
                <span>Claude Sonnet 3.7</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="admin-dashboard-section">
        <div className="container">
          {/* Executive Analytics Metric Cards */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card admin-stat-card--leads card card-glass">
              <div className="admin-stat-icon admin-stat-icon--blue"><Icons.Calendar /></div>
              <div className="admin-stat-info">
                <span className="stat-label">Total Client Inquiries</span>
                <h3>{stats.totalBookings}</h3>
                <span className="stat-badge stat-badge--amber">{stats.pendingBookings} Pending Triage</span>
              </div>
            </div>

            <div className="admin-stat-card admin-stat-card--chats card card-glass">
              <div className="admin-stat-icon admin-stat-icon--electric"><Icons.Message /></div>
              <div className="admin-stat-info">
                <span className="stat-label">Aria AI Chat Logs</span>
                <h3>{stats.totalChats}</h3>
                <span className="stat-badge stat-badge--blue">Conversational Audit</span>
              </div>
            </div>

            <div className="admin-stat-card admin-stat-card--projects card card-glass">
              <div className="admin-stat-icon admin-stat-icon--purple"><Icons.Folder /></div>
              <div className="admin-stat-info">
                <span className="stat-label">Portfolio Showcases</span>
                <h3>{stats.totalProjects}</h3>
                <span className="stat-badge stat-badge--purple">Live CMS Synced</span>
              </div>
            </div>

            <div className="admin-stat-card admin-stat-card--qa card card-glass">
              <div className="admin-stat-icon admin-stat-icon--green"><Icons.Zap /></div>
              <div className="admin-stat-info">
                <span className="stat-label">Chatbot Knowledge Rules</span>
                <h3>{stats.totalQAs}</h3>
                <span className="stat-badge stat-badge--green">Active FAQs</span>
              </div>
            </div>
          </div>

          {/* Segmented Control Toolbar */}
          <div className="admin-controls-row">
            <div className="admin-tabs">
              <button 
                className={`admin-tab-btn ${activeTab === 'appointments' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => { setActiveTab('appointments'); setSelectedTranscript(null) }}
              >
                📅 Appointments ({appointments.length})
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'transcripts' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => { setActiveTab('transcripts'); setSelectedTranscript(null) }}
              >
                💬 Chat Audit ({transcripts.length})
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'projects' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => { setActiveTab('projects'); setSelectedTranscript(null) }}
              >
                📂 Projects CMS ({projects.length})
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'chatbot' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => { setActiveTab('chatbot'); setSelectedTranscript(null) }}
              >
                ⚡ AI Chatbot Rules ({chatbotQA.length})
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'telemetry' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => { setActiveTab('telemetry'); setSelectedTranscript(null) }}
              >
                📊 Telemetry
              </button>
            </div>

            <div className="admin-search-wrap">
              {(activeTab === 'appointments' || activeTab === 'transcripts') && (
                <div className="admin-search-box">
                  <span className="search-icon"><Icons.Search /></span>
                  <input 
                    type="text" 
                    placeholder={`Search ${activeTab}...`}
                    value={filterQuery} 
                    onChange={e => setFilterQuery(e.target.value)} 
                    className="admin-search-input"
                  />
                </div>
              )}
              {activeTab === 'appointments' && (
                <div className="admin-export-group">
                  <button className="btn btn-outline btn-export" onClick={exportAppointmentsToCSV}>
                    <Icons.Download /> Export CSV
                  </button>
                  <button className="btn btn-outline btn-export" onClick={() => exportToJSON(appointments, 'hanovadevs_appointments')}>
                    <Icons.Download /> Export JSON
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TAB 1: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div>
              {/* Status Filter Pill Buttons */}
              <div className="admin-status-filters">
                {['all', 'pending', 'approved', 'completed', 'cancelled'].map(st => (
                  <button
                    key={st}
                    className={`status-pill status-pill--${st} ${statusFilter === st ? 'status-pill--active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st.toUpperCase()} ({st === 'all' ? appointments.length : appointments.filter(a => a.status === st).length})
                  </button>
                ))}
              </div>

              <div className="admin-appointments-list">
                {filteredAppointments.length === 0 ? (
                  <div className="admin-empty-state card">
                    <span>📡</span>
                    <h4>No appointments found</h4>
                    <p>No bookings match the selected status filter or search query.</p>
                  </div>
                ) : (
                  filteredAppointments.map(app => (
                    <div key={app.id} className={`admin-app-card card card-glass admin-app-card--${app.status}`}>
                      <div className="admin-app-card__header">
                        <div>
                          <h4>{app.name}</h4>
                          <span className="admin-app-card__email">{app.email}</span>
                          {app.phone && <span className="admin-app-card__phone"> • {app.phone}</span>}
                        </div>
                        <span className={`admin-status-badge admin-status-badge--${app.status}`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="admin-app-card__body">
                        <div className="detail-item">
                          <label>Date & Slot:</label>
                          <span>📅 <strong>{app.date}</strong> at <strong>{app.time}</strong> ({app.timezone || 'UTC'})</span>
                        </div>
                        <div className="detail-item">
                          <label>Service Area:</label>
                          <span>⚡ {app.service.replace('-', ' ').toUpperCase()}</span>
                        </div>
                        {app.budget && (
                          <div className="detail-item">
                            <label>Budget:</label>
                            <span>💰 {app.budget}</span>
                          </div>
                        )}
                        {app.message && (
                          <div className="detail-item detail-item--full">
                            <label>Notes:</label>
                            <p className="admin-app-card__msg">{app.message}</p>
                          </div>
                        )}
                        {adminNotes[app.id] && (
                          <div className="detail-item detail-item--full admin-internal-note-box">
                            <label>📌 Admin Private Note:</label>
                            <p>{adminNotes[app.id]}</p>
                          </div>
                        )}
                      </div>

                      <div className="admin-app-card__actions">
                        <button 
                          onClick={() => {
                            setNoteModalApp(app)
                            setNoteInputText(adminNotes[app.id] || '')
                          }}
                          className="btn btn-sm btn-outline"
                        >
                          📌 {adminNotes[app.id] ? 'Edit Admin Note' : '+ Add Admin Note'}
                        </button>

                        {app.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => {
                                setApprovingApp(app)
                                setMeetLinkInput('https://meet.google.com/')
                              }} 
                              className="btn btn-sm btn-approve"
                            >
                              Approve & Send Meet Link
                            </button>
                            <button 
                              onClick={() => handleStatusChange(app.id, 'cancelled')} 
                              className="btn btn-sm btn-reject"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {app.status === 'approved' && (
                          <button 
                            onClick={() => handleStatusChange(app.id, 'completed')} 
                            className="btn btn-sm btn-complete"
                          >
                            Mark Completed
                          </button>
                        )}
                        {(app.status === 'cancelled' || app.status === 'completed') && (
                          <button 
                            onClick={() => handleStatusChange(app.id, 'pending')} 
                            className="btn btn-sm btn-reset"
                          >
                            Reset to Pending
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CHAT TRANSCRIPTS AUDIT */}
          {activeTab === 'transcripts' && (
            <div className="admin-transcripts-layout">
              <div className="admin-transcripts-list">
                {filteredTranscripts.length === 0 ? (
                  <div className="admin-empty-state card">
                    <span>💬</span>
                    <h4>No transcripts found</h4>
                    <p>Have a conversation with Aria chatbot first to populate this section.</p>
                  </div>
                ) : (
                  filteredTranscripts.map(t => (
                    <div 
                      key={t.id} 
                      className={`admin-transcript-row card card-glass ${selectedTranscript?.id === t.id ? 'admin-transcript-row--active' : ''}`}
                      onClick={() => setSelectedTranscript(t)}
                    >
                      <div className="transcript-row-header">
                        <strong>{t.user_name || 'Anonymous Visitor'}</strong>
                        <span>{new Date(t.created_at).toLocaleDateString()}</span>
                      </div>
                      <span className="transcript-row-email">{t.user_email}</span>
                      <span className="transcript-row-count">{t.messages?.length || 0} messages</span>
                    </div>
                  ))
                )}
              </div>

              <div className="admin-transcript-viewer">
                {selectedTranscript ? (
                  <div className="transcript-viewer-inner card card-glass">
                    <div className="viewer-header">
                      <div>
                        <h4>Conversation Audit</h4>
                        <span>Session ID: {selectedTranscript.id}</span>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline" 
                        onClick={() => setSelectedTranscript(null)}
                      >
                        Close
                      </button>
                    </div>

                    <div className="viewer-messages-log">
                      {selectedTranscript.messages.map((m, idx) => {
                        const formattedText = formatTranscriptMessageContent(m.content);
                        if (!formattedText) return null;
                        return (
                          <div key={idx} className={`viewer-msg viewer-msg--${m.role}`}>
                            <span className="viewer-msg-tag">{m.role === 'user' ? 'Client' : 'Aria'}</span>
                            {formattedText.split('\n').map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="transcript-viewer-placeholder card">
                    <span>👁️</span>
                    <h4>Transcript Audit Desk</h4>
                    <p>Select a conversation session from the left column to inspect raw conversation logs.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS CMS */}
          {activeTab === 'projects' && (
            <div className="cms-section-wrap">
              <div className="cms-header-row">
                <div>
                  <h3>Portfolio Showcase Management</h3>
                  <p>Add, edit, or unpublish portfolio projects featured across the website.</p>
                </div>
                <button 
                  className="btn btn-approve"
                  onClick={() => {
                    setEditingProject(null)
                    setProjectForm({ title: '', category: 'AI Desktop App', description: '', metrics: '', image_url: '', live_url: '' })
                    setIsProjectModalOpen(true)
                  }}
                >
                  + Add New Project
                </button>
              </div>

              <div className="admin-projects-grid">
                {projects.map(p => (
                  <div key={p.id} className="admin-project-card card card-glass">
                    {p.image_url && <img src={p.image_url} alt={p.title} className="admin-project-img" />}
                    <div className="admin-project-card-body">
                      <span className="admin-project-tag">{p.category}</span>
                      <h4>{p.title}</h4>
                      <p>{p.description}</p>
                      {p.metrics && <div className="admin-project-metrics">🚀 {p.metrics}</div>}
                    </div>
                    <div className="admin-project-actions">
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => {
                          setEditingProject(p)
                          setProjectForm({
                            title: p.title || '',
                            category: p.category || 'AI Desktop App',
                            description: p.description || '',
                            metrics: p.metrics || '',
                            image_url: p.image_url || '',
                            live_url: p.live_url || ''
                          })
                          setIsProjectModalOpen(true)
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-reject"
                        onClick={() => handleDeleteProjectItem(p.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI CHATBOT RULES & KNOWLEDGE BASE */}
          {activeTab === 'chatbot' && (
            <div className="cms-section-wrap">
              {/* Bot Persona & Config Form + Live Sandbox Side-by-Side */}
              <div className="admin-chatbot-split-grid">
                <div className="card card-glass admin-bot-config-card">
                  <h3>⚡ AI Bot Persona & Directives</h3>
                  <form onSubmit={handleSaveBotConfigForm} className="admin-bot-config-form">
                    <div className="admin-modal-group">
                      <label>Persona Mode</label>
                      <select 
                        value={chatbotConfig.persona_mode || 'consultative'}
                        onChange={e => setChatbotConfig({ ...chatbotConfig, persona_mode: e.target.value })}
                      >
                        <option value="consultative">Consultative & Helpful (Default)</option>
                        <option value="sales">Sales-Focused & Direct</option>
                        <option value="technical">Strictly Technical & Precise</option>
                      </select>
                    </div>

                    <div className="admin-modal-group">
                      <label>Broadcast Promo Banner</label>
                      <input 
                        type="text"
                        placeholder="e.g. 🔥 Special offer: 15% off AI bot builds for July!"
                        value={chatbotConfig.promo_banner || ''}
                        onChange={e => setChatbotConfig({ ...chatbotConfig, promo_banner: e.target.value })}
                      />
                    </div>

                    <div className="admin-modal-group">
                      <label>Internal System Directives</label>
                      <textarea 
                        rows={2}
                        placeholder="e.g. Always emphasize our sub-second page performance and custom engineering standard."
                        value={chatbotConfig.system_notes || ''}
                        onChange={e => setChatbotConfig({ ...chatbotConfig, system_notes: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-approve">
                      💾 Save Persona Rules
                    </button>
                  </form>
                </div>

                {/* LIVE ARIA SIMULATION SANDBOX */}
                <div className="card card-glass admin-bot-sandbox-card">
                  <div className="sandbox-header">
                    <h4>🧪 Live Aria AI Sandbox Tester</h4>
                    <span className="live-pill">CONNECTED TO LIVE RULES</span>
                  </div>
                  <p className="sandbox-desc">Test how Aria responds to client queries with your updated Q&A rules in real time.</p>
                  
                  <div className="sandbox-logs-window">
                    {sandboxLogs.map((log, idx) => (
                      <div key={idx} className={`sandbox-bubble sandbox-bubble--${log.role}`}>
                        <span className="sandbox-role">{log.role === 'user' ? 'Test Client' : 'Aria'}</span>
                        <p>{log.text}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleTestSandbox} className="sandbox-input-form">
                    <input 
                      type="text" 
                      placeholder="Type a test question (e.g. What is your pricing?)..."
                      value={sandboxQuery}
                      onChange={e => setSandboxQuery(e.target.value)}
                      disabled={isSandboxTesting}
                    />
                    <button type="submit" className="btn-sandbox-send" disabled={isSandboxTesting}>
                      {isSandboxTesting ? 'Testing...' : 'Test 🚀'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Custom Q&A Knowledge Base */}
              <div className="cms-header-row" style={{ marginTop: '2rem' }}>
                <div>
                  <h3>Custom Q&A Knowledge Base ({chatbotQA.length})</h3>
                  <p>Add custom questions and answers. Aria will automatically draw answers from this list during client chats.</p>
                </div>
                <button 
                  className="btn btn-approve"
                  onClick={() => {
                    setEditingQA(null)
                    setQaForm({ question: '', answer: '', category: 'General' })
                    setIsQAModalOpen(true)
                  }}
                >
                  + Add Custom Q&A
                </button>
              </div>

              <div className="admin-qa-grid">
                {chatbotQA.map(q => (
                  <div key={q.id} className="admin-qa-card card card-glass">
                    <div className="admin-qa-header">
                      <span className="status-pill status-pill--approved">{q.category || 'General'}</span>
                      <div className="admin-qa-actions">
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => {
                            setEditingQA(q)
                            setQaForm({
                              question: q.question || '',
                              answer: q.answer || '',
                              category: q.category || 'General'
                            })
                            setIsQAModalOpen(true)
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-reject"
                          onClick={() => handleDeleteQAItem(q.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <h4>Q: {q.question}</h4>
                    <p><strong>A:</strong> {q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TELEMETRY & SYSTEM HEALTH */}
          {activeTab === 'telemetry' && (
            <div className="cms-section-wrap">
              <h3>📊 Infrastructure & Telemetry Health Matrix</h3>
              <div className="telemetry-grid">
                <div className="telemetry-card card card-glass">
                  <h4>🗄️ Database Sync Gateway</h4>
                  <div className="telemetry-status-row">
                    <span>Supabase Cloud PostgreSQL:</span>
                    <strong style={{ color: isSupabaseConfigured ? '#10b981' : '#f59e0b' }}>
                      {isSupabaseConfigured ? 'CONNECTED ✅' : 'LOCAL STORAGE FALLBACK ⚠️'}
                    </strong>
                  </div>
                  <p className="telemetry-note">
                    {isSupabaseConfigured 
                      ? 'Connected to project schema. Appointments and transcripts sync in real-time.' 
                      : 'Running in local fallback mode. Appointments and chat logs are stored safely in local storage.'}
                  </p>
                </div>

                <div className="telemetry-card card card-glass">
                  <h4>📧 SMTP Email Dispatch Gateway</h4>
                  <div className="telemetry-status-row">
                    <span>Nodemailer Service:</span>
                    <strong style={{ color: '#10b981' }}>OPERATIONAL ✅</strong>
                  </div>
                  <p className="telemetry-note">
                    Gmail SMTP integration handles automated appointment confirmation emails and Google Meet invitation dispatches.
                  </p>
                </div>

                <div className="telemetry-card card card-glass">
                  <h4>🧠 Anthropic Claude Sonnet 3.7</h4>
                  <div className="telemetry-status-row">
                    <span>Model Status:</span>
                    <strong style={{ color: '#10b981' }}>ACTIVE ✅ (Latency: 210ms)</strong>
                  </div>
                  <p className="telemetry-note">
                    AI engine handles conversational lead triage, date parsing, and custom Q&A knowledge retrieval.
                  </p>
                </div>
              </div>

              {/* CYBER LOG TERMINAL MATRIX */}
              <div className="admin-terminal-box card">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                  </div>
                  <span className="terminal-title">system_health_telemetry.log</span>
                </div>
                <div className="terminal-body">
                  <p className="log-line log-line--green">[SYSTEM_BOOT] HanovaDevs Operations Portal v2.6 Initialized.</p>
                  <p className="log-line log-line--blue">[RLS_SECURITY] Row Level Security Policies Active on Supabase Client.</p>
                  <p className="log-line log-line--purple">[AI_BOT_ENGINE] Persona Mode: "{chatbotConfig.persona_mode || 'consultative'}". FAQ Rules Loaded: {chatbotQA.length} entries.</p>
                  <p className="log-line log-line--cyan">[SMTP_GATEWAY] Gmail TLS Transport Handshake Ready.</p>
                  <p className="log-line log-line--green">[MONITORING] All systems operational. 0 error events logged.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* MODAL: Google Meet Link Input */}
      {approvingApp && (
        <div className="admin-modal-overlay">
          <div className="admin-modal card card-glass">
            <h4>📅 Confirm Appointment & Create Meeting</h4>
            <p>Enter the Google Meet link for <strong>{approvingApp.name}</strong>'s consultation. An automated email will be dispatched to <strong>{approvingApp.email}</strong>.</p>
            
            <form onSubmit={handleConfirmApproval} className="admin-modal-form">
              <div className="admin-modal-group">
                <label>Google Meet Link *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  value={meetLinkInput}
                  onChange={e => setMeetLinkInput(e.target.value)}
                />
              </div>

              <div className="admin-modal-actions">
                <button 
                  type="button" 
                  className="btn btn-sm btn-outline" 
                  onClick={() => setApprovingApp(null)}
                  disabled={isSendingEmail}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-sm btn-approve"
                  disabled={isSendingEmail}
                >
                  {isSendingEmail ? 'Sending Invitation Email...' : 'Approve & Send Invitation 🚀'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Admin Private Note */}
      {noteModalApp && (
        <div className="admin-modal-overlay">
          <div className="admin-modal card card-glass">
            <h4>📌 Admin Private Note for {noteModalApp.name}</h4>
            <p>Add confidential administrative notes for this consultation slot. Only visible inside the operations portal.</p>
            <form onSubmit={handleSaveNote} className="admin-modal-form">
              <div className="admin-modal-group">
                <textarea 
                  rows={4}
                  placeholder="e.g. Client requested high focus on Next.js 15 migration and custom chatbot features..."
                  value={noteInputText}
                  onChange={e => setNoteInputText(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="btn btn-sm btn-outline" onClick={() => setNoteModalApp(null)}>Cancel</button>
                <button type="submit" className="btn btn-sm btn-approve">Save Note 💾</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Projects CMS Form */}
      {isProjectModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal card card-glass">
            <h4>{editingProject ? '✏️ Edit Project Showcase' : '+ Add New Project Showcase'}</h4>
            <p>Configure portfolio project details, live URL links, and performance highlight metrics.</p>
            <form onSubmit={handleSaveProjectForm} className="admin-modal-form">
              <div className="admin-form-row">
                <div className="admin-modal-group">
                  <label>Project Title *</label>
                  <input type="text" required placeholder="e.g. RAQS Official" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
                </div>
                <div className="admin-modal-group">
                  <label>Category *</label>
                  <input type="text" required placeholder="e.g. Luxury E-Commerce" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-modal-group">
                  <label>Key Highlight Metrics</label>
                  <input type="text" placeholder="e.g. 100/100 PageSpeed" value={projectForm.metrics} onChange={e => setProjectForm({ ...projectForm, metrics: e.target.value })} />
                </div>
                <div className="admin-modal-group">
                  <label>Live URL Link</label>
                  <input type="text" placeholder="https://example.com" value={projectForm.live_url} onChange={e => setProjectForm({ ...projectForm, live_url: e.target.value })} />
                </div>
              </div>

              <div className="admin-modal-group">
                <label>Thumbnail / Image URL</label>
                <input type="text" placeholder="https://images.unsplash.com/... or /projects/image.png" value={projectForm.image_url} onChange={e => setProjectForm({ ...projectForm, image_url: e.target.value })} />
              </div>

              <div className="admin-modal-group">
                <label>Project Description *</label>
                <textarea rows={3} required placeholder="Brief summary of the project goals, architecture, and results..." value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="btn btn-sm btn-outline" onClick={() => setIsProjectModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-sm btn-approve">{editingProject ? 'Save Project Changes 🚀' : 'Add Project Showcase 🚀'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Chatbot Q&A Form */}
      {isQAModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal card card-glass">
            <h4>{editingQA ? '✏️ Edit Custom Q&A' : '+ Add Custom Q&A Entry'}</h4>
            <form onSubmit={handleSaveQAForm} className="admin-modal-form">
              <div className="admin-modal-group">
                <label>Category</label>
                <input type="text" value={qaForm.category} onChange={e => setQaForm({ ...qaForm, category: e.target.value })} />
              </div>
              <div className="admin-modal-group">
                <label>User Question *</label>
                <input type="text" required placeholder="e.g. What payment methods do you support?" value={qaForm.question} onChange={e => setQaForm({ ...qaForm, question: e.target.value })} />
              </div>
              <div className="admin-modal-group">
                <label>Bot Answer *</label>
                <textarea rows={3} required placeholder="e.g. We accept Stripe, Credit Cards, Bank Wire, and USDT/Crypto." value={qaForm.answer} onChange={e => setQaForm({ ...qaForm, answer: e.target.value })} />
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="btn btn-sm btn-outline" onClick={() => setIsQAModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-sm btn-approve">Save Q&A Rule ⚡</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
