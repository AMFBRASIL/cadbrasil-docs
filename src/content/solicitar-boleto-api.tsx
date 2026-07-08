import {
  Callout,
  ClienteWhatsApp,
  Code,
  DataTable,
  Endpoint,
  H,
  IaInstrucao,
  List,
  ScenarioBlock,
  Section,
  ShortAnswer,
  SubTitle,
} from "@/lib/docs-ui";
import { LINKS } from "@/content/videos";

const API_BASE = LINKS.portal;
const ENDPOINT = `${API_BASE}/api/clients/solicitar-boleto?cnpj={14_dígitos}`;

const WA_IA_NOTE =
  "Link na mensagem = valor EXATO do campo urlPagamento (ex.: https://fornecedor.cadbrasil.com.br/pay/t-636). Mesmo que linkBoleto venha igual — usar só urlPagamento. dataVencimento ISO → DD/MM/AAAA (13/07/2026). linkPdf só se não null. Não enviar codigoBarras, message, email* ao cliente. Não escrever nomes de campos na mensagem.";

/**
 * Bloco principal — o cliente DEVE ver o valor de urlPagamento.
 * Preencher {urlPagamento} com o retorno exato da API.
 */
export const BOLETO_WA_LINKS_PAGAMENTO = `━━━━━━━━━━━━━━━━

✅ *LINK DE PAGAMENTO*
🔐 Página oficial CADBRASIL Oficial

👉 *{urlPagamento}*

📌 Toque no link acima para *ver o boleto* e pagar por *PIX* ou *boleto bancário*.

📄 *Não conseguiu abrir?* PDF do boleto:
👉 {linkPdf}
*(omitir bloco do PDF se linkPdf for null)*`;

export const BOLETO_WA_LINKS_SOMENTE_URL = `━━━━━━━━━━━━━━━━

✅ *LINK DE PAGAMENTO*
🔐 Página oficial CADBRASIL Oficial

👉 *{urlPagamento}*

📌 Toque no link para *ver o boleto* e pagar por *PIX* ou *boleto bancário*.`;

const FOOTER = `🔐 *CADBRASIL Oficial*
Tecnologia, segurança e suporte para fornecedores do Brasil. 🇧🇷`;

/**
 * Mensagem padrão de retorno — usar sempre que solicitar-boleto retornar
 * pendentePagamento: true e urlPagamento preenchido.
 */
export const BOLETO_WA_RETORNO_PADRAO = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Pagamento SICAF — link pronto para você*

Olá! 👋 Conforme solicitado, consultei seu cadastro e preparei seu pagamento:

🏢 *{razaoSocial}*

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

${BOLETO_WA_LINKS_PAGAMENTO}

⏱️ *Após o pagamento:* compensação em *1 a 3 dias úteis*.
Os *níveis do SICAF* são liberados na plataforma após a confirmação.

❓ Qualquer dúvida, estamos à disposição!

${FOOTER}`;

/** Exemplo preenchido (referência visual para a IA). */
export const BOLETO_WA_EXEMPLO_PREENCHIDO = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Pagamento SICAF — link pronto para você*

Olá! 👋 Conforme solicitado, consultei seu cadastro e preparei seu pagamento:

🏢 *J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA*

━━━━━━━━━━━━━━━━

💰 *Valor:* R$ 985,00
📅 *Vencimento:* 13/07/2026
📋 *Protocolo:* SICAF-2026-636

━━━━━━━━━━━━━━━━

✅ *LINK DE PAGAMENTO*
🔐 Página oficial CADBRASIL Oficial

👉 *https://fornecedor.cadbrasil.com.br/pay/t-636*

📌 Toque no link acima para *ver o boleto* e pagar por *PIX* ou *boleto bancário*.

📄 *Não conseguiu abrir?* PDF do boleto:
👉 https://download.sejaefi.com.br/790387_6536_PACA8/790387-6536-DRAZE0.pdf

⏱️ *Após o pagamento:* compensação em *1 a 3 dias úteis*.
Os *níveis do SICAF* são liberados na plataforma após a confirmação.

❓ Qualquer dúvida, estamos à disposição!

${FOOTER}`;

