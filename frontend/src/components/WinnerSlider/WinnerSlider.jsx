import { useEffect, useRef, useState } from 'react'
import styles from './WinnerSlider.module.css'
import { getRecentWinners } from '../../services/giveawayApi'
import { timeAgo } from '../../utils/formatTime'
import { WinnerSkeleton } from '../Skeletons/Skeletons'

export default function WinnerSlider() {
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)
  const trackRef = useRef(null)

  useEffect(() => {
    getRecentWinners().then(data => { setWinners(data); setLoading(false) })
  }, [])

  return (
    <section className={styles.section} aria-label="Recent Winners">
      <div className="container">
        <h2 className={styles.heading}>🏆 Recent Winners</h2>
        {loading ? (
          <div className={styles.track}>
            {[1,2,3].map(n => <WinnerSkeleton key={n} />)}
          </div>
        ) : (
          <div className={styles.sliderWrap}>
            <div className={styles.track} ref={trackRef}>
              {[...winners, ...winners].map((w, i) => (
                <div key={`${w.id}-${i}`} className={styles.card}>
                  <div className={styles.avatar}>🥇</div>
                  <div className={styles.info}>
                    <p className={styles.user}>{w.userId}</p>
                    <p className={styles.prize}>{w.prizeName}</p>
                    <p className={styles.time}>{timeAgo(w.wonAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
