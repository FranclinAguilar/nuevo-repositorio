package com.microservice.reservas.Repository;

import com.microservice.reservas.entities.Viaje;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ViajeRepository extends JpaRepository<Viaje, Long> {
    //Optional<T>findByStatus (String estado);
}
