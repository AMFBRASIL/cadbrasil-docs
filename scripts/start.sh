#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

export PORT="${PORT:-3016}"
export HOST="${HOST:-0.0.0.0}"
export NODE_ENV="${NODE_ENV:-production}"

NODE_BIN="${NODE_BIN:-/www/server/nodejs/v22.13.1/bin/node}"

exec "$NODE_BIN" "$APP_DIR/.output/server/index.mjs"
