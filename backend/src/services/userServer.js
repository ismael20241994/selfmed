import {createData,getImg,saveRegis,getUser} from '../repositorio/respo.js';
import {sendemail} from '../utiles/sendermailer.js'
import {body, validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export async function saveData(data) {

  try{
    if (!data.imagem) {
      throw new Error("Imagem obrigatória");
      return;
    };

    const resposta = await createData(data);
    if(!resposta.status){
      return{
        status: resposta.status,
        message: resposta.message
      }
    };

    return{
      status: resposta.status,
      message: resposta.message
    }
    
  }catch(err){
    return{
      status: 500,
      message: 'Error interno do servidor'
    }
  }
  
};

export async function getData(dado) {
  try{
    const resposta = await getImg(dado);
    if(!resposta.status){
      return{
        status:resposta.status,
        message: resposta.message
      }
    }

    return resposta;

  }catch(err){
    return{
      status: 500,
      message: err.message
    }
  }

};

export async function registrar(params) {
  const pac = Math.floor(100000 + Math.random() * 900000);
  const dados = {
    nome: params.usuario.trim(),
    contacto: params.contacto.trim(),
    email: params.email.trim().toLowerCase(),
    senha: params.senha.trim(),
    confirSenha: params.confirSenha.trim(),
    pac: pac
  }
  try{
    const resposta = await saveRegis(dados);
    if(!resposta.status){
      return{
        status:resposta.status,
        message: resposta.message
      }
    }

    const mailres = await sendemail(params.email,resposta.message);
    
    return{
      status: resposta.status,
      message:`Enviamos o codico de acesso "pac" para  ${params.email}`
    }
  }catch(err){
    return{
      status: 500,
      message: err.message
    }
  }
};

export async function userLogin(params) {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  const dados = {
    pac: params.usuario.trim(),
    senha: params.senha.trim()
  };

  try{
    const resposta = await getUser(dados);
    if(!resposta.success){
      return{
        success: resposta.success,
        message: resposta.message
      }
    };

    const token = jwt.sign(
      {
        pac: dados.pac,
        senha: dados.senha
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return{
      success: resposta.success,
      data: resposta.data,
      token
    }
    
  }catch(err){
    //console.log(err.message)
    return{
      success: false,
      message: 'Error interno do servidor'
    }
  }
}
