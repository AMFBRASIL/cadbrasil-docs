import {
  Callout,
  Code,
  Endpoint,
  Escalar,
  H,
  List,
  Section,
  ShortAnswer,
  VideoLink,
  WaLink,
} from "@/lib/docs-ui";
import { consultaCnpjSection } from "@/content/consulta-cnpj-api";

/** Links de vídeo — preencha boletoSicaf e boletoManutencao quando disponíveis. */
export const VIDEOS = {
  certidoes:
    "https://www.youtube.com/watch?v=HzfZo8MkLd0&list=PL9q-Qi-YGxp8eiPxVI3iDU5mWTba8i43u",
  assistente:
    "https://www.youtube.com/watch?v=9EdnP0bMHlg&list=PL9q-Qi-YGxp8eiPxVI3iDU5mWTba8i43u",
  manutencao:
    "https://www.youtube.com/watch?v=tpVaxYwPhsc&list=PL9q-Qi-YGxp8eiPxVI3iDU5mWTba8i43u",
  enviarDocumentos:
    "https://www.youtube.com/watch?v=XF9oV31fOt4&list=PL9q-Qi-YGxp8eiPxVI3iDU5mWTba8i43u",
  boletoSicaf: "",
  boletoManutencao: "",
} as const;

export const sections: Section[] = [
  {
    id: "instrucoes-ia",
    title: "Instruções para a IA (atendimento WhatsApp)",
    body: (
      <>
        <Callout tone="info">
          Este bloco orienta agentes de IA. Use como regras fixas de
          comportamento — não invente informações fora deste documento.
        </Callout>
        <H>
          <strong>Tom:</strong> cordial, objetivo, frases curtas (ideal para
          WhatsApp). Trate o cliente por &quot;você&quot;.
        </H>
        <H>
          <strong>CNPJ:</strong> sempre peça os 14 dígitos (somente números,
          sem pontuação) antes de consultar APIs ou falar de boletos/status.
        </H>
        <H>
          <strong>Valores e prazos:</strong> use apenas os valores e prazos
          descritos neste documento. Se não souber, diga que vai encaminhar a
          um consultor.
        </H>
        <H>
          <strong>Links:</strong> envie links de vídeo ou da Área do Fornecedor
          quando o cliente pedir &quot;como fazer&quot;. Prefira 1 link por
          mensagem.
        </H>
        <H>
          <strong>APIs:</strong> substitua <code>CNPJ</code> nos endpoints
          pelos 14 dígitos informados pelo cliente. Consulta CNPJ: ver seção{" "}
          <a href="#api-consulta-cnpj" className="underline underline-offset-4">
            API consulta-cnpj
          </a>
          .
        </H>
        <List
          items={[
            <>
              <code>possuiCadastro: true</code> (Cenário 1) → cliente na base;
              use <code>sicaf</code>, <code>renovacao</code>,{" "}
              <code>manutencao</code>.
            </>,
            <>
              <code>possuiCadastro: false</code> +{" "}
              <code>encontradoNaReceitaFederal: true</code> (Cenário 2) → use{" "}
              <code>orientacaoIA</code> e <code>urlCadastro</code>.
            </>,
            <>
              <code>possuiCadastro: false</code> +{" "}
              <code>encontradoNaReceitaFederal: false</code> (Cenário 3) →
              verificar CNPJ ou escalar após 2 tentativas.
            </>,
            <>
              <code>pendentePagamento: false</code> (boleto SICAF) → informar
              que não há taxa SICAF em aberto.
            </>,
            <>
              <code>sicafValido: false</code> ou{" "}
              <code>sicaf.status: &quot;Vencido&quot;</code> → orientar
              renovação/atualização com urgência.
            </>,
            <>
              Com boleto disponível → enviar <code>linkPdf</code> ou{" "}
              <code>linkBoleto</code> retornado pela API.
            </>,
          ]}
        />
        <H>
          <strong>Horário comercial:</strong> Seg–Sex, 08h–18h (exceto
          feriados). Fora do horário → responder dúvidas simples e avisar que
          consultores retornam no próximo dia útil.
        </H>
        <H>
          <strong>Escalar para humano imediatamente:</strong> reclamação,
          cancelamento, pedido de reembolso, suspeita de golpe, erro técnico
          repetido, cliente irritado, CNPJ não encontrado após 2 tentativas,
          situação jurídica complexa ou restrição cadastral.
        </H>
        <H>
          <strong>Sinônimos comuns</strong> (mapear intenção do cliente):
        </H>
        <List
          items={[
            "2ª via / boleto / taxa / 985 → Boleto SICAF (credenciamento)",
            "mensalidade / 155 / manutenção → Boleto de manutenção",
            "cadastro / habilitação / fornecedor / consultar CNPJ → API consulta-cnpj",
            "app / programa / aplicativo → Assistente CADBRASIL",
            "senha / login / acesso → Área do Fornecedor",
            "certidão / CND / FGTS / negativa → Atualizar certidões",
            "renovar / vencido / validade → Renovação ou SICAF vencido",
          ]}
        />
      </>
    ),
  },
  consultaCnpjSection,
  {
    id: "o-que-e",
    title: "O que é a CADBRASIL?",
    body: (
      <>
        <ShortAnswer>
          A CADBRASIL é uma empresa privada especializada em SICAF, licitações
          públicas, gestão documental e suporte para fornecedores do governo.
        </ShortAnswer>
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
        <ShortAnswer>
          SICAF é o cadastro oficial de fornecedores do Governo Federal para
          participar de licitações e contratos públicos.
        </ShortAnswer>
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
        <ShortAnswer>
          Sim, o cadastro no SICAF é gratuito (Governo Federal). A CADBRASIL
          cobra pela assessoria, plataforma e acompanhamento — não pelo SICAF
          em si.
        </ShortAnswer>
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
    id: "credenciamento-renovacao-manutencao",
    title: "Credenciamento vs Renovação vs Manutenção",
    body: (
      <>
        <ShortAnswer>
          Credenciamento = primeiro cadastro (R$ 985). Renovação = atualizar
          cadastro/documentos. Manutenção = serviço mensal (R$ 155/mês) para
          manter tudo em dia.
        </ShortAnswer>
        <List
          items={[
            <>
              <strong>Credenciamento SICAF (R$ 985,00):</strong> serviço inicial
              para habilitar a empresa no SICAF pela primeira vez, com análise
              documental, plataforma e suporte.
            </>,
            <>
              <strong>Renovação:</strong> processo de atualização do cadastro
              SICAF quando certidões ou documentos expiram ou quando o cadastro
              precisa ser revalidado.
            </>,
            <>
              <strong>Manutenção CADBRASIL (R$ 155,00/mês):</strong> serviço
              contínuo após o credenciamento para manter SICAF, certidões e
              documentação sempre atualizados.
            </>,
          ]}
        />
        <Callout tone="info">
          Clientes frequentemente confundem os três. Pergunte se é cliente novo
          (credenciamento) ou se já possui cadastro (renovação/manutenção).
        </Callout>
      </>
    ),
  },
  {
    id: "taxa-sicaf-vs-cadbrasil",
    title: "Taxa SICAF vs Taxa CADBRASIL",
    body: (
      <>
        <ShortAnswer>
          Taxa SICAF = taxa governamental do credenciamento (R$ 985). Taxa
          CADBRASIL = assessoria + plataforma. São coisas diferentes.
        </ShortAnswer>
        <List
          items={[
            <>
              <strong>Taxa SICAF (R$ 985,00):</strong> referente ao
              credenciamento inicial. Pode ser consultada/emitida via API de
              boleto SICAF.
            </>,
            <>
              <strong>Manutenção CADBRASIL (R$ 155,00/mês):</strong> serviço
              mensal da CADBRASIL para acompanhamento contínuo — consultada via
              API de boletos de manutenção.
            </>,
          ]}
        />
        <H>
          O cadastro no portal do governo é gratuito; os valores acima referem-se
          aos serviços de assessoria e gestão prestados pela CADBRASIL.
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
    id: "como-contratar",
    title: "Como contratar a CADBRASIL?",
    body: (
      <>
        <ShortAnswer>
          Fale com um consultor pelo WhatsApp (11) 2122-0202, envie a
          documentação solicitada, pague o boleto de credenciamento (R$ 985) e
          acompanhe pela Área do Fornecedor.
        </ShortAnswer>
        <List
          items={[
            "Entre em contato pelo WhatsApp ou Assistente CADBRASIL",
            "Consultor orienta sobre documentos necessários",
            "Envie a documentação pela Área do Fornecedor ou Assistente",
            "Realize o pagamento do credenciamento (R$ 985,00 via boleto)",
            "Equipe CADBRASIL inicia análise e credenciamento SICAF",
            "Acompanhe status pela Área do Fornecedor",
          ]}
        />
        <H>
          WhatsApp: <WaLink />
        </H>
        <Escalar>
          Negociação comercial, condições especiais ou dúvidas sobre elegibilidade.
        </Escalar>
      </>
    ),
  },
  {
    id: "documentos-necessarios",
    title: "Quais documentos são necessários?",
    body: (
      <>
        <ShortAnswer>
          Documentos societários, certidões negativas, comprovantes fiscais e
          trabalhistas, entre outros. A lista exata depende do porte e situação
          da empresa — o consultor informa no início.
        </ShortAnswer>
        <H>Documentos comumente solicitados:</H>
        <List
          items={[
            "Contrato social / estatuto e alterações",
            "Cartão CNPJ",
            "Certidão negativa de débitos federais (RFB/PGFN)",
            "Certidão negativa de débitos estaduais e municipais",
            "Certidão de regularidade do FGTS (CRF)",
            "Certidão negativa de débitos trabalhistas (CNDT)",
            "Comprovante de inscrição estadual/municipal (quando aplicável)",
            "Documentos dos representantes legais (RG, CPF, comprovante)",
            "Balanço patrimonial / demonstrações (conforme porte)",
          ]}
        />
        <Callout tone="info">
          A lista pode variar. Após contratação, o consultor envia checklist
          personalizado. Documentos vencidos devem ser renovados antes do envio.
        </Callout>
      </>
    ),
  },
  {
    id: "valor",
    title: "Qual o valor do serviço?",
    body: (
      <>
        <ShortAnswer>
          Credenciamento SICAF: R$ 985,00 (pagamento único). Manutenção mensal:
          R$ 155,00/mês (opcional, após credenciamento).
        </ShortAnswer>
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
        <ShortAnswer>
          Sim. A manutenção CADBRASIL custa R$ 155,00/mês e mantém SICAF e
          documentação atualizados.
        </ShortAnswer>
        <H>Sim.</H>
        <H>
          Após o credenciamento inicial, o cliente pode contratar a manutenção
          CADBRASIL para manter o SICAF e a documentação sempre atualizados.
        </H>
        <p className="my-3 text-xl font-semibold tracking-tight text-foreground">
          R$ 155,00 / mês
        </p>
        <H>
          Vídeo sobre manutenção: <VideoLink href={VIDEOS.manutencao} />
        </H>
      </>
    ),
  },
  {
    id: "formas-pagamento",
    title: "Formas de pagamento",
    body: (
      <>
        <ShortAnswer>
          Pagamento via boleto bancário. A IA pode enviar o link/PDF do boleto
          consultando o CNPJ do cliente nas APIs.
        </ShortAnswer>
        <List
          items={[
            "Boleto bancário — emitido via plataforma (link PDF ou código de barras)",
            "Compensação bancária: geralmente 1 a 3 dias úteis após pagamento",
            "Não solicitamos PIX direto por WhatsApp — desconfie de cobranças informais",
          ]}
        />
        <Callout tone="warn">
          A CADBRASIL não pede transferência PIX para números pessoais. Boletos
          oficiais vêm da plataforma ou são enviados pela IA via API com link
          verificável.
        </Callout>
      </>
    ),
  },
  {
    id: "cliente-novo",
    title: "Sou cliente novo, por onde começo?",
    body: (
      <>
        <ShortAnswer>
          1) Fale no WhatsApp (11) 2122-0202 → 2) Envie documentos → 3) Pague
          boleto R$ 985 → 4) Acesse fornecedor.cadbrasil.com.br → 5) Instale o
          Assistente CADBRASIL.
        </ShortAnswer>
        <List
          items={[
            "Contato com consultor: WhatsApp (11) 2122-0202",
            "Envio de documentação: Área do Fornecedor ou Assistente CADBRASIL",
            "Pagamento do credenciamento: boleto de R$ 985,00",
            "Acompanhamento: https://fornecedor.cadbrasil.com.br",
            "Instalar Assistente CADBRASIL para facilitar comunicação e envios",
          ]}
        />
        <H>
          Vídeo — instalar Assistente: <VideoLink href={VIDEOS.assistente} />
        </H>
        <H>
          Vídeo — enviar documentos:{" "}
          <VideoLink href={VIDEOS.enviarDocumentos} />
        </H>
      </>
    ),
  },
  {
    id: "prazo",
    title: "Quanto tempo leva o processo?",
    body: (
      <>
        <ShortAnswer>
          Com documentação completa: análise inicia em até 24h úteis.
          Credenciamento costuma levar de 5 a 15 dias úteis, conforme validações.
        </ShortAnswer>
        <H>O prazo depende da documentação enviada e das validações necessárias.</H>
        <List
          items={[
            "Documentação incompleta → processo aguarda pendências",
            "Documentação completa → análise inicia em até 24 horas úteis",
            "Credenciamento SICAF → em média 5 a 15 dias úteis após docs completos",
            "Renovação/atualização → prazo varia conforme certidões pendentes",
          ]}
        />
        <H>
          Após o pagamento do credenciamento, a equipe inicia assim que a
          documentação estiver completa.
        </H>
      </>
    ),
  },
  {
    id: "atualizar-certidoes",
    title: "Como atualizar minhas certidões?",
    body: (
      <>
        <ShortAnswer>
          Pelo Assistente CADBRASIL. Veja o vídeo passo a passo.
        </ShortAnswer>
        <H>
          A atualização das certidões é realizada através do Assistente
          CADBRASIL.
        </H>
        <H>
          Assista ao vídeo: <VideoLink href={VIDEOS.certidoes} />
        </H>
      </>
    ),
  },
  {
    id: "atualizar-sicaf",
    title: "Como atualizar o SICAF?",
    body: (
      <>
        <ShortAnswer>
          Use o Assistente CADBRASIL para manter cadastro e documentos em dia.
          Vídeo tutorial disponível.
        </ShortAnswer>
        <H>
          A atualização do SICAF é realizada através do Assistente CADBRASIL,
          mantendo cadastro e documentação em dia.
        </H>
        <H>
          Assista ao vídeo: <VideoLink href={VIDEOS.certidoes} />
        </H>
      </>
    ),
  },
  {
    id: "enviar-documentos",
    title: "Como enviar documentos?",
    body: (
      <>
        <ShortAnswer>
          Pela Área do Fornecedor ou Assistente CADBRASIL. Vídeo tutorial
          disponível.
        </ShortAnswer>
        <H>
          Os documentos devem ser enviados através da Área do Fornecedor ou pelo
          Assistente CADBRASIL.
        </H>
        <H>
          Assista ao vídeo:{" "}
          <VideoLink href={VIDEOS.enviarDocumentos} />
        </H>
      </>
    ),
  },
  {
    id: "instalar-assistente",
    title: "Como instalar o Assistente CADBRASIL?",
    body: (
      <>
        <ShortAnswer>
          Assistente CADBRASIL é um app para enviar docs e falar com a equipe.
          Veja o vídeo de instalação.
        </ShortAnswer>
        <H>
          O Assistente CADBRASIL é um aplicativo desenvolvido para facilitar a
          comunicação com nossa equipe e a atualização dos documentos.
        </H>
        <H>
          Vídeo de instalação: <VideoLink href={VIDEOS.assistente} />
        </H>
      </>
    ),
  },
  {
    id: "usar-assistente",
    title: "Como usar o Assistente CADBRASIL?",
    body: (
      <>
        <ShortAnswer>
          Pelo app você envia documentos, atualiza certidões e fala com a
          equipe. Vídeo tutorial disponível.
        </ShortAnswer>
        <H>
          O Assistente CADBRASIL permite enviar documentos, atualizar certidões
          e falar com nossa equipe de forma prática.
        </H>
        <H>
          Assista ao vídeo: <VideoLink href={VIDEOS.assistente} />
        </H>
      </>
    ),
  },
  {
    id: "ativar-manutencao",
    title: "Como ativar a manutenção?",
    body: (
      <>
        <ShortAnswer>
          Após o credenciamento, contrate a manutenção (R$ 155/mês) para manter
          SICAF e docs atualizados. Veja o vídeo.
        </ShortAnswer>
        <H>
          A manutenção CADBRASIL mantém seu SICAF e documentação sempre
          atualizados após o período inicial de credenciamento.
        </H>
        <H>
          Assista ao vídeo: <VideoLink href={VIDEOS.manutencao} />
        </H>
      </>
    ),
  },
  {
    id: "usar-manutencao",
    title: "Como usar a Manutenção?",
    body: (
      <>
        <ShortAnswer>
          Acompanhe boletos e serviços de manutenção pela plataforma ou
          Assistente. Vídeo tutorial disponível.
        </ShortAnswer>
        <H>
          Saiba como acompanhar e utilizar os serviços de manutenção CADBRASIL
          pela plataforma e pelo Assistente.
        </H>
        <H>
          Assista ao vídeo: <VideoLink href={VIDEOS.manutencao} />
        </H>
      </>
    ),
  },
  {
    id: "area-fornecedor",
    title: "Como acessar a Área do Fornecedor?",
    body: (
      <>
        <ShortAnswer>
          Acesse fornecedor.cadbrasil.com.br com e-mail e senha cadastrados.
        </ShortAnswer>
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
          Caso não lembre sua senha, utilize a opção &quot;Esqueci minha
          senha&quot;.
        </H>
      </>
    ),
  },
  {
    id: "acompanhar-processo",
    title: "Como acompanhar meu processo?",
    body: (
      <>
        <ShortAnswer>
          Tudo pela Área do Fornecedor: status SICAF, docs, certidões,
          pendências e solicitações.
        </ShortAnswer>
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
    id: "status-sicaf",
    title: "O que significa cada status do SICAF?",
    body: (
      <>
        <ShortAnswer>
          Ativo/Válido = ok. Vencido/Vencendo = renovar urgente. Pendente =
          falta documento ou pagamento.
        </ShortAnswer>
        <List
          items={[
            <>
              <strong>Ativo / Vencendo:</strong> cadastro regular quando{" "}
              <code>sicaf.valido: true</code> — apto a licitar (certidões em
              dia).
            </>,
            <>
              <strong>Vencido / Inativo / Sem SICAF:</strong> cadastro irregular
              — renovar com urgência.
            </>,
            <>
              <strong>Pendente:</strong> aguardando documentos, pagamento ou
              ação do cliente.
            </>,
            <>
              <strong>Completude:</strong> percentual 0–100 no objeto{" "}
              <code>sicaf.completude</code>.
            </>,
          ]}
        />
        <H>
          Status possíveis em <code>sicaf.status</code>: Ativo, Vencendo,
          Vencido, Pendente, Inativo, Sem SICAF. Consulte a API{" "}
          <a href="#api-consulta-cnpj" className="underline underline-offset-4">
            consulta-cnpj
          </a>{" "}
          — campos <code>sicafValido</code>, <code>sicaf.valido</code>,{" "}
          <code>sicaf.diasValidade</code>.
        </H>
      </>
    ),
  },
  {
    id: "sicaf-vencido",
    title: "Meu SICAF está vencido, o que faço?",
    body: (
      <>
        <ShortAnswer>
          Renove com urgência! Use o Assistente CADBRASIL ou fale com consultor
          (11) 2122-0202. Não participe de licitações com SICAF vencido.
        </ShortAnswer>
        <Callout tone="warn">
          SICAF vencido pode causar desclassificação e multas em licitações.
          Trate como prioridade.
        </Callout>
        <List
          items={[
            "Entre em contato com consultor: WhatsApp (11) 2122-0202",
            "Atualize certidões pelo Assistente CADBRASIL",
            "Verifique boletos pendentes (manutenção ou renovação)",
            "Acompanhe regularização pela Área do Fornecedor",
          ]}
        />
        <H>
          Vídeo — atualizar SICAF: <VideoLink href={VIDEOS.certidoes} />
        </H>
        <Escalar>
          Cliente com licitação iminente e SICAF vencido — prioridade alta.
        </Escalar>
      </>
    ),
  },
  {
    id: "apto-licitar",
    title: "Como saber se estou apto para licitar?",
    body: (
      <>
        <ShortAnswer>
          Consulte o CNPJ na API consulta-cnpj. Precisa: possuiCadastro=true,
          cadastroValido=true, sicafValido=true e certidões em dia.
        </ShortAnswer>
        <H>
          Documentação completa:{" "}
          <a href="#api-consulta-cnpj" className="underline underline-offset-4">
            API consulta-cnpj
          </a>
        </H>
        <Endpoint
          method="GET"
          url="https://fornecedor.cadbrasil.com.br/api/clients/consulta-cnpj?cnpj=CNPJ"
        />
        <H>Indicadores de aptidão (Cenário 1 — cliente cadastrado):</H>
        <List
          items={[
            <>
              <code>possuiCadastro: true</code> e{" "}
              <code>cadastroConcluido: true</code>
            </>,
            <>
              <code>cadastroValido: true</code> — SICAF válido ou renovação
              paga
            </>,
            <>
              <code>sicafValido: true</code> — licença SICAF ativa/vencendo
            </>,
            <>
              <code>sicaf.valido: true</code> — status Ativo ou Vencendo
            </>,
            <>
              <code>sicaf.diasValidade</code> — dias restantes de validade
            </>,
            <>
              <code>sicaf.completude</code> — quanto maior, mais completo o
              cadastro (0–100)
            </>,
          ]}
        />
        <Callout tone="warn">
          Mesmo com SICAF válido, certidões vencidas podem impedir habilitação
          em licitações específicas.
        </Callout>
      </>
    ),
  },
  {
    id: "licitar-irregular",
    title: "Posso licitar com SICAF irregular?",
    body: (
      <>
        <ShortAnswer>
          Não recomendado. Risco de desclassificação, multa e impedimento por
          anos. Regularize antes de participar.
        </ShortAnswer>
        <H>
          Participar de licitação com SICAF irregular ou certidões vencidas
          expõe a empresa a:
        </H>
        <List
          items={[
            "Desclassificação na fase de habilitação",
            "Multas administrativas",
            "Impedimento de participar de licitações por longo prazo",
            "Perda de contratos já disputados",
          ]}
        />
        <Callout tone="warn">
          O risco é severo e pode ser irreversível. Regularize o cadastro antes
          de participar de qualquer certame.
        </Callout>
      </>
    ),
  },
  {
    id: "boleto-sicaf-vs-manutencao",
    title: "Boleto SICAF vs Boleto de manutenção",
    body: (
      <>
        <ShortAnswer>
          Boleto SICAF = credenciamento (R$ 985, único). Boleto manutenção =
          mensalidade (R$ 155/mês). APIs diferentes.
        </ShortAnswer>
        <List
          items={[
            <>
              <strong>Boleto SICAF (R$ 985):</strong> taxa de credenciamento
              inicial. API:{" "}
              <code>/api/clients/boleto-sicaf/CNPJ</code>
            </>,
            <>
              <strong>Boleto manutenção (R$ 155/mês):</strong> mensalidade do
              serviço contínuo. API:{" "}
              <code>/api/clients/consulta-boletos?cnpj=CNPJ</code>
            </>,
          ]}
        />
        <H>
          Se o cliente pedir &quot;boleto&quot; sem especificar, pergunte se é
          credenciamento (SICAF) ou manutenção mensal.
        </H>
      </>
    ),
  },
  {
    id: "boleto-sicaf",
    title: "Como pegar o boleto do SICAF?",
    body: (
      <>
        <ShortAnswer>
          Me informe seu CNPJ (14 dígitos) que consulto e envio o boleto/PDF.
        </ShortAnswer>
        <H>
          Vídeo explicativo: <VideoLink href={VIDEOS.boletoSicaf} />
        </H>
        <H>
          Ou peça aqui mesmo que enviamos. Endpoint da API (substitua CNPJ pelos
          14 dígitos):
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
        <Escalar>
          CNPJ não encontrado após 2 tentativas ou cliente insiste que já é
          cadastrado.
        </Escalar>
      </>
    ),
  },
  {
    id: "ia-enviar-boleto",
    title: "Quando a IA pode enviar boleto pelo WhatsApp?",
    body: (
      <>
        <ShortAnswer>
          Quando o cliente informar CNPJ válido e a API retornar boleto com
          pendentePagamento=true. Envie linkPdf ou linkBoleto.
        </ShortAnswer>
        <List
          items={[
            "1. Pedir CNPJ (14 dígitos, sem pontuação)",
            "2. Validar formato do CNPJ",
            "3. Consultar API apropriada (SICAF ou manutenção)",
            "4. Se pendentePagamento=true → enviar linkPdf e/ou linkBoleto",
            "5. Se pendentePagamento=false → informar que não há boleto em aberto",
            "6. Se 404 / possuiCadastro=false → orientar contratação ou escalar",
          ]}
        />
        <Callout tone="info">
          Nunca invente links de boleto. Use apenas URLs retornadas pela API.
        </Callout>
      </>
    ),
  },
  {
    id: "segunda-via-boleto",
    title: "Como pegar a 2ª via do boleto?",
    body: (
      <>
        <ShortAnswer>
          Informe seu CNPJ — consultamos a API e reenviamos o boleto vigente ou
          geramos novo se necessário.
        </ShortAnswer>
        <H>
          A 2ª via é obtida pela mesma API de boleto. Se existir boleto vigente,
          o campo <code>boletoReutilizado: true</code> indica reutilização do
          boleto existente.
        </H>
        <H>
          Credenciamento:{" "}
          <code>/api/clients/boleto-sicaf/CNPJ</code>
        </H>
        <H>
          Manutenção: <code>/api/clients/consulta-boletos?cnpj=CNPJ</code>
        </H>
      </>
    ),
  },
  {
    id: "paguei-pendente",
    title: "Paguei e ainda aparece pendente",
    body: (
      <>
        <ShortAnswer>
          Boletos levam 1 a 3 dias úteis para compensar. Se passou desse prazo,
          informe CNPJ e data do pagamento — encaminhamos ao financeiro.
        </ShortAnswer>
        <H>
          A baixa bancária de boletos geralmente ocorre em 1 a 3 dias úteis após
          o pagamento.
        </H>
        <List
          items={[
            "Aguarde o prazo de compensação bancária",
            "Guarde comprovante de pagamento",
            "Se persistir após 3 dias úteis, informe CNPJ + data + valor pago",
          ]}
        />
        <Escalar>
          Pagamento feito há mais de 3 dias úteis e ainda consta pendente.
        </Escalar>
      </>
    ),
  },
  {
    id: "boleto-vencido",
    title: "Meu boleto venceu, o que faço?",
    body: (
      <>
        <ShortAnswer>
          Informe seu CNPJ — consultamos se há boleto vigente ou geramos um novo
          para você.
        </ShortAnswer>
        <H>
          Consulte a API com o CNPJ. Se o boleto anterior venceu, um novo pode
          ser gerado (<code>geradoAgora: true</code>).
        </H>
        <H>
          Vídeo boleto SICAF: <VideoLink href={VIDEOS.boletoSicaf} />
        </H>
        <H>
          Vídeo manutenção: <VideoLink href={VIDEOS.boletoManutencao} />
        </H>
        <Escalar>
          Cliente pagou boleto vencido e não teve baixa — verificar com
          financeiro.
        </Escalar>
      </>
    ),
  },
  {
    id: "boleto-manutencao",
    title: "Como pegar o boleto de manutenção?",
    body: (
      <>
        <ShortAnswer>
          Me informe seu CNPJ (14 dígitos) que consulto os boletos de
          manutenção pendentes.
        </ShortAnswer>
        <H>
          Vídeo explicativo: <VideoLink href={VIDEOS.boletoManutencao} />
        </H>
        <H>Caso queira por aqui, posso enviar. Endpoint da API:</H>
        <Endpoint
          method="GET"
          url="https://fornecedor.cadbrasil.com.br/api/clients/consulta-boletos?cnpj=CNPJ"
        />
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Exemplo de retorno
        </p>
        <Code>{`{
  "ok": true,
  "cnpj": "14435319000154",
  "possuiCadastro": true,
  "clienteId": 8654,
  "razaoSocial": "EMPRESA EXEMPLO LTDA",
  "sicaf": {
    "id": 8654,
    "status": "Ativo",
    "dataValidade": "2026-11-14T03:00:00.000Z",
    "diasParaVencer": 148,
    "statusValidade": "Válido",
    "recomendacaoSolicitarBoleto": false,
    "completude": 17
  },
  "totalPendentes": 2,
  "valorTotalPendente": 310,
  "boletos": {
    "sicafPendentes": [],
    "manutencaoPendentes": [
      {
        "boletoId": 1439,
        "mesReferencia": 5,
        "anoReferencia": 2026,
        "status": "Vencido",
        "statusBoleto": "Pendente",
        "valor": 155,
        "dataVencimento": "2026-05-20T03:00:00.000Z",
        "linkBoleto": null,
        "pdfBoleto": null
      },
      {
        "boletoId": 1440,
        "mesReferencia": 6,
        "anoReferencia": 2026,
        "status": "Vencendo",
        "valor": 155,
        "dataVencimento": "2026-06-20T03:00:00.000Z"
      }
    ]
  }
}`}</Code>
        <H>
          Envie ao cliente os boletos com status Vencido, Vencendo ou Pendente.
          Valor unitário: R$ 155,00/mês.
        </H>
        <Escalar>
          Muitos meses pendentes ou cliente contesta valores.
        </Escalar>
      </>
    ),
  },
  {
    id: "esqueci-senha",
    title: "Esqueci minha senha",
    body: (
      <>
        <ShortAnswer>
          Acesse fornecedor.cadbrasil.com.br → &quot;Esqueci minha senha&quot;
          → instruções por e-mail.
        </ShortAnswer>
        <H>
          Clique em &quot;Esqueci minha senha&quot; na tela de acesso da Área do
          Fornecedor. Você receberá as instruções por e-mail.
        </H>
        <Endpoint
          method="LINK"
          url="https://fornecedor.cadbrasil.com.br/esqueci-senha"
        />
        <Escalar>
          E-mail não cadastrado ou não recebe link de recuperação.
        </Escalar>
      </>
    ),
  },
  {
    id: "governo",
    title: "A CADBRASIL é do governo?",
    body: (
      <>
        <ShortAnswer>
          Não. CADBRASIL é empresa privada de assessoria. Não temos vínculo com
          órgãos governamentais.
        </ShortAnswer>
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
    id: "golpe-fraude",
    title: "É golpe? Vocês ligam pedindo PIX?",
    body: (
      <>
        <ShortAnswer>
          A CADBRASIL é empresa legítima. Não pedimos PIX para números
          pessoais. Pagamentos são via boleto oficial da plataforma.
        </ShortAnswer>
        <Callout tone="warn">
          Desconfie de: PIX para CPF/CNPJ desconhecido, links suspeitos,
          pressão para pagamento imediato fora da plataforma, ligações
          ameaçadoras.
        </Callout>
        <List
          items={[
            "Boletos oficiais vêm da plataforma CADBRASIL ou via consulta API",
            "WhatsApp oficial: (11) 2122-0202",
            "Site oficial: fornecedor.cadbrasil.com.br",
            "Documentação: docs.cadbrasil.com.br",
          ]}
        />
        <H>
          Em caso de dúvida, entre em contato diretamente: <WaLink />
        </H>
        <Escalar>
          Cliente relata cobrança suspeita ou golpe — prioridade alta.
        </Escalar>
      </>
    ),
  },
  {
    id: "cancelamento-reembolso",
    title: "Posso cancelar? Tem reembolso?",
    body: (
      <>
        <ShortAnswer>
          Cancelamentos e reembolsos dependem do contrato e estágio do serviço.
          Vou encaminhar você a um consultor.
        </ShortAnswer>
        <H>
          Políticas de cancelamento e reembolso variam conforme o serviço
          contratado e o estágio de execução (análise documental, envio ao
          SICAF, etc.).
        </H>
        <H>
          A IA não deve prometer reembolso — sempre encaminhar ao time comercial
          ou financeiro.
        </H>
        <Escalar>
          Sempre. Qualquer pedido de cancelamento ou reembolso vai para humano.
        </Escalar>
      </>
    ),
  },
  {
    id: "atendimento-brasil",
    title: "A CADBRASIL atende todo o Brasil?",
    body: (
      <>
        <ShortAnswer>
          Sim, atendemos todo o Brasil de forma digital.
        </ShortAnswer>
        <H>Sim. Atendemos empresas de todos os estados através de atendimento digital.</H>
      </>
    ),
  },
  {
    id: "mei",
    title: "Posso participar de licitações sendo MEI?",
    body: (
      <>
        <ShortAnswer>
          Sim, MEI pode participar de licitações compatíveis com seu porte e
          CNAE. Verifique sempre o edital.
        </ShortAnswer>
        <H>
          Sim. O MEI pode participar de diversas modalidades de licitação, desde
          que atenda às exigências do edital.
        </H>
        <List
          items={[
            "Verificar limites de faturamento e enquadramento MEI",
            "Conferir se o objeto da licitação é compatível com a atividade (CNAE)",
            "Alguns editais exigem porte mínimo — ler atentamente o edital",
            "MEI precisa de SICAF válido e certidões em dia como qualquer empresa",
          ]}
        />
      </>
    ),
  },
  {
    id: "restricoes",
    title: "Minha empresa possui restrições. Posso fazer o SICAF?",
    body: (
      <>
        <ShortAnswer>
          Depende da restrição. Informe seu CNPJ — consultamos na API e
          encaminhamos a um consultor se necessário.
        </ShortAnswer>
        <H>
          Nossa equipe realizará uma análise inicial para verificar a situação
          da empresa e orientar sobre as melhores alternativas.
        </H>
        <H>
          Consultar via API (documentação completa em{" "}
          <a href="#api-consulta-cnpj" className="underline underline-offset-4">
            API consulta-cnpj
          </a>
          ):
        </H>
        <Endpoint
          method="GET"
          url="https://fornecedor.cadbrasil.com.br/api/clients/consulta-cnpj?cnpj=CNPJ"
        />
        <H>Interpretação para a IA — Cenário 1 (cadastrado):</H>
        <List
          items={[
            <>
              <code>cadastroValido: false</code> → cadastro/SICAF irregular;
              orientar regularização
            </>,
            <>
              <code>sicafValido: false</code> ou <code>sicaf.status</code>{" "}
              Vencido/Pendente → renovação urgente
            </>,
            <>
              <code>sicaf.completude</code> baixo → pendências documentais
            </>,
            <>
              Restrições graves informadas pelo cliente → escalar consultor
            </>,
          ]}
        />
        <H>Interpretação — Cenários 2 e 3 (não cadastrado):</H>
        <List
          items={[
            <>
              Cenário 2: empresa existe na Receita — orientar cadastro em{" "}
              <code>urlCadastro</code> (https://cadastro.cadbrasil.com.br)
            </>,
            <>
              Cenário 3: CNPJ não encontrado — verificar dígitos; usar{" "}
              <code>orientacaoIA</code>
            </>,
          ]}
        />
        <Escalar>
          Qualquer restrição cadastral, sanção, impedimento ou situação
          cadastral Baixada na Receita Federal.
        </Escalar>
      </>
    ),
  },
  {
    id: "crc",
    title: "O que é o CRC?",
    body: (
      <>
        <ShortAnswer>
          CRC = Certificado de Registro Cadastral. Comprova situação cadastral
          no SICAF.
        </ShortAnswer>
        <H>CRC significa Certificado de Registro Cadastral.</H>
        <H>
          É o documento emitido pelo SICAF que comprova a situação cadastral da
          empresa.
        </H>
      </>
    ),
  },
  {
    id: "renovar",
    title: "Preciso renovar o SICAF?",
    body: (
      <>
        <ShortAnswer>
          Sim. SICAF depende de certidões válidas. Mantenha tudo atualizado para
          não perder licitações.
        </ShortAnswer>
        <H>Sim. O SICAF depende da validade de documentos e certidões.</H>
        <H>
          Por isso é importante manter o cadastro atualizado para evitar
          bloqueios e desclassificações.
        </H>
        <H>
          Vídeo — atualizar: <VideoLink href={VIDEOS.certidoes} />
        </H>
      </>
    ),
  },
  {
    id: "consultor",
    title: "Como falar com um consultor?",
    body: (
      <>
        <ShortAnswer>
          WhatsApp: (11) 2122-0202 ou pelo Assistente CADBRASIL. Seg–Sex 8h–18h.
        </ShortAnswer>
        <H>
          WhatsApp: <WaLink />
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
        <ShortAnswer>
          Segunda a sexta, 08h às 18h. Exceto feriados.
        </ShortAnswer>
        <H>Segunda à Sexta-feira</H>
        <H>08h00 às 18h00</H>
        <H>Exceto feriados.</H>
      </>
    ),
  },
  {
    id: "fora-horario",
    title: "Estou fora do horário comercial, e agora?",
    body: (
      <>
        <ShortAnswer>
          A IA pode tirar dúvidas simples agora. Consultores retornam no próximo
          dia útil (Seg–Sex 8h–18h).
        </ShortAnswer>
        <H>
          Fora do horário comercial, a IA pode responder dúvidas frequentes,
          consultar APIs de boleto/status e enviar links de vídeo.
        </H>
        <H>
          Para assuntos complexos, informe que um consultor retornará no próximo
          dia útil, das 08h às 18h.
        </H>
        <H>
          WhatsApp (mensagem ficará registrada): <WaLink />
        </H>
      </>
    ),
  },
  {
    id: "escalar-humano",
    title: "Quando transferir para atendente humano?",
    body: (
      <>
        <ShortAnswer>
          Reclamação, cancelamento, reembolso, golpe, erro técnico, cliente
          irritado ou CNPJ não encontrado após 2 tentativas.
        </ShortAnswer>
        <List
          items={[
            "Reclamação ou insatisfação com serviço",
            "Pedido de cancelamento ou reembolso",
            "Suspeita de golpe ou cobrança indevida",
            "CNPJ não encontrado após 2 tentativas de consulta",
            "Erro técnico repetido na API ou plataforma",
            "Cliente irritado ou solicitando falar com supervisor",
            "Restrição cadastral, sanção ou impedimento",
            "Situação jurídica ou contratual complexa",
            "Licitação iminente com SICAF vencido (urgência)",
          ]}
        />
        <H>
          Ao escalar: informar ao cliente que será transferido e horário de
          retorno se fora do expediente. WhatsApp: <WaLink />
        </H>
      </>
    ),
  },
  {
    id: "ainda-duvidas",
    title: "Ainda tenho dúvidas",
    body: (
      <>
        <ShortAnswer>
          Pergunte o que precisar! Se for algo específico, encaminho a um
          atendente humano.
        </ShortAnswer>
        <H>
          Se tiver dúvidas específicas, basta solicitar e você será encaminhado
          para um atendente humano.
        </H>
        <H>
          WhatsApp: <WaLink /> · Horário: Seg–Sex 08h–18h
        </H>
      </>
    ),
  },
];
