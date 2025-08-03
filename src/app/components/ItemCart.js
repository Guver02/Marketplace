import React from 'react';
import styles from './ItemCart.module.css';
import { Trash2 } from 'lucide-react';
import { useStore } from '../providers/ItemsContex';

function ItemCart({item}) {
    const {removeFromCart} = useStore()

    return (
        <div className={styles.card}>

            <div className={styles.imageSection}>
                <img
                    src={item.image}
                    alt="ACID WASH T-shirt"
                    className={styles.image}
                />
            </div>

            <div className={styles.details}>
                <p className={styles.category}>T-shirts</p>
                <h3 className={styles.title}>{item.product}</h3>
                <p className={styles.text}>Size : Medium</p>
                <p className={styles.text}>Color : Blue grey</p>
                <div className={styles.badges}>
                    <span className={styles.discount}>Disc 30%</span>
                    <span className={styles.shipping}>Shipping today</span>
                </div>
                <div className={styles.quantity}>
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>
                <div className={styles.footer}>
                    <span className={styles.price}>{`$ ${item.price}`}</span>
                    <span className={styles.originalPrice}>$20.00</span>
                    <Trash2 onClick={() => removeFromCart(item.id)}/>
                </div>
            </div>
            
        </div>
    );
};

export { ItemCart };
