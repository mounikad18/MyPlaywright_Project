
const base = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const testData = require('./testdata.json');

exports.test = base.test.extend({

    authenticatedPage: async ({ page }, use) => {

        // Create LoginPage object
        const loginPage = new LoginPage(page);

        // Navigate to login page
        await loginPage.goTo();

        // Login using test data
        await loginPage.validLogin(testData.validLogin.username,testData.validLogin.password);

        // At this point the user is authenticated and should be on the dashboard
        await page.locator('.card-body').first().waitFor();

        // Pass authenticated page to the test
        await use(page);
    },

    testData: async ({}, use) => 
    {
        await use(testData);
    }
});

exports.expect = base.expect;