/**
 * Mensagem principal — quando o cliente pede boleto/link para pagar.
 * Ex.: "Quero pagar o boleto, pode me mandar?"
 */
export const BOLETO_WA_PEDIDO_CLIENTE = BOLETO_WA_RETORNO_PADRAO;

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

/** Mensagens modelo — boleto reutilizado (boletoReutilizado: true). */
export const BOLETO_WA_REUTILIZADO = `🇧🇷 *CADBRASIL Oficial ®*
💳 *Boleto SICAF — pagamento pendente*

Olá! 👋 Localizei a *taxa SICAF pendente* da empresa:

🏢 *{razaoSocial}*

━━━━━━━━━━━━━━━━

💰 *Valor:* {valorFormatado}
📅 *Vencimento:* {dataVencimento}
📋 *Protocolo:* {protocolo}

${BOLETO_WA_LINKS_PAGAMENTO}

📌 *Boleto já emitido* — o link acima continua válido para pagamento.

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

const JSON_REAL_REUTILIZADO = `{
  "ok": true,
  "possuiCadastro": true,
  "clienteId": 192803,
  "cnpj": "01744605000150",
  "razaoSocial": "J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA",
  "pendentePagamento": true,
  "valor": 985,
  "valorFormatado": "R$ 985,00",
  "linkPdf": "https://download.sejaefi.com.br/790387_6536_PACA8/790387-6536-DRAZE0.pdf",
  "linkBoleto": "https://fornecedor.cadbrasil.com.br/pay/t-636",
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
  "message": "Boleto ou pagamento pendente localizado. URL de pagamento online retornada.",
  "emailEnviado": true,
  "emailPara": "licitacao@suat.com.br",
  "emailAssunto": "Taxa CADBRASIL pendente — regularize seu cadastro — J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA",
  "emailSimulado": false,
  "emailErro": null
}`;

/** Exemplo quando geradoAgora: true (boleto novo nesta chamada). */
const JSON_GERADO_AGORA = `{
  "ok": true,
  "possuiCadastro": true,
  "clienteId": 123,
  "cnpj": "28552323000107",
  "razaoSocial": "EMPRESA EXEMPLO LTDA",
  "pendentePagamento": true,
  "valor": 985,
  "valorFormatado": "R$ 985,00",
  "linkPdf": "https://...",
  "linkBoleto": "https://fornecedor.cadbrasil.com.br/pay/t-637",
  "protocolo": "SICAF-2026-637",
  "dataVencimento": "2026-07-12",
  "urlPagamento": "https://fornecedor.cadbrasil.com.br/pay/t-637",
  "URLpagamento": "https://fornecedor.cadbrasil.com.br/pay/t-637",
  "boletoReutilizado": false,
  "geradoAgora": true,
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
        <strong>Proibido</strong> escalar humano para envio de boleto.{" "}
        <strong>Proibido</strong> chamar esta API no primeiro CNPJ — antes use{" "}
        <code>consulta-cnpj</code>.
      </>,
      "Não dizer que vai encaminhar para atendente para enviar o link — a IA envia diretamente.",
      "Não enviar linkBoleto ao cliente — sempre urlPagamento (mesmo se os dois vierem com a mesma URL).",
      "Não enviar codigoBarras, message, emailEnviado, emailPara nem campos email* ao cliente.",
    ]}
  />
);

