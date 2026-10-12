import { useState } from 'react'
import styles from './PreviousWinnerCard.module.css'
import { timeAgo } from '../../utils/formatTime'
import VerifiedProofModal from '../VerifiedProofModal/VerifiedProofModal'

export default function PreviousWinnerCard({ winner }) {
  const [showProof, setShowProof] = useState(false)

  return (
    <>
      <div
        className={styles.card}
        onClick={() => setShowProof(true)}
        title="Click to view verifiably fair proof"
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setShowProof(true)}
      >
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

      {showProof && (
        <VerifiedProofModal
          winner={winner}
          onClose={() => setShowProof(false)}
        />
      )}
    </>
  )
}
