import { CartItem } from "../../models/CartItem";

class ShoppingApiRepo {
    constructor() {
    }

    getCart() {
        const raw = JSON.parse(localStorage.getItem("cart") || "[]");
        return raw.map(CartItem.fromStorage);
    }

    async addToCart(product) {
        await fetch('api/v1/shoppingcart/add-product', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productid: product.id
            })
        });
    }

    saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart.map(item => item.toJSON())));
    }

    remove(productId) {
        const updated = this.getCart().filter(item => item.id !== productId);
        this.saveCart(updated);
    }

    clear() {
        localStorage.removeItem("cart");
    }
}

export { ShoppingApiRepo };
