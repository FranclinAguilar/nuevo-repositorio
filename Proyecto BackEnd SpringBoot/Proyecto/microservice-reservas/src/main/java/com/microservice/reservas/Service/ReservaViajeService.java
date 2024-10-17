package com.microservice.reservas.Service;

import com.microservice.reservas.Repository.ReservaRepository;
import com.microservice.reservas.Repository.ViajeRepository;
import com.microservice.reservas.WebSockets.ViajeWebSocketController;
import com.microservice.reservas.entities.Reserva;
import com.microservice.reservas.entities.Viaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaViajeService {

    @Autowired
    private ViajeRepository viajeRepository; // Inyección del repositorio de Viaje

    @Autowired
    private ReservaRepository reservaRepository; // Inyección del repositorio de Reserva

    @Autowired
    private ViajeWebSocketController webSocketController;
    // Obtener todos los viajes
    public List<Viaje> findAllViajes() {
        return viajeRepository.findAll(); // Usamos viajeRepository aquí
    }

    // Obtener un viaje por ID
    public Optional<Viaje> findViajeById(Long id) {
        return viajeRepository.findById(id); // Usamos viajeRepository aquí
    }

    /*obtener un viaje por su estado
    public Optional<Viaje> findStatusByEstado(String estado){
        return viajeRepository.findByStatus(estado);
    }*/


    // Guardar un viaje
    // Guardar un viaje
    public Viaje saveViaje(Viaje viaje) {
        Long lastId = viajeRepository.count();
        int nextNumViaje = (lastId.intValue() + 1);

        String formattedNumViaje = new DecimalFormat("000").format(nextNumViaje);
        viaje.setNumViaje("viaje-" + formattedNumViaje); // Establecer el número de viaje formateado

        viaje.setFecha(LocalDate.now());
        Viaje viajeGuardado = viajeRepository.save(viaje);

        // Enviar notificación de nuevo viaje a través del WebSocket
        webSocketController.notificarNuevoViaje(viajeGuardado);

        return viajeGuardado;
    }




    // Agregar una reserva a un viaje existente
    public Reserva addReservaToViaje(Long idViaje, Reserva nuevaReserva) {
        Viaje viaje = viajeRepository.findById(idViaje)
                .orElseThrow(() -> new RuntimeException("Viaje no encontrado"));

        nuevaReserva.setViaje(viaje);

        // Generar el número de reserva (si no existe)
        Long lastReservaId = reservaRepository.count();
        int nextNumReserva = (lastReservaId.intValue() + 1);
        String formattedNumReserva = "reserva-" + new DecimalFormat("000").format(nextNumReserva);
        nuevaReserva.setNumReserva(formattedNumReserva); // Establecer el número de reserva formateado

        // Establecer la fecha y hora de la reserva
        nuevaReserva.setFechaHora(LocalDateTime.now()); // Usar la fecha y hora actual

        // Guardar la reserva en la base de datos
        return reservaRepository.save(nuevaReserva); // Guardamos la reserva usando reservaRepository
    }
}
