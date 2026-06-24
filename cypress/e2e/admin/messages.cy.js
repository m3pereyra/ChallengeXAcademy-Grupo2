describe('Messages - Listado', () => {
  beforeEach(() => {
    cy.loginAdmin()
    cy.contains('Messages').click()
  })

it.skip('Muestra listado de mensajes con name y subject', () => {
  // Validar que existe al menos un mensaje en el listado
  cy.get('.badge', { timeout: 10000 }).should('have.length.greaterThan', 0)

  cy.get('[data-testid="message0"] > p').should('be.visible').and('not.be.empty')
  cy.get('[data-testid="messageDescription0"]', { timeout: 10000 }).should('be.visible').and('not.be.empty')

  }),
    it.skip('Muestra detalle de un mensaje y luego cerrar', () => {
  cy.get('.badge').invoke('text').then((initialCount) => {
  const countBefore = parseInt(initialCount)
  // Abrir el primer mensaje
  cy.get('[data-testid="message0"]').click()
  // Validar detalle
    cy.get('[data-testid="message"]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-testid="message"]', { timeout: 10000 }).should('contain.text', 'From')
    cy.get('[data-testid="message"]', { timeout: 10000 }).should('contain.text', 'Phone')
    cy.get('[data-testid="message"]', { timeout: 10000 }).should('contain.text', 'Email')
    cy.get('[data-testid="message"]', { timeout: 10000 }).should('contain.text', 'Booking enquiry')
  // Cerrar mensaje
  cy.get('.col-12 > .btn').click()
  // Validar que el mensaje ya no está en negrita y que cambio la cantidad de mensajes sin leer
  cy.get('[data-testid="message0"] > p').should('not.have.css', 'font-weight', '700')
  cy.get('.badge').invoke('text').then((newCount) => {
    const countAfter = parseInt(newCount)
    expect(countAfter -1)
  })

})

  }),

  it('Elimina un mensaje de la lista', () => {
      
      cy.get('[data-testid="DeleteMessage0"]', { timeout: 10000 }).should('exist').click()
      
//no pude armar la validacion correcta para que valide que el mensaje fue eliminado.
 
  })
})