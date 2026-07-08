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
  "Enviar em 1–2 blocos no WhatsApp. Use *asteriscos* para negrito. Preencha com dados da API — nunca invente valores, links ou datas. Formate dataVencimento para DD/MM/AAAA. O link que o cliente deve receber é sempre o campo urlPagamento.";

/** Bloco de links — urlPagamento (principal) + linkPdf (alternativa, se existir). */
export const BOLETO_WA_LINKS_PAGAMENTO = `🔗 *Acesse para ver o boleto e pagar (PIX ou boleto):*
👉 {urlPagamento}

📄 *Não conseguiu abrir o link acima?* PDF do boleto:
👉 {linkPdf}`;

export const BOLETO_WA_LINKS_SOMENTE_URL = `🔗 *Acesse para ver o boleto e pagar (PIX ou boleto):*
👉 {urlPagamento}`;

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

/**
 * Mensagem principal — quando o cliente pede boleto/link para pagar.
 * Ex.: "Quero pagar o boleto, pode me mandar?"
 */
export const BOLETO_WA_PEDIDO_CLIENTE = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Link de pagamento SICAF*

Olá! 👋 *Claro!* Consultei seu cadastro e já preparei seu pagamento.

🏢 *{razaoSocial}*

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento} *(omitir se null)*
📋 *Protocolo:* {protocolo} *(omitir se null)*

${BOLETO_WA_LINKS_PAGAMENTO}

📌 Acesse o link acima — na página você escolhe *PIX* ou *boleto bancário* com total segurança.

⏱️ Após o pagamento: compensação em *1 a 3 dias úteis*. Os *níveis do SICAF* são liberados na plataforma após a confirmação.

Qualquer dúvida, estamos à disposição! 😊

${FOOTER}`;

/** Mensagem — só urlPagamento (sem PDF). */
export const BOLETO_WA_SOMENTE_URL = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Link de pagamento SICAF*

Olá! 👋 Consultei seu cadastro da *{razaoSocial}* e localizei a taxa pendente.

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}

${BOLETO_WA_LINKS_SOMENTE_URL}

📌 Acesse o link — você poderá pagar por *PIX* ou *boleto* na página oficial da CADBRASIL Oficial.

⏱️ Compensação bancária: *1 a 3 dias úteis*.

${FOOTER}`;

/** Mensagens modelo — boleto reutilizado (pendente já existia). */
export const BOLETO_WA_REUTILIZADO = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Boleto SICAF — pagamento pendente*

Olá! 👋 Localizei a *taxa SICAF pendente* da empresa:

🏢 *{razaoSocial}*

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

${BOLETO_WA_LINKS_PAGAMENTO}

📌 Este é o *mesmo boleto* já emitido — acesse o link para ver e pagar.

⏱️ Compensação: *1 a 3 dias úteis*. Níveis do SICAF liberados após confirmação.

${FOOTER}`;

/** Mensagens modelo — boleto gerado na hora. */
export const BOLETO_WA_GERADO_AGORA = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Guia de pagamento gerada agora*

Olá! 👋 Para *{razaoSocial}*, *gerei agora* sua guia de pagamento SICAF:

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

${BOLETO_WA_LINKS_PAGAMENTO}

📌 Guia *nova* — vencimento em até *5 dias úteis*. Acesse o link para pagar e liberar os *níveis do SICAF*.

⏱️ Compensação: *1 a 3 dias úteis*.

${FOOTER}`;

/** Mensagens modelo — renovação antecipada. */
export const BOLETO_WA_RENOVACAO = `🇧🇷 *CADBRASIL Oficial ®*
🔄 *Renovação SICAF — pagamento disponível*

Olá! 👋 Para *{razaoSocial}*, localizei a *renovação SICAF* disponível:

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}
📆 *SICAF válido até:* {sicafValidoAte} *(omitir se null)*

${BOLETO_WA_LINKS_PAGAMENTO}

📌 Regularize pelo link acima para manter o cadastro *ativo*.

⏱️ Compensação: *1 a 3 dias úteis*.

${FOOTER}`;

/** Mensagens modelo — sem pendência. */
export const BOLETO_WA_SEM_PENDENCIA = `🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de pagamento SICAF*

Olá! 👋 Consultei o cadastro da *{razaoSocial}*.

✅ No momento *não há taxa SICAF pendente* de pagamento.

━━━━━━━━━━━━━━━━

📌 Pode significar:
• Pagamento já *confirmado* ou em compensação
• Credenciamento *em dia*
• Renovação ainda *não disponível* {diasParaRenovacao — incluir se vier na API}

🔍 *Portal do fornecedor:*
👉 ${LINKS.portal}

💳 *Outras taxas:*
👉 ${LINKS.pagamentos}

Se precisar de ajuda com documentos ou renovação, informe sua dúvida.

${FOOTER}`;

