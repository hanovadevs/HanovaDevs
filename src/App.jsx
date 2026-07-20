import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Projects from './pages/Projects'
import Products from './pages/Products'
import Contact from './pages/Contact'
import ServiceDetail from './pages/ServiceDetail'
import OmnaiDetail from './pages/OmnaiDetail'
import EunoiaDetail from './pages/EunoiaDetail'
import Journal from './pages/Journal'
import JournalPost from './pages/JournalPost'
import Research from './pages/Research'
import News from './pages/News'
import TechStack from './pages/TechStack'
import Calculator from './pages/Calculator'
import AdminDashboard from './pages/AdminDashboard'
import AIChatbot from './components/AIChatbot'

function App() {
  const location = useLocation()

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Wait for route transition to complete before observing
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale')
      elements.forEach(el => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [location])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/omnai" element={<OmnaiDetail />} />
          <Route path="/products/eunoia" element={<EunoiaDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/research" element={<Research />} />
          <Route path="/news" element={<News />} />
          <Route path="/stack" element={<TechStack />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/hanova-portal-2026" element={<AdminDashboard />} />
          {/* Blog → Journal redirects for SEO */}
          <Route path="/blog" element={<Navigate to="/journal" replace />} />
          <Route path="/blog/:slug" element={<BlogRedirect />} />
        </Routes>
      </main>
      <Footer />
      <AIChatbot />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

/* Redirect /blog/:slug → /journal/:slug */
function BlogRedirect() {
  const location = useLocation()
  const slug = location.pathname.replace('/blog/', '')
  return <Navigate to={`/journal/${slug}`} replace />
}

export default App
