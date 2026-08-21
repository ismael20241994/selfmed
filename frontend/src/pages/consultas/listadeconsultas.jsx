import Footer from "../components/footer";
import { useEffect,useState,useRef } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import styles from "./List.module.css";
import { FaUserDoctor, FaCalendarDays, FaCircleCheck } from "react-icons/fa6";
import {FaClock, FaStethoscope, FaSpinner, FaPen, FaTrash,FaFileSignature,
FaFileAlt,FaPlus,FaUserCircle} from "react-icons/fa";
import { LuCalendarCheck2 } from "react-icons/lu";
import Popup from "../components/popup/popup";
import Overlay from "../components/overlay";

function MyConsults (){
    const navigate = useNavigate();
    const location = useLocation();
    const [pac, setPac] = useState(sessionStorage.getItem('pac'));
    const [consultas, setConsultas] = useState([]);
    const [alerta, setAlerta] = useState("");
    const[menu, setMenu] = useState(false);
    const[open, setOpen] = useState(false);
    /*const [popupMessage, setPopupMessage] = useState("");*/
    const [actualizar, setActualizar] = useState(false);
    const {activo, setActive} = useState(false);
    
    const usuario = localStorage.getItem('usuario')
    
    useEffect(()=>{
        async function carregarDados(){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/lista/${pac}`);
            const data = await response.json();
            if(!data.status){
               setAlerta('Sem registo de Consulta Marcada.Agendar Consulta!')
               return; 
            };
            setConsultas(data.message.map(item=>{return item}))
        }
        carregarDados();
                
    },[actualizar]);
   
    async function deletar(params) {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/deletar/${params}`);
            const data = await response.json();
            if(response.status !== 200){
               setPopupMessage(data.message)
               return; 
            };
            /*setPopup(true)
            setPopupMessage(data)*/
            setActualizar((act)=>!act)

        }catch(err){
            /*setPopupMessage(err.message)*/
        }
    }

    return(
        <div className={styles.container}>
                <div className={styles.div}>
                    <div onClick={()=>setOpen(true)} className={styles.div}>
                        <div className={styles.divmenu}></div>
                        <div className={styles.divmenu}></div>
                        <div className={styles.divmenu}></div>
                    </div>
                    <h2 className={styles.titlo}>SelfMed</h2>
                    <FaUserCircle className={styles.avatar}/><span className={styles.spanUsuario}>{usuario}</span>
                    
                    <Overlay onClose={()=>setOpen(false)} className={`${styles.overlar} ${ open ? styles.overlayW : ""}`}></Overlay>
                </div>
                        <div className={styles.containerDi}>
                            <div onClick={()=>navigate('/pac')} className={styles.divIcon}><FaFileSignature  className={styles.navIcon}/><br /><span className={styles.spanIcon}>Agendar</span></div>
                            <div onClick={()=>navigate('/list')} className={styles.divIcon}><LuCalendarCheck2 className={`${ !activo ? styles.navIconActive : ""}`}/><br /><span>Agendadas</span></div>
                            <div onClick={()=>navigate('/atestado')} className={styles.divIcon}><FaFileAlt className={styles.navIcon}/><br /><span>Atestado</span></div>
                            <div onClick={()=>alert('Recurso temporariamente indisponivel')} className={styles.divIcon}><FaPlus className={styles.navIcon}/><br /><span>Farmacia</span></div>
                        </div>

                        <div className={`${menu ? styles.menusupshow : styles.menusuphiden }`}>
                                <Link to="/pac" className={styles.link}>Agendar Consultas</Link>
                                <Link to="/list" className={styles.link}>Minhas Consultas</Link>
                                <Link to="#" className={styles.link}>Atestado Medicos</Link>
                                <Link to="#" className={styles.link}>Farmacia</Link>
                        </div>
                        <nav className={styles.nav}>
                            <ul>
                                <li className={styles.ul}><Link to="/pac" className={styles.link}>Agendar Consultas</Link></li>
                                <li className={styles.ul}><Link to="/list" className={styles.link}>Minhas Consultas</Link></li>
                                <li className={styles.ul}><Link to="#" className={styles.link}>Atestado Medicos</Link></li>
                                <li className={styles.ul}><Link to="#" className={styles.link}>Farmacia</Link></li>
                            </ul>
                        </nav>
                        
                
            <div className={styles.content}>
                <h2 className={styles.h2}>Consultas Agendadas</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Especialidade</th>
                            <th>Clinica</th>
                            <th>Medico</th>
                            <th>Dia de Semana</th>
                            <th>Horas</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map(item=>(
                            <tr key={item.cnsId}>
                            <td>{item.cnsId}</td>
                            <td>{item.nome}</td>
                            <td>{item.especialidade}</td>
                            <td>{item.clinica}</td>
                            <td>{item.medico}</td>
                            <td>{item.dia}</td>
                            <td>{item.hora}</td>
                            <td>{item.estado}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.divC}>
                    {consultas.map((item)=>(
                        <div key={item.cnsId} className={styles.card}>
                            {/*<img src={logo} alt="SelfMed - Sua saúde digital" width={100} />*/}
                            <p className={styles.h3clinica}><b>{item.clinica}</b></p> 
                            <div className={styles.contentCard}>
                                <p><b>pac:{item.nome}</b></p>
                                <FaStethoscope className={styles.icone}/> <span><b>{item.especialidade}</b></span><br/>
                                <FaUserDoctor className={styles.icone} /> <span>{item.medico}</span> <br/>
                                <FaCalendarDays className={styles.icone}/> <span>{item.dia}</span> <br/>
                                <FaClock className={styles.icone}/> <span>{item.hora}</span>    
                                <br></br>
                                {item.estado !== 'autorizado' ?(<><FaSpinner className={styles.spin}/> <span>Em analise</span></>):
                                (<><FaCircleCheck className={styles.iconStatus}/> <span>Autorizado</span></>)}  
                                {/*<FaPen onClick={()=>setPen((aberto)=>!aberto)} className={styles.editar}/>*/}
                                {item.estado === 'autorizado' ? "" :(<FaTrash onClick={()=>deletar(item.cnsId)} className={styles.lixeira}/>)}
                                {/*<span><br />🟢 Marcar Consulta</span>futuro botao clicavel*/}
                            </div>
                        </div>
                    ))}
                    {/*<Popup open={popup} onClose={()=>setPopup(false)}>
                        {popupMessage}
                    </Popup>*/}
                </div>
                <p>{alerta}</p>
            </div>
            <footer className={styles.footer}>@ tegs 2026</footer>
        </div>
    )
}

export default MyConsults;