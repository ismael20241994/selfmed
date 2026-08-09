import jwt from 'jsonwebtoken';
import { findById } from "../repositorio/userRepository.js";

export async function login(req, res) {
  //const { username, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  try{
    const user = await findById(req.body);
    if (!user.status) {
    throw new Error('Credencias Invalidas');
   }
    const token = jwt.sign(
      {
        id: user.user.id,
        username: user.user.nome,
        role: user.user.role
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return res.json({
      status:200,
      mensagem: 'Login successful',
      alerta: 'sucess',
      token
  });

  }catch(error){
    res.status(404).json({status:500,mensagem: error.message})
  }
  
}