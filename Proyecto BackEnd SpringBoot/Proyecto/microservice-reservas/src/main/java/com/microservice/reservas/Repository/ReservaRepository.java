package com.microservice.reservas.Repository;

import com.microservice.reservas.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservaRepository extends JpaRepository<Reserva,Long> {

    List<Reserva> findByidUsuario(Long idUsuario);
    List<Reserva> findByEstado(String estado);
    Optional<Reserva> findById(Long id);

}
