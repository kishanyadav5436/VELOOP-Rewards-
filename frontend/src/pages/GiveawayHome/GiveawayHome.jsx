import GiveawayBanner      from '../../components/GiveawayBanner/GiveawayBanner'
import GiveawayHero        from '../../components/GiveawayHero/GiveawayHero'
import GiveawayStats       from '../../components/GiveawayStats/GiveawayStats'
import FeaturedGiveaways   from '../../components/FeaturedGiveaways/FeaturedGiveaways'
import WinnerSlider        from '../../components/WinnerSlider/WinnerSlider'
import WinnersTabs         from '../../components/WinnersTabs/WinnersTabs'
import HowToParticipate    from '../../components/HowToParticipate/HowToParticipate'
import TrustSection        from '../../components/TrustSection/TrustSection'
import FAQ                 from '../../components/FAQ/FAQ'
import GiveawayRules       from '../../components/GiveawayRules/GiveawayRules'

export default function GiveawayHome() {
  return (
    <main>
      <GiveawayBanner />
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
  )
}
