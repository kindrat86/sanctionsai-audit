# SanctionsAI — Expert Secrets Funnel Rewrite
*Russell Brunson framework rewrite. Drop-in copy for sanctionsai.dev.*

This document maps every section to a Brunson framework so the next person
who touches the page knows *why* each block exists.

---

## 0. THE BIG DOMINO (The One Thing — Ch.4)
> If I can make the prospect believe ONE thing, every other objection falls.

**The One Belief:**
> "If my AI agent sends money to a sanctioned wallet even *once*, I'm personally
> on the hook for a **$377,700 fine** — and the only thing standing between me
> and that fine is **one HTTP call before every payment.**"

**Rule:** This sentence (or a close variant) appears 5× on the page:
hero subhead, after the origin story, in the 4-Gate section, in the Stack,
and in the final CTA. Repetition = belief.

---

## 1. THE CAUSE / MASS MOVEMENT (Ch.2)
**Placement:** New band directly under the nav, above the hero.

> **A movement, not a tagline:**
> "Every AI agent is about to start moving money on its own.
> The payment rails are ready. The wallets are ready. The models are ready.
> The **one thing missing** is the compliance layer that keeps the builders
> out of federal court.
>
> **We're building that layer.** Join 1,000+ builders shipping agent payments
> without the legal nightmare."

CTA: `Join the builder list →` (this is the *movement* opt-in, separate from
the product trial).

---

## 2. THE ATTRACTIVE CHARACTER (Ch.1, Ch.6)
**Placement:** Right after hero, before the origin story. Founder card.

> ### Hi, I'm [Founder Name].
> Three years ago I was a payment-rails engineer who thought "compliance"
> was a problem for banks, not for me.
>
> Then, at 3:14 AM, my own agent almost wired money to a wallet that turned
> out to be on the OFAC SDN list. The only reason it didn't go through was a
> fluke — a failed gas estimate that paused the tx.
>
> That was the night I stopped sleeping. And the night I started building this.
>
> I'm not a compliance lawyer. I'm a builder, like you. I built SanctionsAI so
> that builders like us can ship autonomous payments **without a federal
> investigation as our launch event.**
>
> — [Name], founder

**Identity archetype:** Reluctant Hero / Adventurer.
**Photo:** real headshot. **Video:** 90-sec version of the above.

---

## 3. THE EPIPHANY BRIDGE — Origin Story (Ch.5, Ch.7)
*Full 7-beat script. This replaces the 3 flat paragraphs currently on the page.*

**① BACK-STORY**
> I'd been building on payment rails for years. x402, stablecoin flows,
> agent-to-agent payments. I loved it. Fast, cheap, borderless. I thought I'd
> found the future of software — agents paying agents, 24/7, no human in the loop.

**② THE DREAM**
> My dream was simple: let an AI agent buy, sell, and settle on its own. Wake
> up, check the dashboard, see 200 transactions that all ran cleanly overnight.
> No approvals. No tickets. Just commerce, automated.

**③ THE FALSE BELIEF (the thing I was wrong about)**
> Here's what I assumed: *the payment rail checks the counterparty.* I assumed
> that if a wallet was on a sanctions list, the rail would just… refuse. Like a
> credit card decline. Right?

**④ THE DISCOVERY**
> At 3:14 AM I was debugging a failed tx. Out of curiosity I copied the
> destination wallet and pasted it into the OFAC SDN search. I hit Enter.

**⑤ THE EPIPHANY (the "oh crap" moment)**
> It was there. Black on white. On the list.
> The agent had tried to pay a sanctioned wallet. It had *no idea*. The rail had
> *no idea*. Nothing had stopped it except a random gas-estimate bug.
> If that bug hadn't fired, the transaction would have settled — and I would
> have been personally looking at a **$377,700 fine** before breakfast.

**⑥ THE CONFLICT / CHANGE OF BELIEF**
> I spent the next week learning what every payment engineer eventually learns:
> **the rails move money. They do not verify recipients.** OFAC enforcement
> doesn't care that "the AI did it." The human who built the agent is on the hook.
> Every. Single. Time.

**⑦ THE NEW VEHICLE**
> So I built the thing I wished existed that night: one HTTP call my agent makes
> before every payment. `clean` = proceed. `flagged` = halt. Under 100ms. No
> keys, no contracts, no six-figure enterprise sales call.
>
> That's SanctionsAI. And this page is me handing it to you, so your 3:14 AM
> never happens.

---

## 4. THE 3 SECRETS (Ch.8, Ch.9) — each shatters a false belief
*These replace the flat "features" section. Each is Secret → Story → Fix.*

### SECRET #1 — shatters the VEHICLE false belief
> **"The payment rails (x402, USDC, agent-to-agent) do NOT check OFAC. Here's
> why that's the most expensive assumption in your codebase."**
>
> *Story:* My agent almost paid a sanctioned wallet because I assumed the rail
> declined bad counterparties. It doesn't. The rail moves bytes that represent
> money. Compliance is a *separate* layer — and if you don't add it, no one else
> will. The feds don't accept "the rail should have caught it" as a defense.
>
> *The Fix:* One `sanctions_check` call before settle. 947 OFAC wallets, under
> 100ms, fail-closed.