/** Mensagens modelo — cliente não cadastrado. */
export const BOLETO_WA_NAO_CADASTRO = `🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de boleto*

Olá! 👋 Não localizei cadastro para este CNPJ na CADBRASIL Oficial.

━━━━━━━━━━━━━━━━

📌 Para obter o boleto de credenciamento SICAF:

1️⃣ Inicie o cadastro:
👉 ${LINKS.cadastro}

2️⃣ Conclua as etapas iniciais

3️⃣ Informe seu CNPJ aqui — consulto e envio o link de pagamento

💡 Credenciamento assistido: *R$ 985,00* (serviço CADBRASIL Oficial)

${FOOTER}`;

const JSON_SUCESSO_COMPLETO = `{
  "ok": true,
  "possuiCadastro": true,
  "clienteId": 123,
  "cnpj": "28552323000107",
  "razaoSocial": "EMPRESA EXEMPLO LTDA",
  "pendentePagamento": true,
  "valor": 985,
  "valorFormatado": "R$ 985,00",
  "linkPdf": "https://...",
  "linkBoleto": "https://...",
  "codigoBarras": "34191...",
  "protocolo": "SICAF-2026-637",
  "dataVencimento": "2026-07-12",
  "taxaId": 637,
  "pagamentoId": 891,
  "payCode": "t-637",
  "urlPagamento": "https://fornecedor.cadbrasil.com.br/pay/t-637",
  "URLpagamento": "https://fornecedor.cadbrasil.com.br/pay/t-637",
  "boletoReutilizado": false,
  "geradoAgora": true,
  "renovacaoAntecipada": false,
  "diasParaRenovacao": null,
  "sicafValidoAte": null,
  "message": "Novo boleto SICAF gerado com vencimento em 5 dias."
}`;

const JSON_SOMENTE_URL = `{
  "ok": true,
  "possuiCadastro": true,
  "pendentePagamento": true,
  "valor": 985,
  "valorFormatado": "R$ 985,00",
  "linkPdf": null,
  "linkBoleto": null,
  "urlPagamento": "https://fornecedor.cadbrasil.com.br/pay/t-637",
  "URLpagamento": "https://fornecedor.cadbrasil.com.br/pay/t-637",
  "boletoReutilizado": true,
  "geradoAgora": false,
  "message": "Taxa SICAF pendente localizada. Utilize a URL de pagamento online."
}`;

const IA_NAO_ESCALAR = (
  <List
    items={[
      <>
        <strong>Proibido</strong> escalar humano para &quot;quero pagar o
        boleto&quot;, &quot;pode me mandar?&quot;, &quot;manda o link&quot;,
        2ª via ou renovação — a IA <strong>deve</strong> chamar a API e enviar{" "}
        <code>urlPagamento</code>.
      </>,
      "Não dizer que vai encaminhar para atendente para enviar o link — a IA envia diretamente.",
      "Não enviar linkBoleto ao cliente — apenas urlPagamento (+ linkPdf se existir).",
    ]}
  />
);

