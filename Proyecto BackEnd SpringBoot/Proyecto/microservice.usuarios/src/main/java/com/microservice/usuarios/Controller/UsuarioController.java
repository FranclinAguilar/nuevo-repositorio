package com.microservice.usuarios.Controller;

import com.microservice.usuarios.Service.UsuarioService;
import com.microservice.usuarios.dto.UsuarioDTO;
import com.microservice.usuarios.dto.UsuarioDTOLogin;
import com.microservice.usuarios.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/all")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuarios() {
        List<UsuarioDTO> usuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUsuario(@RequestBody Usuario usuario) {
        if (usuarioService.existsByCi(usuario.getCi())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Documento de Identidad en uso");
        }
        if (usuarioService.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Este email ya existe");
        }
        if (usuarioService.existsByTelefono(usuario.getTelefono())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El teléfono ya se encuentra en uso");
        }
        usuarioService.saveUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario Registrado");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> modificarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        boolean isUpdated = usuarioService.updateUsuarioById(id, usuarioActualizado);
        return isUpdated ?
                ResponseEntity.ok("Usuario modificado exitosamente") :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        boolean isRemoved = usuarioService.deleteUsuarioById(id);
        return isRemoved ?
                ResponseEntity.ok("Usuario eliminado exitosamente") :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }

    @PostMapping("/login")
    public ResponseEntity<?>     login(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioService.findByTelefono(loginRequest.getTelefono());

        if (usuario != null && usuario.getPassword().equals(loginRequest.getPassword())) {
            if (!usuario.isEstado()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("El usuario se encuentra inactivo");
            }

            UsuarioDTOLogin usuarioDTO = new UsuarioDTOLogin();
            usuarioDTO.setId(usuario.getId());
            usuarioDTO.setNombre(usuario.getNombre());
            usuarioDTO.setApellido(usuario.getApellido());
            usuarioDTO.setEmpresaId(usuario.getEmpresaId());
            usuarioDTO.setRol(usuario.getRol());

            return ResponseEntity.ok(usuarioDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }
}
