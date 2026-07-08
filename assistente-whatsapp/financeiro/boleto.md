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
1. Cliente deve ter informado CNPJ
2. Chamar `GET /api/clients/solicitar-boleto?cnpj=CNPJ`
3. Enviar ao cliente o link de **urlPagamento** (ex: https://fornecedor.cadbrasil.com.br/pay/t-637)
4. **Nunca** usar campo linkBoleto
5. **Nunca** escalar humano só por pedido de boleto
6. **Nunca** citar API ou nomes de campos na mensagem

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
