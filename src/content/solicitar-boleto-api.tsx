import {
  Callout,
  Code,
  DataTable,
  Endpoint,
  H,
  List,
  ScenarioBlock,
  Section,
  ShortAnswer,
  SubTitle,
} from "@/lib/docs-ui";
import { LINKS } from "@/content/videos";

const API_BASE = LINKS.portal;
const ENDPOINT = `${API_BASE}/api/clients/solicitar-boleto?cnpj={14_dígitos}`;

const WA_NOTE =
  "Enviar em 1–2 blocos no WhatsApp. Use *asteriscos* para negrito. Preencha com dados da API — nunca invente valores, links ou datas. Formate dataVencimento para DD/MM/AAAA (horário de Brasília). O cliente deve receber o campo urlPagamento como link principal; linkPdf só como alternativa se não conseguir abrir.";

/** Bloco de links — urlPagamento (principal) + linkPdf (alternativa). */
const WA_LINKS_PAGAMENTO = `🔗 *Link de pagamento — acesse para ver o boleto e pagar (PIX ou boleto):*
👉 {urlPagamento}

📄 *Não conseguiu abrir o link acima?* Acesse também o PDF do boleto:
👉 {linkPdf}`;

const FOOTER = `🔐 *CADBRASIL Oficial*
Tecnologia, segurança e suporte para fornecedores do Brasil. 🇧🇷`;

function WhatsAppMessage({ children }: { children: string }) {
  return (
    <>
      <p className="mb-3 text-[13px] text-muted-foreground">{WA_NOTE}</p>
      <Code>{children}</Code>
    </>
  );
}

/** Mensagens modelo — boleto reutilizado (pendente já existia). */
export const BOLETO_WA_REUTILIZADO = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Boleto SICAF — pagamento pendente*

Olá! 👋 Consultei o cadastro e localizei a *taxa SICAF pendente* da empresa:

🏢 *{razaoSocial}*

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

${WA_LINKS_PAGAMENTO}

📌 Este é o *mesmo boleto* já emitido — acesse o *link de pagamento* acima para ver o boleto e concluir o pagamento.

⏱️ Após o pagamento, a compensação leva *1 a 3 dias úteis*. Os *níveis do SICAF* são liberados na plataforma após a confirmação.

❓ Dúvidas? Solicite falar com um *atendente*.

${FOOTER}`;

/** Mensagens modelo — boleto gerado na hora. */
export const BOLETO_WA_GERADO_AGORA = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Guia de pagamento SICAF gerada*

Olá! 👋 Para a empresa *{razaoSocial}*, *gerei agora* sua guia de pagamento SICAF:

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

${WA_LINKS_PAGAMENTO}

📌 Guia *nova* com vencimento em até *5 dias úteis* — acesse o *link de pagamento* para ver o boleto e liberar os *níveis do SICAF* na plataforma CADBRASIL Oficial.

⏱️ Compensação bancária: *1 a 3 dias úteis* após o pagamento.

❓ Precisa de ajuda? Estamos à disposição!

${FOOTER}`;

/** Mensagens modelo — renovação antecipada. */
export const BOLETO_WA_RENOVACAO = `🇧🇷 *CADBRASIL Oficial ®*
🔄 *Renovação SICAF — pagamento disponível*

Olá! 👋 Consultei o cadastro da *{razaoSocial}* e localizei a *renovação SICAF* disponível para pagamento:

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}
📆 *SICAF válido até:* {sicafValidoAte} *(omitir linha se null)*

${WA_LINKS_PAGAMENTO}

📌 Regularize a renovação pelo *link de pagamento* para manter seu cadastro *ativo* e continuar licitando com segurança.

⏱️ Compensação: *1 a 3 dias úteis* após o pagamento.

❓ Dúvidas sobre renovação ou documentos? Solicite um *atendente*.

${FOOTER}`;

/** Mensagens modelo — sem pendência. */
export const BOLETO_WA_SEM_PENDENCIA = `🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de boleto SICAF*

Olá! 👋 Consultei o cadastro da empresa *{razaoSocial}*.

✅ No momento *não há taxa SICAF pendente* de pagamento.

━━━━━━━━━━━━━━━━

📌 Isso pode significar:
• Pagamento já *confirmado* ou em compensação bancária
• Credenciamento *em dia* quanto à taxa de R$ 985
• Renovação ainda *não disponível* para emissão

🔍 *Acompanhe seu cadastro:*
👉 ${LINKS.portal}

📋 *Central de ajuda:*
👉 ${LINKS.ajuda}

💳 *Outras taxas ou manutenção:*
👉 ${LINKS.pagamentos}

❓ Precisa de *renovação*, *2ª via*, documentos ou suporte? Informe sua dúvida ou solicite falar com um *atendente*.

${FOOTER}`;

