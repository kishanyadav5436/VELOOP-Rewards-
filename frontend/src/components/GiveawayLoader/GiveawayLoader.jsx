import styles from './GiveawayLoader.module.css'

export default function GiveawayLoader({ text = 'Loading giveaways...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-label={text}>
      <div className={styles.loaderBox}>
        {/* Outer spinning ring */}
        <div className={styles.ring}>
          <div className={styles.ringInner} />
        </div>

        {/* Center brand icon */}
        <div className={styles.center}>
          <span className={styles.icon}>🎁</span>
        </div>

        {/* Orbiting dots */}
        <div className={styles.orbit}>
          <span className={styles.dot} style={{ '--delay': '0s' }} />
          <span className={styles.dot} style={{ '--delay': '0.4s' }} />
          <span className={styles.dot} style={{ '--delay': '0.8s' }} />
        </div>
      </div>

      <p className={styles.text}>{text}</p>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} />
      </div>
    </div>
  )
}
