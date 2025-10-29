import React from "react";
import styles from "./LoadingPurchase.module.css";

function LoadingPurchase() {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
            <p className={styles.message}>
                Cargando... Serás redirigido a tu compra
            </p>
        </div>
    );
}

export { LoadingPurchase }