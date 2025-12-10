import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../src/page-objects/loginPage';
import users from '../src/test-data/users.json';
import { ProductsPage } from '../src/page-objects/productsPage';
import { YourCartPage } from '../src/page-objects/yourCartPage';
import { CheckoutPage } from '../src/page-objects/checkoutPage';
import { CheckoutOverviewPage } from '../src/page-objects/checkoutOverviewPage';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
})

test('complete purchase flow with first item from the page', async ({ page }) => {
    // Login with stardard user
    const loginPage = new LoginPage(page);
    const { username, password } = users.standard_user;
    await loginPage.loginWithCorrectCreds(username, password);

    // Add first item to cart
    const productsPage = new ProductsPage(page);
    expect(productsPage.isOnProductsPage()).toBeTruthy();
    await productsPage.addFirstProductToCart();
    // Go to cart
    await productsPage.goToCart();

    // Proceed to checkout
    const yourCartPage = new YourCartPage(page);
    expect(yourCartPage.isOnYourCartPage()).toBeTruthy();
    await yourCartPage.proceedToCheckout();

    // Fill in checkout information
    const checkoutPage = new CheckoutPage(page);
    expect(checkoutPage.isOnYourCartPage()).toBeTruthy();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');

    // Finish purchase
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    expect(checkoutOverviewPage.isOnCheckoutOverviewPage()).toBeTruthy();
    await checkoutOverviewPage.finishPurchase();
});