Cypress.Commands.add('NavigateToLocationModule', ()=> {
    cy.visit('https://automationintesting.online/')
    cy.contains('a', 'Location').click()
})

Cypress.Commands.add('NavigateToContactInformacion', ()=> {
    cy.contains('h3','Contact Information').scrollIntoView().should('be.visible')
})

Cypress.Commands.add('VerifyTitleAndSubtitleLocationModuleIsVisible',() => {
    cy.get('.pigeon-tiles-box').should('be.visible')
    cy.get('.pigeon-click-block svg').should('exist').and('be.visible')   
    cy.contains('h3', 'Contact Information').should('be.visible')
})

Cypress.Commands.add('VerifyMapIsVisible',() => {
    cy.contains('h2', 'Our Location').should('be.visible')
    cy.contains('p', 'Find us in the beautiful Newingtonfordburyshire countryside').should('be.visible')
})

Cypress.Commands.add('VerifyAddressInformacion',() => {
    cy.get('i.bi-geo-alt').should('be.visible');
    cy.contains('h5', 'Address').should('be.visible')
    cy.get('.mb-0').should('be.visible').contains('Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA')
})

Cypress.Commands.add('VerifyPhoneInformacion',() => {
    cy.get('.bi-telephone').should('be.visible')
    cy.contains('h5', 'Phone').should('be.visible')
    cy.contains('p', '012345678901').should('be.visible')
})

Cypress.Commands.add('VerifyEmailInformacion',() => {
    cy.get('.bi-envelope').should('be.visible')
    cy.contains('h5', 'Email').should('be.visible')
    cy.get('.mb-0').should('be.visible').contains('fake@fakeemail.com')
})

Cypress.Commands.add('VerifyGettingHereInformacion',() => {
    cy.contains('h4', 'Getting Here').should('be.visible')
    cy.contains('p', 'Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.').should('be.visible')
})

Cypress.Commands.add('verifyPigeonLinkIsVisibleAndRedirects', () => {
    cy.get('.pigeon-attribution').should('be.visible')
    cy.contains('a', 'Pigeon')  .should('have.attr', 'href', 'https://pigeon-maps.js.org/')
})

Cypress.Commands.add('verifyOpenStreetMapLinkIsVisibleAndRedirects', () => {
    cy.get('.pigeon-attribution').should('be.visible')
    cy.contains('a', 'OpenStreetMap')
      .should('be.visible')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noreferrer noopener')
      .and('have.attr', 'href', 'https://www.openstreetmap.org/copyright')
  })
  


// Comando para loguearse como admin
Cypress.Commands.add('loginAdmin', () => {
  const base = 'https://automationintesting.online/admin/'

  cy.visit(base)

  // esperar que el formulario esté visible
  cy.get('form').should('be.visible')

  cy.fixture('user_ok').then((user) => {
    cy.get('#username').should('be.visible').clear().type(user.Username)
    cy.get('#password').should('be.visible').clear().type(user.Password)
    cy.get('#doLogin').should('be.enabled').click()

    // Validación de redirección
    cy.url({ timeout: 10000 }).should('include', '/admin/rooms')
  })
})


// Abre la Home usando el baseUrl definido en cypress.config.js
Cypress.Commands.add('openHome', () => {
  cy.visit('/')
})


// Verifica el layout base del sitio
// El sitio usa una barra de navegación <nav class="navbar"> y no <header>
Cypress.Commands.add('verifyBaseLayout', () => {
  cy.get('body').should('be.visible').and('not.be.empty')
  cy.get('nav').should('be.visible')

  // El pie de página existe aunque esté debajo del fold
  cy.get('footer, .footer, [class*="footer" i]')
    .first()
    .should('exist')
})


// Hace click en un link del menú de navegación según su texto
// Los links del menú son <a class="nav-link" href="#..."> dentro del <nav>
Cypress.Commands.add('clickHeaderLink', (label) => {
  cy.get('nav')
    .contains('a', label)
    .should('be.visible')
    .click()
})


// Localiza el input asociado a un texto/label cercano y lo deja seleccionable
Cypress.Commands.add('getInputNearText', (text) => {
  cy.contains(text)
    .should('be.visible')
    .parent()
    .find('input')
    .first()
    .should('be.visible')
})

