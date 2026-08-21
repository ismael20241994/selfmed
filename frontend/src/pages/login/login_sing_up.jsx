import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/modal3/modal';
import styles from './Login.module.css'
import Popup from '../components/popup/popup';
import { Loader, LoaderCircule } from '../components/loader/loader';
import {FaCheckCircle} from 'react-icons/fa'

function Login(){
    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(true);
    const [open, setOpen] = useState(false)
    const [activeTabe, setActiveTab] = useState("Login");
    const login = ["Login", "Criar Conta"];
    const [alertaStatus, setAlertStatus] = useState("")
     const [alerta, setAlerta] = useState('');
     const [ifoPopup, setInfoPopup] = useState("");
     const [infState,setInfoState] = useState("");
     const [loader, setLoader] = useState(false);
    const [regform,setregForm] = useState({
        usuario:"",
        contacto:"",
        email:"",
        senha:"",
        confirSenha:""
    })
    
    const [form, setForm] = useState({
        usuario: "",
        senha: "",
    });
    
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!form.usuario || !form.senha){
            setAlerta("Campos de entrada não devem estar vazio!");
            setAlertStatus('error')
            setTimeout(()=>setAlerta(""),3000)
            return;
        };

        if(form.usuario.trim().length < 3){
            setAlerta('Usuario invalido, minimo 3 caracteres!');
            setAlertStatus('error')
            setTimeout(()=>setAlerta(""),3000);
            return;
        };

        if(form.senha.trim().length < 3){
            setAlerta('Senha invalida, minimo 6 caracteres!');
            setTimeout(()=>setAlerta(""),3000);
            return;
        }
        setLoader(true);
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`,
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(form),
                credentials:'include'
            }
            );
            
            const data = await res.json();

            if (res.status !== 200) {
                setLoader(false);
                setAlerta(data.message);
                setAlertStatus('error');
                setTimeout(()=>setAlerta(""),3000);
                return;
            }
            
            //setAlerta(data.message);
            sessionStorage.setItem('pac',form.usuario);
            localStorage.setItem('usuario', data.data[0].nome)
            localStorage.setItem('token', data.token);

            const token = localStorage.getItem('token');
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
           
            if(response.status !== 200){
                localStorage.removeItem('token');
                return navigate('/')
            }
            setTimeout(()=>{
                navigate('/pac')
            },5000)
            
        }catch(error){
            
            setLoader(false);
            setAlerta('Erro ão conectar com servidor');
            console.log('error de login:',error.message)
            setTimeout(()=>setAlerta(""),3000)
        }
    };

    const handleChangereg = (e)=>{
        setregForm({
            ...regform,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitreg = async(e)=>{
        e.preventDefault();
        if(!regform.usuario || !regform.senha || !regform.contacto || !regform.confirSenha || !regform.email){
            setAlerta("Campos de entrada não devem estar vazio!");
            setTimeout(()=>setAlerta(" "),3000)
            return;
        };

        if(regform.senha !== regform.confirSenha){
            setAlerta(' Senha e Confirmar senha não corespondem!');
            setTimeout(()=>setAlerta(""),3000)
            return;            
        };

        if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(regform.usuario.trim())) {
            setAlerta("Nome inválido!");
            setTimeout(() => setAlerta(""), 3000);
            return;
        }

        if (!/^[A-Za-zÀ-ÿ-0-9\s]{3,}$/.test(regform.senha.trim())) {
            setAlerta("Senha inválida!");
            setTimeout(() => setAlerta(""), 3000);
            return;
        }

        const contacto = regform.contacto.replace(/\D/g, "");
        if (!/^(258)?8[2-7]\d{7}$/.test(contacto)) {
            setAlerta("Contacto inválido!");
            setTimeout(()=>setAlerta(" "),3000);
            return;
        }

        if(regform.confirSenha.trim().length < 3){
            setAlerta('Senha invalido, minimo 6 caracteres!');
            setTimeout(()=>setAlerta(" "),3000);
            return;
        }

        if(!regform.email.trim()){
            setAlerta('Email obrigatorio!');
            setTimeout(()=>setAlerta(""),3000);
            return;
        }
        setLoader(true);
        try{
            //console.log("API URL:", import.meta.env.VITE_API_URL);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/singUp`,
            {
                method: 'POST',
                headers:
                    {
                        'Content-Type':'application/json'
                    },
                body: JSON.stringify(regform),
                credentials:'include'
            }
            );

            setregForm({
                usuario: "",
                senha: "",
                contacto:"",
                email:"",
                confirSenha: "",

            })
            const data = await res.json();

            if (res.status !== 200) {
                setLoader(false)
                setAlerta('Usuário ou senha inválidos');
                setTimeout(()=>setAlerta(""),3000)
                return;
            }
            console.log(data)
            setLoader(false) 
            setOpen(true);
           setActiveTab('Login');
           setInfoState('Conta criada com sucesso!')
           setInfoPopup(data)
            //setTimeout(()=>setAlerta(""),5000);
            
        }catch(error){
            setLoader(false)
            setAlerta('Erro ão conectar com servidor');
            setTimeout(()=>setAlerta(""),3000)
        }
    };

    const reenviarMailer = async ()=>{
        
    }
   
    return(
        <>
            <Modal isOpen={isOpen} >
                
                {activeTabe === "Login" && (
                    <div> <h2 className={styles.h2}>Bem vindo a self-Medi!</h2>
                    <h3 className={styles.h3}>Fazer Login</h3>
                    <form  onSubmit={handleSubmit} className={styles.form}>
                        <label htmlFor='user'>Usuario</label>
                        <input type="text" id='user' onChange={handleChange} value={form.usuario} name="usuario" className={styles.input}/>
                        <label htmlFor='senha'>Senha</label>
                        <input type="password" id='senha' onChange={handleChange} value={form.senha} name="senha" className={styles.input}/>
                        <button className={styles.btnform}>Entrar</button>
                    </form>
                    </div>
                )}

                {activeTabe === "Criar Conta" && (
                    <div className={styles.div}> <h2 className={styles.h2}>Ainda não tens Conta?</h2>
                    <h3 className={styles.h3}>Informar dados para Criação de Conta</h3>
                    <form  onSubmit={handleSubmitreg} className={styles.form}>
                        <input type="text" onChange={handleChangereg} value={regform.usuario} name="usuario" placeholder='Nome Completo' className={styles.input}/>
                        <input type="text" onChange={handleChangereg} value={regform.contacto} name="contacto" placeholder='Contacto' className={styles.input}/>
                        <input type="email"  onChange={handleChangereg} name="email" value={regform.email}  placeholder='Email' className={styles.input}/>
                        <input type="text" onChange={handleChangereg} value={regform.senha} name="senha" placeholder='Digitar Senha' className={styles.input}/>
                        <input type='text' onChange={handleChangereg} value={regform.confirSenha} name="confirSenha" placeholder='Confirmar Senha'className={styles.input}/>
                        <button className={styles.btnform}>Criar Conta</button>
                    </form>
                    
                    </div>
                )}
                {loader && (<LoaderCircule/>)} 
                <p className={styles.alerta}>{alerta}</p>
                {login.map((estado)=>(
                    <button  key={estado}
                    className={`${styles.btnlog} ${activeTabe === estado ? styles.active : ""}`}
                    onClick={()=>setActiveTab(estado)}>{estado}</button>
                ))}
                <button className={styles.btnresend} onClick={reenviarMailer}>Reenviar email</button>
                <Popup open={open} onClose={()=>setOpen(false)}>
                    <h2 className={styles.ifh2}>{infState}</h2>
                    <FaCheckCircle className={styles.icon}/>
                    <p>{ifoPopup}</p>
                </Popup>
            </Modal>
        </>
    )
}

export default Login;