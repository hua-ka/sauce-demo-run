import {Page, Locator} from "@playwright/test";

export class CheckoutPage {
    private readonly page: Page;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = this.page.locator('#first-name');
        this.lastName = this.page.locator('#last-name');
        this.postalCode = this.page.locator('#postal-code');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    async isOnYourCartPage(): Promise<boolean> {
        return await this.page.getByText('Checkout: Your Information').isVisible();
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
        await this.page.waitForLoadState('load');
    }
}

    