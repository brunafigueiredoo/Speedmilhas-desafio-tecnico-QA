
describe('API - Busca de passagens', () => {
  const apiUrl = 'http://localhost:3000';

  it('deve retornar resultados para uma busca válida', () => {
    const dataFutura = new Date();
    dataFutura.setDate(dataFutura.getDate() + 30);
    const data = dataFutura.toISOString().slice(0, 10);

    cy.request({
      method: 'POST',
      url: `${apiUrl}/search`,
      body: {
        origin: 'GRU',
        destination: 'GIG',
        date: data,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('searchId');
      expect(response.body).to.have.property('quotes');
      expect(response.body).to.have.property('suppliers');
      expect(response.body.query.origin).to.eq('GRU');
      expect(response.body.query.destination).to.eq('GIG');
    });
  });

  it('não deve aceitar origem e destino iguais', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/search`,
      body: {
        origin: 'GRU',
        destination: 'GRU',
        date: '2026-12-01',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('não deve aceitar uma data inexistente', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/search`,
      body: {
        origin: 'GRU',
        destination: 'GIG',
        date: '2026-02-30',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('não deve aceitar uma data no passado', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/search`,
      body: {
        origin: 'GRU',
        destination: 'GIG',
        date: '2020-01-01',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
