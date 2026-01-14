import loginPage from "./loginPage";

describe('Scenario Verify function login (POM)', () => {

  beforeEach(() => {

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.intercept('GET', '**/core/i18n/messages').as('loadI18n')
    
    loginPage.visit()
    cy.wait('@loadI18n')
    loginPage.usernameInput()
      .should('exist')
      .and('be.visible')
  })

  it('TC001 Verify Access login page', () => {
    cy.intercept('GET', '**/auth/login').as('accessLogin')

    cy.url().should('include', '/auth/login')
  })

  it('TC002 Login With Valid Credentials', () => {
    cy.fixture('loginData').then((data) => {
      cy.intercept(
        'GET',
        '**/api/v2/dashboard/employees/action-summary'
      ).as('actionSummary')

      loginPage.login(
        data.validUser.username,
        data.validUser.password
      )

      cy.wait('@actionSummary')
        .its('response.statusCode')
        .should('eq', 200)

      cy.url().should('include', '/dashboard')
    })
  })

  it('TC003 Login With Invalid Username', () => {
    cy.fixture('loginData').then((data) => {

      cy.intercept('POST', '**/api/v2/auth/login').as('invalidLogin')

      loginPage.login(
        data.invalidUser.username,
        data.invalidUser.password
      )

      loginPage.errorMessage()
        .should('be.visible')
        .and('contain.text', 'Invalid credentials')

      cy.url().should('include', '/auth/login')
    })
  })

  it('TC004 Login With Invalid Password', () => {
    cy.fixture('loginData').then((data) => {
      cy.intercept('POST', '**/api/v2/auth/login').as('invalidLogin')

      loginPage.login(
        data.invalidPassword.username,
        data.invalidPassword.password
      )

      loginPage.errorMessage()
        .should('contain.text', 'Invalid credentials')
    })
  })

  it('TC005 Username field validation is required', () => {
    cy.intercept('POST', '**/api/v2/auth/login').as('emptyUsername')

    loginPage.loginButton().click()
    loginPage.assertRequired(loginPage.usernameInput())
  })

  it('TC006 Password field validation is required', () => {
    cy.intercept('POST', '**/api/v2/auth/login').as('emptyPassword')

    loginPage.usernameInput().type('Admin')
    loginPage.loginButton().click()

    loginPage.assertRequired(loginPage.passwordInput())
  })

  it('TC007 Login field validation is required', () => {
    cy.intercept('POST', '**/api/v2/auth/login').as('emptyForm')

    loginPage.loginButton().click()
    cy.get('.oxd-input-group__message')
      .should('have.length.at.least', 1)
      .and('contain.text', 'Required')
  })

  it('TC008 Hide Password', () => {
    cy.intercept('POST', '**/api/v2/auth/login').as('passwordTyping')

    loginPage.passwordInput()
      .type('admin123')
      .should('have.attr', 'type', 'password')
  })

  it('TC009 Form Reset After Refresh', () => {
    cy.intercept('GET', '**/auth/login').as('refreshLogin')

    loginPage.usernameInput().type('Admin')
    loginPage.passwordInput().type('admin123')

    cy.reload()

    loginPage.usernameInput({timeout: 15000})
      .should('be.visible')
      .and('have.value', '')
    loginPage.passwordInput({timeout: 15000})
      .should('be.visible')
      .and('have.value', '')
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
