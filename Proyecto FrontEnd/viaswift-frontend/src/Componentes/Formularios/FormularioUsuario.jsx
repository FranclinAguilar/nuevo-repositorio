import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';
import conector from '../../Servicios/conector';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormularioUsuario.css';

const FormularioUsuario = () => {
    const location = useLocation();
    const usuarioSeleccionado = location.state?.usuario || null;

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [ci, setCi] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fecha_nacimiento, setFNacimiento] = useState('');
    const [empresaId, setEmpresaId] = useState(localStorage.getItem('empresaId') || '');
    const [registradoPor] = useState(localStorage.getItem('rol'));
    const [estado, setEstado] = useState(true);
    const [rol, setRol] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Fecha máxima permitida: 10 años atrás
    const fechaMaxima = new Date();
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 10);

    useEffect(() => {
        if (usuarioSeleccionado) {
            setNombre(usuarioSeleccionado.nombre || '');
            setApellido(usuarioSeleccionado.apellido || '');
            setEmail(usuarioSeleccionado.email || '');
            setCi(usuarioSeleccionado.ci || '');
            setTelefono(usuarioSeleccionado.telefono || '');
            setDireccion(usuarioSeleccionado.direccion || '');
            setFNacimiento(usuarioSeleccionado.fNacimiento || '');
            setEstado(usuarioSeleccionado.estado || true);
            setEmpresaId(usuarioSeleccionado.empresaId || empresaId);
            
            // Si el usuario es "Oficina", el rol debe ser forzado a "Pasajero"
            if (registradoPor === 'Oficina') {
                setRol('Pasajero');
            } else {
                setRol(usuarioSeleccionado.rol || 'Pasajero'); 
            }
        } else {
            if (registradoPor === 'Oficina') {
                setRol('Pasajero');
            } else {
                setRol('');  
            }
        }
    }, [usuarioSeleccionado, registradoPor]);

    const registrar = async (e) => {
        e.preventDefault();
        const DatosUsuario = {
            nombre,
            apellido,
            email,
            ci,
            telefono,
            direccion,
            fecha_nacimiento,
            empresaId,
            registradoPor,
            estado,
            rol,
            password: contraseña,
        };
        console.log('Datos a enviar:', DatosUsuario);

        try {
            if (usuarioSeleccionado) {
                const respuestaActualizacion = await conector.put(`/update/${usuarioSeleccionado.id}`, DatosUsuario);
                setMensaje(respuestaActualizacion.data);
            } else {
                const respuestaRegistro = await conector.post('/register', DatosUsuario);
                setMensaje(respuestaRegistro.data);
            }
        } catch (error) {
            setMensaje(error.response ? error.response.data : "Error al registrar el usuario");
        }
    };

    return (
        <div className='fondo_formulario'>
            <div className='contenedor_formulario'>
                <h2>{usuarioSeleccionado ? 'Editar Usuario' : 'Registrar Usuario'}</h2>
                {mensaje && <Alert color="info">{mensaje}</Alert>}
                <Form onSubmit={registrar}>
                    <div className="form-row">
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="nombre"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                            <Label for="nombre">Nombre</Label>
                        </FormGroup>
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="apellido"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />
                            <Label for="apellido">Apellido</Label>
                        </FormGroup>
                    </div>
                    <div className="form-row">
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="date"
                                id="fNacimiento"
                                placeholder="Fecha de nacimiento"
                                value={fecha_nacimiento}
                                max={fechaMaxima.toISOString().split('T')[0]}
                                onChange={(e) => setFNacimiento(e.target.value)}
                                required
                            />
                            <Label for="fNacimiento">Fecha de nacimiento</Label>
                        </FormGroup>
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="ci"
                                placeholder="Documento de Identidad"
                                value={ci}
                                onChange={(e) => setCi(e.target.value)}
                                required
                            />
                            <Label for="ci">Documento de Identidad</Label>
                        </FormGroup>
                    </div>
                    <FormGroup floating className="form-group">
                        <Input
                            type="text"
                            id="direccion"
                            placeholder="Dirección de Domicilio"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                        />
                        <Label for="direccion">Dirección de Domicilio</Label>
                    </FormGroup>
                    <div className="form-row">
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="telefono"
                                placeholder="Teléfono Celular"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                            <Label for="telefono">Teléfono Celular</Label>
                        </FormGroup>
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="password"
                                id="contraseña"
                                placeholder="Contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                required={!usuarioSeleccionado}
                            />
                            <Label for="contraseña">Contraseña</Label>
                        </FormGroup>
                    </div>

                    <FormGroup floating className="form-group">
                        <Input
                            type="email"
                            id="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Label for="email">Correo Electrónico</Label>
                    </FormGroup>

                    {registradoPor === 'Admin' && (
                        <div className="form-row">
                            <FormGroup floating className="form-group col-md-6">
                                <Label for="rol">Rol</Label>
                                <Input
                                    type="select"
                                    id="rol"
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                    required
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Oficina">Oficina</option>
                                    <option value="Pasajero">Pasajero</option>
                                </Input>
                            </FormGroup>
                            <FormGroup floating className="form-group col-md-6">
                                <Label for="empresaId">Empresa</Label>
                                <Input
                                    type="text"
                                    id="empresaId"
                                    value={empresaId}
                                    onChange={(e) => setEmpresaId(e.target.value)}
                                    required
                                />
                            </FormGroup>
                        </div>
                    )}

                    <div className="form-group">
                        <Button color="primary" type="submit">
                            {usuarioSeleccionado ? 'Guardar Cambios' : 'Registrar Usuario'}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default FormularioUsuario;
