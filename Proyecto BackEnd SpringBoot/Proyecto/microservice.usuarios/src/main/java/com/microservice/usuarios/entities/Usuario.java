package com.microservice.usuarios.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Data
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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