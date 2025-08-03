import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import {ShoppingBag} from "lucide-react"
import {useModal} from "../providers/ModalContext"
import {ShoppingCart} from "../components/ShoppingCart"
import { useStore } from "../providers/ItemsContex";

function Navbar() {
    const {openModal} = useModal()
    const {isLoging, shoppingCart} = useStore()
    const navigate = useNavigate()

    const handleOpenCart = () =>  {
        openModal(<ShoppingCart/>)
    }    

    console.log(shoppingCart)

    return (
        <nav className="navContainer">

            <Link to={`/`}>
                <span className="logo">Plantae</span>
            </Link>

            <div className="options">
                <span className="item">MORE</span>
                <span className="item">WISHLIST</span>
                <span className="item">SEARCH</span>
            </div>

            <div className="rightOptions">
                {isLoging ?
                    <span className="item">ACCOUNT</span>
                    :
                    <button className="login-button"
                    onClick={() => navigate('/login')}>Iniciar Sesion</button>
                }
                <div className="item">
                    <ShoppingBag onClick={handleOpenCart}/>
                    <span className="counter">{shoppingCart.length}</span>
                </div>
                
            </div>

        </nav>
    );
}

export { Navbar }