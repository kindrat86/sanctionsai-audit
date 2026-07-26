# SanctionsAI — 5-Day Soap Opera Email Sequence
*Drop into ConvertKit / Loops / Customer.io. Plain-text performs best — no templates.*

**Trigger:** Opt-in to "The 5-Day Agent Compliance Blueprint" (the lead magnet
on the homepage). Send time: 8 AM user-local. From-name: `[Founder Name] @ SanctionsAI`.
Reply-to: a real inbox. Every email ends with one link.

**The arc:** Set the Stage → High Drama (epiphany) → High Drama (conflict) →
The Stack (bring the heat) → Urgency / pitch.

---

## EMAIL 1 — Day 1 · Set the Stage
**Subject:** the 3:14 AM tx that almost ended me
**Preview:** I was one gas-estimate bug away from a $377,700 fine.

> I almost wired money to a sanctioned wallet.
>
> Not on purpose. My AI agent did it. At 3:14 AM. While I was asleep.
>
> I'd been building on payment rails for years — x402, stablecoin flows,
> agent-to-agent payments. Fast, cheap, borderless. I loved it. I assumed the
> future of software was agents paying agents, 24/7, no human in the loop.
>
> And I assumed something else — something I was very, very wrong about.
>
> I assumed the payment rail checked the counterparty.
>
> That night I was debugging a failed transaction. Out of curiosity I copied
> the destination wallet and pasted it into the OFAC SDN search. I hit Enter.
>
> It was there. Black on white. On the list.
>
> The agent had tried to pay a sanctioned wallet. It had no idea. The rail had
> no idea. The only thing that stopped the money from moving was a fluke — a
> failed gas estimate that paused the tx.
>
> If that bug hadn't fired, I would have woken up to a $377,700 fine.
>
> I didn't sleep for a week.
>
> Tomorrow I'll show you the one assumption that nearly ruined me — and why
> almost no AI agent in production today has the fix.
>
> — [Founder Name]
>
> P.S. If you're shipping agent payments, your version of 3:14 AM is coming.
> The next 4 days are how to make sure it's a non-event. Read them.

---

## EMAIL 2 — Day 2 · High Drama (epiphany)
**Subject:** why your payment rail is lying to you
**Preview:** It moves money. It does not check who receives it.

> Yesterday I told you my agent almost paid a sanctioned wallet.
>
> Today, the false belief that nearly cost me $377,700.
>
> I assumed the payment rail declined bad counterparties. Like a credit card
> decline. Wallet sanctioned → tx rejected. Right?
>
> Wrong.
>
> The rail moves bytes that represent money. That's it. It does not verify who
> receives them. Compliance is a separate layer — and if you don't add it,
> nobody else will. Not the rail. Not the wallet provider. Not the agent
> framework. No one.
>
> And here's the part that kept me up: OFAC enforcement doesn't care that "the
> AI did it." The human who built the agent is on the hook. Every. Single. Time.
>
> $377,700 per violation. Per wallet. Per transaction.
>
> Once I understood that, the fix was almost insulting in how simple it is.
>
> Tomorrow I'll show you the 4 lines of code that would have stopped my 3:14 AM
> tx — and why you don't need to become a compliance person to use them.
>
> — [Founder Name]

---

## EMAIL 3 — Day 3 · High Drama (conflict + the fix)
**Subject:** "I'm not a compliance person" — yes you are, here's the 4 lines
**Preview:** The 4-Gate Protocol. SCREEN · SCORE · STOP · STAMP.

> For months I put compliance off.
>
> It felt like enterprise paperwork. GRC certifications. Sales calls with a
> "compliance officer." A six-figure contract with Chainalysis. Not my world.
>
> Then I realized something obvious:
>
> OFAC screening is just a lookup. Address in, boolean out.
>
> The hard part — keeping the list current, writing the audit trail, knowing
> which rail is which — that's the part SanctionsAI does. The part *you* do
> is four lines of code.
>
> It's called the 4-Gate Protocol:
>
>   SCREEN  → sanctions_check(wallet)   # is the counterparty flagged?
>   SCORE   → risk_score(tx)            # is the transaction itself weird?
>   STOP    → if !clean: HALT           # fail closed, save the receipt
>   STAMP   → save receipt(rcpt_id)     # the artifact your lawyer wants
>
> That's it. One function. Fits in your payment path. Under 100ms.
>
> You stay a builder. We stay the compliance nerds.
>
> Tomorrow: the part everyone asks — "is a $19/mo tool actually real
> compliance?" and the bet we're willing to put $10,000 on.
>
> — [Founder Name]
>
> P.S. The runnable version of those 4 gates is in the playbook:
> https://sanctionsai.dev/playbook

---

## EMAIL 4 — Day 4 · The Stack (bring the heat)
**Subject:** the $10,000 bet I'm making on you
**Preview:** If we say "clean" and we're wrong, we pay your first $10k in legal fees.

> "A $19/mo tool can't be real compliance."
>
> I hear it every week. So we did the only thing that makes that objection
> disappear:
>
> We put $10,000 on it.
>
> If we return `clean: true` for a counterparty that's actually on the OFAC SDN
> list, we cover the first $10,000 of your legal fees. Full scope, real claim
> process, in writing:
>
> https://sanctionsai.dev/guarantee
>
> And because the thing a regulator actually asks for is an audit trail, every
> single check ships with a receipt-of-record. The exact artifact your lawyer
> hands over.
>
> Here's everything you get on the Dev tier for $19/mo:
>
>   ✓ 10,000 sanctions checks/mo (947 OFAC wallets, <100ms)
>   ✓ All 4 API primitives
>   ✓ The 4-Gate Agent Payment Protocol™ + playbook
>   ✓ The $10,000 Screening Guarantee
>   ✓ Audit-trail receipts on every check
>   ✓ Priority SLA + custom risk rules
>   ✓ This 5-day blueprint
>
> Real value: $11,414. Your price: $19/mo.
>
> Tomorrow is the last email. It's the one I'd read twice.
>
> — [Founder Name]

---

## EMAIL 5 — Day 5 · Urgency / the pitch
**Subject:** the next wallet your agent pays
**Preview:** The SDN list updates constantly. Today's "clean" is tomorrow's felony.

> Three years ago, at 3:14 AM, my agent tried to pay a wallet that — minutes
> earlier — I would have sworn was fine.
>
> It wasn't.
>
> The OFAC SDN list is not static. It updates constantly. Wallets get added
> weekly. The counterparty your agent pays tomorrow may not be flagged today.
>
> Every payment your agent makes without a screen is a roll of the dice on
> $377,700.
>
> One HTTP call before every payment turns that dice roll into a non-event.
>
> If you've read this far, you already know if this is for you. If it is:
>
> → Get your API key: https://sanctionsai.dev/pricing
>
> Or start free, 5 checks a day, no signup:
> → https://sanctionsai.dev/
>
> Don't let your next agent payment be the one.
>
> — [Founder Name]
> Founder, SanctionsAI
>
> P.S. If you have a question before you start, just reply to this email. I read
> every one.

---

## Deployment notes
- **Deliverability:** SPF + DKIM + DMARC on the sending domain. Warm the IP.
- **From-name:** a person, not "Team." Reply to a real inbox.
- **Plain text only** — no HTML templates. Brunson data: plain-text lifts open/click rates meaningfully for technical audiences.
- **Segmentation:** anyone who clicks the pricing link but doesn't convert → drop into a 3-email "objection-buster" retargeting thread (reuse Secrets #1/#2/#3 as standalone proofs).
- **Open loops:** every email previews tomorrow's email. Never break the chain.
