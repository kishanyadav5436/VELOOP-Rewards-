import { Link } from 'react-router-dom'
import styles from './GiveawayBanner.module.css'
import { giveawaysData, GIVEAWAY_STATUS } from '../../data/giveawayData'
import { useCountdown } from '../../hooks/useCountdown'
import { formatCurrency } from '../../utils/formatTime'

export default function GiveawayBanner() {
  const featured = giveawaysData.find(
    g => g.featured && g.status === GIVEAWAY_STATUS.ACTIVE
  )

  if (!featured) return null

  return (
    <div className={styles.banner} role="banner" aria-label="Featured Giveaway">
      {/* Animated glow edge */}
      <div className={styles.glowEdge} />

      <div className={styles.inner}>
        {/* Left: Info */}
        <div className={styles.left}>
          <div className={styles.liveWrap}>
            <span className={styles.liveDot} />
            <span className={styles.liveTag}>LIVE NOW</span>
          </div>
          <h2 className={styles.title}>{featured.title}</h2>
          <p className={styles.value}>
            Prize Value: <strong>{formatCurrency(featured.prize.value)}</strong>
          </p>
        </div>

        {/* Center: Countdown */}
        <div className={styles.center}>
          <BannerCountdown endDate={featured.endDate} />
        </div>

        {/* Right: CTA */}
        <div className={styles.right}>
          <Link to={`/giveaway/${featured.slug}`} className={styles.cta}>
            Enter Now
            <span className={styles.ctaArrow}>→</span>
          </Link>
          <p className={styles.participants}>
            <span className={styles.partIcon}>👥</span>
            {featured.stats.totalParticipants.toLocaleString()} participants
          </p>
        </div>
      </div>
    </div>
  )
}

function BannerCountdown({ endDate }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate)
  return (
    <div className={styles.countdown}>
      {[
        ['Days', days],
        ['Hrs', hours],
        ['Min', minutes],
        ['Sec', seconds],
      ].map(([label, val], i) => (
        <div key={label} className={styles.unitWrap}>
          <div className={styles.unit}>
            <span className={styles.num}>{String(val).padStart(2, '0')}</span>
            <span className={styles.label}>{label}</span>
          </div>
          {i < 3 && <span className={styles.sep}>:</span>}
        </div>
      ))}
    </div>
  )
}
