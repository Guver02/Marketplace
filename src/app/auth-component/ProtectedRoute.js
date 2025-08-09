import React from "react";
import { useStore } from "../providers/ItemsContex";
import { Navigate } from "react-router";

function ProtectedRoute ({children, arrRole}) {
    const {userData} = useStore()

    if(!userData.role) return <Navigate to='/login' replace/>
    console.log(userData)

    if(arrRole && !arrRole.includes(userData.role)) return <Navigate to='/unauthorized' replace/>

    return children
}

export {ProtectedRoute}