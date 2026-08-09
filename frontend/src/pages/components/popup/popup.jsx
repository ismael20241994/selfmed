import clsx from 'clsx';
import styles from './Popup.module.css';


export default function Popup({open, type, title, message, onClose, children}){
 
    if(!open) return null;
    return(
        <div className={styles.popupoverlay}>
            <div className={styles.popup}>
                <h2 className={styles.popup_h2}>{title}</h2>
                {children}
                <p className={clsx(styles.popup_p, styles[type])}>{message}</p>
                <button onClick={onClose} className={`${styles.popup_btn} ${styles.btn_sucess}`}>ok</button>
            </div>
        </div>
    );
}