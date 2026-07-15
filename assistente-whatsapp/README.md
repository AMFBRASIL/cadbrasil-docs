# Base de Conhecimento — Assistente WhatsApp CADBRASIL

## Objetivo

Central modular para RAG (Retrieval Augmented Generation), atendimento automático WhatsApp e treinamento de colaboradores.

> **Fonte única do bot.** O Assistente WhatsApp deve indexar **somente** os arquivos `.md` desta pasta (catálogo em `manifest.json`). O site `docs.cadbrasil.com.br` é apenas a renderização humana desta base. O "FAQ técnico" do site **não** deve ser indexado pelo bot — é referência para humanos/devs.

## Quando usar

A IA deve consultar este hub antes de responder qualquer cliente. Cada pasta resolve **uma intenção específica**.

## Estrutura

| Pasta | Conteúdo |
|-------|----------|
| `core/` | Identidade, regras críticas e qualidade |
| `apis/` | consulta-cnpj (Etapa 1) e solicitar-boleto (Etapa 2) |
| `inteligencia/` | Classificador, sentimento, score de transferência |
| `contexto/` | Memória de conversa |
| `fluxos/` | Árvores de decisão (não FAQ) |
| `seguranca/` | Respostas sensíveis |
| `comercial/` | Benefícios, objeções, comparativos |
| `intencoes/` | Detecção de intenção do cliente |
| `sicaf/` | Credenciamento e níveis |
| `portal-fornecedor/` | Login, senha, acesso |
| `assistente-sicaf/` | App Assistente CADBRASIL |
| `videos/` | Tutoriais YouTube (assistente, certidão, níveis, balanço, manutenção) |
| `certificado-digital/` | A1, A3, erros |
| `documentos/` | Documentos necessários |
| `financeiro/` | Valores, boleto, pagamento, renovação |
| `problemas/` | Erros comuns |
| `templates/` | Mensagens prontas WhatsApp |
| `escalonamento/` | Quando transferir humano |
| `reclamacoes/` | Golpe, Procon, advogado |

## Pipeline operacional (V2)

Toda mensagem segue:

1. `inteligencia/classificador-intencao.md` — classificar
2. `inteligencia/sentimento-cliente.md` — avaliar tom
3. `contexto/memoria-atendimento.md` — verificar contexto
4. `fluxos/` — executar árvore de decisão
5. `inteligencia/score-transferencia.md` — decidir humano
6. `core/02-qualidade-respostas.md` — formatar resposta

## APIs (dentro do RAG — `apis/`)

| Etapa | API | Função |
|-------|-----|--------|
| 1 | `apis/consulta-cnpj.md` | Situação da empresa (sem link) |
| 1b | `apis/consulta-boletos.md` | Listar boletos pendentes |
| 2 | `apis/solicitar-boleto.md` | Enviar urlPagamento ao cliente |

## Regra máxima

A CADBRASIL é empresa **privada**. A cobrança refere-se a plataforma, tecnologia e assessoria.

**Pode fazer sozinho?** Só se o cliente perguntar → `comercial/objecoes.md`:
- confirmar que pode, só pelos canais do Governo Federal
- **não** dar orientação, suporte, passo a passo ou instruções
- oferecer CADBRASIL rápida: https://cadastro.cadbrasil.com.br

**Proibido** em boas-vindas, cliente novo e apresentações proativas.
