import {Page, test, expect, Locator} from "@playwright/test";

export class ProductsPage {
    private readonly page: Page;
    private readonly itemsList: Locator;
    private readonly productTitle: Locator;
    private readonly addToCartButton: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly checkoutButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.itemsList = this.page.locator('.inventory_list');
        this.productTitle = this.page.locator('.product_label');
        this.addToCartButton = this.page.getByText('Add to cart');
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    }

    async isOnProductsPage(): Promise<boolean> {
        return await this.page.getByText('Products').isVisible();
    }

    async addFirstProductToCart(): Promise<void> {
        await this.addToCartButton.first().click();
        await this.page.waitForLoadState('load');
    }

    async goToCart(): Promise<void> {
        await this.shoppingCartLink.click();
        await this.page.waitForLoadState('load');
        await expect(this.page.getByText('Your Cart')).toBeVisible();
    }
}