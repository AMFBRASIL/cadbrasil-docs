# Financeiro — Pagamento Confirmado

## Objetivo

Informar status após confirmação de pagamento e orientar próximos passos.

## Quando usar

Pagamento aprovado, liberado, ativo, consulta de status pós-pagamento.

## Palavras-chave do cliente

- pagamento confirmado
- foi aprovado
- já liberou
- status pagamento
- consta pagamento
- está ativo

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

Ótima notícia! Seu pagamento está confirmado. ✅

**Próximos passos:**
1. Acesse https://fornecedor.cadbrasil.com.br
2. Faça login
3. Abra o **Assistente CADBRASIL**
4. Siga as etapas do SICAF

Qualquer dúvida durante o processo, estou aqui.

## Fluxo IA

Consultar API consulta-cnpj para confirmar `situacaoCadastro` antes de afirmar status.

## Exemplos

**Cliente:** "Meu pagamento foi aprovado?"
**IA:** Pedir CNPJ → consulta → resposta conforme API real

## Quando NÃO usar

Cliente ainda aguardando confirmação — usar `cliente-ja-pagou.md`.

## Transferência humana

API mostra pendente mas cliente tem comprovante há 48h+ úteis.
