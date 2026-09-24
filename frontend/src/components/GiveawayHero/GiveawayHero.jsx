import styles from './GiveawayHero.module.css'
import { platformStats } from '../../data/giveawayData'
import { formatCurrency } from '../../utils/formatTime'

export default function GiveawayHero() {
  return (
    <section className={styles.hero} aria-label="VELOOP Giveaways Hero">
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>🎁 VELOOP Rewards Giveaways</div>

        <h1 className={styles.heading}>
          Win <span className={styles.highlight}>Premium Prizes</span><br />
          Every Month
        </h1>

        <p className={styles.subtext}>
          Use your VEs, SVEs, or Tokens to enter exclusive giveaways.
          Real prizes. Real winners. 100% transparent.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{platformStats.totalGiveawaysHeld}+</span>
            <span className={styles.statLabel}>Giveaways Held</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{platformStats.totalWinnersSelected}+</span>
            <span className={styles.statLabel}>Winners Selected</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{formatCurrency(platformStats.totalPrizeValueINR)}</span>
            <span className={styles.statLabel}>Total Prize Value</span>
          </div>
        </div>

        <div className={styles.actions}>
          <a href="#giveaways" className={styles.btnPrimary}>Browse Giveaways</a>
          <a href="#how-to"   className={styles.btnOutline}>How It Works</a>
        </div>
      </div>
    </section>
  )
}
