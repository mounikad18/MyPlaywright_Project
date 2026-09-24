const { test, expect } = require('@playwright/test');
const { LoginAPI } = require('../../pageobjects/Login_API');
const testData = require('../../utils/testdata.json');

test.describe('Login API Tests', () => {

    test('Valid Login API', async ({ request }) => {

        const loginAPI = new LoginAPI(request);

        const response = await loginAPI.login(testData.validLogin.username, testData.validLogin.password);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.message).toBe('Login Successfully');
        expect(body.token).toBeTruthy();
        expect(body.userId).toBeTruthy();
    });
    
    // Additional test cases can be added here for other scenarios like SQL injection, XSS, etc.

    test('Invalid Login API with SQL injection attempt', async ({ request }) => {

        const loginAPI = new LoginAPI(request);

        const response = await loginAPI.login("' OR '1'='1", testData.invalidLogin.password1);

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.message).toBe('Incorrect email or password.');
    });
    test('Invalid Login API with XSS attempt', async ({ request }) => {

        const loginAPI = new LoginAPI(request);

        const response = await loginAPI.login("<script>alert('XSS')</script>", testData.invalidLogin.password1);

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.message).toBe('Incorrect email or password.');
    });

    // Additional test cases can be added here for other scenarios like rate limiting, account lockout, etc.

    test('Invalid Login API with rate limiting', async ({ request }) => {

        const loginAPI = new LoginAPI(request);

        for (let i = 0; i < 10; i++) {
            await loginAPI.login(testData.invalidLogin.username1, testData.invalidLogin.password1);
        }

        const response = await loginAPI.login(testData.invalidLogin.username1, testData.invalidLogin.password1);

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.message).toBe('Incorrect email or password.');
    });

    test('Invalid Login API with account lockout', async ({ request }) => {

        const loginAPI = new LoginAPI(request);

        for (let i = 0; i < 5; i++) {
            await loginAPI.login(testData.invalidLogin.username1, testData.invalidLogin.password1);
        }

        const response = await loginAPI.login(testData.invalidLogin.username1, testData.invalidLogin.password1);

        expect(response.status()).toBe(400); // Assuming 403 is the status code for account lockout

        const body = await response.json();

        expect(body.message).toBe('Incorrect email or password.');
    });

    //test case with valid login, and click on the back button in the browser and verify that user is not able to access the dashboard page without login again
    test('Valid Login API and browser back button test', async ({ request, page }) => {

        const loginAPI = new LoginAPI(request);

        const response = await loginAPI.login(testData.validLogin.username, testData.validLogin.password);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.message).toBe('Login Successfully');
        expect(body.token).toBeTruthy();
        expect(body.userId).toBeTruthy();

        // Now navigate to the dashboard page
        await page.goto('https://rahulshettyacademy.com/client/dashboard');
        console.log('Navigated to dashboard page');
        console.log(await page.title());

        // Click on the back button in the browser
        await page.goBack();

        // Verify that user is not able to access the dashboard page without login again
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/login');
    
        console.log(await page.title());
    });

    
});