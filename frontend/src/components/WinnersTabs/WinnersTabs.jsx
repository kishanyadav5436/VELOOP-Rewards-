import { useState } from 'react'
import styles from './WinnersTabs.module.css'
import WinnerCard from '../WinnerCard/WinnerCard'
import PreviousWinnerCard from '../PreviousWinnerCard/PreviousWinnerCard'
import { giveawaysData, GIVEAWAY_STATUS } from '../../data/giveawayData'
import { recentWinners } from '../../data/mockWinners'
import EmptyState from '../EmptyState/EmptyState'

export default function WinnersTabs() {
  const [tab, setTab] = useState('current')

  const activeGiveaways  = giveawaysData.filter(g => g.status === GIVEAWAY_STATUS.ACTIVE)
  const endedWithWinners = giveawaysData.filter(g => g.status === GIVEAWAY_STATUS.ENDED && g.winner)

  return (
    <section className={styles.section} aria-label="Giveaway Winners">
      <div className="container">
        <h2 className={styles.heading}>Winners</h2>

        <div className={styles.tabs} role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'current'}
            className={`${styles.tab} ${tab === 'current' ? styles.active : ''}`}
            onClick={() => setTab('current')}
          >
            Active Giveaway Winners
          </button>
          <button
            role="tab"
            aria-selected={tab === 'previous'}
            className={`${styles.tab} ${tab === 'previous' ? styles.active : ''}`}
            onClick={() => setTab('previous')}
          >
            Previous Winners
          </button>
        </div>

        <div role="tabpanel" className={styles.panel}>
          {tab === 'current' && (
            activeGiveaways.every(g => !g.winner)
              ? <EmptyState
                  icon="⏳"
                  title="Winners not selected yet"
                  message="The active giveaway is still running. Winners will be announced after it ends."
                />
              : <div className={styles.grid}>
                  {activeGiveaways.filter(g => g.winner).map(g => (
                    <WinnerCard key={g.id} giveaway={g} winner={g.winner} />
                  ))}
                </div>
          )}
          {tab === 'previous' && (
            <div className={styles.grid}>
              {recentWinners.map(w => <PreviousWinnerCard key={w.id} winner={w} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
