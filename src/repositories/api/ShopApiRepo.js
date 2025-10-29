class ShopApiRepo {

    async shopOne(id) {
        try {
            const res = await fetch('api/v1/purchase/product', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'x-client-origin': window.location.origin
                },
                credentials: 'include',
                body: JSON.stringify({
                    productId: id
                })
            })

            const data = await res.json()
            if (data.error) throw data.error

            return data

        } catch (error) {
            throw error
        }
    }

    async shopCart() {
        try {
            const res = await fetch('api/v1/purchase/cart', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'x-client-origin': window.location.origin,
                },
                credentials: 'include'
            })

            const data = await res.json()
            if (data.error) throw data.error

            return data
        } catch (error) {
            throw error
        }
    }
}

export { ShopApiRepo }