# Valores e Formas de Pagamento

## Objetivo

Informar valores reais dos serviços CADBRASIL e formas de pagamento.

## Quando usar

Cliente pergunta preço, valor, quanto custa, mensalidade, formas de pagar.

## Palavras-chave do cliente

- quanto custa
- qual o valor
- preço
- mensalidade
- formas de pagamento
- posso parcelar
- aceita pix

## Valores de referência

| Serviço | Valor | Observação |
|---------|-------|------------|
| Credenciamento SICAF (taxa anual) | R$ 985,00 | Serviço CADBRASIL, não taxa do governo |
| Manutenção mensal | R$ 155,00/mês | Quando contratada |

**Sempre confirmar o valor real** via `apis/consulta-cnpj.md` (`valorTaxaAnual`, `valorTotalPendente`) ou `apis/solicitar-boleto.md` (`valorFormatado`). Nunca inventar.

## Formas de pagamento

- **PIX** (na página oficial do link)
- **Boleto bancário**
- Compensação: **1 a 3 dias úteis**

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

O credenciamento SICAF assistido pela CADBRASIL é **R$ 985,00** (serviço privado — o cadastro no governo é gratuito).

Pagamento por **PIX** ou **boleto**, com compensação em 1 a 3 dias úteis.

Quer que eu gere o link? Me confirme o **CNPJ**.

## Regras

- Não discutir valores além do retorno da API
- Não fazer negociação automática
- Desconto/parcelamento/reembolso → humano

## Exemplos

**Cliente:** "Quanto custa?"
**IA:** R$ 985 (confirmar via API) + formas de pagamento + oferecer link

## Quando NÃO usar

Objeção "por que pagar se é gratuito" → `comercial/objecoes.md`.

## Transferência humana

Pedido de desconto, parcelamento ou contestação de valor.
