# ChainHabits

> Web3-powered habit tracker with social betting, streaks and tokenomics.

ChainHabits is a **habit tracking** and **social challenge** platform where users commit to routines, stake tokens, and get rewarded (or penalised) based on how well they stick to their habits.

- You join a **group challenge**.
- You define the **habits** you commit to (with difficulty levels).
- You **stake** an amount of tokens into a common pool (~ "betting" on your habits).
- Every day you log your progress:
  - manually (“I completed this habit”), or
  - automatically via integrations (Strava, Github, health APIs, etc.).
- At the end of the challenge:
  - scores are computed from your completion, difficulty and streaks,
  - a smart contract distributes the pot based on those scores,
  - you can claim your rewards on-chain.

Under the hood, the common pot is redistributed **pro-rata to your performance**, with a few configurable tiers. If everyone hits a high target (e.g. >90% of their points), then everyone simply gets back their full stake **plus a shared bonus**. Otherwise, users above a strong threshold (e.g. >85%) are guaranteed to recover their stake with a bonus, **funded by penalties from low performers** (e.g. <80%), who lose a small fraction of their stake for each missing percentage point (for example 0.5% per 1% of points not achieved). Top-tier users (e.g. >95%) can also receive extra non-monetary rewards like rare trophies or “skip habit” tokens. All thresholds and percentages are configurable per challenge.s

This repository focuses on the **web frontend**, built with **Next.js** in a **mobile-first** approach, and designed to plug into:

- a **smart contract backend** (on-chain, source of truth for money, stakes and rewards),
- a **lightweight NestJS API** (off-chain orchestration, scoring, integrations, caching),
- a **NoSQL database** (MongoDB / Firestore for logs, configs, and metadata).

---

## 🧠 Project Concept

### Core ideas

- **Commitment device**: make it painful to quit your habits by putting money at stake.
- **Social challenges**: you play in groups (friends, communities, companies).
- **Tokenomics / Web3**:
  - stake tokens into a shared pool,
  - earn back more than you staked if you perform well,
  - optional reward token / NFTs for streaks and achievements.

### At a high level

- **On-chain (smart contracts)**
  - Challenges (token used, minimum stake, dates, rules hash).
  - Stakes and challenge pot.
  - Final payout plan via a Merkle root.
  - Reward token and NFTs (optional).

- **Off-chain (backend + DB)**
  - Habit definitions and daily logs.
  - Integrations (Strava, Github, health APIs…).
  - Scoring algorithm & Merkle tree generation.
  - Social feed, notifications, analytics.

- **Clients**
  - Mobile app (React Native / Expo – product priority).
  - This **web app (Next.js)**, mobile-first:
    - easier for dev iteration and admin / coach dashboards,
    - still usable as a regular user client.

---

## 💰 Business model ideas

ChainHabits is designed to enable multiple, combinable revenue streams while staying aligned with the core mission: **help people stick to their habits without turning the product into a casino**.

High-level mix:

- 🔹 **Micro-monetisation B2C**: skip tokens + power-ups  
- 🔹 **Premium subscription**: advanced stats, automation, extra features  
- 🔹 **On-chain platform fees**: small transparent rake on challenge pots  
- 🔹 **B2B / teams & coaches**: companies and creators paying for their own challenges  
- 🔹 **Utility token & NFTs**: Web3-native ecosystem without “investment” promises  

### 1. Micro-monetisation (B2C): skips & power-ups

**Weekly skip rule (baseline idea):**

- By default, each user gets **1 free skip per week**:
  - they can miss one habit/day but still keep their points and streak.
- If they want to **skip a second habit** in the same week *and still get full points*, they have to **pay**.

This is extended into a proper system:

- **Skip tokens**:
  - Every user gets 1 free skip token per week.
  - Additional skip tokens can be bought (fiat or protocol token).
  - Hard cap per challenge/period (e.g. max 2–3 paid skips per month) to avoid abuse.

- **Contextual skips**:
  - “Sick day” skip (less harsh, different price/limit).
  - “Travel day” skip (for trips / jetlag), possibly bundled with calendar data.

