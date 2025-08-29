package com.example.projet_LMS.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.projet_LMS.model.LoginDTO;
import com.example.projet_LMS.model.LoginResponseDTO;
import com.example.projet_LMS.services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        try {
            LoginResponseDTO response = authService.authenticate(loginDTO);
            
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            LoginResponseDTO errorResponse = LoginResponseDTO.builder()
                .success(false)
                .message("Erreur serveur: " + e.getMessage())
                .build();
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Service d'authentification fonctionne !");
    }
}
