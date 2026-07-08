/** Componentes reutilizáveis da documentação CADBRASIL Oficial. */

export type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

export function H({ children }: { children: React.ReactNode }) {
  return <p className="text-foreground leading-relaxed">{children}</p>;
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-3 space-y-1.5 pl-5 list-disc marker:text-muted-foreground/60">
      {items.map((it, i) => (
        <li key={i} className="text-foreground leading-relaxed">
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-[12.5px] leading-relaxed">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  );
}

export function Endpoint({ method, url }: { method: string; url: string }) {
  return (
    <div className="my-3 flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-[13px]">
      <span className="rounded bg-foreground px-1.5 py-0.5 text-[11px] font-semibold text-background">
        {method}
      </span>
      <span className="break-all text-foreground">{url}</span>
    </div>
  );
}

export function VideoLink({ href }: { href: string }) {
  if (!href) {
    return (
      <span className="italic text-muted-foreground">
        Vídeo em breve — link será adicionado.
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-foreground underline underline-offset-4 hover:opacity-70"
    >
      Ver vídeo no YouTube
    </a>
  );
}

export function WaLink() {
  return (
    <a
      href="https://wa.me/551121220202"
      target="_blank"
      rel="noreferrer"
      className="font-medium text-foreground underline underline-offset-4 hover:opacity-70"
    >
      (11) 2122-0202
    </a>
  );
}

export function ShortAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 rounded-md border border-border bg-muted/20 px-4 py-3 text-[14px] leading-relaxed">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Resposta curta (WhatsApp)
      </p>
      {children}
    </div>
  );
}

export function Escalar({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
      <span className="font-medium text-foreground">Escalar humano: </span>
      {children}
    </p>
  );
}

export function Callout({
  tone = "info",
  children,
}: {
  tone?: "info" | "warn" | "ok";
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    info: "border-l-foreground/40 bg-muted/30",
    warn: "border-l-destructive bg-destructive/5",
    ok: "border-l-emerald-600 bg-emerald-500/5",
  };
  return (
    <div
      className={`my-4 border-l-2 ${tones[tone]} rounded-r-md px-4 py-3 text-[14px] leading-relaxed text-foreground`}
    >
      {children}
    </div>
  );
}

export function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 text-base font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {headers.map((h) => (
              <th
                key={h}
                className="px-3 py-2 font-semibold text-foreground whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-3 py-2 align-top text-foreground leading-snug"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ScenarioBlock({
  title,
  badge,
  when,
  fields,
  children,
  clientMessage,
  iaDo,
  iaDont,
  tone = "info",
}: {
  title: string;
  badge?: string;
  when: React.ReactNode;
  fields?: React.ReactNode;
  children?: React.ReactNode;
  clientMessage?: React.ReactNode;
  iaDo?: React.ReactNode;
  iaDont?: React.ReactNode;
  tone?: "info" | "warn" | "ok";
}) {
  const badgeTone: Record<string, string> = {
    info: "bg-muted text-foreground",
    warn: "bg-destructive/10 text-destructive",
    ok: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  };
  return (
    <div className="my-8 scroll-mt-24 rounded-lg border border-border p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        {badge ? (
          <span
            className={`rounded px-2 py-0.5 font-mono text-[11px] ${badgeTone[tone]}`}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Quando ocorre
      </p>
      <div className="mb-4 text-[14px] leading-relaxed text-foreground">{when}</div>
      {fields ? (
        <>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Campos principais
          </p>
          <div className="mb-4 text-[14px] leading-relaxed text-foreground">{fields}</div>
        </>
      ) : null}
      {children}
      {clientMessage ? (
        <div className="my-4 rounded-md border border-border bg-muted/20 px-4 py-3 text-[14px] leading-relaxed">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Mensagem para o cliente (WhatsApp)
          </p>
          {clientMessage}
        </div>
      ) : null}
      {iaDo ? (
        <div className="mt-3 text-[14px] leading-relaxed">
          <p className="mb-1 font-medium text-foreground">O que a IA deve fazer</p>
          {iaDo}
        </div>
      ) : null}
      {iaDont ? (
        <div className="mt-3 text-[14px] leading-relaxed">
          <p className="mb-1 font-medium text-foreground">O que a IA NÃO deve fazer</p>
          {iaDont}
        </div>
      ) : null}
    </div>
  );
}
