import { useState, useEffect,} from 'react';
import Modal from '../components/modal/modal';
import {FaPen, FaTrash} from "react-icons/fa";


import styles  from './RC.module.css';
function Regc(){
    const [allPacs, setAllPacs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [actualizar, setActualizar] = useState(false)
    const [pac, setPac] = useState({
        nome:"",
        genero:"",
        idade:"",
        contacto:"",
        email:"",
        id:""
    });

    useEffect((parametro)=>{
        async function carregarDados() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/allPac`);
            const data = await response.json();
           if(response.status !== 200){
            alert(data.message);
            return;
           } 
           setAllPacs(data);
           
        }
        carregarDados();
    },[actualizar]);

    const handleChange = (e)=>{
        setPac({
            ...pac,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e)=>{
         e.preventDefault();
        try{
          const responta = await fetch(`${import.meta.env.VITE_API_URL}/updatePac`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(pac),
            credentials:'include'
          }); 
          const data = await responta.json();
          if(responta.status !== 200){
                setAlerta(data.message)
            };
          setAlerta(data)
          console.log(data)
          setIsOpen(false)
          setActualizar((act)=>!act)
        }catch(err){
            alert(err.message)
        }
    };

    async function removerPac(params) {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/removerPac/${params}`);
            const data = await response.json();
            if(response.status !== 200){
               setPopupMessage(data.message)
               return; 
            };

            /*setPopup(true)
            setPopupMessage(data)*/
            setActualizar((act)=>!act)
            alert(data)

            

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

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Pac</th>
                            <th>Nome</th>
                            <th>Senha</th>
                            <th>Genero</th>
                            <th>Idade</th>
                            <th>Contacto</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPacs.map((item)=>(
                            <tr key={item.id} >
                                <td> {item.id}</td>
                                <td><button onClick={()=>{
                                    setIsOpen(true);
                                     setPac({
                                        nome: item.nome,
                                        senha: item.senha,
                                        genero: item.genero,
                                        idade: item.idade,
                                        contacto: item.contacto,
                                        email: item.email,
                                        id: item.id
                                     })}}>Editar</button> <FaTrash onClick={()=>removerPac(item.id)} className={styles.lixeira}/> {item.pac}</td>
                                <td>{item.nome}</td>
                                <td>{item.senha}</td>
                                <td>{item.genero}</td>
                                <td>{item.idade}</td>
                                <td>{item.contacto}</td>
                                <td>{item.email}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>

                <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
                    <form onSubmit={handleSubmit} className={styles.formModal} >
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name='nome' value={pac.nome} onChange={handleChange} className={styles.inptModal}/>
                        <label htmlFor="genero">Genero</label>
                        <input type="text" name='genero' value={pac.genero} onChange={handleChange} className={styles.inptModal}/>
                        <label htmlFor="idade">Idade</label>
                        <input type="text" name='idade' value={pac.idade} onChange={handleChange} className={styles.inptModal}/>
                        <label htmlFor="contacto">Contacto</label>
                        <input type="text" name='contacto' value={pac.contacto} onChange={handleChange} className={styles.inptModal}/>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' value={pac.email} onChange={handleChange} className={styles.inptModal}/>
                        <button className={styles.btnFromModal}>Actualizar dados</button>
                    </form>  
                </Modal>

                
            </div>
        </div>
    )
}

export default Regc;