import { useState } from 'react'
import styles from './FAQ.module.css'

const FAQS = [
  { q: 'How are winners selected?',           a: 'Winners are selected randomly using a verifiably fair algorithm after the giveaway ends. Every entry has an equal chance of winning.' },
  { q: 'What are VEs, SVEs, and Tokens?',     a: 'VEs (VELOOP Earnings), SVEs (Super VEs), and Tokens are the reward currencies you earn on the VELOOP Rewards platform through tasks, referrals, and activity.' },
  { q: 'Can I enter the same giveaway twice?', a: 'No. Each user can enter a giveaway once per giveaway period. The system automatically prevents duplicate entries.' },
  { q: 'How do I claim my prize?',             a: 'If you win, a "Claim Your Prize" button appears on your dashboard and the giveaway page. You must claim within the deadline shown.' },
  { q: 'Is there a fee to participate?',       a: 'Yes. Each giveaway has an entry fee in VEs, SVEs, or Tokens — shown on the giveaway card. These are earned on the platform, not purchased.' },
  { q: 'When are giveaways drawn?',            a: 'Each giveaway has its own end date and time shown on the countdown. The draw happens automatically at the end time.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className={styles.section} id="faq" aria-label="Frequently Asked Questions">
      <div className="container">
        <h2 className={styles.heading}>Frequently Asked Questions</h2>
        <div className={styles.list}>
          {FAQS.map((item, i) => (
            <div key={i} className={`${styles.item} ${open === i ? styles.opened : ''}`}>
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <div className={styles.chevron}>{open === i ? '−' : '+'}</div>
              </button>
              {open === i && <p className={styles.answer}>{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
