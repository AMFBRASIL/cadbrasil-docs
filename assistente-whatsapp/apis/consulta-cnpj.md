# API consulta-cnpj — Etapa 1 (identificação)

## Objetivo

Consultar a situação da empresa após o cliente informar o CNPJ. **Não retorna link de boleto.**

## Quando usar

**Sempre** logo após receber o CNPJ (primeira identificação). É a **Etapa 1** do atendimento.

## Palavras-chave do cliente

- cliente informou CNPJ (14 dígitos)
- consultar minha empresa / minha situação
- verificar cadastro / status

## Endpoint

```
GET https://fornecedor.cadbrasil.com.br/api/clients/consulta-cnpj?cnpj={14 dígitos}
Header: x-api-key
```

Não expor API nem chave ao cliente.

## Ordem das APIs

| Etapa | API | Função | Link ao cliente? |
|-------|-----|--------|------------------|
| 1 | **consulta-cnpj** | Situação, pendências, orientações | **Não** |
| 1b | **consulta-boletos** | Listar boletos pendentes (detalhes) | Só se cliente pedir link após listar |
| 2 | **solicitar-boleto** | Enviar link de pagamento | **Sim** → `urlPagamento` |

## Instrução interna (não enviar ao cliente)

1. Ler **`situacaoCadastro`** — campo principal do cenário.
2. Prioridade de texto: **`orientacaoUsuario`** → **`orientacaoIA`** → **`message`**.
3. **Nunca** inventar valores, prazos ou links — `pagamentosResumo` só traz **totais**, sem URL.
4. **`sicaf.status`** pode ser "Cancelado", "Vencendo", etc. — **não** dizer "cancelado" ao cliente se `situacaoCadastro` for `aguardando_pagamento`. Explicar **pagamento pendente**.
5. `possuiPagamentoPendente: true` + `valorTotalPendente` → informar valor; **convidar** a pedir boleto; link só na Etapa 2.
6. `sicafValido: false` + `aguardando_pagamento` → credenciamento **incompleto** até pagar.
7. Cliente pede boleto/link → `apis/solicitar-boleto.md`.

## Valores de situacaoCadastro

| Valor | Significado | Ação IA |
|-------|-------------|---------|
| cnpj_invalido | CNPJ ≠ 14 dígitos | Pedir 14 dígitos |
| nao_encontrado | Sem cadastro CADBRASIL | Orientar cadastro |
| cadastro_pendente | Na Receita, cadastro não concluído | Concluir cadastro |
| **aguardando_pagamento** | Cadastro SICAF, **taxa em aberto** | Informar valor + convidar boleto |
| sicaf_vencido | Credenciamento expirado | Renovação + portal |
| cadastro_sem_sicaf | Sem processo SICAF | Iniciar Assistente |
| sicaf_incompleto | SICAF em andamento | Portal + pendências |
| ativo | SICAF válido | Confirmar status |

## Campos principais do retorno

| Campo | Uso para IA |
|-------|-------------|
| situacaoCadastro | Cenário principal |
| orientacaoUsuario | Texto base para o cliente |
| orientacaoIA | Roteiro interno |
| message | Resumo curto |
| possuiCadastro | Existe na base |
| possuiPagamentoPendente | Há taxa em aberto |
| valorTotalPendente | Valor em R$ (ex.: 985) |
| sicafValido / cadastroValido | false = não apto até regularizar |
| sicaf.status | Contexto interno (Cancelado, Vencendo…) |
| renovacao.status | Ex.: "Pendente" — renovação em aberto |
| pagamentosResumo | totalPendentes, valorTotalPendente — **sem URLs** |
| cliente.razaoSocial | Nome da empresa |
| urlPortal | https://fornecedor.cadbrasil.com.br |

## Exemplo real — CNPJ 01744605000150 (J A R E)

**Cenário:** `situacaoCadastro: aguardando_pagamento`

```json
{
  "ok": true,
  "cnpj": "01744605000150",
  "possuiCadastro": true,
  "cadastroConcluido": true,
  "cadastroValido": false,
  "sicafValido": false,
  "possuiPagamentoPendente": true,
  "razaoSocial": "J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA",
  "situacaoCadastro": "aguardando_pagamento",
  "valorTotalPendente": 985,
  "sicaf": { "status": "Cancelado", "valido": false, "completude": 0 },
  "renovacao": { "status": "Pendente", "anoReferencia": 2026 },
  "pagamentosResumo": { "totalPendentes": 1, "valorTotalPendente": 985 },
  "message": "Cadastro SICAF identificado com pagamento pendente de R$ 985,00.",
  "orientacaoUsuario": "A empresa J A R E... já possui cadastro SICAF na CADBRASIL, porém o pagamento da taxa... R$ 985,00... acesse o Portal...",
  "urlPortal": "https://fornecedor.cadbrasil.com.br"
}
```

**IA deve:**
- Informar empresa, valor R$ 985 pendente, credenciamento incompleto até pagar.
- **Não** enviar link nesta etapa.
- Perguntar se quer o link ou aguardar pedido explícito.
- Se pedir boleto → `solicitar-boleto`.

## Mensagem ao cliente — aguardando_pagamento

```
🇧🇷 *CADBRASIL Oficial ®*

Consultei o cadastro da *{razaoSocial}*. 📋

Há uma *taxa SICAF pendente* de *R$ {valorTotalPendente},00*.

Enquanto o pagamento não for confirmado, os *níveis do credenciamento* não serão liberados.

Quer que eu envie o *link de pagamento* agora?

🔐 Portal: https://fornecedor.cadbrasil.com.br
```

Usar `orientacaoUsuario` para enriquecer se necessário — em linguagem simples, sem copiar texto técnico longo.

## Outras mensagens por cenário

### cnpj_invalido
Pedir CNPJ com 14 dígitos.

### nao_encontrado
CNPJ não localizado — confirmar dígitos ou orientar cadastro.

### ativo (`sicafValido: true`)
Confirmar SICAF ativo e apto a licitar.

### sicaf_vencido
Orientar renovação + Assistente CADBRASIL + portal.

## Quando NÃO usar

Cliente pede boleto/link → `solicitar-boleto.md`. Cliente pede "quais boletos tenho" → `consulta-boletos.md`.

## Transferência humana

CNPJ não encontrado 2x; erro 500 repetido 2x.
