package com.microservice.unidades.Controller;

import com.microservice.unidades.Service.ConductorService;
import com.microservice.unidades.dto.ConductorDTO;
import com.microservice.unidades.entities.Conductor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unidades")
public class UnidadController {
    @Autowired
    private ConductorService conductorService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUnidad(@RequestBody Conductor conductor) {
        try {
            conductorService.saveConductor(conductor);
            return ResponseEntity.status(HttpStatus.CREATED).body("Unidad registrada correctamente!");
        } catch (Exception e) {
            // Log el error (puedes usar un logger como SLF4J)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar la unidad: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllConductores(){
        List<ConductorDTO> conductorList = conductorService.findAllConductorDTOs();
        return ResponseEntity.ok(conductorList);
    }
}
