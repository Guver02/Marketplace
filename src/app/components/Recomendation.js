import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { ItemsContext } from '../providers/ItemsContex';
import './Recomendation.css';





function Recomendation () {
    const {products} = useContext(ItemsContext)
    const data = products

    const handleBuyNow = async (item) => {
        console.log(item)
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
    
            const res = await fetch('/api/v1/checkouts/create-payment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    price: item.price,
                    purchaseid : purchaseData.id
                }),
    
            })
            const data = await res.json()
            console.log(data.href)
            window.location.replace(data.href);
        } catch (error) {
            console.log(error);
        }
        

    }

    const addToCart = async (id) => {
        alert('agregado al carrito :D')
        
        if (localStorage.getItem('myCartItems') === null) {
            console.log('Creando')
          localStorage.setItem('myCartItems', '[]');
        }
        
        await fetch('api/v1/shoppingcart/add-product', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                productid: id
            })
        })

        const myString = localStorage.getItem('myCartItems')
        console.log('string', myString)
        const myItems = JSON.parse(myString)
    
        console.log('array',myItems)
        myItems.push(item)
        const myNewString = JSON.stringify(myItems)
    
        localStorage.setItem('myCartItems', myNewString)
        
      } 

    return(
        <div className='recomendationContainer'>
            <h1>Our Products</h1>

            <div className='productsRecomendation'>
                { data &&
                data.map((elem, i) => {
                    if (i != 0){
                        return(
                        <div  className='itemRecomendation' key={elem.id}>
                            <Link to={`/${elem.id}`} >
                            <div className='img-container'>
                            <img alt={elem.product} src={elem.image}></img>
                            </div>
                            </Link>
                            <div className='informationItem'>

                            <span>{elem.product}</span>

                            <div className='dataItem'>
                                <div>
                                <span>{`${elem.price}$`}</span>
                                <span>{`${elem.quantity} Disponibles`}</span>
                                </div>
                                
                                
                                
                                <div  
                                onClick={() => addToCart(elem.id)}>
                                <span className="material-symbols-outlined">add_shopping_cart</span>
                                </div>
                                
                            </div> 

                            <div className='buy-button'>
                            <span 
                            onClick={() => {handleBuyNow(elem)}}>
                            BUY NOW</span>
                            </div>
                            
                            </div>
                            
                        </div>
                        )
                    }
                })
                }
                

            </div>
        </div>
    )
}

export {Recomendation}