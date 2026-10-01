import { useEffect, useRef } from 'react'
import styles from './GiveawayHero.module.css'
import { giveawaysData, platformStats, GIVEAWAY_STATUS } from '../../data/giveawayData'
import { formatCurrency } from '../../utils/formatTime'

export default function GiveawayHero() {
  const canvasRef = useRef(null)

  // Animated sparkle particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.4,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      particles.forEach(p => {
        p.y -= p.speed
        p.x += p.drift
        p.opacity += (Math.random() - 0.5) * 0.02
        p.opacity = Math.max(0.1, Math.min(0.7, p.opacity))
        if (p.y < -10) { p.y = canvas.offsetHeight + 10; p.x = Math.random() * canvas.offsetWidth }
        if (p.x < -10 || p.x > canvas.offsetWidth + 10) p.x = Math.random() * canvas.offsetWidth
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(155, 114, 245, ${p.opacity})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const activePrizes = giveawaysData
    .filter(g => g.status === GIVEAWAY_STATUS.ACTIVE)
    .slice(0, 3)

  return (
    <section className={styles.hero} aria-label="VELOOP Giveaways Hero">
      {/* Background layers */}
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.gridLines} />
        <canvas ref={canvasRef} className={styles.particles} />
      </div>

      <div className={`container ${styles.content}`}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          🎁 VELOOP Rewards Giveaways
        </div>

        {/* Headline */}
        <h1 className={styles.heading}>
          Win <span className={styles.highlight}>Premium Prizes</span>
          <br />
          Every Month
        </h1>

        {/* Subtitle */}
        <p className={styles.subtext}>
          Use your VEs, SVEs, or Tokens to enter exclusive giveaways.
          <br />
          Real prizes. Real winners. 100% transparent.
        </p>

        {/* Floating Prize Previews */}
        {activePrizes.length > 0 && (
          <div className={styles.prizePreview}>
            {activePrizes.map((g, i) => (
              <div
                key={g.id}
                className={styles.prizeChip}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {g.prize.image ? (
                  <img
                    src={g.prize.image}
                    alt={g.prize.name}
                    className={styles.prizeImg}
                  />
                ) : (
                  <span className={styles.prizeEmoji}>🎁</span>
                )}
                <span className={styles.prizeName}>{g.prize.name}</span>
                <span className={styles.prizeTag}>{formatCurrency(g.prize.value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stats Bar */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{platformStats.totalGiveawaysHeld}+</span>
            <span className={styles.statLabel}>Giveaways Held</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{platformStats.totalWinnersSelected}+</span>
            <span className={styles.statLabel}>Winners Selected</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{formatCurrency(platformStats.totalPrizeValueINR)}</span>
            <span className={styles.statLabel}>Total Prize Value</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={`${styles.statValue} ${styles.liveVal}`}>
              {platformStats.activeGiveaways}
            </span>
            <span className={styles.statLabel}>Live Now</span>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.actions}>
          <a href="#giveaways" className={styles.btnPrimary}>
            <span>Browse Giveaways</span>
            <span className={styles.btnArrow}>→</span>
          </a>
          <a href="#how-to" className={styles.btnOutline}>How It Works</a>
        </div>
      </div>
    </section>
  )
}
