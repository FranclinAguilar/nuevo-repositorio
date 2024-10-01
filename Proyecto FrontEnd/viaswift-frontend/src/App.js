import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio_sesion from './Autenticacion/inicio_sesion';
import Inicio_cliente from './paginas/cliente/inicio_cliente';
import Inicio_empresas from './paginas/oficina/inicio_empresas';
import Empresas_cliente from './paginas/cliente/empresas_cliente';
import NavBarCliente from './Componentes/BarraNavegacion/NavBarCliente';
import NavBarOficina from './Componentes/BarraNavegacion/NavBarOficina';
import Inicio_oficina from './paginas/oficina/inicio_oficina';
import Gestion_usuarios from './paginas/oficina/gestion_usuarios';
import Gestion_unidades from './paginas/oficina/gestion_unidades';
import Gestion_viajes from './paginas/oficina/gestion_viajes';
import Registro_Usuarios from './paginas/oficina/registro_usuarios';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio_sesion/>}/>


          <Route element={<NavBarCliente />}>
            <Route path="inicio_cliente" element={<Inicio_cliente/>}/>
            <Route path="inicio_empresas" element={<Inicio_empresas/>}/>
            <Route path="empresas_cliente" element={<Empresas_cliente/>}/>
          </Route>
          <Route element={<NavBarOficina />}>
            <Route path="inicio_oficina" element={<Inicio_oficina/>}/>
            <Route path="gestion_usuarios" element={<Gestion_usuarios/>}/>
            <Route path="gestion_unidades" element={<Gestion_unidades/>}/>
            <Route path="gestion_viajes" element={<Gestion_viajes/>}/>
            <Route path="registro_usuarios" element={<Registro_Usuarios/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
