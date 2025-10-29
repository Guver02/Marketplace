import React from "react";
import styles from "./BestSellersGrid.module.css";
import common from "./common/EntrySections.module.css"
import { useIntersection } from "../custom-hooks/useIntersection";
import { useNavigate } from "react-router";

function BestSellersGrid({ products }) {
    const navigate = useNavigate()
    const [productsElem, productsIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    })

    const goToProduct = (id) => {
        navigate(`/${id}`)
    }


    return (
        <section className={styles.bestSellers}>
            <h2>Más vendidos</h2>
            
            <div className={`${styles.grid} ${common.hidden} ${productsIsIntersecting ? common.show : ''}`} ref={productsElem}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card} onClick={() => goToProduct(product.id)}>
                        <img src={product.images[0]?.imageurl} alt={product.product} />
                        <p>{product.product}</p>
                        <span>${product.price}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export { BestSellersGrid };
