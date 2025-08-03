import React, { useContext, useEffect, useState } from 'react';
import styles from './ShoppingCart.module.css'
import { ItemsContext, useStore } from '../providers/ItemsContex';
import { ItemCart } from './ItemCart';
import { Spinner } from '../assets/Spinner';

async function getPurchase () {
    alert('Compra realizada')
}

function ShoppingCart() {
    const [items, setItems] = useState(null)
    const { shoppingCart, isLoging } = useStore()
    
    const getProducts = async () => {
        const ids = shoppingCart.map((elem) => {
            return elem.productId
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
                ...products[elem.productId]
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
                    return <ItemCart key={elem.id} item={elem} />
                })}
            </div>

            <button className={styles.buyButton} 
            onClick={() => buyCart()}>Comprar Carrito</button>
        </div>
    )
}

export { ShoppingCart }

/**
 * await fetch('api/v1/shoppingcart/clear', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })

        const purchaseResponse = await fetch('api/v1/previous-purchase/generate', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productsPurchases: shoppingCart
            })
        })
        const purchaseData = await purchaseResponse.json()

        let price = 0
        shoppingCart.map((elem) => {
            price = price + elem.price
            console.log(price)
        })

        const res = await fetch('/api/v1/checkouts/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: price.toFixed(2),
                purchaseid: purchaseData.id
            }),

        })

        const data = await res.json()
        window.location.replace(data.href);
 */