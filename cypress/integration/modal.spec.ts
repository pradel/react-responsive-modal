/// <reference types="cypress" />

describe('simple modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/examples');
    // Page is heavy to load so we wait for it to be loaded
    cy.wait(500);
  });

  it('should open modal when clicking open button', () => {
    cy.get('button').eq(2).click();
    cy.get('[data-testid=modal]').should('exist');
  });

  // TODO overlay not working, see how to fix
  // it('should close modal when clicking overlay', () => {
  //   cy.get('button').eq(2).click();
  //   cy.get('[data-testid=overlay]').click();
  //   cy.get('[data-testid=modal]').should('not.exist');
  // });

  it('should close modal when clicking the close icon', () => {
    cy.get('button').eq(2).click();
    cy.get('[data-testid=close-button]').click();
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('should close modal when pressing esc key', () => {
    cy.get('button').eq(2).click();
    cy.get('body').type('{esc}');
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('should close only last modal when pressing esc key when multiple modals are opened', () => {
    cy.get('button').eq(8).click();
    cy.get('[data-testid=modal] button').eq(0).click();
    cy.get('[data-testid=modal]').should('have.length', 2);
    cy.get('body').type('{esc}');
    cy.get('[data-testid=modal]').should('have.length', 1);
    cy.get('body').type('{esc}');
    cy.get('[data-testid=modal]').should('not.exist');
  });
});