- **Power-ups** (limited, not pure pay-to-win):
  - **Freeze Streak**: pause your streak for a few days (no points, but streak preserved).
  - **Double XP Day**: one day where your habit points are doubled.
  - **Streak Revival**: recover a broken streak once per challenge.
  - **Focus Booster**: temporarily increase the weight of selected “hard” habits.

Design constraints:

- hard limits per user/challenge,
- some power-ups can only be **earned** (not bought),
- keep economic impact bounded so that performance still matters more than spending.

### 2. Premium subscription (CleanHabits+)

A recurring subscription for heavy users who want more depth and automation:

- **Premium features**:
  - Advanced analytics:
    - detailed breakdown by habit type,
    - streak heatmaps,
    - “weakest days / hours” analysis,
    - recommendations.
  - Enhanced automation:
    - unlimited integrations (Strava, Apple Health, Google Fit, Github…),
    - auto-check rules (e.g. “if Strava says ≥30min run → auto-complete this habit”).
  - Access to **premium challenges**:
    - curated, higher-quality groups,
    - larger pots or better reward structures.

- **Quality-of-life perks**:
  - more free skips per month,
  - more active challenges in parallel,
  - exclusive visual themes and profile customisation,
  - special badges or cosmetic NFTs.

The subscription can be paid in fiat or the protocol’s token, with potential discounts for token usage.

### 3. On-chain platform fees

For every on-chain challenge:

- A small **platform fee** is taken from the pot (e.g. 1–5%), fully transparent:
  - visible in the challenge creation UI,
  - encoded in the smart contract.
- Variants:
  - community challenges with **low fees**,
  - premium / co-branded challenges with **higher fees** and extra services (support, coaching, content).

This fee is automatically routed on-chain to the protocol treasury or revenue addresses.

### 4. B2B: companies, teams & coaches

ChainHabits can be packaged for organisations:

- **For companies / teams**:
  - “ChainHabits for Teams”:
    - HR/wellbeing/productivity challenges for employees,
    - company-sponsored pots and rewards,
    - dashboards for participation and anonymised stats.
  - Business model:
    - per-seat pricing,
    - or per-challenge packs,
    - plus optional add-ons (custom branding, integrations, support).

- **For coaches / creators / influencers**:
  - They can create their **own challenges** (fitness, coding, language learning, etc.):
    - set entry fees and stakes,
    - design rules and content.
  - Revenue:
    - a share goes to the coach,
    - a share goes to ChainHabits as a platform fee.
  - ChainHabits provides:
    - infra (smart contracts + scoring backend),
    - dashboards,
    - participants management.

Long term, ChainHabits can evolve into a **“challenge-as-a-service”** platform for behaviour change.

### 5. Utility token & NFTs

Without turning the token into a speculative asset, ChainHabits can support:

- **Utility token (e.g. HABIT)**:
  - Used to:
    - pay for skip tokens and certain power-ups,
    - reduce platform fees if paying in HABIT,
    - access token-gated premium challenges.
  - Part of the token used for utilities can be:
    - **burned** (deflationary pressure),
    - or **redistributed** to top performers / long-term stakers.

- **NFTs**:
  - **Trophy NFTs**:
    - 30-day streak,
    - perfect challenge (0 missed days),
    - early bird (X days completed before 7am), etc.
  - **Pass NFTs**:
    - access to exclusive challenges,
    - cosmetic perks,
    - or mild boosts, within strict limits.

Monetisation:

- mint fees for certain NFTs,
- optional royalties on secondary markets,
- NFTs as part of premium bundles.

All of this is built under a guiding principle:  
> **Help people build habits, don’t exploit addiction.**  
So limits, transparency, and a clear health/progression angle are integral to the business model.

---

## 💻 Frontend – Web App (Next.js)

This repository focuses on the **web frontend** of ChainHabits: a **Next.js** (App Router) app, built **mobile-first** and designed to plug into:

- a **smart contract backend** (on-chain, source of truth for money, stakes and rewards),
- a **lightweight NestJS API** (off-chain orchestration, scoring, integrations, caching),
- a **NoSQL database** (MongoDB / Firestore for logs, configs, and metadata).

It is built to be:

- **Mobile-first**: layouts and navigation optimised for small screens first.
- **Web3-oriented**: wallet-based identity, crypto/finance visual codes.
- **Gamified**: streaks, badges, progress bars, playful interactions.
- **Mock-friendly**: all data can be mocked for now, but structure is ready for real APIs and contracts.

