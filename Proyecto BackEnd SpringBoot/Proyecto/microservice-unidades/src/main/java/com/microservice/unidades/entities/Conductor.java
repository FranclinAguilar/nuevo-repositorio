package com.microservice.unidades.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
@Entity
public class Conductor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;

    @OneToOne(mappedBy = "conductor", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Vehiculo vehiculo;
}
