package com.example.projet_LMS.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.projet_LMS.model.Eleve;
import com.example.projet_LMS.services.EleveService;

@RestController
@RequestMapping("/api/inscription")
@CrossOrigin(origins = "http://localhost:4200")
public class EleveController {

    private final EleveService eleveService;

    public EleveController(EleveService eleveService) {
        this.eleveService = eleveService;
    }

    @PostMapping("/eleve")
    public ResponseEntity<?> inscrireEleve(@RequestBody Eleve eleve) {
        try {
            // 🔍 Debug détaillé
            System.out.println("=== INSCRIPTION ELEVE ===");
            System.out.println("Nom: " + eleve.getNom());
            System.out.println("Prenom: " + eleve.getPrenom());
            System.out.println("Email: " + eleve.getEmail());
            System.out.println("MDP: " + (eleve.getMdp() != null ? "***" : "null"));
            System.out.println("Sexe: " + eleve.getSexe());
            System.out.println("Date de naissance: " + eleve.getDatedenaissance());
            System.out.println("Adresse: " + eleve.getAdresse());
            System.out.println("Role: " + eleve.getRole());

            // Validation minimale
            if (eleve.getNom() == null || eleve.getNom().trim().isEmpty()) {
                throw new IllegalArgumentException("Le nom est obligatoire");
            }
            if (eleve.getEmail() == null || eleve.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("L'email est obligatoire");
            }
            if (eleve.getAdresse() == null || eleve.getAdresse().trim().isEmpty()) {
                throw new IllegalArgumentException("L'adresse est obligatoire");
            }

            Eleve savedEleve = eleveService.saveEleve(eleve);
            System.out.println("✅ Eleve sauvegardé avec ID: " + savedEleve.getId());

            return ResponseEntity.ok(savedEleve);

        } catch (Exception e) {
            System.err.println("❌ ERREUR INSCRIPTION ELEVE: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erreur inscription: " + e.getMessage());
        }
    }
}
