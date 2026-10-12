import { useEffect, useRef } from 'react'
import styles from './GiveawayHero.module.css'
import { giveawaysData, platformStats, GIVEAWAY_STATUS } from '../../data/giveawayData'
import { formatCurrency } from '../../utils/formatTime'

export default function GiveawayHero() {
  const canvasRef = useRef(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setParallax({ x, y })
  }

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
    <section
      className={styles.hero}
      aria-label="VELOOP Giveaways Hero"
      onMouseMove={handleMouseMove}
    >
      {/* Background layers */}
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.gridLines} />
        <canvas ref={canvasRef} className={styles.particles} />
      </div>

      {/* Floating Currency & Achievement Badges (Interactive Parallax Micro-Interactions) */}
      <div className={styles.floatingAtmosphere} aria-hidden="true">
        <div
          className={`${styles.floatingCard} ${styles.floatCard1}`}
          style={{ transform: `translate3d(${parallax.x * -20}px, ${parallax.y * -15}px, 0)` }}
        >
          <div className={styles.floatIconWrap}>💎</div>
          <div className={styles.floatInfo}>
            <span className={styles.floatValue}>+500 VEs</span>
            <span className={styles.floatLabel}>Daily Reward</span>
          </div>
          <span className={styles.floatSparkle}>✨</span>
        </div>

        <div
          className={`${styles.floatingCard} ${styles.floatCard2}`}
          style={{ transform: `translate3d(${parallax.x * 18}px, ${parallax.y * -14}px, 0)` }}
        >
          <div className={`${styles.floatIconWrap} ${styles.iconGold}`}>⚡</div>
          <div className={styles.floatInfo}>
            <span className={styles.floatValue}>1,500 SVEs</span>
            <span className={styles.floatLabel}>Boost Multiplier</span>
          </div>
        </div>

        <div
          className={`${styles.floatingCard} ${styles.floatCard3}`}
          style={{ transform: `translate3d(${parallax.x * -16}px, ${parallax.y * 18}px, 0)` }}
        >
          <div className={`${styles.floatIconWrap} ${styles.iconGreen}`}>🪙</div>
          <div className={styles.floatInfo}>
            <span className={styles.floatValue}>420 Tokens</span>
            <span className={styles.floatLabel}>Ready to Enter</span>
          </div>
        </div>

        <div
          className={`${styles.floatingCard} ${styles.floatCard4}`}
          style={{ transform: `translate3d(${parallax.x * 22}px, ${parallax.y * 20}px, 0)` }}
        >
          <div className={styles.floatAvatar}>🏆</div>
          <div className={styles.floatInfo}>
            <div className={styles.floatUserRow}>
              <span className={styles.floatUser}>VE****42</span>
              <span className={styles.floatCheck}>✓</span>
            </div>
            <span className={styles.floatLabel}>Won PS5 • Verified</span>
          </div>
        </div>

        {/* Recent Reward Claim Badge */}
        <div
          className={`${styles.floatingCard} ${styles.floatCard5}`}
          style={{ transform: `translate3d(${parallax.x * 15}px, ${parallax.y * -22}px, 0)` }}
        >
          <div className={`${styles.floatIconWrap} ${styles.iconOrange}`}>🎁</div>
          <div className={styles.floatInfo}>
            <span className={styles.floatValue}>Claimed ₹10k Voucher</span>
            <span className={styles.floatLabel}>VE****55 • 3m ago</span>
          </div>
        </div>

        {/* Live Community Activity Pill */}
        <div
          className={`${styles.floatingCard} ${styles.floatCard6}`}
          style={{ transform: `translate3d(${parallax.x * -24}px, ${parallax.y * 14}px, 0)` }}
        >
          <span className={styles.claimDot} />
          <span className={styles.floatClaimText}>🔥 47+ Prizes Claimed This Month</span>
        </div>
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
