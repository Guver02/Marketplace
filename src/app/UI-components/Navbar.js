import React from "react";
import { Link } from "react-router-dom";
import { CartButton } from "../components/CartButton";
import './Navbar.css'

function Navbar() {
    
    return (
        <nav className="navContainer">

            <Link to={`/`}> 
            <span className="logo">MARKET</span>
            </Link>
            <div className="options">

              <div className="inputContainer">
              <input placeholder="Buscar en Market"></input>
              <span className="material-symbols-outlined">search</span>
              <span className="material-symbols-outlined">3p</span>
              </div>
              
              <CartButton></CartButton>
            </div>
</nav>
    );
}

export {Navbar}