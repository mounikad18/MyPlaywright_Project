class LoginPage {

constructor(page)
{
    this.page = page;
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.passWord = page.locator("#userPassword");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username,password)
{
    await  this.userName.fill(username);
     await this.passWord.fill(password);
     await this.signInbutton.click();
     await this.page.waitForLoadState('networkidle');

}

async invalidLogin(username1,password1)
{
    await  this.userName.fill(username1);
     await this.passWord.fill(password1);
     await this.signInbutton.click();
     await this.page.waitForLoadState('networkidle');
     const errorMessage = await this.page.locator("[class*='flyInOut']").textContent();
     console.log(errorMessage);
     return errorMessage;

}
}
module.exports = {LoginPage};