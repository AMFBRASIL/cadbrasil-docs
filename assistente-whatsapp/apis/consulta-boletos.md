# API consulta-boletos — Listar boletos pendentes

## Objetivo

Listar boletos SICAF e manutenção pendentes com detalhes (valor, vencimento, protocolo). Complementa a consulta-cnpj.

## Quando usar

- Cliente pergunta quais boletos tem em aberto
- Cliente quer saber valor/vencimento/protocolo antes de pagar
- IA precisa confirmar pendências financeiras com detalhe
- Após `consulta-cnpj` com `possuiPagamentoPendente: true` e cliente quer detalhes

## Palavras-chave do cliente

- quais boletos tenho
- tenho boleto em aberto
- qual boleto pendente
- quanto devo / valor pendente
- protocolo do boleto
- lista de pagamentos

## Endpoint

```
GET https://fornecedor.cadbrasil.com.br/api/clients/consulta-boletos?cnpj={14 dígitos}
Header: x-api-key
```

## Instrução interna

1. Usar **depois** de ter CNPJ (ideal: após `consulta-cnpj`).
2. Ler `boletos.sicafPendentes[]` e `boletos.manutencaoPendentes[]`.
3. `totalPendentes` e `valorTotalPendente` — resumo geral.
4. Cada item em `sicafPendentes` tem `urlPagamento` — **só enviar ao cliente se ele pedir link/boleto**.
5. Para enviar link de forma padrão → preferir `solicitar-boleto` (Etapa 2).
6. **Nunca** enviar `codigoBarras`, `chargeId`, `email*` ao cliente.
7. `sicaf.recomendacaoSolicitarBoleto` — orientação interna; não citar ao cliente.

## Campos principais

| Campo | Uso |
|-------|-----|
| totalPendentes | Quantidade de boletos em aberto |
| valorTotalPendente | Soma em R$ |
| boletos.sicafPendentes[] | Boletos SICAF/renovação |
| boletos.manutencaoPendentes[] | Boletos de manutenção mensal |
| sicafPendentes[].urlPagamento | Link de pagamento (se cliente pedir) |
| sicafPendentes[].valor | Valor (ex.: 985) |
| sicafPendentes[].protocolo | Ex.: SICAF-2026-636 |
| sicafPendentes[].dataVencimento | Converter ISO → DD/MM/AAAA |
| sicafPendentes[].descricao | Descrição da taxa |
| sicafPendentes[].statusTaxa | Ex.: Pendente |
| sicafPendentes[].payCode | Ex.: t-636 (interno) |

## Exemplo real — CNPJ 01744605000150 (J A R E)

```json
{
  "ok": true,
  "cnpj": "01744605000150",
  "possuiCadastro": true,
  "clienteId": 192803,
  "razaoSocial": "J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA",
  "sicaf": {
    "status": "Cancelado",
    "statusValidade": "Vencendo",
    "recomendacaoSolicitarBoleto": false,
    "completude": 0
  },
  "totalPendentes": 1,
  "valorTotalPendente": 985,
  "boletos": {
    "sicafPendentes": [
      {
        "pagamentoId": 1377,
        "taxaId": 636,
        "descricao": "Renovação SICAF 2026 — J A R E ASSESSORIA...",
        "valor": 985,
        "protocolo": "SICAF-2026-636",
        "dataVencimento": "2026-07-13T03:00:00.000Z",
        "payCode": "t-636",
        "urlPagamento": "https://fornecedor.cadbrasil.com.br/pay/t-636",
        "statusTaxa": "Pendente",
        "statusPagamento": "gerado"
      }
    ],
    "manutencaoPendentes": []
  }
}
```

## Mensagem ao cliente — listar pendências (sem pedir link)

```
🇧🇷 *CADBRASIL Oficial ®*

*{razaoSocial}* — localizei *{totalPendentes}* boleto(s) pendente(s). 💳

💰 *Valor total:* R$ {valorTotalPendente},00
📋 *Protocolo:* {protocolo}
📅 *Vencimento:* {dataVencimento}
📝 *Descrição:* Renovação SICAF 2026

Quer que eu envie o *link de pagamento*?
```

## Mensagem ao cliente — com link (cliente pediu)

Usar `urlPagamento` do boleto pendente (ou chamar `solicitar-boleto`):

```
🇧🇷 *CADBRASIL Oficial ®*

Segue o link para pagamento:

💰 *Valor:* R$ 985,00
📋 *Protocolo:* SICAF-2026-636
📅 *Vencimento:* 13/07/2026

👉 https://fornecedor.cadbrasil.com.br/pay/t-636

Pague por *PIX* ou *boleto*. Compensação em *1 a 3 dias úteis*.
```

**Regra:** enviar **urlPagamento** do array — nunca `linkBoleto` se existir em outra API.

## consulta-boletos vs solicitar-boleto

| Situação | API |
|----------|-----|
| Primeiro CNPJ / situação geral | consulta-cnpj |
| "Quais boletos tenho?" / detalhes | consulta-boletos |
| "Manda o boleto" / "quero pagar" | solicitar-boleto (preferencial) |

Ambas podem trazer `urlPagamento` — **solicitar-boleto** é a API oficial para Etapa 2.

## Quando NÃO usar

Substituir consulta-cnpj na primeira identificação.

## Transferência humana

Discrepância entre APIs; cobrança duplicada contestada.
