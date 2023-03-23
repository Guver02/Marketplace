import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { Home } from './components/Home';


function App () {

    return(
        <Routes>
                <Route path='/' element={<Home/>}/>
             
            </Routes>
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