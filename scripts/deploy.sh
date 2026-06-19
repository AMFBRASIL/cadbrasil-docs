#!/usr/bin/env bash
set -euo pipefail

# Deploy no VPS: pull + build + restart systemd.
# Uso: sudo bash scripts/deploy.sh

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE_NAME="cadbrasil-docs"
PORT="${PORT:-3016}"
NODE_BIN="${NODE_BIN:-/www/server/nodejs/v22.13.1/bin/node}"

cd "$APP_DIR"

echo "==> [1/6] Atualizando código (git pull)..."
git fetch origin
git reset --hard origin/main

echo "==> [2/6] Garantindo .npmrc..."
if [[ ! -f "$APP_DIR/.npmrc" ]]; then
  cat > "$APP_DIR/.npmrc" << 'EOF'
registry=https://registry.npmjs.org/
EOF
fi

echo "==> [3/6] Instalando dependências..."
npm install

echo "==> [4/6] Limpando builds antigos..."
rm -rf .output .nitro dist node_modules/.nitro

echo "==> [5/6] Build de produção..."
npm run build

if [[ ! -f "$APP_DIR/.output/server/index.mjs" ]]; then
  echo "Erro: build falhou — .output/server/index.mjs não encontrado"
  exit 1
fi

echo "    Assets gerados:"
ls -la "$APP_DIR/.output/public/assets/" || true

if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
  chown -R www:www "$APP_DIR/.output"
fi

echo "==> [6/6] Reiniciando serviço..."
if systemctl list-unit-files "$SERVICE_NAME.service" &>/dev/null && \
   [[ -f "/etc/systemd/system/${SERVICE_NAME}.service" ]]; then
  systemctl restart "$SERVICE_NAME"
  sleep 2

  if systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "==> Serviço $SERVICE_NAME ativo."
  else
    echo "Erro: serviço não subiu."
    journalctl -u "$SERVICE_NAME" -n 30 --no-pager
    exit 1
  fi
else
  echo "Aviso: systemd não configurado. Rode primeiro: sudo bash scripts/setup-vps.sh"
  echo "       Subindo manualmente em background..."
  pkill -f "$APP_DIR/.output/server/index.mjs" 2>/dev/null || true
  sleep 1
  sudo -u www env PORT="$PORT" HOST=0.0.0.0 nohup "$NODE_BIN" "$APP_DIR/.output/server/index.mjs" \
    > /www/wwwlogs/cadbrasildocs-node.log 2>&1 &
  sleep 2
fi

echo "==> Testando http://127.0.0.1:${PORT}/ ..."
if curl -sf -I "http://127.0.0.1:${PORT}/" | head -1; then
  echo ""
  echo "Deploy concluído com sucesso!"
else
  echo "Erro: site não responde na porta $PORT"
  ss -tlnp | grep "$PORT" || echo "Nada escutando na porta $PORT"
  exit 1
fi
