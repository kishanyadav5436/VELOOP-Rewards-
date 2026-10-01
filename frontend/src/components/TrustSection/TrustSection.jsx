import styles from './TrustSection.module.css'

const TRUST = [
  { icon: '🔒', title: 'Secure & Transparent',  desc: 'All draws are conducted using a verifiably fair random selection system.' },
  { icon: '✅', title: 'Real Winners',           desc: 'Every giveaway has a real winner. No fake entries. Announced publicly.' },
  { icon: '⚡', title: 'Instant Notification',   desc: "Winners are notified immediately via the platform when they're selected." },
  { icon: '🌟', title: '100% Free to Enter',     desc: 'Entry fees are paid with earned VEs/Tokens — never real money.' },
]

export default function TrustSection() {
  return (
    <section className={styles.section} aria-label="Why Trust VELOOP Giveaways">
      <div className="container">
        <h2 className={styles.heading}>Why VELOOP?</h2>
        <p className={styles.sub}>Trusted by thousands of users across India.</p>
        <div className={styles.grid}>
          {TRUST.map(({ icon, title, desc }) => (
            <div key={title} className={styles.card}>
              <span className={styles.icon}>{icon}</span>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.desc}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
