import { useUser } from '../context/UserContext'

/**
 * useBalanceCheck — checks if user can afford a giveaway entry fee.
 * @param {object} entryFee — { amount, currency }
 * @returns {{ canAfford: boolean, userBalance: number, shortfall: number }}
 */
export function useBalanceCheck(entryFee) {
  const { balances, isLoggedIn } = useUser()

  if (!isLoggedIn || !entryFee) {
    return { canAfford: false, userBalance: 0, shortfall: 0 }
  }

  const userBalance = balances[entryFee.currency] ?? 0
  const canAfford   = userBalance >= entryFee.amount
  const shortfall   = canAfford ? 0 : entryFee.amount - userBalance

  return { canAfford, userBalance, shortfall }
}
