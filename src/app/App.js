import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home';
import { ItemsContextProvider } from './providers/ItemsContex';
import { ProductPage } from './components/ProductPage';

import { CategoryPage } from './components/CategoryPage';
import { Navbar } from './UI-components/Navbar';
import { ModalProvider } from './providers/ModalContext';
import { Login } from './auth-component/Login';
import { Signup } from './auth-component/Signup';
import { Layout } from './components/Layout'


function App() {

    return (
        <ItemsContextProvider>
            <ModalProvider>

         
                    <Routes>
                        <Route path='/' element={<Layout><Home/></Layout>} />
                        <Route path='/:id' element={<Layout><ProductPage/></Layout>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/signup' element={<Signup/>} /> 
                        <Route path='/categories/:id' element={<Layout><CategoryPage/></Layout>} />
                    </Routes>

                
            </ModalProvider>
        </ItemsContextProvider>
    )
}

export { App };