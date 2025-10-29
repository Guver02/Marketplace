import React from "react";
import styles from "./PaymentCancelled.module.css";
import { XCircle } from "lucide-react";

function PaymentCancelled() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <XCircle className={styles.icon} />
                <h1 className={styles.title}>Pago cancelado</h1>
                <p className={styles.message}>
                    La transacción fue cancelada. Si esto fue un error, puedes intentar el pago nuevamente.
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

export { PaymentCancelled }