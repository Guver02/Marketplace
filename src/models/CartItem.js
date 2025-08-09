// domain/models/CartItem.js

class CartItem {
    constructor({ id, productId, quantity = 1, createdAt = new Date() }) {
        console.log({ id, productId, quantity, createdAt})

        if (!productId || typeof quantity !== "number") {
            throw new Error("Datos inválidos para CartItem");
        }

        this.id = id ?? null;
        this.productid = productId;
        this.quantity = quantity;
        this.createdat = new Date(createdAt);
    }

    toJSON() {
        return {
            id: this.id,
            productId: this.productId,
            quantity: this.quantity,
            createdAt: this.createdAt.toISOString(),
        };
    }


    static fromStorage(raw) {
        return new CartItem({
            ...raw,
            createdAt: raw.createdAt ?? new Date(),
        });
    }

    equals(other) {
        return other && this.productId === other.productId;
    }

    increase(qty = 1) {
        this.quantity += qty;
        return this;
    }

    decrease(qty = 1) {
        this.quantity = Math.max(this.quantity - qty, 1);
        return this;
    }
}

export { CartItem };
