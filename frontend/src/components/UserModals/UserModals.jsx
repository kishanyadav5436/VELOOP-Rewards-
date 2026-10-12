import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './UserModals.module.css'

export function TransactionHistoryModal({ isOpen, onClose, balances }) {
  const [filter, setFilter] = useState('all')

  if (!isOpen) return null

  const mockTransactions = [
    { id: 'tx-1', type: 'earn', title: 'Daily Streak Bonus', amount: '+500 VEs', date: 'Today, 09:30 AM', icon: '💎', cur: 'VEs' },
    { id: 'tx-2', type: 'spend', title: 'iPhone 16 Pro Max Entry', amount: '-500 VEs', date: 'Yesterday, 02:20 PM', icon: '🎟️', cur: 'VEs' },
    { id: 'tx-3', type: 'earn', title: 'Referral Bonus (Friend VE1942)', amount: '+1,500 SVEs', date: 'Oct 09, 2026', icon: '⚡', cur: 'SVEs' },
    { id: 'tx-4', type: 'earn', title: 'Telegram Community Quest', amount: '+420 Tokens', date: 'Oct 08, 2026', icon: '🪙', cur: 'Tokens' },
    { id: 'tx-5', type: 'spend', title: 'MacBook Pro M4 Entry', amount: '-800 VEs', date: 'Oct 05, 2026', icon: '💻', cur: 'VEs' },
    { id: 'tx-6', type: 'earn', title: 'Signup Welcome Reward', amount: '+1,000 VEs', date: 'Oct 01, 2026', icon: '🎁', cur: 'VEs' },
  ]

  const filtered = filter === 'all'
    ? mockTransactions
    : mockTransactions.filter(tx => tx.type === filter)

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Transaction History">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>📜</div>
          <div>
            <h3 className={styles.title}>Transaction History</h3>
            <p className={styles.sub}>Your real-time reward earnings and entry deductions</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">✕</button>
        </div>

        {/* Balance Snapshot */}
        <div className={styles.snapshot}>
          <div className={styles.snapItem}>
            <span className={styles.snapLabel}>💎 VEs</span>
            <span className={styles.snapVal}>{balances?.VEs?.toLocaleString() ?? '3,200'}</span>
          </div>
          <div className={styles.snapItem}>
            <span className={styles.snapLabel}>⚡ SVEs</span>
            <span className={styles.snapVal}>{balances?.SVEs?.toLocaleString() ?? '1,500'}</span>
          </div>
          <div className={styles.snapItem}>
            <span className={styles.snapLabel}>🪙 Tokens</span>
            <span className={styles.snapVal}>{balances?.Tokens?.toLocaleString() ?? '420'}</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterActive : ''}`}
            onClick={() => setFilter('all')}
          >
            All Activity
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'earn' ? styles.filterActive : ''}`}
            onClick={() => setFilter('earn')}
          >
            Earned (+)
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'spend' ? styles.filterActive : ''}`}
            onClick={() => setFilter('spend')}
          >
            Entries Spent (-)
          </button>
        </div>

        {/* List */}
        <div className={styles.list}>
          {filtered.map(tx => (
            <div key={tx.id} className={styles.txRow}>
              <div className={styles.txIcon}>{tx.icon}</div>
              <div className={styles.txInfo}>
                <p className={styles.txTitle}>{tx.title}</p>
                <span className={styles.txDate}>{tx.date}</span>
              </div>
              <span className={`${styles.txAmount} ${tx.type === 'earn' ? styles.earn : styles.spend}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.doneBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export function MyEntriesModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const mockEntries = [
    {
      id: 'ent-1',
      giveawayTitle: 'iPhone 16 Pro Max Giveaway',
      slug: 'iphone-16-pro-max',
      tickets: 3,
      spent: '1,500 VEs',
      date: 'Oct 11, 2026',
      status: 'Active',
      endsIn: '2 Days Left',
      image: '/assets/prizes/iphone16promax.png',
    },
    {
      id: 'ent-2',
      giveawayTitle: 'MacBook Pro M4 Giveaway',
      slug: 'macbook-pro-m4',
      tickets: 2,
      spent: '1,600 VEs',
      date: 'Oct 10, 2026',
      status: 'Active',
      endsIn: '7 Days Left',
      image: '/assets/prizes/macbook-pro-m4.png',
    },
  ]

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="My Entries">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>🎟️</div>
          <div>
            <h3 className={styles.title}>My Active Entries</h3>
            <p className={styles.sub}>Giveaways you are currently participating in</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">✕</button>
        </div>

        {/* Entries List */}
        <div className={styles.list}>
          {mockEntries.map(entry => (
            <div key={entry.id} className={styles.entryCard}>
              <img src={entry.image} alt={entry.giveawayTitle} className={styles.entryImg} />
              <div className={styles.entryInfo}>
                <h4 className={styles.entryTitle}>{entry.giveawayTitle}</h4>
                <div className={styles.entryMeta}>
                  <span className={styles.ticketsBadge}>🎟️ {entry.tickets} Entries</span>
                  <span className={styles.spentTag}>{entry.spent}</span>
                  <span className={styles.timerTag}>⏱️ {entry.endsIn}</span>
                </div>
              </div>
              <Link
                to={`/giveaway/${entry.slug}`}
                className={styles.viewLink}
                onClick={onClose}
              >
                View →
              </Link>
            </div>
          ))}
        </div>

        {/* Tip */}
        <p className={styles.entryTip}>
          💡 <strong>Tip:</strong> You can enter multiple times using VEs, SVEs, or Tokens to increase your winning odds!
        </p>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.doneBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
