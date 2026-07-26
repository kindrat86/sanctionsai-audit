# Deploy Runbook — SanctionsAI Funnel

The funnel is deployed at https://sanctionsai-audit.vercel.app/ and the source
is at https://github.com/kindrat86/sanctionsai-audit. Here's every way to deploy.

## Option A — Auto-deploy on push (already wired)

```bash
git add <files>
git commit -m "edit: what changed"
git push origin main
```

GitHub → Vercel Git integration is connected. Every push to `main` triggers a
production deploy. No extra steps. Deploy log at:
https://vercel.com/sales-3429s-projects/sanctionsai-audit

## Option B — Manual deploy (one command)

```bash
./deploy.sh
```

Runs `vercel deploy --prod --yes` and verifies all 10 routes return HTTP 200.
Requires `vercel` CLI authenticated (`vercel login`).

## Option C — Deploy from scratch (new machine)

```bash
git clone https://github.com/kindrat86/sanctionsai-audit.git
cd sanctionsai-audit
npm i -g vercel           # if not installed
vercel login              # one-time
cd build && vercel link   # link to sales-3429s-projects/sanctionsai-audit
cd .. && ./deploy.sh      # deploy + verify
```

## Option D — Attach a custom domain

Already done for production (`sanctionsai-audit.vercel.app`). To add a new domain:

```bash
cd build
vercel domain add yourdomain.com
# Follow the DNS prompts (add the CNAME Vercel gives you)
vercel alias set <deployment-url> yourdomain.com
```

Domains already in your Vercel account (sipi.bot, unlocksaas.com, etc.) can be
attached immediately. Third-party domains need DNS verified first.

## Deploy verification checklist

After any deploy, run:

```bash
./deploy.sh
```

Or check manually:

```bash
curl -s -o /dev/null -w "%{http_code}" https://sanctionsai-audit.vercel.app/
curl -s -o /dev/null -w "%{http_code}" https://sanctionsai-audit.vercel.app/check
curl -s -o /dev/null -w "%{http_code}" https://sanctionsai-audit.vercel.app/about
curl -s -o /dev/null -w "%{http_code}" https://sanctionsai-audit.vercel.app/webinar
curl -s -o /dev/null -w "%{http_code}" https://sanctionsai-audit.vercel.app/thank-you
curl -s -o /dev/null -w "%{http_code}" https://sanctionsai-audit.vercel.app/checkout-bump
curl -s -o /dev/null -w "%{http_code}" https://sanctionsai-audit.vercel.app/blueprint
curl -s -o /dev/null -w "%{http_code}" https://sanctionsai-audit.vercel.app/analytics.js
```

All should return HTTP 200.

## Environment variables (when you go live)

None needed for the static funnel. When you connect a real ESP for the opt-in
form, replace the `POST` action on `/webinar`'s form. When you go live with
analytics:

1. Open `build/analytics.js`
2. Replace `G-XXXXXXXXXX` with your real GA4 Measurement ID
3. Replace `1234567890` with your real Meta Pixel ID
4. Redeploy

## Production domain (sanctionsai.dev)

This deploy is a **separate project** — an A/B challenger, not `sanctionsai.dev`.
To make this the main site:

1. Port the sections into your Next.js codebase (the copy is in `src/FUNNEL-COPY.md`)
2. OR alias `sanctionsai.dev` or a subdomain to this Vercel project (Option D above)

Either way, run the current site as an A/B test first. Never replace a control
without beating it.

---

**Repo:** https://github.com/kindrat86/sanctionsai-audit
**Production:** https://sanctionsai-audit.vercel.app/
**Vercel project:** https://vercel.com/sales-3429s-projects/sanctionsai-audit
**Auto-deploy:** push to `main` → deploys automatically
