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

/** Seção completa da API consulta-cnpj para documentação e IA. */
export const consultaCnpjSection: Section = {
  id: "api-consulta-cnpj",
  title: "API consulta-cnpj — documentação completa",
  body: (
    <>
      <ShortAnswer>
        GET /api/clients/consulta-cnpj?cnpj=CNPJ — consulta situação do cliente
        na CADBRASIL e, se necessário, na Receita Federal. Use{" "}
        <code>orientacaoIA</code> quando disponível.
      </ShortAnswer>

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
        headers={["Status", "Quando"]}
        rows={[
          ["200", "Consulta processada com sucesso (ok: true)"],
          ["400", "CNPJ inválido (menos ou mais de 14 dígitos)"],
          ["401", "API Key ausente ou inválida"],
          ["500", "Erro interno ou banco indisponível"],
        ]}
      />

      <SubTitle>Fluxo de decisão (para a IA)</SubTitle>
      <Code>{`GET /api/clients/consulta-cnpj?cnpj=...
        │
        ├─ API Key inválida ──────────────► 401
        ├─ CNPJ ≠ 14 dígitos ─────────────► 400
        ├─ Erro DB/servidor ──────────────► 500
        │
        └─ ok: true
              │
              ├─ possuiCadastro: true ────► Cenário 1 (cliente + sicaf + renovacao + manutencao)
              │
              └─ possuiCadastro: false
                    │
                    ├─ encontradoNaReceitaFederal: true ──► Cenário 2 (+ receitaFederal + orientacaoIA)
                    └─ encontradoNaReceitaFederal: false ─► Cenário 3 (erroReceitaFederal)`}</Code>

      <Callout tone="info">
        <strong>Regra para a IA:</strong> quando existir o campo{" "}
        <code>orientacaoIA</code>, use-o como base da resposta ao cliente
        (pode adaptar para tom WhatsApp). Quando existir{" "}
        <code>orientacaoUsuario</code>, pode enviá-lo diretamente ao cliente.
      </Callout>

      <SubTitle>
        Cenário 1 — CNPJ cadastrado na CADBRASIL
      </SubTitle>
      <H>
        <code>possuiCadastro: true</code> ·{" "}
        <code>cadastroConcluido: true</code>
      </H>
      <Code>{`{
  "ok": true,
  "cnpj": "23250168000150",
  "possuiCadastro": true,
  "cadastroConcluido": true,
  "cadastroValido": false,
  "sicafValido": false,
  "possuiRenovacao": false,
  "possuiManutencao": false,
  "razaoSocial": "EMPRESA EXEMPLO LTDA",
  "cliente": {
    "id": 192281,
    "razaoSocial": "EMPRESA EXEMPLO LTDA",
    "nomeFantasia": "EXEMPLO",
    "tipoDocumento": "CNPJ",
    "documento": "23250168000150",
    "email": "contato@empresa.com.br",
    "telefone": "(11) 2122-0202",
    "celular": null,
    "endereco": "RUA EXEMPLO, 100",
    "cidade": "SAO PAULO",
    "estado": "SP",
    "cep": "05711001",
    "porte": "ME",
    "ramoAtividade": "Atividade principal",
    "status": "Ativo",
    "createdAt": "2026-06-20T17:11:05.000Z",
    "updatedAt": "2026-06-20T17:11:05.000Z"
  },
  "sicaf": {
    "id": 192280,
    "status": "Pendente",
    "valido": false,
    "dataValidade": null,
    "diasValidade": 0,
    "completude": 0
  },
  "renovacao": {
    "id": 6138,
    "status": "Pendente",
    "anoReferencia": 2026,
    "createdAt": "2026-06-20T17:11:05.000Z"
  },
  "manutencao": {
    "id": 42,
    "status": "Ativo",
    "dataInicio": "2026-01-01",
    "dataFim": "2026-12-31",
    "valor": 155.0,
    "diasRestantes": 180
  }
}`}</Code>
      <List
        items={[
          <>
            <code>sicaf</code>, <code>renovacao</code> e <code>manutencao</code>{" "}
            podem ser <code>null</code> se não existirem.
          </>,
          <>
            <code>cadastroValido</code> = <code>sicafValido</code> ou renovação
            concluída/aprovada/paga.
          </>,
          <>
            <code>sicaf.status</code> possíveis: Ativo, Vencendo, Vencido,
            Pendente, Inativo, Sem SICAF.
          </>,
          <>
            <code>sicaf.valido</code> = <code>true</code> quando status é Ativo
            ou Vencendo.
          </>,
        ]}
      />
      <H>
        <strong>IA — o que fazer no Cenário 1:</strong> cumprimente pelo{" "}
        <code>razaoSocial</code>, informe status do SICAF (
        <code>sicaf.status</code>), se <code>sicafValido</code> e pendências.
        Oriente próximo passo conforme status (documentos, renovação, etc.).
      </H>

      <SubTitle>
        Cenário 2 — Não cadastrado na CADBRASIL, mas encontrado na Receita
        Federal
      </SubTitle>
      <H>
        <code>possuiCadastro: false</code> ·{" "}
        <code>encontradoNaReceitaFederal: true</code>
      </H>
      <H>
        Consulta automática via OpenCNPJ (
        <code>OPENCNPJ_API_URL</code> no backend).
      </H>
      <Code>{`{
  "ok": true,
  "cnpj": "06990590000123",
  "possuiCadastro": false,
  "cadastroConcluido": false,
  "cadastroValido": false,
  "sicafValido": false,
  "possuiRenovacao": false,
  "possuiManutencao": false,
  "razaoSocial": "GOOGLE BRASIL INTERNET LTDA.",
  "cliente": null,
  "sicaf": null,
  "renovacao": null,
  "manutencao": null,
  "urlCadastro": "https://cadastro.cadbrasil.com.br",
  "podeConcluirCadastro": true,
  "encontradoNaReceitaFederal": true,
  "situacaoReceitaFederal": "Ativa",
  "receitaFederal": {
    "cnpj": "06990590000123",
    "razaoSocial": "GOOGLE BRASIL INTERNET LTDA.",
    "nomeFantasia": null,
    "situacaoCadastral": "Ativa",
    "atividadePrincipal": "Portais, provedores de conteúdo...",
    "email": "GOOGLEBRASIL@GOOGLE.COM",
    "telefone": "(11) 23958400",
    "logradouro": "AVENIDA BRIG FARIA LIMA",
    "numero": "3477",
    "complemento": "ANDAR 17A20",
    "bairro": "ITAIM BIBI",
    "cidade": "SAO PAULO",
    "estado": "SP",
    "cep": "04538133",
    "porte": null,
    "naturezaJuridica": "Sociedade Empresária Limitada (2062)"
  },
  "message": "CNPJ localizado na Receita Federal, porém o cadastro na CADBRASIL ainda não foi concluído.",
  "orientacaoUsuario": "Para concluir o cadastro e dar sequência ao processo, acesse: https://cadastro.cadbrasil.com.br",
  "orientacaoIA": "O CNPJ 06990590000123 corresponde a GOOGLE BRASIL INTERNET LTDA. (situação cadastral: Ativa) mas NÃO possui cadastro concluído na plataforma CADBRASIL. Informe ao cliente que ele pode finalizar o cadastro em https://cadastro.cadbrasil.com.br para continuar o processo SICAF."
}`}</Code>
      <H>
        Campos exclusivos: <code>encontradoNaReceitaFederal</code>,{" "}
        <code>situacaoReceitaFederal</code>, <code>receitaFederal</code>,{" "}
        <code>urlCadastro</code>, <code>podeConcluirCadastro</code>,{" "}
        <code>message</code>, <code>orientacaoUsuario</code>,{" "}
        <code>orientacaoIA</code>.
      </H>
      <H>
        <strong>IA — o que fazer no Cenário 2:</strong> use{" "}
        <code>orientacaoIA</code> ou <code>orientacaoUsuario</code>. Envie{" "}
        <code>urlCadastro</code> (https://cadastro.cadbrasil.com.br). Não trate
        como cliente ativo — cadastro ainda não concluído.
      </H>

      <SubTitle>
        Cenário 3 — Não cadastrado na CADBRASIL e não confirmado na Receita
      </SubTitle>
      <H>
        <code>possuiCadastro: false</code> ·{" "}
        <code>encontradoNaReceitaFederal: false</code>
      </H>
      <Code>{`{
  "ok": true,
  "cnpj": "00000000000000",
  "possuiCadastro": false,
  "cadastroConcluido": false,
  "cadastroValido": false,
  "sicafValido": false,
  "possuiRenovacao": false,
  "possuiManutencao": false,
  "razaoSocial": null,
  "cliente": null,
  "sicaf": null,
  "renovacao": null,
  "manutencao": null,
  "urlCadastro": "https://cadastro.cadbrasil.com.br",
  "podeConcluirCadastro": true,
  "encontradoNaReceitaFederal": false,
  "receitaFederal": null,
  "message": "CNPJ não encontrado na base de clientes CADBRASIL.",
  "orientacaoUsuario": "Caso a empresa ainda não tenha se cadastrado, acesse https://cadastro.cadbrasil.com.br para concluir o cadastro.",
  "orientacaoIA": "O CNPJ 00000000000000 não foi encontrado na base CADBRASIL. Consulta à Receita Federal: CNPJ não encontrado na base da Receita Federal. Oriente o cliente a verificar o número informado ou concluir o cadastro em https://cadastro.cadbrasil.com.br.",
  "erroReceitaFederal": "CNPJ não encontrado na base da Receita Federal."
}`}</Code>
      <H>
        <code>erroReceitaFederal</code> — possíveis valores:
      </H>
      <List
        items={[
          "CNPJ não encontrado na base da Receita Federal.",
          "CNPJ deve ter 14 dígitos.",
          "Resposta inválida da API OpenCNPJ.",
          "Limite de consultas atingido (100/min). Tente novamente em instantes.",
        ]}
      />
      <H>
        <strong>IA — o que fazer no Cenário 3:</strong> peça ao cliente para
        verificar os 14 dígitos do CNPJ. Se persistir após 2 tentativas,
        escalar humano. Ofereça <code>urlCadastro</code> se for empresa nova.
      </H>

      <SubTitle>Respostas de erro (ok: false)</SubTitle>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        401 — Não autorizado
      </p>
      <Code>{`{ "ok": false, "error": "Não autorizado. API Key inválida." }`}</Code>
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        400 — CNPJ inválido
      </p>
      <Code>{`{ "ok": false, "error": "CNPJ inválido. Informe 14 dígitos." }`}</Code>
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

      <SubTitle>Referência de campos (nível raiz)</SubTitle>
      <DataTable
        headers={["Campo", "Tipo", "Cenário", "Descrição"]}
        rows={[
          ["ok", "boolean", "Todos", "true = sucesso; false = erro"],
          ["error", "string", "Erro", "Mensagem (só quando ok: false)"],
          ["cnpj", "string", "Sucesso", "14 dígitos, sem máscara"],
          [
            "possuiCadastro",
            "boolean",
            "Sucesso",
            "Existe na base clientes CADBRASIL",
          ],
          [
            "cadastroConcluido",
            "boolean",
            "Sucesso",
            "true se cadastrado; false se só Receita",
          ],
          [
            "cadastroValido",
            "boolean",
            "Sucesso",
            "SICAF válido ou renovação paga",
          ],
          ["sicafValido", "boolean", "Sucesso", "Licença SICAF ativa/vencendo"],
          [
            "possuiRenovacao",
            "boolean",
            "Sucesso",
            "Última renovação concluída/aprovada",
          ],
          [
            "possuiManutencao",
            "boolean",
            "Sucesso",
            "Plano de manutenção ativo",
          ],
          ["razaoSocial", "string|null", "Sucesso", "Da base ou da Receita"],
          ["cliente", "object|null", "Cenário 1", "Dados completos do cliente"],
          ["sicaf", "object|null", "Cenário 1", "Situação do cadastro SICAF"],
          ["renovacao", "object|null", "Cenário 1", "Última renovação"],
          ["manutencao", "object|null", "Cenário 1", "Manutenção mais recente"],
          [
            "urlCadastro",
            "string",
            "Cenários 2 e 3",
            "URL para concluir cadastro",
          ],
          [
            "podeConcluirCadastro",
            "boolean",
            "Cenários 2 e 3",
            "true neste fluxo",
          ],
          [
            "encontradoNaReceitaFederal",
            "boolean",
            "Cenários 2 e 3",
            "Consulta OpenCNPJ OK",
          ],
          [
            "situacaoReceitaFederal",
            "string|null",
            "Cenários 2 e 3",
            "Ex.: Ativa, Baixada",
          ],
          [
            "receitaFederal",
            "object|null",
            "Cenário 2",
            "Dados da Receita",
          ],
          ["message", "string", "Cenários 2 e 3", "Mensagem resumida"],
          [
            "orientacaoUsuario",
            "string",
            "Cenários 2 e 3",
            "Texto para o cliente final",
          ],
          [
            "orientacaoIA",
            "string",
            "Cenários 2 e 3",
            "Texto pronto para IA/WhatsApp",
          ],
          [
            "erroReceitaFederal",
            "string|null",
            "Cenário 3",
            "Erro da consulta Receita",
          ],
        ]}
      />

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

      <SubTitle>Objeto renovacao</SubTitle>
      <DataTable
        headers={["Campo", "Tipo"]}
        rows={[
          ["id", "number"],
          ["status", "string|null"],
          ["anoReferencia", "number|null"],
          ["createdAt", "string (ISO)|null"],
        ]}
      />

      <SubTitle>Objeto manutencao</SubTitle>
      <DataTable
        headers={["Campo", "Tipo"]}
        rows={[
          ["id", "number"],
          ["status", "string|null"],
          ["dataInicio", "string|null"],
          ["dataFim", "string|null"],
          ["valor", "number|null"],
          ["diasRestantes", "number|null"],
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
    </>
  ),
};
