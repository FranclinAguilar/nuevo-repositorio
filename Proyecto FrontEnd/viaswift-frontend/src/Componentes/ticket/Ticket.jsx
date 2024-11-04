import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from 'reactstrap';
import './Ticket.css';

const Ticket = ({ ticketData }) => {
    const ticketRef = useRef();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true); // Ocultar el botón
        const canvas = await html2canvas(ticketRef.current, {
            ignoreElements: (element) => element.classList.contains('no-download'), // Ignorar el botón
        });
        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'ticket.png';
        link.click();

        setIsDownloading(false); // Mostrar el botón de nuevo
    };

    return (
        <div className='fondo_Ticket'>
            <div className="ticket" ref={ticketRef}>
                <div className="ticket-header">
                    <h3>MiTicket</h3>
                </div>
                <div className="ticket-body">
                    <div className="ticket-detail">
                        <div><strong>N°</strong> {ticketData.numReserva}</div>
                        <div><strong>Nombres</strong> {ticketData.nombreApellido}</div>
                        <div><strong>Fecha:</strong> {ticketData.fechaHora.split(" ")[0]}</div>
                        <div><strong>Hora:</strong> {ticketData.fechaHora.split(" ")[1]}</div>
                        <div><strong>Asientos:</strong> {ticketData.asientos}</div>
                        <div><strong>Precio:</strong> {ticketData.precio} Bs</div>
                    </div>
                </div>
                <div className="ticket-footer">
                    <Button className="no-download" color="secondary" onClick={handleDownload} disabled={isDownloading}>
                        Descargar Boleto
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
