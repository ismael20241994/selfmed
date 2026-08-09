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
        nome:"", ano:"", meses:"", contacto:"",data:""
    });
    const [genero, setGenero] = useState("Genero");
    const [alerta, setAlerta] = useState("");
    const [nomeClinica, setNomeClinica] = useState("");

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
            setAlerta('Nome obrigatorio!');
            setTimeout(()=>{setAlerta("")},3000)
            return;
        };

        if(!inputs.contacto){ 
            setAlerta('Contacto obrigatorio!');
            setTimeout(()=>{setAlerta("")},3000)
            return;
        };

        if(!inputs.data){
            setAlerta('Data da Consulta Obrigatório!');
            setTimeout(()=>{setAlerta("")},3000);
            return;
        }
        
        if(inputs.nome.trim().length < 3){
            setAlerta('Nome Invalido, minimo 3 caracteres!');
            setTimeout(()=>{setAlerta("")},3000);
            return;
        };

        const contacto = inputs.contacto.replace(/\D/g, "");
        if (!/^(258)?8[2-7]\d{7}$/.test(contacto)) {
            setAlerta("Contacto inválido!");
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
        console.log(dados);
        setInputs({
            nome:"",
            ano:"",
            meses:"",
            contacto:"",
            data:""
        });
        setGenero('Genero');
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
        console.log(err.message);
        setAlerta('Error Interno');
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
                <FaUserCircle className={styles.avatar}/><span className={styles.spanUsuario}>Usuario</span>
                
                <Overlay onClose={()=>setOpen(false)} className={`${styles.overlar} ${ open ? styles.overlayW : ""}`}></Overlay>
            </div>
            <div className={styles.containerDi}>
                <div onClick={()=>navigate('/pac')} className={styles.divIcon}><FaFileSignature  className={styles.navIcon}/><br /><span className={styles.spanIcon}>Agendar</span></div>
                <div onClick={()=>navigate('/list')} className={styles.divIcon}><LuCalendarCheck2 className={styles.navIcon}/><br /><span>Agendadas</span></div>
                <div onClick={()=>navigate('/atestado')} className={styles.divIcon}><FaFileAlt className={`${ !activo ? styles.navIconActive : ""}`}/><br /><span>Atestado</span></div>
                <div onClick={()=>alert('Recurço temporariamente indisponivel')} className={styles.divIcon}><FaPlus className={styles.navIcon}/><br /><span>Farmacia</span></div>
                <div onClick={()=>navigate('/Car_atestado')} className={`${styles.divIconCarinho}`}><FaShoppingCart className={styles.navIconCarinho}/><span className={styles.spanCarinho}>3</span></div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.divC}>
                    {clinicas.map((item ,index)=>(
                        <div key={index} className={styles.card} >
                            <h3>{item}</h3>
                                <div onClick={()=>{setOpenModal(true);setNomeClinica(item)}} className={styles.contentCard}>
                                <button className={styles.btnCard}><span>Pesquisar Atestado</span> <FaSearch size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="" className={styles.label}>Nome Completo do Paciente*</label>
                        <input type="text" name="nome" value={inputs.nome} onChange={handleChangeModal}  placeholder='Nome Completo:'/>
                        <label htmlFor="" className={styles.label}>Idade*</label>
                        <div className={styles.radio}>
                            <b>Idade:</b><input type="text" name="ano" value={inputs.ano} onChange={handleChangeModal} className={styles.inptIdade} placeholder='anos'/>Anos
                            <input type="text"  name= "meses" value={inputs.meses} onChange={handleChangeModal} className={styles.inptIdade}  placeholder='meses'/>Meses
                        </div>
                        <label htmlFor="" className={styles.label}>Genero*</label>
                        <select value={genero} onChange={handleChangeModalGenero} className={styles.genderSelect} >
                            <option value="">Genero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Outros">Outros</option>
                        </select>
                        <label htmlFor="" className={styles.label}>Data que  teve a Consulta*</label>
                        <input type="date" name='data' value={inputs.data} onChange={handleChangeModal}/> 
                        <label htmlFor="" className={styles.label}>Contacto*</label>                       
                        <input type="text" name="contacto" value={inputs.contacto} onChange={handleChangeModal} placeholder='Contacto: exemplo 84xxxxxx' />
                        <button className={styles.btn}>Solicitar Atestado</button>
                    </form>
                    <p className={styles.alerta}>{alerta}</p>
                </Modal>
            </div>
            <footer className={styles.footer}>@ tegs 2026</footer>
        </div>
    )
}
export default Atestado;