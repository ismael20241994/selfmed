import styles from './Atestado.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation, data } from "react-router-dom";
import {FaClock, FaCheckCircle, FaTimesCircle, FaFileSignature,
FaFileAlt,FaCalendarCheck, FaPlus,FaUserCircle,FaShoppingCart, FaSearch} from "react-icons/fa";
import { LuCalendarCheck2 } from "react-icons/lu";
import Footer from '../components/footer';
import Overlay from '../components/overlay';
import Modal from '../components/modal2/modal';


function Atestado(){
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const {activo, setActive} = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const clinicas = ["Centro Medico Maxi Vida", "Consultorios Medico Tete","Santa Vitoria"];
    const [inputs, setInputs] = useState({
        nome:"", ano:"", meses:"", contacto:"", data:""
    });
    const [alerta, setAlerta] = useState({
        nome:"", idade:"", genero:"", contacto:"", data:"", error:""
    });
    const [genero, setGenero] = useState("");
    const [nomeClinica, setNomeClinica] = useState("");
    const usuario = localStorage.getItem('usuario')

    function handleChangeModal (e){
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    };

    function handleChangeModalGenero(e){
        setGenero(e.target.value);
    }

    const pac = sessionStorage.getItem('pac');
    
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
            setTimeout(()=>{setAlerta("")},3000)
            return;
        };

        if(!inputs.data){
            setAlerta(preve=>({...preve, data: 'Data da Consulta Obrigatório!'}));
            setTimeout(()=>{setAlerta("")},3000);
            console.log('erro de data')
            return;
        }
        
        if(inputs.nome.trim().length < 3){
            setAlerta(preve=>({...preve, nome: 'Nome Invalido, minimo 3 caracteres!'}));
            setTimeout(()=>{setAlerta("")},3000);
            return;
        };

        const contacto = inputs.contacto.replace(/\D/g, "");
        if (!/^(258)?8[2-7]\d{7}$/.test(contacto)) {
            setAlerta(preve=>({...preve, contacto: "Formato de Contacto inválido!"}));
            setTimeout(()=>{setAlerta("")},3000);
            return;
        }

        const dados = {
            nome: inputs.nome,
            genero: genero,
            idade: `${inputs.ano}` ? `${inputs.ano} anos ` :`${inputs.meses} meses`,
            contacto: inputs.contacto,
            clinica: nomeClinica,
            data: inputs.data,
            pac: pac
        }
        
        setInputs({
            nome:"",
            ano:"",
            meses:"",
            contacto:"",
            dia:"",
            error:""
        });
        
        try{
         const response = await fetch(`${import.meta.env.VITE_API_URL}/solic_atestado`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        });
        
        const data = await response.json();
        if(response.status !== 200){
            return console.log(data.message);
        }
        
        navigate('/car_atestado')
       }catch(err){
        //setPopup({type: 'error', open:true})
        setAlerta(preve=>({...preve, error: 'Error Interno do Servidor'}));
        setTimeout(()=>{setAlerta("")},3000); 
        return;
       }

    }
    return (
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
                <div onClick={()=>navigate('/list')} className={styles.divIcon}><LuCalendarCheck2 className={styles.navIcon}/><br /><span>Agendadas</span></div>
                <div onClick={()=>navigate('/atestado')} className={styles.divIcon}><FaFileAlt className={`${ !activo ? styles.navIconActive : ""}`}/><br /><span>Atestado</span></div>
                <div onClick={()=>alert('Recurso temporariamente indisponivel')} className={styles.divIcon}><FaPlus className={styles.navIcon}/><br /><span>Farmacia</span></div>
                <div onClick={()=>navigate('/Car_atestado')} className={`${styles.divIconCarinho}`}><FaShoppingCart className={styles.navIconCarinho}/><span className={styles.spanCarinho}>3</span></div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.divC}>
                    {clinicas.map((item ,index)=>(
                        <div key={index} className={styles.card} >
                            <h3>{item}</h3>
                                <div onClick={()=>{setOpenModal(true);setNomeClinica(item)}} className={styles.contentCard}>
                                <button className={styles.btnCard}><span>Pesquisar Atestado</span> <FaSearch className={styles.btnCardIcon} size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="" className={`${styles.label} ${styles.ferstlabel}`}>Nome Completo do Paciente*</label>
                        <input type="text" name="nome" value={inputs.nome} onChange={handleChangeModal}  placeholder='Nome Completo:'/>
                        <span className={styles.alerta}>{alerta.nome}</span>
                        <label htmlFor="" className={styles.label}>Idade*</label>
                        <div className={styles.radio}>
                            <b>Idade:</b><input type="text" name="ano" value={inputs.ano} onChange={handleChangeModal} className={styles.inptIdade} placeholder='anos'/>Anos
                            <input type="text"  name= "meses" value={inputs.meses} onChange={handleChangeModal} className={styles.inptIdade}  placeholder='meses'/>Meses
                        </div>
                        <span className={styles.alerta}>{alerta.idade}</span>
                        <label htmlFor="" className={styles.label}>Genero*</label>
                        <select  onChange={handleChangeModalGenero} className={styles.genderSelect} >
                            <option value="">Genero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Outros">Outros</option>
                        </select>
                        <span className={styles.alerta}>{alerta.genero}</span>
                        <label htmlFor="" className={styles.label}>Data que  teve a Consulta*</label>
                        <input type="date" name="data" value={inputs.data} onChange={handleChangeModal}/> 
                        <span className={styles.alerta}>{alerta.data}</span>
                        <label htmlFor="" className={styles.label}>Contacto*</label>                       
                        <input type="text" name="contacto" value={inputs.contacto} onChange={handleChangeModal} placeholder='Contacto: exemplo 84xxxxxx' />
                        <span className={styles.alerta}>{alerta.contacto}</span>
                        <button className={styles.btn}>Pesquisar Atestado <FaSearch className={styles.btnCardIcon} size={14}/></button>
                    </form>
                </Modal>
            </div>
            <footer className={styles.footer}>@ tegs 2026</footer>
        </div>
    )
}
export default Atestado;