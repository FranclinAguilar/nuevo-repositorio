package com.microservice.reservas.Repository;

import com.microservice.reservas.entities.Viaje;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViajeRepository extends JpaRepository<Viaje, Long> {
}
