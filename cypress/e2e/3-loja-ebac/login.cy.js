/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login',() => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        //cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('guilherme.teste@ebac.com.br')
        cy.get('#password').type('Teste@1234')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain','Olá, guilherme.teste (não é guilherme.teste? Sair)' )
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
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

    it('Deve realizar o login com sucesso utilizando massa de dados', () => {
        cy.get('#username').type(perfil.ususario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain','Olá, guilherme.teste (não é guilherme.teste? Sair)' )
    });

    it.only('Deve realizar o login com sucesso usando Fixtures', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.ususario, {log: false})
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain','Olá, guilherme.teste (não é guilherme.teste? Sair)' )
        })
    });

})