import SEO from '../components/SEO'
import LegalPageLayout from '../components/legal/LegalPageLayout'
import { eunoiaPrivacyPolicyData, eunoiaLegalMetadata } from '../data/eunoiaLegalData'

export default function EunoiaPrivacyPolicy() {
  return (
    <>
      <SEO
        title="Eunoia Privacy Policy"
        description="Privacy policy for the Eunoia desktop app by HanovaDevs. Learn how Eunoia protects your data with a local-first, zero-cloud architecture — your data never leaves your device."
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
