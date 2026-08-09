import Navebar from "../components/navebar/topnaveBar";
import Footer from "../components/footer";
import styles from "./Rx.module.css"
import { useState } from "react";


function RX(){
    const [inputs, setInputs] = useState({
        nomeDoente:"",
        nid:"",
        
    });
    const [file, setFile] = useState(null);
    const [alerta, setAlerta] = useState(" ");
    const [preview, setPreview] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const image = files[0];
            console.log('img:',image)

            setFile(image);
            setPreview(URL.createObjectURL(image));
            //return;
        }

        setInputs(values => ({
            ...values,
            [name]: value
        }));
           
    }

   
   async function handleSubmit (e){
        e.preventDefault();

        if (!file) {
            setAlerta("Selecione uma imagem");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("nome", inputs.nomeDoente);
            formData.append("nid",inputs.nid);

                console.log("FILE ANTES:", file);

                for (let item of formData.entries()) {
                console.log(item[0], item[1]);
                }

            const res = await fetch('http://localhost:3000/api/save',{
            method:'POST',
            body:formData
        });
            
            if(!res.status){
                setAlerta('erro interno:' + res.status)
                return;
            }
            const resposta = await res.json();
            setAlerta(resposta.message)
            setTimeout(()=>{
                setAlerta("");
            },3000)

        }catch(err){
            setAlerta('Erro ao salvar dados!')
        }
              
    }
    
    return(
        <div className={styles.conteiner}>
            <Navebar/>
            <p>{}</p>
            <img src={preview} alt="Preview"  className={styles.imagem}/>
            <form  onSubmit={handleSubmit} className={styles.formulario}>
                <input type="text" name="nomeDoente" value={inputs.nomeDoente} 
                    onChange={handleChange} className={styles.inputrx} placeholder="Nome do doente"/>
                <input type="text" name="nid" value={inputs.nid} onChange={handleChange} className={styles.inputrx} placeholder="Nid do doente"/>
                <label htmlFor="">Caregar Imagen</label>
                <input type="file" accept="image/*" name="file" onChange={handleChange}/>
                <input type="submit" value='submeter' className={styles.inputSUbmitrx}/>
            </form>
            <p>{alerta}</p>
            <Footer/>
        </div>
    )
}

export default RX;