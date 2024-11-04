import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio_sesion from './Autenticacion/inicio_sesion';
import Inicio_cliente from './paginas/cliente/inicio_cliente';
import Empresas_cliente from './paginas/cliente/empresas_cliente';
import NavBarCliente from './Componentes/BarraNavegacion/NavBarCliente';
import NavBarOficina from './Componentes/BarraNavegacion/NavBarOficina';
import Inicio_oficina from './paginas/oficina/inicio_oficina';
import Gestion_usuarios from './paginas/oficina/gestion_usuarios';
import Gestion_unidades from './paginas/oficina/gestion_unidades';
import Gestion_viajes from './paginas/cliente/gestionviajes';
import Registro_Usuarios from './paginas/oficina/registro_usuarios';
import Viaje_Tarija from './paginas/oficina/Viaje_Tarija';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio_sesion/>}/>


          <Route element={<NavBarCliente />}>
            <Route path="inicio_cliente" element={<Inicio_cliente/>}/>
            <Route path="empresas_cliente" element={<Empresas_cliente/>}/>
            <Route path="gestionviajes" element={<Gestion_viajes/>}/>
          </Route>
          <Route element={<NavBarOficina />}>
            <Route path="inicio_oficina" element={<Inicio_oficina/>}/>
            <Route path="gestion_usuarios" element={<Gestion_usuarios/>}/>
            <Route path="gestion_unidades" element={<Gestion_unidades/>}/>
            <Route path="gestion_viajes" element={<Gestion_viajes/>}/>
            <Route path="registro_usuarios" element={<Registro_Usuarios/>}/>
            <Route path="viaje_tarija" element={<Viaje_Tarija/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
