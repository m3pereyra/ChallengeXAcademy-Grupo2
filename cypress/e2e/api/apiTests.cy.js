/// <reference types="cypress" />

// Pruebas de API.

describe('API-Habitaciones', () => {
  // 1) Llamada directa a la API de habitaciones.
  it('GET /api/room responde 200 y devuelve habitaciones', () => {
    cy.request('GET', '/api/room').then((response) => {
      // La API responde correctamente.
      expect(response.status).to.eq(200)

      // El cuerpo trae una lista de habitaciones con al menos un elemento.
      expect(response.body.rooms).to.be.an('array')
      expect(response.body.rooms.length).to.be.greaterThan(0)
    })
  })

  // 2) Espiar la llamada que hace la Home al cargar (sin pegarle a la API).
  it('La Home consulta /api/room al cargar y responde 200', () => {
    cy.intercept('GET', '**/api/room*').as('getRooms')

    cy.visit('/')

    cy.wait('@getRooms').its('response.statusCode').should('eq', 200)
  })
})
