import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'

const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Products = lazy(() => import('./pages/Products'))
const Contact = lazy(() => import('./pages/Contact'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const OmnaiDetail = lazy(() => import('./pages/OmnaiDetail'))
const EunoiaDetail = lazy(() => import('./pages/EunoiaDetail'))
const Journal = lazy(() => import('./pages/Journal'))
const JournalPost = lazy(() => import('./pages/JournalPost'))
const Research = lazy(() => import('./pages/Research'))
const News = lazy(() => import('./pages/News'))
const TechStack = lazy(() => import('./pages/TechStack'))
const Calculator = lazy(() => import('./pages/Calculator'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AIChatbot = lazy(() => import('./components/AIChatbot'))
const NotFound = lazy(() => import('./pages/NotFound'))

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

  const isAdminRoute = location.pathname.startsWith('/hanova-portal-2026') || location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <ErrorBoundary>
      <main>
        <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AIChatbot />}
      <Analytics />
      <SpeedInsights />
      </ErrorBoundary>
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
