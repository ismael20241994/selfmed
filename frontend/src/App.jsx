import { BrowserRouter, Routes,  Route,Link } from 'react-router-dom';
import RX from './pages/rx';
import MD from './pages/medic';
import Pac from './pages/utents';
import MyConsults from './pages/consultas'
import Login from './pages/login/login_sing_up';
import DSB from './pages/myDashBord';
import Regc from './pages/regCons';

import RegistConsultas from './pages/registoConsultas';
import Clinica from './pages/clinicas';
import Atestado from './pages/atestadoMedico';
import Carinho_atestado from './pages/carinho';
import PrivateRoute from './pages/hooks/protectRoutes';
function App() {
  return (
      <Routes>
          <Route path='/dsh' element ={<DSB/>}></Route>
          <Route path='/regc' element = {<Regc/>}></Route>
          <Route path='/allCons' element= {<RegistConsultas/>}></Route>
          <Route path='/clinic' element={<Clinica/>}></Route>
          <Route path='/' element ={<Login/>}></Route>
          <Route path="/rx" element={<RX/>}></Route>
          <Route path="/md" element={<MD/>}></Route>
          {/* Todas as rotas protegidas */}
        <Route  element={<PrivateRoute/>}>
          <Route path="/pac" element={<Pac/>} />
          <Route path="/list" element={<MyConsults />} />
          <Route path="/atestado" element={<Atestado />} />
          <Route path="/car_atestado" element={<Carinho_atestado />} />
        </Route>
      </Routes>
   
  )
}

export default App
