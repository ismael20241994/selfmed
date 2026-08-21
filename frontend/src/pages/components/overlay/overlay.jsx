import styles from './Overlay.module.css';
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState } from 'react';

function Overlay ({isOpen,onClose,chindren, className}){
    const [estado, setEstado] = useState(false);

    
    return(
        <>
            <div id="myNav" className={`${styles.overlay} ${className}`}>
                <button className={styles.closebtn} onClick={onClose} >X</button>
                <div  className={styles.overlay_content}>
                    <a href="#">Sobre</a>
                    <a href="#">Serviços</a>
                    <a onClick={()=>{setEstado((anterio)=> !anterio)}}href="#">Apoio Técnico</a>
                    <div className={estado ? `${styles.dropdown_content} ${styles.show}` : styles.dropdown_content}>
                      <FaWhatsapp className={styles.icon}/> 879951807<br />
                      <FaPhone/> 845451807 <br />
                       <FaEnvelope/> support.selfmedi@gmail.com
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overlay;