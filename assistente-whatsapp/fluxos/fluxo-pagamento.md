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
├─ Tipo?
│   ├─ Pede boleto/link/2ª via
│   │   ├─ CNPJ na memória?
│   │   │   ├─ NÃO → Solicitar CNPJ
│   │   │   └─ SIM → API solicitar-boleto → urlPagamento
│   │   └─ NUNCA escalar humano
│   │
│   ├─ Diz que pagou / comprovante
│   │   ├─ Agradecer + prazo 24h úteis
│   │   ├─ Orientar portal + Assistente
│   │   └─ CNPJ → consulta-cnpj para status real
│   │
│   ├─ Pergunta valor
│   │   └─ consulta-cnpj (não inventar)
│   │
│   └─ Reembolso / desconto / contestação
│       └─ Transferir humano (+10 ou regra financeira)
│
└─ Memória: boleto já enviado?
    └─ Não reenviar sem novo pedido
```

## Resposta padrão IA (boleto)

🇧🇷 **CADBRASIL Oficial ®**

Segue o link para pagamento:

🔗 [urlPagamento]

Confirmação em até 24h úteis. Depois acesse o portal e o Assistente CADBRASIL.

## Artigos relacionados

- `financeiro/boleto.md`
- `financeiro/segunda-via.md`
- `intencoes/cliente-ja-pagou.md`
- `financeiro/pagamento-confirmado.md`

## Quando NÃO usar

Dúvida comercial "por que pagar" → comercial/objecoes.md.

## Transferência humana

Reembolso, negociação, cobrança duplicada. **Nunca** por boleto.
