/// <reference types="cypress" />

describe('simple modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/examples');
  });

  it('should open modal when clicking open button', () => {
    cy.get('button').eq(2).click();
    cy.get('[data-testid=modal]').should('exist');
  });

  it('should close modal when clicking the close icon', () => {
    cy.get('button').eq(2).click();
    cy.get('[data-testid=close-button]').click();
    // Wait for animation
    cy.wait(450);
    cy.get('[data-testid=modal]').should('not.exist');
  });
});
