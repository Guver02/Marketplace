import React, { createContext, useContext } from "react";
import { Spinner } from "../assets/Spinner";
import { useFetch } from "../custom-hooks/useFetch";

const ItemsContext =  createContext()

function ItemsContextProvider({children}) {
    const [products, isProductsLoading, errorProducts] = useFetch('/api/v1/products')
    

    if(isProductsLoading){
        return <Spinner/>
    }

    return (
        <ItemsContext.Provider value={{
            products
        }}>
            {children}
        </ItemsContext.Provider>
    );
}

export {ItemsContextProvider, ItemsContext}