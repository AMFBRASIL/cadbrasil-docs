import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { sections } from "@/content/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Documentação CADBRASIL Oficial — Central de Dúvidas" },
      {
        name: "description",
        content:
          "Base de conhecimento CADBRASIL Oficial para IA e atendimento: SICAF, valores, boletos, APIs, vídeos, manutenção e escalonamento humano.",
      },
      { property: "og:title", content: "Documentação CADBRASIL Oficial" },
      {
        property: "og:description",
        content:
          "Central de dúvidas frequentes e referência técnica da CADBRASIL Oficial para atendimento via WhatsApp.",
      },
    ],
  }),
  component: DocsPage,
});

function DocsPage() {
  const [active, setActive] = useState<string>(sections[0]!.id);

  const ids = useMemo(() => sections.map((s) => s.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-[12px] font-bold">
              CB
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                CADBRASIL Oficial
              </span>
              <span className="text-[11px] text-muted-foreground">
                Documentação · v2.0 · IA + WhatsApp
              </span>
            </div>
          </div>
          <a
            href="https://fornecedor.CADBRASIL Oficial.com.br"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
          >
            Área do Fornecedor →
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Tópicos ({sections.length})
            </p>
            <ul className="space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`block rounded-md px-2.5 py-1.5 text-[13px] leading-snug transition-colors ${
                      active === s.id
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main>
          <div className="mb-10 border-b border-border pb-8">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Central de Dúvidas Frequentes
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Documentação CADBRASIL Oficial
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Base de conhecimento para atendimento humano e por IA no WhatsApp.
              Inclui respostas curtas, regras de escalonamento, APIs, valores,
              vídeos e sinônimos de intenção.
            </p>
          </div>

          <div className="space-y-14">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="font-mono text-[12px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    <a href={`#${s.id}`} className="hover:opacity-70">
                      {s.title}
                    </a>
                  </h2>
                </div>
                <div className="space-y-2 text-[15px]">{s.body}</div>
              </section>
            ))}
          </div>

          <footer className="mt-20 border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} CADBRASIL Oficial · Documentação v2.0 ·
            Atendimento: (11) 2122-0202
          </footer>
        </main>
      </div>
    </div>
  );
}
