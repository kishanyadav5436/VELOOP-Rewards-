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
        <p className={styles.user}>{winner.userId}</p>
        <p className={styles.prize}>{winner.prizeName}</p>
        <p className={styles.giveaway}>{winner.giveawayTitle}</p>
        <p className={styles.time}>{timeAgo(winner.wonAt)}</p>
      </div>
    </div>
  )
}
