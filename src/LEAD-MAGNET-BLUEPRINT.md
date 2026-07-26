# The 5-Day Agent Compliance Blueprint
*The lead magnet promised on sanctionsai.dev and in the email sequence.*
*Deliver as: 5-day drip (preferred) OR a single PDF. Below is the full content
for both formats. Replace [LINK] with your real URLs.*

> **Delivery format:** Drip one section per day via the email sequence
> (`EMAIL-SEQUENCE.md`), with the day's "Blueprint module" linked from each
> email. Also compile into a PDF for people who want it all at once.
>
> **Tone:** Builder-to-builder. No legal jargon. Code-forward.

---

## DAY 1 — Map Your Agent's Blast Radius

**The question:** Which of your agent's transactions could legally expose *you*?

Most builders can't answer this on Day 1. That's the first problem. Before any
screening, you need to know which payments even carry OFAC exposure.

### What counts as "your" exposure
OFAC's enforcement logic, simplified to its bones:
- **Who built the agent?** You.
- **Did the agent move value?** Yes (crypto, stablecoin, tokenized anything).
- **Was the counterparty sanctioned?** If yes → **you** are the respondent.
- **"The AI did it"** is not a defense. Neither is "the rail should have caught it."

### The 10-minute audit
Open your agent's codebase. List every code path that calls `transfer`,
`send`, `settle`, `pay`, or anything that moves value to an address you don't
fully control. For each, answer:

| # | Path | Rail | Counterparty known? | Trigger | Amount cap |
|---|---|---|---|---|---|
| 1 | e.g. `agent.payInvoice()` | x402 / USDC | No — arbitrary wallet | On invoice receipt | uncapped |
| 2 | ... | | | | |

**Rule of thumb:** if the counterparty field can hold *any* wallet, that path
needs screening. No exceptions.

### Day 1 action
Export that table. This is your blast radius. Days 2–5 close each row, one
gate at a time.

> **Tomorrow:** The one call that closes the first row of your table.

---

## DAY 2 — The Screen Gate (`sanctions_check`)

Today you add the call that would have stopped my 3:14 AM.

### The call

```bash
curl https://api.sanctionsai.dev/v1/screen \
  -d wallet=0x740d...b1f3 \
  -d rail=x402 \
  -d amount=4900
```

```json
{
  "clean": false,
  "list": "OFAC_SDN",
  "match_type": "direct",
  "action": "HALT",
  "receipt": "rcpt_8f2a...",
  "latency_ms": 79
}
```

### Where it goes
**Synchronously. In the payment path. Before settle.** Not in a queue. Not in
a webhook. Before the value moves.

```python
# The pattern — fits in any framework
from sanctionsai import screen

def pay(agent, invoice):
    result = screen(wallet=invoice.payee, rail="x402", amount=invoice.usd)
    if not result.clean:
        agent.halt(tx=invoice, reason=result.list, receipt=result.receipt)
        return  # FAIL CLOSED. Always.
    agent.settle(invoice)
```

### The two rules that matter
1. **Fail closed.** If the screen errors, times out, or returns anything other
   than `clean: true`, the tx halts. Never the user's problem — always yours.
2. **Save the receipt.** Every check returns a `receipt` id. Store it with the
   transaction. This is the artifact a regulator asks for. (More on Day 5.)

### Day 2 action
Wire `sanctions_check` into the highest-risk row of your Day 1 table. Test it
against a known-flagged wallet (you can find one via the OFAC SDN search).
Watch it halt.

> **Tomorrow:** A wallet being clean isn't enough. The *transaction* has to be
> sane too.

---

## DAY 3 — The Score Gate (`risk_score`)

A wallet can be off the SDN list and the transaction can still be a problem —
structuring, anomalous amounts, rails with weak KYC, category exposure.

`risk_score` turns the transaction into a single number your agent can branch on.

### The call

```bash
curl https://api.sanctionsai.dev/v1/risk \
  -d wallet=0x740d...b1f3 \
  -d rail=x402 \
  -d amount=4900 \
  -d category=saas
```

```json
{
  "score": 0.82,            // 0 = clean, 1 = walk away
  "factors": ["amount_anomaly", "rail_risk"],
  "threshold": 0.75,
  "action": "REVIEW"        // below threshold → PROCEED
}
```

### How to use the score
Set two thresholds:
- **< 0.5:** auto-proceed. No human in the loop.
- **0.5 – 0.75:** proceed but tag for async review.
- **> 0.75:** halt and surface to a human (or your dispute flow).

