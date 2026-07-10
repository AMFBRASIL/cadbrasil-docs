import coreIdentidade from "../../../assistente-whatsapp/core/00-identidade.md?raw";
import coreRegras from "../../../assistente-whatsapp/core/01-regras-criticas.md?raw";
import coreQualidade from "../../../assistente-whatsapp/core/02-qualidade-respostas.md?raw";
import apiConsulta from "../../../assistente-whatsapp/apis/consulta-cnpj.md?raw";
import apiBoletos from "../../../assistente-whatsapp/apis/consulta-boletos.md?raw";
import apiBoleto from "../../../assistente-whatsapp/apis/solicitar-boleto.md?raw";
import intelClassificador from "../../../assistente-whatsapp/inteligencia/classificador-intencao.md?raw";
import intelSentimento from "../../../assistente-whatsapp/inteligencia/sentimento-cliente.md?raw";
import intelScore from "../../../assistente-whatsapp/inteligencia/score-transferencia.md?raw";
import ctxMemoria from "../../../assistente-whatsapp/contexto/memoria-atendimento.md?raw";
import docNecessarios from "../../../assistente-whatsapp/documentos/documentos-necessarios.md?raw";
import finValores from "../../../assistente-whatsapp/financeiro/valores.md?raw";
import fluxoNovo from "../../../assistente-whatsapp/fluxos/fluxo-novo-cliente.md?raw";
import fluxoAtualizacao from "../../../assistente-whatsapp/fluxos/fluxo-atualizacao-sicaf.md?raw";
import fluxoRenovacao from "../../../assistente-whatsapp/fluxos/fluxo-renovacao.md?raw";
import fluxoPagamento from "../../../assistente-whatsapp/fluxos/fluxo-pagamento.md?raw";
import fluxoReclamacao from "../../../assistente-whatsapp/fluxos/fluxo-reclamacao.md?raw";
import fluxoCertificado from "../../../assistente-whatsapp/fluxos/fluxo-certificado.md?raw";
import segRespostas from "../../../assistente-whatsapp/seguranca/respostas-sensiveis.md?raw";
import comBeneficios from "../../../assistente-whatsapp/comercial/beneficios-cadbrasil.md?raw";
import comPorque from "../../../assistente-whatsapp/comercial/porque-contratar.md?raw";
import comComparativo from "../../../assistente-whatsapp/comercial/comparativo-fazer-sozinho.md?raw";
import comObjecoes from "../../../assistente-whatsapp/comercial/objecoes.md?raw";
import intencaoNovo from "../../../assistente-whatsapp/intencoes/cliente-novo.md?raw";
import intencaoPagou from "../../../assistente-whatsapp/intencoes/cliente-ja-pagou.md?raw";
import intencaoRenovacao from "../../../assistente-whatsapp/intencoes/cliente-renovacao.md?raw";
import intencaoIrritado from "../../../assistente-whatsapp/intencoes/cliente-irritado.md?raw";
import intencaoGoverno from "../../../assistente-whatsapp/intencoes/cliente-pergunta-governo.md?raw";
import sicafOque from "../../../assistente-whatsapp/sicaf/oque-e-sicaf.md?raw";
import sicafNiveis from "../../../assistente-whatsapp/sicaf/niveis-sicaf.md?raw";
import portalLogin from "../../../assistente-whatsapp/portal-fornecedor/login.md?raw";
import portalSenha from "../../../assistente-whatsapp/portal-fornecedor/senha.md?raw";
import portalPrimeiro from "../../../assistente-whatsapp/portal-fornecedor/primeiro-acesso.md?raw";
import portalProblemas from "../../../assistente-whatsapp/portal-fornecedor/problemas-acesso.md?raw";
import assistenteComo from "../../../assistente-whatsapp/assistente-sicaf/como-usar.md?raw";
import videosTutoriais from "../../../assistente-whatsapp/videos/videos-tutoriais.md?raw";
import certPrecisa from "../../../assistente-whatsapp/certificado-digital/precisa-certificado.md?raw";
import certA1 from "../../../assistente-whatsapp/certificado-digital/certificado-a1.md?raw";
import certA3 from "../../../assistente-whatsapp/certificado-digital/certificado-a3.md?raw";
import certErros from "../../../assistente-whatsapp/certificado-digital/erros-certificado.md?raw";
import finBoleto from "../../../assistente-whatsapp/financeiro/boleto.md?raw";
import finConfirmado from "../../../assistente-whatsapp/financeiro/pagamento-confirmado.md?raw";
import finRenovacao from "../../../assistente-whatsapp/financeiro/renovacao.md?raw";
import finSegundaVia from "../../../assistente-whatsapp/financeiro/segunda-via.md?raw";
import probAcesso from "../../../assistente-whatsapp/problemas/erro-acesso.md?raw";
import probDocumento from "../../../assistente-whatsapp/problemas/erro-documento.md?raw";
import probCertidao from "../../../assistente-whatsapp/problemas/erro-certidao.md?raw";
import probSicaf from "../../../assistente-whatsapp/problemas/erro-sicaf.md?raw";
import tplBoasVindas from "../../../assistente-whatsapp/templates/boas-vindas-whatsapp.md?raw";
import tplPagamento from "../../../assistente-whatsapp/templates/pagamento-aprovado.md?raw";
import tplCnpj from "../../../assistente-whatsapp/templates/solicitar-cnpj.md?raw";
import tplEncerrar from "../../../assistente-whatsapp/templates/encerrar-atendimento.md?raw";
import tplHumano from "../../../assistente-whatsapp/templates/transferir-humano.md?raw";
import escalar from "../../../assistente-whatsapp/escalonamento/quando-escalar.md?raw";
import reclamacao from "../../../assistente-whatsapp/reclamacoes/tratamento.md?raw";

