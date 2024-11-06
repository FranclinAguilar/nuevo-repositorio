package com.microservice.usuarios.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
@Data
public class UsuarioDTO {
    private Long id;
    private String ci;
    private String nombre;
    private String apellido;





    private LocalDate fecha_nacimiento;
    private String telefono;
    private String direccion;
    private String email;
    private String empresaId;
    private boolean estado;
    private String rol;
}