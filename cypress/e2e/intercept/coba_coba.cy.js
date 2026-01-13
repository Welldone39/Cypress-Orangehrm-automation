describe('intercept', () => {
  it('Test Web Automation using Intercept', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get("input[placeholder='Username']").type('Wildan');
    cy.get("input[placeholder='Password']").type('admin123');

    // intercept sebelum klik login
    cy.intercept(
      'GET',
      '**/core/i18n/messages'
    ).as('messages');

    cy.get("button[type='submit']").click();

    cy.wait('@messages')
      .its('response.statusCode')
      .should('eq', 304);
  });
});
