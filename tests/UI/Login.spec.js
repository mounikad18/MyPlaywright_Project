 const {test, expect} = require('@playwright/test');

 const {LoginPage} = require('../../pageobjects/LoginPage');
 //Json->string->js object
 const dataset =  require("../../utils/testdata.json");

 
 test(`Client App login `, async ({page})=>
 {
   const loginPage = new LoginPage(page);
    //js file- Login js, DashboardPage
     
     
     await loginPage.goTo();
     await loginPage.validLogin(dataset.validLogin.username,dataset.validLogin.password);
     console.log("Login successful");
     console.log(await page.title());

});
// invalid login test using UI

test(`Client App Invalid login `, async ({page})=>
 {
   const loginPage = new LoginPage(page);
    //js file- Login js, DashboardPage
     
     
     await loginPage.goTo();
     await loginPage.invalidLogin(dataset.invalidLogin.username1,dataset.invalidLogin.password1);
     console.log("Invalid login attempted");
   

});

