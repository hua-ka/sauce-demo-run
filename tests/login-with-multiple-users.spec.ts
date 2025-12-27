import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/page-objects/loginPage';
import users from '../src/test-data/users.json';
import { argosScreenshot } from "@argos-ci/playwright";


test.describe('Login Tests', () => {
    let loginPage :  LoginPage;
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        loginPage = new LoginPage(page);
    })

    const loginUsers = Object.values(users);
    for (const user of loginUsers) {
        test(`login with user ${user.username}`, async ({ page }) => {
            if (user.username !== users.invalid_user.username && user.username !== users.locked_out_user.username) {
                await loginPage.loginWithCorrectCreds(user.username, user.password);
            } else {
                await loginPage.loginWithInvalidCreds(user.username, user.password);
            }
        }); 
    }

    test.only('successful login with valid users', async ({ page }) => {
        const { username, password } = users.standard_user;
        await loginPage.loginWithCorrectCreds(username, password);
        await argosScreenshot(page, "Login page");
        // await loginPage.loginWithCorrectCreds(users.standard_user.username, users.standard_user.password);
    });

    test('login with invalid user', async ({ page }) => {
        const { username, password } = users.invalid_user;
        await loginPage.loginWithInvalidCreds(username, password);
        await argosScreenshot(page, "Login page");
    });

    test('login with locked out user', async ({ page }) => {
        const { username, password } = users.locked_out_user;
        await loginPage.loginWithInvalidCreds(username, password);
    });
});
