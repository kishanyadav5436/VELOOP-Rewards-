import styles from './FeaturedGiveaways.module.css'
import PrizeCard from '../PrizeCard/PrizeCard'
import { useGiveaway } from '../../hooks/useGiveaway'
import GiveawayLoader from '../GiveawayLoader/GiveawayLoader'
import ErrorState from '../ErrorState/ErrorState'
import EmptyState from '../EmptyState/EmptyState'
import { CardSkeleton } from '../Skeletons/Skeletons'

export default function FeaturedGiveaways() {
  const { data: giveaways, loading, error } = useGiveaway()

  return (
    <section className={styles.section} id="giveaways" aria-label="All Giveaways">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>Active Giveaways</h2>
          <p className={styles.sub}>Enter using your VEs, SVEs, or Tokens</p>
        </div>

        {loading && (
          <div className={styles.grid}>
            {[1,2,3].map(n => <CardSkeleton key={n} />)}
          </div>
        )}

        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && giveaways?.length === 0 && (
          <EmptyState icon="🎁" title="No giveaways right now" message="Check back soon!" />
        )}

        {!loading && !error && giveaways?.length > 0 && (
          <div className={styles.grid}>
            {giveaways.map(g => <PrizeCard key={g.id} giveaway={g} />)}
          </div>
        )}
      </div>
    </section>
  )
}
