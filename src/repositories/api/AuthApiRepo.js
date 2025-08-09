class AuthApiRepo {

    async login(credentials) {
        try {
            const res = await fetch('/api/v1/auth/login', {//se obtiene la cookie
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (res.status === 200) {
                const data = await res.json();
                return data;
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error en login');
            }
        } catch (error) {
            throw error; //para que quien llame pueda capturarlo
        }
    }

    async signup(credentials) {

    }

    async logout() {
        try {
            const res = await fetch('/api/v1/auth/logout', {
            method: 'GET',
            credentials: 'include'
        })

        if (res.status === 200) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Error en logout');
        }
        } catch (error) {
            throw error;   
        }
    }
}

export { AuthApiRepo };
