describe('Booking', () => {
    beforeEach(() => {
        cy.openHome()
    })

    it('TC-006_Verificar botón Booking en el menú header', () => {
        cy.fixture('appData').then((data) => {
            // El link "Booking" debe estar visible y ser el segundo del menú.
            cy.get('nav')
                .find('a.nav-link')
                .eq(1)
                .should('be.visible')
                .and('contain', 'Booking')
                .click()

            // Al hacer click debe redirigir a la sección de disponibilidad.
            cy.url().should('include', data.site.bookingHash)
            cy.contains('Check Availability & Book Your Stay').should('be.visible')
        })
    })

    it('TC-007_Verificar campo Check Out (debe bloquear fechas anteriores al Check In)', () => {
        // Comportamiento esperado: no se permiten fechas anteriores al Check In.
        // BUG-002: hoy permite seleccionar fechas anteriores al Check In. La última aserción falla.
        cy.contains('Check Availability & Book Your Stay').should('be.visible')
        cy.contains('Check Out').should('be.visible')

        cy.getInputNearText('Check Out').click()
        cy.get('.react-datepicker, [class*="datepicker"], [class*="calendar"]')
            .should('be.visible')

        cy.get('.react-datepicker__day--disabled').should('exist')
    })

    it('TC-008 - Verificar botón Check Availability', () => {
        cy.contains('Check In').should('be.visible')
        cy.contains('Check Out').should('be.visible')

        cy.contains('a, button', 'Check Availability')
            .should('be.visible')
            .click()

        // debe mostrar/actualizar la oferta de habitaciones sin errores.
        cy.contains(/book now/i).should('be.visible')
    })

})
