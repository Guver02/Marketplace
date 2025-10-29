import React from "react";
import styles from "./NewSeasonGrid.module.css";
import common from "./common/EntrySections.module.css"
import { ShoppingCart } from "lucide-react";
import { useIntersection } from "../custom-hooks/useIntersection";

function NewSeasonGrid({ products }) {
    const [productsElem, productsIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    })

    return (
        <section className={styles.grid}>
            <h2>Novedades de la temporada</h2>

            <div className={`${styles.products} ${common.hidden} ${productsIsIntersecting ? common.show : ''}`} ref={productsElem}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <img src={product.images[0]?.imageurl} alt={product.product} />

                        <div className={styles.info}>
                            <span className={styles.productName}>{product.product}</span>
                            <span className={styles.productPrice}>${product.price}</span>
                            <button className={styles.buyButton}>
                                <span>Comprar</span>
                                <ShoppingCart height={14} width={14}/>
                            </button>
                        </div>
                        
                    </div>
                ))}
            </div>
        </section>
    );
}

export { NewSeasonGrid };
