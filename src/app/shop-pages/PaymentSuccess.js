import React from "react";
import styles from "./PaymentSuccess.module.css";
import { CheckCircle } from "lucide-react";

function PaymentSuccess() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <CheckCircle className={styles.icon} />
                <h1 className={styles.title}>¡Pago exitoso!</h1>
                <p className={styles.message}>
                    Gracias por tu compra. Estamos procesando tu pedido y recibirás un correo con los detalles.
                </p>
                <button
                    className={styles.button}
                    onClick={() => (window.location.href = "/")}
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );
}

export {PaymentSuccess}