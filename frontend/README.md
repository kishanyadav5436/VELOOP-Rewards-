# VELOOP Rewards — Giveaway Module

> **Phase 1 (Frontend)** — Fully mock-data driven, built to be a drop-in swap for a real backend in Phase 2.

A premium giveaway platform UI built for VELOOP Rewards, where users can enter exclusive giveaways using their earned VEs, SVEs, and Tokens.

---

## ✨ Features

- 🎁 **Giveaway listing** — Browse ACTIVE, UPCOMING, and ENDED giveaways
- ⏱️ **Live countdown** — Real-time ticking countdown for active giveaways
- 🏆 **Winners showcase** — Auto-scrolling winner slider + tabbed winners section
- 💳 **Join flow** — Balance check → Confirmation modal → Success state
- 🎖️ **Prize claim** — Physical shipping form or gift-card email, with claim states
- 📊 **Platform stats** — Total giveaways, winners, prize value at a glance
- 🔒 **Auth simulation** — Login/logout toggle with balance display (mock)
- 📱 **Fully responsive** — Mobile → Tablet → Desktop

---

## 🗂️ Folder Structure

```
frontend/src/
├── components/
│   ├── Navbar/              # Sticky nav with balance display
│   ├── Footer/              # Footer with links & newsletter
│   ├── GiveawayBanner/      # Top banner for featured live giveaway
│   ├── GiveawayHero/        # Hero section with particles
│   ├── GiveawayStats/       # Platform statistics grid
│   ├── FeaturedGiveaways/   # Prize cards grid
│   ├── PrizeCard/           # Individual giveaway card
│   ├── Countdown/           # HH:MM:SS countdown component
│   ├── WinnerSlider/        # Auto-scrolling winners marquee
│   ├── WinnersTabs/         # Current / Previous winners tabs
│   ├── WinnerCard/          # Card for current giveaway winner
│   ├── PreviousWinnerCard/  # Card for past winners
│   ├── HowToParticipate/    # Step-by-step timeline
│   ├── TrustSection/        # Trust signals grid
│   ├── GiveawayRules/       # Rules list
│   ├── FAQ/                 # Accordion Q&A
│   ├── JoinConfirmModal/    # Entry confirmation + balance deduct
│   ├── PrizeClaimModal/     # Physical / gift-card claim form
│   ├── BalanceIndicator/    # VEs / SVEs / Tokens display
│   ├── GiveawayLoader/      # Themed loading animation
│   ├── EmptyState/          # No-data state
│   ├── ErrorState/          # Error state with retry
│   └── Skeletons/           # Loading skeletons
│
├── pages/
│   ├── GiveawayHome/        # / — main listing page
│   ├── GiveawayDetails/     # /giveaway/:slug — detail page
│   └── NotFound/            # 404 page
│
├── data/
│   ├── giveawayData.js      # Mock API-shaped giveaway data
│   ├── mockSession.js       # Fake logged-in user + balances
│   └── mockWinners.js       # Recent winners data
│
├── hooks/
│   ├── useCountdown.js      # Live countdown timer
│   ├── useGiveawayStatus.js # Single source of truth: ACTIVE/UPCOMING/ENDED
│   ├── useBalanceCheck.js   # Can user afford the entry fee?
│   └── useGiveaway.js       # Wraps all service calls with loading/error state
│
├── context/
│   └── UserContext.jsx      # Mock auth, balances, deductBalance
│
├── services/
│   └── giveawayApi.js       # Stub functions (→ real fetch() in Phase 2)
│
├── utils/
│   ├── formatTime.js        # formatCurrency, timeAgo, formatDate
│   ├── maskUserId.js        # VE****42 style masking
│   └── currencyValidation.js # VEs/SVEs/Tokens rules
│
└── styles/
    ├── tokens.css           # Design tokens (colors, spacing, typography)
    └── global.css           # Base reset + .container + focus-visible
```

---

## 🛠️ Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Framework   | React 19 + Vite 8           |
| Routing     | React Router v7             |
| Styling     | CSS Modules + CSS Variables |
| Typography  | Inter + Outfit (Google Fonts)|
| Date utils  | date-fns                    |
| Linting     | oxlint                      |

---

## 🚀 Setup

```bash
cd frontend
npm install
npm run dev        # → http://localhost:5173
```

**Build for production:**
```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import the repository in Vercel and set **Root Directory** to `frontend`. Vercel
will detect Vite; use `npm run build` as the build command and `dist` as the
output directory. The included `vercel.json` rewrites app routes to the SPA
entry point so direct links such as `/giveaway/example` work after deployment.

The current app uses mock session and giveaway data; no backend environment
variables are required for this frontend deployment.

---

## 🏗️ Architecture Rules

1. **No hardcoded values** — every prize name, fee, and status comes from `data/` or `services/`
2. **`useGiveawayStatus` is the single source of truth** for ACTIVE/ENDED/UPCOMING
3. **Service layer is mock now, real later** — function signatures stay identical
4. **Frontend built as if the backend exists** — Phase 2 is a drop-in swap, not a rewrite

---

## 🔐 Mock Session

The app ships with a mock logged-in user (`kishan_y`, `VE9842`) with:
- **3,200 VEs** | **1,500 SVEs** | **420 Tokens**

Click the user button in the Navbar to toggle between logged-in and logged-out states.

---

## 📋 Giveaway Statuses

| Status   | Behaviour                                          |
|----------|----------------------------------------------------|
| ACTIVE   | Shows countdown, "Enter Now" button, balance check |
| UPCOMING | Shows "Coming Soon" — entry disabled               |
| ENDED    | Shows winner (if any), "Giveaway has ended" state  |

---

## 🔄 Phase 2 — Backend (Not started)

> **Do not start Phase 2 until the frontend is reviewed and approved.**

The `services/giveawayApi.js` functions are stubs. In Phase 2:
- Replace each function body with a real `fetch()` call
- Add MongoDB models, auth middleware, fraud checks
- Nothing else in the frontend needs to change

---

*Built by [Kishan Yadav](https://github.com/kishanyadav5436) for VELOOP Rewards — Internship Project.*
