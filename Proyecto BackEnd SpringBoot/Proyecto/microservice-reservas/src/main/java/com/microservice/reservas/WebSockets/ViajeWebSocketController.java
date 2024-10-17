package com.microservice.reservas.WebSockets;

import com.microservice.reservas.entities.Viaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ViajeWebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/viajes/notificar")
    public void notificarNuevoViaje(@RequestBody Viaje viaje) {
        messagingTemplate.convertAndSend("/topic/viajes", viaje);
    }

}