/** Mensagens modelo — cliente não cadastrado. */
export const BOLETO_WA_NAO_CADASTRO = `🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de boleto*

Olá! 👋 Consultei o CNPJ informado e *não localizei cadastro* na base CADBRASIL Oficial.

━━━━━━━━━━━━━━━━

📌 Para emitir boleto de credenciamento SICAF, é necessário *iniciar o cadastro* primeiro:

1️⃣ Acesse o cadastro:
👉 ${LINKS.cadastro}

2️⃣ Conclua as etapas iniciais do processo

3️⃣ Depois, informe seu CNPJ aqui — consulto e envio o boleto

💡 *Valor do credenciamento assistido:* R$ 985,00 (serviço CADBRASIL Oficial — não é taxa do governo)

❓ Já se cadastrou e não encontramos? Solicite falar com um *atendente*.

${FOOTER}`;

const EXAMPLE_OK = `{
  "ok": true,
  "possuiCadastro": true,
  "clienteId": 192803,
  "cnpj": "01744605000150",
  "razaoSocial": "J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA",
  "pendentePagamento": true,
  "valor": 985,
  "valorFormatado": "R$ 985,00",
  "linkPdf": "https://download.sejaefi.com.br/790387_6536_PACA8/790387-6536-DRAZE0.pdf",
  "linkBoleto": "https://visualizacao.gerencianet.com.br/emissao/790387_6536_PACA8/A4XB-790387-6536-DRAZE0",
  "codigoBarras": "36490.00050 00079.038709 00000.065367 6 00000000098500",
  "protocolo": "SICAF-2026-636",
  "dataVencimento": "2026-07-13T03:00:00.000Z",
  "taxaId": 636,
  "pagamentoId": 1350,
  "payCode": "t-636",
  "urlPagamento": "https://fornecedor.cadbrasil.com.br/pay/t-636",
  "URLpagamento": "https://fornecedor.cadbrasil.com.br/pay/t-636",
  "boletoReutilizado": true,
  "geradoAgora": false,
  "renovacaoAntecipada": false,
  "diasParaRenovacao": null,
  "sicafValidoAte": null,
  "message": "Boleto ou pagamento pendente localizado. URL de pagamento online retornada."
}`;

function SolicitarBoletoScenarios() {
  return (
    <>
      <ScenarioBlock
        title="Cenário 1 — Boleto pendente reutilizado"
        badge="boletoReutilizado"
        tone="ok"
        when={
          <>
            <code>ok: true</code> · <code>pendentePagamento: true</code> ·{" "}
            <code>boletoReutilizado: true</code> · <code>geradoAgora: false</code>
          </>
        }
        fields={
          <>
            Enviar ao cliente o campo <code>urlPagamento</code> (ou{" "}
            <code>URLpagamento</code> se vazio) como link principal ·{" "}
            <code>linkPdf</code> como alternativa · <code>valorFormatado</code> ·{" "}
            <code>dataVencimento</code> · <code>protocolo</code> ·{" "}
            <code>razaoSocial</code>. Não enviar <code>linkBoleto</code> ao
            cliente — usar apenas <code>urlPagamento</code> + <code>linkPdf</code>.
          </>
        }
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_REUTILIZADO}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Cliente pediu boleto, 2ª via, taxa, renovação ou \"tem pendência?\" — este é o retorno mais comum.",
              "Enviar o valor exato do campo urlPagamento — é o link que o cliente deve abrir para ver o boleto e pagar.",
              "Informar linkPdf como alternativa: \"se não conseguir abrir o link, use o PDF\".",
              "Não enviar linkBoleto ao cliente — apenas urlPagamento + linkPdf.",
              "Formatar dataVencimento (ex.: 13/07/2026).",
              "Mencionar compensação 1–3 dias úteis.",
              "Nunca inventar codigoBarras ou links.",
            ]}
          />
        }
      >
        <Code>{EXAMPLE_OK}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário 2 — Boleto gerado agora"
        badge="geradoAgora"
        tone="ok"
        when={
          <>
            <code>ok: true</code> · <code>pendentePagamento: true</code> ·{" "}
            <code>geradoAgora: true</code>
          </>
        }
        fields={
          <>
            Mesmos campos do cenário 1. Vencimento costuma ser *5 dias úteis*
            a partir da geração.
          </>
        }
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_GERADO_AGORA}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Destacar que a guia foi *gerada agora* (não é reutilização).",
              "Enviar urlPagamento (link principal) + linkPdf (alternativa se não abrir).",
              "Reforçar que níveis SICAF liberam após confirmação do pagamento.",
            ]}
          />
        }
      />

      <ScenarioBlock
        title="Cenário 3 — Renovação antecipada"
        badge="renovacaoAntecipada"
        tone="info"
        when={
          <>
            <code>ok: true</code> · <code>pendentePagamento: true</code> ·{" "}
            <code>renovacaoAntecipada: true</code>
          </>
        }
        fields={
          <>
            Incluir <code>sicafValidoAte</code> e{" "}
            <code>diasParaRenovacao</code> quando não forem null.
          </>
        }
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_RENOVACAO}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Cliente pediu renovação do SICAF ou boleto de renovação.",
              "Tom consultivo — regularizar antes do vencimento.",
              "Se renovacaoAntecipada=false mas cliente pediu renovação, use cenário 1 ou 2 conforme boletoReutilizado/geradoAgora.",
            ]}
          />
        }
      />

      <ScenarioBlock
        title="Cenário 4 — Sem pendência"
        badge="sem_pendencia"
        tone="info"
        when={
          <>
            <code>ok: true</code> · <code>possuiCadastro: true</code> ·{" "}
            <code>pendentePagamento: false</code>
          </>
        }
        fields={
          <>
            Usar <code>razaoSocial</code> · <code>message</code> da API como
            referência interna.
          </>
        }
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_SEM_PENDENCIA}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Não enviar links de boleto inventados.",
              "Orientar portal, ajuda e pagamentos.",
              "Se cliente insistir que pagou há pouco → compensação 1–3 dias úteis.",
              "Se cliente pedir manutenção mensal (R$ 155) → consultar GET /api/clients/consulta-boletos?cnpj=CNPJ.",
              "Dúvida persistente → escalar atendente.",
            ]}
          />
        }
      >
        <Code>{`{
  "ok": true,
  "possuiCadastro": true,
  "pendentePagamento": false,
  "urlPagamento": null,
  "linkPdf": null,
  "message": "Cliente sem pendência de pagamento da taxa SICAF."
}`}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário 5 — Cliente não cadastrado"
        badge="nao_cadastrado"
        tone="warn"
        when={
          <>
            <code>ok: false</code> ou <code>possuiCadastro: false</code> — HTTP
            404 em alguns casos
          </>
        }
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_NAO_CADASTRO}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Orientar cadastro em cadastro.cadbrasil.com.br.",
              "Não prometer boleto antes do cadastro.",
              "Se cliente insiste que já é cliente após 2 tentativas → escalar humano.",
            ]}
          />
        }
      >
        <Code>{`{
  "ok": false,
  "possuiCadastro": false,
  "error": "Cliente não encontrado para este CNPJ."
}`}</Code>
      </ScenarioBlock>
    </>
  );
}

