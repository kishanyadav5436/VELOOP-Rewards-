import { useState, useEffect } from 'react'

/**
 * useCountdown — returns { days, hours, minutes, seconds, isExpired }
 * @param {string} endDate — ISO date string
 */
export function useCountdown(endDate) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(endDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(endDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [endDate])

  return timeLeft
}

function calcTimeLeft(endDate) {
  const diff = new Date(endDate) - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }

  return {
    days:      Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:     Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes:   Math.floor((diff / (1000 * 60)) % 60),
    seconds:   Math.floor((diff / 1000) % 60),
    isExpired: false,
  }
}
