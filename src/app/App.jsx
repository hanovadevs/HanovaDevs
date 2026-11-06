import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import SiteAnalytics from '../components/shared/SiteAnalytics'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'
import ErrorBoundary from '../components/shared/ErrorBoundary'

const Home = lazy(() => import('../pages/home/Home'))
const Services = lazy(() => import('../pages/services/Services'))
const About = lazy(() => import('../pages/company/About'))
const StudentBuilderProgram = lazy(() => import('../pages/program/StudentBuilderProgram'))
const HiraProfile = lazy(() => import('../pages/company/HiraProfile'))
const TeamProfile = lazy(() => import('../pages/company/TeamProfile'))
const Projects = lazy(() => import('../pages/projects/Projects'))
const CaseStudy = lazy(() => import('../pages/projects/CaseStudy'))
const ProjectWorkflow = lazy(() => import('../pages/projects/ProjectWorkflow'))
const Reviews = lazy(() => import('../pages/reviews/Reviews'))
const Products = lazy(() => import('../pages/products/Products'))
const Contact = lazy(() => import('../pages/contact/Contact'))
const ServiceDetail = lazy(() => import('../pages/services/ServiceDetail'))
const OmnaiDetail = lazy(() => import('../pages/products/OmnaiDetail'))
const EunoiaDetail = lazy(() => import('../pages/products/EunoiaDetail'))
const StepsyDetail = lazy(() => import('../pages/products/StepsyDetail'))
const EunoiaPrivacyPolicy = lazy(() => import('../pages/legal/EunoiaPrivacyPolicy'))
const Journal = lazy(() => import('../pages/insights/Journal'))
const JournalPost = lazy(() => import('../pages/insights/JournalPost'))
const Research = lazy(() => import('../pages/insights/Research'))
const News = lazy(() => import('../pages/insights/News'))
const TechStack = lazy(() => import('../pages/company/TechStack'))
const Calculator = lazy(() => import('../pages/tools/Calculator'))
const PrivacyPolicy = lazy(() => import('../pages/legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('../pages/legal/TermsOfService'))
const AIChatbot = lazy(() => import('../components/assistant/AIChatbot'))
const NotFound = lazy(() => import('../pages/errors/NotFound'))
// Vite removes this module and its fictional fixtures from production builds.
const ReviewCardPreview = import.meta.env.DEV ? lazy(() => import('../pages/design/ReviewCardPreview')) : null

function App() {
  const location = useLocation()

  useEffect(() => {
    const selector = '.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale'

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach(element => element.classList.add('visible'))
      return undefined
    }

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

    const observeRevealElements = root => {
      if (root.matches?.(selector)) observer.observe(root)
      root.querySelectorAll?.(selector).forEach(element => observer.observe(element))
    }

    // Lazy route chunks can mount after this effect runs. Watch the main tree so
    // asynchronously inserted reveal elements are registered immediately.
    observeRevealElements(document)
    const mutationObserver = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) observeRevealElements(node)
      }))
    })
    mutationObserver.observe(document.querySelector('main') || document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [location])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ErrorBoundary>
      <main>
        <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/student-builder-program" element={<StudentBuilderProgram />} />
          <Route path="/team/hira-maqsood" element={<HiraProfile />} />
          <Route path="/team/:id" element={<TeamProfile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<CaseStudy />} />
          <Route path="/projects/:id/:moduleId" element={<ProjectWorkflow />} />
          <Route path="/reviews" element={<Reviews />} />
          {import.meta.env.DEV && <Route path="/design/reviews" element={<ReviewCardPreview />} />}
          <Route path="/products" element={<Products />} />
          <Route path="/products/omnai" element={<OmnaiDetail />} />
          <Route path="/products/eunoia" element={<EunoiaDetail />} />
          <Route path="/products/stepsy" element={<StepsyDetail />} />
          <Route path="/products/eunoia/privacy" element={<EunoiaPrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/research" element={<Research />} />
          <Route path="/news" element={<News />} />
          <Route path="/stack" element={<TechStack />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
          {/* Blog → Journal redirects for SEO */}
          <Route path="/blog" element={<Navigate to="/journal" replace />} />
          <Route path="/blog/:slug" element={<BlogRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <AIChatbot />
      <SiteAnalytics />
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
