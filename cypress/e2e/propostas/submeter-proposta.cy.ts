import { toCyString } from "../../helpers/kebab.helper";

const TEMPO_ESPERA = 500;
const LIMITE_TITULO = 128;

const NOME_EDITAL = "Edital 2026-0001 Sig Cypress";
const SELETOR_TITULO = '[data-cy="titulo"]';
const SELETOR_MENU_SALVAR = '[data-cy="menu-salvar"]';
const SELETOR_PROXIMO = '[data-cy="next-button"]';
const SELETOR_VER_EDITAIS = '[data-cy="editais-ver-mais"]';
const SELETOR_EDITAL = ":nth-child(6) > .css-1g8exof > .css-qvg66t";
const SELETOR_VER_PROJETOS = '[data-cy="projetos-ver-mais"]';
const SELETOR_PROJETO = ":nth-child(2) > .css-ylpd68";

function esperarProcessamento() {
  cy.wait(TEMPO_ESPERA);
}

function salvarEAvancar() {
  esperarProcessamento();
  cy.get(SELETOR_MENU_SALVAR).click();
  esperarProcessamento();
  cy.get(SELETOR_PROXIMO).click();
}

function iniciarCriacaoDeProposta() {
  cy.get(SELETOR_VER_EDITAIS).click();
  cy.get(SELETOR_EDITAL).click();
  cy.get('[class="css-1dimcyp e19ekcfn59"]')
    .contains(NOME_EDITAL)
    .should("be.visible");
  cy.get('[data-cy="criar-proposta"]').click();
  cy.get(SELETOR_TITULO).should("be.visible");
}

function acessarPropostaEmEdicao() {
  cy.get(SELETOR_VER_PROJETOS).click();
  cy.get(SELETOR_PROJETO).click();
}

function acessarSecoesDaProposta(...secoes: string[]) {
  acessarPropostaEmEdicao();

  secoes.forEach((secao) => {
    cy.get(`[data-cy="${secao}"]`).click();
  });
}

