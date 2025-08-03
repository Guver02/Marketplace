import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.css';
import { useParams } from 'react-router';
import {InputWithMessages} from './InputWithMessages'

const ProductPage = () => {
    const [tab, setTab] = useState('description');


    const [product, setProduct] = useState(null)

    const { id } = useParams()

    useEffect(() => {

        fetch(`/api/v1/products/${id}`)
            .then(res => res.json())
            .then((resParsed) => {
                console.log(resParsed)
                setProduct(resParsed)
            })

    }, [id])

    const handleBuyNow = async (item) => {

        try {
            const purchaseResponse = await fetch('api/v1/previous-purchase/generate', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productsPurchases: [item]
                })
            })
            const purchaseData = await purchaseResponse.json()

            const res = await fetch('/api/v1/checkouts/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: item.price,
                    purchaseid: purchaseData.id
                }),

            })
            const data = await res.json()
            console.log(data.href)
            window.location.replace(data.href);
        } catch (error) {
            console.log(error);
        }

    }

    const addToCart = (item) => {
        alert('agregado al carrito :D')

        if (localStorage.getItem('myCartItems') === null) {
            console.log('Creando')
            localStorage.setItem('myCartItems', '[]');
        }


        const myString = localStorage.getItem('myCartItems')
        console.log('string', myString)
        const myItems = JSON.parse(myString)

        console.log('array', myItems)
        myItems.push(item)
        const myNewString = JSON.stringify(myItems)

        localStorage.setItem('myCartItems', myNewString)

    }

    if (!product) return <></>

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                <div className={styles.imageSection}>
                    <img src={product.image} alt={product.product} className={styles.mainImage} />
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
                        <button className={styles.addToCart}>Add To Cart</button>
                        <button className={styles.buyNow}>Buy Now</button>
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
