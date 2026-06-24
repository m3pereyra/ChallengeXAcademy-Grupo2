Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Booking - Shady Meadows B&B', () => {

    beforeEach(() => {
        cy.visit('https://automationintesting.online/')
    })

    it('reserva exitosa como usuario invitado', () => {

    cy.contains('Check In').parent().find('input').scrollIntoView().click()

    cy.get('.react-datepicker__navigation--next').click()
    cy.get('.react-datepicker__navigation--next').click()
    cy.get('.react-datepicker__day--010').first().click()

    cy.contains('Check Out').parent().find('input').click()
    cy.get('.react-datepicker__navigation--next').click()
    cy.get('.react-datepicker__navigation--next').click()
    cy.get('.react-datepicker__day--012').first().click()

    cy.contains('Check Availability').click()

    cy.contains('Book now').should('be.visible')

    cy.contains('Book now').last().click()

    cy.contains('Reserve Now').click()

    cy.get('.room-firstname').type('Juan')
    cy.get('.room-lastname').type('Perez')
    cy.get('.room-email').type('juan@gmail.com')
    cy.get('.room-phone').type('54351262487200')

    cy.contains('Reserve Now').click()

    cy.contains('Booking Confirmed').should('be.visible')

    })
    
    it('validaciones del formulario - campos vacios', () => {

    cy.contains('Book now').first().click()

    cy.contains('Reserve Now').first().click()

    cy.contains('Reserve Now').click()

    cy.get('.alert.alert-danger', { timeout: 8000 }).should('be.visible')
    cy.contains('Firstname should not be blank').should('be.visible')
    cy.contains('Lastname should not be blank').should('be.visible')

})

    })
