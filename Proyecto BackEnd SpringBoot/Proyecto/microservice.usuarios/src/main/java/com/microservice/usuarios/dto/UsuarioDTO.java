package com.microservice.usuarios.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;
    private int ci;
    private String username;
    private String password;
    private String nombre;
    private String apellido;
    private String f_nacimiento;
    private int telefono;
    private String direccion;
    private String email;
    private String empresaId;
    private int estado;
    private String rol;
}
