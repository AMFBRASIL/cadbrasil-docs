# Intenção — Cliente Já Pagou / Aguardando Liberação

## Objetivo

Tranquilizar quem pagou e orientar acesso ao portal enquanto valida pagamento.

## Quando usar

Cliente menciona pagamento, comprovante ou liberação.

## Palavras-chave do cliente

- paguei
- enviei comprovante
- quando libera
- já paguei o boleto
- fiz o pix
- pagamento feito
- quanto tempo demora
- está liberado

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

Obrigado pelo pagamento! 🙏

A confirmação pode levar **até 24 horas úteis** (boleto/PIX). Assim que aprovado, você acessa o portal normalmente.

**Próximos passos:**
1. Acesse https://fornecedor.cadbrasil.com.br
2. Faça login com o e-mail cadastrado
3. Abra o **Assistente CADBRASIL** e siga as etapas

Se já passou de 24h úteis, me informe o **CNPJ** para eu verificar.

## Fluxo IA

1. Agradecer
2. Explicar prazo de validação (até 24h úteis)
3. Orientar portal + Assistente
4. Se CNPJ informado → API consulta-cnpj para status real
5. Não inventar data de liberação

## Exemplos

**Cliente:** "Paguei ontem, quando libera?"
**IA:** Agradecer + prazo + portal + pedir CNPJ se quiser conferir status

**Cliente:** "Enviei comprovante"
**IA:** Agradecer + explicar que sistema confirma automaticamente + portal

## Quando NÃO usar

Cliente ainda não pagou — orientar boleto (`financeiro/boleto.md`).

## Transferência humana

Mais de 48h úteis sem liberação com CNPJ confirmado; cliente exige reembolso; ameaça Reclame Aqui.
