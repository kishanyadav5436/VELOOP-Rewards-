import styles from './EmptyState.module.css'

export default function EmptyState({
  icon = '🎁',
  title = 'Nothing here yet',
  message = '',
  actionLabel,
  onAction,
}) {
  return (
    <div className={styles.wrapper} role="status">
      <div className={styles.iconBox}>
        <div className={styles.ring} />
        <span className={styles.icon}>{icon}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}
      {actionLabel && onAction && (
        <button className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
