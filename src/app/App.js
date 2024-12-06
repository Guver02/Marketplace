import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { Home } from './components/Home';
import { ItemsContextProvider } from './providers/ItemsContex';
import { ProductPage } from './components/ProductPage';

import { CategoryPage } from './components/CategoryPage';


function App () {

    return(
      <ItemsContextProvider>
        <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/:id' element={<ProductPage/>}/>
                <Route path='/categories/:id' element={<CategoryPage/>}/>
                
        </Routes>
        </ItemsContextProvider>
    )
}

export {App};

/**  const vpHeight = window.innerHeight;
        const style = document.createElement("style");
        style.innerHTML = `:root {
          --vp-height: ${vpHeight}px;
        }`;
        document.head.appendChild(style);
 */