### Tech stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS (with a reusable design system)  
- **State / Data**:
  - React Query (or similar) for server data (mocked APIs),
  - lightweight client store (Context / Zustand) for UI state.
- **Web3 (planned / progressive integration)**:
  - wagmi + RainbowKit or Web3Auth for wallet connection,
  - viem/ethers for contract calls.

> Today, most data can be mocked. The architecture is ready to plug into:
> - NestJS REST API for habits/logs/challenges,
> - EVM smart contracts for join/claim.

### Visual identity

- **Dark theme first**:
  - dark backgrounds,
  - bright accent colours inspired by crypto / DeFi (blue/purple/cyan, gradients).
- **Finance + gaming codes**:
  - cards, charts, progress indicators,
  - neon / glowing accents on important actions,
  - badges for difficulty levels and tiers.
- **Micro-interactions**:
  - transitions on hover/tap,
  - subtle animations when completing habits,
  - animated streak indicators.

---

## 📱 Main Screens & Flows (Frontend)

The frontend should expose **all main product surfaces**, even if data is mocked.

### 1. Auth & Wallet

- Landing / login screen:
  - “Connect Wallet” (Web3Auth or RainbowKit style).
- Once connected:
  - display wallet address (shortened),
  - show current network (mocked pill),
  - use wallet as the primary identity.

### 2. Home / Today

- Overview of **today’s habits** across active challenges.
- Quick actions:
  - check/uncheck today’s habits,
  - see which ones were auto-validated via APIs (Strava, etc.).
- Visuals:
  - progress bar for today,
  - streak indicators (“5 days in a row”).

### 3. Challenges

#### Challenges list

- Cards for each challenge:
  - name (e.g. “Habitants”),
  - status (Upcoming / Active / Finished),
  - period (start/end),
  - total pot (mock),
  - number of participants.

#### Challenge detail

- Full details of one challenge:
  - description, rules summary,
  - stake token & minimum stake,
  - scoring tiers (≥80% / 50–80% / <50%), difficulty weights,
  - your own status:
    - not joined → CTA to *configure commitments* and *join*,
    - joined → your stake, your current score, time remaining.
- Side components:
  - leaderboard preview,
  - participants count,
  - history / past performance.

### 4. Commitments & Join Flow

A multi-step UI (can be a wizard or stacked screens):

1. **Select / define habits** for this challenge:
   - list of available habit templates,
   - ability to add custom habits,
   - each with difficulty (Easy / Medium / Hard) and frequency.
2. **Choose stake amount**:
   - show minStake + mock user balance,
   - input field with validation.
3. **Confirm & “sign”**:
   - simulate:
     - token approval,
     - join transaction.
   - show a stepper:
     - “Preparing transaction…”
     - “Joining challenge…”
     - “Joined successfully 🎉”

Right now, this flow can update **local / mocked state** instead of calling real contracts.

### 5. Daily Log (per Challenge)

- For a given challenge:
  - list user’s committed habits,
  - show difficulty and completion state for today,
  - allow manual “I’ve done this” toggles,
  - show icons for source:
    - manual,
    - Strava,
    - Github,
    - etc. (just mocked flags/labels).
- Additional:
  - aggregated stats for the current challenge,
  - remaining days, estimated tier / payout.

### 6. Social Feed

- Simple real-time-ish feed (mocked):
  - “0x1234… just completed day 15 in Habitants.”
  - “Your friend just overtook your streak in Deep Work challenge.”
- Allow simple reactions (likes/emojis – purely UI for now).

### 7. Profile & Stats

- Tied to wallet address:
  - display name, avatar, short address.
- Global stats:
  - total challenges joined,
  - overall streak record,
  - completion rate,
  - “XP” or score.
- NFT trophies area (mocked cards/icons).

### 8. Integrations / Settings

- Settings page:
  - “Connect Strava” / “Connect Github” / etc.
- For each integration:
  - show mock connection status,
  - clicking “Connect” simulates OAuth and toggles to “Connected”.
- This status should be reflected in the **Daily Log** view (auto-completed habits).
