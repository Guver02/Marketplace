import React, { useState } from 'react';
import styles from './Wishlist.module.css';
import { ShoppingCart, Trash2, ArrowRight, StarOff } from 'lucide-react';

const initialProducts = [
    {
        id: 1,
        name: 'Zapatillas Running Nike',
        price: 89.99,
        image: 'https://via.placeholder.com/100x100?text=Nike',
    },
    {
        id: 2,
        name: 'Camisa Casual Hombre',
        price: 49.99,
        image: 'https://via.placeholder.com/100x100?text=Camisa',
    },
    {
        id: 3,
        name: 'Mochila Urbana Negra',
        price: 69.99,
        image: 'https://via.placeholder.com/100x100?text=Mochila',
    },
];

const Wishlist = () => {
    const [products, setProducts] = useState(initialProducts);

    const removeItem = (id) => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
    };

    const addToCart = (id) => {
        alert(`Producto ${id} agregado al carrito`);
    };

    const buyNow = (id) => {
        alert(`Redirigiendo para comprar el producto ${id}`);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Mi Wishlist</h2>
            {products.length === 0 ? (
                <p className={styles.empty}>Tu wishlist está vacía 💤</p>
            ) : (
                <div className={styles.list}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.item}>
                            <img src={product.image} alt={product.name} className={styles.image} />
                            <div className={styles.info}>
                                <span className={styles.name}>{product.name}</span>
                                <span className={styles.price}>${product.price.toFixed(2)}</span>
                                <div className={styles.actions}>
                                    <button onClick={() => addToCart(product.id)} className={styles.iconButton}>
                                        <ShoppingCart size={18} />
                                        <span>Agregar</span>
                                    </button>
                                    <button onClick={() => buyNow(product.id)} className={styles.buyButton}>
                                        <ArrowRight size={18} />
                                        <span>Comprar</span>
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => removeItem(product.id)} className={styles.removeButton}>
                                <StarOff size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export {Wishlist};
