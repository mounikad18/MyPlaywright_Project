//const {test, expect} = require('@playwright/test');
const { test, expect } = require('../../utils/login-fixture');
const {POManager} = require('../../pageobjects/POManager');
const testdata = require('../../utils/testdata.json');

 test('Product Checkout test', async ({authenticatedPage})=>
 {
   const poManager = new POManager(authenticatedPage);
    //authenticatedpage,Test starts from DashboardPage
    const productName = testdata.validLogin.productName;
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
 // To retrieve order ID from orders review page
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log("Product order ID: " + orderId);
// Navigate to orders history page and verify the order ID
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

 });
