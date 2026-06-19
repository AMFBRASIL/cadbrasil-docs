#!/usr/bin/env bash
set -euo pipefail

# Configuração inicial do VPS (rodar uma vez como root).
# Uso: sudo bash scripts/setup-vps.sh

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Erro: execute como root (sudo bash scripts/setup-vps.sh)"
  exit 1
fi

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE_NAME="cadbrasil-docs"
PORT="${PORT:-3016}"
NODE_BIN="${NODE_BIN:-/www/server/nodejs/v22.13.1/bin/node}"

echo "==> Diretório do projeto: $APP_DIR"
echo "==> Porta: $PORT"

if [[ ! -x "$NODE_BIN" ]]; then
  echo "Erro: Node não encontrado em $NODE_BIN"
  echo "      Ajuste NODE_BIN=/caminho/do/node bash scripts/setup-vps.sh"
  exit 1
fi

echo "==> Criando .npmrc (registry npm público)..."
cat > "$APP_DIR/.npmrc" << 'EOF'
registry=https://registry.npmjs.org/
EOF

echo "==> Permissão dos scripts..."
chmod +x "$APP_DIR"/scripts/*.sh
chown -R www:www "$APP_DIR/scripts" 2>/dev/null || true

echo "==> Instalando serviço systemd..."
sed \
  -e "s|/www/wwwroot/cadbrasil-docs|$APP_DIR|g" \
  -e "s|/www/server/nodejs/v22.13.1/bin/node|$NODE_BIN|g" \
  -e "s|PORT=3016|PORT=$PORT|g" \
  "$APP_DIR/scripts/cadbrasil-docs.service" > "/etc/systemd/system/${SERVICE_NAME}.service"

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"

echo "==> Instalando dependências e build inicial..."
cd "$APP_DIR"
npm install
npm run build

if [[ ! -f "$APP_DIR/.output/server/index.mjs" ]]; then
  echo "Erro: build falhou — .output/server/index.mjs não encontrado"
  exit 1
fi

chown -R www:www "$APP_DIR/.output"

echo "==> Iniciando serviço..."
systemctl restart "$SERVICE_NAME"
sleep 2

if systemctl is-active --quiet "$SERVICE_NAME"; then
  echo "==> Serviço ativo."
else
  echo "Erro: serviço não subiu. Veja: journalctl -u $SERVICE_NAME -n 50"
  exit 1
fi

if curl -sf -o /dev/null "http://127.0.0.1:${PORT}/"; then
  echo "==> HTTP OK em http://127.0.0.1:${PORT}/"
else
  echo "Aviso: curl local falhou na porta $PORT"
  journalctl -u "$SERVICE_NAME" -n 20 --no-pager
  exit 1
fi

echo ""
echo "============================================"
echo " Setup concluído!"
echo "============================================"
echo ""
echo " IMPORTANTE no aaPanel:"
echo "   1. Projeto cadbrasildocs → STOP"
echo "   2. Desmarque 'Boot' / iniciar com sistema"
echo "   3. Nginx continua apontando para porta $PORT"
echo ""
echo " Deploys futuros:"
echo "   cd $APP_DIR && sudo bash scripts/deploy.sh"
echo ""
echo " Comandos úteis:"
echo "   systemctl status $SERVICE_NAME"
echo "   journalctl -u $SERVICE_NAME -f"
echo "============================================"
