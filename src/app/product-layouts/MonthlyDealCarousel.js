import React from "react";
import styles from "./MonthlyDealCarousel.module.css";
import common from "./common/EntrySections.module.css"
import { useIntersection } from "../custom-hooks/useIntersection";

function MonthlyDealCarousel({ products }) {
    const [productsElem, productsIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    })


    return (
        <section className={styles.carousel}>
            <h2>Promoción del mes</h2>
            <div className={`${styles.track} ${common.hidden} ${productsIsIntersecting ? common.show : ''}`} ref={productsElem}>
                {products.map((product) => (
                    <div key={product.id} className={styles.slide}>
                        <img src={product.images[0]?.imageurl} alt={product.product} />
                        <p>{product.product}</p>
                        <div className={styles.prices}>
                            <span className={styles.oldPrice}>${product.price}</span>
                            <span className={styles.newPrice}>${product.quantity}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export { MonthlyDealCarousel };
