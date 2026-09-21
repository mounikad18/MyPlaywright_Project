const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../../pageobjects/LoginPage');
//Json->string->js object
const dataset = require("../../utils/testdata.json");


test.describe('Login Tests', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
  });

  test('Valid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.validLogin(dataset.validLogin.username, dataset.validLogin.password);
    console.log('Login successful');
    console.log(await page.title());

  });

  test('Invalid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.invalidLogin(dataset.invalidLogin.username1, dataset.invalidLogin.password1);
    console.log('Invalid login attempted');

  });

});

test('logout test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.validLogin(dataset.validLogin.username, dataset.validLogin.password);
  await loginPage.logout();
  console.log('Logout successful');

});

