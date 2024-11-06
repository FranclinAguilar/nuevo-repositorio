package com.microservice.unidades.websocket;

import com.microservice.unidades.Repository.ConductorRepository;
import com.microservice.unidades.entities.Conductor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AsientoService {

    @Autowired
    private AsientoRepository asientoRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private ConductorRepository conductorRepository;

    public List<Asiento> obtener_asientos() {
        return asientoRepository.findAll();
    }

    public Asiento reservar_asiento(int id, int idUsuario){
        Optional<Asiento> reserva_Asiento = asientoRepository.findById(id);
        if (reserva_Asiento.isPresent()){
            Asiento asiento = reserva_Asiento.get();
            if(asiento.getEstado().equals("reservando") && asiento.getId_usuario() == idUsuario){

                asiento.setEstado("reservado");
                asiento.setId_usuario(1);
            } else if(asiento.getEstado().equals("reservado") && asiento.getId_usuario() == 1){
                asiento.setEstado("disponible");
                asiento.setId_usuario(null);
            }
            asientoRepository.save(asiento);
            messagingTemplate.convertAndSend("/topic/asientos", obtener_asientos());
            return asiento;
        } else {
            throw new RuntimeException("asiento no encontrado");
        }
    }


    public Asiento cambiar_estado(int id, int idUsuario) {
        Optional<Asiento> optionalAsiento = asientoRepository.findById(id);
        if (optionalAsiento.isPresent()) {
            Asiento asiento = optionalAsiento.get();

            if (asiento.getEstado().equals("disponible")) {
                asiento.setEstado("reservando");
                asiento.setId_usuario(idUsuario);
            } else if (asiento.getEstado().equals("reservando") && asiento.getId_usuario() == idUsuario) {
                asiento.setEstado("disponible");
                asiento.setId_usuario(null);
            }
            asientoRepository.save(asiento);
            messagingTemplate.convertAndSend("/topic/asientos", obtener_asientos());
            return asiento;
        } else {
            throw new RuntimeException("Asiento no encontrado"); // O lanzar una excepción personalizada
        }
    }


    /*public Asiento cambiarEstado(int id) {
        Asiento asiento = asientoRepository.findById(id);
        if (asiento.getEstado().equals("disponible")) {
            asiento.setEstado("no disponible");
        } else if (asiento.getEstado().equals("no disponible")) {
            asiento.setEstado("disponible");
        }
        asientoRepository.save(asiento);

        // Envía la actualización a todos los clientes suscritos al WebSocket
        messagingTemplate.convertAndSend("/topic/asientos", obtenerAsientos());
        return asiento;
*/

    //eliminar asientos
    public void eliminarAsientos() {
        asientoRepository.deleteAll(); // Elimina todos los asientos

        // Enviar la lista vacía a través del WebSocket
        List<Asiento> asientosVacios = asientoRepository.findAll(); // Debería estar vacío
        messagingTemplate.convertAndSend("/topic/asientos", asientosVacios); // Envía la lista vacía

        messagingTemplate.convertAndSend("/topic/asientos", "vacio");
    }


    // Guardar un nuevo asiento
    public Asiento guardarAsiento(Asiento asiento) {
        Asiento asientoGuardado = asientoRepository.save(asiento);

        // Enviar la lista completa de asientos
        List<Asiento> listaAsientos = asientoRepository.findAll(); // Obtiene todos los asientos
        messagingTemplate.convertAndSend("/topic/asientos", listaAsientos); // Envía la lista

        return asientoGuardado;
    }
/*

    public Asiento cambiarEstado(int id) {
        Asiento asiento = asientoRepository.findById(id).orElseThrow();
        if (asiento.getEstado().equals("disponible")) {
            asiento.setEstado("no disponible");
        } else if (asiento.getEstado().equals("no disponible")) {
            asiento.setEstado("disponible");
        }
        asientoRepository.save(asiento);

        // Envía la actualización a todos los clientes suscritos al WebSocket
        messagingTemplate.convertAndSend("/topic/asientos", obtenerAsientos());
        return asiento;
    }*/

    }