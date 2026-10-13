import ProductDetail from '../components/ProductDetail'
const captions = ['Welcome', 'Personal workspace', 'Planner', 'Notes', 'Private journal', 'Alarms and focus', 'Documents', 'Insights', 'Settings', 'Assistant preview']
const screenshots = captions.map((caption, i) => ({ src: `/products/eunoia/${i + 1}.webp`, caption, description: 'Explore this view of the Eunoia desktop workspace. Refer to the current Microsoft Store release for available functionality.' }))
const features = [
  { title: 'Plan your day', description: 'A personal workspace brings planning and everyday tasks into one interface.' },
  { title: 'Capture your ideas', description: 'Notes and journaling views provide space for writing and reflection.' },
  { title: 'Make time to focus', description: 'Focus and alarm tools help you organize time alongside your work.' },
]
export default function EunoiaDetail() {
  return <ProductDetail product="eunoia" title="Your mind, beautifully organized." description="Eunoia is a HanovaDevs desktop workspace for planning, notes, journaling and focused work. It is now available on Microsoft Store." screenshots={screenshots} features={features} />
}
