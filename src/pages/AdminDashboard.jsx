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
            <span className="admin-login-logo">🔒</span>
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

      <header className="admin-hero">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
          <div className="admin-hero__content">
            <span className="admin-badge">Admin Control Desk</span>
            <h1>Operations & CMS <br /><span className="admin-gradient">Portal.</span></h1>
            <p>Full-featured management dashboard for client consultations, AI chatbot persona rules, portfolio projects CMS, and system telemetry.</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Log Out 🔓
          </button>
        </div>
      </header>

      <section className="admin-dashboard-section">
        <div className="container">
          {/* Key Metric Strip */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card card card-glass">
              <span className="admin-stat-icon">📅</span>
              <div className="admin-stat-info">
                <h3>{stats.totalBookings}</h3>
                <span>Total Leads ({stats.pendingBookings} Pending)</span>
              </div>
            </div>
            <div className="admin-stat-card card card-glass">
              <span className="admin-stat-icon">💬</span>
              <div className="admin-stat-info">
                <h3>{stats.totalChats}</h3>
                <span>Aria AI Chat Logs</span>
              </div>
            </div>
            <div className="admin-stat-card card card-glass">
              <span className="admin-stat-icon">📂</span>
              <div className="admin-stat-info">
                <h3>{stats.totalProjects}</h3>
                <span>Portfolio Projects</span>
              </div>
            </div>
            <div className="admin-stat-card card card-glass">
              <span className="admin-stat-icon">⚡</span>
              <div className="admin-stat-info">
                <h3>{stats.totalQAs}</h3>
                <span>Chatbot Q&A Rules</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation Controls */}
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
                💬 Chat Logs ({transcripts.length})
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
                📊 Telemetry & Health
              </button>
            </div>

            <div className="admin-search-wrap">
              {(activeTab === 'appointments' || activeTab === 'transcripts') && (
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`}
                  value={filterQuery} 
                  onChange={e => setFilterQuery(e.target.value)} 
                  className="admin-search-input"
                />
              )}
              {activeTab === 'appointments' && (
                <>
                  <button className="btn btn-outline btn-export" onClick={exportAppointmentsToCSV}>
                    📥 Export CSV
                  </button>
                  <button className="btn btn-outline btn-export" onClick={() => exportToJSON(appointments, 'hanovadevs_appointments')}>
                    📄 Export JSON
                  </button>
                </>
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
              {/* Bot Persona & Config Form */}
              <div className="card card-glass admin-bot-config-card">
                <h3>⚡ AI Bot Persona & Broadcast Announcements</h3>
                <form onSubmit={handleSaveBotConfigForm} className="admin-bot-config-form">
                  <div className="admin-form-group">
                    <label>Bot Conversational Persona Mode</label>
                    <select 
                      value={chatbotConfig.persona_mode || 'consultative'}
                      onChange={e => setChatbotConfig({ ...chatbotConfig, persona_mode: e.target.value })}
                    >
                      <option value="consultative">Consultative & Helpful (Default)</option>
                      <option value="sales">Sales-Focused & Direct</option>
                      <option value="technical">Strictly Technical & Precise</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Broadcast Announcement Banner / Promo Note</label>
                    <input 
                      type="text"
                      placeholder="e.g. 🔥 Special offer: 15% off AI bot builds for July!"
                      value={chatbotConfig.promo_banner || ''}
                      onChange={e => setChatbotConfig({ ...chatbotConfig, promo_banner: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Internal System Directives / Instructions</label>
                    <textarea 
                      rows={2}
                      placeholder="e.g. Always emphasize our 2-week turnaround time and high-scale TypeScript capabilities."
                      value={chatbotConfig.system_notes || ''}
                      onChange={e => setChatbotConfig({ ...chatbotConfig, system_notes: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-approve">
                    💾 Save AI Persona Settings
                  </button>
                </form>
              </div>

              {/* Custom Q&A Knowledge Base */}
              <div className="cms-header-row" style={{ marginTop: '2rem' }}>
                <div>
                  <h3>Custom Q&A Knowledge Base</h3>
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
              <h3>📊 Telemetry & Infrastructure Health</h3>
              <div className="telemetry-grid">
                <div className="telemetry-card card card-glass">
                  <h4>🗄️ Database Integration Status</h4>
                  <div className="telemetry-status-row">
                    <span>Supabase Cloud Client:</span>
                    <strong style={{ color: isSupabaseConfigured ? '#10b981' : '#f59e0b' }}>
                      {isSupabaseConfigured ? 'CONNECTED ✅' : 'LOCAL STORAGE FALLBACK ⚠️'}
                    </strong>
                  </div>
                  <p className="telemetry-note">
                    {isSupabaseConfigured 
                      ? 'Connected to project schema. Appointments and transcripts sync in real-time.' 
                      : 'Running in offline mode. Data is stored locally in browser storage until Supabase keys are provided.'}
                  </p>
                </div>

                <div className="telemetry-card card card-glass">
                  <h4>📬 Email Gateway (Nodemailer SMTP)</h4>
                  <div className="telemetry-status-row">
                    <span>Sender Account:</span>
                    <strong>hanovadevs@gmail.com</strong>
                  </div>
                  <div className="telemetry-status-row">
                    <span>SMTP Host & Port:</span>
                    <strong>smtp.gmail.com:465 (SSL)</strong>
                  </div>
                  <p className="telemetry-note">Automatic Google Meet room invitations and initial booking requests are active.</p>
                </div>

                <div className="telemetry-card card card-glass">
                  <h4>🤖 Claude AI Intelligence Model</h4>
                  <div className="telemetry-status-row">
                    <span>Target Model:</span>
                    <strong>claude-sonnet-5</strong>
                  </div>
                  <div className="telemetry-status-row">
                    <span>Tool Calling Engine:</span>
                    <strong style={{ color: '#10b981' }}>check_availability & book_appointment</strong>
                  </div>
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
