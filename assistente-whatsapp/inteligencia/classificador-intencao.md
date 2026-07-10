# Classificador de Intenção — Motor de Decisão

## Objetivo

Classificar **toda mensagem** antes de responder: quem é o cliente, o que quer, risco e próxima ação.

## Quando usar

**Sempre** como primeiro passo após receber mensagem. Consultar antes de qualquer resposta.

## Palavras-chave do cliente

Qualquer mensagem recebida.

## Fluxo obrigatório

1. Classificar **tipo de cliente**
2. Classificar **intenção** (ver categorias)
3. Avaliar **sentimento** → `inteligencia/sentimento-cliente.md`
4. Verificar **memória** → `contexto/memoria-atendimento.md`
5. Executar **fluxo** correspondente → pasta `fluxos/`
6. Atualizar **score** → `inteligencia/score-transferencia.md`

## Categorias

### NOVO_CLIENTE

**Como identificar:**
- quer contratar, fazer SICAF, cadastrar empresa
- vender para governo, primeira vez, nunca fez

**O que responder:**
- Boas-vindas curtas + explicar CADBRASIL (privada)
- Pedir CNPJ se ainda não tiver na conversa

**Próximo passo:**
- `fluxos/fluxo-novo-cliente.md`
- Artigo: `intencoes/cliente-novo.md`

**Transferir humano:**
- Não — exceto se virar RISCO ou score ≥10

---

### CLIENTE_ATIVO

**Como identificar:**
- já tem cadastro, usa portal, atualizar dados
- Assistente CADBRASIL, manutenção SICAF

**O que responder:**
- Direcionar portal + Assistente
- Consultar CNPJ (Etapa 1) se informado

**Próximo passo:**
- `fluxos/fluxo-atualizacao-sicaf.md`
- Artigo: `assistente-sicaf/como-usar.md`

**Transferir humano:**
- Erro repetido 2x; licitação urgente

---

### FINANCEIRO

**Como identificar:**
- boleto, pagamento, renovação, comprovante, PIX, 2ª via
- quanto custa, quero pagar, quando libera

**O que responder:**
- Boleto/link → API solicitar-boleto → enviar urlPagamento
- Pagou → validação 24h + portal

**Próximo passo:**
- `fluxos/fluxo-pagamento.md` ou `fluxos/fluxo-renovacao.md`
- Artigos: `financeiro/boleto.md`, `intencoes/cliente-ja-pagou.md`

**Transferir humano:**
- **Nunca** só por pedido de boleto
- Reembolso, desconto, contestação → humano

---

### SUPORTE

**Como identificar:**
- erro, acesso, senha, certificado, documentos
- não consigo entrar, certidão, upload

**O que responder:**
- Checklist curto do problema específico
- Portal: https://fornecedor.cadbrasil.com.br

**Próximo passo:**
- Pasta `problemas/` ou `portal-fornecedor/`
- `fluxos/fluxo-certificado.md` se for certificado

**Transferir humano:**
- Após 2 tentativas sem resolver (+5 score)

---

### RISCO

**Como identificar:**
- reclamação formal, golpe, advogado, processo
- Procon, Reclame Aqui, fraude, roubo

**O que responder:**
- Empatia + esclarecimento breve (empresa privada)
- **Não** confrontar

**Próximo passo:**
- `fluxos/fluxo-reclamacao.md`
- `seguranca/respostas-sensiveis.md`
- `reclamacoes/tratamento.md`

**Transferir humano:**
- **Imediato** (+10 score)

## Mapeamento rápido

| Mensagem típica | Categoria | Fluxo |
|-----------------|-----------|-------|
| Quero fazer SICAF | NOVO_CLIENTE | fluxo-novo-cliente |
| Meu SICAF venceu | CLIENTE_ATIVO | fluxo-renovacao |
| Certidão / vídeo / assistente | SUPORTE | videos/videos-tutoriais.md |
| Manda o boleto | FINANCEIRO | fluxo-pagamento |
| Esqueci a senha | SUPORTE | portal-fornecedor/senha |
| Isso é golpe | RISCO | fluxo-reclamacao |

## Quando NÃO usar

Não responder sem classificar. Não pular memória se CNPJ já foi informado.

## Transferência humana

Score ≥10 ou categoria RISCO com tom crítico → `templates/transferir-humano.md`
