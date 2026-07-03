import {
  Callout,
  Code,
  DataTable,
  Endpoint,
  H,
  List,
  Section,
  ShortAnswer,
  SubTitle,
} from "@/lib/docs-ui";
import { ConsultaCnpjScenarios } from "@/content/consulta-cnpj-scenarios";
import { LINKS, VIDEOS } from "@/content/videos";

/** Seção completa da API consulta-cnpj v3.0 — documentação e roteiro para IA. */
export const consultaCnpjSection: Section = {
  id: "api-consulta-cnpj",
  title: "API consulta-cnpj — documentação completa (v3.0)",
  body: (
    <>
      <ShortAnswer>
        GET /api/clients/consulta-cnpj?cnpj=CNPJ — consulta situação do cliente
        na CADBRASIL e, se necessário, na Receita Federal. Leia{" "}
        <code>situacaoCadastro</code> para definir o cenário. Priorize{" "}
        <code>orientacaoUsuario</code> na resposta ao cliente.
      </ShortAnswer>

      <Callout tone="info">
        <strong>Como a IA deve usar esta API:</strong>
        <List
          items={[
            "Sempre peça o CNPJ com 14 dígitos (somente números) antes de consultar.",
            "Chame a API e leia situacaoCadastro — ele define o cenário.",
            <>
              Prioridade de mensagens: <code>orientacaoUsuario</code> (base da
              resposta) → <code>orientacaoIA</code> (roteiro interno) →{" "}
              <code>message</code> (resumo).
            </>,
            "Nunca invente valores, prazos, links de boleto ou status.",
            <>
              Não trate como cliente ativo quem tem{" "}
              <code>possuiCadastro: false</code>, mesmo que{" "}
              <code>encontradoNaReceitaFederal: true</code>.
            </>,
          ]}
        />
      </Callout>

      <SubTitle>Endpoint</SubTitle>
      <DataTable
        headers={["Item", "Valor"]}
        rows={[
          ["Método", "GET"],
          [
            "URL",
            "https://fornecedor.cadbrasil.com.br/api/clients/consulta-cnpj?cnpj={14_dígitos}",
          ],
          [
            "Autenticação",
            "Header x-api-key (valor de CNPJ_CONSULTA_API_KEY no servidor da IA)",
          ],
          ["CNPJ", "Com ou sem máscara; deve ter 14 dígitos"],
        ]}
      />
      <Endpoint
        method="GET"
        url="https://fornecedor.cadbrasil.com.br/api/clients/consulta-cnpj?cnpj=CNPJ"
      />

      <SubTitle>Códigos HTTP</SubTitle>
      <DataTable
        headers={["Status", "Quando", "situacaoCadastro"]}
        rows={[
          ["200", "Consulta processada", "conforme cenário abaixo"],
          ["400", "CNPJ inválido (≠ 14 dígitos)", "cnpj_invalido"],
          ["401", "API Key ausente ou inválida", "—"],
          ["500", "Erro interno / banco indisponível", "—"],
        ]}
      />

      <SubTitle>Fluxo de decisão (campo situacaoCadastro)</SubTitle>
      <Code>{`GET /api/clients/consulta-cnpj?cnpj=...
        │
        ├─ HTTP 400 ─────────────────────────► cnpj_invalido
        ├─ HTTP 401 / 500 ───────────────────► erro (ok: false)
        │
        └─ HTTP 200 + ok: true
              │
              ├─ possuiCadastro: false
              │     ├─ encontradoNaReceitaFederal: true  ► cadastro_pendente
              │     └─ encontradoNaReceitaFederal: false ► nao_encontrado
              │
              └─ possuiCadastro: true (cliente na base CADBRASIL)
                    │
                    ├─ sicafValido: true ─────────────────► ativo
                    ├─ pagamento SICAF em aberto ──────────► aguardando_pagamento
                    ├─ sicaf.status = Vencido ─────────────► sicaf_vencido
                    ├─ sicaf = null ───────────────────────► cadastro_sem_sicaf
                    └─ demais casos SICAF incompleto ──────► sicaf_incompleto`}</Code>
      <H>
        <strong>Ordem de avaliação no backend (cliente cadastrado):</strong>{" "}
        1) sicafValido → ativo · 2) taxa/boleto pendente → aguardando_pagamento
        · 3) SICAF vencido → sicaf_vencido · 4) sem registro SICAF →
        cadastro_sem_sicaf · 5) demais → sicaf_incompleto
      </H>

      <SubTitle>Valores de situacaoCadastro</SubTitle>
      <DataTable
        headers={["Valor", "Significado"]}
        rows={[
          ["cnpj_invalido", "CNPJ com formato inválido (erro 400)"],
          [
            "nao_encontrado",
            "Não está na CADBRASIL nem confirmado na Receita",
          ],
          [
            "cadastro_pendente",
            "Achou na Receita Federal, cadastro CADBRASIL não concluído",
          ],
          [
            "aguardando_pagamento",
            "Cadastro na CADBRASIL, taxa SICAF não quitada",
          ],
          ["sicaf_vencido", "Cadastro na CADBRASIL, credenciamento expirado"],
          [
            "cadastro_sem_sicaf",
            "Cliente na base, sem processo SICAF iniciado",
          ],
          ["sicaf_incompleto", "SICAF iniciado, ainda não concluído"],
          ["ativo", "Credenciamento SICAF válido e em ordem"],
        ]}
      />

      <SubTitle>Campos comuns (respostas de sucesso)</SubTitle>
      <DataTable
        headers={["Campo", "Tipo", "Descrição"]}
        rows={[
          ["ok", "boolean", "true = sucesso"],
          ["cnpj", "string", "14 dígitos, sem máscara"],
          [
            "situacaoCadastro",
            "string",
            "Identificador do cenário — campo principal para a IA",
          ],
          ["message", "string", "Resumo curto da situação"],
          ["orientacaoUsuario", "string", "Texto completo para o cliente"],
          ["orientacaoIA", "string", "Texto para a IA montar o atendimento"],
          [
            "possuiCadastro",
            "boolean",
            "Existe na base clientes da CADBRASIL",
          ],
          [
            "possuiPagamentoPendente",
            "boolean",
            "Há taxa/boleto SICAF ou manutenção em aberto",
          ],
          ["cadastroConcluido", "boolean", "true se cadastrado na base"],
          [
            "cadastroValido",
            "boolean",
            "SICAF válido ou renovação paga",
          ],
          ["sicafValido", "boolean", "Licença SICAF ativa/vencendo"],
          ["razaoSocial", "string|null", "Da base ou da Receita"],
          ["valorTaxaAnual", "number", "Taxa credenciamento (padrão R$ 985)"],
          ["valorTotalPendente", "number", "Soma de boletos em aberto"],
          ["urlCadastro", "string", "https://cadastro.cadbrasil.com.br"],
          ["urlPortal", "string", "https://fornecedor.cadbrasil.com.br"],
        ]}
      />

      <SubTitle>Tabela rápida — O que a IA responde por cenário</SubTitle>
      <DataTable
        headers={["situacaoCadastro", "Tom", "Ação principal", "Link principal"]}
        rows={[
          ["cnpj_invalido", "Neutro", "Pedir 14 dígitos", "—"],
          [
            "nao_encontrado",
            "Neutro",
            "Confirmar CNPJ / cadastro novo",
            "cadastro.cadbrasil.com.br",
          ],
          [
            "cadastro_pendente",
            "Acolhedor",
            "Concluir cadastro + taxa R$ 985",
            "cadastro.cadbrasil.com.br",
          ],
          [
            "aguardando_pagamento",
            "Objetivo",
            "Pagar taxa SICAF",
            "fornecedor.cadbrasil.com.br + boleto",
          ],
          [
            "sicaf_vencido",
            "Urgente",
            "Renovar SICAF",
            "fornecedor.cadbrasil.com.br + vídeo",
          ],
          [
            "cadastro_sem_sicaf",
            "Orientativo",
            "Iniciar SICAF",
            "fornecedor / cadastro",
          ],
          [
            "sicaf_incompleto",
            "Orientativo",
            "Ver pendências no portal",
            "fornecedor.cadbrasil.com.br",
          ],
          [
            "ativo",
            "Positivo",
            "Confirmar status + níveis + links",
            "portal + ajuda + vídeo",
          ],
        ]}
      />

      <SubTitle>Cenários detalhados (A a H)</SubTitle>
      <ConsultaCnpjScenarios />

      <SubTitle>Interpretação de manutencao (quando presente)</SubTitle>
      <DataTable
        headers={["Campo", "Uso para IA"]}
        rows={[
          ["status", "Ativo, A vencer, Vencendo = manutenção contratada"],
          ["valor", "Geralmente R$ 155,00/mês"],
          ["diasRestantes", "Dias até fim do período atual"],
          ["dataFim", "Data de término do ciclo"],
        ]}
      />
      <H>
        <code>possuiManutencao: true</code> → cliente tem manutenção CADBRASIL
        ativa. Boletos de manutenção →{" "}
        <code>GET /api/clients/consulta-boletos?cnpj=CNPJ</code>
      </H>

      <SubTitle>Interpretação de renovacao</SubTitle>
      <DataTable
        headers={["Campo", "Uso para IA"]}
        rows={[
          ["status", "Concluída, Pendente, etc."],
          ["anoReferencia", "Ano da renovação"],
          [
            "possuiRenovacao: true",
            "Última renovação concluída/aprovada/paga",
          ],
        ]}
      />
      <H>
        Renovação <strong>Concluída</strong> + <code>sicafValido: true</code> =
        cliente regularizado para o ano.
      </H>

      <SubTitle>Respostas de erro (ok: false)</SubTitle>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        401 — Não autorizado
      </p>
      <Code>{`{ "ok": false, "error": "Não autorizado. API Key inválida." }`}</Code>
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        400 — CNPJ inválido
      </p>
      <Code>{`{ "ok": false, "error": "CNPJ inválido. Informe 14 dígitos.", "situacaoCadastro": "cnpj_invalido" }`}</Code>
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        500 — Erro interno
      </p>
      <Code>{`{ "ok": false, "error": "Erro interno no servidor" }
{ "ok": false, "error": "Banco de dados não disponível" }`}</Code>
      <H>
        <strong>IA:</strong> em 400, peça CNPJ com 14 dígitos. Em 401/500, não
        exponha detalhes técnicos — informe indisponibilidade temporária e
        escale ou peça para tentar depois.
      </H>

      <SubTitle>Objeto cliente</SubTitle>
      <DataTable
        headers={["Campo", "Tipo"]}
        rows={[
          ["id", "number"],
          ["razaoSocial", "string|null"],
          ["nomeFantasia", "string|null"],
          ["tipoDocumento", "string|null"],
          ["documento", "string|null"],
          ["email", "string|null"],
          ["telefone", "string|null"],
          ["celular", "string|null"],
          ["endereco", "string|null"],
          ["cidade", "string|null"],
          ["estado", "string|null"],
          ["cep", "string|null"],
          ["porte", "string|null"],
          ["ramoAtividade", "string|null"],
          ["status", "string|null"],
          ["createdAt", "string (ISO)|null"],
          ["updatedAt", "string (ISO)|null"],
        ]}
      />

      <SubTitle>Objeto sicaf</SubTitle>
      <DataTable
        headers={["Campo", "Tipo", "Descrição"]}
        rows={[
          ["id", "number", "ID do cadastro SICAF"],
          [
            "status",
            "string",
            "Ativo, Vencendo, Vencido, Pendente, Inativo, Sem SICAF",
          ],
          ["valido", "boolean", "Licença vigente"],
          ["dataValidade", "string|null", "Data de validade"],
          ["diasValidade", "number|null", "Dias restantes"],
          ["completude", "number|null", "% de completude (0–100)"],
        ]}
      />

      <SubTitle>Objeto pagamentosResumo</SubTitle>
      <DataTable
        headers={["Campo", "Tipo", "Descrição"]}
        rows={[
          ["totalPendentes", "number", "Quantidade de boletos em aberto"],
          ["valorTotalPendente", "number", "Soma dos valores pendentes"],
          [
            "sicafPendentes[]",
            "array",
            "Boletos SICAF: valor, status, dataVencimento, linkBoleto, pdfBoleto",
          ],
          [
            "manutencaoPendentes[]",
            "array",
            "Boletos de manutenção pendentes",
          ],
        ]}
      />

      <SubTitle>Objeto receitaFederal</SubTitle>
      <DataTable
        headers={["Campo", "Tipo"]}
        rows={[
          ["cnpj", "string"],
          ["razaoSocial", "string|null"],
          ["nomeFantasia", "string|null"],
          ["situacaoCadastral", "string|null"],
          ["atividadePrincipal", "string|null"],
          ["email", "string|null"],
          ["telefone", "string|null"],
          ["logradouro", "string|null"],
          ["numero", "string|null"],
          ["complemento", "string|null"],
          ["bairro", "string|null"],
          ["cidade", "string|null"],
          ["estado", "string|null"],
          ["cep", "string|null"],
          ["porte", "string|null"],
          ["naturezaJuridica", "string|null"],
        ]}
      />

      <SubTitle>Campos exclusivos do cenário ativo</SubTitle>
      <DataTable
        headers={["Campo", "Descrição"]}
        rows={[
          ["saudacao", "Bom dia / Boa tarde / Boa noite (horário Brasília)"],
          ["pagamentosEmDia", "true se não há boletos pendentes"],
          ["renovacaoProxima", "true se faltam ≤ 60 dias para vencer"],
          ["renovacaoUrgente", "true se faltam ≤ 30 dias"],
          ["diasParaRenovacao", "Dias até sicaf.dataValidade"],
          ["niveisSicaf[]", "Array com níveis I a VI"],
          ["certidaoVencendoOuVencida", "true se algum nível está A Vencer ou Vencido"],
          ["urlAjuda", LINKS.ajuda],
          ["urlVideoAtualizacaoSicaf", VIDEOS.atualizarSicaf],
          ["urlWhatsApp", LINKS.whatsapp],
          ["whatsappDisplay", LINKS.whatsappDisplay],
        ]}
      />

      <SubTitle>Links oficiais (referência fixa)</SubTitle>
      <DataTable
        headers={["Recurso", "URL"]}
        rows={[
          ["Cadastro digital", LINKS.cadastro],
          ["Portal do fornecedor", LINKS.portal],
          ["Central de ajuda", LINKS.ajuda],
          ["Esqueci senha", LINKS.esqueciSenha],
          ["Vídeo — atualizar SICAF", VIDEOS.atualizarSicaf],
          ["WhatsApp", LINKS.whatsappDisplay],
          ["Documentação", LINKS.docs],
        ]}
      />

      <Callout tone="ok">
        <strong>Regra final para a IA:</strong> sempre priorize{" "}
        <code>orientacaoUsuario</code> quando existir. Nunca invente status,
        valores ou links de boleto. Use apenas o retorno da API e este
        documento.
      </Callout>
    </>
  ),
};
