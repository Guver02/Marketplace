import styles from './information.module.css';
import React from 'react';
function Information () {


    return(
        <div className={styles.informationContainer}>
            <div className={styles.cardInformation}>
            <span className="material-symbols-outlined">search</span>
            <div className={styles.cardDescription}>
                <span>Free Delivery</span>
                <span>Free shipping around the world for all orders over $120</span>
            </div>              
            </div>

            <div className={styles.cardInformation}>
            <span className="material-symbols-outlined">payments</span>    
            <div className={styles.cardDescription}>
                <span>Safe Payment</span>
                <span>Free shipping around the world for all orders over $120</span>
            </div>            
            </div>

            <div className={styles.cardInformation}>
            <span className="material-symbols-outlined">credit_card</span>     
            <div className={styles.cardDescription}>
                <span>Friendliy Services</span>
                <span>Free shipping around the world for all orders over $120</span>
            </div>            
            </div>
        </div>
    )
}

export {Information}