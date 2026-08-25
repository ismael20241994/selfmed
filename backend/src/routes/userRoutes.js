import express from 'express';
const routes = express.Router();

import upload from '../middlewares/uploads.js';
import { salvarDado, buscarDado, getEspe,
 getClinicName, savepacClient, consultas,regis, login, getAlllPacs,
  updateUser, verifyToken, deletarConsultas, deletarPAc, todasConsultas, actualizarEstado,
  getClinica, updateClinic,addClinic,atestado,getSolicAtestado, todos_atestados,actualizar_atestado
} from '../controllers/userController.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';



routes.post('/save',upload.single("image"),salvarDado);

routes.get('/rx',buscarDado);
routes.get('/esp',getEspe);
routes.get('/consult',getClinicName);
routes.post('/savePac',savepacClient);
routes.get('/clinica',getClinica);
routes.post('/addClinic', addClinic)
routes.post('/updateClinic',updateClinic)
routes.get('/lista/:pac',consultas);
routes.post('/singUp',regis);
routes.post('/login',login);
routes.get('/allPac', getAlllPacs);
routes.post('/updatePac', updateUser);
routes.get('/auth', authenticateJWT, verifyToken);
routes.get('/deletar/:id',deletarConsultas);
routes.get('/removerPac/:id', deletarPAc);
routes.get('/allConsult', todasConsultas);
routes.post('/updateEstado',actualizarEstado);
routes.post('/solic_atestado', atestado)
routes.get('/solic_atestado/:pac',getSolicAtestado)
routes.get('/allAtestado', todos_atestados)
routes.post('/update_atestado', actualizar_atestado)
export default routes;
