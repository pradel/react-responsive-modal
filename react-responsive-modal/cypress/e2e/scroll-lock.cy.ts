describe('scroll lock', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    // Page is heavy to load so we wait for it to be loaded
    cy.wait(500);
  });

  it('should prevent the page from scrolling with the mouse wheel when modal is opened', () => {
    cy.get('button').eq(0).click();
    cy.get('body').should('have.css', 'overflow', 'hidden');

    cy.window().then((win) => {
      const scrollY = win.scrollY;

      cy.get('div.fixed').realMouseWheel({
        deltaY: 500,
        scrollBehavior: false,
      });
      cy.window().its('scrollY').should('eq', scrollY);
    });
  });

  it('should scroll the content of the modal when the page scroll is locked', () => {
    cy.get('button').eq(2).click();
    cy.get('[data-testid=modal-container]').invoke('scrollTop').should('eq', 0);

    cy.get('[data-testid=modal-container]').realMouseWheel({
      deltaY: 500,
      scrollBehavior: false,
    });
    cy.get('[data-testid=modal-container]')
      .invoke('scrollTop')
      .should('be.greaterThan', 0);
  });

  it('should allow scrolling the page with the mouse wheel after the modal is closed', () => {
    cy.get('button').eq(0).click();
    cy.get('[data-testid=close-button]').click();
    cy.get('[data-testid=modal]').should('not.exist');

    cy.window().then((win) => {
      const scrollY = win.scrollY;

      cy.get('div.fixed').realMouseWheel({
        deltaY: 500,
        scrollBehavior: false,
      });
      cy.window().its('scrollY').should('be.greaterThan', scrollY);
    });
  });

  it('should keep the page scroll position when the modal is closed', () => {
    // Scroll the trigger into view before opening the modal so that
    // restoring the focus would scroll the page if not prevented
    cy.get('button').eq(0).scrollIntoView();
    cy.get('button').eq(0).click();
    cy.get('[data-testid=modal]').should('exist');

    cy.window().then((win) => {
      win.scrollTo(0, 0);
    });

    cy.get('[data-testid=close-button]').click();
    cy.get('[data-testid=modal]').should('not.exist');
    // The focus should be restored to the trigger button
    cy.focused().should('have.text', 'Open modal');
    cy.window().its('scrollY').should('eq', 0);
  });
});
