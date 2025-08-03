import {CartItem} from "../../models/CartItem";

class ShoppingLocalRepo {
    constructor() {
    }

    getCart() {
        const raw = JSON.parse(localStorage.getItem("cart") || "[]");
        return raw.map(CartItem.fromStorage);
    }

    addToCart(product) {
        const cart = this.getCart();
        const existing = cart.find(p => p.equals(product));

        if (existing) {
            existing.increase(product.quantity);
        } else {
            cart.push(new CartItem(product));
        }

        this.saveCart(cart);
    }

    saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart.map(item => item.toJSON())));
    }

    remove(productId) {
        const updated = this.getCart().filter(item => item.productId !== productId);
        this.saveCart(updated);
    }

    clear() {
        localStorage.removeItem("cart");
    }
}

export { ShoppingLocalRepo };
