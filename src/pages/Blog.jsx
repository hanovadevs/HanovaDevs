import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './Blog.css'

export const blogPosts = [
  {
    slug: 'future-of-web-dev',
    title: 'The Future of Web Development: Performance, SEO, and the Edge',
    date: 'May 10, 2026',
    category: 'Web Development',
    excerpt: 'Exploring how Next.js, Server Components, and Edge Computing are redefining the modern web experience.',
    content: `
      <p>Web development is evolving faster than ever. In 2026, the focus has shifted from mere functionality to extreme performance and user experience. At HanovaDevs, we believe that a website isn't just a collection of pages—it's a high-performance engine for your business.</p>
      
      <h2>What is Modern Web Development?</h2>
      <p>Modern web development involves using advanced frameworks like React and Next.js to build applications that are fast, secure, and SEO-friendly. The "Edge" refers to running code closer to the user, reducing latency to near-zero.</p>
      
      <h3>Key Pillars of Success</h3>
      <ul>
        <li><strong>Performance:</strong> Using Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR).</li>
        <li><strong>Accessibility:</strong> Ensuring everyone, regardless of ability, can use your site.</li>
        <li><strong>SEO:</strong> Technical optimization that helps you rank on page one.</li>
      </ul>
      
      <p>By leveraging these technologies, we help businesses dominate their niche and provide a seamless experience to their customers.</p>
    `,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80'
  },
  {
    slug: 'ai-privacy-first',
    title: 'Scaling Local AI: Why Privacy-First Models are the Future',
    date: 'May 8, 2026',
    category: 'Artificial Intelligence',
    excerpt: 'How businesses are moving away from cloud-only AI to secure, local-first intelligence architectures.',
    content: `
      <p>The AI revolution is here, but it comes with a major catch: privacy. Many enterprises are hesitant to send sensitive data to third-party cloud providers. This is where Local AI comes in.</p>
      
      <h2>Local-First Intelligence</h2>
      <p>By running AI models like Llama 3 or Mistral directly on user hardware or private servers, businesses can ensure that their data never leaves their control. This is the core philosophy behind our product, <strong>Eunoia</strong>.</p>
      
      <h3>Benefits of Local AI</h3>
      <ul>
        <li><strong>Data Sovereignty:</strong> Complete control over your information.</li>
        <li><strong>Latency:</strong> No network round-trips for inference.</li>
        <li><strong>Cost:</strong> Reduce reliance on expensive API calls.</li>
      </ul>
      
      <p>At HanovaDevs, we specialize in integrating these secure AI pipelines into custom software, giving our clients a competitive edge without compromising security.</p>
    `,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80'
  },
  {
    slug: 'seo-trap-2026',
    title: 'The SEO Trap: Why Keywords Aren\'t Enough Anymore',
    date: 'May 5, 2026',
    category: 'Digital Marketing',
    excerpt: 'Moving beyond keyword stuffing to semantic search, user intent, and technical authority.',
    content: `
      <p>The days of simple keyword optimization are gone. Search engines in 2026 use advanced neural networks to understand the true intent behind a user's query. If your content isn't genuinely helpful, it won't rank.</p>
      
      <h2>Intent-Based Marketing</h2>
      <p>We focus on "Topic Authority"—creating comprehensive clusters of content that signal to search engines that you are an expert in your field. This is far more effective than targeting individual keywords.</p>
      
      <h3>What Matters Now?</h3>
      <ul>
        <li><strong>Core Web Vitals:</strong> Google\'s metrics for speed and stability.</li>
        <li><strong>Semantic Markup:</strong> Helping AI understand your content structure.</li>
        <li><strong>Engagement:</strong> Do users stay on your site or bounce back to search?</li>
      </ul>
      
      <p>Our performance marketing strategies combine technical excellence with psychological insight to drive not just traffic, but conversions.</p>
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'
  }
]

export default function Blog() {
  return (
    <div className="blog-page">
      <SEO 
        title="Our Blog — Insights into Tech & Growth"
        description="Read the latest insights on web development, AI integration, and digital marketing from the HanovaDevs team."
        url="/blog"
      />
      
      <section className="blog-hero">
        <div className="container">
          <span className="section-label">Insights</span>
          <h1>The <span className="gradient-text">Hanova Lab.</span></h1>
          <p>Thoughts on engineering, growth, and the future of the digital world.</p>
        </div>
      </section>

      <section className="blog-grid container">
        {blogPosts.map((post, i) => (
          <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="blog-card__image">
              <img src={post.image} alt={post.title} loading="lazy" />
              <div className="blog-card__category">{post.category}</div>
            </div>
            <div className="blog-card__content">
              <div className="blog-card__date">{post.date}</div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-card__footer">
                <span>Read More</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