/** Seção API solicitar-boleto — procedimento obrigatório para pedidos de boleto. */
export const solicitarBoletoSection: Section = {
  id: "api-solicitar-boleto",
  title: "API solicitar-boleto — boleto, 2ª via e renovação SICAF",
  body: (
    <>
      <ShortAnswer>
        Sempre que o cliente pedir boleto, 2ª via, taxa SICAF, renovação,
        pagamento ou perguntar se há boleto pendente — peça o CNPJ (14 dígitos)
        e chame{" "}
        <code>GET /api/clients/solicitar-boleto?cnpj=CNPJ</code>. Use os
        textos WhatsApp desta seção conforme o retorno da API.
      </ShortAnswer>

      <Callout tone="ok">
        <strong>Regra fixa para a IA:</strong> qualquer pedido de boleto para
        pagamento (credenciamento R$ 985, renovação SICAF, 2ª via, &quot;tem
        pendência?&quot;, &quot;quero pagar&quot;) →{" "}
        <strong>obrigatório</strong> consultar esta API após obter CNPJ válido.
        Nunca inventar links, valores ou vencimentos. O cliente deve receber o
        campo <code>urlPagamento</code> como link principal (ver boleto e pagar).
        Se não conseguir abrir, informar também <code>linkPdf</code>. Não enviar{" "}
        <code>linkBoleto</code> ao cliente.
      </Callout>

      <SubTitle>Quando acionar esta API</SubTitle>
      <List
        items={[
          "Quero o boleto / 2ª via do boleto",
          "Tem boleto pendente? / Tenho algo para pagar?",
          "Quero pagar a taxa / o SICAF / os R$ 985",
          "Boleto da renovação / renovar meu SICAF",
          "Como pago? / Manda o link de pagamento",
          "Perdi o boleto / não recebi o boleto",
          "Qual o valor e vencimento do meu boleto?",
        ]}
      />

      <SubTitle>Fluxo obrigatório (passo a passo)</SubTitle>
      <List
        items={[
          "1. Pedir CNPJ com 14 dígitos (somente números, sem pontuação)",
          "2. Validar formato — se inválido, pedir novamente (cenário consulta-cnpj A)",
          "3. Chamar GET /api/clients/solicitar-boleto?cnpj=CNPJ",
          "4. Ler pendentePagamento, boletoReutilizado, geradoAgora, renovacaoAntecipada",
          "5. Enviar mensagem WhatsApp do cenário correspondente (abaixo)",
          "6. Se pendentePagamento=false e cliente pediu manutenção (R$ 155) → consulta-boletos",
          "7. Dúvida persistente → escalar atendente",
        ]}
      />

      <SubTitle>Endpoint</SubTitle>
      <DataTable
        headers={["Item", "Valor"]}
        rows={[
          ["Base", API_BASE],
          ["Método", "GET"],
          ["Path", "/api/clients/solicitar-boleto"],
          ["Query", "cnpj={14_dígitos}"],
          [
            "Autenticação",
            "Header x-api-key (mesma chave da API consulta-cnpj)",
          ],
          ["CNPJ", "Com ou sem máscara; deve ter 14 dígitos"],
        ]}
      />
      <Endpoint method="GET" url={ENDPOINT} />

      <SubTitle>Fluxo de decisão (retorno da API)</SubTitle>
      <Code>{`GET /api/clients/solicitar-boleto?cnpj=...
        │
        ├─ possuiCadastro: false / HTTP 404 ──► Cenário 5 — não cadastrado
        │
        └─ possuiCadastro: true
              │
              ├─ pendentePagamento: false ──────► Cenário 4 — sem pendência
              │
              └─ pendentePagamento: true
                    │
                    ├─ renovacaoAntecipada: true ► Cenário 3 — renovação
                    ├─ geradoAgora: true ────────► Cenário 2 — gerado agora
                    └─ boletoReutilizado: true ──► Cenário 1 — reutilizado`}</Code>

      <SubTitle>Campos principais do retorno</SubTitle>
      <DataTable
        headers={["Campo", "Tipo", "Uso para IA"]}
        rows={[
          ["ok", "boolean", "Sucesso da operação"],
          ["possuiCadastro", "boolean", "Cliente na base CADBRASIL Oficial"],
          ["pendentePagamento", "boolean", "Define se há boleto/taxa em aberto"],
          ["razaoSocial", "string", "Nome da empresa na mensagem"],
          ["valorFormatado", "string", "Valor para exibir (ex.: R$ 985,00)"],
          ["urlPagamento", "string", "Link principal — enviar ao cliente para ver boleto e pagar (PIX ou boleto)"],
          ["URLpagamento", "string", "Alias de urlPagamento — usar se urlPagamento vazio"],
          ["linkPdf", "string", "Link alternativo — enviar junto com aviso \"se não conseguir abrir o link\""],
          ["linkBoleto", "string", "Uso interno — não enviar ao cliente; usar urlPagamento"],
          ["codigoBarras", "string", "Só enviar se cliente pedir explicitamente"],
          ["protocolo", "string", "Referência SICAF (ex.: SICAF-2026-636)"],
          ["dataVencimento", "ISO date", "Formatar DD/MM/AAAA para o cliente"],
          ["boletoReutilizado", "boolean", "Boleto já existia — cenário 1"],
          ["geradoAgora", "boolean", "Guia nova — cenário 2"],
          ["renovacaoAntecipada", "boolean", "Renovação — cenário 3"],
          ["sicafValidoAte", "date|null", "Validade atual do SICAF"],
          ["diasParaRenovacao", "number|null", "Dias até renovação"],
          ["message", "string", "Resumo técnico — não copiar literalmente ao cliente"],
        ]}
      />

      <SubTitle>Cenários e mensagens WhatsApp</SubTitle>
      <SolicitarBoletoScenarios />

      <Callout tone="warn">
        <strong>IA — links para o cliente:</strong> envie sempre o valor de{" "}
        <code>urlPagamento</code> (link principal para ver o boleto e pagar).
        Informe também <code>linkPdf</code> com a frase &quot;se não conseguir
        abrir o link acima&quot;. Não envie <code>linkBoleto</code> ao cliente.
        Compensação bancária: 1 a 3 dias úteis. Página alternativa:{" "}
        <a href={LINKS.pagamentos} className="underline underline-offset-4">
          {LINKS.pagamentos}
        </a>
        . Manutenção mensal (R$ 155):{" "}
        <code>GET /api/clients/consulta-boletos?cnpj=CNPJ</code>.
      </Callout>

      <H>
        Relacionado:{" "}
        <a href="#api-consulta-cnpj" className="underline underline-offset-4">
          API consulta-cnpj
        </a>{" "}
        (situação geral) ·{" "}
        <a href="#formas-pagamento" className="underline underline-offset-4">
          Formas de pagamento
        </a>{" "}
        ·{" "}
        <a href="#ia-enviar-boleto" className="underline underline-offset-4">
          Quando a IA pode enviar boleto
        </a>
      </H>
    </>
  ),
};
