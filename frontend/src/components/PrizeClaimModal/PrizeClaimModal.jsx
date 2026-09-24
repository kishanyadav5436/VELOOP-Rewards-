import { useState } from 'react'
import styles from './PrizeClaimModal.module.css'
import { submitClaim } from '../../services/giveawayApi'
import { useUser } from '../../context/UserContext'
import { PRIZE_TYPE } from '../../data/giveawayData'

export default function PrizeClaimModal({ giveaway, onClose }) {
  const { user } = useUser()
  const [step, setStep] = useState('form') // form | loading | submitted | error
  const isPhysical = giveaway.prize.type === PRIZE_TYPE.PHYSICAL

  const [form, setForm] = useState({
    fullName: '', address: '', city: '', pincode: '', phone: '',
    email: user?.email ?? '',
  })

  function onChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStep('loading')
    try {
      await submitClaim(giveaway.id, user.userId, form)
      setStep('submitted')
    } catch {
      setStep('error')
    }
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        {step === 'form' && (
          <>
            <h2 className={styles.title}>🏆 Claim Your Prize</h2>
            <p className={styles.sub}>{giveaway.prize.name}</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              {isPhysical ? (
                <>
                  <label className={styles.label}>Full Name
                    <input name="fullName" className={styles.input} value={form.fullName} onChange={onChange} required placeholder="As on ID proof" />
                  </label>
                  <label className={styles.label}>Shipping Address
                    <textarea name="address" className={styles.input} value={form.address} onChange={onChange} required placeholder="House/Flat, Street, Area" rows={3} />
                  </label>
                  <div className={styles.row}>
                    <label className={styles.label}>City
                      <input name="city" className={styles.input} value={form.city} onChange={onChange} required />
                    </label>
                    <label className={styles.label}>PIN Code
                      <input name="pincode" className={styles.input} value={form.pincode} onChange={onChange} required pattern="\d{6}" />
                    </label>
                  </div>
                  <label className={styles.label}>Phone
                    <input name="phone" className={styles.input} type="tel" value={form.phone} onChange={onChange} required />
                  </label>
                </>
              ) : (
                <label className={styles.label}>Email for Gift Card
                  <input name="email" className={styles.input} type="email" value={form.email} onChange={onChange} required />
                </label>
              )}

              <button type="submit" className={styles.btn}>Submit Claim →</button>
            </form>
          </>
        )}

        {step === 'loading' && (
          <div className={styles.center}>
            <div className={styles.spinner} />
            <p>Submitting your claim...</p>
          </div>
        )}

        {step === 'submitted' && (
          <div className={styles.center}>
            <span className={styles.bigIcon}>✅</span>
            <h3>Claim Submitted!</h3>
            <p className={styles.sub}>We'll process your claim within 3–5 business days.</p>
            <button className={styles.btn} onClick={onClose}>Done</button>
          </div>
        )}

        {step === 'error' && (
          <div className={styles.center}>
            <span className={styles.bigIcon}>⚠️</span>
            <h3>Submission Failed</h3>
            <p className={styles.sub}>Please try again or contact support.</p>
            <button className={styles.btn} onClick={() => setStep('form')}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  )
}
