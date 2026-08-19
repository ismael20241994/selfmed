import styles from './Utnts.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import Footer from '../components/footer';
import Modal from '../components/modal2/modal';
import { FaUserDoctor, FaCalendarDays} from "react-icons/fa6";
import {FaClock, FaCheckCircle, FaTimesCircle, FaFileSignature,
FaFileAlt,FaCalendarCheck, FaPlus,FaUserCircle} from "react-icons/fa";
import { LuCalendarCheck2 } from "react-icons/lu";
import Popup from '../components/popup/popup';
import Overlay from '../components/overlay';
import Avatar from "react-avatar";

function Pac (){
    const navigate = useNavigate();
    const [opcoes, setOpcoes] = useState([]);
    const [especialidade, setEspeci] = useState([]);
    const [isOpen,setIsopen] = useState(false);
    const [alertaGeral,setAlertaGeral] = useState("")
    const [alerta, setAlerta] = useState({
        nome:"",
        idade:"",
        genero:"",
        contacto:"",
        dia:""
    });
    const [inputs, setInputs] = useState({
        nome:"", ano:"", meses:"", contacto:""
    });
    const [trItems, setTrItems] = useState("");
    const [anos, setAnos] = useState("Ano");
    const [genero, setGenero] = useState("");
    const [diaSemana, setDiaSemana] = useState("");
    const location = useLocation();
    const[menu, setMenu] = useState(false);
    const [popup,setPopup] = useState({type:"", open: false, message:""});
    const icons = {
        success: FaCheckCircle,
        error: FaTimesCircle
    };
    const {activo, setActive} = useState(false);
    const data={status: popup.type};
    const Icon = icons[data.status];
    const [open, setOpen] = useState(false);

    const usuario = localStorage.getItem('usuario');
    
    useEffect(() => {
        async function carregarDados() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/esp`);
            const data = await response.json();
            setOpcoes(data.message);
        }
        carregarDados();
    }, []);

    const handleChange = async (event) => {
        const nome = event.target.value;
        if(!nome) return;
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/consult?espe=${nome}`);
            const data = await response.json();
            if(!data.status){ 
                setAlertaGeral(data.message);
                setTimeout(()=>{setAlerta("")},3000)
                return;
            }
            setEspeci(data.dado)
        }catch(err){

        }
    };

    function handleClick(item){
        setIsopen(true)
        setTrItems(item);   
    }
   
    function handleChangeModal (e){
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    function handleChangeSelectModalAno(e){
        setAnos(e.target.value)
    }
    
    function handleChangeModalGenero(e){
        setGenero(e.target.value);
    }

    function handleChangeModalWeekDay(e){
        setDiaSemana(e.target.value);
    }

    async function handleSubmit (e){
        e.preventDefault();
        if(!inputs.nome){ 
            setAlerta(preve=>({...preve, nome: "Nome Obrigatório"}));
            setTimeout(()=>{setAlerta("")},3000)
            return;
        };

        if(!inputs.ano && !inputs.meses){ 
            setAlerta(preve=>({...preve, idade: "Idade Obrigatório"}));
            setTimeout(()=>{setAlerta("")},3000)
            return;
        };
        
        if(!genero){ 
           setAlerta(preve=>({...preve, genero: "Genero Obrigatório"}));
            setTimeout(()=>{setAlerta("")},3000)
            return;
        };

        if(!inputs.contacto){ 
            setAlerta(preve=>({...preve, contacto: "Contacto Obrigatório"}));
            setTimeout(()=>{setAlerta("")},3000);
            return;
        };
        
        if(!diaSemana){ 
            setAlerta(preve=>({...preve, dia: "Dia de Semana Obrigatório"}));
            setTimeout(()=>{setAlerta("")},3000);
            return;
        };

         if(inputs.nome.trim().length < 3){
            setAlerta(preve =>({...preve, nome: 'Nome Invalido, minimo 3 caracteres!'}));
            setTimeout(()=>{setAlerta("")},3000);
            return;
        };

        const contacto = inputs.contacto.replace(/\D/g, "");
        if (!/^(258)?8[2-7]\d{7}$/.test(contacto)) {
            setAlerta(preve =>({...preve, contacto:"Contacto inválido!"}));
            setTimeout(()=>{setAlerta("")},3000);
            return;
        }

        const dados = {
            nome: inputs.nome,
            genero: genero,
            idade: `${inputs.ano}` ? `${inputs.ano} anos ` :`${inputs.meses} meses`,
            contacto: inputs.contacto,
            clinica: trItems.nome,
            especialidade: trItems.especialidade,
            medico: trItems.md,
            dia: diaSemana,
            hora: trItems.hora,
            pac: sessionStorage.getItem('pac')
        }

       try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/savePac`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        });
        const data = await response.json();
        if(response.status !== 200){
            setPopup({type: 'error', open:true, message:data.message})
           return;
        }
        setPopup({type: 'success', open:true, message: data})
       }catch(err){
        setPopup({type: 'error', open:true})
        setAlerta('Error Interno'); 
        return;

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
                <div onClick={()=>navigate('#')} className={styles.divIcon}><FaFileSignature  className={`${ !activo ? styles.navIconActive : ""}`}/><br /><span className={styles.spanIcon}>Agendar</span></div>
                <div onClick={()=>navigate('/list')} className={styles.divIcon}><LuCalendarCheck2 className={styles.navIcon}/><br /><span>Agendadas</span></div>
                <div onClick={()=>navigate('/atestado')} className={styles.divIcon}><FaFileAlt className={styles.navIcon}/><br /><span>Atestado</span></div>
                <div onClick={()=>alert('ola')} className={styles.divIcon}><FaPlus className={styles.navIcon}/><br /><span>Farmacia</span></div>
            </div>
                <div className={`${menu ? styles.menusupshow : styles.menusuphiden }`}>
                    <Link to="#" className={styles.link}>Agendar</Link>
                    <Link to="/list" className={styles.link}>Agendadas</Link>
                    <Link to="#" className={styles.link}>Atestado Medicos</Link>
                    <Link to="#" className={styles.link}>Farmacia</Link>
                </div>
                <nav className={styles.nav}>
                    <ul>
                        <li className={styles.ul}><Link to="#" className={styles.link}>Agendar Consultas</Link></li>
                        <li className={styles.ul}><Link to="/list" className={styles.link}>Minhas Consultas</Link></li>
                        <li className={styles.ul}><Link to="#" className={styles.link}>Atestado Medicos</Link></li>
                        <li className={styles.ul}><Link to="#" className={styles.link}>Farmacia</Link></li>
                    </ul>
                </nav>
            
            <div className={styles.content}>
                <form className={styles.FormselectInpt}>
                    <select onChange={handleChange} className={styles.selectInpt}>
                        <option value="">Selecionar Especialidade</option>
                        {opcoes.map((opcao)=>(
                            <option key={opcao.id} value={opcao.nome} >{opcao.nome}</option>
                        ))}
                    </select> 
                </form>
                <h2 style={{textAlign: "center"}}>Agendar Consultas</h2>
                <div className={styles.tablecontainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nome da Clinica</th>
                                <th>Especialidade</th>
                                <th> Medico</th>
                                <th>Dias da Consulta</th>
                                <th>Horario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {especialidade.map((item)=>(
                            <tr key={item.id} onClick={()=>handleClick(item)}>
                                <td>{item.nome}</td>
                                <td>{item.especialidade}</td>
                                <td>{item.md}</td>
                                <td>{item.dia}</td>
                                <td>{item.hora}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table> 
                    <div className={styles.divC}>
                        {especialidade.map((item)=>(
                            <div key={item.id} className={styles.card} onClick={()=>handleClick(item)}>
                                {/*<img src={logo} alt="SelfMed - Sua saúde digital" width={100} />*/}
                                <p className={styles.nomeClin}><b>{item.nome}</b></p> 
                                <div className={styles.contentCard}>
                                    {/*<p className={styles.nomeClin}><b>{item.nome}</b></p>*/} 
                                    <FaUserDoctor className={styles.icone} /> <span><b>{item.md}</b></span> <br/>
                                    <FaCalendarDays className={styles.icone}/> <span>{item.dia}</span> <br/>
                                    <FaClock className={styles.icone}/> <span>{item.hora}</span><br /> 
                                    🟢 <span style={{color: "blue"}}>Agendar</span>
                                    {/*<span><br />🟢 Marcar Consulta</span>futuro botao clicavel*/}
                                </div>
                            </div>
                        ))}
                    </div>
               
                    <Modal isOpen={isOpen} onClose={()=>setIsopen(false)}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <span className={`${styles.label} ${styles.ferstlabel}`}>Nome Completo*</span>
                            <input type="text" name="nome" value={inputs.nome} onChange={handleChangeModal}  placeholder='Nome Completo:'/>
                            <span className={styles.alerta}>{alerta.nome}</span>
                            <span className={styles.label}>Idade*</span>
                            <div className={styles.idade}>
                                <b>Anos:</b><input type="text" name="ano" value={inputs.ano} onChange={handleChangeModal} className={styles.inptIdade} placeholder='anos'/><b>Meses:</b>
                                <input type="text"  name= "meses" value={inputs.meses} onChange={handleChangeModal} className={styles.inptIdade}  placeholder='meses'/>
                            </div>
                            <span className={styles.alerta}>{alerta.idade}</span>
                            <span className={styles.label}>Genero*</span>
                            <select value={genero} onChange={handleChangeModalGenero} className={styles.genderSelect} >
                                <option value="">Genero</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Outros">Outros</option>
                            </select>
                            <span className={styles.alerta}>{alerta.genero}</span>
                            <span className={styles.label}>Contacto*</span>
                            <input type="text" name="contacto" value={inputs.contacto} onChange={handleChangeModal} placeholder='Contacto: exemplo 84xxxxxx' />
                            <span className={styles.alerta}>{alerta.contacto}</span>
                            <span className={styles.label}>Dia da Consulta*</span>
                            <select value={diaSemana} onChange={handleChangeModalWeekDay}>
                                <option value="">Dia da Semana</option>
                                <option value="Segunda">Segunda-Feira</option>
                                <option value="Terca">Terça-Feira</option>
                                <option value="Quarta">Quarta-Feira</option>
                                <option value="Quinta">Quinta-Feira</option>
                                <option value="Sexta">Sexta-Feira</option>
                                <option value="Sabado">Sabado</option>
                            </select>
                            <span className={styles.alerta}>{alerta.dia}</span>
                            
                            <button className={styles.btn}>Agendar Consulta</button>
                        </form>
                    </Modal>
                    <Popup open={popup.open} onClose={()=> {setPopup((prev)=>({ ...prev,open: false,})); navigate('/list');}} >
                        <div className={styles.conteiIcon}><Icon className={styles[popup.type]}/></div>
                        {popup.message}
                    </Popup>
                </div>
                <p className={styles.alerta}>{alertaGeral}</p>

            </div>
            <footer className={styles.footer}>@ tegs 2026</footer>
        </div>
    )

}

export default Pac;