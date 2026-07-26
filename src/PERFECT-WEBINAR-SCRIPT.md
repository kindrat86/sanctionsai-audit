# SanctionsAI — The Perfect Webinar Script
*Russell Brunson's signature framework, applied to SanctionsAI.*
*Run time: ~38 minutes. Format: record as VSL or present live. Slide cues in [brackets].*

> **How to use this:** This is the exact script structure Russell uses to sell
> from stage and on webinars that have done 9 figures. It is *not* a feature
> presentation. It is a psychology presentation. The product barely appears
> until minute 28. That's intentional. By minute 28 they've already decided
> they need what you're selling — they just don't know what it costs yet.

---

## PART 0 — INTRODUCTION (Minutes 0–4)
*Goal: hook, qualification, authority, the Big Promise.*

### [SLIDE: Title — "Agent Compliance in 38 Minutes"]
**[On camera. Smile. Slow down.]**

> Hey, everybody. [Name] here.
>
> Over the next 38 minutes I'm going to show you the exact reason your AI agent
> is one transaction away from a $377,700 federal fine — and the one call you
> add to your payment path that makes that impossible.
>
> I know that number sounds dramatic. By minute 12 you'll know it's not. By
> minute 25 you'll know exactly how to fix it. And by minute 38, if it's a fit,
> I'll show you how to do it for less than the cost of a bad lunch.
>
> Two quick promises before we start.
>
> **Promise #1:** I'm not going to teach you compliance law. I'm not a lawyer,
> and you don't need to be one either. I'm going to show you the engineering
> pattern.
>
> **Promise #2:** If by minute 20 you don't think this applies to you, leave.
> No hard feelings. I'd rather you go build than sit through something that
> isn't yours.
>
> Sound fair? Cool. Let's go.

### [SLIDE: The Big Promise]
> Here's the one sentence I want you to leave with:
>
> **"If your AI agent sends money to a sanctioned wallet even once, you are
> personally on the hook for $377,700 — and the only thing standing between you
> and that fine is one HTTP call before every payment."**
>
> If you don't believe me now, you will in about 6 minutes.

---

## PART 1 — THE ORIGIN STORY / EPIPHANY BRIDGE (Minutes 4–12)
*Goal: give them YOUR epiphany so they have it themselves.*

### [SLIDE: 3:14 AM]
> Three years ago, I was a payment-rails engineer.
>
> x402. Stablecoin flows. Agent-to-agent payments. I loved this stuff. Fast,
> cheap, borderless. I genuinely believed the future of software was agents
> paying agents, 24/7, no human in the loop.
>
> My dream was simple: wake up, check the dashboard, see two hundred
> transactions that all ran cleanly overnight. No approvals. No tickets. Just
> commerce, automated.

### [SLIDE: The assumption I was wrong about]
> And I held one assumption. One belief that I never even questioned:
>
> **I assumed the payment rail checked the counterparty.**
>
> I assumed that if a wallet was on a sanctions list, the rail would just…
> decline it. Like a credit card. Right?
>
> [Beat. Look at camera.]
>
> Wrong.

### [SLIDE: The discovery — OFAC SDN search]
> At 3:14 in the morning, I was debugging a failed transaction. Random gas
> estimate had bombed. Out of curiosity — not even caution, just curiosity —
> I copied the destination wallet and pasted it into the OFAC SDN search box.
>
> I hit Enter.

### [SLIDE: "It was there."]
> It was there.
>
> Black on white. On the list.
>
> The agent had tried to pay a sanctioned wallet. It had no idea. The rail had
> no idea. Nothing stopped it except a random gas-estimate bug.
>
> [Long pause.]
>
> If that bug hadn't fired — if the gas estimate had come back normal — the
> transaction would have settled. And I would have woken up to a $377,700 fine.
>
> Before breakfast.

### [SLIDE: The change of belief]
> I spent the next week learning what every payment engineer eventually learns:
>
> **The rails move money. They do not verify recipients.**
>
> OFAC enforcement doesn't care that "the AI did it." They don't care that the
> framework should have caught it. The human who built the agent is on the hook.
>
> Every. Single. Time.

---

## PART 2 — THE 3 SECRETS (Minutes 12–28)
*Goal: shatter the 3 false beliefs (Vehicle, Internal, External) with 3 stories.*

> Okay. So that was my 3:14 AM. Now I want to show you the three beliefs that
> kept me exposed that night — because if you're shipping agent payments, you
> hold at least one of them right now.

### ━━━ SECRET #1 — THE VEHICLE (Minutes 12–17)
### [SLIDE: Secret #1 — The Vehicle]

