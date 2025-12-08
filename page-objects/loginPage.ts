import {Page, test, expect, Locator} from "@playwright/test";


/**
 * Accepted usernames are:
 * standard_user
 * locked_out_user
 * problem_user
 * performance_glitch_user
 * error_user
 * visual_user
 * 
 * Password for all users:
 * secret_sauce
 */

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

        // Verify successful login by checking for the presence of the products page title
        await expect(this.page.getByText('Products')).toBeVisible();
    }

    async loginWithInvalidCreds(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

        // Verify successful login by checking for the presence of the products page title
        await expect(this.page.locator('.error-message-container error')).toContainText('Username and password do not match any user in this service');
    }
}