package com.microservice.unidades.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AsientoController {

    @Autowired
    private AsientoService asientoService;

   @GetMapping("/asientos_list")
    public List<Asiento> obtenerAsientos() {
        return asientoService.obtener_asientos();
    }

    @PutMapping("/asientos_id/{id}/{idUsuario}")
    public Asiento cambiarEstado(@PathVariable int id, @PathVariable int idUsuario) {
        return asientoService.cambiar_estado(id, idUsuario);
    }

/*
    @PostMapping("/guardar_asientos")
    public Asiento guardarAsiento(@RequestBody Asiento asiento) {
        return asientoService.guardarAsiento(asiento);
    }

    //eliminar
    @DeleteMapping("/eliminar_asientos")
    public ResponseEntity<Void> eliminarAsientos() {
        asientoService.eliminarAsientos();
        return ResponseEntity.noContent().build();
    }

    //cambiar
    @MessageMapping("/cambiarEstado")
    @SendTo("/topic/asientos")
    public List<Asiento> cambiarEstadoWs(int id) {
        asientoService.cambiarEstado(id);
        return asientoService.obtenerAsientos(); // Envía la lista actualizada a todos los clientes
    }*/
}
