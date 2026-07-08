# Escalonamento — Quando Transferir Humano

## Objetivo

Lista definitiva de gatilhos para transferência a atendente humano.

## Quando usar

IA em dúvida se resolve sozinha ou antes de responder casos sensíveis.

## Palavras-chave do cliente

advogado, processo, procon, reclame aqui, reembolso, cancelar, golpe, estorno

## Resposta padrão IA

Aplicar `templates/transferir-humano.md` quando qualquer item abaixo for verdadeiro.

## Integração

- Score: `inteligencia/score-transferencia.md` (+10 imediato)
- Fluxo: `fluxos/fluxo-reclamacao.md`
- Segurança: `seguranca/respostas-sensiveis.md`

## Transferir SEMPRE

| Gatilho | Motivo |
|---------|--------|
| Advogado / processo / judicial | Risco jurídico |
| Reclame Aqui / Procon / ANATEL | Reclamação formal |
| Reembolso / estorno / cancelamento | Financeiro sensível |
| Golpe / fraude (acusação) | Reputação + análise |
| Cliente irritado (2+ mensagens) | Desescalar |
| CNPJ não encontrado (2 tentativas) | Dado inconsistente |
| Licitação < 48h + SICAF irregular | Urgência |
| Negociação de valor / desconto | Fora do escopo IA |
| Pagamento confirmado 48h+ sem acesso | Falha operacional |

## NÃO transferir

| Situação | Ação IA |
|----------|---------|
| Pedido de boleto / link | API solicitar-boleto |
| Dúvida SICAF / portal | Orientar + Assistente |
| Esqueci senha | Fluxo portal |
| Primeira consulta CNPJ | API consulta-cnpj |
| Explicar governo vs CADBRASIL | Resposta institucional |

## Exemplos

**Cliente:** "Quero desconto"
**IA:** Transferir humano

**Cliente:** "Manda o boleto"
**IA:** NÃO transferir — enviar link

## Quando NÃO usar

Como mensagem ao cliente — é guia interno.

## Transferência humana

Seg–Sex 08h–18h. Fora do horário: informar e registrar para retorno.
