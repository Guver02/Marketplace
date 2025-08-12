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
import { ImageUploadPanel } from './panel-components/ImageUploadPanel';
import { Unauthorized } from './auth-component/Unauthorized'
import { ProtectedRoute } from './auth-component/ProtectedRoute';
import { UsersTable } from './admin-components/UsersTable';
import { PaymentSuccess } from './shop-pages/PaymentSuccess';
import { PaymentCancelled } from './shop-pages/PaymentCancelled';
import { SellerDashboard } from './panel-components/SellerDashboard';

function App() {

    return (
        <ItemsContextProvider>
            <ModalProvider>
                <Routes>
                    <Route path='/' element={<Layout><Home/></Layout>}/>
                    <Route path='/:id' element={<Layout><ProductPage/></Layout>} />
                    <Route path='/categories/:id' element={<Layout><CategoryPage/></Layout>}/>

                    <Route path='/login' element={<Login />}/>
                    <Route path='/signup' element={<Signup />}/>

                    <Route path='/unauthorized' element={<Unauthorized/>}/>
                    <Route path='/success/:id' element={<PaymentSuccess/>}/>
                    <Route path='/cancel' element={<PaymentCancelled/>}/>
                    
                    <Route path='/seller' element={<ProtectedRoute arrRole={['seller']}><SellerDashboard/></ProtectedRoute>}/>

                    <Route path='/admin' element={<UsersTable/>}/>

                </Routes>
            </ModalProvider>
        </ItemsContextProvider>
    )
}

export { App };