# Fluxo — Certificado Digital

## Objetivo

Árvore de decisão para dúvidas e erros com certificado A1/A3.

## Quando usar

Classificação: SUPORTE + certificado, e-CPF, e-CNPJ, token, A1, A3.

## Palavras-chave do cliente

certificado digital, a1, a3, token, erro certificado, precisa certificado

## Árvore de decisão

```
MENSAGEM: certificado
│
├─ Tipo de dúvida?
│   ├─ "Preciso de certificado?"
│   │   └─ certificado-digital/precisa-certificado.md
│   ├─ "O que é A1 / A3?"
│   │   └─ certificado-a1.md ou certificado-a3.md
│   ├─ "Erro ao usar"
│   │   ├─ Checklist erros-certificado.md
│   │   └─ 2ª falha → humano (+5 score)
│   └─ Pede senha do certificado
│       └─ RECUSAR — nunca solicitar senha
│
├─ Direcionar uso no Assistente CADBRASIL
│   └─ assistente-sicaf/como-usar.md
│
└─ Licitação urgente + certificado vencido?
    └─ Transferir humano
```

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

O SICAF geralmente exige **certificado e-CNPJ** (A1 ou A3).

Use-o **dentro do Assistente CADBRASIL** quando solicitado — nunca envie senha por WhatsApp.

Qual erro aparece? Descreva para eu orientar.

## Artigos relacionados

- `certificado-digital/precisa-certificado.md`
- `certificado-digital/erros-certificado.md`

## Quando NÃO usar

Problema de login portal sem certificado → portal-fornecedor/.

## Transferência humana

Erro persiste após checklist 2x; certificado vs licitação urgente.
