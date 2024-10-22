package com.microservice.unidades.websocket;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Asiento {
    @Id
    private Integer id;
    private String estado;
    private Integer id_usuario; // Campo para almacenar el ID del usuario que reservó el asiento
}
