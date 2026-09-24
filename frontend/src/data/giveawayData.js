/**
 * giveawayData.js
 * Mock API-shaped data for the VELOOP Giveaway Module.
 * Rule: Every component reads from here — never hardcodes prize names, fees, or statuses.
 */

export const GIVEAWAY_STATUS = {
  ACTIVE:   'ACTIVE',
  UPCOMING: 'UPCOMING',
  ENDED:    'ENDED',
};

export const PRIZE_TYPE = {
  PHYSICAL:  'physical',
  GIFT_CARD: 'gift-card',
  DIGITAL:   'digital',
};

/** @type {import('./types').Giveaway[]} */
export const giveawaysData = [
  {
    id:          'gw-001',
    slug:        'iphone-16-pro-max',
    title:       'iPhone 16 Pro Max Giveaway',
    description: 'Win the latest Apple iPhone 16 Pro Max 256GB in Titanium Black. The ultimate flagship smartphone with the most advanced camera system Apple has ever made.',
    status:      GIVEAWAY_STATUS.ACTIVE,
    prize: {
      id:          'prize-001',
      name:        'Apple iPhone 16 Pro Max 256GB',
      type:        PRIZE_TYPE.PHYSICAL,
      image:       '/assets/prizes/iphone16promax.png',
      value:       134900,
      currency:    'INR',
      description: 'Titanium Black | 256GB | A18 Pro Chip | 48MP ProRAW Camera',
    },
    entryFee: {
      amount:       500,
      currency:     'VEs',
      alternatives: [
        { amount: 250, currency: 'SVEs' },
        { amount: 50,  currency: 'Tokens' },
      ],
    },
    stats: {
      totalParticipants: 4872,
      totalEntries:      12340,
      maxParticipants:   null,
    },
    startDate:   '2026-09-20T00:00:00.000Z',
    endDate:     '2026-10-05T18:30:00.000Z',
    winner:      null,
    featured:    true,
    tags:        ['electronics', 'apple', 'smartphone'],
  },
  {
    id:          'gw-002',
    slug:        'macbook-pro-m4',
    title:       'MacBook Pro M4 Giveaway',
    description: 'Win a brand new MacBook Pro powered by the M4 chip. Perfect for developers, designers, and creators.',
    status:      GIVEAWAY_STATUS.ACTIVE,
    prize: {
      id:          'prize-002',
      name:        'Apple MacBook Pro 14" M4',
      type:        PRIZE_TYPE.PHYSICAL,
      image:       '/assets/prizes/macbook-pro-m4.png',
      value:       199900,
      currency:    'INR',
      description: 'Space Black | M4 Chip | 16GB RAM | 512GB SSD',
    },
    entryFee: {
      amount:       800,
      currency:     'VEs',
      alternatives: [
        { amount: 400, currency: 'SVEs' },
        { amount: 80,  currency: 'Tokens' },
      ],
    },
    stats: {
      totalParticipants: 6103,
      totalEntries:      18920,
      maxParticipants:   null,
    },
    startDate:   '2026-09-22T00:00:00.000Z',
    endDate:     '2026-10-10T18:30:00.000Z',
    winner:      null,
    featured:    true,
    tags:        ['electronics', 'apple', 'laptop'],
  },
  {
    id:          'gw-003',
    slug:        'amazon-gift-card-10000',
    title:       '₹10,000 Amazon Gift Card',
    description: 'Win a ₹10,000 Amazon Gift Card. Shop anything you want — electronics, fashion, books, groceries and more.',
    status:      GIVEAWAY_STATUS.UPCOMING,
    prize: {
      id:          'prize-003',
      name:        '₹10,000 Amazon Gift Card',
      type:        PRIZE_TYPE.GIFT_CARD,
      image:       '/assets/prizes/amazon-gift-card.png',
      value:       10000,
      currency:    'INR',
      description: 'Valid for 1 year | Redeemable on Amazon.in',
    },
    entryFee: {
      amount:       200,
      currency:     'VEs',
      alternatives: [
        { amount: 100, currency: 'SVEs' },
        { amount: 20,  currency: 'Tokens' },
      ],
    },
    stats: {
      totalParticipants: 0,
      totalEntries:      0,
      maxParticipants:   5000,
    },
    startDate:   '2026-10-01T00:00:00.000Z',
    endDate:     '2026-10-15T18:30:00.000Z',
    winner:      null,
    featured:    false,
    tags:        ['gift-card', 'amazon', 'shopping'],
  },
  {
    id:          'gw-004',
    slug:        'sony-ps5',
    title:       'Sony PlayStation 5 Giveaway',
    description: 'Win the Sony PlayStation 5 Disc Edition. Experience next-gen gaming with blazing-fast load times and immersive DualSense haptics.',
    status:      GIVEAWAY_STATUS.ENDED,
    prize: {
      id:          'prize-004',
      name:        'Sony PlayStation 5 Disc Edition',
      type:        PRIZE_TYPE.PHYSICAL,
      image:       '/assets/prizes/ps5.png',
      value:       54990,
      currency:    'INR',
      description: 'White | 1TB SSD | DualSense Controller included',
    },
    entryFee: {
      amount:       300,
      currency:     'VEs',
      alternatives: [
        { amount: 150, currency: 'SVEs' },
        { amount: 30,  currency: 'Tokens' },
      ],
    },
    stats: {
      totalParticipants: 9231,
      totalEntries:      28440,
      maxParticipants:   null,
    },
    startDate:   '2026-08-01T00:00:00.000Z',
    endDate:     '2026-09-01T18:30:00.000Z',
    winner: {
      userId:    'VE****42',
      username:  'VE****42',
      claimedAt: '2026-09-03T10:15:00.000Z',
      claimStatus: 'completed',
    },
    featured:    false,
    tags:        ['gaming', 'sony', 'console'],
  },
];

/** Platform-level stats shown in GiveawayStats section */
export const platformStats = {
  totalGiveawaysHeld:   47,
  totalWinnersSelected: 47,
  totalPrizeValueINR:   3_250_000,
  activeGiveaways:      giveawaysData.filter(g => g.status === GIVEAWAY_STATUS.ACTIVE).length,
  upcomingGiveaways:    giveawaysData.filter(g => g.status === GIVEAWAY_STATUS.UPCOMING).length,
};
