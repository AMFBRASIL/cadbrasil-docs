# Intenção — Renovação SICAF / Cadastro Vencido

## Objetivo

Direcionar cliente com cadastro vencido ou certidões expiradas para renovação via Assistente.

## Quando usar

Cliente menciona renovação, vencimento ou certidão vencida.

## Palavras-chave do cliente

- renovar sicaf
- meu cadastro venceu
- certidão vencida
- sicaf expirou
- preciso renovar
- validade do sicaf
- cadastro vencido

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

Para **renovar** o SICAF e atualizar certidões:

1. Acesse https://fornecedor.cadbrasil.com.br
2. Faça login
3. Abra o **Assistente CADBRASIL**
4. Siga as etapas de renovação e envie os documentos solicitados

O Assistente guia cada passo. Se pedir certificado digital, use o A1 ou A3 da empresa.

Me informe o **CNPJ** se quiser que eu verifique a situação atual.

## Fluxo IA

1. Confirmar intenção de renovação
2. Direcionar Assistente SICAF (não portal governo direto)
3. Consulta CNPJ se informado
4. Se licitação iminente + vencido → escalar humano

## Exemplos

**Cliente:** "Meu SICAF venceu"
**IA:** Portal + Assistente + oferta de consulta CNPJ

**Cliente:** "Certidão negativa vencida"
**IA:** Assistente para atualizar + link portal

## Quando NÃO usar

Cliente novo sem cadastro — usar `cliente-novo.md`.

## Transferência humana

Licitação em menos de 48h; cliente não consegue acessar portal após orientação; múltiplas certidões com erro.
