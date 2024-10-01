import React, { useState } from 'react';
import conector from '../../Servicios/conector'; // Asegúrate de la ruta correcta
import './FormularioUsuario.css';

const FormularioUsuario = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usuarioData = {
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
            const response = await conector.post('/register', usuarioData);
            setMensaje(response.data);
        } catch (error) {
            if (error.response) {
                setMensaje(error.response.data);
            } else {
                setMensaje("Error al registrar el usuario. Intente de nuevo.");
            }
        }
    };

    return (
        <div className='fondo_formulario'>
            <div className='contenedor_formulario'>
                <h2>Registrar Usuario</h2>
                <form onSubmit={handleSubmit}>
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
                            required
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
                    <button className='registrar_usuario' type="submit">Registrar Usuario</button>
                </form>
                {mensaje && <p>{mensaje}</p>}
            </div>
        </div>
    );
};

export default FormularioUsuario;
