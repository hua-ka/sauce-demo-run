import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';  
import users from '../test-data/users.json';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
})

test('successful login with valid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = users.standard_user;
    await loginPage.loginWithCorrectCreds(username, password);
    // await loginPage.loginWithCorrectCreds(users.standard_user.username, users.standard_user.password);
});

test('login with invalid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = users.invalid_user;
    await loginPage.loginWithInvalidCreds(username, password);
});

test('login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = users.locked_out_user;
    await loginPage.loginWithInvalidCreds(username, password);
});

