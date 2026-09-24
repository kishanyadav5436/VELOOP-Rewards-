import { useState, useEffect } from 'react'
import { getCurrentGiveaways, getGiveawayBySlug } from '../services/giveawayApi'

/**
 * useGiveaway — wraps service calls with loading/error state
 * @param {string|null} slug — if null, fetches all giveaways
 */
export function useGiveaway(slug = null) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const fetcher = slug ? getGiveawayBySlug(slug) : getCurrentGiveaways()

    fetcher
      .then(res => { if (!cancelled) setData(res) })
      .catch(err => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [slug])

  return { data, loading, error }
}
