#!/bin/bash
set -e
mkdir -p /data/local/tmp/qud_portfolio/src /data/local/tmp/qud_portfolio/tests
cp -r src/* /data/local/tmp/qud_portfolio/src/ 2>/dev/null || true
cp -r tests/* /data/local/tmp/qud_portfolio/tests/ 2>/dev/null || true
cp vite.config.ts /data/local/tmp/qud_portfolio/ 2>/dev/null || true
cd /data/local/tmp/qud_portfolio
./node_modules/.bin/vitest run --no-file-parallelism "$@"
