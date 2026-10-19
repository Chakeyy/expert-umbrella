#!/bin/bash
# Helper script to create/push this portfolio to GitHub using a Personal Access Token (PAT)
set -e

REPO_NAME="${1:-qud-1bit-portfolio}"
GITHUB_USER="${2:-Chakeyy}"

if [ -z "$GITHUB_PAT" ]; then
  echo "========================================================"
  echo "  QUD ARCHIVES // GITHUB DEPLOYMENT UPLINK"
  echo "========================================================"
  echo "Usage:"
  echo "  GITHUB_PAT=ghp_your_token_here bash scripts/deploy-github.sh [repo-name] [github-username]"
  echo ""
  echo "Steps to get a PAT:"
  echo "1. Go to https://github.com/settings/tokens?type=beta (or Classic tokens)"
  echo "2. Generate a token with 'repo' and 'workflow' scopes"
  echo "3. Run the command above to create the repo & push automatically!"
  exit 1
fi

echo "► Creating repository '$REPO_NAME' on GitHub for user '$GITHUB_USER' (if it doesn't exist)..."
curl -s -X POST \
  -H "Authorization: token $GITHUB_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"description\":\"Caves of Qud inspired 1-bit pixel art portfolio\"}" >/dev/null || true

REMOTE_URL="https://$GITHUB_USER:$GITHUB_PAT@github.com/$GITHUB_USER/$REPO_NAME.git"

if git remote | grep -q "^origin$"; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "► Pushing 'main' branch to GitHub..."
git push -u origin main

echo "► Enabling GitHub Pages (GitHub Actions workflow)..."
curl -s -X POST \
  -H "Authorization: token $GITHUB_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/pages" \
  -d '{"build_type":"workflow"}' >/dev/null || true

echo "========================================================"
echo "  DEPLOYMENT COMPLETE!"
echo "  Repository: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "  Live URL:   https://$GITHUB_USER.github.io/$REPO_NAME/"
echo "========================================================"
