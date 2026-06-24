describe('Report', () => {
  beforeEach(() => {
    cy.loginAdmin()   // reutiliza el comando
    cy.contains('Report').click()
  })
  it('Botón Back', () => {
  // Guardar el título inicial del calendario (ej. "May 2026")
  cy.get('.rbc-toolbar-label').invoke('text').then((initialLabel) => {
    cy.get('.rbc-toolbar button').contains('Back').click()

    // Validar que el label cambió
    cy.get('.rbc-toolbar-label').invoke('text').should((newLabel) => {
      expect(newLabel).not.to.eq(initialLabel)
    })
  })
  }),
    it('Botón Next', () => {
  cy.get('.rbc-toolbar-label').invoke('text').then((initialLabel) => {
    cy.get('.rbc-toolbar button').contains('Next').click()
    cy.get('.rbc-toolbar-label').invoke('text').should((newLabel) => {
      expect(newLabel).not.to.eq(initialLabel)
    })
  })
  }),
    it('Retrocede vuelve a today, avanza vuelve a today', () => {
  cy.get('.rbc-toolbar-label').invoke('text').then((initialLabel) => { 
    cy.get('.rbc-toolbar button').contains('Back').click()
    cy.get('.rbc-toolbar-label').invoke('text').should((newLabel) => {
      expect(newLabel).not.to.eq(initialLabel)
    })
    cy.get('.rbc-toolbar button').contains('Today').click() 
    cy.get('.rbc-toolbar-label').invoke('text').should((newLabel) => {
      expect(newLabel).eq(initialLabel)
  })
    cy.get('.rbc-toolbar button').contains('Next').click()
    cy.get('.rbc-toolbar-label').invoke('text').should((newLabel) => {
      expect(newLabel).not.to.eq(initialLabel)
    })
    cy.get('.rbc-toolbar button').contains('Today').click() 
    cy.get('.rbc-toolbar-label').invoke('text').should((newLabel) => {
      expect(newLabel).eq(initialLabel)
    })  
  })
}) 
})