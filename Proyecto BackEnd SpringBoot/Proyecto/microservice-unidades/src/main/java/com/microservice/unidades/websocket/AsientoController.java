package com.microservice.unidades.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AsientoController {

    @Autowired
    private AsientoService asientoService;

    @GetMapping("/asientos_list")
    public List<Asiento> obtenerAsientos() {
        return asientoService.obtenerAsientos();
    }

    @PutMapping("/asientos_id/{id}")
    public Asiento cambiarEstado(@PathVariable int id) {
        return asientoService.cambiarEstado(id);
    }

    @MessageMapping("/cambiarEstado")
    @SendTo("/topic/asientos")
    public List<Asiento> cambiarEstadoWs(int id) {
        asientoService.cambiarEstado(id);
        return asientoService.obtenerAsientos(); // Envía la lista actualizada a todos los clientes
    }
}
