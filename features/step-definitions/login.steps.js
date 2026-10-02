const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pageobjects/LoginPage');
const testData = require('../utils/testdata.json');
const assert = require('assert');

let loginPage;

Given('I open the login page', async function () {

    loginPage = new LoginPage(this.page);

    await loginPage.goTo();
});

When('I login with valid credentials', async function () {

    await loginPage.validLogin(testData.validLogin.username,testData.validLogin.password);
});

Then('I should be redirected to the dashboard', async function () {

    await this.page.waitForLoadState('networkidle');

    assert.ok(this.page.url().includes('/dashboard'),`Expected dashboard URL, but got: ${this.page.url()}`);
});