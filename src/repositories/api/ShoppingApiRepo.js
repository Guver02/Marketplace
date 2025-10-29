// repositories/api/ShoppingApiRepo.js
import { CartItem } from "../../models/CartItem";

const BASE_URL = '/api/v1/shoppingcart';

class ShoppingApiRepo {

    async addToCart(product) {
        const item = new CartItem(product);
        await fetch(BASE_URL + '/item/' + item.productid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity: item.quantity}),
            credentials: 'include'
        });
    }

    async remove(productId) {
        await fetch(`${BASE_URL}/item/${productId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
    }

    async clear() {
        await fetch(`${BASE_URL}/clear`, {
            method: 'DELETE',
            credentials: 'include'
        });
    }
}

export { ShoppingApiRepo };
