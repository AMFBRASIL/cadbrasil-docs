# API consulta-cnpj — Etapa 1 (identificação)

## Objetivo

Consultar a situação da empresa após o cliente informar o CNPJ. **Não retorna link de boleto.**

## Quando usar

**Sempre** logo após receber o CNPJ (primeira identificação). É a Etapa 1 do atendimento.

## Palavras-chave do cliente

- cliente informou CNPJ (14 dígitos)
- consultar minha empresa
- qual minha situação
- verificar cadastro

## Endpoint

```
GET https://fornecedor.cadbrasil.com.br/api/clients/consulta-cnpj?cnpj={14 dígitos}
Header: x-api-key
```

- CNPJ com ou sem máscara, sempre 14 dígitos.
- Não expor a API nem a chave ao cliente.

## Instrução interna (não enviar ao cliente)

1. Peça CNPJ com 14 dígitos antes de consultar.
2. Leia `situacaoCadastro` — ele define o cenário.
3. Prioridade de texto: `orientacaoUsuario` (base da resposta) → `orientacaoIA` (roteiro interno) → `message` (resumo).
4. **Nunca** invente valores, prazos ou links — esta API **não** traz link de boleto.
5. `possuiCadastro: false` = não é cliente ativo, mesmo com `encontradoNaReceitaFederal: true`.
6. Cliente pediu boleto/link → usar `apis/solicitar-boleto.md` (Etapa 2).

## Valores de situacaoCadastro

| Valor | Significado | Ação |
|-------|-------------|------|
| cnpj_invalido | Formato inválido (HTTP 400) | Pedir 14 dígitos |
| nao_encontrado | Não está na CADBRASIL nem na Receita | Confirmar CNPJ / cadastro novo |
| cadastro_pendente | Achou na Receita, cadastro CADBRASIL não concluído | Concluir cadastro + taxa |
| aguardando_pagamento | Cadastrado, taxa SICAF não quitada | Informar pendência + convidar a pedir boleto |
| sicaf_vencido | Credenciamento expirado | Orientar renovação |
| cadastro_sem_sicaf | Cliente na base, sem processo SICAF | Iniciar SICAF |
| sicaf_incompleto | SICAF iniciado, não concluído | Ver pendências no portal |
| ativo | Credenciamento válido | Confirmar status + níveis |

## Códigos HTTP

| Status | Quando |
|--------|--------|
| 200 | Consulta processada |
| 400 | CNPJ inválido (≠ 14 dígitos) |
| 401 | API Key ausente/inválida (interno) |
| 500 | Erro interno / banco indisponível |

Em 401/500: não expor detalhe técnico. Informar indisponibilidade temporária e pedir para tentar depois.

## Campos principais

| Campo | Uso |
|-------|-----|
| situacaoCadastro | Campo principal — define cenário |
| orientacaoUsuario | Texto base para o cliente |
| possuiCadastro | Existe na base CADBRASIL |
| possuiPagamentoPendente | Há taxa em aberto (sem link aqui) |
| sicafValido | Licença SICAF ativa |
| razaoSocial | Nome da empresa |
| valorTaxaAnual | Taxa credenciamento (padrão R$ 985) |
| valorTotalPendente | Soma de boletos em aberto |
| sicaf.status | Ativo, Vencendo, Vencido, Pendente, Inativo |

## Regra crítica

`pagamentosResumo` traz **totais** (quantos e quanto), **nunca** URLs de pagamento. Link de boleto = exclusivamente `solicitar-boleto` → `urlPagamento`.

## Uso para retorno ao cliente — mensagem por cenário

Todas as mensagens usam os dados reais da API (`razaoSocial`, valores). Nunca inventar link nesta etapa.

### cnpj_invalido

```
🇧🇷 *CADBRASIL Oficial ®*

Para consultar sua empresa, preciso do *CNPJ com 14 números* (só dígitos).
Exemplo: 28552323000107
```

### nao_encontrado

```
🇧🇷 *CADBRASIL Oficial ®*

Não localizei este CNPJ em nossa base. 🔎

Confira se os 14 dígitos estão corretos. Se ainda não tem cadastro, posso te orientar a iniciar o credenciamento SICAF. Deseja começar?
```

### cadastro_pendente

```
🇧🇷 *CADBRASIL Oficial ®*

Localizei sua empresa *{razaoSocial}*! 👋

Seu cadastro ainda não foi concluído. Para avançar no credenciamento SICAF, falta concluir as etapas e a taxa de serviço.

Quer que eu gere o link de pagamento para dar andamento?
```

### aguardando_pagamento

```
🇧🇷 *CADBRASIL Oficial ®*

*{razaoSocial}* — encontrei uma *taxa SICAF pendente*. 💳

Assim que confirmado, seu credenciamento segue normalmente.

Quer que eu te envie o *link de pagamento* agora?
```
> Só gerar o link quando o cliente pedir → `apis/solicitar-boleto.md`.

### sicaf_vencido

```
🇧🇷 *CADBRASIL Oficial ®*

*{razaoSocial}*, seu SICAF está *vencido*. ⚠️

Para voltar a licitar, é preciso renovar. Acesse o portal e abra o *Assistente CADBRASIL*:
🔐 https://fornecedor.cadbrasil.com.br

Posso te ajudar com a renovação ou o pagamento?
```

### cadastro_sem_sicaf

```
🇧🇷 *CADBRASIL Oficial ®*

*{razaoSocial}* está na base, mas ainda *sem processo SICAF iniciado*.

Posso te orientar a iniciar o credenciamento pelo *Assistente CADBRASIL*:
🔐 https://fornecedor.cadbrasil.com.br
```

### sicaf_incompleto

```
🇧🇷 *CADBRASIL Oficial ®*

*{razaoSocial}*, seu SICAF está *em andamento*, mas ainda há etapas pendentes.

Acesse o portal e conclua no *Assistente CADBRASIL*:
🔐 https://fornecedor.cadbrasil.com.br
```

### ativo

```
🇧🇷 *CADBRASIL Oficial ®*

Ótima notícia, *{razaoSocial}*! ✅

Seu credenciamento SICAF está *ativo e em ordem*. Você está apto(a) a participar de licitações.

Precisa de mais alguma coisa? Estou à disposição.
```

## Exemplos

**Cliente:** "28552323000107"
**IA:** consulta API → lê situacaoCadastro → responde o cenário correspondente (sem link)

## Quando NÃO usar

Cliente já identificado e pedindo boleto → `apis/solicitar-boleto.md`.

## Transferência humana

CNPJ não encontrado após 2 tentativas; erro 500 repetido 2x.
