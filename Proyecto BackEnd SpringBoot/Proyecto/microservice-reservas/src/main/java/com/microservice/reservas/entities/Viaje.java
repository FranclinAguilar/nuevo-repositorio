package com.microservice.reservas.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "viajes")
public class Viaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idViaje;

    private String numViaje;
    private LocalDate fecha;
    private String origen;
    private String destino;

    private String estado;
    private Long idConductor;

    @OneToMany(mappedBy = "viaje", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas; // Relación uno a muchos con reservas
}
