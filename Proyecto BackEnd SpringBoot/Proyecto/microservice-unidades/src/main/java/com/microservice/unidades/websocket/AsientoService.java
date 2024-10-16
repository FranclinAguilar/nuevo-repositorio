package com.microservice.unidades.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsientoService {

    @Autowired
    private AsientoRepository asientoRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    //lista de asientos
    public List<Asiento> obtenerAsientos() {
        return asientoRepository.findAll();
    }

    // Eliminar asientos
    public void eliminarAsientos() {
        asientoRepository.deleteAll(); // Elimina todos los asientos

        // Enviar la lista vacía a través del WebSocket
        List<Asiento> asientosVacios = asientoRepository.findAll(); // Debería estar vacío
        messagingTemplate.convertAndSend("/topic/asientos", asientosVacios); // Envía la lista vacía
    }


    // Guardar un nuevo asiento
    public Asiento guardarAsiento(Asiento asiento) {
        Asiento asientoGuardado = asientoRepository.save(asiento);

        // Enviar la lista completa de asientos
        List<Asiento> listaAsientos = asientoRepository.findAll(); // Obtiene todos los asientos
        messagingTemplate.convertAndSend("/topic/asientos", listaAsientos); // Envía la lista

        return asientoGuardado;
    }


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
    }
}
