import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartButton } from "../components/CartButton";
import './Navbar.css'
import { ProductsList } from "./ProductsList";
import { ItemsContext } from "../providers/ItemsContex";

function Navbar() {
    const [search, setSearch] = useState('')
    const { products } = useContext(ItemsContext)

    const filterProducts = (query) => {
        return products.filter(
          (elem) =>
            elem.product.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      };

    const items = filterProducts(search)

    return (
        <nav className="navContainer">

            <Link to={`/`}> 
            <span className="logo">MARKET</span>
            </Link>
            <div className="options">

              <div className="inputContainer">
              <input 
              placeholder="Buscar en Market"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ></input>
              <span className="material-symbols-outlined">search</span>
              
              </div>
              {(search.length >= 1) &&
                    <ProductsList items={items}/>
              }
              <CartButton></CartButton>
            </div>
</nav>
    );
}

export {Navbar}