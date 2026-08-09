import styles from './Clinica.module.css'
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import Modal from '../components/modal2';
import {FaPen, FaTrash} from "react-icons/fa";


function Clinica (){
    const[menu, setMenu] = useState(false);
    const [clinica, setClinica] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [actualizar,setActualizar] = useState(false)
    const [ form, setForm] = useState({
        clinica:"",
        medico:"",
        especialidade:"",
        dia:"",
        horario:"",
        id:""
    });
    const [dataClinic, setDataClinic] = useState({
        clinica:"",
        medico:"",
        especialidade:"",
        dia:"",
        horario:"",
        id:""
    });

    useEffect(()=>{
        async function carregarDados(){
            const response = await fetch(`http://192.168.43.132:3000/api/clinica`);
            const data = await response.json();
            if(response.status !== 200){
               alert('err na busca de clinica, ou bd vazio')
               return; 
            };
            setClinica(data.map(item=>{return item}))
            
        }
        carregarDados();
    },[actualizar]);

    const handleChang = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
         try{
          const responta = await fetch("http://192.168.43.132:3000/api/addClinic",{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(form),
            credentials:'include'
          });

          setForm({
            clinica:"",
            medico:"",
            especialidade:"",
            dia:"",
            horario:"",
            id:""
          })

          const data = await responta.json();
          if(responta.status !== 200){
                alert(data.message)
            };
          
          alert(data)
          setOpenModal(false)
          setActualizar((act)=>!act)
        }catch(err){
            alert(err.message)
        }
    }

    const handleChangeEdit = (e)=>{
        setDataClinic({
            ...dataClinic,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitEdit = async (e)=>{
        e.preventDefault();
        try{
          const responta = await fetch("http://192.168.43.132:3000/api/updateClinic",{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dataClinic),
            credentials:'include'
          });

          const data = await responta.json();
          if(responta.status !== 200){
                alert(data.message)
            };
          
          alert(data)
         setOpenEditModal(false)
          setActualizar((act)=>!act)
        }catch(err){
            alert(err.message)
        }
    }

    return (
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
                <h1 onClick={()=>setOpenModal(true)} className={styles.addBtn}>+</h1>

                <form className={styles.form}>
                    <input type="search"  className={styles.inptSearch}/>
                </form>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome da Clinica</th>
                            <th>Nome do Medico</th>
                            <th>Especialidade</th>
                            <th>Dias De Semana</th>
                            <th>Horario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinica.map((item=>
                            <tr key={item.id}>
                            <td><FaPen onClick={()=>{setOpenEditModal(true); 
                            setDataClinic({
                                clinica: item.nome,
                                medico: item.md,
                                especialidade: item.especialidade,
                                dia: item.dia,
                                horario: item.hora,
                                id: item.id

                            })}} 
                             className={styles.iconPen}/>
                                <FaTrash onClick={()=>alert('ola')} className={styles.iconTrash}/> {item.nome}</td>
                            <td>{item.md}</td>
                            <td>{item.especialidade}</td>
                            <td>{item.dia}</td>
                            <td>{item.hora}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
                    <form onSubmit={handleSubmit}  className={styles.formModal}>
                        <input type="text" name = "clinica" value={form.clinica} onChange={handleChang} className={styles.input} placeholder='Nome da Cinica'/>
                        <input type="text" name = "medico"  value={form.medico} onChange={handleChang} className={styles.input} placeholder='Nome do Medico'/>
                        <input type="text" name = "especialidade" value={form.especialidade} onChange={handleChang} className={styles.input} placeholder='Especialidade'/>
                        <input type="text" name = "dia" value={form.dia} onChange={handleChang} className={styles.input} placeholder='Dia de Semana'/>
                        <input type="text" name = "horario" value={form.horario} onChange={handleChang} className={styles.input} placeholder='Horario'/>
                        <button className={styles.btnform}>Salvar</button>
                    </form>
                </Modal>

                <Modal isOpen={openEditModal} onClose={()=>setOpenEditModal(false)}>
                    <form onSubmit={handleSubmitEdit} className={styles.formModal}>
                        <input type="text" name='clinica' value={dataClinic.clinica} onChange={handleChangeEdit} className={styles.input}/>
                        <input type="text" name='medico' value={dataClinic.medico} onChange={handleChangeEdit} className={styles.input}/>
                        <input type="text" name='especialidade' value={dataClinic.especialidade} onChange={handleChangeEdit} className={styles.input}/>
                        <input type="text" name='dia' value={dataClinic.dia} onChange={handleChangeEdit} className={styles.input}/>
                        <input type="text" name='horario' value={dataClinic.horario} onChange={handleChangeEdit} className={styles.input}/>
                        <button className={styles.btnform}>Salvar</button>
                    </form>
                </Modal>
            </div>
       </div>
        
    )
}
export default Clinica;