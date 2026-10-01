import { useEffect, useState } from 'react'
import styles from './WinnerSlider.module.css'
import { getRecentWinners } from '../../services/giveawayApi'
import { timeAgo } from '../../utils/formatTime'
import { WinnerSkeleton } from '../Skeletons/Skeletons'

export default function WinnerSlider() {
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecentWinners().then(data => { setWinners(data); setLoading(false) })
  }, [])

  // Need at least 2 sets to make the infinite scroll seamless
  const doubled = [...winners, ...winners]

  return (
    <section className={styles.section} aria-label="Recent Winners">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>🏆 Recent Winners</h2>
          <p className={styles.sub}>Real people. Real prizes. Every month.</p>
        </div>
      </div>

      {loading ? (
        <div className={styles.track} style={{ justifyContent: 'center' }}>
          {[1, 2, 3, 4].map(n => <WinnerSkeleton key={n} />)}
        </div>
      ) : (
        <div className={styles.sliderWrap} aria-hidden="false">
          <div className={styles.track}>
            {doubled.map((w, i) => (
              <div key={`${w.id}-${i}`} className={styles.card}>
                <div className={styles.avatarWrap}>
                  {w.prizeImage ? (
                    <img
                      src={w.prizeImage}
                      alt={w.prizeName}
                      className={styles.avatarImg}
                    />
                  ) : (
                    <div className={styles.avatar} aria-hidden="true">🥇</div>
                  )}
                  <span className={styles.trophyBadge}>🏆</span>
                </div>
                <div className={styles.info}>
                  <p className={styles.user}>{w.userId}</p>
                  <p className={styles.prize}>{w.prizeName}</p>
                  <p className={styles.time}>{timeAgo(w.wonAt)}</p>
                </div>
                <span className={styles.completedBadge}>
                  {w.claimStatus === 'completed' ? '✅ Claimed' : '⏳ Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
