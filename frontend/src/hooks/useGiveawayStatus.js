import { GIVEAWAY_STATUS } from '../data/giveawayData'

/**
 * useGiveawayStatus — single source of truth for giveaway status.
 * Every component uses this instead of checking dates/status themselves.
 * @param {object} giveaway
 * @returns {'ACTIVE'|'UPCOMING'|'ENDED'}
 */
export function useGiveawayStatus(giveaway) {
  if (!giveaway) return null

  const now = new Date()
  const start = new Date(giveaway.startDate)
  const end   = new Date(giveaway.endDate)

  if (now < start) return GIVEAWAY_STATUS.UPCOMING
  if (now > end)   return GIVEAWAY_STATUS.ENDED
  return GIVEAWAY_STATUS.ACTIVE
}
