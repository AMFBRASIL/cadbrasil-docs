import { Code } from "@/lib/docs-ui";
import { LINKS } from "@/content/videos";

/** Texto WhatsApp — enviar SEMPRE os 2 links quando perguntarem sobre o Assistente. */
export const ASSISTENTE_WA_MESSAGE = `🇧🇷 *CADBRASIL Oficial ®*
💬 *Assistente CADBRASIL*

Olá! 👋 O *Assistente CADBRASIL* é nosso aplicativo exclusivo que conduz todo o processo SICAF com orientação passo a passo.

📌 *Principais funções:*
• Instalação e configuração do credenciamento
• Envio e acompanhamento de documentos
• Atualização de certidões
• Orientação sobre conta GOV.BR
• Atualização da Situação do Fornecedor no painel

✅ *Acesse agora:*

📲 *Assistente CADBRASIL:*
${LINKS.assistente}

❓ *Central de Ajuda (vídeos tutoriais):*
${LINKS.ajuda}

Na Central de Ajuda você encontra vídeos sobre instalação, envio de documentos, certidões, boletos e atualização do SICAF.

❓ Ainda com dúvida? Solicite falar com um *atendente* — estamos à disposição! 📞

🔐 *CADBRASIL Oficial*
Tecnologia, segurança e suporte para fornecedores do Brasil. 🇧🇷`;

export function AssistenteWhatsAppBlock({
  note = "Regra fixa: sempre enviar os 2 links abaixo (Assistente + Central de Ajuda), mesmo que o cliente peça só um deles.",
}: {
  note?: string;
}) {
  return (
    <>
      <p className="mb-3 text-[13px] text-muted-foreground">{note}</p>
      <Code>{ASSISTENTE_WA_MESSAGE}</Code>
    </>
  );
}

export function AssistenteLinksList() {
  return (
    <ul className="my-3 space-y-1.5 pl-5 list-disc marker:text-muted-foreground/60">
      <li className="text-foreground leading-relaxed">
        Assistente CADBRASIL:{" "}
        <a
          href={LINKS.assistente}
          className="underline underline-offset-4"
        >
          {LINKS.assistente}
        </a>
      </li>
      <li className="text-foreground leading-relaxed">
        Central de Ajuda:{" "}
        <a href={LINKS.ajuda} className="underline underline-offset-4">
          {LINKS.ajuda}
        </a>
      </li>
    </ul>
  );
}
