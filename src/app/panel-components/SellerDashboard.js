import React, { useState, useEffect } from "react";
import { CheckCircle, Package } from "lucide-react";
import styles from "./SellerDashboard.module.css";

const SellerDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const mockOrders = [
            { id: 1, cliente: "Juan Pérez", producto: "Laptop", cantidad: 1, fecha: "2025-08-10" },
            { id: 2, cliente: "María López", producto: "Mouse", cantidad: 2, fecha: "2025-08-11" },
            { id: 3, cliente: "Carlos Ruiz", producto: "Teclado", cantidad: 1, fecha: "2025-08-11" }
        ];
        setOrders(mockOrders);
    }, []);

    const completarPedido = (id) => {
        setOrders((prev) => prev.filter((order) => order.id !== id));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <Package size={28} style={{ marginRight: "10px" }} /> Pedidos Pendientes
            </h1>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.cliente}</td>
                                    <td>{order.producto}</td>
                                    <td>{order.cantidad}</td>
                                    <td>{order.fecha}</td>
                                    <td>
                                        <button
                                            className={styles.completeBtn}
                                            onClick={() => completarPedido(order.id)}
                                            title="Marcar como completado"
                                        >
                                            <CheckCircle size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className={styles.empty}>
                                    No tienes pedidos pendientes
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export {SellerDashboard};
