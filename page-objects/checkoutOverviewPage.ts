import {Page, expect, Locator} from "@playwright/test";
export class CheckoutOverviewPage {
    private readonly page: Page;
    private readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    }

    async isOnCheckoutOverviewPage(): Promise<boolean> {
        return await this.page.getByText('Checkout: Overview').isVisible();
    }

    async finishPurchase(): Promise<void> {
        await this.finishButton.click();
        await this.page.waitForLoadState('load');
        const confirmationMessage = await this.page.locator('.complete-header').textContent();
        expect(confirmationMessage).toBe('Thank you for your order!');
    }
    
}