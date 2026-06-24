// comando para loguearse:


Cypress.Commands.add('loginAdmin', () => {
  const base = 'https://automationintesting.online/admin/'

  cy.visit(base)

  // esperar que el formulario esté visible
  cy.get('form').should('be.visible')

  cy.fixture('user_ok').then((user) => {
    cy.get('#username').should('be.visible').clear().type(user.Username)
    cy.get('#password').should('be.visible').clear().type(user.Password)
    cy.get('#doLogin').should('be.enabled').click()

    // validación de redirección
    cy.url({ timeout: 10000 }).should('include', '/admin/rooms')
  })
})

