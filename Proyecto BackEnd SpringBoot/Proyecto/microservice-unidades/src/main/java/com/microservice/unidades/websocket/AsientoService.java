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

    public List<Asiento> obtenerAsientos() {
        return asientoRepository.findAll();
    }

    public Asiento cambiarEstado(int id) {
        Asiento asiento = asientoRepository.findById(id).orElseThrow();
        // Cambia entre 'disponible' y 'no disponible'
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
