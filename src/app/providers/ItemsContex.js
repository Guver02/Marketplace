import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "../assets/Spinner";
import { useFetch } from "../custom-hooks/useFetch";
import { useData } from "../custom-hooks/useData";
import { dataController } from "../../controllers/DataController";

const ItemsContext = createContext()

function ItemsContextProvider({ children }) {
    
    const [products, isProductsLoading, errorProducts] = useFetch('/api/v1/products')

    const [data, dispatch, loadingData] = useData()
    const {shoppingCart, userData, isLoging} = data
   
    const getIsLoging = () => isLoging

    const {addToCart, removeFromCart, clearCart, setUserData, setIsLoging, login, logout, shopOneProduct} = dataController(dispatch, getIsLoging)
    
    if (isProductsLoading || loadingData) {
        return <Spinner />
    }

    return (
        <ItemsContext.Provider value={{
            products,

            shoppingCart, userData, isLoging,
            addToCart, removeFromCart, clearCart, setUserData, setIsLoging,
            login, logout, shopOneProduct
        }}>
            {children}
        </ItemsContext.Provider>
    );
}

const useStore = () => {
    const context = useContext(ItemsContext);
    const {
            products,

            shoppingCart, userData, isLoging, shopOneProduct,
            addToCart, removeFromCart, clearCart, setUserData, setIsLoging,
            login, logout
        } = context;

    if (!context) {
        throw new Error("useStore must be used within a ItemsContextProvider");
    }
    return {
            products,
            shoppingCart, userData, isLoging, shopOneProduct,
            addToCart, removeFromCart, clearCart, setUserData, setIsLoging,
            login, logout
        };
};

export { ItemsContextProvider, ItemsContext, useStore }