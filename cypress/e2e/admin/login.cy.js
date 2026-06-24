describe('Pruebas de login', () => {
  const base = 'https://automationintesting.online/admin/';

  beforeEach(() => {
    cy.visit(base);
    // esperar que el formulario esté visible antes de interactuar
    cy.get('form').should('be.visible');
  });

  it('Login exitoso', () => {
    cy.get('#username').should('be.visible').clear().type('admin');
    cy.get('#password').should('be.visible').clear().type('password');
    cy.get('#doLogin').should('be.enabled').click();

    // redirección a /admin/rooms
    cy.url({ timeout: 10000 }).should('include', '/admin/rooms');
    cy.visit('https://automationintesting.online/admin/rooms');
    
  });

  it('Login con contraseña incorrecta', () => {
    cy.get('#username').should('be.visible').clear().type('admin');
    cy.get('#password').should('be.visible').clear().type('123');
    cy.get('#doLogin').should('be.enabled').click();

    
    cy.get('.alert.alert-danger', { timeout: 5000 })
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

  it('Login con campos vacíos', () => {
    
    cy.get('#username').should('be.visible').clear();
    cy.get('#password').should('be.visible').clear();
    cy.get('#doLogin').should('be.enabled').click();

    cy.get('.alert.alert-danger', { timeout: 5000 })
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });
});
