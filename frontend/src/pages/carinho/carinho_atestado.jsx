import styles from './Carinho_atestado.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import {FaClock, FaCheckCircle, FaTimesCircle, FaFileSignature,
FaFileAlt,FaCalendarCheck, FaPlus,FaUserCircle,FaShoppingCart,FaSpinner} from "react-icons/fa";
import { LuCalendarCheck2 } from "react-icons/lu";
import Footer from '../components/footer';
import Overlay from '../components/overlay';
import Modal from '../components/modal2/modal';


function Carinho_atestado(){
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [pac, setPac] = useState(sessionStorage.getItem('pac'));
    const [atestados, setAtestados] = useState([]);
    const [status, setStatus] = useState(false)

    useEffect(() => {
        async function carregarDados() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/solic_atestado/${pac}`);
            const data = await response.json();
            setAtestados(data);
        }
        carregarDados();
    }, []);

    return (
       <div className={styles.container}>
            <div className={styles.div}>
                <div onClick={()=>setOpen(true)} className={styles.div}>
                    <div className={styles.divmenu}></div>
                    <div className={styles.divmenu}></div>
                    <div className={styles.divmenu}></div>
                </div>
                <h2 className={styles.titlo}>SelfMed</h2>
                <FaUserCircle className={styles.avatar}/><span className={styles.spanUsuario}>Usuario</span>
                <Overlay onClose={()=>setOpen(false)} className={`${styles.overlar} ${ open ? styles.overlayW : ""}`}></Overlay>
            </div>
            <div className={styles.containerDi}>
                <div onClick={()=>navigate('/pac')} className={styles.divIcon}><FaFileSignature  className={styles.navIcon}/><br /><span className={styles.spanIcon}>Agendar</span></div>
                <div onClick={()=>navigate('/list')} className={styles.divIcon}><LuCalendarCheck2 className={styles.navIcon}/><br /><span>Agendadas</span></div>
                <div onClick={()=>navigate('/atestado')} className={styles.divIcon}><FaFileAlt className={styles.navIcon}/><br /><span>Atestado</span></div>
                <div onClick={()=>alert('Recurço temporariamente indisponivel')} className={styles.divIcon}><FaPlus className={styles.navIcon}/><br /><span>Farmacia</span></div>
                <div onClick={()=>navigate('/Car_atestado')} className={`${styles.divIconCarinho}`}><FaShoppingCart className={styles.navIconCarinho}/><span className={styles.spanCarinho}>3</span></div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.divC}>
                    {atestados.map((item)=>(
                        <div key={item.id}  className={styles.card}>
                        <h4>Atestado Médico</h4>
                        <div onClick={()=>{}} className={styles.contentCard}>
                            <p><b>Nome:</b> {item.cliente} <br />
                                <b>Clinica:</b> {item.clinica} <br/> 
                                <b>Emitido:</b> {item.data} <br />
                                <b>Status:</b> {item.status ?(<><FaSpinner className={styles.spin}/> Verificando pedido!</>):
                                (<><FaCheckCircle className={styles.iconStatus}/> Disponivel</>) }
                            </p>
                            
                        </div>
                    </div>
                    ))}
                    
                </div>

            </div>
            <footer className={styles.footer}>@ tegs 2026</footer>
        </div>
    )
}
export default Carinho_atestado;