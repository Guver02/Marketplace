import styles from './page.module.css';
import { Information } from "./Information";
import { Recomendation } from "./Recomendation";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ItemsContext } from '../providers/ItemsContex';
import { SliderCategories } from './SliderCategories';
import { animateScrollTo } from '../../utils/UtilFunctions';
import { useIntersection } from '../custom-hooks/useIntersection';
import { DetailsCard } from './DetailsCard';
import ProductInformation from './ProductInformation';

function Home() {
    const { products } = useContext(ItemsContext)
    const data = products[0]
    const scrollPoint = window.innerHeight - (window.innerHeight / 100) * 7 - 8;

    const [downIsIntersecting, setDownIsIntersecting] = useState(false)

    const principalContainer = useRef(null)

    const [bannerElem, bannerIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.1 //el 10% del elemento
    })

    const [sliderElem, sliderIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.01 //el 1% del elemento
    })

    useEffect(() => {
        if (downIsIntersecting) animateScrollTo(scrollPoint, principalContainer)
    }, [downIsIntersecting])

    useEffect(() => {
        if (bannerIsIntersecting) {
            animateScrollTo(0, principalContainer)
            setTimeout(() => {
                setDownIsIntersecting(false)
            }, 800)
        }
    }, [bannerIsIntersecting])

    useEffect(() => {
        if (sliderIsIntersecting) setDownIsIntersecting(true)
    }, [sliderIsIntersecting])

    return (
        <div className={styles.container}
            ref={principalContainer}>

            <div className={styles.colorsContainer} ref={bannerElem}>
                <div className={styles.topColor}></div>
                <div className={styles.bottomColor}></div>

                <div className={styles.banner} >

                    <div className={styles.productImage}>
                        <img className={`${styles.principalImg} ${downIsIntersecting ? styles.hiddenImg : ''}`}
                            alt={data.product}
                            src='/assets/maceta6.png'></img>
                    </div>

                    <div className={styles.productInfo}>
                        <ProductInformation />
                        <DetailsCard downIsIntersecting={downIsIntersecting} />
                    </div>

                </div>
            </div>

            <div ref={sliderElem}>
                <SliderCategories setIsIntersecting={setDownIsIntersecting} />
                <Information />
                <Recomendation />
            </div>

        </div>
    );
}

export { Home }

