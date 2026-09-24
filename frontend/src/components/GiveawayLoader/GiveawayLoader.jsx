import styles from './GiveawayLoader.module.css'

export default function GiveawayLoader({ text = 'Loading giveaways...' }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.dot} />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}
