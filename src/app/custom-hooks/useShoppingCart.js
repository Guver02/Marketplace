import React, { useEffect, useState } from "react";

function useShoppingCart({setIsLoging}) {
    const [shoppingCart, setShoppingCart] = useState([])
    const [loading, setLoading] = useState(true)

    const cartFromApi = async () => {
        const cartRes = await fetch('/api/v1/shoppingcart/my-cart', {
            method: 'GET',
            credentials: 'include'
        })

        const cartData = await cartRes.json()
        
        setIsLoging(true)
        setShoppingCart(cartData)
    }

    const cartFromLocalStorage = () => {
        if(localStorage.getItem('cart') === null) localStorage.setItem('cart', '[]')
        const localCart = JSON.parse(localStorage.getItem('cart'))
        setIsLoging(false)
        setShoppingCart(localCart)
    }

    const cartError = () => {
        console.error('Error al cargar carrito');
        setIsLoging(false);
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
                console.log('Logged in');
                await cartFromApi()
            } else {
                console.log('Not logged in');
                cartFromLocalStorage()
            }

        } catch (error) {
            cartError()
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