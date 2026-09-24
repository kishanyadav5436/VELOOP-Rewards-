import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './GiveawayDetails.module.css'
import { useGiveaway } from '../../hooks/useGiveaway'
import { useGiveawayStatus } from '../../hooks/useGiveawayStatus'
import { useBalanceCheck } from '../../hooks/useBalanceCheck'
import { useUser } from '../../context/UserContext'
import Countdown from '../../components/Countdown/Countdown'
import JoinConfirmModal from '../../components/JoinConfirmModal/JoinConfirmModal'
import PrizeClaimModal from '../../components/PrizeClaimModal/PrizeClaimModal'
import GiveawayLoader from '../../components/GiveawayLoader/GiveawayLoader'
import ErrorState from '../../components/ErrorState/ErrorState'
import { GIVEAWAY_STATUS } from '../../data/giveawayData'
import { formatCurrency } from '../../utils/formatTime'

export default function GiveawayDetails() {
  const { slug } = useParams()
  const { data: giveaway, loading, error } = useGiveaway(slug)
  const { currentUserId, isLoggedIn } = useUser()
  const status = useGiveawayStatus(giveaway)
  const { canAfford, userBalance } = useBalanceCheck(giveaway?.entryFee)

  const [showJoin,  setShowJoin]  = useState(false)
  const [showClaim, setShowClaim] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  const isWinner = giveaway?.winner?.userId === currentUserId

  if (loading) return <div className={styles.page}><GiveawayLoader text="Loading giveaway details..." /></div>
  if (error)   return <div className={styles.page}><ErrorState message={error} /></div>
  if (!giveaway) return null

  return (
    <div className={styles.page}>
      <div className="container">
        <Link to="/" className={styles.back}>← Back to Giveaways</Link>

        <div className={styles.grid}>
          {/* Left: Prize Info */}
          <div className={styles.left}>
            <div className={styles.imageBox}>
              <span className={styles.emoji}>🎁</span>
            </div>
            <div className={styles.prizeInfo}>
              <h1 className={styles.prizeTitle}>{giveaway.prize.name}</h1>
              <p className={styles.prizeDesc}>{giveaway.prize.description}</p>
              <p className={styles.prizeValue}>{formatCurrency(giveaway.prize.value)}</p>
            </div>
          </div>

          {/* Right: Entry Panel */}
          <div className={styles.right}>
            <div className={styles.panel}>
              <h2 className={styles.title}>{giveaway.title}</h2>
              <p className={styles.desc}>{giveaway.description}</p>

              {/* Countdown */}
              {status === GIVEAWAY_STATUS.ACTIVE && (
                <div className={styles.countdown}>
                  <Countdown endDate={giveaway.endDate} label="Ends in" />
                </div>
              )}

              {/* Stats */}
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span>👥 Participants</span>
                  <strong>{giveaway.stats.totalParticipants.toLocaleString()}</strong>
                </div>
                <div className={styles.statItem}>
                  <span>📋 Entries</span>
                  <strong>{giveaway.stats.totalEntries.toLocaleString()}</strong>
                </div>
              </div>

              {/* Entry Fee */}
              <div className={styles.feeBox}>
                <div className={styles.feeRow}>
                  <span>Entry Fee</span>
                  <span className={styles.feeAmt}>{giveaway.entryFee.amount} {giveaway.entryFee.currency}</span>
                </div>
                {isLoggedIn && (
                  <div className={styles.feeRow}>
                    <span>Your Balance</span>
                    <span className={canAfford ? styles.ok : styles.low}>
                      {userBalance} {giveaway.entryFee.currency}
                    </span>
                  </div>
                )}
              </div>

              {/* Winner Banner */}
              {isWinner && (
                <div className={styles.winnerBanner}>
                  🏆 Congratulations! You won this giveaway!
                  <button className={styles.claimBtn} onClick={() => setShowClaim(true)}>
                    Claim Your Prize
                  </button>
                </div>
              )}

              {/* CTA */}
              {status === GIVEAWAY_STATUS.ACTIVE && !isWinner && (
                !isLoggedIn ? (
                  <Link to="/" className={styles.loginBtn}>Login to Enter →</Link>
                ) : hasJoined ? (
                  <div className={styles.joinedTag}>✅ You've already joined this giveaway</div>
                ) : (
                  <button
                    className={styles.enterBtn}
                    onClick={() => setShowJoin(true)}
                    disabled={!canAfford}
                  >
                    {canAfford ? 'Enter Giveaway →' : `Insufficient ${giveaway.entryFee.currency}`}
                  </button>
                )
              )}

              {status === GIVEAWAY_STATUS.UPCOMING && (
                <div className={styles.upcomingTag}>🔵 This giveaway hasn't started yet</div>
              )}

              {status === GIVEAWAY_STATUS.ENDED && !isWinner && (
                <div className={styles.endedTag}>⚫ This giveaway has ended</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showJoin && (
        <JoinConfirmModal
          giveaway={giveaway}
          onClose={() => { setShowJoin(false); setHasJoined(true) }}
        />
      )}
      {showClaim && (
        <PrizeClaimModal giveaway={giveaway} onClose={() => setShowClaim(false)} />
      )}
    </div>
  )
}
