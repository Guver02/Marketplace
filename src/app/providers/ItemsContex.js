import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "../assets/Spinner";
import { useFetch } from "../custom-hooks/useFetch";
import { useData } from "../custom-hooks/useData";
import { dataController } from "../../controllers/DataController";
import { splitProductsRandomly } from "../product-layouts/utils/splitProductsRandomly";

const ItemsContext = createContext()

function ItemsContextProvider({ children }) {
    
    const [products, isProductsLoading, errorProducts] = useFetch('/api/v1/products')
    const [bestSellers, isBestSellersLoading] = useFetch('/api/v1/products/top-sales')

    const [data, dispatch, loadingData] = useData()
    const {shoppingCart, userData, isLoging} = data

    const sections = splitProductsRandomly(products || [])
   
    const getIsLoging = () => isLoging

    const {addToCart, removeFromCart, clearCart, setUserData, setIsLoging, login, logout, shopOneProduct, shopShoppingCart} = dataController(dispatch, getIsLoging)
    
    if (isProductsLoading || loadingData || isBestSellersLoading) {
        return <Spinner />
    }

    return (
        <ItemsContext.Provider value={{
            products,
            bestSellers,
            shoppingCart, userData, isLoging,
            sections,
            addToCart, removeFromCart, clearCart, setUserData, setIsLoging,
            login, logout, shopOneProduct, shopShoppingCart
        }}>
            {children}
        </ItemsContext.Provider>
    );
}

const useStore = () => {
    const context = useContext(ItemsContext);
    const {
            products,
            bestSellers,
            sections,
            shoppingCart, userData, isLoging, shopOneProduct,
            addToCart, removeFromCart, clearCart, setUserData, setIsLoging,
            login, logout, shopShoppingCart
        } = context;

    if (!context) {
        throw new Error("useStore must be used within a ItemsContextProvider");
    }
    return {
            products,
            bestSellers,
            sections,
            shoppingCart, userData, isLoging, shopOneProduct,
            addToCart, removeFromCart, clearCart, setUserData, setIsLoging,
            login, logout, shopShoppingCart
        };
};

export { ItemsContextProvider, ItemsContext, useStore }