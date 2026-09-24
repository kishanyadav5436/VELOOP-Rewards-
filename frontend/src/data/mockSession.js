/**
 * mockSession.js
 * Fake logged-in user — swapped for real auth in Phase 2
 */

export const mockSession = {
  isLoggedIn: true,
  user: {
    id:       'usr-veloop-9842',
    userId:   'VE9842',
    username: 'kishan_y',
    email:    'kishan@example.com',
    avatar:   null,
    balances: {
      VEs:    3200,
      SVEs:   1500,
      Tokens: 420,
    },
    joinedAt: '2025-11-12T08:00:00.000Z',
  },
}

export const loggedOutSession = {
  isLoggedIn: false,
  user: null,
}
