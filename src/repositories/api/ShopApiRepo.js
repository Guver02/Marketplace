class ShopApiRepo {
    
    async shopOne(id) {
        try {
            const prevPurchase = await fetch('api/v1/previous-purchase/onecheck',{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            credentials: 'include',
            body: JSON.stringify({
                productId: id
            })
        })

        if(prevPurchase.error) throw prevPurchase.error

        const {purchaseId, totalPrice} = await prevPurchase.json()

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
        if(data.error) throw data.error
        
        return data

        } catch (error) {
            throw error
        }
    }
}

export {ShopApiRepo}