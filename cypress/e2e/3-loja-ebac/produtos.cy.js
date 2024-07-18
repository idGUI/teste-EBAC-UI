/// <reference types="cypress"/>

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block')
        //.first()
        //.last()
        //.eq(2)
        .contains('Abominable Hoodie')
        .click()

        cy.get('.sku_wrapper').should('exist')
    });
});