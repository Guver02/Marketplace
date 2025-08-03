import React from 'react';
import styles from './ProductInformation.module.css';
import { Star } from 'lucide-react';

const ProductInformation = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.headerRow}>
                <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#000" stroke="#000" />
                    ))}
                    <span className={styles.reviewCount}>786</span>
                </div>
                <div className={styles.price}>£86</div>
            </div>

            <h1 className={styles.title}>Ruby Rubber Tree</h1>
            <h2 className={styles.subtitle}>Ficus elastica ruby</h2>

            <p className={styles.description}>
                Dramatic darling! It'll be a staple in your home for years to come. The leaves of this plant have a unique,
                painted effect in coral pink and yellow.
            </p>
        </div>
    );
};

export default ProductInformation;
