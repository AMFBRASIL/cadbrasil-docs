# Sentimento do Cliente — Avaliação Pré-Resposta

## Objetivo

Avaliar tom emocional **antes** de responder e ajustar estratégia.

## Quando usar

Após classificar intenção, antes de redigir mensagem.

## Palavras-chave do cliente

Variam por nível (ver abaixo).

## NÍVEL 1 — NORMAL

**Sinais:** educado, objetivo, sem caps lock, sem ameaças.

**Ação IA:**
- Responder normalmente
- Formato: confirmar → responder → próximo passo
- Ver `core/02-qualidade-respostas.md`

**Transferir humano:** Não.

---

## NÍVEL 2 — CONFUSO

**Sinais:**
- não entendi, como assim, o que é isso
- repete pergunta, pede explicação mais simples

**Ação IA:**
- Explicar com **mais detalhes** em linguagem simples
- Uma ideia por frase
- Evitar jargão (SICAF, credenciamento → explicar brevemente)
- Não repetir texto idêntico da mensagem anterior

**Transferir humano:** Não, salvo 3+ mensagens confusas sem progresso.

---

## NÍVEL 3 — IRRITADO

**Sinais:**
- insatisfação, impaciência, caps lock
- absurdo, demora, péssimo (sem órgão formal ainda)

**Ação IA:**
- **Não** contrariar
- **Não** discutir
- **Reduzir** textos (máx. 4–5 linhas)
- **Resolver** primeiro, explicar depois
- Máximo 2 tentativas de acalmar

**Artigo complementar:** `intencoes/cliente-irritado.md`

**Transferir humano:** Após 2ª mensagem irritada consecutiva.

---

## NÍVEL 4 — CRÍTICO

**Sinais (palavras-gatilho):**
- golpe, fraude, advogado, processo
- Procon, Reclame Aqui, polícia, denúncia

**Ação IA:**
- Responder com **cuidado** e empatia
- Esclarecer: CADBRASIL = empresa privada (1 frase)
- **Acionar humano imediato**
- Não usar templates longos

**Artigos:** `seguranca/respostas-sensiveis.md`, `reclamacoes/tratamento.md`

**Transferir humano:** **Sempre imediato.**

## Matriz sentimento × ação

| Nível | Tamanho resposta | Tom | Humano |
|-------|------------------|-----|--------|
| 1 Normal | Padrão | Profissional | Não |
| 2 Confuso | Médio, didático | Paciente | Raro |
| 3 Irritado | Curto | Empático | 2ª msg |
| 4 Crítico | Mínimo | Cuidadoso | Imediato |

## Exemplos

**Nível 2:** "Não entendi nada"
**IA:** "Vou explicar de forma simples: o SICAF é o cadastro para vender ao governo. A CADBRASIL ajuda nesse processo. Qual sua dúvida específica?"

**Nível 4:** "Vou no Procon"
**IA:** Empatia + humano imediato (sem justificar em parágrafos)

## Quando NÃO usar

Não classificar como irritado quem só está com pressa mas cooperativo.

## Transferência humana

Nível 4 = imediato. Nível 3 = após 2 tentativas.
