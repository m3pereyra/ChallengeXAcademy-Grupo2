describe('Rooms', () => {
  beforeEach(() => {
    cy.loginAdmin()   // reutiliza el comando
    cy.contains('Rooms').click()
  })

  it('Crear habitación con datos válidos', () => {
    cy.get('[data-testid="roomName"]').type('666')
    cy.get('#type').select('Twin')
    cy.get('#accessible').select('true')
    cy.get('#roomPrice').type('666')
    cy.get('#createRoom').click()

    cy.contains('666').should('be.visible')
      // Validar que seguimos en la pantalla de Rooms
  cy.url({ timeout: 10000 }).should('include', '/admin/rooms')
  }),
it('Crear habitación sin nombre', () => {  
  cy.get('#type').select('Single')
  cy.get('#accessible').select('true')
  cy.get('#roomPrice').type('100')
  cy.get('#createRoom').click()

  // Validar que seguimos en la pantalla de Rooms
  cy.url({ timeout: 10000 }).should('include', '/admin/rooms')

  // Validar que aparece el mensaje de error
  cy.get('.alert.alert-danger', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', 'Room name must be set')
}),
it('Crear habitación con precio inválido', () => {  
  cy.get('[data-testid="roomName"]').type('666')
  cy.get('#type').select('Single')
  cy.get('#accessible').select('true')
  cy.get('#roomPrice').type('abc')
  cy.get('#createRoom').click()

  // Validar que seguimos en la pantalla de Rooms
  cy.url({ timeout: 10000 }).should('include', '/admin/rooms')

  // Validar que aparece el mensaje de error
  cy.get('.alert.alert-danger', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', 'Failed to create room')


}),
it('Editar habitación existente', () => {  
    // Selecciona la primera habitación de la lista y entra en modo edición
    cy.get('[data-testid="roomlisting"]').first().click()
    cy.get('.col-sm-2 > .btn').click()


    // realizar cambios
    cy.get('#roomName').clear().type('777')
    cy.get('#type').select('Single')
    cy.get('#accessible').select('true')
    cy.get('#roomPrice').clear().type('123')
    cy.get('#description').clear().type('Nueva descripción')
    cy.get('input[type="checkbox"]').uncheck({ force: true })
    cy.get('input[type="checkbox"][value="Radio"]').check({ force: true })
    cy.get('#update').click()

    // Validar que el cambio se refleje en la lista
  
  cy.contains('777', { timeout: 10000 }).should('be.visible')
  cy.contains('Single').should('be.visible')
  cy.contains('true').should('be.visible')
  cy.contains('123').should('be.visible')
  cy.contains('Nueva descripción').should('be.visible')
  cy.contains('Radio').should('be.visible')



}),
it('Eliminar habitación existente', () => {
cy.get('[data-testid="roomlisting"]').then(($roomsBefore) => {
  const countBefore = $roomsBefore.length

  // eliminar la primera habitación
  cy.get('[data-testid="roomlisting"]').first().find('.fa.fa-remove.roomDelete').click()

  // validar que ahora hay una menos
  cy.get('[data-testid="roomlisting"]').should('have.length', countBefore - 1)
})




})

})
