import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const UnidadEnCola = ({ unidad }) => {
    if (!unidad) {
        return <p>No hay unidad seleccionada.</p>;
    }

    return (
        <Card className="mb-3">
            <CardBody>
                <CardTitle tag="h2">Detalles de la Unidad</CardTitle>
                <CardText>
                    <strong>Conductor:</strong> {unidad.nombre} {unidad.apellidos}
                </CardText>
                <CardText>
                    <strong>Marca del Vehículo:</strong> {unidad.vehiculo?.marca}
                </CardText>
                <CardText>
                    <strong>Capacidad:</strong> {unidad.vehiculo?.capacidad}
                </CardText>
                <CardText>
                    <strong>Licencia:</strong> {unidad.licencia}
                </CardText>
                <CardText>
                    <strong>Teléfono:</strong> {unidad.telefono}
                </CardText>
            </CardBody>
        </Card>
    );
};

export default UnidadEnCola;
