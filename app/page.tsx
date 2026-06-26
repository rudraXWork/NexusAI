import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IntegrationsBar from './components/IntegrationsBar'
import FeaturesSection from './components/FeaturesSection'
import StatsSection from './components/StatsSection'
import PipelineSection from './components/PipelineSection'
import PricingSection from './components/PricingSection'
import SocialProof from './components/SocialProof'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntegrationsBar />
        <FeaturesSection />
        <StatsSection />
        <PipelineSection />
        <PricingSection />
        <SocialProof />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  )
}
