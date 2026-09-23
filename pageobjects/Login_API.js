class LoginAPI {

    constructor(request) {
        this.request = request;
        this.loginEndpoint = 'https://rahulshettyacademy.com/api/ecom/auth/login';
    }

    async login(username, password) {
        return await this.request.post(this.loginEndpoint, 
        {
            data: 
            {
                userEmail: username,
                userPassword: password
            }
        });
    }
}

module.exports = { LoginAPI };