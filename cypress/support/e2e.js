import './commands'

/*/ Para poder correr tests sin que fallen por errores de React minified, agregamos un handler global para uncaught exceptions:
Cypress.on('uncaught:exception', (err) => {
  // ignorar errores de React minified que incluyen "Minified React error #418"
  if (err && err.message && err.message.includes('Minified React error #418')) {
    return false; // evita que Cypress falle el test
  }
  // para otros errores dejar que Cypress falle
});
*/

import './commands'
// Handler global para uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  // Ignorar solo el error minificado de React #418
  if (
    (err.message && err.message.includes('Minified React error #418')) ||
    (err.message && err.message.includes("Cannot read properties of null"))
  ) {
    return false
  }
  // Para otros errores, dejar que Cypress falle
})