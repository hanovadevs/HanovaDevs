import SEO from '../components/SEO'
import LegalPageLayout from '../components/legal/LegalPageLayout'
import { eunoiaPrivacyPolicyData, eunoiaLegalMetadata } from '../data/eunoiaLegalData'

export default function EunoiaPrivacyPolicy() {
  return (
    <>
      <SEO
        title="Eunoia Privacy Policy"
        description="Eunoia privacy information from HanovaDevs: local workspace storage, optional cloud AI and voice processing, provider connections, and your data choices."
        url="/products/eunoia/privacy"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Products', item: '/products' },
          { name: 'Eunoia', item: '/products/eunoia' },
          { name: 'Privacy Policy', item: '/products/eunoia/privacy' }
        ]}
      />
      <LegalPageLayout
        data={eunoiaPrivacyPolicyData}
        meta={eunoiaLegalMetadata}
        otherLegalDoc={{
          title: 'HanovaDevs Privacy Policy',
          desc: 'Read the full privacy policy for the HanovaDevs website and digital agency services.',
          path: '/privacy-policy'
        }}
      />
    </>
  )
}