export type KbArticle = {
  id: string;
  title: string;
  group: string;
  source: string;
  path: string;
};

function titleFromMarkdown(source: string): string {
  const first = source.split("\n").find((l) => l.startsWith("# "));
  return first ? first.slice(2).trim() : "Artigo";
}

function article(
  id: string,
  group: string,
  path: string,
  source: string,
  title?: string,
): KbArticle {
  return {
    id,
    title: title ?? titleFromMarkdown(source),
    group,
    source,
    path,
  };
}

export const kbArticles: KbArticle[] = [
  // Core
  article("kb-core-identidade", "Core", "core/00-identidade.md", coreIdentidade),
  article("kb-core-regras", "Core", "core/01-regras-criticas.md", coreRegras),
  article("kb-core-qualidade", "Core", "core/02-qualidade-respostas.md", coreQualidade),
  // Inteligência
  article("kb-intel-classificador", "Inteligência", "inteligencia/classificador-intencao.md", intelClassificador),
  article("kb-intel-sentimento", "Inteligência", "inteligencia/sentimento-cliente.md", intelSentimento),
  article("kb-intel-score", "Inteligência", "inteligencia/score-transferencia.md", intelScore),
  // APIs (fonte única do bot)
  article("kb-api-consulta", "APIs", "apis/consulta-cnpj.md", apiConsulta),
  article("kb-api-boletos", "APIs", "apis/consulta-boletos.md", apiBoletos),
  article("kb-api-boleto", "APIs", "apis/solicitar-boleto.md", apiBoleto),
  // Contexto
  article("kb-ctx-memoria", "Contexto", "contexto/memoria-atendimento.md", ctxMemoria),
  // Fluxos
  article("kb-fluxo-novo", "Fluxos", "fluxos/fluxo-novo-cliente.md", fluxoNovo),
  article("kb-fluxo-atualizacao", "Fluxos", "fluxos/fluxo-atualizacao-sicaf.md", fluxoAtualizacao),
  article("kb-fluxo-renovacao", "Fluxos", "fluxos/fluxo-renovacao.md", fluxoRenovacao),
  article("kb-fluxo-pagamento", "Fluxos", "fluxos/fluxo-pagamento.md", fluxoPagamento),
  article("kb-fluxo-reclamacao", "Fluxos", "fluxos/fluxo-reclamacao.md", fluxoReclamacao),
  article("kb-fluxo-certificado", "Fluxos", "fluxos/fluxo-certificado.md", fluxoCertificado),
  // Segurança
  article("kb-seg-respostas", "Segurança", "seguranca/respostas-sensiveis.md", segRespostas),
  // Comercial
  article("kb-com-beneficios", "Comercial", "comercial/beneficios-cadbrasil.md", comBeneficios),
  article("kb-com-porque", "Comercial", "comercial/porque-contratar.md", comPorque),
  article("kb-com-comparativo", "Comercial", "comercial/comparativo-fazer-sozinho.md", comComparativo),
  article("kb-com-objecoes", "Comercial", "comercial/objecoes.md", comObjecoes),
  // Intenções
  article("kb-intencao-novo", "Intenções", "intencoes/cliente-novo.md", intencaoNovo),
  article("kb-intencao-pagou", "Intenções", "intencoes/cliente-ja-pagou.md", intencaoPagou),
  article("kb-intencao-renovacao", "Intenções", "intencoes/cliente-renovacao.md", intencaoRenovacao),
  article("kb-intencao-irritado", "Intenções", "intencoes/cliente-irritado.md", intencaoIrritado),
  article("kb-intencao-governo", "Intenções", "intencoes/cliente-pergunta-governo.md", intencaoGoverno),
  // SICAF
  article("kb-sicaf-oque", "SICAF", "sicaf/oque-e-sicaf.md", sicafOque),
  article("kb-sicaf-niveis", "SICAF", "sicaf/niveis-sicaf.md", sicafNiveis),
  // Portal
  article("kb-portal-login", "Portal", "portal-fornecedor/login.md", portalLogin),
  article("kb-portal-senha", "Portal", "portal-fornecedor/senha.md", portalSenha),
  article("kb-portal-primeiro", "Portal", "portal-fornecedor/primeiro-acesso.md", portalPrimeiro),
  article("kb-portal-problemas", "Portal", "portal-fornecedor/problemas-acesso.md", portalProblemas),
  // Assistente
  article("kb-assistente-como", "Assistente", "assistente-sicaf/como-usar.md", assistenteComo),
  // Vídeos
  article("kb-videos-tutoriais", "Vídeos", "videos/videos-tutoriais.md", videosTutoriais),
  // Certificado
  article("kb-cert-precisa", "Certificado", "certificado-digital/precisa-certificado.md", certPrecisa),
  article("kb-cert-a1", "Certificado", "certificado-digital/certificado-a1.md", certA1),
  article("kb-cert-a3", "Certificado", "certificado-digital/certificado-a3.md", certA3),
  article("kb-cert-erros", "Certificado", "certificado-digital/erros-certificado.md", certErros),
  // Documentos
  article("kb-doc-necessarios", "Documentos", "documentos/documentos-necessarios.md", docNecessarios),
  // Financeiro
  article("kb-fin-valores", "Financeiro", "financeiro/valores.md", finValores),
  article("kb-fin-boleto", "Financeiro", "financeiro/boleto.md", finBoleto),
  article("kb-fin-confirmado", "Financeiro", "financeiro/pagamento-confirmado.md", finConfirmado),
  article("kb-fin-renovacao", "Financeiro", "financeiro/renovacao.md", finRenovacao),
  article("kb-fin-segunda-via", "Financeiro", "financeiro/segunda-via.md", finSegundaVia),
  // Problemas
  article("kb-prob-acesso", "Problemas", "problemas/erro-acesso.md", probAcesso),
  article("kb-prob-documento", "Problemas", "problemas/erro-documento.md", probDocumento),
  article("kb-prob-certidao", "Problemas", "problemas/erro-certidao.md", probCertidao),
  article("kb-prob-sicaf", "Problemas", "problemas/erro-sicaf.md", probSicaf),
  // Templates
  article("kb-tpl-boas-vindas", "Templates", "templates/boas-vindas-whatsapp.md", tplBoasVindas),
  article("kb-tpl-pagamento", "Templates", "templates/pagamento-aprovado.md", tplPagamento),
  article("kb-tpl-cnpj", "Templates", "templates/solicitar-cnpj.md", tplCnpj),
  article("kb-tpl-encerrar", "Templates", "templates/encerrar-atendimento.md", tplEncerrar),
  article("kb-tpl-humano", "Templates", "templates/transferir-humano.md", tplHumano),
  // Escalonamento
  article("kb-escalar", "Escalonamento", "escalonamento/quando-escalar.md", escalar),
  article("kb-reclamacao", "Reclamações", "reclamacoes/tratamento.md", reclamacao),
];

export const kbGroupOrder = [
  "Core",
  "Inteligência",
  "APIs",
  "Contexto",
  "Fluxos",
  "Segurança",
  "Comercial",
  "Intenções",
  "SICAF",
  "Portal",
  "Assistente",
  "Vídeos",
  "Certificado",
  "Documentos",
  "Financeiro",
  "Problemas",
  "Templates",
  "Escalonamento",
  "Reclamações",
] as const;
