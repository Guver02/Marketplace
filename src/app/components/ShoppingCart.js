import React, { useContext, useEffect, useState } from 'react';
import styles from './ShoppingCart.module.css'
import { useStore } from '../providers/ItemsContex';
import { ItemCart } from './ItemCart';
import { Spinner } from '../assets/Spinner';

function ShoppingCart() {
    const [items, setItems] = useState(null)
    const { shoppingCart, isLoging } = useStore()

    const getPurchase = async () => {
        /* await fetch('api/v1/shoppingcart/clear', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }) */

        const purchaseResponse = await fetch('api/v1/previous-purchase/generate', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        
        const {purchaseId, totalPrice} = await purchaseResponse.json()
        console.log(purchaseId, totalPrice)

        const res = await fetch('/api/v1/checkouts/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: totalPrice.toFixed(2),
                purchaseid: purchaseId
            }),

        })

        const data = await res.json()
        window.location.replace(data.href);
    }
    
    const getProducts = async () => {
        const ids = shoppingCart.map((elem) => {
            return elem.productid
        })

        const res = await fetch('api/v1/products/by-ids', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: ids
            }),
            credentials: 'include',
        })
        const products = res.json()
        return products
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts()

            const data = shoppingCart.map((elem) => ({
                ...elem,
                productData: products[elem.productid]
            }))
   
            setItems(data)
        }
        
        fetchProducts()
    }, [shoppingCart])

    const buyCart = async () => {
        if (isLoging) getPurchase()
        else alert('Inicia sesion Primero')
    }

    if (!items) return <Spinner/>

    return (
        <div className={styles.shoppingCartContainer}>
            <div>
                {items.map((elem) => {
                    return <ItemCart key={elem.productData.id} item={elem} />
                })}
            </div>

            <button className={styles.buyButton} 
            onClick={() => buyCart()}>Comprar Carrito</button>
        </div>
    )
}

export { ShoppingCart }

/**
 * 
 */