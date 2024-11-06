package com.microservice.usuarios.dto;

import lombok.Data;

@Data
public class UsuarioDTOLogin {
    private Long id;
    private String nombre;
    private String apellido;
    private String empresaId;
    private String rol;
}