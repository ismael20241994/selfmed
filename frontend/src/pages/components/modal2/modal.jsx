import { Children, useState } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css';


function Modal({isOpen, onClose,children}){
    if(!isOpen) return null;
    return createPortal(
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                {children}
                <button onClick={onClose} className={styles.btnx}>x</button>
            </div>
        </div>,
        document.body
    );
}

export default Modal;