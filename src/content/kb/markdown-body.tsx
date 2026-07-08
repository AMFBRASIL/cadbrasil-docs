import type { ReactNode } from "react";

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re =
    /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++}>{token.slice(2, -2)}</strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[13px]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (m) {
        nodes.push(
          <a
            key={key++}
            href={m[2]}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:opacity-70"
          >
            {m[1]}
          </a>,
        );
      }
    } else if (token.startsWith("http")) {
      nodes.push(
        <a
          key={key++}
          href={token}
          target="_blank"
          rel="noreferrer"
          className="break-all font-medium underline underline-offset-4 hover:opacity-70"
        >
          {token}
        </a>,
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? nodes : [text];
}

function isTableRow(line: string) {
  return line.trim().startsWith("|");
}

function parseTable(rows: string[]) {
  const cells = rows.map((row) =>
    row
      .split("|")
      .map((c) => c.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length - 1),
  );
  const header = cells[0] ?? [];
  const body = cells.slice(2);
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-[14px]">
        <thead className="border-b border-border bg-muted/40">
          <tr>
            {header.map((h, i) => (
              <th key={i} className="px-3 py-2 font-semibold">
                {parseInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className="border-b border-border last:border-0">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 align-top">
                  {parseInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarkdownBody({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i]!;

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h3
          key={key++}
          className="mt-6 text-lg font-semibold tracking-tight text-foreground first:mt-0"
        >
          {line.slice(2)}
        </h3>,
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h4
          key={key++}
          className="mt-5 border-b border-border pb-1 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {line.slice(3)}
        </h4>,
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h5 key={key++} className="mt-4 text-[15px] font-semibold text-foreground">
          {line.slice(4)}
        </h5>,
      );
      i++;
      continue;
    }

    if (isTableRow(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && isTableRow(lines[i]!)) {
        tableLines.push(lines[i]!);
        i++;
      }
      blocks.push(<div key={key++}>{parseTable(tableLines)}</div>);
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i]!.startsWith("- ")) {
        items.push(lines[i]!.slice(2));
        i++;
      }
      blocks.push(
        <ul
          key={key++}
          className="my-2 list-disc space-y-1 pl-5 marker:text-muted-foreground/60"
        >
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {parseInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i]!.trim() &&
      !lines[i]!.startsWith("#") &&
      !lines[i]!.startsWith("- ") &&
      !isTableRow(lines[i]!)
    ) {
      para.push(lines[i]!);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-2 leading-relaxed text-foreground">
        {parseInline(para.join(" "))}
      </p>,
    );
  }

  return <div className="kb-markdown space-y-1">{blocks}</div>;
}
