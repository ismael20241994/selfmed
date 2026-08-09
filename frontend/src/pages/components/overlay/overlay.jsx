import styles from './Overlay.module.css';

function Overlay ({isOpen,onClose,chindren, className}){
    return(
        <>
            <div id="myNav" className={`${styles.overlay} ${className}`}>
                <button className={styles.closebtn} onClick={onClose} >X</button>
                <div className={styles.overlay_content}>
                    <a href="#">Sobre</a>
                    <a href="#">Serviços</a>
                    <a href="#">Apoio Técnico</a>
                </div>
            </div>
        </>
    )
}

export default Overlay;