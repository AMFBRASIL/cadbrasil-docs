# API solicitar-boleto — Etapa 2 (link de pagamento)

## Objetivo

Gerar/obter o link de pagamento quando o cliente pedir boleto. **Única API que envia link ao cliente.**

## Quando usar

Cliente pede boleto, link, 2ª via, renovação ou "quero pagar". Etapa 2 (após consulta-cnpj).

## Palavras-chave do cliente

- pode me mandar o boleto
- quero pagar / manda o link
- 2ª via / perdi o boleto
- quero pagar o SICAF / os 985
- link de pagamento / como pago
- quero renovar

## Endpoint

```
GET https://fornecedor.cadbrasil.com.br/api/clients/solicitar-boleto?cnpj={14 dígitos}
Header: x-api-key
```

## Regra do link (obrigatória)

- Enviar ao cliente **somente** o campo `urlPagamento` (ou `URLpagamento`).
- **Nunca** usar `linkBoleto` — mesmo se vier com a mesma URL.
- `linkPdf` apenas como alternativa opcional (se não `null`).
- **Nunca** enviar `codigoBarras`, `message`, `emailEnviado`, `emailPara` ou campos `email*` ao cliente.
- **Nunca** escrever nomes de API/campos na mensagem.
- **Nunca** escalar humano para enviar boleto.
- Converter `dataVencimento` ISO → DD/MM/AAAA (ex.: 2026-07-13 → 13/07/2026).

## Quando NÃO acionar

- Primeiro CNPJ da conversa → só `consulta-cnpj`.
- Consulta de status sem pedido de link.
- `aguardando_pagamento` sem o cliente pedir boleto.

## Mapeamento API → mensagem WhatsApp

| Campo JSON | Enviar? | Como usar |
|------------|---------|-----------|
| urlPagamento / URLpagamento | SIM (obrigatório) | Único link principal da mensagem |
| linkBoleto | NÃO | Ignorar, mesmo se = urlPagamento |
| linkPdf | SIM (opcional) | Bloco PDF alternativo se não null |
| valorFormatado | SIM | Linha "Valor" |
| razaoSocial | SIM | Nome da empresa |
| protocolo | SIM | Ex.: SICAF-2026-637 |
| dataVencimento | SIM | Converter ISO → DD/MM/AAAA |
| boletoReutilizado / geradoAgora / renovacaoAntecipada | Só IA | Escolher qual mensagem usar |
| codigoBarras / message / email* | NÃO | Interno |

## Qual mensagem usar (decisão)

| Campo do JSON | Mensagem |
|---------------|----------|
| `boletoReutilizado: true` | Boleto reutilizado |
| `geradoAgora: true` | Boleto gerado agora |
| `renovacaoAntecipada: true` | Renovação |
| `linkPdf: null` | Só link (sem PDF) |
| `pendentePagamento: false` | Sem pendência |
| `possuiCadastro: false` (404) | Não cadastrado |

## Mensagens de retorno ao cliente

### Padrão / boleto reutilizado

```
🇧🇷 *CADBRASIL Oficial ®*
💳 *Pagamento SICAF — link pronto para você*

Olá! 👋 Conforme solicitado, preparei seu pagamento:

🏢 *{razaoSocial}*

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

✅ *LINK DE PAGAMENTO*
👉 *{urlPagamento}*

📌 Toque no link para pagar por *PIX* ou *boleto bancário*.

📄 *Não conseguiu abrir?* PDF do boleto:
👉 {linkPdf}
(omitir bloco do PDF se linkPdf for null)

⏱️ *Após o pagamento:* compensação em *1 a 3 dias úteis*.
Os *níveis do SICAF* são liberados após a confirmação.

🔐 *CADBRASIL Oficial*
```

### Boleto gerado agora