describe("[F-03] Submissão de proposta no sistema", () => {
  beforeEach(() => {
    cy.fixture("submeter-proposta")
      .as("dados")
      .then((dadosProposta) => {
        cy.typeLogin(dadosProposta.email, dadosProposta.senha);
      });
  });

  context(
    "[CT-SIG-PROPOSTA-001] Submissão de proposta com dados válidos",
    () => {
      it("Preencher as informações iniciais da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          iniciarCriacaoDeProposta();
          cy.get(SELETOR_TITULO).type(dadosProposta.tituloProposta);
          cy.get('[data-cy="tipo-evento-id"]').click();
          cy.get('[data-cy="workshop"]').click();
          cy.get('[data-cy="search-estado-execucao-evento"]').click();
          cy.get('[data-cy="mato-grosso-do-sul"]').click();
          cy.get('[data-cy="search-municipio-execucao-evento"]').click();
          cy.get('[data-cy="campo-grande"]').click();
          cy.get('[data-cy="duracao"]')
            .clear()
            .type(dadosProposta.duracaoProposta);
          cy.get('[data-cy="instituicao-executora-id"]').click();
          cy.get('[data-cy="funda-fundacao"]').click();
          cy.get('[data-cy="unidade-executora-id"]').click();
          cy.get('[data-cy="ms-ufms"]').click();
          cy.get('[data-cy="add-areas-de-conhecimento"]').click();
          cy.get('[data-cy="grande-area-id"]').click();
          cy.get('[data-cy="ciencias-agrarias"]').click();
          cy.get('[data-cy="area-id"').click();
          cy.get('[data-cy="agronomia"]').click();
          cy.get('[data-cy="sub-area-id"]').click();
          cy.get('[data-cy="floricultura-parques-e-jardins"]').click();
          cy.get('[data-cy="especialidade-id"]').click();
          cy.get('[data-cy="floricultura"]').click();
          cy.get('[data-cy="areaDeConhecimento-confirmar"]').click();
          salvarEAvancar();
        });
      });

      it("Preencher as informações complementares da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("informacoes-complementares");
          cy.get(
            '[data-cy="formularioPropostaInformacaoComplementar.pergunta-218-item-mei-faturamento-ano-de-ate-r-81"]',
          ).click();
          cy.get(
            '[data-cy="formularioPropostaInformacaoComplementar.pergunta-219"]',
          ).type(dadosProposta.descricaoProposta);
          salvarEAvancar();
        });
      });

      it("Preencher a abrangência da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("abrangencia");
          cy.get('[data-cy="add-button"]').click();
          cy.get('[data-cy="estado-id"]').click();
          cy.get('[data-cy="mato-grosso-do-sul"]').click();
          cy.get('[data-cy="abrangencia-municipio"]').click();
          cy.get('[data-cy="angelica"]').click().blur();
          cy.get('[data-cy="abrangencia-confirmar"]').click();
          cy.get('[data-cy="add-button"]').click();
          cy.get('[data-cy="estado-id"]').click();
          cy.get('[data-cy="mato-grosso-do-sul"]').click();
          cy.get('[data-cy="abrangencia-municipio"]').click();
          cy.get('[data-cy="campo-grande"]').click().blur();
          cy.get('[data-cy="abrangencia-confirmar"]').click();
          salvarEAvancar();
        });
      });

      it("Preencher os dados pessoais na proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("coordenacao", "dadosProposta-pessoais");
          salvarEAvancar();
        });
      });

      it("Preencher o endereço na proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("coordenacao", "endereco");
          salvarEAvancar();
        });
      });

      it("Preencher os dados acadêmicos na proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("coordenacao", "dadosProposta-academicos");
          salvarEAvancar();
        });
      });

      it("Preencher os dados profissionais na proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("coordenacao", "dadosProposta-profissionais");
          salvarEAvancar();
        });
      });

      it("Preencher a descrição de apresentação da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "descricao");
          cy.get(
            '[data-cy="formularioPropostaDescritiva.pergunta-221-item-opcao-1"]',
          ).click();
          cy.get('[data-cy="formularioPropostaDescritiva.pergunta-222"]').type(
            dadosProposta.valorTextoGenerico,
          );
          salvarEAvancar();
        });
      });

      it("Preencher os indicadores de produção da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "indicadores-de-producao");
          cy.get(":nth-child(1) > .css-1j6d2zt > :nth-child(1)").type(
            dadosProposta.outroValorQuantidade,
          );
          cy.get(":nth-child(3) > .css-1j6d2zt > :nth-child(2)").type(
            dadosProposta.outroValorQuantidade,
          );
          cy.get(":nth-child(9) > .css-1j6d2zt > :nth-child(1)").type(
            dadosProposta.outroValorQuantidade,
          );
          cy.get(":nth-child(9) > .css-1j6d2zt > :nth-child(2)").type(
            dadosProposta.outroValorQuantidade,
          );
          salvarEAvancar();
        });
      });

      it("Informar os membros participantes da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "membros");
          cy.get('[data-cy="nome-do-pesquisador"]').type(
            dadosProposta.nomePesquisador,
          );
          esperarProcessamento();
          cy.get('[id="autocomplete-1-listbox"]')
            .contains(dadosProposta.nomePesquisador)
            .click()
            .blur();
          cy.get('[type="button"]').contains("Adicionar").click();
          cy.get('[data-cy="nao-button"]').click();
          salvarEAvancar();
        });
      });

      it("Preencher as atividades da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "atividades");
          cy.get('[data-cy="add-button"]').click();
          cy.get('[data-cy="propostaAtividadeForm.titulo"]').type(
            dadosProposta.tituloAtividade,
          );
          cy.get('[data-cy="propostaAtividadeForm.descricao"]').type(
            dadosProposta.valorTextoGenerico,
          );
          cy.get('[data-cy="search-mes-inicio"]').click();
          cy.get('[data-cy="7"]').click();
          cy.get('[data-cy="search-duracao"]').click();
          cy.get('[data-cy="4-meses"]').click();
          cy.get('[data-cy="search-carga-horaria-semanal"]').click();
          cy.get('[data-cy="4-horas"]').click();
          cy.get('[data-cy="propostaAtividade-confirmar"]').click();
          salvarEAvancar();
        });
      });

      it("Visualizar as atividades da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta(
            "apresentacao",
            "visualizacao-das-atividades",
          );
          salvarEAvancar();
        });
      });

      it("Determinar a faixa de financiamento da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "orcamento");
          cy.get('[data-cy="faixa-de-financiamento"]').click();
          cy.get('[data-cy="search-faixa-financiamento-id"]').click();
          cy.get('[data-cy="faixa-b-r-10-000-01-r-25-000-00"]').click();
          salvarEAvancar();
        });
      });

      it("Visualizar serviços de terceiros da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "orcamento");
          cy.get('[data-cy="servicos-de-terceiros"]').click();
          salvarEAvancar();
        });
      });

      it("Preencher informações de bolsa da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "orcamento");
          cy.get('[data-cy="bolsa"]').click();
          cy.get('[data-cy="add-button"]').click();
          cy.get('[data-cy="search-modalidade-bolsa-id"]').click();
          cy.get('[data-cy="at"]').click();
          cy.get('[data-cy="search-nivel-bolsa-id"]').click();
          cy.get('[data-cy="ns-r-770-00"]').click();
          cy.get('[data-cy="rubricaBolsaForm.quantidade"]').type(
            dadosProposta.valorQuantidade,
          );
          cy.get('[data-cy="search-duracao"]').click();
          cy.get('[data-cy="5"]').click();
          cy.get('[data-cy="rubricaBolsa-confirmar"]').click();
          salvarEAvancar();
        });
      });

      it("Visualizar consolidação da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "orcamento");
          cy.get('[data-cy="consolidacao"]').click();
          salvarEAvancar();
        });
      });

      it("Visualizar o que foi solicitado à fundação sobre a proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("apresentacao", "orcamento");
          cy.get('[data-cy="solicitado-a-fundacao"]').click();
          salvarEAvancar();
        });
      });

      it("Anexar arquivos de documentos pessoais na proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("anexos", "documentos-pessoais");
          salvarEAvancar();
        });
      });

      it("Anexar arquivo de carta de apresentação da proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("anexos", "documentos-da-proposta");
          cy.get('[data-cy="select-categories-documento-prop"]').click();
          cy.get('[data-cy="carta-de-apresentacao"]').click();
          cy.get('[data-cy="documentoPropostaAnexo-upload"]').selectFile(
            dadosProposta.arquivoPDF,
            { force: true },
          );
          salvarEAvancar();
        });
      });

      it("Visualizar a proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("finalizacao", "visualizacao-da-proposta");
          salvarEAvancar();
        });
      });

      it("Aceitar termos, verificar pêndencias e submeter a proposta", () => {
        cy.fixture("submeter-proposta").then((dadosProposta) => {
          acessarSecoesDaProposta("finalizacao", "termo-de-aceite");
          cy.get('[data-cy="termo-de-aceite-aceito-box"]').click();
          cy.get('[data-cy="menu-verificar-pendencias"]').click();
          esperarProcessamento();
          cy.get(SELETOR_MENU_SALVAR).click();
          esperarProcessamento();
          cy.get('[class="css-1alpf6f ebva1ex2"]')
            .contains("Submeter proposta")
            .click();
          cy.get('[data-cy="sim-continuar-button"]').click();
          cy.get('[data-cy="confirmar-button"]').click();
          cy.get('[data-cy="user-menu"]').should("be.visible");
        });
      });
    },
  );

  context(
    "[CT-SIG-PROPOSTA-002] Submissão de proposta com dados inválidos",
    () => {
      beforeEach(() => {
        iniciarCriacaoDeProposta();
      });

      it("Verificar se o sistema impede o preenchimento de campos numéricos no campo de título", () => {
        cy.get(SELETOR_TITULO)
          .should("match", "input, textarea")
          .and("not.have.attr", "type", "number");
      });
    },
  );

  context(
    "[CT-SIG-PROPOSTA-003] Submissão de proposta com dados inválidos",
    () => {
      beforeEach(() => {
        iniciarCriacaoDeProposta();
      });

      it("Verificar se o sistema impede a inserção de mais de 128 caracteres no campo de título", () => {
        const tituloAcimaDoLimite = "A".repeat(LIMITE_TITULO + 1);

        cy.get(SELETOR_TITULO)
          .should("have.attr", "maxlength", LIMITE_TITULO.toString())
          .clear()
          .type(tituloAcimaDoLimite);
        cy.get(SELETOR_TITULO)
          .invoke("val")
          .should("have.length", LIMITE_TITULO);
      });
    },
  );

  context(
    "[CT-SIG-PROPOSTA-004] Submissão de proposta com dados inválidos",
    () => {
      beforeEach(() => {
        iniciarCriacaoDeProposta();
      });

      it("Verificar se o sistema impede o salvamento quando o campo de título está vazio", () => {
        cy.get(SELETOR_TITULO).should("have.value", "");

        cy.url().then((urlAntes) => {
          cy.get(SELETOR_MENU_SALVAR).click();
          esperarProcessamento();
          cy.get(SELETOR_TITULO).should("have.value", "");
          cy.url().should("eq", urlAntes);
        });
      });
    },
  );
});
