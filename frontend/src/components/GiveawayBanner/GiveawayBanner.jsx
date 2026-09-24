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
    <div className={styles.banner}>
      <div className={styles.left}>
        <span className={styles.liveTag}>🔴 LIVE NOW</span>
        <h2 className={styles.title}>{featured.title}</h2>
        <p className={styles.value}>Prize Value: <strong>{formatCurrency(featured.prize.value)}</strong></p>
      </div>
      <div className={styles.center}>
        <BannerCountdown endDate={featured.endDate} />
      </div>
      <div className={styles.right}>
        <Link to={`/giveaway/${featured.slug}`} className={styles.cta}>
          Enter Now →
        </Link>
        <p className={styles.participants}>
          {featured.stats.totalParticipants.toLocaleString()} participants
        </p>
      </div>
    </div>
  )
}

function BannerCountdown({ endDate }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate)
  return (
    <div className={styles.countdown}>
      {[['Days', days], ['Hrs', hours], ['Min', minutes], ['Sec', seconds]].map(([label, val]) => (
        <div key={label} className={styles.unit}>
          <span className={styles.num}>{String(val).padStart(2, '0')}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  )
}
