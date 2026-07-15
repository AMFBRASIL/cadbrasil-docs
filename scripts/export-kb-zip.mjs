#!/usr/bin/env node
/**
 * Exporta assistente-whatsapp/ para ZIP (Markdown + manifest) — upload na IA.
 * Uso: node scripts/export-kb-zip.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "assistente-whatsapp");
const exportDir = path.join(root, "export");
const stagingDir = path.join(exportDir, "cadbrasil-assistente-whatsapp-kb");
const zipPath = path.join(exportDir, "cadbrasil-assistente-whatsapp-kb.zip");

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyRecursive(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyRecursive(src, dest);
    else fs.copyFileSync(src, dest);
  }
}

function countMdFiles(dir) {
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) n += countMdFiles(p);
    else if (entry.name.endsWith(".md")) n += 1;
  }
  return n;
}

function buildIndex(manifest) {
  const lines = [
    "# CADBRASIL — Base de Conhecimento WhatsApp (exportação para IA)",
    "",
    `Gerado em: ${new Date().toISOString()}`,
    `Versão manifest: ${manifest.version}`,
    "",
    "## Como usar na IA",
    "",
    "1. Descompacte este ZIP.",
    "2. Envie **todos** os arquivos `.md` para a base de conhecimento (RAG / Files / Assistant).",
    "3. Use `manifest.json` como catálogo oficial dos artigos.",
    "4. Pipeline por mensagem: classificar → sentimento → memória → fluxo → score → responder.",
    "",
    "## Pipeline operacional",
    "",
    ...manifest.pipeline.map((p) => `- ${p}`),
    "",
    "## Artigos (" + manifest.articles.length + ")",
    "",
  ];

  let group = "";
  for (const a of manifest.articles) {
    if (a.group !== group) {
      group = a.group;
      lines.push("", `### ${group}`, "");
    }
    lines.push(`- \`${a.path}\` — ${a.id}`);
  }

  lines.push(
    "",
    "## APIs (ordem de chamada)",
    "",
    "1. `apis/consulta-cnpj.md` — Etapa 1 após CNPJ (sem link)",
    "2. `apis/consulta-boletos.md` — listar boletos pendentes (opcional)",
    "3. `apis/solicitar-boleto.md` — Etapa 2 quando cliente pedir boleto → urlPagamento",
    "",
    "Portal: https://fornecedor.cadbrasil.com.br",
    "",
  );

  return lines.join("\n");
}

if (!fs.existsSync(srcDir)) {
  console.error("Pasta não encontrada:", srcDir);
  process.exit(1);
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(srcDir, "manifest.json"), "utf8"),
);

console.log("==> Preparando exportação...");
fs.mkdirSync(exportDir, { recursive: true });
rmrf(stagingDir);
copyRecursive(srcDir, stagingDir);

const indexPath = path.join(stagingDir, "00-LEIA-ME-EXPORT-IA.md");
fs.writeFileSync(indexPath, buildIndex(manifest), "utf8");

const mdCount = countMdFiles(stagingDir);
console.log(`    ${mdCount} arquivos .md (+ manifest.json)`);

if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

const isWin = process.platform === "win32";
if (isWin) {
  const ps = `Compress-Archive -Path '${stagingDir.replace(/'/g, "''")}' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force`;
  execSync(`powershell -NoProfile -Command "${ps}"`, { stdio: "inherit" });
} else {
  execSync(`cd "${exportDir}" && zip -r "${path.basename(zipPath)}" "${path.basename(stagingDir)}"`, {
    stdio: "inherit",
  });
}

const sizeKb = Math.round(fs.statSync(zipPath).size / 1024);
console.log("");
console.log("==> Exportação concluída!");
console.log(`    ZIP: ${zipPath}`);
console.log(`    Tamanho: ~${sizeKb} KB`);
console.log(`    Pasta staging (opcional): ${stagingDir}`);
