describe ('Rooms',() =>{
 
    const link = 'https://automationintesting.online'

  beforeEach(() => {
    cy.visit(link)
    
  })

  it ('Verificacion del boton "Today" en single room', () => {
     cy.navigate()
     cy.get(':nth-child(1) > .card > .card-footer > .btn').click()
     cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)').should('be.visible').and('contain', 'Today').click()
  })
  
  it('Verificacion del boton "Back" en single room', () => {
    cy.navigate()
    cy.get(':nth-child(1) > .card > .card-footer > .btn').click()
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Back').click()  
 })

  it('Verificacion del boton "Next" en single room',()=>{
    cy.navigate()
    cy.get(':nth-child(1) > .card > .card-footer > .btn').click()
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(3)').should('be.visible').and('contain', 'Next').click()
  })


})