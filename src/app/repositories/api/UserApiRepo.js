class UserApiRepo {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async login(credentials) {
        const response = await this.apiClient.post('/auth/login', credentials);
        return response.data;
    }

    async getProfile(token) {
        const response = await this.apiClient.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    async logout(token) {
        const response = await this.apiClient.post('/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
}

export { UserApiRepo };
