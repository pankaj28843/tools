#!/usr/bin/env bash
set -euo pipefail

if command -v pnpm >/dev/null 2>&1; then
  pnpm run preview -- --host 127.0.0.1
else
  echo "pnpm is required" >&2
  exit 1
fi
