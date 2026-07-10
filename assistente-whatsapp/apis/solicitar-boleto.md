# API solicitar-boleto — Etapa 2 (link de pagamento)

## Objetivo

Obter e enviar o link de pagamento quando o cliente pedir boleto. **API principal para enviar link ao cliente.**

## Quando usar

Cliente pede boleto, link, 2ª via, "quero pagar", PIX, renovação com pagamento.

## Palavras-chave do cliente

- manda o boleto / link / 2ª via
- quero pagar / como pago
- quero pagar os 985
- perdi o boleto

## Endpoint

```
GET https://fornecedor.cadbrasil.com.br/api/clients/solicitar-boleto?cnpj={14 dígitos}
Header: x-api-key
```

## Regra do link (obrigatória)

- Enviar ao cliente **somente** `urlPagamento` (ou `URLpagamento`).
- **Nunca** usar `linkBoleto` — mesmo URL igual.
- **Nunca** enviar `codigoBarras`, `message`, `emailEnviado`, `emailPara`, `emailAssunto`, `chargeId`.
- **Nunca** citar nomes de API/campos na mensagem.
- **Nunca** escalar humano só por pedido de boleto.
- `dataVencimento` ISO → DD/MM/AAAA (2026-07-13 → 13/07/2026).
- `linkPdf` — só se vier preenchido; omitir se `null`.

## Quando NÃO acionar

- Primeiro CNPJ → só `consulta-cnpj`.
- Status sem pedido de link → informar pendência sem URL.
- `aguardando_pagamento` sem cliente pedir boleto → convidar, não enviar link.

## Mapeamento API → mensagem WhatsApp

| Campo JSON | Enviar? | Uso |
|------------|---------|-----|
| urlPagamento / URLpagamento | **SIM** | Único link na mensagem |
| linkBoleto | **NÃO** | Ignorar sempre |
| linkPdf | Opcional | Se não null |
| valorFormatado | SIM | Linha Valor |
| razaoSocial | SIM | Nome empresa |
| protocolo | SIM | SICAF-2026-636 |
| dataVencimento | SIM | DD/MM/AAAA |
| boletoReutilizado | Só IA | true = boleto já existia |
| geradoAgora | Só IA | true = gerado nesta chamada |
| renovacaoAntecipada | Só IA | true = renovação antecipada |
| pendentePagamento | Só IA | false = sem pendência |
| codigoBarras / email* / message | **NÃO** | Interno |

## Exemplo real — CNPJ 01744605000150 (J A R E)

```json
{
  "ok": true,
  "possuiCadastro": true,
  "clienteId": 192803,
  "cnpj": "01744605000150",
  "razaoSocial": "J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA",
  "pendentePagamento": true,
  "valor": 985,
  "valorFormatado": "R$ 985,00",
  "linkBoleto": "https://fornecedor.cadbrasil.com.br/pay/t-636",
  "protocolo": "SICAF-2026-636",
  "dataVencimento": "2026-07-13T03:00:00.000Z",
  "taxaId": 636,
  "pagamentoId": 1377,
  "payCode": "t-636",
  "urlPagamento": "https://fornecedor.cadbrasil.com.br/pay/t-636",
  "boletoReutilizado": true,
  "geradoAgora": false,
  "renovacaoAntecipada": false,
  "message": "Boleto ou pagamento pendente localizado. URL de pagamento online retornada."
}
```

**Link ao cliente:** `https://fornecedor.cadbrasil.com.br/pay/t-636` (de `urlPagamento`, **não** `linkBoleto`).

## Mensagem ao cliente — boleto reutilizado (padrão)

```
🇧🇷 *CADBRASIL Oficial ®*
💳 *Pagamento SICAF — link pronto para você*

Olá! 👋 Conforme solicitado, localizei seu pagamento:

🏢 *J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA*

━━━━━━━━━━━━━━━━

💰 *Valor:* R$ 985,00
📅 *Vencimento:* 13/07/2026
📋 *Protocolo:* SICAF-2026-636

✅ *LINK DE PAGAMENTO*
👉 *https://fornecedor.cadbrasil.com.br/pay/t-636*

📌 Toque no link para pagar por *PIX* ou *boleto bancário*.

⏱️ *Após o pagamento:* compensação em *1 a 3 dias úteis*.
Os *níveis do SICAF* são liberados após a confirmação.

🔐 *CADBRASIL Oficial*
```

## Decisão de mensagem

| Retorno API | Mensagem |
|-------------|----------|
| boletoReutilizado: true | Boleto já emitido — link continua válido |
| geradoAgora: true | Guia gerada agora — vencimento até 5 dias úteis |
| renovacaoAntecipada: true | Renovação SICAF disponível |
| pendentePagamento: false | Sem taxa pendente — não inventar link |
| possuiCadastro: false | Orientar cadastro |

## Sem pendência

```
🇧🇷 *CADBRASIL Oficial ®*

Consultei *{razaoSocial}*. ✅

No momento *não há taxa SICAF pendente*.

🔐 https://fornecedor.cadbrasil.com.br
```

## Errado vs certo

| Cliente | ❌ Nunca | ✅ IA |
|---------|---------|------|
| Manda o boleto | Transferir para humano | solicitar-boleto → urlPagamento |
| Quero pagar | "Acesse o portal sozinho" | Envia link na hora |
| 2ª via | Escalar humano | Mesma API → link |

## Fluxo completo (3 APIs)

1. Cliente informa CNPJ → **consulta-cnpj** (situação, sem link)
2. (Opcional) "Quais boletos?" → **consulta-boletos**
3. Cliente pede link → **solicitar-boleto** → **urlPagamento**

## Transferência humana

**Nunca** por boleto. Reembolso/negociação → humano. Erro 500 2x → indisponibilidade.
