import React, { useState } from 'react';
import styles from './DetailsCard.module.css';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const DetailsCard = ({downIsIntersecting}) => {
    const [quantity, setQuantity] = useState(2);
    const price = 36.0;
    const total = (price * quantity).toFixed(2);

    const handleIncrease = () => setQuantity(q => q + 1);
    const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <div className={`${styles.card} ${downIsIntersecting ? styles.hiddenCard : ''}`}>
            <div className={styles.pricingOptions}>
                <div>
                    <p>One time purchase</p>
                    <span className={styles.price}>£36.00</span>
                </div>
                <div>
                    <p>Subscribe and save</p>
                    <span className={styles.discount}>£75.00</span>
                </div>
                <div className={styles.quantity}>
                    <label>Quantity</label>
                    <div className={styles.counter}>
                        <button onClick={handleDecrease}><Minus size={16} /></button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease}><Plus size={16} /></button>
                    </div>
                </div>
            </div>

            <p className={styles.guarantee}>90-Day confirmed money back guaranteed</p>

            <div className={styles.actionRow}>
                <div className={styles.total}>£{total}</div>
                <button className={styles.addToCart}>
                    <ShoppingCart size={16} />
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export { DetailsCard };
