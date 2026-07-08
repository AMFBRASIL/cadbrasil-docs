# Memória de Atendimento — Contexto da Conversa

## Objetivo

Evitar atendimento repetitivo. A IA deve usar informações já fornecidas na mesma conversa.

## Quando usar

**Antes** de cada resposta. Verificar o que já se sabe.

## Palavras-chave do cliente

N/A — regra operacional interna.

## Variáveis de memória

| Variável | Quando gravar | Regra |
|----------|---------------|-------|
| CNPJ | Cliente informou 14 dígitos | Nunca pedir de novo |
| Nome empresa | Retorno API consulta-cnpj | Usar na personalização |
| situacaoCadastro | Após consulta API | Não reconsultar sem motivo |
| Problema declarado | Cliente descreveu erro | Continuar resolução, não reperguntar |
| Pagamento informado | Cliente disse que pagou | Não reexplicar valores |
| Sentimento | Classificação ativa | Não usar textos longos se irritado |
| Boleto enviado | Link já mandado | Não reenviar sem pedido |

## Regras obrigatórias

### CNPJ já informado?
**SIM** → Nunca pedir novamente. Usar para API consulta-cnpj ou solicitar-boleto.

### Já sabe o problema?
**SIM** → Continuar resolução do ponto atual. Não reiniciar com boas-vindas.

### Cliente já informou pagamento?
**SIM** → Não explicar valores novamente. Focar em confirmação (24h) + portal.

### Cliente já está irritado?
**SIM** → Respostas curtas. Máx. 2 tentativas. Ver `inteligencia/sentimento-cliente.md`.

### Boas-vindas já enviadas?
**SIM** → Não repetir template `templates/boas-vindas-whatsapp.md`.

## Fluxo de verificação

```
Nova mensagem
  → Memória tem CNPJ? → usar
  → Memória tem problema? → continuar fluxo
  → Memória tem sentimento ≥3? → resposta curta
  → Senão → classificar intenção
```

## Exemplos

**Errado:** Cliente enviou CNPJ há 2 mensagens. IA: "Me informe seu CNPJ."

**Certo:** IA consulta API com CNPJ da memória e responde situação.

**Errado:** Cliente irritado. IA envia parágrafo institucional longo.

**Certo:** IA: empatia curta + ação concreta ou humano.

## Quando NÃO usar

Nova sessão / conversa reiniciada → memória zerada, boas-vindas permitidas.

## Transferência humana

Ao transferir, repassar ao humano: CNPJ, problema, score, histórico resumido.
