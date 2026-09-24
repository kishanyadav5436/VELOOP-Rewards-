/**
 * giveawayApi.js
 * Service stub layer — returns mock data with fake delay.
 * In Phase 2: only these function bodies change to real fetch() calls.
 * Nothing else in the app needs to change.
 */

import { giveawaysData } from '../data/giveawayData'
import { recentWinners } from '../data/mockWinners'

const delay = (ms = 600) => new Promise(res => setTimeout(res, ms))

export async function getCurrentGiveaways() {
  await delay()
  return giveawaysData
}

export async function getGiveawayBySlug(slug) {
  await delay()
  const giveaway = giveawaysData.find(g => g.slug === slug)
  if (!giveaway) throw new Error('Giveaway not found')
  return giveaway
}

export async function joinGiveaway(giveawayId, userId, currency) {
  await delay(800)
  // Mock success — Phase 2 does real deduction + DB write
  return {
    success:     true,
    giveawayId,
    userId,
    currency,
    message:     'Successfully joined the giveaway!',
    entryNumber: Math.floor(Math.random() * 90000) + 10000,
  }
}

export async function submitClaim(giveawayId, userId, claimData) {
  await delay(1000)
  return {
    success:   true,
    claimId:   `claim-${Date.now()}`,
    giveawayId,
    userId,
    status:    'submitted',
    message:   'Claim submitted! We will process it within 3-5 business days.',
  }
}

export async function getRecentWinners() {
  await delay(400)
  return recentWinners
}
