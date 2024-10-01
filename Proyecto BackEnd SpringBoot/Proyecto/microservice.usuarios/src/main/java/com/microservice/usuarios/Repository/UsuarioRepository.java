package com.microservice.usuarios.Repository;
import com.microservice.usuarios.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Usuario findByTelefono(String telefono);
}
