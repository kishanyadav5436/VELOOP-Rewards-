import { useUser } from '../../context/UserContext'
import styles from './BalanceIndicator.module.css'

export default function BalanceIndicator() {
  const { isLoggedIn, balances } = useUser()
  if (!isLoggedIn) return null

  return (
    <div className={styles.wrap}>
      {Object.entries(balances).map(([currency, amount]) => (
        <div key={currency} className={styles.item}>
          <span className={styles.amount}>{amount.toLocaleString()}</span>
          <span className={styles.currency}>{currency}</span>
        </div>
      ))}
    </div>
  )
}
