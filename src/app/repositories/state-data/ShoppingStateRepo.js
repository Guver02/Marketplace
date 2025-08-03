class ShoppingStateRepo {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    addToCart(product) {
        this.dispatch({ type: 'ADD_TO_CART', payload: product });
    }

    removeFromCart(productId) {
        this.dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    }

    clearCart() {
        this.dispatch({ type: 'CLEAR_CART' });
    }

    setShoppingCart(products) {
        this.dispatch({ type: 'SET_SHOPPING_CART', payload: products });
    }
}

export { ShoppingStateRepo };
