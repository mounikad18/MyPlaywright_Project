const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { LoginPage } = require('../pageobjects/LoginPage');
const testData = require('../utils/testdata.json');
const assert = require('assert');

let browser;
let page;
let loginPage;

Given('I open the login page', async function () {

    browser = await chromium.launch({
        headless: false
    });

    page = await browser.newPage();

    loginPage = new LoginPage(page);

    await loginPage.goTo();
});

When('I login with valid credentials', async function () {

    await loginPage.validLogin(testData.validLogin.username,testData.validLogin.password
    );
});

Then('I should be redirected to the dashboard', async function () {

    await page.waitForLoadState('networkidle');

    assert.ok(page.url().includes('/dashboard'));

    await browser.close();
});