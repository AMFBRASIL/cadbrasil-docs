import {
  Code,
  H,
  List,
  ScenarioBlock,
  SubTitle,
} from "@/lib/docs-ui";
import { LINKS, VIDEOS } from "@/content/videos";

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
          <>
            O CNPJ informado não é válido. Envie os <strong>14 números</strong>{" "}
            do CNPJ, <strong>sem pontos, barra ou traço</strong>. Exemplo:{" "}
            <code>03751915000127</code>
          </>
        }
        iaDo={
          <List
            items={[
              "Pedir novamente o CNPJ no formato correto.",
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
            CNPJ não existe na base CADBRASIL (<code>possuiCadastro: false</code>)
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
          <>
            Não localizamos esse CNPJ na CADBRASIL nem na Receita Federal.
            Confira se os 14 dígitos estão corretos. Se sua empresa ainda não se
            cadastrou, acesse: <strong>{LINKS.cadastro}</strong>
          </>
        }
        iaDo={
          <List
            items={[
              "Use orientacaoUsuario / orientacaoIA quando existirem.",
              "Pedir confirmação do CNPJ.",
              "Oferecer link de cadastro se for empresa nova.",
              "Não dizer que o cliente já é cadastrado.",
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
  "urlCadastro": "https://cadastro.cadbrasil.com.br",
  "erroReceitaFederal": "CNPJ não encontrado na base da Receita Federal.",
  "orientacaoUsuario": "Verifique o CNPJ ou acesse https://cadastro.cadbrasil.com.br"
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
            CNPJ não está na CADBRASIL, mas foi encontrado na Receita Federal (
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
          <>
            Olá, empresa <strong>{"{razaoSocial}"}</strong>! Localizamos seus
            dados na Receita Federal (situação:{" "}
            <strong>{"{situacaoReceitaFederal}"}</strong>), mas o cadastro na
            CADBRASIL ainda não foi concluído. Acesse <strong>{LINKS.cadastro}</strong>{" "}
            e conclua o cadastramento. Taxa anual: <strong>R$ 985,00</strong>.
            Sem concluir cadastro e pagamento, os níveis do SICAF não serão
            liberados.
          </>
        }
        iaDo={
          <List
            items={[
              "Cumprimentar pelo razaoSocial da Receita.",
              "Enviar urlCadastro.",
              "Informar valorTaxaAnual (padrão R$ 985,00).",
              "Se situacaoReceitaFederal = Baixada/Inapta → escalar consultor.",
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
  "urlCadastro": "https://cadastro.cadbrasil.com.br",
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
            Cliente na base CADBRASIL (<code>possuiCadastro: true</code>) com
            SICAF, mas taxa de credenciamento não paga (
            <code>sicafValido: false</code>, <code>possuiPagamentoPendente: true</code>
            ).
          </>
        }
        fields={
          <>
            <code>valorTotalPendente</code> · <code>pagamentosResumo</code> ·{" "}
            <code>urlPortal</code> · objetos <code>cliente</code> e <code>sicaf</code>
          </>
        }
        clientMessage={
          <>
            A empresa <strong>{"{razaoSocial}"}</strong> já possui cadastro, mas o{" "}
            <strong>pagamento da taxa SICAF está em aberto</strong> — R${" "}
            {"{valorTotalPendente}"},00. Acesse{" "}
            <strong>{LINKS.pagamentos}</strong> para emitir ou pagar o boleto.
            Enquanto não pagar, os níveis do SICAF não serão concluídos. Se
            ainda tiver dúvida, peça para falar com um atendente.
          </>
        }
        iaDo={
          <List
            items={[
              "Informar: cadastro feito, pagamento pendente.",
              `Orientar ${LINKS.pagamentos} para boleto e pagamento.`,
              "Se pagamentosResumo.sicafPendentes[].linkBoleto ou pdfBoleto existir → enviar.",
              "Ou consultar GET /api/clients/boleto-sicaf/CNPJ.",
              "Se ainda tiver dúvida → pedir para falar com atendente (escalar).",
            ]}
          />
        }
        iaDont={
          <List
            items={[
              "Dizer que o SICAF está ativo ou apto a licitar.",
              "Dizer que não há pendências.",
            ]}
          />
        }
      >
        <Code>{`{
  "situacaoCadastro": "aguardando_pagamento",
  "possuiCadastro": true,
  "sicafValido": false,
  "possuiPagamentoPendente": true,
  "valorTotalPendente": 985,
  "sicaf": { "status": "Pendente", "valido": false, "completude": 0 },
  "pagamentosResumo": {
    "sicafPendentes": [{ "valor": 985, "linkBoleto": "https://...", "pdfBoleto": "https://...pdf" }]
  },
  "urlPortal": "https://fornecedor.cadbrasil.com.br"
}`}</Code>
      </ScenarioBlock>

      <ScenarioBlock
        title="Cenário E — SICAF vencido"
        badge="sicaf_vencido"
        tone="warn"
        when={
          <>
            Cliente na CADBRASIL com SICAF expirado (<code>sicaf.status: Vencido</code>
            , <code>sicafValido: false</code>).
          </>
        }
        clientMessage={
          <>
            A empresa <strong>{"{razaoSocial}"}</strong> está cadastrada, mas o{" "}
            <strong>SICAF está VENCIDO</strong>. Não participe de licitações com
            SICAF vencido. Renove em <strong>{LINKS.portal}</strong> ou WhatsApp{" "}
            {LINKS.whatsappDisplay}. Vídeo:{" "}
            <a href={VIDEOS.atualizarSicaf} className="underline">
              atualizar SICAF
            </a>
          </>
        }
        iaDo={
          <List
            items={[
              "Tratar com urgência.",
              "Orientar renovação imediata.",
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
          <>
            Sua empresa <strong>{"{razaoSocial}"}</strong> está na CADBRASIL, mas o{" "}
            <strong>processo SICAF ainda não foi iniciado</strong>. Acesse{" "}
            <strong>{LINKS.portal}</strong> ou <strong>{LINKS.cadastro}</strong>.
            Taxa: <strong>R$ 985,00</strong>.
          </>
        }
        iaDo={
          <List
            items={[
              "Orientar início do credenciamento.",
              "Informar valorTaxaAnual (R$ 985,00).",
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
          <>
            Sua empresa <strong>{"{razaoSocial}"}</strong> tem cadastro, mas o{" "}
            <strong>SICAF ainda não foi concluído</strong> (status:{" "}
            <strong>{"{sicaf.status}"}</strong>, completude:{" "}
            <strong>{"{sicaf.completude}"}%</strong>). Acesse{" "}
            <strong>{LINKS.portal}</strong> para ver pendências.
          </>
        }
        iaDo={
          <List
            items={[
              "Orientar acesso ao portal.",
              "Mencionar completude e status Pendente.",
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
            Cliente na CADBRASIL com <code>sicafValido: true</code> —
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
            <strong>Bloco 1:</strong> Prezado Fornecedor {"{razaoSocial}"},{" "}
            {"{saudacao}"}! Cadastro <strong>Ativo</strong>, SICAF válido até{" "}
            {"{dataValidade}"}. Pagamentos em dia.
            <br />
            <br />
            <strong>Bloco 2 — Renovação:</strong> Se renovacaoUrgente (≤30 dias)
            → alertar. Se renovacaoProxima (≤60 dias) → avisar. Senão → informar
            dias restantes.
            <br />
            <br />
            <strong>Bloco 3 — Níveis SICAF:</strong> Listar niveisSicaf com ícones
            (✅ Válido · ⚠️ A Vencer · ❌ Vencido · ⏳ Pendente).
            <br />
            <br />
            <strong>Bloco 4 — Links:</strong> Portal, WhatsApp, Central de Ajuda,
            vídeo atualização SICAF.
          </>
        }
        iaDo={
          <List
            items={[
              "Parabenizar — cliente em dia.",
              "Resumir níveis SICAF com ícones de niveisSicaf.",
              "Se renovacaoUrgente → alertar renovação.",
              "Se certidaoVencendoOuVencida → destacar níveis ⚠️/❌ e enviar vídeo.",
              "Se possuiManutencao → mencionar plano R$ 155/mês.",
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
        <H>Sub-cenário: ativo com certidão a vencer/vencida</H>
        <H>
          Quando <code>certidaoVencendoOuVencida: true</code> → destacar níveis
          com ⚠️ ou ❌ e enviar vídeo {VIDEOS.atualizarSicaf} e Central de Ajuda.
        </H>
      </ScenarioBlock>
    </>
  );
}
