# Fluxo — Novo Cliente

## Objetivo

Árvore de decisão para quem quer contratar ou fazer SICAF pela primeira vez.

## Quando usar

Classificação: NOVO_CLIENTE (`inteligencia/classificador-intencao.md`).

## Palavras-chave do cliente

quero fazer sicaf, cadastrar empresa, vender governo, primeira vez

## Árvore de decisão

```
MENSAGEM: intenção de cadastro/contratação
│
├─ Memória tem CNPJ?
│   ├─ NÃO → Pedir CNPJ (templates/solicitar-cnpj.md)
│   └─ SIM → API consulta-cnpj (Etapa 1)
│
├─ API retornou situacaoCadastro?
│   ├─ Sem cadastro / pendente pagamento
│   │   └─ Explicar situação + oferecer boleto SE cliente pedir
│   ├─ Ativo / em processamento
│   │   └─ Portal + Assistente CADBRASIL
│   └─ CNPJ não encontrado (2x)
│       └─ Transferir humano (+5 score)
│
├─ Cliente pede boleto/link?
│   └─ SIM → API solicitar-boleto → urlPagamento (NÃO escalar)
│
└─ Dúvida "posso fazer sozinho / de graça"?
    └─ comercial/objecoes.md (sem orientação; link cadastro.cadbrasil.com.br)
```

## Resposta padrão IA

🇧🇷 **CADBRASIL Oficial ®**

Entendi — você quer iniciar o cadastro SICAF.

Me informe o **CNPJ** para eu verificar a situação e orientar o próximo passo.

🔐 Portal: https://fornecedor.cadbrasil.com.br

## Próximo passo por cenário

| Cenário API | Ação |
|-------------|------|
| Novo | Explicar serviço + aguardar pedido de boleto |
| Pendente | Status + boleto se pedir |
| Ativo | Portal + Assistente |

## Artigos relacionados

- `intencoes/cliente-novo.md`
- `financeiro/boleto.md`
- `comercial/porque-contratar.md`

## Quando NÃO usar

Cliente já ativo só quer suporte → fluxo-atualizacao-sicaf.

## Transferência humana

CNPJ inválido 2x; objeção golpe não resolvida; score ≥10.
