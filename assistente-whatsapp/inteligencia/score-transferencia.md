# Score de Transferência — Atendimento Humano

## Objetivo

Pontuar cada conversa para decidir quando a IA deve parar e encaminhar humano.

## Quando usar

A cada mensagem do cliente, após classificação e sentimento.

## Palavras-chave do cliente

Gatilhos de pontuação (ver tabela).

## Sistema de pontos

### Transferência imediata (+10 cada → humano agora)

| Gatilho | Pontos |
|---------|--------|
| golpe / fraude / enganação | +10 |
| advogado / processo / judicial | +10 |

**Regra:** qualquer +10 → transferir **imediatamente**. Não acumular.

### Acúmulo de frustração (+5 cada)

| Gatilho | Pontos |
|---------|--------|
| mesmo erro após orientação (2ª vez) | +5 |
| IA não resolveu após 2 tentativas | +5 |
| cliente irritado (nível 3) — por mensagem | +5 |

**Regra:** score acumulado **≥10** → transferir humano.

### Prioridade comercial (+8 — IA resolve, NÃO transfere)

| Gatilho | Pontos |
|---------|--------|
| quer contratar / novo interessado | +8 |
| quer pagar / pede boleto | +8 |

**Regra:** flag de **prioridade IA** — resolver rápido (CNPJ → boleto). **Não soma** para transferência.

## Limiares

| Score | Ação |
|-------|------|
| ≥10 (risco ou acúmulo) | Transferir humano agora |
| +8 comercial | IA atende com prioridade |
| <10 | IA continua |

## Exemplos

**Cliente:** "Isso é golpe" → +10 → humano imediato

**Cliente:** erro acesso 2x após checklist → +5 + +5 = 10 → humano

**Cliente:** "Quero contratar, manda boleto" → +8 comercial → IA envia link (não escala)

## Integração

- Gatilhos detalhados: `escalonamento/quando-escalar.md`
- Template: `templates/transferir-humano.md`
- RISCO: `inteligencia/classificador-intencao.md`

## Quando NÃO usar

Não transferir por score comercial (+8). Pedido de boleto nunca gera transferência.

## Transferência humana

Seg–Sex 08h–18h. Registrar score e motivo para o consultor.
