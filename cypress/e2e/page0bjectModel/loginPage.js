class loginPage {

  // Selector
  usernameInput() {
    return cy.get("input[placeholder='Username']")
  }

  passwordInput() {
    return cy.get("input[placeholder='Password']")
  }

  loginButton() {
    return cy.get("button[type='submit']")
  }

  errorMessage() {
    return cy.get('.oxd-alert-content-text')
  }

  requiredMessage(field) {
    return field
      .parents('.oxd-input-group')
      .find('.oxd-input-group__message')
  }

  // Action
  visit() {
    cy.intercept('GET', '**/core/i18n/messages').as('loadI18n')
    cy.visit('/auth/login')
    cy.wait('@loadI18n')
  }

  login(username, password) {
    if (username) this.usernameInput().type(username)
    if (password) this.passwordInput().type(password)
    this.loginButton().click()
  }

  assertRequired(field) {
    this.requiredMessage(field)
      .should('contain.text', 'Required')
  }
}

export default new loginPage()
