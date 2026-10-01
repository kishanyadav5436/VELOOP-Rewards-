import { Link } from 'react-router-dom'
import styles from './PrizeCard.module.css'
import { useGiveawayStatus } from '../../hooks/useGiveawayStatus'
import { GIVEAWAY_STATUS } from '../../data/giveawayData'
import { formatCurrency } from '../../utils/formatTime'
import Countdown from '../Countdown/Countdown'

const STATUS_LABEL = {
  [GIVEAWAY_STATUS.ACTIVE]:   { text: '🔴 Live',     cls: 'active' },
  [GIVEAWAY_STATUS.UPCOMING]: { text: '🔵 Upcoming', cls: 'upcoming' },
  [GIVEAWAY_STATUS.ENDED]:    { text: '⚫ Ended',    cls: 'ended' },
}

export default function PrizeCard({ giveaway }) {
  const status = useGiveawayStatus(giveaway)
  const badge  = STATUS_LABEL[status] ?? STATUS_LABEL[GIVEAWAY_STATUS.ENDED]

  return (
    <article className={styles.card} aria-label={giveaway.title}>
      <div className={styles.imageWrap}>
        {giveaway.prize.image ? (
          <img src={giveaway.prize.image} alt={giveaway.prize.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>🎁</div>
        )}
        <span className={`${styles.badge} ${styles[badge.cls]}`}>{badge.text}</span>
        {giveaway.featured && <span className={styles.featured}>⭐ Featured</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{giveaway.title}</h3>
        <p className={styles.prizeName}>{giveaway.prize.name}</p>
        <p className={styles.value}>{formatCurrency(giveaway.prize.value)}</p>

        <div className={styles.fee}>
          <span className={styles.feeLabel}>Entry Fee</span>
          <span className={styles.feeValue}>
            {giveaway.entryFee.amount} {giveaway.entryFee.currency}
          </span>
        </div>

        {status === GIVEAWAY_STATUS.ACTIVE && (
          <div className={styles.countdown}>
            <Countdown endDate={giveaway.endDate} label="Ends in" />
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.participants}>
            👥 {giveaway.stats.totalParticipants.toLocaleString()} joined
          </span>
          <Link
            to={`/giveaway/${giveaway.slug}`}
            className={`${styles.btn} ${status !== GIVEAWAY_STATUS.ACTIVE ? styles.btnDisabled : ''}`}
            aria-disabled={status !== GIVEAWAY_STATUS.ACTIVE}
          >
            {status === GIVEAWAY_STATUS.ACTIVE   ? 'Enter Now →' :
             status === GIVEAWAY_STATUS.UPCOMING ? 'Coming Soon' : 'View Details'}
          </Link>
        </div>
      </div>
    </article>
  )
}
