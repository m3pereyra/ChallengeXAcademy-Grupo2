describe ( 'Location', () => {
    beforeEach(()=>{
        cy.NavigateToLocationModule()
    })

    it('TC-011 - Verificar encabezado del modulo Location', () => {
        cy.NavigateToLocationModule()
        cy.VerifyTitleAndSubtitleLocationModuleIsVisible()
    })

    it('TC-012 - Verificar visualización del mapa', () => {
        cy.NavigateToContactInformacion()
        cy.VerifyMapIsVisible()
    })

    it('TC-013 - Verificar bloque address', () => {
        cy.NavigateToContactInformacion()
        cy.VerifyAddressInformacion()
    })

    it('TC-014 - Verificar bloque Phone', () => {
        cy.NavigateToContactInformacion()
        cy.VerifyPhoneInformacion()
    })

    it('TC-015 - Verificar bloque Email', () => {
        cy.NavigateToContactInformacion()
        cy.VerifyEmailInformacion()
    })

    it('TC-016 - Verificar sección Getting Here', () => {
        cy.NavigateToContactInformacion()
        cy.VerifyGettingHereInformacion()
    })

    it('TC-017 - Verificar distribución general de la pantalla location', () => {
        cy.NavigateToLocationModule()
        cy.VerifyTitleAndSubtitleLocationModuleIsVisible()
        cy.NavigateToContactInformacion()
        cy.VerifyMapIsVisible()
        cy.VerifyAddressInformacion()
        cy.VerifyPhoneInformacion()
        cy.VerifyEmailInformacion()
        cy.VerifyGettingHereInformacion()
    })

    it('TC-020 - Verificar recarga de la página', () => {
        cy.NavigateToLocationModule()
        cy.reload()
        cy.VerifyTitleAndSubtitleLocationModuleIsVisible()
        cy.NavigateToContactInformacion()
        cy.VerifyMapIsVisible()
        cy.VerifyAddressInformacion()
        cy.VerifyPhoneInformacion()
        cy.VerifyEmailInformacion()
        cy.VerifyGettingHereInformacion()
    })

    it('TC-067 - Verificar USR al navegar a la sección Location', () => {
        cy.NavigateToLocationModule()
        cy.url().should('include', 'automationintesting.online/#location')
    })

    it('TC-068 - Verificar redirección del link Pigeon', () => {
        cy.NavigateToLocationModule()
        cy.verifyPigeonLinkIsVisibleAndRedirects()
    })

    it('TC-069 - Verificar redirección del link Open Street Map', () => {
        cy.NavigateToLocationModule()
        cy.verifyOpenStreetMapLinkIsVisibleAndRedirects()
    })
})
