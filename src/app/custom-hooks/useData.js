import React, { useEffect, useReducer, useState } from "react";
import { useShoppingCart } from "./useShoppingCart";
import { useUserData } from "./useUserData";
import { useLoging } from "./useLoging";

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
            const exist = state.shoppingCart.find(item => item.productid === action.payload.productid)

            if(!exist) return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload]
            }
                return {
                    ...state,
                    shoppingCart: state.shoppingCart.map(item => {

                        if(item.productid === action.payload.productid) {
                            return ({
                                ...item,
                                quantity: item.quantity + action.payload.quantity
                            })
                        }
                        return item
                    })
                }
            
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(item => item.productid !== action.payload)
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
                isLoging: action.payload
            }
        default:
            return state

}}

function useData () {
    const [state, dispatch] = useReducer( reducer, initialState )
    const [loading, setLoading] = useState(true)

    const [isLoging, loadIsLogging] = useLoging()
    const [shoppingCart, loadCart] = useShoppingCart()
    const [userData, loadUser] = useUserData()


    useEffect(() => {
        dispatch({type: 'SET_IS_LOGING', payload: isLoging})
    }, [isLoging])

    useEffect(() => {
        dispatch({type: 'SET_SHOPPING_CART', payload: shoppingCart})
    }, [shoppingCart])

    useEffect(() => {
        dispatch({type: 'SET_USER_DATA', payload: userData})
    }, [userData])

    
    useEffect(() => {
        if (!loadCart && !loadUser && !loadIsLogging) setLoading(false)
    }, [loadCart, loadUser])

    return [state, dispatch, loading]
}

export {useData}