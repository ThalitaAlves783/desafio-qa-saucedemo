import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

describe('Login', () => {
  it('CT-001 - deve permitir login com credenciais validas', () => {
    cy.fixture('users').then(({ standard }) => {
      cy.login(standard.username, standard.password);
    });

    InventoryPage.assertLoaded();
  });

  it('CT-002 - deve exibir erro ao tentar login com usuario bloqueado', () => {
    cy.fixture('users').then(({ lockedOut }) => {
      cy.login(lockedOut.username, lockedOut.password);
    });

    LoginPage.assertLoginError('Epic sadface: Sorry, this user has been locked out.');
    LoginPage.assertRemainsOnLoginPage();
  });

  it('CT-005 - deve exibir erro para usuario inexistente', () => {
    cy.fixture('users').then(({ invalid }) => {
      cy.login(invalid.username, invalid.password);
    });

    LoginPage.assertLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
    LoginPage.assertRemainsOnLoginPage();
  });

  it('CT-006 - deve exibir erro para senha invalida', () => {
    cy.fixture('users').then(({ invalidPassword }) => {
      cy.login(invalidPassword.username, invalidPassword.password);
    });

    LoginPage.assertLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
    LoginPage.assertRemainsOnLoginPage();
  });

  it('CT-007 - deve exigir usuario quando os campos estiverem vazios', () => {
    LoginPage.visit();
    LoginPage.submit();

    LoginPage.assertLoginError('Epic sadface: Username is required');
    LoginPage.assertRemainsOnLoginPage();
  });

  it('CT-008 - deve exigir senha quando apenas o usuario for informado', () => {
    cy.fixture('users').then(({ standard }) => {
      LoginPage.visit();
      LoginPage.fillUsername(standard.username);
      LoginPage.submit();
    });

    LoginPage.assertLoginError('Epic sadface: Password is required');
    LoginPage.assertRemainsOnLoginPage();
  });
});
