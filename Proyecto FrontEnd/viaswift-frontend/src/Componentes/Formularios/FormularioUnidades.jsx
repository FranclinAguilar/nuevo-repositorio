import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';
import conector_unidades from '../../Servicios/conector_unidades';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormularioUnidades.css';

const FormularioUnidades = () => {
    const location = useLocation();
    const unidadSeleccionada = location.state?.unidad || null;

    // State for conductor and vehicle details
    const [conductor, setConductor] = useState({
        nombre: '',
        apellidos: '',
        licencia: '',
        telefono: '',
        vehiculo: {
            marca: '',
            modelo: '',
            capacidad: '',
            placa: ''
        }
    });
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (unidadSeleccionada) {
            setConductor({
                nombre: unidadSeleccionada.nombre || '',
                apellidos: unidadSeleccionada.apellidos || '',
                licencia: unidadSeleccionada.licencia || '',
                telefono: unidadSeleccionada.telefono || '',
                vehiculo: {
                    marca: unidadSeleccionada.vehiculo.marca || '',
                    modelo: unidadSeleccionada.vehiculo.modelo || '',
                    capacidad: unidadSeleccionada.vehiculo.capacidad || '',
                    placa: unidadSeleccionada.vehiculo.placa || ''
                }
            });
        }
    }, [unidadSeleccionada]);

    const registrar = async (e) => {
        e.preventDefault();
        console.log('Datos a enviar:', conductor);
    
        try {
            let respuesta;
            if (unidadSeleccionada) {
                // Actualizar unidad existente usando el endpoint /actualizar
                respuesta = await conector_unidades.put(`/actualizar/${unidadSeleccionada.id}`, conductor);
                setMensaje('Unidad actualizada correctamente');
            } else {
                // Registrar nueva unidad
                respuesta = await conector_unidades.post('/registrar', conductor);
                setMensaje('Unidad registrada correctamente');
            }
        } catch (error) {
            // Si el error tiene una respuesta con un mensaje, se extrae ese mensaje
            setMensaje(error.response ? error.response.data.message || "Error al registrar o actualizar la unidad" : "Error desconocido");
        }
    };
    

    return (
        <div className='fondo_formulario'>
            <div className='contenedor_formulario'>
                <h2>{unidadSeleccionada ? 'Editar Unidad' : 'Registrar Unidad'}</h2>
                {mensaje && <Alert color="info">{mensaje}</Alert>}
                <Form onSubmit={registrar}>
                    {/* Conductor Section */}
                    <div className="form-row">
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="nombre"
                                placeholder="Nombre del Conductor"
                                value={conductor.nombre}
                                onChange={(e) => setConductor({ ...conductor, nombre: e.target.value })}
                                required
                            />
                            <Label for="nombre">Nombre</Label>
                        </FormGroup>
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="apellidos"
                                placeholder="Apellidos del Conductor"
                                value={conductor.apellidos}
                                onChange={(e) => setConductor({ ...conductor, apellidos: e.target.value })}
                                required
                            />
                            <Label for="apellidos">Apellidos</Label>
                        </FormGroup>
                    </div>
                    <div className="form-row">
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="licencia"
                                placeholder="Licencia del Conductor"
                                value={conductor.licencia}
                                onChange={(e) => setConductor({ ...conductor, licencia: e.target.value })}
                                required
                            />
                            <Label for="licencia">Licencia</Label>
                        </FormGroup>
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="telefono"
                                placeholder="Teléfono del Conductor"
                                value={conductor.telefono}
                                onChange={(e) => setConductor({ ...conductor, telefono: e.target.value })}
                                required
                            />
                            <Label for="telefono">Teléfono</Label>
                        </FormGroup>
                    </div>

                    {/* Vehicle Section */}
                    <div className="form-row">
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="marca"
                                placeholder="Marca del Vehículo"
                                value={conductor.vehiculo.marca}
                                onChange={(e) =>
                                    setConductor({
                                        ...conductor,
                                        vehiculo: { ...conductor.vehiculo, marca: e.target.value }
                                    })
                                }
                                required
                            />
                            <Label for="marca">Marca</Label>
                        </FormGroup>
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="number"
                                id="modelo"
                                placeholder="Modelo del Vehículo"
                                value={conductor.vehiculo.modelo}
                                onChange={(e) =>
                                    setConductor({
                                        ...conductor,
                                        vehiculo: { ...conductor.vehiculo, modelo: e.target.value }
                                    })
                                }
                                required
                            />
                            <Label for="modelo">Modelo</Label>
                        </FormGroup>
                    </div>
                    <div className="form-row">
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="number"
                                id="capacidad"
                                placeholder="Capacidad del Vehículo"
                                value={conductor.vehiculo.capacidad}
                                onChange={(e) =>
                                    setConductor({
                                        ...conductor,
                                        vehiculo: { ...conductor.vehiculo, capacidad: e.target.value }
                                    })
                                }
                                required
                            />
                            <Label for="capacidad">Capacidad</Label>
                        </FormGroup>
                        <FormGroup floating className="form-group col-md-6">
                            <Input
                                type="text"
                                id="placa"
                                placeholder="Placa del Vehículo"
                                value={conductor.vehiculo.placa}
                                onChange={(e) =>
                                    setConductor({
                                        ...conductor,
                                        vehiculo: { ...conductor.vehiculo, placa: e.target.value }
                                    })
                                }
                                required
                            />
                            <Label for="placa">Placa</Label>
                        </FormGroup>
                    </div>

                    <div className="form-group">
                        <Button color="primary" type="submit">
                            {unidadSeleccionada ? 'Guardar Cambios' : 'Registrar Unidad'}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default FormularioUnidades;
