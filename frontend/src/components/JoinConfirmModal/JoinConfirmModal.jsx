import { useState } from 'react'
import styles from './JoinConfirmModal.module.css'
import { joinGiveaway } from '../../services/giveawayApi'
import { useUser } from '../../context/UserContext'
import { useBalanceCheck } from '../../hooks/useBalanceCheck'

export default function JoinConfirmModal({ giveaway, onClose }) {
  const { user, deductBalance, isLoggedIn } = useUser()
  const { canAfford, userBalance, shortfall } = useBalanceCheck(giveaway.entryFee)
  const [step,    setStep]    = useState('confirm') // confirm | loading | success | error
  const [entry,   setEntry]   = useState(null)
  const [errMsg,  setErrMsg]  = useState('')

  if (!isLoggedIn) {
    return (
      <Modal onClose={onClose}>
        <div className={styles.center}>
          <span className={styles.bigIcon}>🔒</span>
          <h3>Login Required</h3>
          <p className={styles.sub}>Please log in to enter this giveaway.</p>
          <button className={styles.btnPrimary} onClick={onClose}>Close</button>
        </div>
      </Modal>
    )
  }

  async function handleJoin() {
    setStep('loading')
    try {
      const res = await joinGiveaway(giveaway.id, user.userId, giveaway.entryFee.currency)
      deductBalance(giveaway.entryFee.currency, giveaway.entryFee.amount)
      setEntry(res)
      setStep('success')
    } catch {
      setErrMsg('Something went wrong. Please try again.')
      setStep('error')
    }
  }

  return (
    <Modal onClose={onClose}>
      {step === 'confirm' && (
        <>
          <h2 className={styles.title}>Confirm Entry</h2>
          <p className={styles.sub}>{giveaway.title}</p>

          <div className={styles.prizeRow}>
            <span>🎁 Prize</span>
            <span>{giveaway.prize.name}</span>
          </div>
          <div className={styles.prizeRow}>
            <span>💳 Entry Fee</span>
            <strong className={styles.fee}>
              {giveaway.entryFee.amount} {giveaway.entryFee.currency}
            </strong>
          </div>
          <div className={styles.prizeRow}>
            <span>👛 Your Balance</span>
            <span className={canAfford ? styles.ok : styles.bad}>
              {userBalance} {giveaway.entryFee.currency}
            </span>
          </div>

          {!canAfford && (
            <p className={styles.warning}>
              ⚠️ You need {shortfall} more {giveaway.entryFee.currency} to enter.
            </p>
          )}

          <div className={styles.actions}>
            <button className={styles.btnOutline} onClick={onClose}>Cancel</button>
            <button
              className={styles.btnPrimary}
              onClick={handleJoin}
              disabled={!canAfford}
            >
              Confirm Entry →
            </button>
          </div>
        </>
      )}

      {step === 'loading' && (
        <div className={styles.center}>
          <div className={styles.spinner} />
          <p>Entering giveaway...</p>
        </div>
      )}

      {step === 'success' && (
        <div className={styles.center}>
          <span className={styles.bigIcon}>🎉</span>
          <h3>You're In!</h3>
          <p className={styles.sub}>Entry #{entry?.entryNumber} confirmed.</p>
          <p className={styles.sub}>Good luck! 🍀</p>
          <button className={styles.btnPrimary} onClick={onClose}>Done</button>
        </div>
      )}

      {step === 'error' && (
        <div className={styles.center}>
          <span className={styles.bigIcon}>⚠️</span>
          <h3>Failed</h3>
          <p className={styles.sub}>{errMsg}</p>
          <button className={styles.btnPrimary} onClick={() => setStep('confirm')}>Try Again</button>
        </div>
      )}
    </Modal>
  )
}

function Modal({ children, onClose }) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close modal">✕</button>
        {children}
      </div>
    </div>
  )
}
