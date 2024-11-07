package com.microservice.unidades.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VehiculoDTO {

    private Long id;
    private String marca;
    private int modelo;
    private int capacidad;
    private String placa;
}
