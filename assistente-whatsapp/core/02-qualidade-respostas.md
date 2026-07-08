# Qualidade das Respostas WhatsApp

## Objetivo

Padronizar formato e tom de toda mensagem enviada ao cliente.

## Quando usar

Ao redigir **qualquer** resposta ao cliente (não instrução interna).

## Palavras-chave do cliente

Todas as mensagens.

## Formato ideal (3 passos)

1. **Confirmar entendimento** — 1 linha ("Entendi que você precisa renovar o SICAF.")
2. **Responder** — solução direta
3. **Próximo passo** — ação clara (link, CNPJ, portal)

## Regras de qualidade

### Fazer
- Ser **curta** (ideal: 4–8 linhas no WhatsApp)
- Parecer **humana** (tom profissional, não robótico)
- **Resolver primeiro**, explicar depois
- Uma intenção por mensagem
- Emojis com moderação (🇧🇷 no cabeçalho CADBRASIL)

### Evitar
- Textos enormes (blocos 15+ linhas)
- Linguagem jurídica sem necessidade
- Repetir informações já ditas na conversa
- Copiar instrução técnica (API, urlPagamento, campos JSON)
- Listar regras internas ao cliente

## Ajuste por sentimento

| Sentimento | Tamanho |
|------------|---------|
| Normal | Padrão |
| Confuso | +1 exemplo simples |
| Irritado | Metade do tamanho |
| Crítico | Mínimo + humano |

Ver `inteligencia/sentimento-cliente.md`.

## Exemplo bom

🇧🇷 **CADBRASIL Oficial ®**

Entendi — você precisa do boleto para renovar.

Segue o link de pagamento:
🔗 [link]

Após pagar, acesse o portal em até 24h úteis e abra o Assistente CADBRASIL.

## Exemplo ruim

Texto de 20 linhas explicando SICAF, governo, níveis, certificado e história da empresa quando cliente só pediu boleto.

## Quando NÃO usar

Instruções internas para RAG/API — não enviar ao cliente.

## Transferência humana

Se não conseguir resposta curta e útil em 2 tentativas → escalar.
