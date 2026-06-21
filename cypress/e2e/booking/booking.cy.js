describe('Booking', () => {
    beforeEach(() => {
        cy.openHome()
    })

    it('TC-005-b_Verificar botón Booking en el menú header', () => {
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

    it('TC-006_Verificar campo Check In (debe bloquear fechas pasadas)', () => {
        // Comportamiento esperado: el campo es visible, abre el calendario y las
        // fechas anteriores a la actual quedan bloqueadas.
        // BUG-001: hoy permite seleccionar fechas pasadas. La última aserción falla.
        cy.contains('Check Availability & Book Your Stay').should('be.visible')
        cy.contains('Check In').should('be.visible')

        cy.getInputNearText('Check In').click()
        cy.get('.react-datepicker, [class*="datepicker"], [class*="calendar"]')
            .should('be.visible')

        // Las fechas anteriores a la actual deberían figurar como deshabilitadas.
        cy.get('.react-datepicker__day--disabled').should('exist')
    })

    it('TC-007_Verificar campo Check Out (debe bloquear fechas pasadas)', () => {
        // Comportamiento esperado: no se permiten fechas anteriores a la actual ni al Check In.
        // BUG-002: hoy permite seleccionar fechas pasadas. La última aserción falla.
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