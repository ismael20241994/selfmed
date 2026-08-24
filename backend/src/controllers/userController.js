import { saveData,getData, registrar, userLogin } from '../services/userServer.js';
import { getCateg, nameClinic, pacSave, getConsultas, 
    allPacs, pacDate, deletar, apagar, getAllConsult, updateEstado,getAllRegistedClinica,
actualizarClinica, adicionarClinica, solic_atestado, get_solic_atestado} from '../repositorio/respo.js';
import url from 'url';

export async function salvarDado(req, res) {
    try{
        const dados = {
            nome:req.body.nome,
            nid: req.body.nid,
            imagem: req.file.filename
        }
        console.log('dados:',dados)
        const resposta = await saveData(dados);
       
        if(!resposta.status){
            res.status(400).json({message: resposta.message});
            return;
        }
        res.status(201).json(resposta.data);
        
    }catch(err){
        console.log('error:', err.message);
    }
};

export async function buscarDado(req,res) {
    try{
        const dados = req.query;
        const resposta = await getData(dados);

        if(!resposta.status){
            res.status(400).json({message: resposta.message});
            return;
        }

        res.status(200).json(resposta);
    }catch(err){
        console.log('error',err.message);
    }
};

export async function getEspe(req, res) {
    try{
        const resposta = await getCateg();
        if(!resposta.status){
            res.status(400).json({message: resposta.message});
            return;
        };
        res.status(200).json(resposta);
    }catch(err){

    }
   
};

export async function getClinicName(req, res) {
   try{
    const parsedUrl = url.parse(req.url,true);
    const dado = parsedUrl.query;
    const resposta = await nameClinic(dado.espe);
    if(!resposta.status){
        res.status(400).json({message: resposta.message});
        return;
    }
    res.status(200).json(resposta);
   }catch(err){

   }
};

export async function savepacClient(req, res) {
    try{
        const resposta = await pacSave(req.body)
        if(!resposta.succes){
            res.status(404).json({message: resposta.message});
            return;
        }
      return  res.status(200).json(resposta.data);
        
    }catch(err){
        console.erro('erro durante a marcação de consulta', err.message);
      res.status(500).json({message: 'Erro na marcação de consulta!' })
    }
};

export async function consultas ( req, res){
    try{
        const dado = req.params.pac;
        const resposta = await getConsultas(dado);
         if(!resposta.status){
            res.status(400).json({
                status: resposta.status,
                message: resposta.message});
            return;
        }
        res.status(200).json({
            status: resposta.status,
            message: resposta.message});
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

export async function regis(req, res){
    try{
         
      const resposta = await registrar(req.body); 
      if(!resposta.success){
           return res.status(404).json({
                message: resposta.message,
            });
            
        }
      res.status(200).json(resposta.message);
      //console.log('erro na criacao de conta')
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

export async function login (req, res){
    try{
        const resposta = await userLogin(req.body);
        if(!resposta.success){
           return res.status(404).json({
                message: resposta.message,
            });
            
        }
        res.status(200).json({
            data: resposta.data,
            token: resposta.token
        });

    }catch(err){
        res.status(500).json({message: 'Error interno do servidor'})
    }
};

export async function getAlllPacs(req,res) {
    try{
        const resposta = await allPacs();
        if(!resposta.success){
          return  res.status(404).json({message: resposta.message})
        }
       
       return res.status(200).json(resposta.data)

    }catch(err){
        console.log(err.message)
       return res.status(500).json({message:"Error interno do servidor"})
    }
}

export async function updateUser(req,res){
    try{
        const resposta = await pacDate(req.body);
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        return  res.status(200).json({data: resposta.data});
    }catch (err){
        return res.status(500).json({message: err.message});
    }
} 

export async function verifyToken(req, res) {
    try{
        res.status(200).json({success:true})
    }catch(err){
      res.status(500).json({success: false})  
    }
};

export async function deletarConsultas (req,res) {
    const dado = req.params.id;
    try{
        const resposta = await deletar(dado)
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data)
      
    }catch(err){
        res.status(500).json('Error interno do servidor!')
    }
};

export async function deletarPAc(req, res) {
    const dado = req.params.id;
    try{
        const resposta = await apagar(dado)
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data)
    }catch(err){
        res.status(500).json('Error interno do servidor!')
    }
};

export async function todasConsultas(req, res) {
     try{
        const resposta = await getAllConsult()
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data)
    }catch(err){
        res.status(500).json('Error interno do servidor!')
    }
};

export async function actualizarEstado(req,res) {
    const dados = req.body;
    try{
        const resposta = await updateEstado(dados)
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data)
     
    }catch(err){
        res.status(500).json('Error interno do servidor!')
    }
};

export async function getClinica(req, res) {
    try{
        const resposta = await getAllRegistedClinica();
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data)
    }catch(err){
        res.status(500).json('Error interno do servidor!')
    }
};

export async function updateClinic(req,res) {
    const data = req.body;
    try{
        const resposta = await actualizarClinica(data);
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data);
    }catch(err){
        console.log(err.message)
    }
};

export async function addClinic(req,res) {
    const data = req.body;
    try{
        const resposta = await adicionarClinica(data);
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data);
    }catch(err){
        console.log(err.message);
    }

};

export async function atestado(req,res) {
    const data = req.body;
    try{
        const resposta = await solic_atestado(data);
        if(!resposta.success){
            return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data);
    }catch(err){
        res.status(500).json('Error interno do servidor!')
    }
};

export async function getSolicAtestado(req, res) {
    try{
        const dado = req.params.pac;
        const resposta = await get_solic_atestado(dado);
         if(!resposta.success){
         return res.status(404).json({message: resposta.message});
        }
        res.status(200).json(resposta.data);
    }catch(err){
        res.status(500).json({message: 'Error interno do servidor'})
    }
}
