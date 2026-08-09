import styles from './MD.module.css';
import { useState } from "react";
import Modal from '../components/modal/modal';
import Footer from '../components/footer';

function MD(){
    const [inputs, setInputs] = useState("");
    const [imagem, setImagen] = useState(null);
    const[doente, setDoente] = useState(null);
    const [modal, setModal]= useState(false)
    const [closeMoal, setCloseModal] = useState(false)
    const [alerta,setAlerta] = useState("")
    function handleChange(e){
        setInputs(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        const res = await fetch(`http://192.168.43.132:3000/api/rx?nid=${inputs}`)
        const resposta = await res.json();
        //setImagen(URL.createObjectURL(resposta))
       
        if(!resposta.imagem.file){
            setAlerta("Dados nao encontrado!")
            return;
        }
       setImagen(
        resposta.imagem.file,
       )
       
       setDoente({
        nome:resposta.imagem.nome,
        nid:resposta.imagem.nid,
       });

      setInputs("")
    }

    return(
        
        <div className={styles.container}>
        <nav className={styles.nav}>
            <ul>
                <li><a href="#">Radiologia</a></li>
                <li><a href="#">Laboratio</a></li>
                <li><a href="#">Farmacia</a></li>
            </ul>
        </nav>
        <div className={styles.content}>
            <form onSubmit={handleSubmit} className={styles.formula}>
                <input type="text" name="id" value={inputs} onChange={handleChange} 
                className={styles.inpt} placeholder='Pesquisar com nid..'/>
                <input type="submit" value="buscar" className={styles.btn} />
                
            </form>
            {imagem && <img src={`http://192.168.43.132:3000/uploads/${imagem}`}
             alt="Preview" className={styles.image} onClick={()=>setModal(true)}/>}
            <p>{alerta}</p>
            {doente && 
                <p className={styles.inf}>
                    Nid: {doente.nid}
                    <br/>
                    Nome: {doente.nome}
                    <br/>
                    Sexo:
                    <br />
                    Idade:
                    <br/>
                    Informação Clinica:
                </p>}
                

            <Modal isOpen={modal} onClose={()=>setModal(false)}>
                <img src={`http://192.168.43.132:3000/uploads/${imagem}`} 
                alt="Preview" style={{width:"100%", height:"400px"}} />
            </Modal>
                          
        </div>
       
        <Footer className={styles.footer}/>
    </div>   
               
    )

}

export default MD;