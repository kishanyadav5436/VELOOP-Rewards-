import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useUser } from '../../context/UserContext'
import { TransactionHistoryModal, MyEntriesModal } from '../UserModals/UserModals'

export default function Navbar() {
  const { isLoggedIn, user, balances, logout, login } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [entriesOpen, setEntriesOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)

  // Click-outside listener for profile dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  function handleProfileClick() {
    if (isLoggedIn) {
      setDropdownOpen(prev => !prev)
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
  }

  function handleLogout() {
    setDropdownOpen(false)
    setMenuOpen(false)
    logout()
  }

  return (
    <>
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

          {/* Right side: Balances + Auth with Profile Dropdown */}
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

            {/* Profile Dropdown Container */}
            <div className={styles.profileContainer} ref={dropdownRef}>
              <button
                className={isLoggedIn ? styles.btnLogout : styles.btnLogin}
                onClick={handleProfileClick}
                aria-label={isLoggedIn ? 'User menu' : 'Log in'}
                aria-expanded={dropdownOpen}
              >
                {isLoggedIn ? (
                  <>
                    <span className={styles.avatar}>
                      {user?.username?.charAt(0).toUpperCase() ?? 'U'}
                    </span>
                    <span className={styles.btnText}>{user?.username}</span>
                    <span className={`${styles.chevron} ${dropdownOpen ? styles.chevronRotated : ''}`}>▾</span>
                  </>
                ) : (
                  'Log In'
                )}
              </button>

              {/* Enhanced User Profile Dropdown */}
              {isLoggedIn && dropdownOpen && (
                <div className={styles.dropdownMenu} role="menu" aria-label="User Profile Menu">
                  {/* User Info Header */}
                  <div className={styles.dropdownHeader}>
                    <div className={styles.ddAvatarBig}>
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.ddUserInfo}>
                      <div className={styles.ddNameRow}>
                        <span className={styles.ddUsername}>{user?.username}</span>
                        <span className={styles.ddVerifiedTag}>✓ Verified</span>
                      </div>
                      <span className={styles.ddUserId}>ID: {user?.userId || 'VE9842'}</span>
                      <span className={styles.ddEmail}>{user?.email || 'kishan@example.com'}</span>
                    </div>
                  </div>

                  {/* Balance Snapshot */}
                  <div className={styles.dropdownBalances}>
                    <div className={styles.ddBalBadge}>
                      <span>💎</span>
                      <span>{balances.VEs?.toLocaleString() ?? 0} VEs</span>
                    </div>
                    <div className={styles.ddBalBadge}>
                      <span>⚡</span>
                      <span>{balances.SVEs?.toLocaleString() ?? 0} SVEs</span>
                    </div>
                    <div className={styles.ddBalBadge}>
                      <span>🪙</span>
                      <span>{balances.Tokens?.toLocaleString() ?? 0} Tokens</span>
                    </div>
                  </div>

                  <div className={styles.dropdownDivider} />

                  {/* Direct Shortcuts */}
                  <div className={styles.dropdownLinks}>
                    <a
                      href="#how-to"
                      className={styles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                      role="menuitem"
                    >
                      <span className={styles.ddItemIcon}>⚡</span>
                      <div className={styles.ddItemText}>
                        <span className={styles.ddItemTitle}>Earn VEs</span>
                        <span className={styles.ddItemSub}>Complete tasks & daily spins</span>
                      </div>
                      <span className={styles.ddArrow}>→</span>
                    </a>

                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        setDropdownOpen(false)
                        setHistoryOpen(true)
                      }}
                      role="menuitem"
                    >
                      <span className={styles.ddItemIcon}>📜</span>
                      <div className={styles.ddItemText}>
                        <span className={styles.ddItemTitle}>Transaction History</span>
                        <span className={styles.ddItemSub}>Recent earnings & deductions</span>
                      </div>
                      <span className={styles.ddArrow}>→</span>
                    </button>

                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        setDropdownOpen(false)
                        setEntriesOpen(true)
                      }}
                      role="menuitem"
                    >
                      <span className={styles.ddItemIcon}>🎟️</span>
                      <div className={styles.ddItemText}>
                        <span className={styles.ddItemTitle}>My Entries</span>
                        <span className={styles.ddItemSub}>Active tickets & drawings</span>
                      </div>
                      <span className={styles.ddArrow}>→</span>
                    </button>
                  </div>

                  <div className={styles.dropdownDivider} />

                  {/* Logout Button */}
                  <button
                    className={styles.dropdownLogoutBtn}
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <span>🚪 Log Out</span>
                  </button>
                </div>
              )}
            </div>
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
                  <span className={styles.mobileBalanceTitle}>Your Wallet ({user?.username})</span>
                  <a
                    href="#how-to"
                    className={styles.mobileQuickEarn}
                    onClick={() => setMenuOpen(false)}
                  >
                    ⚡ + Earn
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

                <div className={styles.mobileQuickActions}>
                  <button
                    className={styles.mobileActionBtn}
                    onClick={() => {
                      setMenuOpen(false)
                      setHistoryOpen(true)
                    }}
                  >
                    📜 Transaction History
                  </button>
                  <button
                    className={styles.mobileActionBtn}
                    onClick={() => {
                      setMenuOpen(false)
                      setEntriesOpen(true)
                    }}
                  >
                    🎟️ My Active Entries
                  </button>
                </div>
              </div>
            )}

            <button
              className={isLoggedIn ? styles.mobileBtnLogout : styles.mobileBtnLogin}
              onClick={handleLogout}
            >
              {isLoggedIn ? `Log out (${user?.username})` : 'Log In'}
            </button>
          </div>
        )}
      </header>

      {/* Account Modals */}
      <TransactionHistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        balances={balances}
      />
      <MyEntriesModal
        isOpen={entriesOpen}
        onClose={() => setEntriesOpen(false)}
      />
    </>
  )
}
