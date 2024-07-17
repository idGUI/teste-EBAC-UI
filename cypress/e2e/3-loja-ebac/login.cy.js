/// <reference types="cypress"/>

describe('Funcionalidade: Login',() => {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('guilherme.teste@ebac.com.br')
        cy.get('#password').type('Teste@1234')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain','Olá, guilherme.teste (não é guilherme.teste? Sair)' )
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('guilherme@ebac.com.br')
        cy.get('#password').type('Teste@1234')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain' , 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('guilherme.teste@ebac.com.br')
        cy.get('#password').type('teste000')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain' , 'A senha fornecida para o e-mail')
        cy.get('.woocommerce-error').should('exist')
    });


})