> **Belief #1:** "The payment rail checks the counterparty."
>
> I want you to feel how obvious this felt. I'm an engineer. I'd used Stripe. I
> knew what a chargeback was. I knew Visa declined stolen cards. So when I
> moved to crypto rails, I just… assumed the equivalent existed.
>
> Here's the story of how I learned it doesn't.
>
> [Story: a friend / a HN thread / a founder you read about — pick a real
> second-hand example here, e.g.:] A few weeks after my own scare, I saw a post
> from a founder whose agent had settled a small tx — like $400 — to a wallet
> that had been added to the SDN list two days earlier. Two days. The list had
> literally changed under him. He got a letter. He spent six figures on lawyers
> proving he wasn't deliberately laundering.
>
> The rail didn't warn him. The rail has no idea what OFAC is. The rail moves
> bytes.
>
> [Pivot to the teaching moment.]
>
> So here's the reframe. Compliance is not a feature of the rail. Compliance is
> a *separate layer*. If you don't add it, nobody adds it for you. And "the rail
> should have caught it" is not a defense the feds accept.
>
> Once I saw that, the fix was almost insulting.

### [SLIDE: The Fix #1]
> One function call. Wallet in, boolean out. Before settle.
>
> `clean` → proceed. `flagged` → halt. Under 100 milliseconds.
>
> That's Secret #1. The vehicle doesn't check. You add the check.

### ━━━ SECRET #2 — THE INTERNAL BELIEF (Minutes 17–22)
### [SLIDE: Secret #2 — Internal]

> **Belief #2:** "I'm not a compliance person. I'll deal with this later."
>
> This one almost got me worse than the first one. Because even after my 3:14 AM,
> I still put the fix off for months.
>
> Why? Because in my head, "compliance" meant: GRC certification. Sales calls
> with a compliance officer. A six-figure Chainalysis contract. Procurement.
> Legal review. It felt like enterprise paperwork. Not my world.
>
> [Story: the moment this collapsed.]
>
> Then one weekend I actually read what OFAC screening *is*. And I laughed.
> Because it's a lookup. Address in, boolean out. That's the whole product.
>
> The hard part isn't the lookup. The hard part is: keeping the SDN list
> current (it updates constantly), writing the audit trail (regulators want
> receipts), and knowing which rail is which (x402 vs AP2 vs ACP).
>
> *That's* the part a service does for you. The part *you* do is four lines of
> code.

### [SLIDE: The 4-Gate Protocol]
> It's called the 4-Gate Protocol.
>
> **SCREEN** → `sanctions_check(wallet)` — is the counterparty flagged?
> **SCORE** → `risk_score(tx)` — is the transaction itself weird?
> **STOP** → if `!clean`: HALT — fail closed, save the receipt.
> **STAMP** → `save receipt(rcpt_id)` — the artifact your lawyer wants.
>
> One function. In your payment path. Under 100ms. You stay a builder. The
> service stays the compliance nerd.
>
> That's Secret #2. You don't become a compliance person. You add four lines.

### ━━━ SECRET #3 — THE EXTERNAL BELIEF (Minutes 22–28)
### [SLIDE: Secret #3 — External]

> **Belief #3:** "A $19/month tool can't be real compliance."
>
> This is the one I get in every DM. So I'm going to address it head-on.
>
> When something is cheap, engineers assume it's a toy. Enterprise software
> costs six figures because it's *serious*, right?
>
> [Story: why this is backwards here.]
>
> Here's why it's the opposite for sanctions screening. The expensive tools —
> Chainalysis, Elliptic — were built for banks. Their cost comes from
> onboarding, custodial key handling, human review queues, and a sales org.
> None of that is the screening. The screening is a lookup.
>
> So we stripped out everything that isn't the screening, and we made the
> screening stateless, keyless, and fast. And then — because I knew nobody
> would believe it — we did the one thing that ends the argument.

### [SLIDE: The $10,000 Guarantee]
> We put $10,000 on it.
>
> If we return `clean: true` for a counterparty that's actually on the OFAC SDN
> list, **we cover the first $10,000 of your legal fees.** In writing. Real
> claim process.
>
> And because the thing a regulator actually asks for is an audit trail, every
> check ships with a receipt-of-record. The exact artifact your lawyer hands
> over.
>
> That's Secret #3. It's real compliance. We bet $10,000 on it.

---

## PART 3 — THE STACK & CLOSE (Minutes 28–38)
*Goal: build the value stack → drop the price → risk reversal → urgency → CTA.*

