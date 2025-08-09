import React, { useEffect, useState } from "react";

function useUserData() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)


    const errorData = (error) => {
        console.error('Error al obtener el usuario', error);
        setUserData(null);
    } 

    const load = async () => {
        try {
            const authRes = await fetch('/api/v1/users/my-user', {
                method: 'GET',
                credentials: 'include'
            })
            const res = await authRes.json()

            if (authRes.ok) setUserData(res) 

        } catch (error) {
            errorData(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    return [userData, loading]
}

export { useUserData }