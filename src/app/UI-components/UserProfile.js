import React, { useState } from 'react';
import styles from './UserProfile.module.css';
import { useStore } from '../providers/ItemsContex';
import { Spinner } from '../assets/Spinner';
import { useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';
import { useModal } from '../providers/ModalContext';

const UserProfile = () => {
    const [loading, setLoading] = useState(false)
    const {userData: user, logout} = useStore()
    const {closeModal} = useModal()
    const navigate = useNavigate()

    const handleUpdateRole = async () => {
        setLoading(true)
        const res = await fetch('/api/v1/users/update-role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                role: 'seller'
            })
        })

        if (res.ok) {
            setLoading(false)
            navigate('/seller')
        }
    }

    const handleLogout = async () => {
        await logout()
        closeModal()
        
    }

    if(loading) return <Spinner/>

    return (
        <div className={styles.profileCard}>
            <div className={styles.avatar} />
            <h2 className={styles.name}>{user.username}</h2>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.role}>
                Rol: <span>{user.role}</span>
            </p>
            <button className={styles.button}
            onClick={handleUpdateRole}>Comienza a vender</button>
            <button className={styles.button}
            onClick={handleLogout}>
                <span>Logout</span>
                <LogOut/>
            </button>
        </div>
    );
};

export { UserProfile };
