import {
  Callout,
  Escalar,
  H,
  List,
  Section,
  ShortAnswer,
  SubTitle,
  VideoLink,
  WaLink,
} from "@/lib/docs-ui";
import { VIDEOS, CENTRAL_AJUDA } from "@/content/videos";

function AjudaLink() {
  return (
    <a
      href={CENTRAL_AJUDA}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-foreground underline underline-offset-4 hover:opacity-70"
    >
      Central de Ajuda CADBRASIL
    </a>
  );
}

/** Tópicos sobre cadastro, atualização SICAF e uso do Assistente. */
export const sicafProcessSections: Section[] = [
  {
    id: "atualizar-sicaf",
    title: "Como atualizar o SICAF?",
    body: (
      <>
        <ShortAnswer>
          A CADBRASIL orienta todo o processo pelo Assistente CADBRASIL: instale
          o app, envie documentos, acesse o GOV.BR quando solicitado e siga as
          etapas. Atualize também a Situação do Fornecedor no Assistente.
        </ShortAnswer>
        <H>
          A atualização do SICAF é conduzida com apoio da CADBRASIL através do{" "}
          <strong>Assistente CADBRASIL</strong> — ferramenta que orienta cada
          etapa do credenciamento e da renovação cadastral.
        </H>
        <SubTitle>Resumo do fluxo de atualização</SubTitle>
        <List
          items={[
            "Instalar o Assistente CADBRASIL",
            "Informar os dados da empresa",
            "Enviar os documentos solicitados",
            "Realizar os acessos necessários ao GOV.BR (quando indicado)",
            "Seguir as orientações passo a passo do Assistente",
            "Atualizar a Situação do Fornecedor no Assistente",
            "Finalizar o cadastro ou a atualização do SICAF",
          ]}
        />
        <H>
          Vídeo — atualização de certidões/SICAF:{" "}
          <VideoLink href={VIDEOS.certidoes} />
        </H>
        <H>
          Tutoriais completos: <AjudaLink />
        </H>
        <Callout tone="info">
          <strong>IA:</strong> para dúvidas sobre atualização SICAF, explique o
          fluxo acima, indique o Assistente CADBRASIL e a Central de Ajuda. Não
          diga que o cliente deve fazer tudo sozinho no portal do governo — a
          CADBRASIL auxilia em todo o processo.
        </Callout>
      </>
    ),
  },
  {
    id: "cadbrasil-faz-cadastro",
    title: "A CADBRASIL faz o cadastro no SICAF para mim?",
    body: (
      <>
        <ShortAnswer>
          Sim. A CADBRASIL auxilia sua empresa em todo o credenciamento e
          atualização do SICAF, com orientação passo a passo pelo Assistente
          CADBRASIL.
        </ShortAnswer>
        <H>
          Sim. A CADBRASIL auxilia sua empresa durante todo o processo de
          credenciamento e atualização do SICAF.
        </H>
        <H>
          Para facilitar o atendimento, utilizamos o{" "}
          <strong>Assistente CADBRASIL</strong>, ferramenta desenvolvida para
          orientar cada etapa — desde a instalação até a conclusão do cadastro
          ou renovação.
        </H>
        <H>
          O cliente envia documentos, recebe orientações e a equipe CADBRASIL
          acompanha o andamento pela plataforma.
        </H>
      </>
    ),
  },
  {
    id: "processo-cadastro-sicaf",
    title: "Como funciona o processo de cadastro e atualização no SICAF?",
    body: (
      <>
        <ShortAnswer>
          6 passos: instalar Assistente → informar dados → enviar documentos →
          acessar GOV.BR (se necessário) → seguir orientações → finalizar SICAF.
        </ShortAnswer>
        <H>O processo é simples e acontece em poucos passos:</H>
        <List
          items={[
            <>
              <strong>1. Instalar o Assistente CADBRASIL</strong> — vídeo:{" "}
              <VideoLink href={VIDEOS.assistente} />
            </>,
            <strong>2. Informar os dados da empresa</strong>,
            <>
              <strong>3. Enviar os documentos solicitados</strong> — vídeo:{" "}
              <VideoLink href={VIDEOS.enviarDocumentos} />
            </>,
            <strong>4. Realizar os acessos necessários ao GOV.BR</strong>,
            <strong>5. Acompanhar as orientações do Assistente</strong>,
            <strong>6. Finalizar o cadastro ou atualização do SICAF</strong>,
          ]}
        />
        <H>
          Durante todo o processo você receberá orientações passo a passo. O
          sistema informa quais documentos são necessários em cada etapa.
        </H>
        <H>
          Forma mais rápida: instale o Assistente, envie toda a documentação
          solicitada, tenha acesso ao GOV.BR quando pedido e siga as orientações.
          Quanto mais rápido os documentos forem enviados, mais rápido o
          processo pode ser concluído.
        </H>
      </>
    ),
  },
  {
    id: "gov-br-sicaf",
    title: "Preciso acessar o GOV.BR para o SICAF?",
    body: (
      <>
        <ShortAnswer>
          Sim, em algumas etapas. Por segurança, procedimentos exigem acesso à
          conta GOV.BR da empresa ou do responsável legal. O Assistente avisa
          quando.
        </ShortAnswer>
        <H>Sim.</H>
        <H>
          Por questões de segurança e validação de identidade, alguns
          procedimentos exigem acesso à conta <strong>GOV.BR</strong> da empresa
          ou do responsável legal.
        </H>
        <H>
          O Assistente CADBRASIL orienta exatamente <strong>quando</strong> esse
          acesso será necessário — o cliente não precisa adivinhar o momento
          certo.
        </H>
        <Callout tone="info">
          <strong>IA:</strong> não assuste o cliente — explique que o GOV.BR é
          exigido pelo governo em etapas específicas e que o Assistente guia o
          processo.
        </Callout>
      </>
    ),
  },
  {
    id: "sicaf-sem-experiencia",
    title: "Preciso entender de licitações para fazer o SICAF?",
    body: (
      <>
        <ShortAnswer>
          Não. O Assistente CADBRASIL simplifica o processo — mesmo quem nunca
          licitou consegue concluir o cadastro seguindo as orientações.
        </ShortAnswer>
        <H>Não.</H>
        <H>
          O Assistente CADBRASIL foi criado justamente para simplificar o
          processo.
        </H>
        <H>
          Mesmo empresas que nunca participaram de licitações conseguem concluir
          o cadastro ou a atualização seguindo as orientações apresentadas passo
          a passo.
        </H>
      </>
    ),
  },
  {
    id: "documentos-pendentes",
    title: "Como sei se falta algum documento?",
    body: (
      <>
        <ShortAnswer>
          O Assistente CADBRASIL verifica pendências e informa exatamente o que
          falta enviar ou corrigir.
        </ShortAnswer>
        <H>
          O Assistente verifica as pendências e informa exatamente o que precisa
          ser enviado ou corrigido.
        </H>
        <H>
          Isso reduz erros e evita atrasos no processo de credenciamento ou
          atualização do SICAF.
        </H>
        <H>
          Também é possível acompanhar pendências pela{" "}
          <a
            href="https://fornecedor.cadbrasil.com.br"
            className="font-medium underline underline-offset-4 hover:opacity-70"
          >
            Área do Fornecedor
          </a>
          .
        </H>
        <H>
          Vídeo — envio de documentos:{" "}
          <VideoLink href={VIDEOS.enviarDocumentos} />
        </H>
      </>
    ),
  },
  {
    id: "assistente-papel",
    title: "O Assistente CADBRASIL faz tudo sozinho?",
    body: (
      <>
        <ShortAnswer>
          O Assistente é ferramenta de apoio e orientação — conduz o fluxo,
          indica documentos e ações no GOV.BR, mas o cliente participa enviando
          docs e seguindo as etapas.
        </ShortAnswer>
        <H>
          O Assistente é uma ferramenta de <strong>apoio e orientação</strong>.
        </H>
        <H>Ele conduz todo o fluxo e informa:</H>
        <List
          items={[
            "Quais documentos enviar em cada etapa",
            "Quais ações devem ser realizadas junto ao GOV.BR",
            "Pendências e correções necessárias",
            "Quando atualizar a Situação do Fornecedor",
          ]}
        />
        <H>
          Dessa forma, o processo se torna muito mais simples e seguro — sem
          exigir conhecimento técnico em licitações.
        </H>
        <H>
          Vídeo — como usar: <VideoLink href={VIDEOS.assistente} />
        </H>
      </>
    ),
  },
  {
    id: "central-ajuda",
    title: "Central de Ajuda e vídeos tutoriais",
    body: (
      <>
        <ShortAnswer>
          Acesse fornecedor.cadbrasil.com.br/ajuda — vídeos sobre Assistente,
          documentos, certidões, boletos, SICAF e Área do Fornecedor.
        </ShortAnswer>
        <H>
          Em caso de dúvidas durante o processo, consulte a{" "}
          <AjudaLink />:
        </H>
        <H>
          <a
            href={CENTRAL_AJUDA}
            className="font-medium underline underline-offset-4 hover:opacity-70"
          >
            {CENTRAL_AJUDA}
          </a>
        </H>
        <H>Vídeos disponíveis na Central de Ajuda:</H>
        <List
          items={[
            "Instalação do Assistente CADBRASIL",
            "Envio de documentos",
            "Atualização de certidões",
            "Emissão de boletos",
            "Acompanhamento do processo",
            "Atualização do SICAF",
            "Utilização da Área do Fornecedor",
          ]}
        />
        <H>
          <strong>IA:</strong> sempre que o cliente tiver dúvida prática
          (&quot;como faço&quot;), envie o link da Central de Ajuda e o vídeo
          específico quando existir neste documento.
        </H>
        <Escalar>
          Dúvida não resolvida após Central de Ajuda e orientação do Assistente.
        </Escalar>
      </>
    ),
  },
  {
    id: "situacao-fornecedor",
    title: "Como atualizar a Situação do Fornecedor no painel?",
    body: (
      <>
        <ShortAnswer>
          No Assistente CADBRASIL, menu &quot;Situação do Fornecedor&quot; —
          atualize sempre que houver mudança no SICAF, documentos ou status do
          processo.
        </ShortAnswer>
        <H>
          Para manter as informações atualizadas na Plataforma CADBRASIL, é
          necessário manter a opção <strong>Situação do Fornecedor</strong>{" "}
          atualizada no Assistente CADBRASIL.
        </H>
        <H>
          Sempre que houver alteração no SICAF, documentos, certidões ou status
          da empresa, acesse o Assistente e atualize a Situação do Fornecedor.
        </H>
        <SubTitle>Para que serve essa atualização?</SubTitle>
        <List
          items={[
            "Atualizar o painel da CADBRASIL",
            "Atualizar o andamento do processo",
            "Identificar pendências documentais",
            "Registrar novas solicitações",
            "Melhorar o acompanhamento da equipe de suporte",
            "Manter o histórico do fornecedor atualizado",
            "Sincronizar automaticamente dados do SICAF com a plataforma",
          ]}
        />
        <SubTitle>Onde encontrar no Assistente?</SubTitle>
        <H>
          Acesse o Assistente CADBRASIL, localize o menu{" "}
          <strong>Situação do Fornecedor</strong> e selecione a opção
          correspondente ao momento atual do processo.
        </H>
        <SubTitle>Por que é importante?</SubTitle>
        <H>
          Permite que a equipe CADBRASIL acompanhe corretamente o andamento. Se
          não for atualizada, informações no painel podem ficar desatualizadas,
          dificultando o acompanhamento do cadastro, atualização ou manutenção
          do SICAF.
        </H>
        <SubTitle>Quando atualizar?</SubTitle>
        <List
          items={[
            "Instalação do Assistente concluída",
            "Documentos enviados",
            "Documentos pendentes",
            "Aguardando acesso GOV.BR",
            "Processo em andamento",
            "Cadastro SICAF concluído",
            "Atualização SICAF concluída",
            "Necessidade de suporte",
            "Pendência documental identificada",
          ]}
        />
        <H>
          Dúvidas sobre qual situação selecionar: <AjudaLink /> ou contato via
          Assistente / WhatsApp <WaLink />.
        </H>
      </>
    ),
  },
];
