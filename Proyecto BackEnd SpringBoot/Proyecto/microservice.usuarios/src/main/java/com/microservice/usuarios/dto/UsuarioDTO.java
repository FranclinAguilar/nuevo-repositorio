package com.microservice.usuarios.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;
    private String username;
    private String nombre;
    private String email;
    private String empresaId;
    private int estado;
    private String rol;

    // Getters y Setters
}
