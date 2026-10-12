import { useState } from 'react'
import styles from './WinnerCard.module.css'
import { formatDateTime } from '../../utils/formatTime'
import VerifiedProofModal from '../VerifiedProofModal/VerifiedProofModal'

export default function WinnerCard({ giveaway, winner }) {
  const [showProof, setShowProof] = useState(false)

  const winnerData = {
    ...winner,
    prizeName: giveaway.prize?.name,
    giveawayTitle: giveaway.title,
    wonAt: winner.claimedAt,
  }

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
        {giveaway.prize.image ? (
          <img src={giveaway.prize.image} alt={giveaway.prize.name} className={styles.avatarImg} />
        ) : (
          <div className={styles.trophy}>🏆</div>
        )}
        <div className={styles.info}>
          <div className={styles.userRow}>
            <p className={styles.user}>{winner.userId}</p>
            <span className={styles.verifiedBadge} title="Verified Winner">
              <span className={styles.checkIcon}>✓</span>
              <span className={styles.verifiedText}>Verified</span>
            </span>
          </div>
          <p className={styles.prize}>{giveaway.prize.name}</p>
          <p className={styles.time}>Won: {formatDateTime(winner.claimedAt)}</p>
          <span className={`${styles.status} ${styles[winner.claimStatus]}`}>
            {winner.claimStatus === 'completed' ? '✅ Claimed' : winner.claimStatus}
          </span>
        </div>
      </div>

      {showProof && (
        <VerifiedProofModal
          winner={winnerData}
          onClose={() => setShowProof(false)}
        />
      )}
    </>
  )
}
