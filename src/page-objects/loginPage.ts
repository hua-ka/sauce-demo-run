import {Page, test, expect, Locator} from "@playwright/test";


export class LoginPage {
    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.username = this.page.locator('#user-name');
        this.password = this.page.locator('#password')
        this.loginButton = this.page.locator('#login-button');
    }

    async loginWithCorrectCreds(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('load');

        // Verify successful login by checking for the presence of the products page title
        await expect(this.page.getByText('Products')).toBeVisible();
    }

    async loginWithInvalidCreds(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('load');
        // Verify successful login by checking for the presence of the products page title
        if (username === 'locked_out_user') {
            await expect(this.page.locator('.error-message-container')).toContainText('Sorry, this user has been locked out.');
        } else {
            await expect(this.page.locator('.error-message-container')).toContainText('Username and password do not match any user in this service');
        }
    }
}