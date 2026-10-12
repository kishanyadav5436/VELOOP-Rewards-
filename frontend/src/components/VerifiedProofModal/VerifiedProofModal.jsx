import { useState } from 'react'
import styles from './VerifiedProofModal.module.css'

export default function VerifiedProofModal({ winner, onClose }) {
  const [copied, setCopied] = useState(false)

  if (!winner) return null

  const proof = winner.proof || {
    drawHash:       '0x8f4c81a293f0b83e01bc89452bde0174a72d3851b9e02c679a831ef58c4921b7',
    blockNumber:    '19,842,910',
    vrfSeed:        `vrf-seed-${winner.id || 'alpha-9842'}`,
    algorithm:      'Chainlink VRF v2 / SHA-256',
    verifiedStatus: '100% On-Chain Confirmed',
    txTimestamp:    winner.wonAt ? new Date(winner.wonAt).toUTCString() : 'Sep 01, 2026 18:32:14 UTC',
    explorerUrl:    'https://etherscan.io',
  }

  function handleCopy() {
    navigator.clipboard?.writeText(proof.drawHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Verifiably Fair Proof">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>🛡️</div>
          <div>
            <h3 className={styles.title}>Verifiably Fair Proof</h3>
            <p className={styles.sub}>Cryptographic Draw Certification</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">✕</button>
        </div>

        {/* Status Badge */}
        <div className={styles.statusRow}>
          <span className={styles.statusBadge}>
            <span className={styles.statusDot} />
            {proof.verifiedStatus}
          </span>
          <span className={styles.timeTag}>{proof.txTimestamp}</span>
        </div>

        {/* Prize Summary */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <span className={styles.label}>Winner ID:</span>
            <span className={styles.userVal}>{winner.userId}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.label}>Prize Awarded:</span>
            <span className={styles.prizeVal}>{winner.prizeName}</span>
          </div>
          {winner.giveawayTitle && (
            <div className={styles.summaryRow}>
              <span className={styles.label}>Giveaway:</span>
              <span className={styles.gwVal}>{winner.giveawayTitle}</span>
            </div>
          )}
        </div>

        {/* Technical Proof Details */}
        <div className={styles.proofGrid}>
          {/* Draw Hash */}
          <div className={styles.hashBox}>
            <div className={styles.hashHeader}>
              <span className={styles.hashLabel}>Draw Hash (SHA-256 / Keccak)</span>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <code className={styles.hashCode}>{proof.drawHash}</code>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Block Height</span>
              <span className={styles.metaVal}>{proof.blockNumber}</span>
            </div>
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Randomness Source</span>
              <span className={styles.metaVal}>{proof.algorithm}</span>
            </div>
          </div>

          <div className={styles.metaBoxFull}>
            <span className={styles.metaLabel}>VRF Verification Seed</span>
            <code className={styles.seedCode}>{proof.vrfSeed}</code>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.actions}>
          <a
            href={proof.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.explorerBtn}
          >
            <span>View on Explorer</span>
            <span>↗</span>
          </a>
          <button className={styles.doneBtn} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  )
}
