import React from 'react';
import { useState } from "react"

import styles from './shoppingCart.module.css'

function ShoppingCart () {
  

    if (localStorage.getItem('myCartItems') === null) {
      console.log('Creando')
    localStorage.setItem('myCartItems', '[]');
  }
  const myJson = JSON.parse(localStorage.getItem('myCartItems'))
const [inCart, setInCart]  = useState(myJson)

  const deleteToCart = (id) => {
    const newCart = inCart.filter((elem) => {
      return elem.id != id
    })
    setInCart(newCart)

    localStorage.setItem('myCartItems', JSON.stringify(newCart))
  }

  const buyCart = async () => {
    
  await fetch('api/v1/shoppingcart/clear', {
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
      productsPurchases: inCart
    })
    })
  const purchaseData = await purchaseResponse.json()
  console.log(purchaseData)

    let price = 0 
    inCart.map((elem) => {
      price = price + elem.price
      console.log(price)
    })

    
  const res = await fetch('/api/v1/checkouts/create-payment',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        price: price.toFixed(2),
        purchaseid : purchaseData.id
      }),

  })

  const data = await res.json()

  
  console.log(data.href)
  window.location.replace(data.href);
  }

  

    return(
        <div className={styles.shoppingCartContainer}>
           {
            inCart.map((elem) => {
                return (
                    <div key={elem.id}>
                        <div>
                            <img alt={elem.product} src={elem.image}></img>
                            <span>{elem.product}</span>
                        </div>
                        <div>
                            <span>{elem.price}</span>
                            <span className="material-symbols-outlined"
                            onClick={() => deleteToCart(elem.id)}>delete</span>
                        </div>
                    </div>
                )
            }) 
           }
           <div onClick={() => buyCart()}>Comprar Carrito</div>
        </div>
    )
}

export {ShoppingCart}