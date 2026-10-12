import { useEffect, useState } from 'react'
import styles from './WinnerSlider.module.css'
import { getRecentWinners } from '../../services/giveawayApi'
import { timeAgo } from '../../utils/formatTime'
import { WinnerSkeleton } from '../Skeletons/Skeletons'
import VerifiedProofModal from '../VerifiedProofModal/VerifiedProofModal'

export default function WinnerSlider() {
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProofWinner, setSelectedProofWinner] = useState(null)

  useEffect(() => {
    getRecentWinners().then(data => { setWinners(data); setLoading(false) })
  }, [])

  // Duplicate for seamless infinite marquee scroll
  const doubled = [...winners, ...winners]

  return (
    <section className={styles.section} aria-label="Recent Winners">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.livePulseDot} />
            🏆 Live Community Activity Ticker
          </div>
          <h2 className={styles.heading}>Recent Winners & Payouts</h2>
          <p className={styles.sub}>
            Real people. Real prizes. Click any verified badge to view on-chain cryptographic draw proof.
          </p>
        </div>
      </div>

      {loading ? (
        <div className={styles.track} style={{ justifyContent: 'center' }}>
          {[1, 2, 3, 4].map(n => <WinnerSkeleton key={n} />)}
        </div>
      ) : (
        <div className={styles.sliderWrap} aria-hidden="false">
          <div className={styles.track}>
            {doubled.map((w, i) => (
              <div
                key={`${w.id}-${i}`}
                className={styles.card}
                onClick={() => setSelectedProofWinner(w)}
                title="Click to view verifiably fair proof"
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelectedProofWinner(w)}
              >
                <div className={styles.avatarWrap}>
                  {w.prizeImage ? (
                    <img
                      src={w.prizeImage}
                      alt={w.prizeName}
                      className={styles.avatarImg}
                    />
                  ) : (
                    <div className={styles.avatar} aria-hidden="true">🥇</div>
                  )}
                  <span className={styles.trophyBadge}>🏆</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.userRow}>
                    <span className={styles.user}>{w.userId}</span>
                    <button
                      type="button"
                      className={styles.verifiedBadge}
                      title="Click to inspect cryptographic proof"
                      onClick={e => {
                        e.stopPropagation()
                        setSelectedProofWinner(w)
                      }}
                    >
                      <span className={styles.checkIcon}>✓</span>
                      <span className={styles.verifiedText}>Verified</span>
                    </button>
                  </div>
                  <p className={styles.prize}>{w.prizeName}</p>
                  <div className={styles.metaRow}>
                    <span className={styles.timeBadge}>⏱️ {timeAgo(w.wonAt)}</span>
                    <button
                      type="button"
                      className={styles.completedBadge}
                      title="Inspect Claim Proof"
                      onClick={e => {
                        e.stopPropagation()
                        setSelectedProofWinner(w)
                      }}
                    >
                      {w.claimStatus === 'completed' ? '✅ Claimed' : '⏳ Pending'}
                      <span className={styles.proofTag}>[Proof]</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProofWinner && (
        <VerifiedProofModal
          winner={selectedProofWinner}
          onClose={() => setSelectedProofWinner(null)}
        />
      )}
    </section>
  )
}
