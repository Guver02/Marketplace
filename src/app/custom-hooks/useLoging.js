import React, { useEffect, useState } from "react";

function useLoging() {
    const [isLoging, setIsLoging] = useState(false)
    const [loading, setLoading] = useState(true)


    const errorData = (error) => {
        console.error('Error al obtener el usuario', error);
        setIsLoging(false);
    } 

    const loadIsLogging = async () => {
        try {
            const authRes = await fetch('/api/v1/auth/status', {
                method: 'GET',
                credentials: 'include'
            })
            const res = await authRes.json()

            if (authRes.ok && res.loggedIn) setIsLoging(true)

        } catch (error) {
            errorData(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadIsLogging()
    }, [])

    return [isLoging, loading]
}

export { useLoging }