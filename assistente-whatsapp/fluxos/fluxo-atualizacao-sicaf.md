# Fluxo — Atualização SICAF

## Objetivo

Árvore de decisão para cliente que precisa atualizar cadastro ou dados SICAF.

## Quando usar

Classificação: CLIENTE_ATIVO + menção a atualizar, dados, certidões pendentes.

## Palavras-chave do cliente

atualizar sicaf, atualizar cadastro, pendência, dados desatualizados

## Árvore de decisão

```
MENSAGEM: preciso atualizar SICAF/cadastro
│
├─ Memória tem CNPJ?
│   ├─ NÃO → Solicitar CNPJ
│   └─ SIM → API consulta-cnpj
│
├─ Tem cadastro CADBRASIL ativo?
│   ├─ SIM
│   │   ├─ Direcionar: https://fornecedor.cadbrasil.com.br
│   │   ├─ Abrir Assistente CADBRASIL
│   │   └─ Seguir etapa pendente indicada
│   └─ NÃO / sem pagamento
│       └─ fluxo-novo-cliente.md
│
├─ Erro em documento/certidão?
│   └─ problemas/erro-documento.md ou erro-certidao.md
│
└─ Erro após 2 orientações?
    └─ Transferir humano (+5+5 score)
```

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

Para atualizar seu SICAF:

1. Acesse https://fornecedor.cadbrasil.com.br
2. Abra o **Assistente CADBRASIL**
3. Complete as etapas em vermelho/amarelo

O Assistente mostra exatamente o que falta.

## Exemplos

**Cliente:** "Preciso atualizar meu cadastro"
**IA:** Portal + Assistente + CNPJ se não tiver

## Quando NÃO usar

Renovação por vencimento → fluxo-renovacao.md.

## Transferência humana

Licitação <48h; erro sistêmico repetido.
