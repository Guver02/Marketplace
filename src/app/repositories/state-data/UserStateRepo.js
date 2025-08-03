class UserStateRepo {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    setUserData(userData) {
        this.dispatch({ type: 'SET_USER_DATA', payload: userData });
    }

    setIsLoging() {
        this.dispatch({ type: 'SET_IS_LOGING' });
    }
}

export { UserStateRepo };
