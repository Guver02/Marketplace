import React, { useEffect, useState } from "react";
import './ProductInfo.css'

function ProductInfo ({values, functions}) {
    const {productId} = values
    const {setProductId} = functions
    const [data, setData] = useState(null)

    useEffect(() => {  
        fetch(`/api/v1/products/light/${productId}`)
      .then(res => res.json())
      .then((resParsed) => {
        setData(resParsed)
      })
    }, [productId])

    const chandgeId = (value) =>{
      if(value == 'right'){
        setProductId(parseInt(productId)  + 1)
      }else{
        setProductId(parseInt(productId)  - 1)
      }
      
    }

    return (<div className="productinfo-container">
        {data && 
        <>
        <span>{data.product}</span>
        <div>
            <div className="arrow-left"
            onClick={() => chandgeId('left')}>
              <span className="material-symbols-outlined">chevron_left</span>
            </div>
            <img src={data.image}></img>
            <div className="arrow-right"
            onClick={() => chandgeId('right')}>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
        </div>
        </>
        }
    </div>);
}

export {ProductInfo}