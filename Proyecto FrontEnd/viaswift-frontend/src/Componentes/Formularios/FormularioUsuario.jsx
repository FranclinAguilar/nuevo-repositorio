import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import conector from '../../Servicios/conector'; 
import './FormularioUsuario.css';

const FormularioUsuario = () => {

    //location
    const location = useLocation();
    const usuarioSeleccionado = location.state?.usuario || null;
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [ci, setCi] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [f_nacimiento, setFNacimiento] = useState('');
    const [empresaId, setEmpresaId] = useState(localStorage.getItem('empresaId') || '');
    const [rol, setRol] = useState('Pasajero');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');

    //cambio de estados para edición
    useEffect(() => {
        if (usuarioSeleccionado) {
            setNombre(usuarioSeleccionado.nombre || '');
            setApellido(usuarioSeleccionado.apellido || '');
            setEmail(usuarioSeleccionado.email || '');
            setCi(usuarioSeleccionado.ci || '');
            setTelefono(usuarioSeleccionado.telefono || '');
            setDireccion(usuarioSeleccionado.direccion || '');
            setFNacimiento(usuarioSeleccionado.f_nacimiento || '');
            setRol(usuarioSeleccionado.rol || 'Pasajero');
        }
    }, [usuarioSeleccionado]);

    
    const registrar= async (e) => {
        e.preventDefault();
        const DatosUsuario = {
            nombre,
            apellido,
            email,
            ci,
            telefono,
            direccion,
            f_nacimiento,
            empresaId,
            rol,
            contraseña,
        };

        try {
            if (usuarioSeleccionado) {
                // enviamos el los datos de Usuario en un Objeto JSON para su modificación
                // usamos el método PUT
                const respuestaActualizacion = await conector.put(`/update/${usuarioSeleccionado.id}`, DatosUsuario);
                setMensaje(respuestaActualizacion.data);
            } else {
                // enviamos el los datos de Usuario en un Objeto JSON para su registro
                // usamoe el método POST  
                const respuestaRegistro = await conector.post('/register', DatosUsuario);
                setMensaje(respuestaRegistro.data);
            }
        } catch (error) {
            if (error.response) {
                setMensaje(error.response.data);
            } else {
                setMensaje("Error al registrar el usuario");
            }
        }
    };

    return (
        <div className='fondo_formulario'>
            <div className='contenedor_formulario'>
                <h2>{usuarioSeleccionado ? 'Editar Usuario' : 'Registrar Usuario'}</h2>
                {mensaje && <p>{mensaje}</p>}
                <form onSubmit={registrar}>
                    <div>
                        <input
                            type="text"
                            id="Telefono"
                            className="inputs_formulario"
                            placeholder="Teléfono Celular"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="Contraseña"
                            className="inputs_formulario"
                            placeholder="Contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            required={!usuarioSeleccionado} // Solo requerido si es nuevo usuario
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="Nombre"
                            className="inputs_formulario"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="Apellido"
                            className="inputs_formulario"
                            placeholder="Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            id="Email"
                            className="inputs_formulario"
                            placeholder="correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="Ci"
                            className="inputs_formulario"
                            placeholder="Documento de Identidad"
                            value={ci}
                            onChange={(e) => setCi(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="Direccion"
                            className="inputs_formulario"
                            placeholder="Dirección de Domicilio"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Fecha de nacimiento</label>
                        <input
                            type="date"
                            id="FNacimiento"
                            className="inputs_formulario"
                            value={f_nacimiento}
                            onChange={(e) => setFNacimiento(e.target.value)}
                            required
                        />
                    </div>
                    <button className='registrar_usuario' type="submit">
                        {usuarioSeleccionado ? 'Guardar Cambios' : 'Registrar Usuario'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormularioUsuario;