function SolicitarBoletoScenarios() {
  return (
    <>
      <ScenarioBlock
        title="Pedido do cliente — “Pode me mandar o boleto aqui?”"
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
          <ClienteWhatsApp iaNote={WA_IA_NOTE}>{BOLETO_WA_PEDIDO_CLIENTE}</ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Responder SIM — enviar o link. Não escalar humano.",
              "Se Etapa 1 (consulta-cnpj) ainda não foi feita nesta conversa, fazer antes ou usar CNPJ já informado.",
              "Copiar na mensagem o valor literal de urlPagamento (ex.: https://fornecedor.cadbrasil.com.br/pay/t-636).",
              "Se boletoReutilizado: true → BOLETO_WA_REUTILIZADO; se geradoAgora: true → BOLETO_WA_GERADO_AGORA; senão BOLETO_WA_PEDIDO_CLIENTE.",
              "Se linkPdf existir → bloco PDF alternativo. Se null → omitir.",
            ]}
          />
        }
        iaDont={IA_NAO_ESCALAR}
      >
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Retorno JSON (exemplo real)
        </p>
        <Code>{JSON_REAL_REUTILIZADO}</Code>
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Mensagem ao cliente — link copiado de{" "}
          <code>urlPagamento</code> (não linkBoleto)
        </p>
        <ClienteWhatsApp iaNote={WA_IA_NOTE}>{BOLETO_WA_EXEMPLO_PREENCHIDO}</ClienteWhatsApp>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário 1 — Boleto reutilizado (boletoReutilizado: true)"
        badge="boletoReutilizado"
        tone="ok"
        when={
          <>
            <code>ok: true</code> · <code>pendentePagamento: true</code> ·{" "}
            <code>urlPagamento</code> preenchido ·{" "}
            <code>boletoReutilizado: true</code> · <code>geradoAgora: false</code>
            . Exemplo real abaixo (CNPJ 01744605000150).
          </>
        }
        clientMessage={
          <ClienteWhatsApp iaNote={WA_IA_NOTE}>
            {BOLETO_WA_REUTILIZADO}
          </ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Link ao cliente = valor de urlPagamento (nunca linkBoleto, mesmo URL igual).",
              "linkPdf como alternativa se o cliente não abrir o link principal.",
              "dataVencimento ISO → exibir 13/07/2026 na mensagem.",
            ]}
          />
        }
        iaDont={IA_NAO_ESCALAR}
      >
        <Code>{JSON_REAL_REUTILIZADO}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário 1b — Boleto gerado agora (geradoAgora: true)"
        badge="geradoAgora"
        tone="ok"
        when={
          <>
            <code>geradoAgora: true</code> · <code>boletoReutilizado: false</code>
          </>
        }
        clientMessage={
          <ClienteWhatsApp iaNote={WA_IA_NOTE}>{BOLETO_WA_GERADO_AGORA}</ClienteWhatsApp>
        }
        iaDont={IA_NAO_ESCALAR}
      >
        <Code>{JSON_GERADO_AGORA}</Code>
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
          <ClienteWhatsApp iaNote={WA_IA_NOTE}>{BOLETO_WA_SOMENTE_URL}</ClienteWhatsApp>
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
          <ClienteWhatsApp iaNote={WA_IA_NOTE}>{BOLETO_WA_RENOVACAO}</ClienteWhatsApp>
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
          <ClienteWhatsApp iaNote={WA_IA_NOTE}>{BOLETO_WA_SEM_PENDENCIA}</ClienteWhatsApp>
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
          <ClienteWhatsApp iaNote={WA_IA_NOTE}>{BOLETO_WA_NAO_CADASTRO}</ClienteWhatsApp>
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
        Cliente pede boleto/link → chamar API → enviar ao cliente o valor de{" "}
        <code>urlPagamento</code> na mensagem WhatsApp. É o link oficial de
        pagamento (ex.: <code>https://fornecedor.cadbrasil.com.br/pay/t-636</code>
        ). Não escalar humano.
      </ShortAnswer>

      <Callout tone="ok">
        <strong>Regra do link (obrigatória):</strong> na resposta JSON, copie{" "}
        <strong>somente</strong> o campo <code>urlPagamento</code> (ou{" "}
        <code>URLpagamento</code>) para o link que o cliente vê.{" "}
        <strong>Nunca</strong> usar <code>linkBoleto</code> — mesmo quando vier
        com a mesma URL. <code>linkPdf</code> só como alternativa opcional.
      </Callout>

      <Callout tone="warn">
        <strong>Não acionar no início:</strong> quando o cliente informa o CNPJ
        pela primeira vez → apenas{" "}
        <code>GET /api/clients/consulta-cnpj?cnpj=CNPJ</code> (processo completo).
        Mesmo com <code>aguardando_pagamento</code>,{" "}
        <strong>não</strong> chame solicitar-boleto até o cliente pedir boleto
        ou link.
      </Callout>

      <Callout tone="warn">
        <strong>Prioridade — pedido de boleto:</strong> frases como &quot;Pode me
        mandar o boleto aqui&quot;, &quot;quero pagar&quot;, &quot;manda o
        link&quot;, &quot;2ª via&quot; → a IA <strong>envia o link na hora</strong>.
        <strong> Proibido</strong> transferir para consultor humano.{" "}
        <strong>Proibido</strong> escrever urlPagamento, solicitar-boleto ou
        nomes de API na mensagem ao cliente.
      </Callout>

      <SubTitle>Resposta errada vs correta</SubTitle>
      <DataTable
        headers={["Cliente diz", "❌ Nunca responder", "✅ Ação da IA"]}
        rows={[
          [
            "Pode me mandar o boleto aqui?",
            "Vou transferir para um consultor humano",
            "GET solicitar-boleto → enviar mensagem BOLETO_WA_PEDIDO_CLIENTE com link real",
          ],
          [
            "Quero pagar / manda o link",
            "Peça ao atendente / vou encaminhar",
            "Enviar link de pagamento imediatamente",
          ],
          [
            "2ª via do boleto",
            "Acesse o portal sozinho",
            "Mesma API → reenviar link vigente ou novo",
          ],
        ]}
      />

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

      <SubTitle>Quando acionar (gatilhos do cliente)</SubTitle>
      <List
        items={[
          "Pode me mandar o boleto? / pode me mandar o boleto aqui",
          "Quero pagar o boleto / manda o link / preciso pagar",
          "Quero pagar o SICAF / os R$ 985",
          "2ª via / perdi o boleto / emitir boleto",
          "Renovação SICAF / quero renovar",
          "Link de pagamento / como pago",
        ]}
      />

      <SubTitle>Quando NÃO acionar</SubTitle>
      <List
        items={[
          "Primeiro CNPJ da conversa → só consulta-cnpj",
          "Consulta de status sem pedido de boleto",
          "aguardando_pagamento sem o cliente pedir link",
        ]}
      />

      <SubTitle>Frases do cliente → ação da IA</SubTitle>
      <DataTable
        headers={["Cliente diz", "IA faz"]}
        rows={[
          [
            "Cliente informou CNPJ (primeira vez)",
            "Só consulta-cnpj — mostrar processo completo. NÃO solicitar-boleto",
          ],
          [
            "Pode me mandar o boleto aqui?",
            "Chama solicitar-boleto → envia link (NÃO escalar)",
          ],
          [
            "Quero pagar o boleto / pode me mandar?",
            "Chama solicitar-boleto → envia link (NÃO escalar)",
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
            "Pedir CNPJ (14 dígitos) → depois consulta-cnpj (Etapa 1)",
          ],
        ]}
      />

      <SubTitle>Fluxo obrigatório</SubTitle>
      <List
        items={[
          "0. Boas-vindas → pedir CNPJ",
          "1. Cliente informa CNPJ → GET consulta-cnpj (Etapa 1 — status completo)",
          "2. Cliente pede boleto/pagamento/renovação → GET solicitar-boleto (Etapa 2)",
          "3. Se pendentePagamento=true → enviar urlPagamento (+ linkPdf se existir)",
          "4. Se pendentePagamento=false → informar sem pendência",
          "5. NÃO pular Etapa 1 na primeira identificação",
          "6. NÃO escalar humano para enviar boleto",
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

      <SubTitle>Mapeamento API → mensagem WhatsApp</SubTitle>
      <DataTable
        headers={["Campo JSON", "Enviar ao cliente?", "Como usar"]}
        rows={[
          [
            "urlPagamento / URLpagamento",
            "SIM — obrigatório",
            "Copiar URL literal no 👉 link da mensagem (único link principal)",
          ],
          [
            "linkBoleto",
            "NÃO",
            "Ignorar — mesmo se igual a urlPagamento; nunca enviar ao cliente",
          ],
          ["linkPdf", "SIM (opcional)", "Bloco PDF alternativo se não null"],
          ["valorFormatado", "SIM", "Linha Valor na mensagem"],
          ["razaoSocial", "SIM", "Nome da empresa"],
          ["protocolo", "SIM", "Ex.: SICAF-2026-636"],
          [
            "dataVencimento",
            "SIM",
            "Converter ISO para DD/MM/AAAA (2026-07-13 → 13/07/2026)",
          ],
          [
            "boletoReutilizado / geradoAgora",
            "Não (só IA)",
            "true/false → escolher BOLETO_WA_REUTILIZADO ou BOLETO_WA_GERADO_AGORA",
          ],
          ["codigoBarras", "NÃO", "Não colar na mensagem WhatsApp"],
          ["message", "NÃO", "Texto interno da API"],
          ["emailEnviado, emailPara, email*", "NÃO", "Dados internos — não mencionar ao cliente"],
        ]}
      />

      <SubTitle>Retorno JSON real — boleto reutilizado</SubTitle>
      <p className="mb-2 text-[13px] text-muted-foreground">
        Exemplo de produção: pendência localizada, link em{" "}
        <code>urlPagamento</code>. A IA envia esse link na mensagem.
      </p>
      <Code>{JSON_REAL_REUTILIZADO}</Code>

      <SubTitle>Instruções internas — campos da API</SubTitle>
      <IaInstrucao>
        O cliente recebe o <strong>link</strong> (valor do campo urlPagamento).
        Nunca enviar linkBoleto. linkPdf só como alternativa. Não copiar estes
        nomes de campo na mensagem WhatsApp.
      </IaInstrucao>
      <Callout tone="info">
        <strong>urlPagamento</strong> — único link que o cliente recebe. Exemplo
        real:
        <br />
        <code>https://fornecedor.cadbrasil.com.br/pay/t-636</code>
        <br />
        <strong>linkBoleto</strong> — pode vir preenchido com URL parecida;{" "}
        <strong>ignorar</strong> e usar só urlPagamento.
        <br />
        <strong>linkPdf</strong> — alternativa PDF; só se não null.
      </Callout>

      <SubTitle>Exemplo visual — mensagem ao cliente</SubTitle>
      <p className="mb-2 text-[13px] text-muted-foreground">
        Quando o cliente pede o boleto, envie uma mensagem como a abaixo (com
        link real da API — nunca mencionar urlPagamento ou nome de API).
      </p>
      <ClienteWhatsApp iaNote={WA_IA_NOTE}>{BOLETO_WA_EXEMPLO_PREENCHIDO}</ClienteWhatsApp>

      <SubTitle>Retorno JSON — campos principais (só IA)</SubTitle>
      <DataTable
        headers={["Campo", "Tipo", "Uso para IA"]}
        rows={[
          ["urlPagamento", "string", "ENVIAR AO CLIENTE — único link na mensagem"],
          ["URLpagamento", "string", "Alias — mesmo valor que urlPagamento"],
          ["linkBoleto", "string|null", "NÃO enviar — ignorar mesmo se = urlPagamento"],
          ["linkPdf", "string|null", "Alternativa PDF se cliente não abrir link"],
          ["codigoBarras", "string", "NÃO enviar ao cliente"],
          ["emailEnviado, emailPara, email*", "vários", "Interno — não mencionar ao cliente"],
          ["pendentePagamento", "boolean", "true = enviar link; false = sem pendência"],
          ["valorFormatado", "string", "Ex.: R$ 985,00 — linha Valor na mensagem"],
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
