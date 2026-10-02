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

    
    
});