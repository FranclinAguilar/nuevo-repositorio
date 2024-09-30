import React, { useState } from 'react';
import './FormularioUsuario.css';

const FormularioUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState(''); // Nuevo campo para apellido
    const [email, setEmail] = useState('');
    const [ci, setCi] = useState(''); // Nuevo campo para C.I.
    const [telefono, setTelefono] = useState(''); // Nuevo campo para teléfono
    const [direccion, setDireccion] = useState(''); // Nuevo campo para dirección
    const [f_nacimiento, setFNacimiento] = useState(''); // Nuevo campo para fecha de nacimiento
    const [empresaId, setEmpresaId] = useState(''); // ID de la empresa
    const [rol, setRol] = useState('Pasajero'); // Valor por defecto

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar los datos del formulario
        const usuarioData = {
            nombre,
            apellido,
            email,
            ci,
            telefono,
            direccion,
            f_nacimiento,
            empresaId,
            rol
        };
        console.log(usuarioData);

        // Aquí puedes agregar la lógica para enviar los datos al servidor
        // por ejemplo, usando fetch o axios.
    };

    return (
        <div className='fondo_formulario'>
            <div className='contenedor_formulario'>
                <h2>Registrar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            id="Nombre"
                            className="inputs_formulario" // Clase agregada
                            placeholder="Introduce tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            id="Apellido"
                            className="inputs_formulario" // Clase agregada
                            placeholder="Introduce tu apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            id="Email"
                            className="inputs_formulario" // Clase agregada
                            placeholder="Introduce tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input

                            type="text"
                            id="Ci"
                            className="inputs_formulario" // Clase agregada
                            placeholder="Introduce tu C.I."
                            value={ci}
                            onChange={(e) => setCi(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            id="Telefono"
                            className="inputs_formulario" // Clase agregada
                            placeholder="Introduce tu número de teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            id="Direccion"
                            className="inputs_formulario" // Clase agregada
                            placeholder="Introduce tu dirección"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="contraseña">fecha de nacimiento</label>
                        <input
                        
                            type="date"
                            id="FNacimiento"
                            className="inputs_formulario" // Clase agregada
                            value={f_nacimiento}
                            onChange={(e) => setFNacimiento(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button className='registrar_usuario' type="submit">Registrar Usuario</button>
                </form>
            </div>
        </div>
    );
}

export default FormularioUsuario;