### SECRET #2 — shatters the INTERNAL false belief
> **"You don't have to become a compliance person to be compliant. You have to
> add 4 lines of code."**
>
> *Story:* I put off compliance for months because it felt like "enterprise
> paperwork." Then I realized OFAC screening is just a lookup — address in,
> boolean out. The hard part (the list, the updates, the audit trail) is what
> SanctionsAI does for you. You stay a builder. We stay the compliance nerds.
>
> *The Fix:* The 4-Gate Protocol — SCREEN, SCORE, STOP, STAMP — fits in a single
> function. Copy-paste from the playbook. No GRC certification required.

### SECRET #3 — shatters the EXTERNAL false belief
> **"This actually protects you in court — and I'll put $10,000 on it."**
>
> *Story:* A lot of devs assume a $19/mo tool "can't be real compliance." So we
> made the guarantee absurd: if we return `clean: true` for a counterparty
> that's actually on the OFAC SDN list, **we cover the first $10,000 of your
> legal fees.** Plus a full audit trail on every check — the exact artifact a
> regulator asks for.
>
> *The Fix:* The Dev tier ships with the $10k Screening Guarantee + receipt-of-
> record on every call. Verify it yourself with one curl command, right now.

---

## 5. THE STACK & CLOSE (Ch.10, Ch.13)
**Placement:** Replaces the current pricing table. This is the *value stack*.

> ### Here's everything you get when you start today:
>
> | # | Component | Real value |
> |---|---|---|
> | 1 | **10,000 sanctions checks/mo** (947 OFAC wallets, <100ms) | $240 |
> | 2 | **All 4 API primitives** — sanctions_check, risk_score, kya_verify, dispute_open | $480 |
> | 3 | **The 4-Gate Agent Payment Protocol™** + runnable playbook | $297 |
> | 4 | **$10,000 Screening Guarantee** (we pay your first $10k in legal fees) | $10,000 |
> | 5 | **Audit-trail receipts** on every check (regulator-ready) | $180 |
> | 6 | **Priority SLA + custom risk rules** | $120 |
> | 7 | **The 5-Day Agent Compliance Blueprint** (email course) | $97 |
> | | **Total real value** | **$11,414** |
>
> ### Your price today: **$19/month.**
> (Free forever tier: 5 checks/day, no signup. Start there if you want.)
>
> **Risk reversal:** $10,000 guarantee. Cancel in one click. No contract.
> **Urgency:** The OFAC SDN list updates constantly. The wallet your agent pays
> tomorrow might not be flagged today. Every payment without a screen is a roll
> of the dice on $377,700.
>
> `[ Get my API key — $19/mo → ]`  `[ Start free — 5 checks/day → ]`

---

## 6. THE 5-DAY SOAP OPERA SEQUENCE (follow-up)
*Behind the free lead magnet. Subject lines are the most important line.*

**Day 1 — Set the stage (High drama, open loop)**
> **Subject:** the 3:14 AM tx that almost ended me
> **Body:** The Epiphany Bridge origin story (Section 3 above). End on a cliffhanger:
> "Tomorrow I'll show you the one line of code that would have stopped it — and
> why almost no agent in production has it."

**Day 2 — High drama (epiphany)**
> **Subject:** why your payment rail is lying to you
> **Body:** Secret #1 — rails don't check OFAC. Open loop into tomorrow.

**Day 3 — High drama (conflict)**
> **Subject:** "I'm not a compliance person" — yes you are, here's the 4 lines
> **Body:** Secret #2 + the 4-Gate Protocol. Drop in the code snippet.

**Day 4 — The Stack (bring the heat)**
> **Subject:** the $10,000 bet I'm making on you
> **Body:** Secret #3 + the full Stack & Close from Section 5.

**Day 5 — Urgency / call to action (the pitch)**
> **Subject:** the next wallet your agent pays
> **Body:** "The SDN list updates constantly. The wallet your agent pays tomorrow
> might not be flagged today. [Get your API key →]"

---

## 7. PLACEMENT MAP (what goes where on the page)
```
NAV ─────────────────────────────────────────────
[CAUSE BAND]              ← Ch.2 mass movement
[HERO] hook + Big Domino  ← Ch.4, Ch.12
[ATTRACTIVE CHARACTER]    ← Ch.1, Ch.6
[EPIPHANY BRIDGE story]   ← Ch.5, Ch.7
[THE 3 SECRETS]           ← Ch.8, Ch.9
[NEW OPPORTUNITY compare] ← Ch.3 (keep existing, sharpen)
[THE 4 PRIMITIVES]        ← keep existing (features)
[THE STACK & CLOSE]       ← Ch.10, Ch.13
[FAQ / final risk reversal]
[FOOTER + movement opt-in]
```
