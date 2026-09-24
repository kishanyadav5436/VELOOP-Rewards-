import { useCountdown } from '../../hooks/useCountdown'
import styles from './Countdown.module.css'

export default function Countdown({ endDate, label = 'Giveaway ends in' }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(endDate)

  if (isExpired) {
    return <div className={styles.expired}>Giveaway has ended</div>
  }

  return (
    <div className={styles.wrapper}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.units}>
        {[['Days', days], ['Hours', hours], ['Minutes', minutes], ['Seconds', seconds]].map(([name, val]) => (
          <div key={name} className={styles.unit}>
            <div className={styles.box}>
              <span className={styles.value}>{String(val).padStart(2, '0')}</span>
            </div>
            <span className={styles.name}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
