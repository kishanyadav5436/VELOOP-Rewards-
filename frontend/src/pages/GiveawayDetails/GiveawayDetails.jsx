import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './GiveawayDetails.module.css'
import { useGiveaway }        from '../../hooks/useGiveaway'
import { useGiveawayStatus }  from '../../hooks/useGiveawayStatus'
import { useBalanceCheck }    from '../../hooks/useBalanceCheck'
import { useUser }            from '../../context/UserContext'
import Navbar                 from '../../components/Navbar/Navbar'
import Footer                 from '../../components/Footer/Footer'
import Countdown              from '../../components/Countdown/Countdown'
import JoinConfirmModal       from '../../components/JoinConfirmModal/JoinConfirmModal'
import PrizeClaimModal        from '../../components/PrizeClaimModal/PrizeClaimModal'
import GiveawayLoader         from '../../components/GiveawayLoader/GiveawayLoader'
import ErrorState             from '../../components/ErrorState/ErrorState'
import { GIVEAWAY_STATUS }    from '../../data/giveawayData'
import { formatCurrency }     from '../../utils/formatTime'

export default function GiveawayDetails() {
  const { slug } = useParams()
  const { data: giveaway, loading, error } = useGiveaway(slug)
  const { currentUserId, isLoggedIn, balances } = useUser()
  const status = useGiveawayStatus(giveaway)
  const { canAfford, userBalance } = useBalanceCheck(giveaway?.entryFee)

  const [showJoin,  setShowJoin]  = useState(false)
  const [showClaim, setShowClaim] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  const isWinner = giveaway?.winner?.userId === currentUserId

  if (loading) return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.loaderWrap}>
        <GiveawayLoader text="Loading giveaway details..." />
      </div>
      <Footer />
    </div>
  )

  if (error) return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.loaderWrap}>
        <ErrorState message={error} />
      </div>
      <Footer />
    </div>
  )

  if (!giveaway) return null

  const STATUS_CONFIG = {
    [GIVEAWAY_STATUS.ACTIVE]:   { label: '🔴 Live',     cls: styles.badgeActive },
    [GIVEAWAY_STATUS.UPCOMING]: { label: '🔵 Upcoming', cls: styles.badgeUpcoming },
    [GIVEAWAY_STATUS.ENDED]:    { label: '⚫ Ended',    cls: styles.badgeEnded },
  }
  const badge = STATUS_CONFIG[status] ?? STATUS_CONFIG[GIVEAWAY_STATUS.ENDED]

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.back}>← All Giveaways</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{giveaway.title}</span>
          </nav>

          <div className={styles.grid}>
            {/* ── Left: Prize Info ─────────────────────────────── */}
            <div className={styles.left}>
              <div className={styles.imageBox}>
                {giveaway.prize.image ? (
                  <img
                    src={giveaway.prize.image}
                    alt={giveaway.prize.name}
                    className={styles.prizeImage}
                  />
                ) : (
                  <span className={styles.emoji} role="img" aria-label="Prize">🎁</span>
                )}
                <span className={`${styles.badge} ${badge.cls}`}>{badge.label}</span>
                {giveaway.featured && (
                  <span className={styles.featuredBadge}>⭐ Featured</span>
                )}
              </div>

              <div className={styles.prizeInfo}>
                <p className={styles.prizeCategory}>
                  {giveaway.tags.join(' · ')}
                </p>
                <h1 className={styles.prizeTitle}>{giveaway.prize.name}</h1>
                <p className={styles.prizeDesc}>{giveaway.prize.description}</p>
                <p className={styles.prizeValue}>{formatCurrency(giveaway.prize.value)}</p>
              </div>

              {/* Tags */}
              <div className={styles.tags}>
                {giveaway.tags.map(tag => (
                  <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            </div>

            {/* ── Right: Entry Panel ────────────────────────────── */}
            <div className={styles.right}>
              <div className={styles.panel}>
                {/* Header */}
                <div className={styles.panelHeader}>
                  <h2 className={styles.panelTitle}>{giveaway.title}</h2>
                  <p className={styles.panelDesc}>{giveaway.description}</p>
                </div>

                {/* Countdown */}
                {status === GIVEAWAY_STATUS.ACTIVE && (
                  <div className={styles.countdownWrap}>
                    <Countdown endDate={giveaway.endDate} label="Giveaway ends in" />
                  </div>
                )}

                {/* Stats Row */}
                <div className={styles.statsRow}>
                  <div className={styles.statBox}>
                    <span className={styles.statIcon}>👥</span>
                    <span className={styles.statVal}>{giveaway.stats.totalParticipants.toLocaleString()}</span>
                    <span className={styles.statLbl}>Participants</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statBox}>
                    <span className={styles.statIcon}>📋</span>
                    <span className={styles.statVal}>{giveaway.stats.totalEntries.toLocaleString()}</span>
                    <span className={styles.statLbl}>Total Entries</span>
                  </div>
                  {giveaway.stats.maxParticipants && (
                    <>
                      <div className={styles.statDivider} />
                      <div className={styles.statBox}>
                        <span className={styles.statIcon}>🏁</span>
                        <span className={styles.statVal}>{giveaway.stats.maxParticipants.toLocaleString()}</span>
                        <span className={styles.statLbl}>Max Slots</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Entry Fee */}
                <div className={styles.feeSection}>
                  <h3 className={styles.feeSectionTitle}>Entry Fee</h3>
                  <div className={styles.feeMain}>
                    <span className={styles.feeAmt}>
                      {giveaway.entryFee.amount}
                    </span>
                    <span className={styles.feeCur}>{giveaway.entryFee.currency}</span>
                  </div>
                  {giveaway.entryFee.alternatives.length > 0 && (
                    <div className={styles.feeAlts}>
                      <span className={styles.feeOrLabel}>or pay with:</span>
                      {giveaway.entryFee.alternatives.map(alt => (
                        <span key={alt.currency} className={styles.feeAltChip}>
                          {alt.amount} {alt.currency}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Balance check */}
                  {isLoggedIn && (
                    <div className={styles.balanceRow}>
                      <span className={styles.balanceLabel}>
                        Your {giveaway.entryFee.currency} balance
                      </span>
                      <span className={canAfford ? styles.balanceOk : styles.balanceLow}>
                        {userBalance.toLocaleString()} {giveaway.entryFee.currency}
                        {canAfford ? ' ✓' : ' ✗'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Winner Banner */}
                {isWinner && (
                  <div className={styles.winnerBanner} role="alert">
                    <span className={styles.winnerIcon}>🏆</span>
                    <div>
                      <p className={styles.winnerTitle}>You won this giveaway!</p>
                      <p className={styles.winnerSub}>Congratulations! Claim your prize below.</p>
                    </div>
                    <button
                      className={styles.claimBtn}
                      onClick={() => setShowClaim(true)}
                      id="claim-prize-btn"
                    >
                      Claim Prize →
                    </button>
                  </div>
                )}

                {/* CTA */}
                <div className={styles.ctaSection}>
                  {status === GIVEAWAY_STATUS.ACTIVE && !isWinner && (
                    !isLoggedIn ? (
                      <Link to="/" className={styles.loginBtn} id="login-to-enter-btn">
                        🔒 Login to Enter
                      </Link>
                    ) : hasJoined ? (
                      <div className={styles.joinedTag} role="status">
                        ✅ You're already in this giveaway!
                      </div>
                    ) : (
                      <button
                        className={styles.enterBtn}
                        onClick={() => setShowJoin(true)}
                        disabled={!canAfford}
                        id="enter-giveaway-btn"
                      >
                        {canAfford
                          ? `Enter Giveaway — ${giveaway.entryFee.amount} ${giveaway.entryFee.currency}`
                          : `Insufficient ${giveaway.entryFee.currency} Balance`}
                      </button>
                    )
                  )}

                  {status === GIVEAWAY_STATUS.UPCOMING && (
                    <div className={styles.upcomingTag}>
                      🔵 Coming Soon — This giveaway hasn't started yet
                    </div>
                  )}

                  {status === GIVEAWAY_STATUS.ENDED && !isWinner && (
                    <div className={styles.endedTag}>
                      ⚫ This giveaway has ended
                      {giveaway.winner && (
                        <p className={styles.endedWinner}>
                          Winner: <strong>{giveaway.winner.userId}</strong>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div className={styles.dates}>
                  <div className={styles.dateRow}>
                    <span>📅 Start</span>
                    <span>{new Date(giveaway.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className={styles.dateRow}>
                    <span>⏰ End</span>
                    <span>{new Date(giveaway.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

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
