class LoginPage {
  visit() {
    cy.visit('/');
  }

  fillUsername(username) {
    cy.get('[data-test="username"]').clear().type(username);
  }

  fillPassword(password) {
    cy.get('[data-test="password"]').clear().type(password, { log: false });
  }

  submit() {
    cy.get('[data-test="login-button"]').click();
  }

  assertLoginError(message) {
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', message);
  }

  assertRemainsOnLoginPage() {
    cy.location('pathname').should('not.eq', '/inventory.html');
    cy.get('[data-test="title"]').should('not.exist');
    cy.get('[data-test="inventory-container"]').should('not.exist');
  }
}

export default new LoginPage();
