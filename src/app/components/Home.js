import { Information } from "./Information";
import { Recomendation } from "./Recomendation";
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../providers/ItemsContex';
import { SliderCategories } from './SliderCategories';
import { animateScrollTo } from '../../utils/UtilFunctions';
import { useIntersection } from '../custom-hooks/useIntersection';
import { DetailsCard } from './DetailsCard';
import ProductInformation from './ProductInformation';
import { useLayout } from './Layout';
import styles from './Home.module.css';

const scrollPoint = window.innerHeight - (window.innerHeight / 100) * 7 ;

function Home() {
    const [downIsIntersecting, setDownIsIntersecting] = useState(false)
    const { products, bestSellers } = useStore()
    const { setNavBarColor } = useLayout()

    const principalContainer = useRef(null)

    const [bannerElem, bannerIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.05 //el 10% del elemento
    })

    const [sliderElem, sliderIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 0.01 //el 1% del elemento
    })

    useEffect(() => {
        if (downIsIntersecting) {
            setNavBarColor('#9db496')
            animateScrollTo(scrollPoint, principalContainer)
        }
    }, [downIsIntersecting])

    useEffect(() => {
        if (bannerIsIntersecting) {
            setNavBarColor('#fff')
            animateScrollTo(0, principalContainer)
            setTimeout(() => {
                setDownIsIntersecting(false)
            }, 800)
        }
    }, [bannerIsIntersecting])

    useEffect(() => {
        if (sliderIsIntersecting) setDownIsIntersecting(true)
    }, [sliderIsIntersecting])


    if (products.length === 0) return (<div>No hay productos</div>)

    return (
        <div className={styles.container}
            ref={principalContainer}>

            <div className={styles.scrollContainer} ref={bannerElem}>
            <div className={styles.sliderBanner} >
            {
                bestSellers.map((bestSeller) => {
                    return (
                        <div className={styles.colorsContainer} key={bestSeller.id}>
                            <div className={styles.topColor}></div>
                            <div className={styles.bottomColor}></div>

                            <div className={styles.banner} >

                                <div className={styles.productImage}>
                                    <img className={`${styles.principalImg} ${downIsIntersecting ? styles.hiddenImg : ''}`}
                                        alt={bestSeller.product}
                                        src={bestSeller.images[0].imageurl}></img>
                                </div>

                                <div className={styles.productInfo}>
                                    <ProductInformation product={bestSeller}/>
                                    <DetailsCard downIsIntersecting={downIsIntersecting} />
                                </div>

                            </div>
                        </div>
                    )
                })
            }
            </div>
            </div>

            <div ref={sliderElem}>
                <SliderCategories setIsIntersecting={setDownIsIntersecting} />
                <Recomendation />
            </div>

        </div>
    );
}

export { Home }