### [SLIDE: "Here's what you get"] (Minutes 28–31)
> Okay. So if you're still here, I'm going to assume Secret #3 worked and you
> believe this is real. So let me show you exactly what you get when you start.
>
> **Number one:** 10,000 sanctions checks a month. 947 OFAC wallets. Under 100ms
> each. Fail-closed. That on its own — if you priced it at a quarter a check —
> is $240 a month.
>
> **Number two:** All four API primitives. sanctions_check, risk_score,
> kya_verify, dispute_open. The full toolkit. $480.
>
> **Number three:** The 4-Gate Agent Payment Protocol and the runnable playbook.
> The exact pattern, the code, the deploy checklist. People pay consultants
> five figures for this. We charge $297.
>
> **Number four — and this is the big one:** The $10,000 Screening Guarantee.
> If we say clean and we're wrong, we pay your first ten grand in legal fees.
> That's worth $10,000.
>
> **Number five:** Audit-trail receipts on every single check. The artifact a
> regulator asks for. $180.
>
> **Number six:** Priority SLA and custom risk rules. $120.
>
> **Number seven:** The 5-Day Agent Compliance Blueprint. The email course. $97.
>
> [Slow down.]

### [SLIDE: The total]
> Add it up.
>
> $240 + $480 + $297 + $10,000 + $180 + $120 + $97.
>
> That's **$11,414 of real value.**

### [SLIDE: The price drop] (Minute 31)
> You don't pay $11,414.
>
> You don't pay $1,000.
>
> You don't pay $100.
>
> Your price today is **$19 a month.**
>
> [Pause. Let it land.]
>
> Less than a dollar a day. Less than the cost of a single SanctionsAI check
> going wrong would cost you — which is to say, less than 0.005% of one fine.

### [SLIDE: Risk reversal] (Minute 32)
> Now, I know what you're thinking. "What if it doesn't work for my stack?"
>
> Two answers.
>
> One: there's a free tier. Five checks a day, forever, no signup. Try it on
> your actual stack before you ever pay us a cent.
>
> Two: the $10,000 guarantee. Cancel in one click. No contract. If we're wrong,
> *we* pay.
>
> The only person carrying risk here is me.

### [SLIDE: Urgency] (Minute 33)
> So why not just "do it later"?
>
> Because the OFAC SDN list is not static. It updates constantly. Wallets get
> added every single week. The counterparty your agent pays tomorrow may not be
> flagged today.
>
> Every payment your agent makes without a screen is a roll of the dice on
> $377,700.
>
> My 3:14 AM happened on a wallet that was added to the list days before. I got
> lucky. Most people don't.

### [SLIDE: The CTA] (Minutes 34–36)
> So here's what I want you to do.
>
> If this is a fit, go to **sanctionsai.dev**, click "Get my API key," start on
> the Dev tier for $19 a month. You'll be screening in under five minutes.
>
> If you're not sure, start free. Five checks a day. No credit card. Run it
> against your real wallet history and see what it catches. Then decide.
>
> Either way — do it today. Before your next agent payment.

### [SLIDE: Recap / final story] (Minutes 36–38)
> Three years ago, at 3:14 AM, my agent tried to pay a sanctioned wallet.
>
> The only reason I'm standing here instead of in a lawyer's office is a random
> gas-estimate bug.
>
> I built SanctionsAI so that your outcome doesn't depend on a bug. It depends
> on one call. Before every payment. `clean` or `flagged`.
>
> That's it. That's the whole company.
>
> Go to sanctionsai.dev. I'll see you inside.
>
> [Wave. Out.]

---

## PRODUCTION NOTES

### Recording
- **One take, two angles.** Wide shot for slides; tight close-up for the 3:14 AM
  story and the price drop. The close-up on "nineteen dollars a month" is worth
  more than any other second of video.
- **Audio > video.** A $300 mic will outperform a $5,000 camera. Get a Sennheiser
  or a Shure SM7B. Compression + de-ess in post.
- **Length:** 38 min is the target. Russell's data: conversions hold to ~45 min,
  then drop. Cut, don't add.

### Slides
- **Dark background, light text.** Matches the brand. One idea per slide. No
  bullet lists longer than 4 items.
- **The "It was there" slide is the page turn.** Hold it in silence for 3 seconds.
- **The price-drop sequence is three separate slides**, not one. Each one
  lands harder. `$11,414` → `$100` → `$19`. Show the gap visually.

### Funnel placement
- Behind the opt-in on the homepage. **Email captures the lead, VSL sells it.**
- Auto-play on the thank-you page. Russell's rule: no controls on the VSL for
  the first 60 seconds — make them commit to watching.
- Retarget anyone who watches >50% but doesn't buy with the Stack slide as a
  static image ad.

### What to measure
- **VSL watch-through curve.** If it drops at Secret #2, your internal-belief
  story is weak. Rewrite it.
- **Click-to-buy from the CTA slide.** Target >8% of viewers. Russell's good
  webinars do 10–15%.
- **AOV with the order bump (separate doc).** Target +30%.

### A/B the hooks
Your three candidate webinar titles. Test them as Facebook/YouTube ad creative
first — cheapest signal — before recording the full VSL:
1. *"Your agent paid a sanctioned wallet at 3 AM."* (fear — currently winning)
2. *"The 4 lines of code that stop a $377,700 fine."* (curiosity + utility)
3. *"Why your payment rail is lying to you."* (pattern-interrupt)
