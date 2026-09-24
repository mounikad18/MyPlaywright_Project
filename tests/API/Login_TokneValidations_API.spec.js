const { test, expect } = require('@playwright/test');
const { LoginAPI } = require('../../pageobjects/Login_API');
const testData = require('../../utils/testdata.json');


test('Valid Login API - Token can access protected API', async ({ request }) => {

    const loginAPI = new LoginAPI(request);

    const response = await loginAPI.login(testData.validLogin.username,testData.validLogin.password);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeTruthy();

    const protectedResponse = await request.get('/api/ecom/order/get-orders-for-customer/yourCustomerId',
        {
            headers: 
            {
                Authorization: `Bearer ${body.token}`
            }
        }
    );

    expect(protectedResponse.status()).toBe(200);
});