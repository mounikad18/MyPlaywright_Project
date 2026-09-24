const { test, expect } = require('@playwright/test');
const { LoginAPI } = require('../../pageobjects/Login_API');
const testData = require('../../utils/testdata.json');

test('Invalid Login API', async ({ request }) => 
{

    const loginAPI = new LoginAPI(request);

    const response = await loginAPI.login(testData.invalidLogin.username1, testData.invalidLogin.password1);

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Incorrect email or password.');
});

test('Invalid Login API with empty credentials', async ({ request }) => 
{

    const loginAPI = new LoginAPI(request);

    const response = await loginAPI.login('', '');

    expect(response.status()).toBe(400);

    const body = await response.json();
    console.log("Login with empty credentials: " + body.message);

});

test('API Login with missing password', async ({ request }) => 
{

    const loginAPI = new LoginAPI(request);

    const response = await loginAPI.login(testData.validLogin.username, '');

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Password is required');
});
test('Invalid Login API with missing username', async ({ request }) => 
{

    const loginAPI = new LoginAPI(request);

    const response = await loginAPI.login('', testData.invalidLogin.password1);

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Email is required');
});

test('Invalid Login API with invalid email format', async ({ request }) => 
{

    const loginAPI = new LoginAPI(request);

    const response = await loginAPI.login('invalidemail', testData.invalidLogin.password1);

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Incorrect email or password.');
});

