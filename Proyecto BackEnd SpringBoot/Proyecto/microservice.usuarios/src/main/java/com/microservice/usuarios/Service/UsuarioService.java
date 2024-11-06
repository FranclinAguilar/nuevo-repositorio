package com.microservice.usuarios.Service;

import com.microservice.usuarios.Repository.UsuarioRepository;
import com.microservice.usuarios.dto.UsuarioDTO;
import com.microservice.usuarios.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario findByTelefono(String telefono) {
        return usuarioRepository.findByTelefono(telefono);
    }

    public void saveUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public boolean existsByCi(String ci) {
        return usuarioRepository.existsByCi(ci);
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public boolean existsByTelefono(String telefono) {
        return usuarioRepository.existsByTelefono(telefono);
    }

    public boolean deleteUsuarioById(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<UsuarioDTO> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        return new UsuarioDTO() {{
            setId(usuario.getId());
            setCi(usuario.getCi());
            setNombre(usuario.getNombre());
            setApellido(usuario.getApellido());
            setFecha_nacimiento(usuario.getFecha_nacimiento());
            setTelefono(usuario.getTelefono());
            setDireccion(usuario.getDireccion());
            setEmail(usuario.getEmail());
            setEmpresaId(usuario.getEmpresaId());
            setEstado(usuario.isEstado());
            setRol(usuario.getRol());
        }};
    }

    public boolean updateUsuarioById(Long id, Usuario usuarioActualizado) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);

        return usuarioExistente.map(usuario -> {
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setApellido(usuarioActualizado.getApellido());
            usuario.setEmail(usuarioActualizado.getEmail());
            usuario.setCi(usuarioActualizado.getCi());
            usuario.setTelefono(usuarioActualizado.getTelefono());
            usuario.setDireccion(usuarioActualizado.getDireccion());
            usuario.setFecha_nacimiento(usuarioActualizado.getFecha_nacimiento());
            usuario.setRol(usuarioActualizado.getRol());
            usuario.setPassword(usuarioActualizado.getPassword());
            usuario.setEstado(usuarioActualizado.isEstado());

            usuarioRepository.save(usuario);
            return true;
        }).orElse(false);
    }
}