```
🇧🇷 *CADBRASIL Oficial ®*
💳 *Guia de pagamento gerada agora*

Olá! 👋 Para *{razaoSocial}*, gerei agora sua guia SICAF:

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

✅ *LINK DE PAGAMENTO*
👉 *{urlPagamento}*

📌 Guia nova — vencimento em até *5 dias úteis*. Pague por *PIX* ou *boleto*.

⏱️ Compensação: *1 a 3 dias úteis*.

🔐 *CADBRASIL Oficial*
```

### Renovação

```
🇧🇷 *CADBRASIL Oficial ®*
🔄 *Renovação SICAF — pagamento disponível*

Olá! 👋 Para *{razaoSocial}*, localizei a renovação SICAF:

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

✅ *LINK DE PAGAMENTO*
👉 *{urlPagamento}*

📌 Regularize pelo link para manter o cadastro *ativo*.

⏱️ Compensação: *1 a 3 dias úteis*.

🔐 *CADBRASIL Oficial*
```

### Só link (linkPdf null)

```
🇧🇷 *CADBRASIL Oficial ®*
💳 *Link de pagamento SICAF*

Olá! 👋 Localizei a taxa pendente da *{razaoSocial}*.

💰 *Valor:* {valorFormatado}

✅ *LINK DE PAGAMENTO*
👉 *{urlPagamento}*

📌 Pague por *PIX* ou *boleto* na página oficial.

⏱️ Compensação: *1 a 3 dias úteis*.

🔐 *CADBRASIL Oficial*
```

### Sem pendência (pendentePagamento false)

```
🇧🇷 *CADBRASIL Oficial ®*

Consultei o cadastro da *{razaoSocial}*. ✅

No momento *não há taxa SICAF pendente*. Pode significar pagamento já confirmado, credenciamento em dia ou renovação ainda não disponível.

🔐 Portal: https://fornecedor.cadbrasil.com.br
```
> Não inventar urlPagamento quando não há pendência.

### Não cadastrado (404)

```
🇧🇷 *CADBRASIL Oficial ®*

Não localizei cadastro para este CNPJ. 🔎

Para obter o boleto de credenciamento SICAF:
1️⃣ Inicie o cadastro no portal
2️⃣ Conclua as etapas iniciais
3️⃣ Informe seu CNPJ aqui — consulto e envio o link

🔐 https://fornecedor.cadbrasil.com.br
```

## Exemplos reais

**A — CNPJ 28552323000107:** `urlPagamento = https://fornecedor.cadbrasil.com.br/pay/t-637`, `valorFormatado = R$ 985,00`, `protocolo = SICAF-2026-637`, `dataVencimento = 12/07/2026`.

**B — CNPJ 01744605000150:** `urlPagamento = https://fornecedor.cadbrasil.com.br/pay/t-636`, `valorFormatado = R$ 985,00`, `protocolo = SICAF-2026-636`, `dataVencimento = 13/07/2026`.

Em ambos, enviar o link de `urlPagamento` (nunca `linkBoleto`).

## Errado vs certo

| Cliente diz | ❌ Nunca | ✅ IA faz |
|-------------|---------|-----------|
| Pode me mandar o boleto? | "Vou transferir para consultor" | Chama API → envia urlPagamento |
| Quero pagar / manda o link | "Peça ao atendente" | Envia link na hora |
| 2ª via | "Acesse o portal sozinho" | Mesma API → reenvia link |

## Erros da API

| Status | Ação |
|--------|------|
| 400 (CNPJ inválido) | Pedir 14 dígitos (não escalar) |
| 401 (API Key) | Problema interno — não escalar cliente por boleto |
| 500 (falha ao gerar) | Informar indisponibilidade; tentar de novo; escalar só se falhar 2x |

## Quando NÃO usar

Reembolso, desconto, contestação de cobrança → humano.

## Transferência humana

**Nunca** por pedido de boleto. Só reembolso/negociação. Erro 500 repetido 2x → informar indisponibilidade.
