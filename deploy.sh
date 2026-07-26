#!/usr/bin/env bash
# deploy.sh — SanctionsAI funnel deploy
# One command: ./deploy.sh
# Requires: vercel CLI, authenticated (vercel login)
set -euo pipefail

cd "$(dirname "$0")/build"

echo "🚀 Deploying SanctionsAI funnel to Vercel..."

# Deploy to production, skip prompts
vercel deploy --prod --yes

echo ""
echo "🔍 Verifying deployed routes..."

BASE="https://sanctionsai-audit.vercel.app"
ROUTES="/ /about /webinar /thank-you /checkout-bump /check /blueprint /blueprint.pdf /robots.txt /sitemap.xml /analytics.js"
PASS=0; FAIL=0

for path in $ROUTES; do
  status=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "$BASE$path" 2>/dev/null || echo "000")
  label="$path"
  [ "$label" = "/" ] && label="(landing)"
  if [ "$status" = "200" ] || [ "$status" = "308" ]; then
    echo "  ✓ $label → HTTP $status"
    PASS=$((PASS + 1))
  else
    echo "  ✗ $label → HTTP $status"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "══════════════════════════════════════"
echo "  Deploy complete: $PASS passed, $FAIL failed"
echo "  🌐 $BASE/"
echo "══════════════════════════════════════"

exit $FAIL
