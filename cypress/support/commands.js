import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('login', (username, password) => {
  LoginPage.visit();
  LoginPage.fillUsername(username);
  LoginPage.fillPassword(password);
  LoginPage.submit();
});

Cypress.Commands.add('loginAsStandardUser', () => {
  cy.fixture('users').then(({ standard }) => {
    cy.login(standard.username, standard.password);
  });
});
