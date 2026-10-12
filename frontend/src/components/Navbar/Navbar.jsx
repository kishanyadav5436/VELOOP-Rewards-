import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useUser } from '../../context/UserContext'

export default function Navbar() {
  const { isLoggedIn, user, balances, logout, login } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  function toggleLogin() {
    if (isLoggedIn) {
      logout()
    } else {
      login({
        id: 'usr-veloop-9842',
        userId: 'VE9842',
        username: 'kishan_y',
        email: 'kishan@example.com',
        avatar: null,
        balances: { VEs: 3200, SVEs: 1500, Tokens: 420 },
        joinedAt: '2025-11-12T08:00:00.000Z',
      })
    }
    setMenuOpen(false)
  }

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="VELOOP Rewards Home">
          <div className={styles.logoIconWrap}>
            <span className={styles.logoIcon}>🎁</span>
          </div>
          <span className={styles.logoText}>
            VELOOP <span className={styles.logoAccent}>Rewards</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            Giveaways
          </Link>
          <a href="/#how-to" className={styles.navLink}>How It Works</a>
          <a href="/#stats" className={styles.navLink}>Stats</a>
        </nav>

        {/* Right side: Balances + Auth */}
        <div className={styles.right}>
          {isLoggedIn && (
            <div className={styles.balanceArea}>
              <div className={styles.balances} aria-label="Your balances">
                {Object.entries(balances).map(([currency, amount]) => {
                  const icon = currency === 'VEs' ? '💎' : currency === 'SVEs' ? '⚡' : '🪙'
                  return (
                    <div key={currency} className={`${styles.balanceChip} ${styles[`cur_${currency}`]}`}>
                      <span className={styles.curIcon}>{icon}</span>
                      <span className={styles.balanceAmt}>{amount.toLocaleString()}</span>
                      <span className={styles.balanceCur}>{currency}</span>
                    </div>
                  )
                })}
              </div>
              <a
                href="#how-to"
                className={styles.quickEarnBtn}
                title="Earn more VEs and Tokens"
              >
                <span className={styles.quickEarnIcon}>+</span>
                <span>Earn</span>
              </a>
            </div>
          )}

          <button
            className={isLoggedIn ? styles.btnLogout : styles.btnLogin}
            onClick={toggleLogin}
            aria-label={isLoggedIn ? 'Log out' : 'Log in'}
          >
            {isLoggedIn ? (
              <>
                <span className={styles.avatar}>
                  {user?.username?.charAt(0).toUpperCase() ?? 'U'}
                </span>
                <span className={styles.btnText}>{user?.username}</span>
                <span className={styles.chevron}>▾</span>
              </>
            ) : (
              'Log In'
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="navigation" aria-label="Mobile navigation">
          <Link to="/" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Giveaways</Link>
          <a href="/#how-to" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="/#stats"  className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Stats</a>

          {isLoggedIn && (
            <div className={styles.mobileBalanceSection}>
              <div className={styles.mobileBalanceHeader}>
                <span className={styles.mobileBalanceTitle}>Your Wallet</span>
                <a
                  href="#how-to"
                  className={styles.mobileQuickEarn}
                  onClick={() => setMenuOpen(false)}
                >
                  ⚡ + Quick Earn
                </a>
              </div>
              <div className={styles.mobileBalances}>
                {Object.entries(balances).map(([currency, amount]) => {
                  const icon = currency === 'VEs' ? '💎' : currency === 'SVEs' ? '⚡' : '🪙'
                  return (
                    <div key={currency} className={`${styles.mobileBalance} ${styles[`cur_${currency}`]}`}>
                      <span>{icon}</span>
                      <span className={styles.balanceAmt}>{amount.toLocaleString()}</span>
                      <span className={styles.balanceCur}>{currency}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <button
            className={isLoggedIn ? styles.mobileBtnLogout : styles.mobileBtnLogin}
            onClick={toggleLogin}
          >
            {isLoggedIn ? `Log out (${user?.username})` : 'Log In'}
          </button>
        </div>
      )}
    </header>
  )
}
