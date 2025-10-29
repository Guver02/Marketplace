import React from 'react';
import styles from './Unauthorized.module.css';  // Importa el archivo CSS Module
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Acceso no autorizado</h1>
            <p className={styles.message}>Lo siento, no tienes permiso para acceder a esta página.</p>
            <Link to={'/login'} className={styles.link}>Iniciar sesion</Link>
        </div>
    );
};

export { Unauthorized };
