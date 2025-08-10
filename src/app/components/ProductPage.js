import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.css';
import { useParams } from 'react-router';
import {InputWithMessages} from './InputWithMessages'
import {useStore} from '../providers/ItemsContex'
import { useModal } from '../providers/ModalContext';
import { LoadingPurchase } from '../assets/LoadingPurchase';

const ProductPage = () => {
    const [tab, setTab] = useState('description');
    const [product, setProduct] = useState(null)
    const {addToCart, shopOneProduct} = useStore()
    const {openModal} = useModal()
    const { id } = useParams()

    useEffect(() => {
        fetch(`/api/v1/products/${id}`)
            .then(res => res.json())
            .then((resParsed) => {
                setProduct(resParsed)
            })

    }, [id])

    const handleAddToCart = () => {
        addToCart({
            productId : id,
            quantity : 1,
        })
    }

    const handleBuyNow = async () => {
        openModal(<LoadingPurchase/>)
        await shopOneProduct(id)
    }

    if (!product) return <></>

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                <div className={styles.imageSection}>
                    <img src={product.images[0].imageurl} alt={product.product} className={styles.mainImage} />
                    <div className={styles.thumbnails}>
                        {[1, 2, 3, 4].map((i) => (
                            <img key={i} src={product.image} alt={`thumb-${i}`} className={styles.thumb} />
                        ))}
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <span className={styles.category}>Men's Fashion</span>

                    <InputWithMessages values={{productId: id}}/>

                    <h1 className={styles.title}>{product.product}</h1>

                    <div className={styles.rating}>
                        <span>⭐ {product.rating}</span>
                        <span className={styles.reviewCount}>(245 reviews)</span>
                    </div>

                    <div className={styles.priceRow}>
                        <span className={styles.currentPrice}>${product.price}</span>
                        <span className={styles.oldPrice}>$60.00</span>
                    </div>

                    <p className={styles.shortDesc}>
                        {product.details.slice(0, 150)}...
                    </p>

                    <div className={styles.sizes}>
                        <button>30 ml</button>
                        <button>60 ml</button>
                        <button>80 ml</button>
                        <button>100 ml</button>
                    </div>


                    <div className={styles.actions}>
                        <button className={styles.addToCart}
                        onClick={handleAddToCart}>Add To Cart</button>
                        <button className={styles.buyNow}
                        onClick={handleBuyNow}>Buy Now</button>
                    </div>


                    <div className={styles.meta}>
                        <p><strong>SKU:</strong> GRF8564BHJ</p>
                        <p><strong>Tags:</strong> T-Shirt, Casual, Fashion</p>
                    </div>
                </div>
            </div>


            <div className={styles.tabs}>
                <button
                    className={tab === 'description' ? styles.active : ''}
                    onClick={() => setTab('description')}
                >
                    Description
                </button>
                <button
                    className={tab === 'info' ? styles.active : ''}
                    onClick={() => setTab('info')}
                >
                    Additional Information
                </button>
                <button
                    className={tab === 'review' ? styles.active : ''}
                    onClick={() => setTab('review')}
                >
                    Review
                </button>
            </div>

            <div className={styles.tabContent}>
                {tab === 'description' && (
                    <p>{product.details}</p>
                )}
                {tab === 'info' && (
                    <ul>
                        <li>Material: Cotton</li>
                        <li>Style: Casual Fit</li>
                        <li>Care: Machine wash</li>
                    </ul>
                )}
                {tab === 'review' && (
                    <p>⭐ 4.1 out of 5 – Based on 245 reviews.</p>
                )}
            </div>
        </div>
    );
};

export { ProductPage };
