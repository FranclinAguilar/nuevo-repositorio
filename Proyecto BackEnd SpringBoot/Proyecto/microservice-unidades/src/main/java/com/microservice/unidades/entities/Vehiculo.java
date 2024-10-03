package com.microservice.unidades.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.aot.generate.GeneratedTypeReference;
@Data
@Entity
public class Vehiculo {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marca;


    @OneToOne
    @JoinColumn(name = "id_conductor", nullable = false)
    private Conductor conductor;
}
