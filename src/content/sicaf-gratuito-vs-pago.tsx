import { Callout, Code, H, List, Section, ShortAnswer, SubTitle } from "@/lib/docs-ui";
import { LINKS } from "@/content/videos";

export const SICAF_WA_NOTE =
  "Enviar em 3–5 mensagens separadas no WhatsApp. Use *asteriscos* para negrito. Estes textos valem para: SICAF gratuito, SICAF pago, obrigatório pagar, fazer sozinho, vale a pena, diferença governo vs CADBRASIL Oficial.";

const FOOTER = `🔐 *CADBRASIL Oficial*
Tecnologia, segurança e suporte para fornecedores do Brasil. 🇧🇷`;

export const SICAF_WA_BLOCO_COMPARATIVO = `🇧🇷 *CADBRASIL Oficial ®*
💬 *SICAF Gratuito vs SICAF com CADBRASIL Oficial*

Olá! 👋 Vou explicar a diferença de forma clara:

━━━━━━━━━━━━━━━━

📊 *COMPARATIVO RÁPIDO*

🏛️ *SICAF GRATUITO (Governo — fazer sozinho)*
💰 Custo: *R$ 0* ao governo
📋 Você faz *tudo sozinho*
⚠️ Risco: *ALTO*
🆘 Suporte: *nenhum*
🤖 Ferramentas: *nenhuma*
📈 Licitações/IA: *por sua conta*

🏢 *SICAF COM CADBRASIL OFICIAL (R$ 985,00)*
💰 Investimento: *R$ 985* (assessoria + plataforma)
📋 *Equipe + Assistente* conduzem o processo
✅ Risco: *muito menor*
🆘 Suporte: *WhatsApp + consultores*
🤖 Portal completo com *IA*
📈 Licitações, editais, certidões *integrados*

📌 O R$ 985 *NÃO é taxa do governo* — é o serviço completo da CADBRASIL Oficial.`;

export const SICAF_WA_BLOCO_RISCOS = `⚠️ *RISCOS — Cadastrar sozinho de graça*

O SICAF do governo é gratuito — *mas gratuito não é simples nem seguro*.

Quem faz *sozinho* precisa acertar *tudo*, sem erro:

❌ Documento enviado *errado* ou incompleto
❌ Certidão *vencida* no dia da licitação
❌ Nível SICAF *pendente* sem perceber
❌ Prazo de renovação *perdido*
❌ SICAF *vencido* sem aviso prévio
❌ Edital interpretado *incorretamente*
❌ *Zero suporte* quando algo dá errado

🚨 *O que pode acontecer:*
• *Desclassificação* na licitação
• *Multas administrativas* severas
• *Impedimento* de licitar por *anos*
• Perda de contratos milionários
• Em casos graves: empresa *não volta* a vender para o governo

💡 *Um único erro* na habilitação pode custar *infinitamente mais* que R$ 985,00.`;

export const SICAF_WA_BLOCO_BENEFICIOS = `✅ *BENEFÍCIOS — CADBRASIL Oficial*

Com a CADBRASIL Oficial, você *não enfrenta esses riscos sozinho*:

🔹 *Credenciamento SICAF assistido*
   Equipe especializada + Assistente CADBRASIL passo a passo

🔹 *Análise documental*
   Conferência *antes* de enviar ao governo

🔹 *Portal completo — tudo em um lugar*
   Sem criar contas em várias empresas:
   • Módulo de *licitações* (filtrado por CNAE)
   • *Pregões* e oportunidades
   • *Editais* com acompanhamento

🔹 *Leitura de edital com IA* 🤖
   Requisitos, prazos e exigências em minutos

🔹 *Procedimentos com IA*
   Apoio inteligente nas etapas do processo

🔹 *Gestão de certidões* 📄
   Alertas por e-mail — saiba *quais* vencem e quando

🔹 *Inteligência de mercado* 📊
   Preços de *concorrentes* em certames similares

🔹 *Gerador de Impugnação*
   Contestar editais com mais agilidade

🔹 *Assistente CADBRASIL* 📲
   Documentos, certidões e suporte diário

🔹 *Suporte humano* 📞
   WhatsApp e consultores especializados

🛡️ *Resultado:* licite com *segurança* e *vantagem competitiva*.`;

export const SICAF_WA_BLOCO_PAGAMENTO = `💳 *COMO CONTRATAR / PAGAR*

Para iniciar o credenciamento assistido na CADBRASIL Oficial:

1️⃣ Acesse o cadastro:
👉 ${LINKS.cadastro}

2️⃣ Ou pague o credenciamento (R$ 985,00):
👉 ${LINKS.pagamentos}

3️⃣ Ou *informe seu CNPJ* aqui — consulto e envio o boleto

📌 Após pagamento confirmado (1–3 dias úteis):
✅ Níveis do SICAF liberados na plataforma
✅ Acesso ao portal completo
✅ Assistente CADBRASIL disponível

❓ *Ainda com dúvida?*
Solicite falar com um *atendente*! 📞

${FOOTER}`;

