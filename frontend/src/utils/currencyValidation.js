/** currencyValidation.js — VEs / SVEs / Tokens validation rules */

const CURRENCY_RULES = {
  VEs:    { min: 1, max: 100000, label: 'VEs' },
  SVEs:   { min: 1, max: 50000,  label: 'SVEs' },
  Tokens: { min: 1, max: 10000,  label: 'Tokens' },
}

export function validateEntryFee(amount, currency, userBalance) {
  const rule = CURRENCY_RULES[currency]
  if (!rule) return { valid: false, error: `Unknown currency: ${currency}` }
  if (amount < rule.min) return { valid: false, error: `Minimum is ${rule.min} ${rule.label}` }
  if (amount > rule.max) return { valid: false, error: `Maximum is ${rule.max} ${rule.label}` }
  if (userBalance < amount) return { valid: false, error: `Insufficient ${rule.label} balance` }
  return { valid: true, error: null }
}

export function getSupportedCurrencies() {
  return Object.keys(CURRENCY_RULES)
}
