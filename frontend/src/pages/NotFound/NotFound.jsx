import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      {/* Background orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.badge}>⚠️ Error 404</div>
        <h1 className={styles.code}>404</h1>
        <p className={styles.title}>Page Not Found</p>
        <p className={styles.sub}>
          This page doesn't exist or may have been removed.
          <br />
          Head back to browse our active giveaways.
        </p>
        <Link to="/" className={styles.btn} id="go-home-btn">
          🎁 Browse Giveaways
          <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </div>
  )
}