function WaBlock({ title, children }: { title: string; children: string }) {
  return (
    <>
      <p className="mt-4 text-sm font-medium text-muted-foreground">{title}</p>
      <Code>{children}</Code>
    </>
  );
}

/** Textos prontos WhatsApp — SICAF gratuito vs pago (usar em todas as dúvidas relacionadas). */
export function SicafComparativoWhatsAppKit() {
  return (
    <>
      <p className="mb-3 text-[13px] text-muted-foreground">{SICAF_WA_NOTE}</p>
      <WaBlock title="Bloco 1 — Comparativo rápido (gratuito vs CADBRASIL Oficial)">
        {SICAF_WA_BLOCO_COMPARATIVO}
      </WaBlock>
      <WaBlock title="Bloco 2 — Riscos de fazer sozinho (SICAF gratuito)">
        {SICAF_WA_BLOCO_RISCOS}
      </WaBlock>
      <WaBlock title="Bloco 3 — Benefícios da CADBRASIL Oficial (SICAF pago/assistido)">
        {SICAF_WA_BLOCO_BENEFICIOS}
      </WaBlock>
      <WaBlock title="Bloco 4 — Como contratar / pagar + encerramento">
        {SICAF_WA_BLOCO_PAGAMENTO}
      </WaBlock>
    </>
  );
}

/** Seção hub — textos para trabalhar quando o cliente perguntar sobre SICAF gratuito/pago. */
export const sicafGratuitoVsPagoSection: Section = {
  id: "sicaf-gratuito-vs-pago",
  title: "SICAF gratuito vs SICAF com CADBRASIL Oficial — textos WhatsApp",
  body: (
    <>
      <ShortAnswer>
        Use os 4 blocos abaixo sempre que o cliente perguntar sobre SICAF
        gratuito, SICAF pago, obrigatoriedade, fazer sozinho, vale a pena ou
        diferença entre governo e CADBRASIL Oficial.
      </ShortAnswer>

      <Callout tone="ok">
        <strong>Regra fixa para a IA:</strong> para qualquer dúvida sobre{" "}
        <strong>SICAF gratuito</strong>, <strong>SICAF pago</strong>,{" "}
        <strong>pagamento obrigatório</strong>, <strong>fazer sozinho</strong>,{" "}
        <strong>vale a pena</strong> ou <strong>por que pagar</strong> — envie
        os blocos 1 a 4 nesta seção (3–5 mensagens no WhatsApp). Não invente
        texto — use estes modelos. Não diga que o governo cobra R$ 985.
      </Callout>

      <SubTitle>Quando usar estes textos</SubTitle>
      <List
        items={[
          "O SICAF é gratuito?",
          "O pagamento do SICAF é obrigatório?",
          "Preciso pagar para ter SICAF?",
          "Qual a diferença do SICAF gratuito e pago?",
          "Posso fazer sozinho de graça?",
          "Vale a pena contratar a CADBRASIL Oficial?",
          "Por que pagar R$ 985?",
          "Quais os riscos de fazer sozinho?",
          "O que eu ganho pagando?",
        ]}
      />

      <SubTitle>Ordem de envio recomendada</SubTitle>
      <List
        items={[
          "Bloco 1 — Comparativo (sempre enviar primeiro)",
          "Bloco 2 — Riscos do caminho gratuito sozinho",
          "Bloco 3 — Benefícios da CADBRASIL Oficial",
          "Bloco 4 — Como pagar/contratar (se cliente demonstrar interesse)",
        ]}
      />

      <SubTitle>Textos prontos para o cliente (WhatsApp)</SubTitle>
      <SicafComparativoWhatsAppKit />

      <H>
        Conteúdo detalhado:{" "}
        <a href="#sicaf-gratuito" className="underline underline-offset-4">
          O SICAF é gratuito?
        </a>{" "}
        ·{" "}
        <a
          href="#pagamento-sicaf-obrigatorio"
          className="underline underline-offset-4"
        >
          O pagamento do SICAF é obrigatório?
        </a>{" "}
        ·{" "}
        <a href="#por-que-contratar" className="underline underline-offset-4">
          Por que contratar?
        </a>
      </H>

      <Callout tone="warn">
        <strong>IA:</strong> se <code>situacaoCadastro: aguardando_pagamento</code>
        , personalize Bloco 4 com razaoSocial e valor da API. Tom consultivo —
        explicar valor e segurança, não pressionar.
      </Callout>
    </>
  ),
};
