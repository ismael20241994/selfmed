import styles from './Regisc.module.css';
import { useState,useEffect } from 'react';
import {FaPen, FaTrash} from "react-icons/fa";
import Modal from '../components/modal/modal'

function RegistConsultas (){
    const [allConsult, setAllConsult] = useState([]);
    const [actualizar, setActualizar] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [consulta, setConsulta] = useState({id:"", estado:""});
    useEffect(()=>{
        async function carregarDados() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/allConsult`);
            const data = await response.json();
            
           if(response.status !== 200){
            alert(data.message);
            return;
           } 
           setAllConsult(data);
           
        }
        carregarDados();
    },[actualizar])

    async function removerConsul(params) {
         try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/deletar/${params}`);
            const data = await response.json();
            if(response.status !== 200){
               setPopupMessage(data.message)
               return; 
            };

            setActualizar((act)=>!act)

        }catch(err){
            /*setPopupMessage(err.message)*/
        }
    }

    const handleChange = async (event) => {
        setConsulta((prev)=>({...prev, estado:event.target.value}) );
    };

    async function handleSubmit(e){
        e.preventDefault();
        try{
            if(!consulta) return alert("Selecione o estado!");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/updateEstado`,
                {
                method: 'POST',
                headers:
                    {
                        'Content-Type':'application/json'
                    },
                body: JSON.stringify(consulta),
                credentials:'include'
            }
            );
            const data = await response.json();
            if(response.status !== 200){
               alert(data.message)
               return; 
            };
            console.log(consulta)
           
            setActualizar((act)=>!act);
            
        }catch(err){
            alert(err.message)
        }
    }
    return(
        <div className={styles.container}>
            <div className={styles.contTopNave}>
                <div className={styles.topnav}>
                    <a href="/dsh">Home</a>
                    <a href="#news">News</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>                    
                </div>
            </div>
            <div className={styles.content}>
                <form className={styles.form}>
                    <input type="search"  className={styles.inptSearch}/>
                </form>

                <table  className={styles.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Pac</th>
                            <th>Nome Completo</th>
                            <th>Genero</th>
                            <th>Idade</th>
                            <th>Especialidade</th>
                            <th>Medico</th>
                            <th>Clinica</th>
                            <th>Dia</th>
                            <th>Hora</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allConsult.map((item)=>(
                            <tr key={item.cnsId}>
                                <td>{item.cnsId}</td>
                                <td>{item.pac} <FaPen onClick={()=>{setOpenModal(true); 
                                    setConsulta((prev)=>({...prev, id: item.cnsId}))}} 
                                    className={styles.iconPen}/>  
                                    <FaTrash onClick={()=>removerConsul(item.cnsId)} className={styles.icon}/> 
                                </td>
                                <td>{item.nome}</td>
                                <td>{item.genero}</td>
                                <td>{item.idade}</td>
                                <td>{item.especialidade}</td>
                                <td>{item.medico}</td>
                                <td>{item.clinica}</td>
                                <td>{item.dia}</td>
                                <td>{item.hora}</td>
                                <td>{item.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
                    <form onSubmit={handleSubmit} >
                        <select  onChange={handleChange}>
                            <option value="">Selecionar estado</option>
                            <option value="pendente">Pendente</option>
                            <option value="autorizado">Autorizado</option>
                        </select>
                        <button>Actualizar</button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}

export default RegistConsultas;