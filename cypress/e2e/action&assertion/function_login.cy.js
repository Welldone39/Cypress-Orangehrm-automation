describe('Scenario Verify function login', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC001 Verify Access login page', () => {
    cy.url().should('include', '/auth/login')
  })

  it('TC002 Login With Valid Credentials', () => {
    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.url().should('include', '/dashboard')
  })

  it('TC003 Login With Invalid Username', () => {
    cy.get("input[placeholder='Username']").type('Wildan')
    cy.get("input[placeholder='Password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.get('.oxd-alert-content-text')
      .should('contain.text', 'Invalid credentials')

    cy.url().should('include', '/auth/login')
  })

  it('TC004 Login With Invalid Password', () => {
    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('wildan123')
    cy.get("button[type='submit']").click()

    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')

    cy.url().should('include', '/auth/login')
  })

  it('TC005 Username field validation is required', () => {
    cy.get("button[type='submit']").click()

    cy.get("input[placeholder='Username']")
      .parents('.oxd-input-group')
      .find('.oxd-input-group__message')
      .should('contain.text', 'Required')
  })

  it('TC006 Password field validation is required', () => {
    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("button[type='submit']").click()

    cy.get("input[placeholder='Password']")
      .parents('.oxd-input-group')
      .find('.oxd-input-group__message')
      .should('contain.text', 'Required')
  })

  it('TC007 Login field validation is required', () => {
    cy.get("button[type='submit']").click()

    cy.get('.oxd-input-group__message')
      .should('have.length.at.least', 1)
      .and('contain.text', 'Required')
  })

  it('TC008 Hide Password', () => {
    cy.get("input[placeholder='Password']")
      .type('admin123')
      .should('have.attr', 'type', 'password')
  })

  it('TC009 Form Reset After Refresh', () => {
    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('admin123')

    cy.reload()

    cy.get("input[placeholder='Username']").should('have.value', '')
    cy.get("input[placeholder='Password']").should('have.value', '')
  })
  
  it('TC010 Access Forgot Password page', () => {
  cy.contains('Forgot your password?').click()

  cy.url().should('include', '/requestPasswordResetCode')

  cy.contains('Reset Password').should('be.visible')
})

})
