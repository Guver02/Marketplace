import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router';
import { useStore } from '../providers/ItemsContex';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const {login} = useStore()

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await login(form)
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Iniciar Sesión</h2>
            <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
                required
            />
            <button type="submit" className={styles.button}>Entrar</button>
        </form>
    );
};

export { Login };
