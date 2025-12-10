import {Page, test, expect, Locator} from "@playwright/test";

export class YourCartPage {
    private readonly page: Page;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    }

    async isOnYourCartPage(): Promise<boolean> {
        return await this.page.getByText('Your Cart').isVisible();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
        await this.page.waitForLoadState('load');
    }


}