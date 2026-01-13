describe('Scenario Verify function login', () => {

  beforeEach(() => {
    // intercept load i18n (page initialization)
    cy.intercept('GET', '**/core/i18n/messages').as('loadI18n')

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.wait('@loadI18n')

    cy.get("input[placeholder='Username']", { timeout: 15000 })
      .should('exist')
      .and('be.visible')
  })

  it('TC001 Verify Access login page', () => {
    // intercept static login page load
    cy.intercept('GET', '**/auth/login').as('accessLogin')

    cy.url().should('include', '/auth/login')
  })

  it('TC002 Login With Valid Credentials', () => {

    // intercept dashboard data
    cy.intercept(
      'GET',
      '**/api/v2/dashboard/employees/action-summary'
    ).as('actionSummary')

    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.wait('@actionSummary')
      .its('response.statusCode')
      .should('eq', 200)

    cy.url().should('include', '/dashboard')
  })

  it('TC003 Login With Invalid Username', () => {
   cy.intercept(
      'GET',
      '**/core/i18n/messages'
    ).as('messages');

  cy.get("input[placeholder='Username']").type('Wildan')
  cy.get("input[placeholder='Password']").type('admin123')
  cy.get("button[type='submit']").click()


  cy.get('.oxd-alert-content-text')
    .should('be.visible')
    .and('contain.text', 'Invalid credentials')

    cy.wait('@messages')
      .its('response.statusCode')
      .should('eq', 304)

  cy.url().should('include', '/auth/login')
  })

  it('TC004 Login With Invalid Password', () => {
    cy.intercept('POST', '**/api/v2/auth/login').as('login')

    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('wildan123')
    cy.get("button[type='submit']").click()

    cy.get('.oxd-alert-content-text')
    .should('be.visible')
    .and('contain.text', 'Invalid credentials')

    cy.url().should('include', '/auth/login')
  })

  it('TC005 Username field validation is required', () => {
    // intercept login attempt (client-side validation)
    cy.intercept('POST', '**/api/v2/auth/login').as('emptyUsername')

    cy.get("button[type='submit']").click()

    cy.get("input[placeholder='Username']")
      .parents('.oxd-input-group')
      .find('.oxd-input-group__message')
      .should('contain.text', 'Required')
  })

  it('TC006 Password field validation is required', () => {
    cy.intercept('POST', '**/api/v2/auth/login').as('emptyPasswor')

    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("button[type='submit']").click()

    cy.get("input[placeholder='Password']")
      .parents('.oxd-input-group')
      .find('.oxd-input-group__message')
      .should('contain.text', 'Required')
  })

  it('TC007 Login field validation is required', () => {
    cy.intercept('POST', '**/api/v2/auth/login').as('emptyForm')

    cy.get("button[type='submit']").click()

    cy.get('.oxd-input-group__message')
      .should('have.length.at.least', 1)
      .and('contain.text', 'Required')
  })

  it('TC008 Hide Password', () => {
    // intercept hanya sebagai coverage (tidak di-wait)
    cy.intercept('POST', '**/api/v2/auth/login').as('passwordTyping')

    cy.get("input[placeholder='Password']")
      .type('admin123')
      .should('have.attr', 'type', 'password')
  })

  it('TC009 Form Reset After Refresh', () => {
    cy.intercept('GET', '**/auth/login').as('refreshLogin')

    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('admin123')

    cy.reload()

    cy.get("input[placeholder='Username']").should('have.value', '')
    cy.get("input[placeholder='Password']").should('have.value', '')
  })

  it('TC010 Access Forgot Password page', () => {
    cy.intercept(
      'POST',
      '**/api/v2/auth/request-password-reset'
    ).as('forgotPassword')

    cy.contains('Forgot your password?').click()

    cy.url().should('include', '/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
  })

})
