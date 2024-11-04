package com.microservice.reservas.Controller;

import com.microservice.reservas.Service.ReservaViajeService;
import com.microservice.reservas.entities.Reserva;
import com.microservice.reservas.entities.Viaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/viajes") // no olvidar anotar
public class ReservaController {

    @Autowired
    private ReservaViajeService reservaViajeService;

    // Endpoint para listar todos los viajes
    @GetMapping("/all")
    public ResponseEntity<List<Viaje>> listarTodosLosViajes() {
        List<Viaje> viajes = reservaViajeService.findAllViajes();
        if (viajes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(viajes);
    }
    @GetMapping("/reservas/abordando")
    public ResponseEntity<List<Reserva>> obtenerReservasAbordando() {
        List<Reserva> reservasAbordando = reservaViajeService.findReservasByEstado("abordando");
        return ResponseEntity.ok(reservasAbordando); // Siempre devuelve un 200 OK
    }



    // Endpoint para listar un viaje por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerViajePorId(@PathVariable Long id) {
        Optional<Viaje> viaje = reservaViajeService.findViajeById(id);
        if (viaje.isPresent()) {
            return ResponseEntity.ok(viaje.get()); // Si el viaje existe, retornamos el viaje
        }
        return ResponseEntity.notFound().build(); // Si no existe, retornamos 404 Not Found
    }



    @PutMapping("/estado_reservas")
    public ResponseEntity<List<Reserva>> cambiarEstadoReservas(
            @RequestParam String estadoActual,
            @RequestParam String nuevoEstado) {
        List<Reserva> reservasActualizadas = reservaViajeService.actualizarEstadoReservas(estadoActual, nuevoEstado);
        return ResponseEntity.ok(reservasActualizadas); // Devuelve la lista de reservas actualizadas
    }

    //esto cambia de reservado a anulado
    @PutMapping("/reserva_a_anulado")
    public ResponseEntity<Reserva> cambiarEstadoReservas(
            @RequestParam Long idReserva,
            @RequestParam String estadoActual,
            @RequestParam String nuevoEstado) {
        try {
            Reserva reservaActualizada = reservaViajeService.anularReserva(idReserva,estadoActual,nuevoEstado);
            return ResponseEntity.ok(reservaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



    @PutMapping("/estado_viajes")
    public ResponseEntity<List<Viaje>> cambiarEstadoViajes(
            @RequestParam String estadoActual,
            @RequestParam String nuevoEstado) {
        List<Viaje> viajesActualizados = reservaViajeService.actualizarEstadoViajes(estadoActual, nuevoEstado);
        return ResponseEntity.ok(viajesActualizados); // Devuelve la lista de viajes actualizados
    }

    @GetMapping("/reservas/{idUsuario}")
    public List<Reserva> obtenerReservaPorIdUsuario(@PathVariable Long idUsuario){
        return reservaViajeService.findByUserId(idUsuario);
    }


    // Endpoint para crear un viaje
    @PostMapping("/registrar")
    public ResponseEntity<Viaje> crearViaje(@RequestBody Viaje viaje) {
        Viaje viajeGuardado = reservaViajeService.saveViaje(viaje);
        return ResponseEntity.created(URI.create("/api/viajes/" + viajeGuardado.getIdViaje())).body(viajeGuardado);
    }



    // Endpoint para agregar una reserva a un viaje existente
    @PostMapping("/{idViaje}/reservas")
    public ResponseEntity<Reserva> agregarReserva(@PathVariable Long idViaje, @RequestBody Reserva nuevaReserva) {
        Reserva reservaGuardada = reservaViajeService.addReservaToViaje(idViaje, nuevaReserva);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaGuardada);
    }
}
