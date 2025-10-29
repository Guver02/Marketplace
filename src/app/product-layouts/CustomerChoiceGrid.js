import React from "react";
import styles from "./CustomerChoiceGrid.module.css";
import common from "./common/EntrySections.module.css"
import { useIntersection } from "../custom-hooks/useIntersection";
import { useNavigate } from "react-router";
import { useStore } from "../providers/ItemsContex";

function CustomerChoiceGrid({ products }) {
    const navigate = useNavigate()
    const {addToCart} = useStore()
    const [productsElem, productsIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    })

    const goToProduct = (id) => {
        navigate(`/${id}`)
    }

    const addToShoppingCart = (event, id) => {
        event.stopPropagation()
        addToCart({
            productId: id,
            quantity: 1,
        })
    }

    return (
        <section className={styles.choice}>
            <h2>Elección de los clientes</h2>

            <div className={`${styles.grid} ${common.hidden} ${productsIsIntersecting ? common.show : ''}`} ref={productsElem}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card} onClick={() => goToProduct(product.id)}>

                        <img src={product.images[0]?.imageurl} alt={product.product} />

                        <div className={styles.info}>
                            <p>{product.product}</p>

                            <div className={styles.footer}>
                                <span>${product.price}</span>
                                <button className={styles.buyButton}
                                type="button"
                                onClick={(e) => addToShoppingCart(e, product.id)}>
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export { CustomerChoiceGrid };
