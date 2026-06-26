/// <reference types="cypress" />

// Web bajo prueba: https://automationintesting.online/


describe('Home', () => {
  beforeEach(() => {
    cy.openHome()
  })

  it('TC-001_Verificar carga de la página principal', () => {
    // La Home debe mostrar cabecera, contenido y pie sin recursos rotos.
    cy.verifyBaseLayout()
    cy.get('img').should('exist')
    cy.get('img').first().should('be.visible')
  })

  it('TC-002_Verificar visualización del nombre del establecimiento', () => {
    cy.fixture('appData').then((data) => {
      cy.contains(data.site.name).should('be.visible')
    })
  })

  it('TC-003_Verificar visualización de imagen principal', () => {
    // La imagen principal debe estar visible y tener un src cargado.
    cy.get('img')
      .first()
      .should('be.visible')
      .and('have.attr', 'src')
  })

  it('TC-004_Verificar texto de bienvenida', () => {
    cy.fixture('appData').then((data) => {
      cy.contains(data.site.name).should('be.visible')
    })
    // El bloque de bienvenida debe incluir el mensaje de presentación.
    cy.get('body').should('contain', 'Welcome')
  })

  it('TC-005_Verificar botón Book Now', () => {
    cy.fixture('appData').then((data) => {
      // Visible, con cursor de tipo "mano", y redirige a la sección Booking.
      cy.contains('a, button', 'Book Now')
        .should('be.visible')
        .and('have.css', 'cursor', 'pointer')
        .click()

      cy.url().should('include', data.site.bookingHash)
    })
  })

  it('TC-010_Verificar diseño responsive', () => {
    cy.fixture('appData').then((data) => {
      data.viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height)
        cy.openHome()

        // En cada resolución la base y los elementos clave siguen accesibles.
        cy.verifyBaseLayout()
        cy.contains(data.site.name).should('be.visible')
        cy.contains('Book Now').scrollIntoView().should('be.visible')
      })
    })
  })
})
