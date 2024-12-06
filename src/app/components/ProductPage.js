import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { InputWithMessages } from "./InputWithMessages";

import './ProductPage.css'
import { Navbar } from "../UI-components/Navbar";
import SliderColors from "./SliderColors";
  
function ProductPage () {  
 
  const [data, setData] = useState(null)
  
  const {id} = useParams()

    useEffect(() => {

      fetch(`/api/v1/products/${id}`)
      .then(res => res.json())
      .then((resParsed) => {
        console.log(resParsed)
        setData(resParsed)
      })
      
    }, [id])

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

  const addToCart = (item) => {
    alert('agregado al carrito :D')
    
    if (localStorage.getItem('myCartItems') === null) {
        console.log('Creando')
      localStorage.setItem('myCartItems', '[]');
    }
   

    const myString = localStorage.getItem('myCartItems')
    console.log('string', myString)
    const myItems = JSON.parse(myString)

    console.log('array',myItems)
    myItems.push(item)
    const myNewString = JSON.stringify(myItems)

    localStorage.setItem('myCartItems', myNewString)
    
  } 


    return (<>
        <Navbar/>

        <div className='container-product-page'>

        <div className="product-images">
        <img src={data?.image}></img>

        {/*<div>
        <img src={data?.image}></img>
        <img src={data?.image}></img>
        <img src={data?.image}></img>
    </div>*/}
        </div>

        <div className="product-details-container">
          <div className="product-details">
          <span>⭐️⭐️⭐️⭐️⭐️</span>
          <span className="title">{data?.product}</span>
          <span className="price">{`$ ${data?.price}`}</span>

          <InputWithMessages values= {{productId: id}}/>

          
          </div>
        
          <div>
          <span className="index-options">COLORES</span>
            {
              data ? 
              <SliderColors values={{myColors: data.myColors}}/>
              :
              <></>
            }
            
            <div className="options-container">
            <span className="index-options">DETALLES</span>
            <span className="details">{data?.details}</span>
            </div>

            <div className="buttons-container">
            <button onClick={() => handleBuyNow(data)}>BUY NOW</button>
            <button onClick={() => addToCart(data)}>ADD TO CART</button>
            </div>
          </div>
        </div>
        
        </div>
    </>
    );
  }

  export {ProductPage}