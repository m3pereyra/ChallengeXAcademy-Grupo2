describe ('Rooms',() =>{
 
    it ('TC-031 Verificacion del boton "Today" en single room', () => {
     cy.navigateSingle()
     cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
     .should('be.visible')
     .and('contain', 'Today')
     .click()
   
  })
  
  it('TC-032 Verificacion del boton "Back" en single room', () => {
    cy.navigateSingle()
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(2)')
    .should('be.visible')
    .and('contain', 'Back')
    .click()  
 
  })

  it('TC-033 Verificacion del boton "Next" en single room',() => {
    cy.navigateSingle()
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(3)')
    .should('be.visible')
    .and('contain', 'Next').click()
  
  })
  
  it('TC-034 Verificacion de reserva fallida de single rooms, mes anterior',()=>{
    cy.navigateSingle()
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(2)').should('be.visible').and('contain', 'Back').click()
    cy.get('.rbc-calendar')
    cy.get('.rbc-day-bg')
    cy.reserveOk(1,'2026-05-01', '2026-05-07')
    cy.intercept('POST', '**/api/booking').as('createBooking')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    .click()
    cy.wait('@createBooking')
    .its('response.statusCode')
    .should('eq', 201)
   
  })
  
  
  it('TC-035 Verificacion de reserva fallida de single rooms en dias pasados',()=> {
    cy.navigateSingle()
    cy.get('.rbc-day-bg')
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
    .and('contain','Today')
    .click()
    cy.reserveOk(1,'2026-06-01', '2026-06-07')
    cy.intercept('POST', '**/api/booking').as('createBooking')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    .click()
    cy.wait('@createBooking')
    .its('response.statusCode')
    .should('eq', 201)
    
  })

  it('TC-036 Verificacion de reserva exitosa',()=> {
    cy.navigateSingle()
    cy.get('.rbc-day-bg')
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
    .and('contain','Today')
    .click()
    cy.reserveOk(1,'2026-06-29', '2026-07-08')
    cy.intercept('POST', '**/api/booking').as('createBooking')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    .click()
    cy.wait('@createBooking')
    .its('response.statusCode')
    .should('eq', 201)
    
  })

   it('TC-037 Verificacion de reserva fallida con datos invalidos',()=> {
    cy.navigateSingle()
    cy.get('.rbc-day-bg')
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
    .and('contain','Today')
    .click()
    cy.reserveDateFail(1,'2026-06-29', '2026-07-08')
    cy.intercept('POST', '**/api/booking').as('createBooking')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    .click()
    cy.wait('@createBooking')
    .its('response.statusCode')
    .should('eq', 201)
    cy.get('.alert')

  })

  it ('TC-038 Verificacion de seleccion de otras alternativas de rooms', () => {
     cy.navigateSingle()
     cy.get('.container > .fs-4')
     .and('contain','Similar Rooms You Might Like')
     cy.get('.container > .row > :nth-child(1) > .card > .card-body')
     cy.get(':nth-child(1) > .card > .card-body > .card-title')
     .and('contain','Double')
     cy.get(':nth-child(1) > .card > .card-body > .btn')
     .should('be.visible')
     .and('contain','View Details')
     .click()
     cy.get('.col-lg-8 > :nth-child(1) > .fw-bold')
     .and('contain','Double Room')
  
  })


  it ('TC-039 Verificacion de seleccion de otras alternativas de rooms', () => {
     cy.navigateSingle()
     cy.get('.container > .fs-4')
     .and('contain','Similar Rooms You Might Like')
     cy.get('.bg-light.py-5 > .container > .row > :nth-child(2) > .card > .card-body')
     cy.get('.bg-light.py-5 > .container > .row > :nth-child(2) > .card > .card-body > .card-title')
     .and('contain','Suite')
     cy.get(':nth-child(2) > .card > .card-body > .btn')
     .and('contain','View Details')
     .click()
     cy.get('.col-lg-8 > :nth-child(1) > .fw-bold')
     .and('contain','Suite Room')
  
  })

  
  it('TC-040 Verificacion de reserva exitosa double rooms',()=> {
    cy.navigateDouble()
    cy.get('.rbc-day-bg')
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
    .and('contain','Today')
    .click()
    cy.reserveOk(2,'2026-06-29', '2026-07-08')
    cy.intercept('POST', '**/api/booking').as('createBooking')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    .click()
    cy.wait('@createBooking')
    .then((interception) => {
    expect(interception.response.statusCode).to.eq(201)

   })
    
  })

  it('TC-041 Verificacion de reserva fallida double rooms',()=> {
    cy.navigateDouble()
    cy.get('.rbc-day-bg')
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
    .and('contain','Today')
    .click()
    cy.reserveDateFail(2,'2026-06-29', '2026-07-08')
    cy.intercept('POST', '**/api/booking').as('createBooking')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    .click()
    cy.wait('@createBooking')
    .its('response.statusCode')
    .should('eq', 201)
    cy.get('.alert')
    
    
  })
   

  it('TC-042 Verificacion de reserva exitosa suite rooms',()=> {
    cy.navigateSuite()
    cy.get('.rbc-day-bg')
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
    .and('contain','Today')
    .click()
    cy.reserveOk(3,'2026-06-29', '2026-07-08')
    cy.intercept('POST', '**').as('allPosts')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    cy.wait('@allPosts').then((interception) => {
    cy.log(interception.request.url)
    console.log(interception)
    })
    
    
   })

  it('TC-049 Verificacion de reserva fallida suite rooms',()=> {
    cy.navigateSuite()
    cy.get('.rbc-day-bg')
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
    .and('contain','Today')
    .click()
    cy.reserveDateFail(3,'2026-06-29', '2026-07-08')
    cy.intercept('POST', '**/api/booking').as('createBooking')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    .click()
    cy.wait('@createBooking')
    .its('response.statusCode')
    .should('eq', 201)
    cy.get('.alert')
    
    
   })

  
   it('TC-050 Verificacion de reserva sin llenar campos',()=> {
    cy.navigateSingle()
    cy.get('.rbc-day-bg')
    cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(1)')
    .and('contain','Today')
    .click()
    cy.reserveDateEmpty(1,'2026-06-29', '2026-07-08')
    cy.get('.btn-primary')
    .should('be.visible')
    .and('contain','Reserve Now')
    .click()
    cy.get('.alert')
    
    
   })
    
  
   it('TC-081 Validacion de cambio de precio "Single Room"',()=>{
    cy.navigateSingle()
    cy.selectReservationDates(1,'2026-06-29','2026-07-08')
    cy.get('form > .card > .card-body > :nth-child(2) > :nth-child(1)')
    

  })   
  
  it('TC-082 Validacion de cambio de precio "Double Room"',()=>{
    cy.navigateDouble()
    cy.selectReservationDates(2,'2026-06-29','2026-07-08')
    cy.get('form > .card > .card-body > :nth-child(2)')
  })

  
  it('TC-083 Verificacion de cambio de precio "Suite Room"',()=>{
    cy.navigateDouble()
    cy.selectReservationDates(3,'2026-06-29','2026-07-08')
    cy.get('form > .card > .card-body > :nth-child(2)')
  })


})