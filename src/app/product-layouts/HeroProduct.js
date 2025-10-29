import React from "react";
import styles from "./HeroProduct.module.css";
import common from "./common/EntrySections.module.css"
import { useIntersection } from "../custom-hooks/useIntersection";

function SplitText({ text }) {
  const words = text.split(" ");
  const middle = Math.ceil(words.length / 2);
  const firstLine = words.slice(0, middle).join(" ");
  const secondLine = words.slice(middle).join(" ");

  return (
    <>
      <h1>{firstLine}</h1>
      <h1>{secondLine}</h1>
    </>
  );
}

function HeroProduct({ products }) {
    const product = products[0]

    const [sectionElem, sectionIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    })

    return (
        <section className={`${styles.hero} ${common.hidden} ${sectionIsIntersecting ? common.show : ''}`} ref={sectionElem}>

            <div className={styles.image}>
                <img src={product.images[0]?.imageurl} alt={product.product} />
            </div>

            <div className={styles.info}>
                <div className={styles.content}>
                    <SplitText text={product.product}/>
                    <p>{product.details}</p>
                    <button className={styles.buyButton}>Comprar ahora</button>
                </div>

                <div className={styles.priceTag}>${product.price}</div>
            </div>
        </section>
    );
}

export { HeroProduct };
