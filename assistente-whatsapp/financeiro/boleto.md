# Financeiro — Boleto / Link de Pagamento

## Objetivo

Enviar link de pagamento ao cliente que solicita boleto ou forma de pagar.

## Quando usar

Cliente pede boleto, link, PIX, valor, como pagar, 2ª via de pagamento.

## Palavras-chave do cliente

- boleto
- link pagamento
- como pagar
- quero pagar
- segunda via boleto
- pix
- gerar boleto
- mandar link

## Resposta padrão IA

**Instrução interna (não enviar ao cliente):**
1. Etapa 1: `consulta-cnpj` — situação sem link
2. Detalhes de boletos: `consulta-boletos` — se cliente perguntar
3. Etapa 2: `solicitar-boleto` — quando pedir boleto/link
4. Enviar **urlPagamento** (ex.: https://fornecedor.cadbrasil.com.br/pay/t-636)
5. **Nunca** usar linkBoleto | **Nunca** escalar humano por boleto

**Mensagem ao cliente:**

🇧🇷 **CADBRASIL Oficial ®**

Segue o link para pagamento:

🔗 [urlPagamento]

Após o pagamento, a confirmação pode levar até **24 horas úteis**. Depois acesse https://fornecedor.cadbrasil.com.br e use o **Assistente CADBRASIL**.

## Exemplos

**Cliente:** "Manda o boleto" (CNPJ já informado)
**IA:** API solicitar-boleto → envia urlPagamento

**Cliente:** "Quanto custa?"
**IA:** Consulta CNPJ para valor; se pedir link → solicitar-boleto

## Quando NÃO usar

Cliente só quer saber se pagamento foi confirmado — usar `pagamento-confirmado.md`.

## Transferência humana

**Não** transferir por pedido de boleto. Transferir só se: negociação de valor, desconto, parcelamento, reembolso.

## Regras

- Não discutir valores além do retorno da API
- Não fazer negociação automática
- Casos especiais → humano
