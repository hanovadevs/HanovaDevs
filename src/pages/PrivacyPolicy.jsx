import SEO from '../components/SEO'
import LegalPageLayout from '../components/legal/LegalPageLayout'
import { privacyPolicyData, legalMetadata } from '../data/legalData'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how HanovaDevs collects, uses, protects, and manages information when you use our website and digital services."
        url="/privacy-policy"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Privacy Policy', item: '/privacy-policy' }
        ]}
      />
      <LegalPageLayout
        data={privacyPolicyData}
        meta={legalMetadata}
        otherLegalDoc={{
          title: 'Terms of Service',
          desc: 'Understand the principles and terms that govern our client projects and digital services.',
          path: '/terms-of-service'
        }}
      />
    </>
  )
}
