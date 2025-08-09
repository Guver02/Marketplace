import React, { useEffect, useState } from "react";

function useShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState([])
    const [loading, setLoading] = useState(true)

    const cartFromApi = async () => {
        console.log('cartFromApi')
        const cartRes = await fetch('/api/v1/shoppingcart/my-cart', {
            method: 'GET',
            credentials: 'include'
        })

        const cartData = await cartRes.json()
        
        setShoppingCart(cartData)
    }

    const cartFromLocalStorage = () => {
        console.log('cartFromLocalStorage')
        if(localStorage.getItem('cart') === null) localStorage.setItem('cart', '[]')
        const localCart = JSON.parse(localStorage.getItem('cart'))
        setShoppingCart(localCart)
    }

    const cartError = (error) => {
        console.error('Error al cargar carrito', error);
        setShoppingCart([]);
    } 

    const loadCart = async () => {
        try {
            const authRes = await fetch('/api/v1/auth/status', {
                method: 'GET',
                credentials: 'include'
            })
            const res = await authRes.json()

            if (authRes.ok && res.loggedIn) {
                await cartFromApi()
            } else {
                cartFromLocalStorage()
            }

        } catch (error) {
            cartError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCart()
    }, [])

    return [shoppingCart, loading]
}

export { useShoppingCart }