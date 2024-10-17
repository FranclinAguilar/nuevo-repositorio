package com.microservice.unidades.websocket;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AsientoRepository extends JpaRepository<Asiento, Integer> {
    void deleteAll();

    List<Asiento> findByEstado(String estado);
}
