import React from "react";
import styles from "./FullCatalogGrid.module.css";

function FullCatalogGrid({ products }) {
    return (
        <section className={styles.catalog}>
            <h2>Todos los productos</h2>
            <div className={styles.grid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <img src={product.images[0]?.imageurl} alt={product.product} />
                        <p>{product.product}</p>
                        <span>${product.price}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export { FullCatalogGrid };
