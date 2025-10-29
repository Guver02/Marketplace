import React from "react";
import styles from "./Dupla.module.css";
import common from "./common/EntrySections.module.css"
import { useIntersection } from "../custom-hooks/useIntersection";

function Dupla({ products }) {
    const [ duplaElem, duplaIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    })

    if (!products || products.length < 2) {
        return null; // No renderizar si no hay al menos dos productos
    }

    const [main, gift] = products;

    return (
        <section className={`${styles.combo} ${common.hidden} ${duplaIsIntersecting ? common.show : ''}`} ref={duplaElem}>
            <div className={styles.leftPanel}>
                <h2 className={styles.heading}>
                    <span className={styles.headingLine}>RECOMENDACIÓN</span>
                    <span className={styles.headingLine}>PARA EL CLIENTE</span>
                </h2>
            </div>
            <div className={styles.rightPanel}>

                <div className={styles.card}>
                    <img src={main.images[0].imageurl} alt={main.product} className={styles.image} />
                    <div className={styles.info}>
                        <p className={styles.productName}>{main.product}</p>
                        <p className={styles.productPrice}>{`${main.price}$`}</p>

                        <button className={styles.buyButton}>Comprar ahora</button>
                    </div>
                </div>

                <div className={styles.card}>
                    <img src={gift.images[0].imageurl} alt={gift.product} className={styles.image} />
                    <div className={styles.info}>
                        <p className={styles.productName}>{gift.product}</p>
                        <p className={styles.productPrice}>{`${gift.price}$`}</p>

                        <button className={styles.buyButton}>Comprar ahora</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { Dupla };