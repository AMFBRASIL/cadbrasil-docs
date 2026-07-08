import {
  ClienteWhatsApp,
  Code,
  H,
  List,
  ScenarioBlock,
  SubTitle,
} from "@/lib/docs-ui";
import { LINKS, VIDEOS } from "@/content/videos";

const WA_IA_NOTE =
  "Use os dados retornados pela API. Omita linhas null/vazias. Formate CNPJ (XX.XXX.XXX/XXXX-XX). Não mencione nomes de API ou campos técnicos ao cliente.";

const FOOTER = `🔐 *CADBRASIL Oficial*
Tecnologia, segurança e suporte para fornecedores do Brasil. 🇧🇷`;

/** Retorno real consulta-cnpj — aguardando_pagamento (sem link de boleto). */
const JSON_AGUARDANDO_PAGAMENTO = `{
  "ok": true,
  "cnpj": "01744605000150",
  "possuiCadastro": true,
  "cadastroConcluido": true,
  "cadastroValido": false,
  "sicafValido": false,
  "possuiRenovacao": false,
  "possuiManutencao": false,
  "possuiPagamentoPendente": true,
  "razaoSocial": "J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA",
  "urlCadastro": "https://cadastro.cadbrasil.com.br",
  "urlPortal": "https://fornecedor.cadbrasil.com.br",
  "cliente": {
    "id": 192803,
    "razaoSocial": "J A R E ASSESSORIA E CONSULTORIA DE SEGURANCA E EMPRESARIAL LTDA",
    "nomeFantasia": "SUAT",
    "email": "licitacao@suat.com.br",
    "telefone": "1120626798",
    "status": "Ativo"
  },
  "sicaf": {
    "id": 192802,
    "status": "Pendente",
    "valido": false,
    "completude": 0
  },
  "renovacao": {
    "id": 6250,
    "status": "Pendente",
    "anoReferencia": 2026
  },
  "manutencao": null,
  "situacaoCadastro": "aguardando_pagamento",
  "valorTotalPendente": 985,
  "pagamentosResumo": {
    "totalPendentes": 1,
    "valorTotalPendente": 985,
    "manutencaoPendentes": []
  },
  "message": "Cadastro SICAF identificado com pagamento pendente de R$ 985,00.",
  "orientacaoUsuario": "...(texto completo para o cliente)...",
  "orientacaoIA": "...(roteiro interno — não copiar literal ao cliente)..."
}`;

