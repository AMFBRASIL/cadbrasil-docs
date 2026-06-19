import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Documentação CADBRASIL — Central de Dúvidas" },
      {
        name: "description",
        content:
          "Documentação completa da CADBRASIL: SICAF, valores, plataforma, APIs, boletos, suporte e atendimento. Página única para consulta humana e por IA.",
      },
      { property: "og:title", content: "Documentação CADBRASIL" },
      {
        property: "og:description",
        content:
          "Central de dúvidas frequentes e referência técnica da CADBRASIL.",
      },
    ],
  }),
  component: DocsPage,
});

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground leading-relaxed">{children}</p>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
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

function Code({ children }: { children: string }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-[12.5px] leading-relaxed">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  );
}

function Endpoint({ method, url }: { method: string; url: string }) {
  return (
    <div className="my-3 flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-[13px]">
      <span className="rounded bg-foreground px-1.5 py-0.5 text-[11px] font-semibold text-background">
        {method}
      </span>
      <span className="break-all text-foreground">{url}</span>
    </div>
  );
}

function Callout({
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

const sections: Section[] = [
  {
    id: "o-que-e",
    title: "O que é a CADBRASIL?",
    body: (
      <>
        <H>
          A CADBRASIL é uma empresa especializada em licitações públicas,
          credenciamento no SICAF, manutenção cadastral, gestão documental e
          suporte para empresas que desejam vender para órgãos públicos.
        </H>
        <H>
          Além do cadastro no SICAF, disponibilizamos uma plataforma completa
          para acompanhamento de documentos, certidões, oportunidades de
          licitações e suporte especializado.
        </H>
        <H>
          Nosso objetivo é simplificar processos burocráticos e permitir que sua
          empresa participe de licitações com mais segurança.
        </H>
      </>
    ),
  },
  {
    id: "sicaf",
    title: "O que é o SICAF?",
    body: (
      <>
        <H>SICAF significa Sistema de Cadastramento Unificado de Fornecedores.</H>
        <H>
          É o cadastro oficial utilizado pelo Governo Federal para habilitar
          empresas interessadas em participar de licitações e contratações
          públicas.
        </H>
        <Callout tone="warn">
          Sem um cadastro regular no SICAF, sua empresa pode ficar impedida de
          participar de diversas oportunidades governamentais.
        </Callout>
      </>
    ),
  },
  {
    id: "sicaf-gratuito",
    title: "O SICAF é gratuito?",
    body: (
      <>
        <H>Sim. O cadastro no SICAF é gratuito e disponibilizado pelo Governo Federal.</H>
        <H>A CADBRASIL não cobra pelo SICAF em si.</H>
        <H>
          O valor cobrado pela CADBRASIL refere-se à assessoria especializada,
          análise documental, suporte técnico, plataforma de gestão,
          monitoramento e execução do processo.
        </H>
      </>
    ),
  },
  {
    id: "por-que-contratar",
    title: "Por que contratar a CADBRASIL?",
    body: (
      <>
        <H>Porque erros no SICAF podem gerar:</H>
        <List
          items={[
            "Desclassificação em licitações",
            "Perda de contratos",
            "Problemas de habilitação",
            "Perda de prazos importantes",
            "Risco de sanções e multas administrativas",
          ]}
        />
        <H>A CADBRASIL reduz esses riscos através de:</H>
        <List
          items={[
            "Equipe especializada",
            "Conferência documental",
            "Atualização contínua",
            "Plataforma própria",
            "Gestão de certidões",
            "Suporte especializado",
          ]}
        />
        <Callout tone="warn">
          O risco de participar de licitação com SICAF inválido é grande e pode
          gerar multa severa e irreversível, tornando a empresa inapta a
          participar de licitações por anos. Por isso vale o investimento.
        </Callout>
      </>
    ),
  },
  {
    id: "valor",
    title: "Qual o valor do serviço?",
    body: (
      <>
        <H>O valor do credenciamento é de:</H>
        <p className="my-3 text-2xl font-semibold tracking-tight text-foreground">
          R$ 985,00
        </p>
        <H>Este valor inclui:</H>
        <List
          items={[
            "Credenciamento SICAF",
            "Análise documental",
            "Suporte especializado",
            "Plataforma CADBRASIL",
            "Gestão documental",
            "Acompanhamento do processo",
            "Área do fornecedor",
          ]}
        />
      </>
    ),
  },
  {
    id: "mensalidade",
    title: "Existe mensalidade?",
    body: (
      <>
        <H>Sim.</H>
        <H>
          Após o período inicial, o cliente poderá contratar a manutenção
          CADBRASIL para manter o SICAF e a documentação sempre atualizados.
        </H>
        <H>Consulte os valores vigentes junto à equipe comercial.</H>
      </>
    ),
  },
  {
    id: "atualizar-certidoes",
    title: "Como atualizar minhas certidões?",
    body: (
      <>
        <H>
          A atualização das certidões é realizada através do Assistente
          CADBRASIL.
        </H>
        <H>Assista ao vídeo: [LINK DO VÍDEO DE ATUALIZAÇÃO DE CERTIDÕES]</H>
      </>
    ),
  },
  {
    id: "enviar-documentos",
    title: "Como enviar documentos?",
    body: (
      <>
        <H>
          Os documentos devem ser enviados através da Área do Fornecedor ou pelo
          Assistente CADBRASIL.
        </H>
        <H>Assista ao vídeo: [LINK DO VÍDEO DE ENVIO DE DOCUMENTOS]</H>
      </>
    ),
  },
  {
    id: "instalar-assistente",
    title: "Como instalar o Assistente CADBRASIL?",
    body: (
      <>
        <H>
          O Assistente CADBRASIL é um aplicativo desenvolvido para facilitar a
          comunicação com nossa equipe e a atualização dos documentos.
        </H>
        <H>Vídeo de instalação: [LINK DO VÍDEO DE INSTALAÇÃO]</H>
      </>
    ),
  },
  {
    id: "area-fornecedor",
    title: "Como acessar a Área do Fornecedor?",
    body: (
      <>
        <H>
          Acesse:{" "}
          <a
            href="https://fornecedor.cadbrasil.com.br"
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-70"
          >
            https://fornecedor.cadbrasil.com.br
          </a>
        </H>
        <H>Utilize seu e-mail e senha cadastrados.</H>
        <H>
          Caso não lembre sua senha, utilize a opção "Esqueci minha senha".
        </H>
      </>
    ),
  },
  {
    id: "acompanhar-processo",
    title: "Como acompanhar meu processo?",
    body: (
      <>
        <H>Você pode acompanhar:</H>
        <List
          items={[
            "Status do SICAF",
            "Documentos enviados",
            "Certidões",
            "Pendências",
            "Solicitações",
          ]}
        />
        <H>Tudo pela Área do Fornecedor.</H>
      </>
    ),
  },
  {
    id: "boleto-sicaf",
    title: "Como pegar o boleto do SICAF?",
    body: (
      <>
        <H>Vídeo explicativo: [LINK DO VÍDEO BOLETO SICAF]</H>
        <H>
          Ou pode pedir para enviar por aqui mesmo que enviamos. Endpoint da
          API:
        </H>
        <Endpoint
          method="GET"
          url="https://fornecedor.cadbrasil.com.br/api/clients/boleto-sicaf/CNPJ"
        />
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Exemplo de resposta (com boleto)
        </p>
        <Code>{`{
  "ok": true,
  "possuiCadastro": true,
  "clienteId": 123,
  "cnpj": "52841613000155",
  "razaoSocial": "EMPRESA EXEMPLO LTDA",
  "pendentePagamento": true,
  "valor": 985,
  "valorFormatado": "R$ 985,00",
  "linkPdf": "https://...pdf",
  "linkBoleto": "https://...",
  "codigoBarras": "...",
  "dataVencimento": "2026-06-15",
  "taxaId": 45,
  "pagamentoId": 89,
  "boletoReutilizado": true,
  "geradoAgora": false,
  "message": "Boleto vigente localizado. Link PDF retornado."
}`}</Code>
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Sem pendência (já pago)
        </p>
        <Code>{`{
  "ok": true,
  "pendentePagamento": false,
  "linkPdf": null,
  "message": "Cliente sem pendência de pagamento da taxa SICAF."
}`}</Code>
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Cliente não encontrado — HTTP 404
        </p>
        <Code>{`{
  "ok": false,
  "possuiCadastro": false,
  "error": "Cliente não encontrado para este CNPJ."
}`}</Code>
      </>
    ),
  },
  {
    id: "boleto-manutencao",
    title: "Como pegar o boleto de manutenção?",
    body: (
      <>
        <H>Vídeo explicativo: [LINK DO VÍDEO BOLETO MANUTENÇÃO]</H>
        <H>Caso queira por aqui, posso enviar. Endpoint da API:</H>
        <Endpoint
          method="GET"
          url="https://fornecedor.cadbrasil.com.br/api/clients/consulta-boletos?cnpj=14435319000154"
        />
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Exemplo de retorno
        </p>
        <Code>{`{
  "ok": true,
  "cnpj": "14435319000154",
  "possuiCadastro": true,
  "clienteId": 8654,
  "razaoSocial": "TRUE AUDITORIA, CONSULTORIA E SERVIÇOS LTDA",
  "sicaf": {
    "id": 8654,
    "status": "Ativo",
    "dataValidade": "2026-11-14T03:00:00.000Z",
    "diasParaVencer": 148,
    "statusValidade": "Válido",
    "recomendacaoSolicitarBoleto": false,
    "completude": 17
  },
  "totalPendentes": 8,
  "valorTotalPendente": 1240,
  "boletos": {
    "sicafPendentes": [],
    "manutencaoPendentes": [
      {
        "pagamentoId": null,
        "boletoId": 1439,
        "manutencaoId": 136,
        "mesReferencia": 5,
        "anoReferencia": 2026,
        "status": "Vencido",
        "statusBoleto": "Pendente",
        "statusPagamento": null,
        "valor": 155,
        "protocolo": null,
        "dataVencimento": "2026-05-20T03:00:00.000Z",
        "chargeId": "LEGACY-1842",
        "codigoBarras": null,
        "linkBoleto": null,
        "pdfBoleto": null,
        "createdAt": "2026-01-15T19:52:27.000Z"
      },
      {
        "pagamentoId": null,
        "boletoId": 1440,
        "manutencaoId": 136,
        "mesReferencia": 6,
        "anoReferencia": 2026,
        "status": "Vencendo",
        "valor": 155,
        "dataVencimento": "2026-06-20T03:00:00.000Z",
        "chargeId": "LEGACY-1843"
      },
      {
        "boletoId": 1441,
        "mesReferencia": 7,
        "anoReferencia": 2026,
        "status": "A Vencer",
        "valor": 155,
        "dataVencimento": "2026-07-20T03:00:00.000Z"
      }
      // ... demais meses (8, 9, 10, 11, 12) seguem o mesmo formato
    ]
  }
}`}</Code>
      </>
    ),
  },
  {
    id: "esqueci-senha",
    title: "Esqueci minha senha",
    body: (
      <>
        <H>
          Clique em "Esqueci minha senha" na tela de acesso da Área do
          Fornecedor. Você receberá as instruções por e-mail.
        </H>
        <Endpoint
          method="LINK"
          url="https://fornecedor.cadbrasil.com.br/esqueci-senha"
        />
      </>
    ),
  },
  {
    id: "governo",
    title: "A CADBRASIL é do governo?",
    body: (
      <>
        <H>Não.</H>
        <H>
          A CADBRASIL é uma empresa privada especializada em assessoria para
          participação em licitações públicas. Não possuímos vínculo com
          qualquer órgão governamental.
        </H>
      </>
    ),
  },
  {
    id: "atendimento-brasil",
    title: "A CADBRASIL atende todo o Brasil?",
    body: (
      <>
        <H>Sim. Atendemos empresas de todos os estados através de atendimento digital.</H>
      </>
    ),
  },
  {
    id: "mei",
    title: "Posso participar de licitações sendo MEI?",
    body: (
      <>
        <H>
          Sim. O MEI pode participar de diversas modalidades de licitação, desde
          que atenda às exigências do edital.
        </H>
      </>
    ),
  },
  {
    id: "restricoes",
    title: "Minha empresa possui restrições. Posso fazer o SICAF?",
    body: (
      <>
        <H>Depende.</H>
        <H>
          Nossa equipe realizará uma análise inicial para verificar a situação
          da empresa e orientar sobre as melhores alternativas.
        </H>
        <H>Consultar a API com o CNPJ do cliente:</H>
        <Endpoint
          method="GET"
          url="https://fornecedor.cadbrasil.com.br/api/clients/consulta-cnpj?cnpj=14435319000154"
        />
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Exemplo de retorno
        </p>
        <Code>{`{
  "ok": true,
  "cnpj": "14435319000154",
  "possuiCadastro": true,
  "cadastroValido": true,
  "sicafValido": true,
  "possuiRenovacao": true,
  "possuiManutencao": true,
  "razaoSocial": "TRUE AUDITORIA, CONSULTORIA E SERVIÇOS LTDA",
  "cliente": {
    "id": 8654,
    "razaoSocial": "TRUE AUDITORIA, CONSULTORIA E SERVIÇOS LTDA",
    "nomeFantasia": null,
    "tipoDocumento": "CNPJ",
    "documento": "14.435.319/0001-54",
    "email": "administracao@trueauditoria.com.br",
    "telefone": "2130237550",
    "celular": "21969802002",
    "endereco": "Avenida Luís Carlos Prestes, 180, sala 301",
    "cidade": "Rio de Janeiro",
    "estado": "RJ",
    "cep": "22775-055",
    "porte": "ME",
    "ramoAtividade": null,
    "status": "Ativo",
    "createdAt": "2018-05-10T20:24:05.000Z",
    "updatedAt": "2026-05-02T04:20:53.000Z"
  },
  "sicaf": {
    "id": 8654,
    "status": "Ativo",
    "valido": true,
    "dataValidade": "2026-11-14T03:00:00.000Z",
    "diasValidade": 148,
    "completude": 17
  },
  "renovacao": {
    "id": 5667,
    "status": "Concluída",
    "anoReferencia": 2026,
    "createdAt": "2026-05-02T04:21:08.000Z"
  },
  "manutencao": {
    "id": 136,
    "status": "Ativo",
    "dataInicio": "2026-01-15T03:00:00.000Z",
    "dataFim": "2027-01-15T03:00:00.000Z",
    "valor": 1860,
    "diasRestantes": 258
  }
}`}</Code>
      </>
    ),
  },
  {
    id: "crc",
    title: "O que é o CRC?",
    body: (
      <>
        <H>CRC significa Certificado de Registro Cadastral.</H>
        <H>
          É o documento emitido pelo SICAF que comprova a situação cadastral da
          empresa.
        </H>
      </>
    ),
  },
  {
    id: "prazo",
    title: "Quanto tempo leva o processo?",
    body: (
      <>
        <H>O prazo depende da documentação enviada e das validações necessárias.</H>
        <H>
          Após o recebimento da documentação completa, nossa equipe inicia
          imediatamente a análise.
        </H>
      </>
    ),
  },
  {
    id: "renovar",
    title: "Preciso renovar o SICAF?",
    body: (
      <>
        <H>Sim. O SICAF depende da validade de documentos e certidões.</H>
        <H>
          Por isso é importante manter o cadastro atualizado para evitar
          bloqueios e desclassificações.
        </H>
      </>
    ),
  },
  {
    id: "consultor",
    title: "Como falar com um consultor?",
    body: (
      <>
        <H>
          WhatsApp:{" "}
          <span className="font-medium text-foreground">(11) 2122-0202</span>
        </H>
        <H>Ou solicite atendimento através do Assistente CADBRASIL.</H>
      </>
    ),
  },
  {
    id: "horario",
    title: "Qual o horário de atendimento?",
    body: (
      <>
        <H>Segunda à Sexta-feira</H>
        <H>08h00 às 18h00</H>
        <H>Exceto feriados.</H>
      </>
    ),
  },
  {
    id: "ainda-duvidas",
    title: "Ainda tenho dúvidas",
    body: (
      <>
        <H>
          Se tiver dúvidas específicas, basta solicitar e você será encaminhado
          para um atendente humano.
        </H>
      </>
    ),
  },
];

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
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-[12px] font-bold">
              CB
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                CADBRASIL
              </span>
              <span className="text-[11px] text-muted-foreground">
                Documentação · v1.0
              </span>
            </div>
          </div>
          <a
            href="https://fornecedor.cadbrasil.com.br"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
          >
            Área do Fornecedor →
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Tópicos
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

        {/* Main */}
        <main>
          <div className="mb-10 border-b border-border pb-8">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Central de Dúvidas Frequentes
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Documentação CADBRASIL
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Página única de referência com todos os tópicos sobre a CADBRASIL,
              SICAF, valores, plataforma, APIs e atendimento. Otimizada para
              leitura humana e por agentes de IA.
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
                    <a
                      href={`#${s.id}`}
                      className="hover:opacity-70"
                    >
                      {s.title}
                    </a>
                  </h2>
                </div>
                <div className="space-y-2 text-[15px]">{s.body}</div>
              </section>
            ))}
          </div>

          <footer className="mt-20 border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} CADBRASIL · Documentação interna ·
            Atendimento: (11) 2122-0202
          </footer>
        </main>
      </div>
    </div>
  );
}
