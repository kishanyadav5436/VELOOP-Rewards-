import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'80vh',gap:'1rem',textAlign:'center',padding:'2rem' }}>
      <span style={{ fontSize:'5rem' }}>🎁</span>
      <h1 style={{ fontFamily:'var(--font-heading)',fontSize:'var(--text-4xl)',fontWeight:'var(--fw-extrabold)' }}>404</h1>
      <p style={{ color:'var(--color-text-secondary)' }}>This page doesn't exist.</p>
      <Link to="/" style={{ padding:'0.75rem 2rem',background:'var(--gradient-primary)',color:'#fff',borderRadius:'9999px',fontWeight:600 }}>
        Go Home
      </Link>
    </div>
  )
}
