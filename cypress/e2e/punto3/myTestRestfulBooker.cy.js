/// <reference types="cypress" />

// myTestRestfulBooker.cy.js
// Flujos requeridos por la consigna (punto 3) del Challenge
// Web bajo prueba: https://automationintesting.online/


describe('Restful Booker - Flujos principales', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // ------------------------------------------------------------------
  // 3.1-Reserva exitosa como usuario invitado
  // ------------------------------------------------------------------
  it('Permite reservar una habitación como invitado con datos válidos', () => {
    cy.fixture('bookingData').then((data) => {
      const guest = data.guest

      //1.Se muestran habitaciones disponibles (cada una con su link de reserva).
      cy.get('a[href*="/reservation"]').should('have.length.greaterThan', 0)

      //2.Seleccionar una habitación: abre su página de reserva.
      cy.get('a[href*="/reservation"]').first().click()
      cy.url().should('include', '/reservation/')

      //3.Abrir y completar el formulario con datos válidos.
      cy.get('#doReservation').click() // abre el formulario de reserva
      cy.get('.room-firstname').type(guest.firstname)
      cy.get('.room-lastname').type(guest.lastname)
      cy.get('.room-email').type(guest.email)
      cy.get('.room-phone').type(guest.phone)

      //4.Confirmar la reserva (botón "Reserve Now" sin id) y validar el éxito.
      cy.get('button.btn.btn-primary.w-100.mb-3').not('#doReservation').click()
      cy.contains('Booking Confirmed').should('be.visible')
    })
  })

  // ------------------------------------------------------------------
  // 3.2-Validaciones del formulario de reserva
  // ------------------------------------------------------------------
  it('Muestra errores al enviar el formulario de reserva vacío', () => {
    //Llegar a la página de reserva y abrir el formulario.
    cy.get('a[href*="/reservation"]').first().click()
    cy.url().should('include', '/reservation/')
    cy.get('#doReservation').click() // abre el formulario

    //1.Intentar enviar el formulario sin completar ningún campo.
    cy.get('button.btn.btn-primary.w-100.mb-3').not('#doReservation').click()

    //2.Aparecen los mensajes de error.
    // Firstname
    cy.contains(/Firstname should not be blank|size must be between 3 and 18/)
      .should('be.visible')

    // Lastname
    cy.contains(/Lastname should not be blank|size must be between 3 and 30/)
      .should('be.visible')

    // Email
    cy.contains(/must not be empty|must be a well-formed email address/)
      .should('be.visible')

    // Telephone
    cy.contains(/must not be empty|size must be between 11 and 21/)
      .should('be.visible')

    //3.No se realizó ninguna reserva (no aparece la confirmación).
    cy.contains('Booking Confirmed').should('not.exist')
  })

  // ------------------------------------------------------------------
  // 3.3-Formulario de contacto
  // ------------------------------------------------------------------
  it('Permite enviar el formulario de contacto con datos válidos', () => {
    cy.fixture('bookingData').then((data) => {
      const contact = data.contact

      // 1. Completar el formulario de contacto con datos válidos.
      cy.get('#name').type(contact.name)
      cy.get('#email').type(contact.email)
      cy.get('#phone').type(contact.phone)
      cy.get('#subject').type(contact.subject)
      cy.get('#description').type(contact.message)

      // 2. Enviar el mensaje y validar que se muestra la confirmación.
      cy.contains('button', 'Submit').click()
      cy.contains('Thanks for getting in touch').should('be.visible')
    })
  })
})
