import React, { useContext } from 'react';
import { ProductCard } from './ProductCard';
import styles from './ProductsGalery.module.css';
import { SliderCategories } from './SliderCategories';

function ProductsGalery ({values, functions}) {    
    const {data} = values

    return(
        <div className={styles.container}>
            <div className={styles.sliderContainer}>
                <SliderCategories/>
            </div>
            

            <div className={styles.productsRecomendation}>
                { data &&
                data.map((elem, i) => {
                    if (i != 0){
                        return <ProductCard key={elem.id} product={elem}/>
                    }
                })
                }
                

            </div>
        </div>
    )
}

export {ProductsGalery}