describe('Formulario de Contacto', () => {
    // Corregir error 418 de React (BUG)
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Minified React error #418')) {
            return false;
        }
    });

    beforeEach(() => {
        cy.visit('https://automationintesting.online/#contact');
        cy.get(':nth-child(5) > .nav-link').click();
    });

    it('Envío de formulario de contacto con datos válidos y mostrar confirmación', () => {
        cy.fixture('contact.json').then((data) => {
            cy.get('[data-testid="ContactName"]').type(data.nombre);
            cy.get('[data-testid="ContactEmail"]').type(data.email);
            cy.get('[data-testid="ContactPhone"]').type(data.telefono);
            cy.get('[data-testid="ContactSubject"]').type(data.asunto);
            cy.get('[data-testid="ContactDescription"]').type(data.mensaje);

            cy.intercept('POST', '**/message*').as('mensaje');
            cy.get('.d-grid > .btn').click();

            cy.wait('@mensaje').its('response.statusCode').should('eq', 200);

            cy.get('.col-lg-8 > .card > .card-body > .h4').should(
                'contain.text',
                `Thanks for getting in touch ${data.nombre}`
            );
        });
    });

    it('Verificar el envío del formulario vacío', () => {
        cy.get('.d-grid > .btn').click();
        cy.get('.alert').should('be.visible');

        cy.fixture('errorContact.json').then((data) => {
            data.errores.forEach((error) => {
                cy.contains(error).should('be.visible');
            });
        });
    });

    it('Validación de campo de texto del formulario', () => {
        cy.fixture('contact.json').then((data) => {
            cy.get('[data-testid="ContactName"]').type(data.nombre);
            cy.get('[data-testid="ContactEmail"]').type(data.email);
            cy.get('[data-testid="ContactPhone"]').type(data.telefono);
            cy.get('[data-testid="ContactSubject"]').type(data.asunto);
            cy.get('[data-testid="ContactDescription"]').type(data.mensajeCorto);

            cy.get('.d-grid > .btn').click();
            cy.get('.alert').should('be.visible');
            cy.contains('Message must be between 20 and 2000 characters.').should('be.visible');
        });
    });

    it('Validación campo Subject', () => {
        cy.fixture('contact.json').then((data) => {
            cy.get('[data-testid="ContactName"]').type(data.nombre);
            cy.get('[data-testid="ContactEmail"]').type(data.email);
            cy.get('[data-testid="ContactPhone"]').type(data.telefono);
            cy.get('[data-testid="ContactSubject"]').type(data.asuntoCorto);
            cy.get('[data-testid="ContactDescription"]').type(data.mensaje);

            cy.get('.d-grid > .btn').click();
            cy.get('.alert').should('be.visible');
            cy.contains('Subject must be between 5 and 100 characters').should('be.visible');
        });
    });

    it('Validación campo Name', () => {
        cy.fixture('contact.json').then((data) => {
            cy.get('[data-testid="ContactName"]').type(data.nombreChar);
            cy.get('[data-testid="ContactEmail"]').type(data.email);
            cy.get('[data-testid="ContactPhone"]').type(data.telefono);
            cy.get('[data-testid="ContactSubject"]').type(data.asunto);
            cy.get('[data-testid="ContactDescription"]').type(data.mensaje);

            cy.intercept('POST', '**/message*').as('mensaje');
            cy.get('.d-grid > .btn').click();

            cy.wait('@mensaje').its('response.statusCode').should('eq', 200);

            cy.get('.col-lg-8 > .card > .card-body > .h4').should(
                'contain.text',
                `Thanks for getting in touch ${data.nombreChar}`
            );
        });
    });
});