import styles from './GiveawayStats.module.css'
import { platformStats } from '../../data/giveawayData'
import { formatCurrency } from '../../utils/formatTime'

const STATS = [
  { icon: '🏆', value: `${platformStats.totalGiveawaysHeld}+`,          label: 'Giveaways Held' },
  { icon: '🎉', value: `${platformStats.totalWinnersSelected}+`,        label: 'Winners Selected' },
  { icon: '💰', value: formatCurrency(platformStats.totalPrizeValueINR),label: 'Total Prize Value' },
  { icon: '🔴', value: `${platformStats.activeGiveaways}`,              label: 'Live Now' },
]

export default function GiveawayStats() {
  return (
    <section className={styles.section} id="stats" aria-label="Platform Statistics">
      <div className="container">
        <div className={styles.grid}>
          {STATS.map(({ icon, value, label }) => (
            <div key={label} className={styles.card}>
              <span className={styles.icon}>{icon}</span>
              <span className={styles.value}>{value}</span>
              <span className={styles.label}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
