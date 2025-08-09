import React from 'react';
import styles from './ProductCard.module.css';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import {useStore} from '../providers/ItemsContex'

const ProductCard = ({ product }) => {
    const {addToCart} = useStore()
    const navigate = useNavigate()

    const handleProduct = () => {
        navigate(`/${product.id}`)
    }

    const handleAddToCart = async (event) => {
        event.stopPropagation();

        addToCart({
            productId : product.id,
            quantity : 1,
            })
    }

    return (
        <div className={styles.card}
            onClick={handleProduct}>

            <div className={styles.imageContainer}>
                <img src={product.images[0].imageurl} alt={product.product} className={styles.image} />
            </div>

            <div className={styles.info}>

                <div className={styles.header}>
                    <h2 className={styles.title}>{product.product}</h2>
                    <p className={styles.description}>
                        Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday
                    </p>
                </div>

                <div className={styles.footer}>
                    <span className={styles.price}>${product.price}</span>
                    <button className={styles.button}
                        onClick={handleAddToCart}>
                        <ShoppingCart />
                        <span>Add to cart</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export { ProductCard };
