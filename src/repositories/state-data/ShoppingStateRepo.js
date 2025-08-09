import { CartItem } from "../../models/CartItem";

class ShoppingStateRepo {
    constructor(dispatch) {
        this.dispatch = dispatch; 
    }

    addToCart(item) {
        const cartItem = new CartItem(item)
        this.dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    }

    removeFromCart(productId) {
        console.log('a borrar: ', productId)
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
