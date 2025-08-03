import React, { useEffect, useReducer } from "react";
import { useShoppingCart } from "./useShoppingCart";

const initialState = {
    shoppingCart: [],
    userData: {},
    isLoging: false
}

const reducer = (state, action) => {
    switch (action.type) {

        case 'SET_SHOPPING_CART':
            return {
                ...state,
                shoppingCart: action.payload
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload]
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(item => item.productId !== action.payload)
            }
        case 'CLEAR_CART':
            return {
                ...state,
                shoppingCart: []
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                userData: action.payload
            }
        case 'SET_IS_LOGING':
            return {
                ...state,
                isLoging: true
            }
        default:
            return state

}}

function useData () {
    const [state, dispatch] = useReducer( reducer, initialState )

    const setIsLoging = (boolValue) => {
        dispatch({type: 'SET_IS_LOGING', payload: boolValue})
    }

    const [shoppingCart, loadCart] = useShoppingCart({setIsLoging})

    useEffect(() => {
        dispatch({type: 'SET_SHOPPING_CART', payload: shoppingCart})

    }, [shoppingCart])

    return [state, dispatch, loadCart]
}

export {useData}