export function ConsultaCnpjScenarios() {
  return (
    <>
      <ScenarioBlock
        title="Cenário A — CNPJ inválido"
        badge="cnpj_invalido"
        tone="warn"
        when="Cliente informou CNPJ com menos ou mais de 14 dígitos, ou vazio. HTTP 400."
        fields={
          <>
            <code>situacaoCadastro: &quot;cnpj_invalido&quot;</code> ·{" "}
            <code>ok: false</code>
          </>
        }
        clientMessage={
          <ClienteWhatsApp>{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ*

⚠️ *CNPJ não reconhecido*

Olá! 👋 Tentamos consultar o número informado, mas *não foi possível validá-lo* como um CNPJ válido.

🔢 *O que precisamos:*
Envie o CNPJ da empresa com *exatamente 14 números*, *sem pontos, barra ou traço*.

✅ *Exemplo correto:*
03751915000127

❌ *Evite estes formatos:*
• 37.519.150/0001-27
• 3751915000127 (13 dígitos)
• Campo vazio ou incompleto

📌 Assim que recebermos o CNPJ correto, consultaremos sua situação cadastral na CADBRASIL Oficial e na Receita Federal.

❓ Se precisar de ajuda para localizar o CNPJ, solicite falar com um *atendente*.

${FOOTER}`}</ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Tom cordial — não culpar o cliente pelo erro de digitação.",
              "Explicar formato: 14 dígitos, somente números.",
              "Dar exemplo concreto de CNPJ válido.",
              "Não consultar boletos nem falar de status SICAF até ter 14 dígitos válidos.",
              "Após 2 tentativas sem sucesso → escalar humano.",
            ]}
          />
        }
      >
        <Code>{`{
  "ok": false,
  "error": "CNPJ inválido. Informe 14 dígitos.",
  "situacaoCadastro": "cnpj_invalido"
}`}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário B — Não encontrado"
        badge="nao_encontrado"
        when={
          <>
            CNPJ não existe na base CADBRASIL Oficial (<code>possuiCadastro: false</code>)
            e não foi confirmado na Receita Federal (
            <code>encontradoNaReceitaFederal: false</code>).
          </>
        }
        fields={
          <>
            <code>cliente: null</code> · <code>sicaf: null</code> ·{" "}
            <code>urlCadastro</code> · <code>erroReceitaFederal</code>
          </>
        }
        clientMessage={
          <ClienteWhatsApp>{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ — Resultado*

Olá! 👋 Realizamos a consulta do CNPJ informado, porém *não localizamos* esse número em nossa base nem conseguimos confirmá-lo na *Receita Federal*.

📋 *Consulta realizada:*

🔢 *CNPJ informado:*
{cnpj}

📊 *Status CADBRASIL Oficial:*
Não cadastrado

📊 *Status Receita Federal:*
{erroReceitaFederal}

━━━━━━━━━━━━━━━━

⚠️ *Possíveis motivos:*
• CNPJ digitado incorretamente
• Empresa recém-aberta (cadastro ainda indisponível na base)
• Empresa ainda não iniciou cadastro na CADBRASIL Oficial

✅ *O que fazer agora:*

1️⃣ *Confira os 14 dígitos* do CNPJ e informe novamente

2️⃣ Se sua empresa *ainda não se cadastrou* na CADBRASIL Oficial, inicie aqui:
👉 {urlCadastro}

Lá você dará sequência ao *credenciamento SICAF* e terá acesso à plataforma completa de fornecedores.

❓ Ainda com dúvidas? Solicite falar com um *atendente* — estamos à disposição! 📞

${FOOTER}`}</ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Use orientacaoUsuario / orientacaoIA quando existirem.",
              "Informar CNPJ consultado e mensagem de erroReceitaFederal.",
              "Pedir confirmação do CNPJ — pode ter digitado errado.",
              "Oferecer urlCadastro se for empresa nova.",
              "Não dizer que o cliente já é cadastrado.",
              "Se erroReceitaFederal = limite de consultas → pedir para tentar em instantes.",
              "Após 2 tentativas → escalar humano.",
            ]}
          />
        }
      >
        <Code>{`{
  "ok": true,
  "cnpj": "00000000000000",
  "situacaoCadastro": "nao_encontrado",
  "possuiCadastro": false,
  "encontradoNaReceitaFederal": false,
  "cliente": null,
  "sicaf": null,
  "urlCadastro": "https://cadastro.CADBRASIL Oficial.com.br",
  "erroReceitaFederal": "CNPJ não encontrado na base da Receita Federal.",
  "orientacaoUsuario": "Verifique o CNPJ ou acesse https://cadastro.CADBRASIL Oficial.com.br"
}`}</Code>
        <H>Valores possíveis em erroReceitaFederal:</H>
        <List
          items={[
            "CNPJ não encontrado na base da Receita Federal.",
            "Resposta inválida da API OpenCNPJ.",
            "Limite de consultas atingido (100/min). Tente novamente em instantes.",
          ]}
        />
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário C — Cadastro pendente"
        badge="cadastro_pendente"
        when={
          <>
            CNPJ não está na CADBRASIL Oficial, mas foi encontrado na Receita Federal (
            <code>encontradoNaReceitaFederal: true</code>). Consulta via
            OpenCNPJ.
          </>
        }
        fields={
          <>
            <code>receitaFederal</code> · <code>situacaoReceitaFederal</code> ·{" "}
            <code>valorTaxaAnual</code> (R$ 985) · <code>urlCadastro</code>
          </>
        }
        clientMessage={
          <ClienteWhatsApp iaNote="Enviar em 2–4 blocos. Use receitaFederal quando existir; omita null. Não mencionar API ao cliente.">{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ — Resultado*

Olá! 👋 Realizamos a consulta do seu CNPJ e identificamos que sua empresa está registrada na *Receita Federal*, porém o *cadastramento na CADBRASIL Oficial ainda não foi concluído*.

📋 *Dados da empresa consultada:*

🏢 *Razão Social:*
{razaoSocial}

🔢 *CNPJ:*
{cnpj}

📛 *Nome Fantasia:*
{nomeFantasia ou "Não informado"}

📊 *Situação Cadastral:*
{situacaoReceitaFederal}

⚖️ *Natureza Jurídica:*
{naturezaJuridica}

📍 *Endereço:*
{logradouro}, {numero}{complemento ? " — " + complemento : ""}
{bairro} — {cidade}/{estado}
CEP: {cep}

🏭 *Atividade Principal:*
{atividadePrincipal}

📧 *E-mail:* {email}
📞 *Telefone:* {telefone}

━━━━━━━━━━━━━━━━

⚠️ *Situação na CADBRASIL Oficial:*
Seu CNPJ *não consta* em nossa base de fornecedores com cadastro concluído.

Para dar sequência ao *credenciamento SICAF* e acessar a plataforma CADBRASIL Oficial, é necessário concluir o cadastramento digital com dados atualizados.

✅ *Próximos passos:*

1️⃣ Acesse o cadastro digital:
👉 {urlCadastro}

2️⃣ Preencha todas as informações da empresa com *dados corretos e atualizados*

3️⃣ Efetue o pagamento da *taxa anual de credenciamento SICAF*
💰 Valor: *R$ {valorTaxaAnual},00*

📌 *Importante:*
Enquanto o cadastro e o pagamento não forem concluídos, os *níveis do SICAF não serão liberados* e sua empresa não poderá utilizar os serviços da plataforma CADBRASIL Oficial.

❓ *Precisa de ajuda?*
Se tiver dúvidas durante o cadastro, solicite falar com um *atendente* — estamos à disposição! 📞

${FOOTER}`}</ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Cumprimentar pelo razaoSocial da Receita.",
              "Montar bloco de dados usando receitaFederal: razaoSocial, cnpj, nomeFantasia, situacaoCadastral, naturezaJuridica, endereço completo, atividadePrincipal, email, telefone.",
              "Omitir linhas cujo campo seja null ou vazio (ex.: nomeFantasia, porte).",
              "Explicar claramente: encontrado na Receita, cadastro CADBRASIL Oficial pendente.",
              "Enviar urlCadastro e valorTaxaAnual (padrão R$ 985,00).",
              "Reforçar que níveis SICAF só liberam após cadastro + pagamento.",
              "Se situacaoReceitaFederal = Baixada/Inapta → escalar consultor.",
              "Se cliente tiver dúvida → pedir para falar com atendente.",
            ]}
          />
        }
        iaDont={
          <List
            items={[
              "Dizer que o SICAF está ativo.",
              "Tratar como cliente cadastrado ou enviar boleto de cliente na base.",
              "Inventar status de pagamento.",
            ]}
          />
        }
      >
        <Code>{`{
  "ok": true,
  "situacaoCadastro": "cadastro_pendente",
  "possuiCadastro": false,
  "encontradoNaReceitaFederal": true,
  "razaoSocial": "GOOGLE BRASIL INTERNET LTDA.",
  "situacaoReceitaFederal": "Ativa",
  "valorTaxaAnual": 985,
  "urlCadastro": "https://cadastro.CADBRASIL Oficial.com.br",
  "receitaFederal": { "razaoSocial": "...", "situacaoCadastral": "Ativa" },
  "orientacaoUsuario": "...",
  "orientacaoIA": "..."
}`}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário D — Aguardando pagamento"
        badge="aguardando_pagamento"
        tone="warn"
        when={
          <>
            Cliente na base CADBRASIL Oficial (<code>possuiCadastro: true</code>) com
            SICAF, mas taxa de credenciamento não paga (
            <code>sicafValido: false</code>, <code>possuiPagamentoPendente: true</code>
            ).
          </>
        }
        fields={
          <>
            <code>valorTotalPendente</code> · <code>pagamentosResumo.totalPendentes</code>{" "}
            · <code>urlPortal</code> · <code>orientacaoUsuario</code> · objetos{" "}
            <code>cliente</code>, <code>sicaf</code>, <code>renovacao</code>.{" "}
            <strong>Sem link de boleto nesta API.</strong>
          </>
        }
        clientMessage={
          <ClienteWhatsApp iaNote="Etapa 1 — só informar. Sem link de pagamento nesta mensagem. Se o cliente pedir boleto em seguida → solicitar-boleto.">{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ — Resultado*

Olá! 👋 Consultamos seu cadastro e identificamos que sua empresa *já está na base CADBRASIL Oficial*, porém há *pagamento pendente* para conclusão do credenciamento SICAF.

📋 *Dados da empresa:*

🏢 *Razão Social:*
{razaoSocial}

🔢 *CNPJ:*
{cnpj}

📧 *E-mail cadastrado:*
{cliente.email}

📞 *Telefone:*
{cliente.telefone}

📊 *Status SICAF:*
{sicaf.status} — {sicaf.completude}% concluído

━━━━━━━━━━━━━━━━

💳 *Situação financeira:*

⚠️ *Pagamento da taxa SICAF em aberto*
💰 *Valor pendente:* R$ {valorTotalPendente},00

Enquanto o pagamento *não for confirmado*, os *níveis do SICAF não serão concluídos* e o credenciamento permanece *pendente*.

💡 *Quer o link de pagamento aqui no WhatsApp?*
Basta pedir: *"pode me mandar o boleto"* ou *"quero pagar"* — enviamos o *link na hora*.

✅ *Como regularizar:*

1️⃣ Acesse o portal do fornecedor:
👉 ${LINKS.portal}

2️⃣ Ou a página de pagamentos:
👉 ${LINKS.pagamentos}

3️⃣ Ou peça aqui mesmo: *"manda o boleto"* — enviamos o link de pagamento

📌 Compensação bancária: geralmente *1 a 3 dias úteis* após o pagamento.

❓ Precisa de ajuda? Estamos à disposição!

${FOOTER}`}</ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Etapa 1 apenas: informar cadastro feito + pagamento pendente (consulta-cnpj).",
              "Usar orientacaoUsuario como base; montar bloco com razaoSocial, cnpj, cliente, sicaf.",
              "Informar valorTotalPendente e urlPortal — sem link de boleto nesta resposta.",
              "Convidar o cliente a pedir o boleto pelo WhatsApp (linguagem simples).",
              "Cliente pedir boleto/link na sequência → Etapa 2 solicitar-boleto → urlPagamento.",
              "NÃO chamar solicitar-boleto automaticamente nesta primeira resposta.",
            ]}
          />
        }
        iaDont={
          <List
            items={[
              "Enviar link de pagamento nesta etapa — consulta-cnpj não retorna link.",
              "Buscar urlPagamento ou linkBoleto no JSON da consulta-cnpj (não existem).",
              "Dizer que o SICAF está ativo ou apto a licitar.",
              "Inventar vencimento ou link de boleto.",
              "Chamar solicitar-boleto sem o cliente pedir.",
              "Copiar orientacaoIA ou nomes de API/campos na mensagem ao cliente.",
            ]}
          />
        }
      >
        <Code>{JSON_AGUARDANDO_PAGAMENTO}</Code>
        <p className="mt-3 text-[13px] text-muted-foreground">
          Link de pagamento → somente após pedido do cliente, via{" "}
          <a href="#api-solicitar-boleto" className="underline underline-offset-4">
            solicitar-boleto
          </a>
          .
        </p>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário E — SICAF vencido"
        badge="sicaf_vencido"
        tone="warn"
        when={
          <>
            Cliente na CADBRASIL Oficial com SICAF expirado (<code>sicaf.status: Vencido</code>
            , <code>sicafValido: false</code>).
          </>
        }
        clientMessage={
          <ClienteWhatsApp iaNote="Tom de urgência. Licitação próxima → escalar humano (prioridade alta). Não mencionar API ao cliente.">{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ — Resultado*

Olá! 👋 Consultamos seu cadastro e identificamos uma situação que *requer atenção imediata*.

📋 *Dados da empresa:*

🏢 *Razão Social:*
{razaoSocial}

🔢 *CNPJ:*
{cnpj}

━━━━━━━━━━━━━━━━

🚨 *ALERTA — SICAF VENCIDO*

📛 *Status:* VENCIDO
📅 *Validade expirada em:* {sicaf.dataValidade formatada}
📊 *Completude:* {sicaf.completude}%

⚠️ *IMPORTANTE:*
*Não participe de licitações* com SICAF vencido — sua empresa pode ser *desclassificada* na fase de habilitação e ficar *impedida* de contratar com o governo.

✅ *Como renovar agora:*

1️⃣ Acesse o Portal do Fornecedor:
👉 {urlPortal}

2️⃣ Faça login e regularize a renovação do credenciamento

3️⃣ Assista ao vídeo passo a passo:
🎥 ${VIDEOS.atualizarSicaf}

4️⃣ Ou fale conosco: 📞 ${LINKS.whatsappDisplay}

❗ Tem licitação próxima? Informe *imediatamente* para *prioridade no atendimento*.

❓ Precisa de ajuda? Solicite falar com um *atendente*! 📞

${FOOTER}`}</ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Tratar com urgência — tom de alerta, não de pânico.",
              "Informar razaoSocial, CNPJ, data de validade expirada.",
              "Alertar risco de desclassificação em licitações.",
              "Orientar urlPortal, vídeo atualizar SICAF e WhatsApp.",
              "Licitação próxima → escalar humano com prioridade alta.",
            ]}
          />
        }
      >
        <Code>{`{
  "situacaoCadastro": "sicaf_vencido",
  "sicaf": { "status": "Vencido", "valido": false, "dataValidade": "2026-06-10T03:00:00.000Z" },
  "message": "Credenciamento SICAF vencido em 10/06/2026."
}`}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário F — Cadastro sem SICAF"
        badge="cadastro_sem_sicaf"
        when={
          <>
            Cliente na base (<code>possuiCadastro: true</code>) sem registro em{" "}
            <code>sicaf_cadastros</code> (<code>sicaf: null</code>).
          </>
        }
        clientMessage={
          <ClienteWhatsApp>{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ — Resultado*

Olá! 👋 Consultamos seu cadastro e identificamos que sua empresa *já está na base CADBRASIL Oficial*, porém o *processo de credenciamento SICAF ainda não foi iniciado*.

📋 *Dados da empresa:*

🏢 *Razão Social:*
{razaoSocial}

🔢 *CNPJ:*
{cnpj}

📊 *Status CADBRASIL Oficial:*
Cadastrado

📊 *Status SICAF:*
Não iniciado

━━━━━━━━━━━━━━━━

⚠️ *Situação:*
Sua empresa está na plataforma, mas *ainda não possui credenciamento SICAF ativo*. Sem o SICAF, não é possível participar de licitações públicas como fornecedor habilitado.

✅ *Próximos passos:*

1️⃣ Acesse o Portal do Fornecedor:
👉 {urlPortal}

2️⃣ Ou inicie/conclua pelo cadastro digital:
👉 {urlCadastro}

3️⃣ Efetue o pagamento da *taxa anual de credenciamento SICAF*
💰 Valor: *R$ {valorTaxaAnual},00* (pagamento único)

📌 Após o pagamento e conclusão das etapas, os *níveis do SICAF* serão liberados progressivamente.

❓ Precisa de ajuda? Solicite falar com um *atendente*! 📞

${FOOTER}`}</ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Informar: cliente na base, SICAF não iniciado (sicaf: null).",
              "Montar bloco com razaoSocial e cnpj.",
              "Orientar urlPortal e urlCadastro.",
              "Informar valorTaxaAnual (padrão R$ 985,00).",
              "Explicar que sem SICAF não há habilitação para licitar.",
              "Se dúvida → pedir para falar com atendente.",
            ]}
          />
        }
      />

      <ScenarioBlock
        title="Cenário G — SICAF incompleto"
        badge="sicaf_incompleto"
        when={
          <>
            Cliente com SICAF iniciado, <code>sicafValido: false</code>, sem
            pendência financeira clara — documentação ou etapas pendentes.
          </>
        }
        clientMessage={
          <ClienteWhatsApp>{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ — Resultado*

Olá! 👋 Consultamos seu cadastro e identificamos que sua empresa está na CADBRASIL Oficial com o *credenciamento SICAF em andamento*, mas *ainda não concluído*.

📋 *Dados da empresa:*

🏢 *Razão Social:*
{razaoSocial}

🔢 *CNPJ:*
{cnpj}

📊 *Status SICAF:*
{sicaf.status}

📈 *Completude:*
{sicaf.completude}% concluído

━━━━━━━━━━━━━━━━

⚠️ *Situação:*
O processo SICAF foi iniciado, porém existem *pendências* (documentos, certidões ou etapas) que impedem a conclusão do credenciamento.

✅ *O que fazer agora:*

1️⃣ Acesse o Portal do Fornecedor:
👉 {urlPortal}

2️⃣ Faça login e verifique as *pendências* indicadas no painel

3️⃣ Envie documentos pendentes ou regularize certidões conforme orientação

4️⃣ Acompanhe a evolução da completude (atual: {sicaf.completude}%)

📌 Quanto maior a completude, mais próximo você está da *habilitação completa* para licitar.

🎥 Dúvidas sobre documentos ou certidões?
Central de Ajuda: ${LINKS.ajuda}

❓ Precisa de ajuda? Solicite falar com um *atendente*! 📞

${FOOTER}`}</ClienteWhatsApp>
        }
        iaDo={
          <List
            items={[
              "Informar razaoSocial, sicaf.status e sicaf.completude.",
              "Orientar urlPortal para ver pendências no painel.",
              "Mencionar envio de documentos e certidões.",
              "Oferecer link da Central de Ajuda para tutoriais.",
              "Se completude muito baixa → reforçar urgência em regularizar.",
              "Se dúvida → pedir para falar com atendente.",
            ]}
          />
        }
      />

      <ScenarioBlock
        title="Cenário H — Ativo (CNPJ em ordem)"
        badge="ativo"
        tone="ok"
        when={
          <>
            Cliente na CADBRASIL Oficial com <code>sicafValido: true</code> —
            credenciamento vigente. Pagamentos em dia na maioria dos casos.
          </>
        }
        fields={
          <>
            Campos exclusivos: <code>saudacao</code>, <code>pagamentosEmDia</code>
            , <code>renovacaoProxima</code>, <code>renovacaoUrgente</code>,{" "}
            <code>diasParaRenovacao</code>, <code>niveisSicaf[]</code>,{" "}
            <code>certidaoVencendoOuVencida</code>, <code>urlPortal</code>,{" "}
            <code>urlAjuda</code>, <code>urlVideoAtualizacaoSicaf</code>
          </>
        }
        clientMessage={
          <>
            <ClienteWhatsApp iaNote="Priorizar orientacaoUsuario. 3–5 blocos. Listar niveisSicaf[]. Adaptar renovação. Não mencionar API ao cliente.">{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ — Resultado*

Prezado(a) Fornecedor(a) *{razaoSocial}*, {saudacao}! 👋

✅ *Parabéns!* Seu cadastro está *ATIVO* na CADBRASIL Oficial com credenciamento SICAF *válido e em ordem*.

📋 *Resumo do cadastro:*

🏢 *Razão Social:*
{razaoSocial}

🔢 *CNPJ:*
{cnpj}

📊 *Status SICAF:*
{sicaf.status}

📅 *Validade:*
{sicaf.dataValidade formatada}

⏳ *Dias restantes:*
{diasParaRenovacao} dias

💳 *Pagamentos:*
{pagamentosEmDia ? "✅ Em dia" : "⚠️ Verificar pendências"}

🔄 *Última renovação:*
{renovacao.status} — referência {renovacao.anoReferencia}

━━━━━━━━━━━━━━━━

📈 *Validade do credenciamento:*
{SE renovacaoUrgente → "⚠️ ATENÇÃO: seu SICAF vence em {diasParaRenovacao} dias! Recomendamos iniciar a renovação AGORA pelo portal ou WhatsApp."}
{SE renovacaoProxima → "📌 Seu credenciamento vence em {diasParaRenovacao} dias — fique atento à renovação."}
{SE tudo OK → "✅ Seu credenciamento está válido por mais {diasParaRenovacao} dias."}

━━━━━━━━━━━━━━━━

📊 *Seus níveis SICAF:*

{icone} *Nível {nivel}* — {nome}
Status: {status}{dataValidade ? " (válido até " + dataValidade + ")" : ""}
(repetir para cada item de niveisSicaf[] — I a VI)

━━━━━━━━━━━━━━━━

🔗 *Links úteis:*

📋 Portal do Fornecedor:
{urlPortal}

💳 Pagamentos e boletos:
${LINKS.pagamentos}

❓ Central de Ajuda (vídeos passo a passo):
{urlAjuda}

🎥 Como atualizar o SICAF:
{urlVideoAtualizacaoSicaf}

📞 WhatsApp CADBRASIL Oficial:
{whatsappDisplay}

❓ Precisa de boleto ou suporte? Estamos à disposição!

${FOOTER}`}</ClienteWhatsApp>
            <SubTitle>Sub-cenário H2 — Ativo com certidão a vencer/vencida</SubTitle>
            <ClienteWhatsApp iaNote="Usar quando certidaoVencendoOuVencida: true. Não mencionar API ao cliente.">{`🇧🇷 *CADBRASIL Oficial ®*
💬 *Consulta de CNPJ — Resultado*

Prezado(a) Fornecedor(a) *{razaoSocial}*, {saudacao}! 👋

✅ Seu SICAF está *ativo* até *{sicaf.dataValidade formatada}*.

⚠️ Porém, identificamos *certidão(ões) a vencer ou vencida(s)*:

{icone} *Nível {nivel}* — {nome}
Status: {status} — {dataValidade}
(listar apenas níveis com ⚠️ ou ❌)

━━━━━━━━━━━━━━━━

📌 *Atenção:*
Certidões vencidas podem impedir sua *habilitação* em licitações específicas, mesmo com SICAF ativo.

✅ *Como regularizar:*

1️⃣ Assista ao vídeo passo a passo:
🎥 {urlVideoAtualizacaoSicaf}

2️⃣ Acesse a Central de Ajuda:
👉 {urlAjuda}

3️⃣ Ou acesse o Portal do Fornecedor:
👉 {urlPortal}

❓ Precisa de ajuda? Solicite falar com um *atendente*! 📞

${FOOTER}`}</ClienteWhatsApp>
          </>
        }
        iaDo={
          <List
            items={[
              "Parabenizar — cliente em dia.",
              "Usar saudacao do retorno da API (Bom dia/tarde/noite).",
              "Resumir validade, diasParaRenovacao e pagamentosEmDia.",
              "Listar todos os niveisSicaf com ícones e status.",
              "Se renovacaoUrgente → alertar renovação com tom de atenção.",
              "Se renovacaoProxima → avisar prazo.",
              "Se certidaoVencendoOuVencida → usar template H2 e destacar níveis ⚠️/❌.",
              "Se possuiManutencao → mencionar plano R$ 155/mês.",
              "Enviar links: portal, pagamentos, ajuda, vídeo, WhatsApp.",
              "Priorizar orientacaoUsuario quando existir.",
            ]}
          />
        }
      >
        <SubTitle>Estrutura de niveisSicaf[]</SubTitle>
        <Code>{`{
  "nivel": "III",
  "nome": "Regularidade Fiscal Federal",
  "status": "Válido",
  "icone": "✅",
  "pendencia": false,
  "dataValidade": "15/06/2027",
  "certidoes": 3
}`}</Code>
        <H>Ícones dos níveis:</H>
        <List
          items={[
            "✅ Válido / Habilitado",
            "⚠️ A Vencer",
            "❌ Vencido",
            "⏳ Pendente",
          ]}
        />
      </ScenarioBlock>
    </>
  );
}
