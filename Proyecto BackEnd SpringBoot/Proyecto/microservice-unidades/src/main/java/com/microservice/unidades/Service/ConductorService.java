package com.microservice.unidades.Service;

import com.microservice.unidades.Repository.ConductorRepository;
import com.microservice.unidades.dto.ConductorDTO;
import com.microservice.unidades.dto.VehiculoDTO;
import com.microservice.unidades.entities.Conductor;
import com.microservice.unidades.entities.Vehiculo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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


    //eliminar conductor, como está tipo cascade
    //elimina el vehículo también
    public boolean DeleteConductorById(Long id){
        if(conductorRepository.existsById(id)){
            conductorRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public boolean actualizarEstadoConductor(Long id, Conductor estadoActualizado) {
        Optional<Conductor> estadoOptional = conductorRepository.findById(id);

        if (estadoOptional.isPresent()) {

            Conductor conductorExists = estadoOptional.get();
            conductorExists.setEstado(estadoActualizado.isEstado());
            conductorRepository.save(conductorExists);
            return true;
        }
        return false;

    }


    public boolean updateConductor(Long id, Conductor conductorActualizado) {
        Optional<Conductor> conductorOptional = conductorRepository.findById(id);
        if (conductorOptional.isPresent()) {
            Conductor conductorExistente = conductorOptional.get();

            // Actualizar los campos del Conductor
            conductorExistente.setNombre(conductorActualizado.getNombre());
            conductorExistente.setApellidos(conductorActualizado.getApellidos());
            conductorExistente.setLicencia(conductorActualizado.getLicencia());
            conductorExistente.setTelefono(conductorActualizado.getTelefono());
            conductorExistente.setEstado(conductorActualizado.isEstado());

            // Actualizar los datos del Vehículo, si existe
            if (conductorExistente.getVehiculo() != null && conductorActualizado.getVehiculo() != null) {
                Vehiculo vehiculoExistente = conductorExistente.getVehiculo();
                Vehiculo vehiculoActualizado = conductorActualizado.getVehiculo();

                vehiculoExistente.setMarca(vehiculoActualizado.getMarca());
                vehiculoExistente.setModelo(vehiculoActualizado.getModelo());
                vehiculoExistente.setCapacidad(vehiculoActualizado.getCapacidad());
                vehiculoExistente.setPlaca(vehiculoActualizado.getPlaca());
            }

            conductorRepository.save(conductorExistente); // Guardar los cambios
            return true;
        }
        return false;
    }



    public List<ConductorDTO> findAllConductorAndVehiculos(){
        List<Conductor> conductores = conductorRepository.findAll();

        return conductores.stream()
                .map(conductor -> ConductorDTO.builder()
                        .id(conductor.getId())
                        .nombre(conductor.getNombre())
                        .apellidos(conductor.getApellidos())
                        .licencia(conductor.getLicencia())
                        .telefono(conductor.getTelefono())
                        .estado(conductor.isEstado())
                        .vehiculo(conductor.getVehiculo() != null ? VehiculoDTO.builder()
                                .id(conductor.getVehiculo().getId())
                                .marca(conductor.getVehiculo().getMarca())
                                .placa(conductor.getVehiculo().getPlaca())
                                .modelo(conductor.getVehiculo().getModelo())
                                .capacidad(conductor.getVehiculo().getCapacidad())

                                .build() : null)
                        .build())
                .collect(Collectors.toList());
    }




    //buscar por su id

    // Método para buscar conductor por ID
    public ConductorDTO findConductorById(Long id) {
        Optional<Conductor> conductorOptional = conductorRepository.findById(id);
        if (conductorOptional.isPresent()) {
            Conductor conductor = conductorOptional.get();
            return ConductorDTO.builder()
                    .id(conductor.getId())
                    .nombre(conductor.getNombre())
                    .apellidos(conductor.getApellidos())
                    .licencia(conductor.getLicencia())
                    .telefono(conductor.getTelefono())
                    .vehiculo(conductor.getVehiculo() != null ? VehiculoDTO.builder()
                            .id(conductor.getVehiculo().getId())
                            .marca(conductor.getVehiculo().getMarca())
                            .placa(conductor.getVehiculo().getPlaca())
                            .capacidad(conductor.getVehiculo().getCapacidad())
                            .build() : null)
                    .build();
        }
        return null; //no olvidar lanzar excepción!
    }
}
