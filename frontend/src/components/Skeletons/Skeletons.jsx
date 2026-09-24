import styles from './Skeletons.module.css'

export function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.shimmer} ${styles.img}`} />
      <div className={styles.body}>
        <div className={`${styles.shimmer} ${styles.line} ${styles.lg}`} />
        <div className={`${styles.shimmer} ${styles.line} ${styles.md}`} />
        <div className={`${styles.shimmer} ${styles.line} ${styles.sm}`} />
        <div className={`${styles.shimmer} ${styles.line} ${styles.xl}`} />
      </div>
    </div>
  )
}

export function WinnerSkeleton() {
  return (
    <div className={styles.winner}>
      <div className={`${styles.shimmer} ${styles.avatar}`} />
      <div className={styles.body}>
        <div className={`${styles.shimmer} ${styles.line} ${styles.md}`} />
        <div className={`${styles.shimmer} ${styles.line} ${styles.sm}`} />
      </div>
    </div>
  )
}
