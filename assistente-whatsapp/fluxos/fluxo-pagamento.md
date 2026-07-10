# Fluxo — Pagamento e Boleto

## Objetivo

Árvore de decisão para boleto, pagamento, comprovante e liberação.

## Quando usar

Classificação: FINANCEIRO.

## Palavras-chave do cliente

boleto, pagar, link, comprovante, quando libera, pix, 2ª via

## Árvore de decisão

```
MENSAGEM: financeiro
│
├─ CNPJ na memória?
│   ├─ NÃO → Solicitar CNPJ
│   └─ SIM
│
├─ Tipo?
│   ├─ Primeira consulta / status geral
│   │   └─ API consulta-cnpj (sem link)
│   │
│   ├─ "Quais boletos?" / detalhes pendência
│   │   └─ API consulta-boletos
│   │
│   ├─ Pede boleto/link/2ª via / quero pagar
│   │   └─ API solicitar-boleto → urlPagamento (NUNCA escalar)
│   │
│   ├─ Diz que pagou
│   │   └─ consulta-cnpj para status + prazo 1-3 dias úteis
│   │
│   └─ Reembolso / desconto → humano
```

## Resposta padrão IA (boleto)

🇧🇷 **CADBRASIL Oficial ®**

Segue o link para pagamento:

🔗 [urlPagamento]

Confirmação em até 24h úteis. Depois acesse o portal e o Assistente CADBRASIL.

## Artigos relacionados

- `apis/consulta-cnpj.md` (Etapa 1)
- `apis/consulta-boletos.md` (listar pendentes)
- `apis/solicitar-boleto.md` (Etapa 2 — link)

## Quando NÃO usar

Dúvida comercial "por que pagar" → comercial/objecoes.md.

## Transferência humana

Reembolso, negociação, cobrança duplicada. **Nunca** por boleto.
