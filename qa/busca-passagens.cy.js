
describe('Busca de passagens', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir o formulário de busca', () => {
    cy.contains('label', 'Origem').should('be.visible');
    cy.contains('label', 'Destino').should('be.visible');
    cy.contains('Somente ida').should('be.visible');
    cy.contains('Buscar passagens').should('be.visible');
  });

  it('deve permitir selecionar origem e destino diferentes', () => {
    cy.contains('label', 'Origem')
      .find('select')
      .select('GIG');

    cy.contains('label', 'Destino')
      .find('select')
      .select('GRU');

    cy.contains('label', 'Origem')
      .find('select')
      .should('have.value', 'GIG');

    cy.contains('label', 'Destino')
      .find('select')
      .should('have.value', 'GRU');
  });

  it('deve iniciar a busca de passagens', () => {
    cy.intercept('GET', '**/search/stream*').as('buscaPassagens');

    cy.contains('button', 'Buscar passagens').click();

    cy.wait('@buscaPassagens', { timeout: 15000 })
      .its('response.statusCode')
      .should('eq', 200);
  });
});
