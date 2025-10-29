import React, { useContext, useEffect, useState } from 'react';
import styles from './ShoppingCart.module.css'
import { useStore } from '../providers/ItemsContex';
import { ItemCart } from './ItemCart';
import { Spinner } from '../assets/Spinner';
import { useModal } from '../providers/ModalContext';
import { LoadingPurchase } from '../assets/LoadingPurchase';

function ShoppingCart() {
    const [items, setItems] = useState(null)
    const { shoppingCart, isLoging, shopShoppingCart } = useStore()
    const { openModal } = useModal()

    const getPurchase = async () => {
        openModal(<LoadingPurchase />)
        await shopShoppingCart()
    }

    useEffect(() => {
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
            })
            const products = res.json()
            return products
        }

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

    if (!items) return <Spinner />

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