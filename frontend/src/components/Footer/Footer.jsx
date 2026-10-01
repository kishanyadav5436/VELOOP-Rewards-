import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const LINKS = {
  Giveaways: [
    { label: 'All Giveaways',   href: '/#giveaways' },
    { label: 'How It Works',    href: '/#how-to' },
    { label: 'Platform Stats',  href: '/#stats' },
    { label: 'Giveaway Rules',  href: '/#rules' },
    { label: 'FAQ',             href: '/#faq' },
  ],
  Platform: [
    { label: 'VELOOP Rewards',  href: '#' },
    { label: 'Earn VEs',        href: '#' },
    { label: 'Leaderboard',     href: '#' },
    { label: 'Support',         href: '#' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <Link to="/" className={styles.logo} aria-label="VELOOP Rewards Home">
                <span className={styles.logoIcon}>🎁</span>
                <span className={styles.logoText}>
                  VELOOP <span className={styles.logoAccent}>Rewards</span>
                </span>
              </Link>
              <p className={styles.tagline}>
                Win premium prizes every month using your earned VEs, SVEs, and Tokens.
                Real prizes. Real winners. 100% transparent.
              </p>
              <div className={styles.trust}>
                <span className={styles.trustBadge}>🔒 Secure</span>
                <span className={styles.trustBadge}>✅ Verified</span>
                <span className={styles.trustBadge}>⚡ Instant</span>
              </div>
            </div>

            {/* Links */}
            {Object.entries(LINKS).map(([section, links]) => (
              <div key={section} className={styles.linkGroup}>
                <h3 className={styles.groupTitle}>{section}</h3>
                <ul className={styles.linkList}>
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className={styles.link}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter / CTA */}
            <div className={styles.cta}>
              <h3 className={styles.groupTitle}>Stay Updated</h3>
              <p className={styles.ctaText}>Get notified when new giveaways go live.</p>
              <div className={styles.inputRow}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={styles.input}
                  aria-label="Email for giveaway notifications"
                />
                <button className={styles.subscribeBtn}>Notify Me</button>
              </div>
              <p className={styles.ctaNote}>No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copy}>
              © {year} VELOOP Rewards. All rights reserved.
            </p>
            <div className={styles.legal}>
              <a href="#" className={styles.legalLink}>Privacy Policy</a>
              <a href="#" className={styles.legalLink}>Terms of Service</a>
              <a href="#" className={styles.legalLink}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
