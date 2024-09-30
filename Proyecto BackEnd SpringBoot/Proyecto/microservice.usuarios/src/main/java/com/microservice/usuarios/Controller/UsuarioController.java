package com.microservice.usuarios.Controller;

import com.microservice.usuarios.Service.UsuarioService;
import com.microservice.usuarios.dto.UsuarioDTO;
import com.microservice.usuarios.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        // Verificar si el email o el username ya existen
        boolean emailExists = usuarioService.existsByEmail(usuario.getEmail());
        boolean usernameExists = usuarioService.existsByUsername(usuario.getUsername());

        if (emailExists) {
            // Retorna un mensaje indicando que el email ya está en uso
            return ResponseEntity.status(HttpStatus.CONFLICT).body("este email ya existe");
        }

        if (usernameExists) {
            // Retorna un mensaje indicando que el username ya está en uso
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Nombre de usuario no disponible");
        }

        // Si no existe, registrar el usuario
        usuarioService.saveUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }


    @GetMapping("/{username}")
    public ResponseEntity<Usuario> getUsuarioByUsername(@PathVariable String username) {
        Usuario usuario = usuarioService.findByUsername(username);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        boolean isRemoved = usuarioService.deleteUsuarioById(id);

        if (!isRemoved) {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("Usuario eliminado exitosamente", HttpStatus.OK);
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioService.findByUsername(loginRequest.getUsername());

        if (usuario != null && usuario.getPassword().equals(loginRequest.getPassword())) {
            if (usuario.getEstado() == 0) {
                return ResponseEntity.status(403).body("El usuario está inactivo");
            }
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login exitoso");
            response.put("rol", usuario.getRol());
            response.put("nombre", usuario.getNombre());
            response.put("empresaId", usuario.getEmpresaId());

            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }

}
