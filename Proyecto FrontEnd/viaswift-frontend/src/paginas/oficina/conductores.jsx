import React, { useState } from 'react';
import { Button, ListGroup, ListGroupItem, Alert, Spinner } from 'reactstrap';
import conector_reservas from '../../Servicios/conector_reservas';
import conector_unidades from '../../Servicios/conector_unidades';
import axios from 'axios';
const ListaConductores = ({ onSelectConductor }) => {
    const [conductores, setConductores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const obtenerConductores = async () => {
        setLoading(true);
        setError(null);
        try {
            const respuesta = await conector_unidades.get('/all');
            console.log(respuesta.data)
            setConductores(respuesta.data);
        } catch (error) {
            setError('Error al obtener los conductores');
            console.error('Error al obtener los conductores', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectConductor = async (conductor) => {
        try {
            //buscar viaje que esté abordando
            const respuesta = await conector_reservas.get("/all");
            const datos = respuesta.data;
            const viajesAbordando = datos.find(viaje => viaje.estado === "abordando");

            if (viajesAbordando) {
                alert("Existe un vehículo abordando pasajeros");
                return;
            } else{
                const confirmar = window.confirm(`¿Deseas añadir a ${conductor.nombre} con capacidad ${conductor.vehiculo.capacidad}a la espera?`);



                if (confirmar) {
        
                    const capacidad = conductor.vehiculo.capacidad;
        
                    for (let i = 1; i <= capacidad; i++) {
                        const nuevoAsiento = {
                            id: i,
                            estado: 'disponible',
                            id_usuario: null
                        };
        
                        try {
                            await axios.post('http://localhost:9090/guardar_asientos', nuevoAsiento)
                        } catch (error) {
                            console.error('Error al guardar el asiento:', error);
                        }
                    }
                    const viaje = {
                        origen: 'Sucre',
                        destino: 'Tarija',
                        estado: 'abordando',
                        idConductor: conductor.id
                    };
        
        
                    try {
                        const respuesta = await conector_reservas.post('/registrar', viaje);
                        console.log('Viaje registrado:', respuesta.data);
                        alert("viaje registrado: ", respuesta.data);
                        onSelectConductor(conductor);
                    } catch (error) {
                        console.error('Error al registrar el viaje', error);
                        alert('Error al registrar el viaje. Por favor, intenta de nuevo.');
                    }
                }
            }
        } catch (error) {

        }
        
        
    };

    return (
        <div>
            <Button color="success" onClick={obtenerConductores} className="mb-3">
                Cargar Unidades
            </Button>

            {loading && (
                <div className="text-center">
                    <Spinner color="primary" />
                </div>
            )}
            {error && <Alert color="danger">{error}</Alert>}

            {conductores.length > 0 ? (
    <ListGroup>
        {conductores.map((conductor) => (
            <ListGroupItem key={conductor.id} className="d-flex justify-content-between align-items-center">
                <div>
                    {conductor.nombre} (Vehículo: {conductor.vehiculo ? conductor.vehiculo.marca : 'Sin vehículo asignado'})
                </div>
                <Button color="success" onClick={() => handleSelectConductor(conductor)}>
                    Seleccionar
                </Button>
            </ListGroupItem>
        ))}
    </ListGroup>
) : (
    !loading && <p>Busca Unidades para el Viaje</p>
)}

        </div>
    );
};

export default ListaConductores;
