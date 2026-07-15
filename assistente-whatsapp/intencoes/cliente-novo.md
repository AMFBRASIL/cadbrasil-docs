# Intenção — Cliente Novo (quer fazer SICAF)

## Objetivo

Atender quem nunca usou a CADBRASIL e quer cadastrar empresa para vender ao governo.

## Quando usar

Cliente sem histórico ou primeira mensagem sobre cadastro.

## Palavras-chave do cliente

- quero fazer sicaf
- preciso cadastrar minha empresa
- quero vender para o governo
- como faço sicaf
- preciso do sicaf
- primeira vez
- nunca fiz sicaf

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

Olá! Ajudamos fornecedores a credenciar e manter o **SICAF** para participar de licitações.

A CADBRASIL oferece **plataforma, Assistente CADBRASIL e suporte** para facilitar todo o processo.

**Não abrir** o tema fazer sozinho / grátis nesta resposta — só se o cliente perguntar (`comercial/objecoes.md`).

**Para começar, me informe o CNPJ da empresa** (apenas números).

Após consultar, oriento o próximo passo.

🔐 Portal: https://fornecedor.cadbrasil.com.br

## Fluxo IA

1. Explicar em 2–3 linhas (sem texto longo)
2. Solicitar CNPJ
3. Chamar **API consulta-cnpj** (Etapa 1)
4. Conforme `situacaoCadastro`: orientar cadastro, boleto ou Assistente
5. Só enviar boleto se cliente pedir → **API solicitar-boleto** (Etapa 2)

## Exemplos

**Cliente:** "Quero fazer SICAF"
**IA:** Boas-vindas + explicação curta + pedir CNPJ

**Cliente:** "CNPJ 28.552.323/0001-07"
**IA:** Consulta API → responde situação → não envia link até pedir

## Quando NÃO usar

Cliente já pagou ou já tem cadastro ativo — usar `cliente-ja-pagou.md` ou consulta por CNPJ.

## Transferência humana

CNPJ inválido 2x; cliente confuso sobre golpe; pedido de reembolso antes de pagar.
