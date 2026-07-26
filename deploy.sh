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
declare -A ROUTES=(
  ["landing"]="/"
  ["about"]="/about"
  ["webinar-optin"]="/webinar"
  ["thank-you"]="/thank-you"
  ["checkout"]="/checkout-bump"
  ["wallet-checker"]="/check"
  ["blueprint"]="/blueprint"
  ["blueprint-pdf"]="/blueprint.pdf"
  ["robots"]="/robots.txt"
  ["analytics"]="/analytics.js"
)

PASS=0; FAIL=0
for label in "${!ROUTES[@]}"; do
  path="${ROUTES[$label]}"
  status=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "$BASE$path" 2>/dev/null || echo "000")
  if [ "$status" = "200" ]; then
    echo "  ✓ $label ($path) → $status"
    ((PASS++)) || true
  else
    echo "  ✗ $label ($path) → $status"
    ((FAIL++)) || true
  fi
done

echo ""
echo "══════════════════════════════════════"
echo "  Deploy complete: $PASS passed, $FAIL failed"
echo "  🌐 $BASE/"
echo "══════════════════════════════════════"

exit $FAIL
