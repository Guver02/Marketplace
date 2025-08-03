import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ItemsContext } from '../providers/ItemsContex';
import styles from './Recomendation.module.css';
import { ProductCard } from './ProductCard';

function Recomendation() {
    const { products } = useContext(ItemsContext);

    const handleBuyNow = async (item) => {
        console.log(item);
        try {
            const purchaseResponse = await fetch('api/v1/previous-purchase/generate', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productsPurchases: [item]
                })
            });
            const purchaseData = await purchaseResponse.json();

            const res = await fetch('/api/v1/checkouts/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: item.price,
                    purchaseid: purchaseData.id
                }),

            });
            const data = await res.json();
            console.log(data.href);
            window.location.replace(data.href);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className={styles.recomendationContainer}>
            <h1>Our Products</h1>

            <div className={styles.productsRecomendation}>
                {products && products.map((elem, i) => {
                    if (i !== 0) {
                        return (
                            <ProductCard key={elem.id} product={elem} />
                        );
                    }
                })}
            </div>
        </div>
    );
}

export { Recomendation };