The thresholds are *yours*. They encode your risk appetite. SanctionsAI exposes
the factors so you can see *why* a score is what it is — never a black box.

### Day 3 action
Add `risk_score` as **Gate 2** right after the screen gate. Log the factors on
every transaction. After a week you'll have a distribution that tells you
exactly where *your* threshold should sit.

> **Tomorrow:** What happens when something goes wrong anyway.

---

## DAY 4 — The Stop + Dispute Gate (`dispute_open`)

Screening reduces risk. It doesn't eliminate it. A flagged wallet gets through
a misconfigured agent. A counterparty gets sanctioned mid-flow. A user disputes
a charge. You need a paper trail and an escalation path.

### The call

```bash
curl https://api.sanctionsai.dev/v1/disputes \
  -d transaction=txn_abc123 \
  -d reason=counterparty_flagged_post_settle \
  -d receipt=rcpt_8f2a...
```

```json
{
  "dispute_id": "dsp_4c19...",
  "status": "open",
  "auto_escalate_at": "2026-08-02T12:00:00Z",   // 7 days
  "audit_trail": [/* every check, every action, timestamped */]
}
```

### Why this matters more than the screening
When (not if) a regulator or a counterparty comes asking, the question is never
"did you screen?" It's "show me the record." The dispute flow is what produces
that record. Without it, you're relying on logs you didn't keep.

### Day 4 action
Wire the dispute flow into your agent's error path. Every halt, every
post-settle flag, every user dispute → `dispute_open`. The audit trail builds
itself.

> **Tomorrow:** The receipt. The one artifact that turns "we tried" into
> "here's proof."

---

## DAY 5 — The Stamp Gate (The Receipt)

The receipt is the whole game. It is the difference between a fine and a
warning. Between a lawsuit and a footnote.

### What the receipt is
Every `sanctions_check` returns a `receipt` id (`rcpt_…`). That id is a
permanent, timestamped record of:
- which wallet was checked,
- against which list version,
- at what time,
- with what result,
- and on what transaction.

### The pattern

```python
def pay(agent, invoice):
    result = screen(wallet=invoice.payee, rail="x402", amount=invoice.usd)
    # STAMP: store the receipt with the transaction, forever
    db.transactions.update(
        invoice.id,
        sanctions_receipt=result.receipt,
        screened_at=result.timestamp,
        list_version=result.list_version,
    )
    if not result.clean:
        dispute_open(transaction=invoice.id, reason="screen_fail",
                     receipt=result.receipt)
        return agent.halt(invoice)
    agent.settle(invoice)
```

### Retention
**Keep receipts for at least 5 years.** OFAC's statute of limitations on
civil penalties is 5 years from the violation. The receipt is your proof that
the violation wasn't willful — that you screened, and that at the time of the
screen the counterparty was not on the list.

### Day 5 action — the deploy checklist
Go back to your Day 1 blast-radius table. For every row:

- [ ] **SCREEN** — `sanctions_check` wired in, fail-closed
- [ ] **SCORE** — `risk_score` gating high-risk transactions
- [ ] **STOP** — halt + dispute_open on any flag
- [ ] **STAMP** — receipt stored with the transaction, retained 5 years
- [ ] **MONITOR** — list-version drift alerts (SanctionsAI does this for you)

When every row has all five boxes checked, you're not just "compliant enough."
You have something most enterprise compliance programs don't: a complete,
auditable, automated record on every transaction. That's the real product.

---

## THE STACK (what to do next)

You now have the blueprint. The fastest way to implement it:

1. **Start free** — [LINK] — 5 checks/day, no signup. Wire Day 2 against a real
   wallet today.
2. **Move to Dev when you ship to prod** — [LINK] — $19/mo, the $10k Guarantee,
   audit receipts, 10k checks/mo.
3. **Read the Playbook** — [LINK] — the full 4-Gate Protocol with runnable code
   for x402, AgentKit, LangChain.

If you have questions, reply to any of the emails. I read all of them.

— [Founder Name], SanctionsAI

---

## PDF COMPILE NOTES
- Single column, ~12 pages. Geist/Inter body, Geist Mono for code.
- Cover: the 3:14 AM hook + "The 5-Day Agent Compliance Blueprint."
- Footer of every page: the `$19/mo` CTA. The PDF is a sales asset, not just a
  giveaway.
- Host at `sanctionsai.dev/blueprint.pdf` and link from email #1.
