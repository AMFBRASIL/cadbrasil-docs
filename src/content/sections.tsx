import {
  Callout,
  Code,
  Endpoint,
  Escalar,
  H,
  List,
  Section,
  ShortAnswer,
  SubTitle,
  VideoLink,
  WaLink,
} from "@/lib/docs-ui";
import { consultaCnpjSection } from "@/content/consulta-cnpj-api";
import { sicafProcessSections } from "@/content/sicaf-processo-sections";
import {
  AssistenteLinksList,
  AssistenteWhatsAppBlock,
} from "@/content/assistente-ia";
import { VIDEOS, LINKS } from "@/content/videos";

export { VIDEOS };

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

        <SubTitle>Mensagem inicial da conversa (obrigatória)</SubTitle>
        <Callout tone="ok">
          <strong>Regra fixa:</strong> no primeiro contato com o cliente (início
          da conversa no WhatsApp), a IA deve enviar o texto abaixo{" "}
          <strong>exatamente como está</strong>, antes de qualquer outra
          orientação. Somente após o cliente informar o CNPJ ou CPF é que a IA
          consulta os dados e direciona o atendimento.
        </Callout>
        <Code>{`🇧🇷 **CADBRASIL Oficial ®**
💬 **Central de Atendimento Online**

Olá! Seja bem-vindo(a) ao atendimento oficial da **CADBRASIL Oficial**. 👋

Somos especialistas em soluções para fornecedores, auxiliando empresas em processos relacionados ao **SICAF**, **Compras Governamentais**, gestão cadastral e regularização de documentos. 📄✅

Para sua segurança e para localizarmos seu cadastro em nosso sistema, informe abaixo:

🏢 **CNPJ da empresa**
ou
👤 **CPF cadastrado**

🔎 Após a identificação, nosso assistente irá consultar seus dados e direcionar seu atendimento da melhor forma.

🔐 **CADBRASIL Oficial**
Tecnologia, segurança e suporte para fornecedores do Brasil. 🇧🇷`}</Code>
        <H>
          <strong>Após receber CNPJ:</strong> consulte a API consulta-cnpj (14
          dígitos, somente números) e siga o fluxo por{" "}
          <code>situacaoCadastro</code>. Se o cliente informar CPF, encaminhe
          para identificação ou escale a um consultor conforme o fluxo interno.
        </H>

        <H>
          <strong>Tom:</strong> cordial, objetivo, frases curtas (ideal para
          WhatsApp). Trate o cliente por &quot;você&quot;.
        </H>
        <H>
          <strong>Marca:</strong> nas mensagens ao cliente, use sempre{" "}
          <strong>CADBRASIL Oficial</strong> — nunca apenas &quot;CADBRASIL&quot;.
          Isso vale para textos WhatsApp, saudações, explicações e orientações.
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
        <H>
          <strong>Após consultar GET /api/clients/consulta-cnpj?cnpj=...</strong>{" "}
          use o campo <code>situacaoCadastro</code>:
        </H>
        <List
          items={[
            <>
              <code>cnpj_invalido</code> → pedir 14 dígitos (somente números)
            </>,
            <>
              <code>nao_encontrado</code> → verificar CNPJ; oferecer{" "}
              <code>urlCadastro</code> (cadastro.CADBRASIL Oficial.com.br)
            </>,
            <>
              <code>cadastro_pendente</code> → empresa na Receita, sem CADBRASIL Oficial;
              enviar <code>urlCadastro</code> + taxa R$ 985
            </>,
            <>
              <code>aguardando_pagamento</code> → cadastro OK, pagamento
              pendente; orientar{" "}
              <a href={LINKS.pagamentos} className="underline underline-offset-4">
                {LINKS.pagamentos}
              </a>{" "}
              + boleto (<code>pagamentosResumo</code> ou API boleto-sicaf)
            </>,
            <>
              <code>sicaf_vencido</code> → renovação urgente;{" "}
              <code>urlPortal</code> + vídeo atualizar SICAF
            </>,
            <>
              <code>cadastro_sem_sicaf</code> → iniciar processo SICAF no portal
              ou cadastro
            </>,
            <>
              <code>sicaf_incompleto</code> → pendências no portal (
              <code>sicaf.completude</code>, <code>sicaf.status</code>)
            </>,
            <>
              <code>ativo</code> → cumprimentar; informar níveis (
              <code>niveisSicaf</code>); <code>pagamentosEmDia</code>;{" "}
              <code>renovacaoProxima</code>/<code>renovacaoUrgente</code>;{" "}
              <code>urlAjuda</code> + <code>urlVideoAtualizacaoSicaf</code>
            </>,
            <>
              Sempre priorizar <code>orientacaoUsuario</code> quando existir.
              Nunca inventar status, valores ou links de boleto.
            </>,
            <>
              Com boleto disponível → enviar <code>pdfBoleto</code> ou{" "}
              <code>linkBoleto</code> retornado pela API.
            </>,
          ]}
        />
        <H>
          <strong>Boleto e pagamento:</strong> quando o cliente pedir boleto,
          2ª via, pagamento, taxa ou &quot;como pagar&quot;, oriente a acessar a
          página de pagamentos:{" "}
          <a
            href={LINKS.pagamentos}
            className="underline underline-offset-4"
          >
            {LINKS.pagamentos}
          </a>
          . Se ainda tiver dúvida após a orientação, peça para falar com um
          atendente (escalar para humano).
        </H>

        <SubTitle>Assistente CADBRASIL (obrigatório quando perguntarem)</SubTitle>
        <Callout tone="ok">
          <strong>Regra fixa:</strong> quando o cliente perguntar sobre o{" "}
          <strong>Assistente CADBRASIL</strong> — instalar, baixar, app,
          programa, aplicativo, como usar, acessar — a IA deve explicar o que é
          o Assistente e enviar <strong>sempre os 2 links</strong> abaixo (na
          mesma resposta ou em blocos seguidos):
          <AssistenteLinksList />
          Não enviar apenas um link. Se ainda tiver dúvida → pedir para falar
          com atendente.
        </Callout>
        <AssistenteWhatsAppBlock />

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
            "2ª via / boleto / taxa / 985 / pagar → Página de pagamentos + API boleto",
            "mensalidade / 155 / manutenção → Página de pagamentos + API consulta-boletos",
            "cadastro / habilitação / fornecedor / consultar CNPJ → API consulta-cnpj",
            "app / programa / aplicativo / instalar / baixar / assistente / como usar o app → Assistente CADBRASIL (2 links obrigatórios)",
            "senha / login / acesso → Área do Fornecedor",
            "certidão / CND / FGTS / negativa → Atualizar certidões",
            "edital / impugnação / impugnar → Leitura de edital com IA + Gerador de Impugnação",
            "licitação / oportunidade / painel → Painel nacional de licitações por CNAE",
            "concorrente / preço / valor do certame → Preços de licitações de concorrentes",
            "certidão vencendo / alerta / e-mail → Alertas de certidões por e-mail",
            "plataforma / o que vocês oferecem → O que é a CADBRASIL Oficial (plataforma completa)",
            "atualizar sicaf / renovar cadastro → Como atualizar o SICAF",
            "gov.br / conta gov → Preciso acessar o GOV.BR?",
            "situação fornecedor / painel desatualizado → Situação do Fornecedor",
            "falta documento / pendência → Como sei se falta algum documento?",
            "cadastro sicaf / fazem para mim → A CADBRASIL Oficial faz o cadastro?",
            "vídeo / tutorial / central de ajuda → Central de Ajuda",
          ]}
        />
      </>
    ),
  },
  consultaCnpjSection,
  {
    id: "o-que-e",
    title: "O que é a CADBRASIL Oficial?",
    body: (
      <>
        <ShortAnswer>
          A CADBRASIL Oficial é uma empresa privada e uma plataforma completa para
          licitações públicas: SICAF, gestão documental, inteligência de
          mercado, leitura de editais com IA e ferramentas que aumentam suas
          chances de ganhar contratos com o governo.
        </ShortAnswer>
        <H>
          A CADBRASIL Oficial é uma empresa especializada em licitações públicas,
          credenciamento no SICAF, manutenção cadastral e suporte para empresas
          que desejam vender para órgãos públicos em todo o Brasil.
        </H>
        <Callout tone="info">
          <strong>Importante para a IA:</strong> os serviços da CADBRASIL Oficial{" "}
          <strong>não se limitam ao SICAF</strong>. Ao apresentar a empresa,
          sempre mencionar a <strong>plataforma completa</strong> e os
          diferenciais abaixo — não reduzir a CADBRASIL Oficial apenas a
          &quot;credenciamento SICAF&quot;.
        </Callout>
        <SubTitle>Plataforma e serviços CADBRASIL Oficial</SubTitle>
        <List
          items={[
            <>
              <strong>SICAF e cadastro de fornecedor:</strong> credenciamento,
              renovação, manutenção cadastral e atualização automática do
              documento Situação do Fornecedor no SICAF.
            </>,
            <>
              <strong>Gestão de documentos e certidões:</strong> centralização,
              envio, conferência e acompanhamento de toda a documentação
              exigida para habilitação em licitações.
            </>,
            <>
              <strong>Alertas por e-mail de certidões:</strong> o sistema
              identifica certidões vencidas ou próximas do vencimento e envia
              e-mail informando <strong>quais certidões</strong> precisam ser
              atualizadas e em que prazo.
            </>,
            <>
              <strong>Leitura de edital com IA:</strong> análise inteligente de
              editais para extrair requisitos, prazos, exigências e pontos
              críticos com mais rapidez e precisão.
            </>,
            <>
              <strong>Painel nacional de licitações:</strong> visualização de
              oportunidades em nível nacional,{" "}
              <strong>filtradas e segmentadas pelo CNAE</strong> da empresa
              cadastrada — o cliente vê licitações relevantes ao seu ramo.
            </>,
            <>
              <strong>Gestão das melhores licitações:</strong> priorização e
              acompanhamento das oportunidades com maior aderência e potencial
              de retorno para o perfil da empresa.
            </>,
            <>
              <strong>Preços de licitações de concorrentes:</strong> inteligência
              de mercado com referência de valores praticados por concorrentes em
              certames semelhantes — apoio à estratégia de precificação.
            </>,
            <>
              <strong>Assistente CADBRASIL:</strong> aplicativo revolucionário
              para comunicação com a equipe, envio de documentos, atualização de
              certidões e suporte no dia a dia — grande diferencial de
              praticidade.
            </>,
            <>
              <strong>Gerador de impugnação:</strong> ferramenta para elaborar
              impugnações a editais com mais agilidade e fundamentação.
            </>,
          ]}
        />
        <H>
          Nosso objetivo é simplificar a burocracia, manter o cadastro sempre
          regular e permitir que sua empresa participe de licitações com mais
          segurança, informação e competitividade.
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
          Sim, o cadastro no SICAF é gratuito (Governo Federal). A CADBRASIL Oficial
          cobra pela assessoria, plataforma e acompanhamento — não pelo SICAF
          em si.
        </ShortAnswer>
        <H>Sim. O cadastro no SICAF é gratuito e disponibilizado pelo Governo Federal.</H>
        <H>A CADBRASIL Oficial não cobra pelo SICAF em si.</H>
        <H>
          O valor cobrado pela CADBRASIL Oficial refere-se à assessoria especializada,
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
              <strong>Manutenção CADBRASIL Oficial (R$ 155,00/mês):</strong> serviço
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
    id: "taxa-sicaf-vs-CADBRASIL Oficial",
    title: "Taxa SICAF vs Taxa CADBRASIL Oficial",
    body: (
      <>
        <ShortAnswer>
          Taxa SICAF = taxa governamental do credenciamento (R$ 985). Taxa
          CADBRASIL Oficial = assessoria + plataforma. São coisas diferentes.
        </ShortAnswer>
        <List
          items={[
            <>
              <strong>Taxa SICAF (R$ 985,00):</strong> referente ao
              credenciamento inicial. Pode ser consultada/emitida via API de
              boleto SICAF.
            </>,
            <>
              <strong>Manutenção CADBRASIL Oficial (R$ 155,00/mês):</strong> serviço
              mensal da CADBRASIL Oficial para acompanhamento contínuo — consultada via
              API de boletos de manutenção.
            </>,
          ]}
        />
        <H>
          O cadastro no portal do governo é gratuito; os valores acima referem-se
          aos serviços de assessoria e gestão prestados pela CADBRASIL Oficial.
        </H>
      </>
    ),
  },
  {
    id: "por-que-contratar",
    title: "Por que contratar a CADBRASIL Oficial?",
    body: (
      <>
        <ShortAnswer>
          Porque a CADBRASIL Oficial vai além do SICAF: oferece plataforma com IA,
          gestão documental, alertas de certidões, painel de licitações por
          CNAE, inteligência de preços e Assistente exclusivo — tudo para você
          licitar com segurança e vantagem competitiva.
        </ShortAnswer>
        <H>
          Contratar a CADBRASIL Oficial significa ter uma{" "}
          <strong>operação completa de licitações</strong>, não apenas um
          cadastro no SICAF. A plataforma integra habilitação, monitoramento,
          inteligência de mercado e ferramentas que economizam tempo e reduzem
          riscos.
        </H>
        <SubTitle>Riscos de operar sem apoio especializado</SubTitle>
        <H>Erros no SICAF ou na documentação podem gerar:</H>
        <List
          items={[
            "Desclassificação em licitações",
            "Perda de contratos",
            "Problemas de habilitação",
            "Perda de prazos importantes",
            "Risco de sanções e multas administrativas",
          ]}
        />
        <SubTitle>O que a plataforma CADBRASIL Oficial entrega na prática</SubTitle>
        <List
          items={[
            <>
              <strong>Conformidade cadastral:</strong> SICAF ativo, renovação e
              atualização automática do documento Situação do Fornecedor.
            </>,
            <>
              <strong>Documentação sob controle:</strong> gestão centralizada de
              documentos e certidões, com alertas por e-mail indicando{" "}
              <strong>quais certidões vencem</strong> e quando agir.
            </>,
            <>
              <strong>Mais oportunidades certas:</strong> painel nacional de
              licitações segmentado pelo CNAE da empresa — foco no que importa
              para o seu negócio.
            </>,
            <>
              <strong>Decisão mais inteligente:</strong> leitura de edital com
              IA, gestão das melhores licitações e referência de preços de
              concorrentes para definir estratégia.
            </>,
            <>
              <strong>Ferramentas exclusivas:</strong> Assistente CADBRASIL
              (comunicação e envio de docs), Gerador de Impugnação e suporte
              especializado da equipe.
            </>,
          ]}
        />
        <SubTitle>Diferenciais que a IA deve destacar ao cliente</SubTitle>
        <List
          items={[
            "Não é só SICAF — é plataforma completa para licitar e vencer",
            "E-mail automático quando certidões estão vencendo (com detalhe de quais)",
            "Licitações nacionais filtradas pelo CNAE cadastrado",
            "Leitura de edital com inteligência artificial",
            "Visão de preços praticados por concorrentes",
            "Assistente CADBRASIL — ferramenta revolucionária no dia a dia",
            "Gerador de Impugnação integrado à plataforma",
            "Atualização automática do SICAF com Situação do Fornecedor",
          ]}
        />
        <Callout tone="warn">
          Participar de licitação com SICAF irregular ou certidões vencidas pode
          gerar desclassificação, multas severas e impedimento de participar de
          certames por anos. A plataforma CADBRASIL Oficial existe para evitar esses
          riscos e, ao mesmo tempo, ampliar suas chances de sucesso nas
          licitações.
        </Callout>
      </>
    ),
  },
  {
    id: "como-contratar",
    title: "Como contratar a CADBRASIL Oficial?",
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
            "Equipe CADBRASIL Oficial inicia análise e credenciamento SICAF",
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
            "Plataforma CADBRASIL Oficial",
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
          Sim. A manutenção CADBRASIL Oficial custa R$ 155,00/mês e mantém SICAF e
          documentação atualizados.
        </ShortAnswer>
        <H>Sim.</H>
        <H>
          Após o credenciamento inicial, o cliente pode contratar a manutenção
          CADBRASIL Oficial para manter o SICAF e a documentação sempre atualizados.
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
          Pagamento via boleto bancário. O cliente pode acessar{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>{" "}
          para emitir ou pagar boletos. A IA também pode consultar o CNPJ nas
          APIs e enviar link/PDF do boleto.
        </ShortAnswer>
        <List
          items={[
            <>
              Página de pagamentos:{" "}
              <a href={LINKS.pagamentos} className="underline underline-offset-4">
                {LINKS.pagamentos}
              </a>{" "}
              — boleto SICAF, manutenção e demais taxas
            </>,
            "Boleto bancário — emitido via plataforma (link PDF ou código de barras)",
            "Compensação bancária: geralmente 1 a 3 dias úteis após pagamento",
            "Não solicitamos PIX direto por WhatsApp — desconfie de cobranças informais",
          ]}
        />
        <Callout tone="warn">
          A CADBRASIL Oficial não pede transferência PIX para números pessoais. Boletos
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
          boleto R$ 985 → 4) Acesse fornecedor.CADBRASIL Oficial.com.br → 5) Instale o
          Assistente CADBRASIL.
        </ShortAnswer>
        <List
          items={[
            "Contato com consultor: WhatsApp (11) 2122-0202",
            "Envio de documentação: Área do Fornecedor ou Assistente CADBRASIL",
            "Pagamento do credenciamento: boleto de R$ 985,00",
            "Acompanhamento: https://fornecedor.CADBRASIL Oficial.com.br",
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
          CADBRASIL Oficial.
        </H>
        <H>
          Assista ao vídeo: <VideoLink href={VIDEOS.certidoes} />
        </H>
        <H>
          Para o fluxo completo de atualização do SICAF, veja também:{" "}
          <a href="#atualizar-sicaf" className="underline underline-offset-4">
            Como atualizar o SICAF?
          </a>
        </H>
      </>
    ),
  },
  ...sicafProcessSections,
  {
    id: "enviar-documentos",
    title: "Como enviar documentos?",
    body: (
      <>
        <ShortAnswer>
          Pelo Assistente CADBRASIL ou pela Área do Fornecedor. O sistema informa
          quais documentos são necessários em cada etapa.
        </ShortAnswer>
        <H>
          Todos os documentos são enviados diretamente pelo{" "}
          <strong>Assistente CADBRASIL</strong> ou pela{" "}
          <a
            href="https://fornecedor.CADBRASIL Oficial.com.br"
            className="font-medium underline underline-offset-4 hover:opacity-70"
          >
            Área do Fornecedor
          </a>
          .
        </H>
        <H>
          O sistema informará quais documentos são necessários para cada etapa do
          credenciamento ou atualização do SICAF.
        </H>
        <H>
          O Assistente também verifica pendências — veja{" "}
          <a href="#documentos-pendentes" className="underline underline-offset-4">
            Como sei se falta algum documento?
          </a>
        </H>
        <H>
          Vídeo: <VideoLink href={VIDEOS.enviarDocumentos} />
        </H>
        <H>
          Tutoriais:{" "}
          <a
            href="https://fornecedor.CADBRASIL Oficial.com.br/ajuda"
            className="font-medium underline underline-offset-4 hover:opacity-70"
          >
            Central de Ajuda
          </a>
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
          Acesse o Assistente em {LINKS.assistente} ou veja os vídeos na Central
          de Ajuda ({LINKS.ajuda}). É o passo 1 do processo SICAF.
        </ShortAnswer>
        <H>
          O Assistente CADBRASIL é o aplicativo que conduz todo o processo de
          credenciamento e atualização do SICAF — instalação, envio de
          documentos, orientações GOV.BR e Situação do Fornecedor.
        </H>
        <SubTitle>Links oficiais (IA — enviar sempre os 2)</SubTitle>
        <AssistenteLinksList />
        <AssistenteWhatsAppBlock note="Mensagem-modelo quando o cliente perguntar sobre instalação ou Assistente." />
        <H>
          É o <strong>passo 1</strong> do processo — veja{" "}
          <a href="#processo-cadastro-sicaf" className="underline underline-offset-4">
            Como funciona o processo de cadastro e atualização no SICAF?
          </a>
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
          Acesse {LINKS.assistente} e siga as orientações passo a passo. Dúvidas
          práticas: vídeos em {LINKS.ajuda}.
        </ShortAnswer>
        <H>
          O Assistente CADBRASIL permite enviar documentos, atualizar certidões,
          acompanhar pendências, atualizar a Situação do Fornecedor e receber
          orientações sobre o GOV.BR.
        </H>
        <SubTitle>Links oficiais (IA — enviar sempre os 2)</SubTitle>
        <AssistenteLinksList />
        <AssistenteWhatsAppBlock note="Mensagem-modelo quando o cliente perguntar como usar o Assistente." />
        <H>
          Detalhes:{" "}
          <a href="#assistente-papel" className="underline underline-offset-4">
            O Assistente faz tudo sozinho?
          </a>{" "}
          ·{" "}
          <a href="#situacao-fornecedor" className="underline underline-offset-4">
            Situação do Fornecedor
          </a>
        </H>
        <H>
          Vídeo: <VideoLink href={VIDEOS.assistente} />
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
          A manutenção CADBRASIL Oficial mantém seu SICAF e documentação sempre
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
          Saiba como acompanhar e utilizar os serviços de manutenção CADBRASIL Oficial
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
          Acesse fornecedor.CADBRASIL Oficial.com.br com e-mail e senha cadastrados.
        </ShortAnswer>
        <H>
          Acesse:{" "}
          <a
            href="https://fornecedor.CADBRASIL Oficial.com.br"
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-70"
          >
            https://fornecedor.CADBRASIL Oficial.com.br
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
          Pela Área do Fornecedor e pelo Assistente CADBRASIL: docs enviados,
          pendências, solicitações, atualizações e status do SICAF.
        </ShortAnswer>
        <H>Através da Área do Fornecedor você acompanha:</H>
        <List
          items={[
            "Documentos enviados",
            "Pendências",
            "Solicitações",
            "Atualizações realizadas",
            "Status do SICAF",
            "Certidões",
          ]}
        />
        <H>
          Mantenha a <strong>Situação do Fornecedor</strong> atualizada no
          Assistente para o painel refletir o andamento correto — veja{" "}
          <a href="#situacao-fornecedor" className="underline underline-offset-4">
            Como atualizar a Situação do Fornecedor?
          </a>
        </H>
        <H>
          Dúvidas:{" "}
          <a
            href="https://fornecedor.CADBRASIL Oficial.com.br/ajuda"
            className="font-medium underline underline-offset-4 hover:opacity-70"
          >
            Central de Ajuda
          </a>
        </H>
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
          Vencido, Pendente, Inativo, Sem SICAF. Na API consulta-cnpj, use{" "}
          <code>situacaoCadastro</code> para o cenário geral:{" "}
          <code>ativo</code>, <code>sicaf_vencido</code>,{" "}
          <code>aguardando_pagamento</code>, <code>sicaf_incompleto</code>,{" "}
          <code>cadastro_sem_sicaf</code>. Detalhes em{" "}
          <a href="#api-consulta-cnpj" className="underline underline-offset-4">
            API consulta-cnpj
          </a>
          .
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
          Consulte o CNPJ na API consulta-cnpj. Precisa{" "}
          <code>situacaoCadastro: ativo</code>, com{" "}
          <code>sicafValido: true</code>, <code>pagamentosEmDia: true</code> e
          níveis SICAF regulares (sem certidões vencidas).
        </ShortAnswer>
        <H>
          Documentação completa:{" "}
          <a href="#api-consulta-cnpj" className="underline underline-offset-4">
            API consulta-cnpj
          </a>
        </H>
        <Endpoint
          method="GET"
          url="https://fornecedor.CADBRASIL Oficial.com.br/api/clients/consulta-cnpj?cnpj=CNPJ"
        />
        <H>Indicadores de aptidão (situacaoCadastro: ativo):</H>
        <List
          items={[
            <>
              <code>situacaoCadastro: &quot;ativo&quot;</code> e{" "}
              <code>sicafValido: true</code>
            </>,
            <>
              <code>pagamentosEmDia: true</code> — sem boletos pendentes
            </>,
            <>
              <code>niveisSicaf[]</code> — todos com ícone ✅ ou status
              Habilitado/Válido
            </>,
            <>
              <code>certidaoVencendoOuVencida: false</code> — sem certidões
              vencidas
            </>,
            <>
              <code>sicaf.diasValidade</code> / <code>diasParaRenovacao</code> —
              dias restantes de validade
            </>,
            <>
              Se <code>renovacaoUrgente</code> ou{" "}
              <code>certidaoVencendoOuVencida: true</code> → alertar antes de
              licitar
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
          mensalidade (R$ 155/mês). Ambos disponíveis em{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>
          .
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
          Acesse{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>{" "}
          ou informe seu CNPJ (14 dígitos) que consulto e envio o boleto/PDF.
        </ShortAnswer>
        <H>
          Página de pagamentos:{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>
        </H>
        <H>
          Vídeo explicativo: <VideoLink href={VIDEOS.boletoSicaf} />
        </H>
        <H>
          Ou peça aqui mesmo que enviamos. Endpoint da API (substitua CNPJ pelos
          14 dígitos):
        </H>
        <Endpoint
          method="GET"
          url="https://fornecedor.CADBRASIL Oficial.com.br/api/clients/boleto-sicaf/CNPJ"
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
          CNPJ não encontrado após 2 tentativas, cliente insiste que já é
          cadastrado, ou ainda tem dúvida sobre boleto/pagamento após orientar a
          página de pagamentos.
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
            <>
              3. Orientar{" "}
              <a href={LINKS.pagamentos} className="underline underline-offset-4">
                {LINKS.pagamentos}
              </a>{" "}
              para boleto e pagamento
            </>,
            "4. Consultar API apropriada (SICAF ou manutenção) se cliente preferir pelo WhatsApp",
            "5. Se pendentePagamento=true → enviar linkPdf e/ou linkBoleto",
            "6. Se pendentePagamento=false → informar que não há boleto em aberto",
            "7. Se 404 / possuiCadastro=false → orientar contratação ou escalar",
            "8. Se ainda tiver dúvida → pedir para falar com atendente",
          ]}
        />
        <Callout tone="info">
          Nunca invente links de boleto. Use apenas URLs retornadas pela API ou
          oriente{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>
          . Se o cliente ainda tiver dúvida, peça para falar com um atendente.
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
          Acesse{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>{" "}
          ou informe seu CNPJ — consultamos a API e reenviamos o boleto vigente
          ou geramos novo se necessário.
        </ShortAnswer>
        <H>
          Página de pagamentos:{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>
        </H>
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
        <Escalar>
          Cliente ainda com dúvida sobre boleto ou pagamento após orientar a
          página de pagamentos — pedir para falar com um atendente.
        </Escalar>
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
          Acesse{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>{" "}
          ou informe seu CNPJ (14 dígitos) que consulto os boletos de
          manutenção pendentes.
        </ShortAnswer>
        <H>
          Página de pagamentos:{" "}
          <a href={LINKS.pagamentos} className="underline underline-offset-4">
            {LINKS.pagamentos}
          </a>
        </H>
        <H>
          Vídeo explicativo: <VideoLink href={VIDEOS.boletoManutencao} />
        </H>
        <H>Caso queira por aqui, posso enviar. Endpoint da API:</H>
        <Endpoint
          method="GET"
          url="https://fornecedor.CADBRASIL Oficial.com.br/api/clients/consulta-boletos?cnpj=CNPJ"
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
          Acesse fornecedor.CADBRASIL Oficial.com.br → &quot;Esqueci minha senha&quot;
          → instruções por e-mail.
        </ShortAnswer>
        <H>
          Clique em &quot;Esqueci minha senha&quot; na tela de acesso da Área do
          Fornecedor. Você receberá as instruções por e-mail.
        </H>
        <Endpoint
          method="LINK"
          url="https://fornecedor.CADBRASIL Oficial.com.br/esqueci-senha"
        />
        <Escalar>
          E-mail não cadastrado ou não recebe link de recuperação.
        </Escalar>
      </>
    ),
  },
  {
    id: "governo",
    title: "A CADBRASIL Oficial é do governo?",
    body: (
      <>
        <ShortAnswer>
          Não. CADBRASIL Oficial é empresa privada de assessoria. Não temos vínculo com
          órgãos governamentais.
        </ShortAnswer>
        <H>Não.</H>
        <H>
          A CADBRASIL Oficial é uma empresa privada especializada em assessoria para
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
          A CADBRASIL Oficial é empresa legítima. Não pedimos PIX para números
          pessoais. Pagamentos são via boleto oficial da plataforma.
        </ShortAnswer>
        <Callout tone="warn">
          Desconfie de: PIX para CPF/CNPJ desconhecido, links suspeitos,
          pressão para pagamento imediato fora da plataforma, ligações
          ameaçadoras.
        </Callout>
        <List
          items={[
            "Boletos oficiais vêm da plataforma CADBRASIL Oficial ou via consulta API",
            "WhatsApp oficial: (11) 2122-0202",
            "Site oficial: fornecedor.CADBRASIL Oficial.com.br",
            "Documentação: docs.CADBRASIL Oficial.com.br",
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
    title: "A CADBRASIL Oficial atende todo o Brasil?",
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
          url="https://fornecedor.CADBRASIL Oficial.com.br/api/clients/consulta-cnpj?cnpj=CNPJ"
        />
        <H>Interpretação para a IA — por situacaoCadastro:</H>
        <List
          items={[
            <>
              <code>ativo</code> com <code>certidaoVencendoOuVencida: true</code>{" "}
              → regularizar certidões antes de licitar
            </>,
            <>
              <code>sicaf_vencido</code> → renovação urgente; escalar se
              licitação iminente
            </>,
            <>
              <code>aguardando_pagamento</code> ou{" "}
              <code>sicaf_incompleto</code> → não apto; orientar regularização
            </>,
            <>
              <code>cadastro_pendente</code> ou <code>cadastro_sem_sicaf</code>{" "}
              → processo não iniciado/concluído
            </>,
            <>
              <code>situacaoReceitaFederal</code> Baixada/Inapta → escalar
              consultor
            </>,
            <>
              Restrições graves informadas pelo cliente → escalar consultor
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
