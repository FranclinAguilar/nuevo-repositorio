import React, { useState } from 'react';
import './FormularioUsuario.css';

const FormularioUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [rol, setRol] = useState('Pasajero'); // Valor por defecto

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar los datos del formulario
        console.log({
            nombre,
            email,
            empresa,
            rol
        });
    };

    return (
        <div className='fondo_oficina'>
            <div className='contenedor_formulario'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Nombre">Nombre</label>
                    <input
                        type="text"
                        id="Nombre"
                        placeholder="Introduce tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        id="Email"
                        placeholder="Introduce tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Empresa">Empresa</label>
                    <input
                        type="text"
                        id="Empresa"
                        placeholder="Nombre de la empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        required
                    />
                </div>
                <br />



                <button className='registrar_usuario' type="submit">Registrar Usuario</button>
            </form>
        </div>
        
        
        
        </div>
    );
}

export default FormularioUsuario;
