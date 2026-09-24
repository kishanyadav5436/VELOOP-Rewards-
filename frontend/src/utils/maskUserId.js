/** maskUserId.js — masks a user ID for public display */

export function maskUserId(userId) {
  if (!userId) return '****'
  const str = String(userId)
  if (str.startsWith('VE')) {
    return 'VE' + '*'.repeat(4) + str.slice(-2)
  }
  return str.slice(0, 2) + '*'.repeat(4) + str.slice(-2)
}
