package com.microservice.unidades.Controller;

import com.microservice.unidades.Repository.VehiculoRepository;
import com.microservice.unidades.Service.ConductorService;
import com.microservice.unidades.dto.ConductorDTO;
import com.microservice.unidades.entities.Conductor;
import com.microservice.unidades.entities.Vehiculo;
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

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar la unidad: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllConductores(){
        List<ConductorDTO> conductorList = conductorService.findAllConductorAndVehiculos();
        return ResponseEntity.ok(conductorList);
    }


    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarUnidad(@PathVariable Long id, @RequestBody Conductor conductorActualizado) {
        try {
            boolean actualizado = conductorService.updateConductor(id, conductorActualizado);
            if (actualizado) {
                return ResponseEntity.ok("Unidad actualizada correctamente!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Conductor no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la unidad: " + e.getMessage());
        }
    }



    //buscar por su id

    @GetMapping("/{id}")
    public ResponseEntity<?> findConductorById(@PathVariable Long id) {
        ConductorDTO conductorDTO = conductorService.findConductorById(id);
        if (conductorDTO != null) {
            return ResponseEntity.ok(conductorDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Conductor no encontrado");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> eliminarUnidad(@PathVariable Long id){
        boolean isRemoved = conductorService.DeleteConductorById(id);
        if(!isRemoved){
            return new ResponseEntity<>("Conductor no Encontrado", HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>("Unidad Eliminada Correctamente", HttpStatus.OK);

    }


    /*@GetMapping("/vehiculos")
    public Iterable<Vehiculo> getAllVehiculos(){
        return vehiculoRepository.findAll();
    }*/
}
