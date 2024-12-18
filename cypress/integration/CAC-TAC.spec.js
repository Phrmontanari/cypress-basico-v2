///  <reference types="Cypress" />

  describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {
      cy.title().should('be.equal' , 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Texto'.repeat(10);
      cy.get('#firstName').type('Pedro')
      cy.get('#lastName').type('Ribeiro')
      cy.get('#email').type('pedro@gmail.com')
      cy.get('#open-text-area').type(longText , { delay: 0 })
      cy.contains('button' , 'Enviar').click()
        .should('be.visible' , '.success > strong')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      const longText = 'Texto'.repeat(10);
      cy.get('#firstName').type('Pedro')
      cy.get('#lastName').type('Ribeiro')
      cy.get('#email').type('pedro#.')
      cy.get('#open-text-area').type(longText , { delay: 0 })
      cy.contains('button' , 'Enviar').click()
        .should('be.visible' , 'error')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function() {
      cy.get('#phone').type('abcd').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#phone-checkbox').click()
      cy.contains('button' , 'Enviar').click()
        .should('be.visible' , '.error > strong')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
      cy.get('#firstName')
        .type('Pedro')
        .should('have.value' , 'Pedro')
        .clear()
        .should('have.value' , '')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
      cy.contains('button' , 'Enviar').click()
        .should('be.visible', 'error > strong')
    })

    it('Envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()
    })

  })

