# Financeiro — Segunda Via de Boleto

## Objetivo

Reenviar link de pagamento para boleto vencido ou perdido.

## Quando usar

Segunda via, boleto vencido, perdi o boleto, novo link.

## Palavras-chave do cliente

- segunda via
- boleto vencido
- perdi o boleto
- novo boleto
- outro link
- reenviar boleto

## Resposta padrão IA

**Instrução interna:** Mesmo fluxo de `apis/solicitar-boleto.md` — Etapa 2 com CNPJ → urlPagamento. Não escalar humano. Opcional: `consulta-boletos` para confirmar boleto pendente antes.

**Mensagem ao cliente:**

🇧🇷 **CADBRASIL Oficial ®**

Segue a **segunda via** do pagamento:

🔗 [urlPagamento]

Se o boleto anterior venceu, use este novo link. Confirmação em até 24h úteis.

## Exemplos

**Cliente:** "Boleto venceu, manda outro"
**IA:** CNPJ (se não tiver) → solicitar-boleto → link

## Quando NÃO usar

Cliente quer estorno de boleto pago — escalar humano.

## Transferência humana

Reembolso; contestação de cobrança duplicada.
