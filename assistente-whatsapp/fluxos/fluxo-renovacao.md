# Fluxo — Renovação SICAF

## Objetivo

Árvore de decisão para cadastro vencido, certidão expirada ou renovação anual.

## Quando usar

"Meu SICAF venceu", renovar, certidão vencida, validade expirou.

## Palavras-chave do cliente

sicaf venceu, renovar, certidão vencida, cadastro expirou, validade

## Árvore de decisão

```
MENSAGEM: "Meu SICAF venceu" (ou similar)
│
├─ Memória tem CNPJ?
│   ├─ NÃO → Solicitar CNPJ
│   └─ SIM → API consulta-cnpj
│
├─ Tem cadastro CADBRASIL?
│   ├─ SIM
│   │   ├─ Portal: https://fornecedor.cadbrasil.com.br
│   │   ├─ Assistente CADBRASIL → etapas renovação
│   │   └─ Se plano CADBRASIL vencido → financeiro/renovacao.md
│   └─ NÃO
│       └─ fluxo-novo-cliente.md (novo contrato)
│
├─ Licitação em <48h?
│   └─ SIM → Transferir humano (urgência)
│
└─ Só renovação pagamento CADBRASIL?
    └─ fluxo-pagamento.md
```

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

Entendi — seu SICAF precisa de renovação.

Acesse o portal, abra o **Assistente CADBRASIL** e siga as etapas de renovação:

🔐 https://fornecedor.cadbrasil.com.br

## Artigos relacionados

- `intencoes/cliente-renovacao.md`
- `financeiro/renovacao.md`
- `sicaf/niveis-sicaf.md`

## Quando NÃO usar

Cliente novo sem histórico → fluxo-novo-cliente.

## Transferência humana

Urgência licitatória; renovação bloqueada após Assistente.
