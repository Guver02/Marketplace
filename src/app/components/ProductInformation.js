import React from 'react';
import styles from './ProductInformation.module.css';
import { Star } from 'lucide-react';

function ProductInformation ({product}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.headerRow}>
                <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#000" stroke="#000" />
                    ))}
                    <span className={styles.reviewCount}>{product.quantity}</span>
                </div>
                <div className={styles.price}>{`£${product.price}`}</div>
            </div>

            <h1 className={styles.title}>{product.product}</h1>
            <h2 className={styles.subtitle}>Ficus elastica ruby</h2>

            <p className={styles.description}>
                {product.details}
            </p>
        </div>
    );
};

export default ProductInformation;
