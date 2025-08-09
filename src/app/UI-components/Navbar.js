import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import {ShoppingBag} from "lucide-react"
import {useModal} from "../providers/ModalContext"
import {ShoppingCart} from "../components/ShoppingCart"
import { useStore } from "../providers/ItemsContex";
import { Wishlist } from "../wishlist-components/Wishlist";
import { SearchPanel } from "../search-components/SearchPanel";
import { UserProfile } from "./UserProfile";

function Navbar() {
    const {openModal} = useModal()
    const {isLoging, shoppingCart} = useStore()
    const navigate = useNavigate()

    const handleOpenCart = () =>  {
        openModal(<ShoppingCart/>)
    }    

    const handleWishlist = () => {
        openModal(<Wishlist/>)
    }

    const handleSearch = () => {
        openModal(<SearchPanel/>)
    }

    const handleUser = () => {
        openModal(<UserProfile/>)
    }

    return (
        <nav className="navContainer">

            <Link to={`/`}>
                <span className="logo">Plantae</span>
            </Link>

            <div className="options">
                <span className="item">MORE</span>
                <span className="item"
                onClick={handleWishlist}>WISHLIST</span>
                <span className="item"
                onClick={handleSearch}>SEARCH</span>
            </div>

            <div className="rightOptions">
                {isLoging ?
                    <span className="item"
                    onClick={handleUser}>ACCOUNT</span>
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