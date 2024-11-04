package com.microservice.reservas.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;
    private String nombreApellido;
    private String numReserva;
    private String asientos;
    private double precio;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaHora;


    private Long idUsuario;
    private String estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_viaje", nullable = false)
    @JsonIgnore
    private Viaje viaje; // Relación muchos a uno con viaje
}
