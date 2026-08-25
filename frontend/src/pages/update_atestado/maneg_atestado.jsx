import styles from './Maneg_atestado.module.css';
import { useState,useEffect } from 'react';
import {FaPen, FaTrash} from "react-icons/fa";
import Modal from '../components/modal/modal'

function Atestado_manege(){
    const [actualizar, setActualizar] = useState(false);
    const [Allatestado, setAllAtestado] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [atestado, setAtestado] = useState({id:"", estado:""})

    useEffect(()=>{
        async function carregarDados() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/allAtestado`);
            const data = await response.json();
           if(response.status !== 200){
            alert(data.message);
            return;
           } 
           setAllAtestado(data);
        }
        carregarDados();
    },[actualizar])

    const handleChange = async (e) =>{
         setAtestado((prev)=>({...prev, estado:event.target.value}));
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            if(!atestado) return alert("Selecione o estado!");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/update_atestado`,
                {
                method: 'POST',
                headers:
                    {
                        'Content-Type':'application/json'
                    },
                body: JSON.stringify(atestado),
                credentials:'include'
            }
            );
            const data = await response.json();
            if(response.status !== 200){
               alert(data.message)
               return; 
            };
            alert(data);
           
            setActualizar((act)=>!act);
            setOpenModal(false)
            
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
                            <th>Clinica</th>
                            <th>Data</th>
                            <th>Contacto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Allatestado.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.pac} <FaPen onClick={()=>{setOpenModal(true); 
                                    setAtestado((prev)=>({...prev, id: item.id}))}} 
                                    className={styles.iconPen}/>  
                                    <FaTrash onClick={()=>removerConsul(item.id)} className={styles.icon}/> 
                                </td>
                                <td>{item.cliente}</td>
                                <td>{item.genero}</td>
                                <td>{item.idade}</td>
                                <td>{item.clinica}</td>
                                <td>{item.data}</td>
                                <td>{item.contacto}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
                    <form onSubmit={handleSubmit} >
                        <select  onChange={handleChange}>
                            <option >Selecionar estado</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Disponivel">Disponivel</option>
                        </select>
                        <button>Actualizar</button>
                    </form>
                </Modal>
            </div>
        </div>
    )
    
};

export default Atestado_manege;