function SolicitarBoletoScenarios() {
  return (
    <>
      <ScenarioBlock
        title="Pedido do cliente — “Quero pagar / pode me mandar o boleto?”"
        badge="enviar_agora"
        tone="ok"
        when={
          <>
            Cliente pede boleto, link de pagamento, 2ª via ou &quot;pode me
            mandar?&quot; — com CNPJ válido (ou já informado na conversa).
          </>
        }
        fields={
          <>
            Chamar <code>GET /api/clients/solicitar-boleto?cnpj=CNPJ</code> →
            enviar <code>urlPagamento</code> na mensagem. Usar texto{" "}
            <strong>BOLETO_WA_PEDIDO_CLIENTE</strong> abaixo.
          </>
        }
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_PEDIDO_CLIENTE}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Responder SIM — enviar o link. Não escalar humano.",
              "Preencher urlPagamento com o valor exato retornado pela API (ex.: https://fornecedor.cadbrasil.com.br/pay/t-637).",
              "Se linkPdf existir → incluir bloco alternativo. Se null → omitir linha do PDF.",
              "Se pendentePagamento=false → usar mensagem sem pendência (não inventar link).",
            ]}
          />
        }
        iaDont={IA_NAO_ESCALAR}
      />

      <ScenarioBlock
        title="Cenário 1 — Boleto com PDF (reutilizado ou gerado)"
        badge="pendentePagamento"
        tone="ok"
        when={
          <>
            <code>ok: true</code> · <code>pendentePagamento: true</code> ·{" "}
            <code>urlPagamento</code> preenchido · <code>linkPdf</code> pode
            existir
          </>
        }
        clientMessage={
          <WhatsAppMessage>
            {`Use BOLETO_WA_PEDIDO_CLIENTE, BOLETO_WA_REUTILIZADO ou BOLETO_WA_GERADO_AGORA conforme boletoReutilizado / geradoAgora.`}
          </WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Link ao cliente = valor de urlPagamento (nunca linkBoleto).",
              "linkPdf como alternativa se o cliente não abrir o link.",
            ]}
          />
        }
        iaDont={IA_NAO_ESCALAR}
      >
        <Code>{JSON_SUCESSO_COMPLETO}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário 2 — Só pagamento online (sem PDF)"
        badge="linkPdf_null"
        tone="ok"
        when={
          <>
            <code>pendentePagamento: true</code> · <code>urlPagamento</code>{" "}
            preenchido · <code>linkPdf: null</code>
          </>
        }
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_SOMENTE_URL}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Enviar apenas urlPagamento — suficiente para PIX e boleto.",
              "Não escalar — enviar o link diretamente.",
            ]}
          />
        }
        iaDont={IA_NAO_ESCALAR}
      >
        <Code>{JSON_SOMENTE_URL}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário 3 — Renovação antecipada"
        badge="renovacaoAntecipada"
        tone="info"
        when={<code>renovacaoAntecipada: true</code>}
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_RENOVACAO}</WhatsAppMessage>
        }
        iaDont={IA_NAO_ESCALAR}
      />

      <ScenarioBlock
        title="Cenário 4 — Cliente em dia (sem pendência)"
        badge="sem_pendencia"
        tone="info"
        when={
          <>
            <code>ok: true</code> · <code>pendentePagamento: false</code> — sem{" "}
            <code>urlPagamento</code>
          </>
        }
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_SEM_PENDENCIA}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Informar que não há boleto pendente — não inventar urlPagamento.",
              "Usar message da API como referência interna.",
            ]}
          />
        }
      >
        <Code>{`{
  "ok": true,
  "possuiCadastro": true,
  "pendentePagamento": false,
  "diasParaRenovacao": 120,
  "message": "Cliente em dia. Renovação antecipada disponível entre 30 e 60 dias antes do vencimento."
}`}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário 5 — CNPJ não cadastrado"
        badge="404"
        tone="warn"
        when={<>HTTP 404 · <code>possuiCadastro: false</code></>}
        clientMessage={
          <WhatsAppMessage>{BOLETO_WA_NAO_CADASTRO}</WhatsAppMessage>
        }
        iaDo={
          <List
            items={[
              "Orientar cadastro. Escalar só se cliente insiste após 2 tentativas.",
            ]}
          />
        }
      >
        <Code>{`{
  "ok": false,
  "possuiCadastro": false,
  "cnpj": "28552323000107",
  "error": "Cliente não encontrado para este CNPJ."
}`}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Erros da API — quando escalar"
        badge="erro"
        tone="warn"
        when={<>HTTP 401, 500 ou falha ao gerar boleto</>}
        iaDo={
          <List
            items={[
              "401 → problema de API Key (interno). Não escalar cliente por boleto.",
              "500 → informar indisponibilidade temporária; tentar novamente ou escalar só se falhar 2x.",
              "CNPJ inválido 400 → pedir 14 dígitos (não escalar).",
            ]}
          />
        }
      >
        <Code>{`// 400
{ "ok": false, "error": "CNPJ inválido. Informe 14 dígitos." }

// 500
{ "ok": false, "error": "Erro ao gerar boleto SICAF", "taxaId": null }`}</Code>
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
        Quando o cliente pedir boleto, link para pagar ou &quot;pode me
        mandar?&quot; — a IA <strong>deve enviar o link</strong>, consultando{" "}
        <code>GET /api/clients/solicitar-boleto?cnpj=CNPJ</code> e repassando o
        campo <code>urlPagamento</code>. <strong>Não escalar humano</strong> para
        isso.
      </ShortAnswer>

      <Callout tone="ok">
        <strong>Regra fixa — NÃO escalar humano:</strong> frases como &quot;Quero
        pagar o boleto&quot;, &quot;pode me mandar?&quot;, &quot;manda o link&quot;,
        &quot;2ª via&quot;, &quot;quero pagar os R$ 985&quot; → a IA{" "}
        <strong>consulta a API e envia o link na hora</strong>. O link correto é
        sempre o valor de <code>urlPagamento</code> (ex.:{" "}
        <code>https://fornecedor.cadbrasil.com.br/pay/t-637</code>). Se{" "}
        <code>linkPdf</code> existir, enviar como alternativa.{" "}
        <strong>Nunca</strong> usar <code>linkBoleto</code>.{" "}
        <strong>Proibido</strong> responder &quot;vou encaminhar para um
        atendente enviar o link&quot;.
      </Callout>

      <SubTitle>Frases do cliente → ação da IA</SubTitle>
      <DataTable
        headers={["Cliente diz", "IA faz"]}
        rows={[
          [
            "Quero pagar o boleto / pode me mandar?",
            "Chama solicitar-boleto → envia urlPagamento (NÃO escalar)",
          ],
          [
            "Manda o link / 2ª via / perdi o boleto",
            "Mesma API → envia urlPagamento",
          ],
          [
            "Quero pagar o SICAF / os 985",
            "Mesma API → envia urlPagamento + valorFormatado",
          ],
          ["Tem boleto pendente?", "Consulta API → envia link ou informa sem pendência"],
          [
            "CNPJ ainda não informado",
            "Pedir CNPJ (14 dígitos) → depois chamar API",
          ],
        ]}
      />

      <SubTitle>Fluxo obrigatório</SubTitle>
      <List
        items={[
          "1. Cliente pede boleto/link → pedir CNPJ se ainda não tiver (14 dígitos)",
          "2. GET /api/clients/solicitar-boleto?cnpj=CNPJ",
          "3. Se pendentePagamento=true e urlPagamento existe → enviar mensagem com o link (texto BOLETO_WA_PEDIDO_CLIENTE)",
          "4. Se linkPdf não for null → incluir como alternativa",
          "5. Se pendentePagamento=false → informar sem pendência (sem inventar link)",
          "6. NÃO escalar humano para enviar boleto — isso é função da IA",
          "7. Escalar só: 404 após 2 tentativas, erro 500 repetido, ou dúvida não relacionada a boleto",
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
          ["Autenticação", "Header x-api-key"],
          ["Resposta", "JSON direto de gerarOuObterBoletoSicafByCnpj() — sem wrapper extra"],
        ]}
      />
      <Endpoint method="GET" url={ENDPOINT} />

      <SubTitle>Campo que o cliente deve receber</SubTitle>
      <Callout tone="info">
        <strong>urlPagamento</strong> — único link principal. Exemplo real:{" "}
        <code>https://fornecedor.cadbrasil.com.br/pay/t-637</code>
        <br />
        <strong>linkPdf</strong> — só se não null; frase &quot;se não conseguir
        abrir o link&quot;.
        <br />
        <strong>linkBoleto</strong> — não enviar ao cliente.
      </Callout>

      <SubTitle>Retorno JSON — campos principais</SubTitle>
      <DataTable
        headers={["Campo", "Tipo", "Uso para IA"]}
        rows={[
          ["urlPagamento", "string", "ENVIAR AO CLIENTE — link de pagamento"],
          ["URLpagamento", "string", "Alias de urlPagamento"],
          ["pendentePagamento", "boolean", "true = há taxa em aberto"],
          ["valorFormatado", "string", "Ex.: R$ 985,00"],
          ["linkPdf", "string|null", "Alternativa se cliente não abrir urlPagamento"],
          ["linkBoleto", "string|null", "Não enviar ao cliente"],
          ["razaoSocial", "string", "Nome na mensagem"],
          ["dataVencimento", "string", "Formatar DD/MM/AAAA"],
          ["protocolo", "string", "Ex.: SICAF-2026-637"],
          ["boletoReutilizado", "boolean", "Boleto já existia"],
          ["geradoAgora", "boolean", "Gerado nesta chamada"],
          ["renovacaoAntecipada", "boolean", "Renovação na janela 30–60 dias"],
          ["message", "string", "Referência interna — não copiar literal ao cliente"],
        ]}
      />

      <SubTitle>Cenários e mensagens WhatsApp</SubTitle>
      <SolicitarBoletoScenarios />

      <H>
        Relacionado:{" "}
        <a href="#api-consulta-cnpj" className="underline underline-offset-4">
          API consulta-cnpj
        </a>{" "}
        ·{" "}
        <a href="#ia-enviar-boleto" className="underline underline-offset-4">
          Quando a IA envia boleto
        </a>{" "}
        ·{" "}
        <a href="#escalar-humano" className="underline underline-offset-4">
          Quando escalar humano
        </a>
      </H>
    </>
  ),
};
