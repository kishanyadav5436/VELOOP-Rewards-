import styles from './HowToParticipate.module.css'

const STEPS = [
  { n: '01', icon: '🔑', title: 'Create an Account',   desc: 'Sign up on VELOOP Rewards and earn your first VEs.' },
  { n: '02', icon: '💎', title: 'Earn VEs & Tokens',   desc: 'Complete tasks, referrals, and daily challenges to build your balance.' },
  { n: '03', icon: '🎁', title: 'Choose a Giveaway',   desc: 'Browse live giveaways and pick the prize you want to win.' },
  { n: '04', icon: '🚀', title: 'Enter with Fees',     desc: 'Spend your VEs, SVEs, or Tokens to enter. More entries = more chances.' },
  { n: '05', icon: '🏆', title: 'Win & Claim',         desc: "Winners are selected randomly. If you win, claim your prize directly!" },
]

export default function HowToParticipate() {
  return (
    <section className={styles.section} id="how-to" aria-label="How to Participate">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>How to Participate</h2>
          <p className={styles.sub}>It's simple. Earn → Enter → Win.</p>
        </div>
        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={step.n} className={styles.step}>
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{step.icon}</span>
                <span className={styles.num}>{step.n}</span>
              </div>
              {i < STEPS.length - 1 && <div className={styles.connector} />}
              <div className={styles.content}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.desc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
