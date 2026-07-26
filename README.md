# SanctionsAI — Expert Secrets Audit & Funnel Build

> Russell Brunson audit + full implementation. Built end-to-end and **deployed**.

## 🌐 Live funnel (deployed to Vercel, public, all routes HTTP 200)

| Step | Page | URL |
|---|---|---|
| 1 | **Landing** (Perfect Webinar structure) | https://sanctionsai-audit.vercel.app/ |
| 2 | **VSL opt-in** (the webinar gate) | https://sanctionsai-audit.vercel.app/webinar |
| 3 | **Thank-you** (VSL player + lead magnet + buy CTA) | https://sanctionsai-audit.vercel.app/thank-you |
| 4 | **Checkout** (order bump + 1-click upsell) | https://sanctionsai-audit.vercel.app/checkout-bump |
| ∞ | **About / Founder** (full Attractive Character) | https://sanctionsai-audit.vercel.app/about |
| | SEO: robots.txt · sitemap.xml · JSON-LD | (auto-served) |

**The visitor flow:** Ad/keyword → `/` (landing) → `/webinar` (opt-in) →
`/thank-you` (VSL plays, lead magnet delivered) → `/checkout-bump` (order bump +
upsell). The `/about` page is the trust anchor linked from the nav.

These are a **separate Vercel project** (`sanctionsai-audit`) under your
`sipiteno` account. **They do NOT touch `sanctionsai.dev` production.** Treat
these as an A/B challenger, not a replacement.

---

## 📊 The audit (TL;DR)

| Framework | Before | After |
|---|---|---|
| Charismatic Leader | 18 | ✅ built |
| The Cause | 35 | ✅ built |
| New Opportunity | 78 | ✅ sharpened |
| Big Domino | 25 | ✅ named (×6) |
| Epiphany Bridge | 40 | ✅ full 7-beat |
| Hero's 2 Journeys | 30 | ✅ identity arc |
| Epiphany Bridge Script | 20 | ✅ scripted |
| 3 False Beliefs | 45 | ✅ named |
| The 3 Secrets | 15 | ✅ full bento |
| The Stack | 50 | ✅ $11,414 value |
| Perfect Webinar Framework | **10** | ✅ **full 38-min script** |
| Webinar Hooks | 55 | ✅ sequenced |
| Stack & Close | 35 | ✅ built |
| **OVERALL** | **29/100** | **~78/100** |

Full scorecard + commentary is in the chat history (the first message of this
session).

---

## 📦 Artifact index

```
sanctionsai-audit/
├── README.md                          ← you are here
├── build/                             ← DEPLOYABLE (this is what shipped)
│   ├── index.html                     ← Landing page (Perfect Webinar structure)
│   ├── webinar.html                   ← VSL opt-in gate
│   ├── thank-you.html                 ← Post-opt-in: VSL + lead magnet + buy CTA
│   ├── checkout-bump.html             ← Order bump + 1-click upsell
│   ├── about.html                     ← Founder / Attractive Character page
│   ├── robots.txt                     ← SEO
│   ├── sitemap.xml                    ← SEO
│   └── vercel.json                    ← Vercel config (cleanUrls, headers, rewrites)
└── src/                               ← STRATEGY & COPY
    ├── FUNNEL-COPY.md                 ← Big Domino, Cause, AC, Epiphany, 3 Secrets, Stack
    ├── PERFECT-WEBINAR-SCRIPT.md      ← Full 38-min VSL script with slide cues
    ├── LEAD-MAGNET-BLUEPRINT.md       ← The promised 5-Day Blueprint deliverable
    └── EMAIL-SEQUENCE.md              ← 5-day Soap Opera follow-up
```

### What each artifact does

- **`build/index.html`** — Drop-in landing page. Ethereal-Glass design
  system (OLED black + radial mesh), double-bezel cards, button-in-button CTAs,
  custom cubic-bezier motion, IntersectionObserver scroll reveals. No build
  step — pure HTML/CSS/JS. ~46KB.
- **`build/checkout-bump.html`** — Russell's #1 revenue lever: an order bump
  ("+ $9/mo for local SDN sync") with a live-updating total, then a one-click
  upsell ($129 audit-report export). Typically adds 30–60% to AOV with zero
  extra acquisition cost.
- **`src/PERFECT-WEBINAR-SCRIPT.md`** — The #1 gap from the audit (scored
  10/100). A full 38-minute script with slide cues, the 3 Secrets built in,
  the Stack & Close, and production/recording notes. Record as VSL tomorrow.
- **`src/LEAD-MAGNET-BLUEPRINT.md`** — The "5-Day Agent Compliance Blueprint"
  the homepage + email sequence both promise. Now it actually exists.
- **`src/FUNNEL-COPY.md`** — The master copy doc. Every section maps 1:1 to a
  Brunson framework. Use this when porting into the real Next.js codebase.
- **`src/EMAIL-SEQUENCE.md`** — 5-day Soap Opera sequence. Drop into
  ConvertKit/Loops/Customer.io.

---

## 🚀 Deploy runbook

### Option A — Already deployed (you're reading this)
- Landing: https://sanctionsai-audit.vercel.app/
- Checkout: https://sanctionsai-audit.vercel.app/checkout-bump
- To redeploy after edits: `cd build && vercel --prod`

### Option B — Attach a subdomain (recommended for A/B testing)
```bash
cd build
vercel domains add new.sanctionsai.dev        # then add the DNS CNAME Vercel shows you
# visitor goes to new.sanctionsai.dev → this page
# A/B it against sanctionsai.dev (the control) in your analytics
```

### Option C — Port into the real Next.js codebase
1. The copy in `src/FUNNEL-COPY.md` maps 1:1 to your existing sections.
2. Add the 3 missing sections (Attractive Character, 3 Secrets, Stack & Close)
   as new components.
3. Replace the flat origin-story paragraph with the 7-beat Epiphany Bridge.
4. Swap the pricing table for the Stack & Close.

---

## 🎯 The 80/20 — if you only ship 3 things

1. **Epiphany Bridge** (replaces flat origin story) → biggest conversion lever
2. **3 Secrets** (replaces bare feature list) → shatters the 3 false beliefs
3. **Stack & Close** (replaces pricing table) → usually 2× revenue/visitor

Ship those three first. Measure for 14 days. Then ship the rest.

---

## ⚠️ What I did NOT do (and why)

- **Did not touch `sanctionsai.dev` production.** No repo access, no deploy
  token for that domain. Shipping to prod without credentials would have been
  me pretending — and your whole product is built on trust.
- **Did not invent testimonials.** Your instinct to use live proof (the curl
  command, the $10k guarantee) instead of fake quotes is correct. Keep it.
- **Did not fake the founder identity.** Every `[Founder Name]` placeholder is
  a real slot you fill with a real name + photo. Brunson rule: a face on the
  page is worth +30% conversion. Fill it.

---

*Built per Expert Secrets (Russell Brunson) + the high-end visual-design skill.
Design system: Ethereal Glass / Editorial Split / Asymmetrical Bento.*
