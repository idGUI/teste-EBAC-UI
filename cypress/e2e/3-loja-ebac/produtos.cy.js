/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";


describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Abominable Hoodie')
        cy.get('.sku_wrapper').should('exist')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Zeppelin Yoga Pant'
        produtosPage.buscarProduto(produto)
        //cy.get('.sku').should('exist')
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve visitar a página de um produto', () => {
        produtosPage.visitarProduto('Apollo Running Short')
        cy.get('.product_title').should('contain', 'Apollo Running Short')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Abominable Hoodie')
        produtosPage.addProdutoCarrinho('L', 'Red', qtd)
        cy.get('.woocommerce-message').should('contain', qtd )
    });

    it.only('Deve adicionar produto ao carrinho buscando da Massa de Dados', () => {
        cy.fixture('produtos').then(dados=> {
            produtosPage.buscarProduto(dados[0].nomeProduto)
            produtosPage.addProdutoCarrinho(dados[0].tamanho, dados[0].cor, dados[0].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto )
        })

        
    });
});