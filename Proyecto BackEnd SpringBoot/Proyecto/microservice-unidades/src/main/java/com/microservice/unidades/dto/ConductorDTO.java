package com.microservice.unidades.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConductorDTO {

    private Long id;
    private String nombre;
    private String apellidos;
    private int telefono;
    private String licencia;
    private VehiculoDTO vehiculo;

}
