import styles from './GiveawayRules.module.css'

const RULES = [
  'One entry per user per giveaway.',
  'Entry fees are non-refundable once submitted.',
  'Winners are selected randomly after the giveaway end time.',
  'Prize claims must be submitted within the deadline shown after winning.',
  'VELOOP Rewards reserves the right to cancel a giveaway if fraud is detected.',
  'Winners may be required to verify their identity before receiving physical prizes.',
  'Gift card prizes will be delivered to the registered email within 7 business days.',
  'VELOOP Rewards decisions regarding winners and claims are final.',
]

export default function GiveawayRules() {
  return (
    <section className={styles.section} aria-label="Giveaway Rules">
      <div className="container">
        <div className={styles.box}>
          <h2 className={styles.heading}>📋 Giveaway Rules</h2>
          <ul className={styles.list}>
            {RULES.map((rule, i) => (
              <li key={i} className={styles.rule}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
