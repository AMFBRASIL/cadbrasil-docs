# Fluxo — Reclamação e Risco

## Objetivo

Árvore de decisão para reclamações, acusações e situações de risco reputacional.

## Quando usar

Classificação: RISCO ou sentimento NÍVEL 4.

## Palavras-chave do cliente

golpe, fraude, procon, advogado, processo, reclame aqui, roubo

## Árvore de decisão

```
MENSAGEM: reclamação / risco
│
├─ Palavra-gatilho crítica?
│   ├─ golpe/fraude/advogado/processo/Procon/Reclame Aqui
│   │   └─ Score +10 → humano IMEDIATO
│   └─ irritação sem órgão formal
│       └─ sentimento nível 3 → máx 2 tentativas
│
├─ Resposta:
│   ├─ Empatia (1 linha)
│   ├─ Esclarecimento breve: CADBRASIL = privada
│   └─ NÃO confrontar / NÃO textos longos
│
├─ Artigo detalhado se dúvida educada:
│   └─ seguranca/respostas-sensiveis.md
│
└─ Template: templates/transferir-humano.md
```

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

Lamento pela situação. A CADBRASIL é empresa **privada** de tecnologia e assessoria — não somos o Governo Federal.

Vou encaminhar para um **consultor humano** analisar seu caso.

⏰ Seg–Sex, 08h–18h. Informe seu CNPJ se possível.

## Artigos relacionados

- `reclamacoes/tratamento.md`
- `seguranca/respostas-sensiveis.md`
- `intencoes/cliente-irritado.md`
- `inteligencia/score-transferencia.md`

## Quando NÃO usar

Pergunta educada "vocês são governo?" sem hostilidade → intencoes/cliente-pergunta-governo.md (pode não escalar na 1ª vez).

## Transferência humana

**Sempre** em nível 4 ou score +10.
