import SEO from '../components/SEO'
import LegalPageLayout from '../components/legal/LegalPageLayout'
import { termsOfServiceData, legalMetadata } from '../data/legalData'

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the terms governing the use of the HanovaDevs website, digital services, software development, automation, and consulting services."
        url="/terms-of-service"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Terms of Service', item: '/terms-of-service' }
        ]}
      />
      <LegalPageLayout
        data={termsOfServiceData}
        meta={legalMetadata}
        otherLegalDoc={{
          title: 'Privacy Policy',
          desc: 'Learn what information we collect, why we use it, and the measures we take to protect it.',
          path: '/privacy-policy'
        }}
      />
    </>
  )
}
