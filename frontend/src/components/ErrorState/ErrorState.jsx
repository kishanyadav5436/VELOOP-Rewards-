import styles from './ErrorState.module.css'

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className={styles.wrapper} role="alert">
      <div className={styles.iconBox}>
        <div className={styles.pulse} />
        <span className={styles.icon}>⚠️</span>
      </div>
      <h3 className={styles.title}>Oops!</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          <span className={styles.retryIcon}>↻</span>
          Try again
        </button>
      )}
    </div>
  )
}
