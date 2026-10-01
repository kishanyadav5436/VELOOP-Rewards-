import Navbar             from '../../components/Navbar/Navbar'
import Footer             from '../../components/Footer/Footer'
import GiveawayBanner     from '../../components/GiveawayBanner/GiveawayBanner'
import GiveawayHero       from '../../components/GiveawayHero/GiveawayHero'
import GiveawayStats      from '../../components/GiveawayStats/GiveawayStats'
import FeaturedGiveaways  from '../../components/FeaturedGiveaways/FeaturedGiveaways'
import WinnerSlider       from '../../components/WinnerSlider/WinnerSlider'
import WinnersTabs        from '../../components/WinnersTabs/WinnersTabs'
import HowToParticipate   from '../../components/HowToParticipate/HowToParticipate'
import TrustSection       from '../../components/TrustSection/TrustSection'
import GiveawayRules      from '../../components/GiveawayRules/GiveawayRules'
import FAQ                from '../../components/FAQ/FAQ'
import styles             from './GiveawayHome.module.css'

export default function GiveawayHome() {
  return (
    <div className={styles.page}>
      <Navbar />
      <GiveawayBanner />
      <main>
        <GiveawayHero />
        <GiveawayStats />
        <FeaturedGiveaways />
        <WinnerSlider />
        <HowToParticipate />
        <WinnersTabs />
        <TrustSection />
        <GiveawayRules />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
