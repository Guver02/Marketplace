import React from 'react';
import { useState } from "react"
import {ShoppingCart} from "./ShoppingCart"

function CartButton (){
    const [modal, setModal] = useState(false)


    return(<>
        <span className="material-symbols-outlined"
              onClick={() => setModal(!modal)}>shopping_cart</span>

              {modal && 
                <ShoppingCart></ShoppingCart>
              

              }
              </>
    )
}

export {CartButton}