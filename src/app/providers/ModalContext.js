// ModalContext.js
import React, { createContext, useContext, useState } from "react";
import styles from "./Modal.module.css";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalContent && (
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        {modalContent}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

export { ModalProvider, useModal }