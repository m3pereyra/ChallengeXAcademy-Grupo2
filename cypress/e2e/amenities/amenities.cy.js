/// <reference types="cypress" />

// Caso TC-030:Módulo Amenities (Ariel Diaz)
// Web bajo prueba: https://automationintesting.online/
//
// NOTA SOBRE EL BUG:
// TC-030 valida el comportamiento ESPERADO: al hacer click en "Amenities" se
// debe navegar y mostrar la sección con sus complementos de cortesía.
// BUG-003: la sección no existe, por lo que este test fallará de forma
// intencional y deja documentado el defecto en la corrida.

describe('Amenities', () => {
  beforeEach(() => {
    cy.openHome()
  })

  it('TC-030_Verificar la existencia y funcionamiento de la sección Amenities', () => {
    cy.fixture('appData').then((data) => {
      // Hacer click en "Amenities" del menú header
      cy.clickHeaderLink('Amenities')

      // La URL debería apuntar a la sección.
      cy.url().should('include', data.site.amenitiesHash)

      // La sección Amenities debería existir y verse.
      cy.get('#amenities').should('be.visible')
    })
  })
})
