import ProductDetail from '../components/ProductDetail'
const captions = ['Browser workspace', 'Sidebar preview', 'Workflow preview', 'Privacy tools preview', 'Developer workspace preview']
const screenshots = captions.map((caption, i) => ({ src: `/products/omnai/B${i + 1}.webp`, caption, description: 'Development preview of Omnai Browser. The final interface and available capabilities may change before release.' }))
const features = [
  { title: 'A connected workspace', description: 'The product direction brings browsing and AI-assisted work into a desktop experience.' },
  { title: 'Tools in context', description: 'Preview interfaces explore ways to make assistance available alongside the page you are using.' },
  { title: 'A considered launch', description: 'Omnai is preparing for release. Availability, system requirements and final capabilities will be announced with the launch.' },
]
export default function OmnaiDetail() {
  return <ProductDetail product="omnai" title="The browser, reimagined with AI." description="Omnai Browser is an AI-focused desktop browser from HanovaDevs. It is launching soon; explore the preview while the team prepares the release." screenshots={screenshots} features={features} />
}
