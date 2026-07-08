import type { Section } from "@/lib/docs-ui";
import { Callout } from "@/lib/docs-ui";
import { kbArticles } from "@/content/kb/articles";
import { MarkdownBody } from "@/content/kb/markdown-body";

export const kbHubSection: Section = {
  id: "kb-assistente-whatsapp",
  title: "Base RAG — Assistente WhatsApp",
  body: (
    <>
      <Callout tone="ok">
        <strong>Documento exclusivo do WhatsApp.</strong> Tudo aqui é lido pelo
        bot. Não há conteúdo &quot;só para humanos&quot; — o Assistente indexa
        todos os arquivos <code>.md</code> desta base (catálogo em{" "}
        <code>manifest.json</code>).
      </Callout>
      <Callout tone="info">
        Artigos modulares em <code>assistente-whatsapp/</code> — motor de
        inteligência V2 + RAG. Pipeline por mensagem: classificar → sentimento →
        memória → fluxo → score → responder. As APIs reais (consulta-cnpj e
        solicitar-boleto), o uso delas e o retorno de dados ao cliente estão no
        grupo <strong>APIs</strong>.
      </Callout>
      <p className="leading-relaxed text-foreground">
        Core → Inteligência → APIs → Contexto → Fluxos → Segurança → Comercial →
        Intenções → SICAF → Portal → Assistente → Certificado → Documentos →
        Financeiro → Problemas → Templates → Escalonamento → Reclamações.
      </p>
      <p className="leading-relaxed text-muted-foreground">
        Regra máxima: CADBRASIL é empresa privada. SICAF governo é gratuito.
        Boleto → API solicitar-boleto → enviar link ao cliente (sem escalar
        humano).
      </p>
    </>
  ),
};

export const kbSections: Section[] = [
  kbHubSection,
  ...kbArticles.map((article) => ({
    id: article.id,
    title: `[${article.group}] ${article.title}`,
    body: (
      <>
        <p className="mb-3 font-mono text-[11px] text-muted-foreground">
          assistente-whatsapp/{article.path}
        </p>
        <MarkdownBody source={article.source} />
      </>
    ),
  })),
];
