describe('intercept', () => {
  it('Test Web Automation using Intercept', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get("input[placeholder='Username']").type('Admin');
    cy.get("input[placeholder='Password']").type('admin123');

    // intercept sebelum klik login
    cy.intercept(
      'GET',
      '**/api/v2/dashboard/employees/action-summary'
    ).as('actionSummary');

    cy.get("button[type='submit']").click();

    cy.wait('@actionSummary')
      .its('response.statusCode')
      .should('eq', 200);
  });
});
