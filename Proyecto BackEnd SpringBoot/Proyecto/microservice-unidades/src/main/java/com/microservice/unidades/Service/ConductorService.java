package com.microservice.unidades.Service;

import com.microservice.unidades.Repository.ConductorRepository;
import com.microservice.unidades.dto.ConductorDTO;
import com.microservice.unidades.entities.Conductor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class ConductorService {

    @Autowired
    private ConductorRepository conductorRepository;

    //Servicio de guardar Conductor, se incluye el Vehículo
    public void saveConductor(Conductor conductor) {
        if (conductor.getVehiculo() != null) {
            conductor.getVehiculo().setConductor(conductor);
        }
        conductorRepository.save(conductor);
    }

    //Servicio para listar

//    public List<ConductorDTO> findAllConductorDTOs() {
//        // Obtener todos los conductores desde la base de datos
//        List<Conductor> conductores = conductorRepository.findAll();
//
//        // Convertir la lista de entidades Conductor a DTO
//        return conductores.stream()
//                .map(conductor -> ConductorDTO.builder()
//                        .id(conductor.getId())
//                        .nombre(conductor.getNombre())
//                        .build())
//                .collect(toList());
//    }

    public List<ConductorDTO> findAllConductorDTOs(){
        List<Conductor> conductores = conductorRepository.findAll();
        return conductores.stream()
                .map(conductor -> ConductorDTO.builder()
                        .id(conductor.getId())
                        .nombre(conductor.getNombre())
                        .build())
                .collect(toList());
    }

}
