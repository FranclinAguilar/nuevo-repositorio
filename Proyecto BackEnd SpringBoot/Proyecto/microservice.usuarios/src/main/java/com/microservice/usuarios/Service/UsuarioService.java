package com.microservice.usuarios.Service;

import com.microservice.usuarios.Repository.UsuarioRepository;
import com.microservice.usuarios.dto.UsuarioDTO;
import com.microservice.usuarios.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario findBytelefono(String telefono){
        return usuarioRepository.findByTelefono(telefono);
    }
    public Usuario findByUsername(String username) {

        return usuarioRepository.findByUsername(username);
    }

    public void saveUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }
    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }
    public boolean deleteUsuarioById(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }



    // UsuarioService.java
    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public List<UsuarioDTO> getAllUsuarios() {
        // Obtener todos los usuarios desde la base de datos
        List<Usuario> usuarios = usuarioRepository.findAll();

        // Convertir la lista de entidades Usuario a DTO
        List<UsuarioDTO> usuarioDTOs = usuarios.stream()
                .map(this::convertToDTO) // Usamos un método de conversión
                .collect(Collectors.toList());

        return usuarioDTOs;
    }

    // Método para convertir la entidad Usuario a UsuarioDTO
    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setCi(usuario.getCi());
        usuarioDTO.setUsername(usuario.getUsername());
        usuarioDTO.setNombre(usuario.getNombre());
        usuarioDTO.setApellido(usuario.getApellido());
        usuarioDTO.setF_nacimiento(usuario.getF_nacimiento());
        usuarioDTO.setTelefono(usuario.getTelefono());
        usuarioDTO.setDireccion(usuario.getDireccion());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setEmpresaId(usuario.getEmpresaId());
        usuarioDTO.setEstado(usuario.getEstado());
        usuarioDTO.setRol(usuario.getRol());
        usuarioDTO.setPassword(usuario.getPassword()); // Asegúrate de que este campo esté aquí

        return usuarioDTO;
    }


}
