package com.example.projet_LMS.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.projet_LMS.services.UtilisateurService;

@RestController
@RequestMapping("/api/list_utilisateur")
@CrossOrigin(origins = "http://localhost:4200")
public class ListUtilisateurController {

    private final UtilisateurService utilisateurService;

    // ✅ Injection par constructeur
    public ListUtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @GetMapping("/utilisateurs")
    public ResponseEntity<?> getAllUtilisateurs() {
        try {
            System.out.println("=== LIST UTILISATEURS CONTROLLER ===");
            var utilisateurs = utilisateurService.getAllUtilisateurs();
            System.out.println("Nombre d'utilisateurs récupérés: " + utilisateurs.size());

            return ResponseEntity.ok(utilisateurs);

        } catch (Exception e) {
            System.err.println("❌ ERREUR LISTE UTILISATEURS: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity
                .badRequest()
                .body("Erreur récupération utilisateurs: " + e.getMessage());
        }
    }
}
