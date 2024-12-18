Cypress.Commands.add('fillMandatoryFieldsAndSubmit' , function() {
  const longText = 'Texto'.repeat(10);
  cy.get('#firstName').type('Pedro')
  cy.get('#lastName').type('Ribeiro')
  cy.get('#email').type('pedro@gmail.com')
  cy.get('#open-text-area').type(longText , { delay: 0 })
  cy.contains('button' , 'Enviar').click().should('be.visible' , '.success > strong')

})



