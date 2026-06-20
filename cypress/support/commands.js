Cypress.Commands.add('accederPaginaAdmin', () => {
  cy.visit('https://automationintesting.online/admin/')
})

Cypress.Commands.add('navigate', () => {
  cy.get(':nth-child(1) > .nav-link').click()

  cy.get('.row > :nth-child(1) > .card > .card-body > .card-title')
    .should('be.visible')
    .and('contain', 'Single')

  cy.get(':nth-child(1) > .card > .card-footer > .btn')
    .click()
})