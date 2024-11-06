package com.microservice.usuarios.Repository;
import com.microservice.usuarios.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);
    boolean existsByTelefono(String telefono);
    boolean existsByCi(String ci);
    Usuario findByTelefono(String telefono);
}