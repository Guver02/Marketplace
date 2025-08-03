import React, { useState } from 'react';
import styles from './Signup.module.css';

const Signup = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Crear Cuenta</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={form.name}
        onChange={handleChange}
        className={styles.input}
        required
      />
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
      <button type="submit" className={styles.button}>Registrarse</button>
    </form>
  );
};

export {Signup};
