import styles from './PreviousWinnerCard.module.css'
import { timeAgo } from '../../utils/formatTime'

export default function PreviousWinnerCard({ winner }) {
  return (
    <div className={styles.card}>
      {winner.prizeImage ? (
        <img src={winner.prizeImage} alt={winner.prizeName} className={styles.avatarImg} />
      ) : (
        <div className={styles.medal}>🥇</div>
      )}
      <div className={styles.info}>
        <div className={styles.userRow}>
          <p className={styles.user}>{winner.userId}</p>
          <span className={styles.verifiedBadge} title="Verified Winner">
            <span className={styles.checkIcon}>✓</span>
            <span className={styles.verifiedText}>Verified</span>
          </span>
        </div>
        <p className={styles.prize}>{winner.prizeName}</p>
        <p className={styles.giveaway}>{winner.giveawayTitle}</p>
        <span className={styles.timeBadge}>⏱️ {timeAgo(winner.wonAt)}</span>
      </div>
    </div>
  )
}
