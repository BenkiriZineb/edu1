    package com.example.projet_LMS.controllers;

    
import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import com.example.projet_LMS.model.Utilisateur;
    import com.example.projet_LMS.services.UtilisateurService;

    @RestController
    @RequestMapping("/api/inscription")
    @CrossOrigin(origins = "http://localhost:4200")
    public class InscriptionController {

        private final UtilisateurService utilisateurService;

        public InscriptionController(UtilisateurService utilisateurService) {
            this.utilisateurService = utilisateurService;
        }

        @PostMapping("/inscription")
       
        public ResponseEntity<?> inscrireUtilisateur(@RequestBody Utilisateur utilisateur) {
            try {
                // 🔍 DÉBOGAGE DÉTAILLÉ
                System.out.println("=== INSCRIPTION CONTROLLER ===");
                System.out.println("Données reçues: " + utilisateur);
                System.out.println("Nom: " + utilisateur.getNom());
                System.out.println("Prenom: " + utilisateur.getPrenom());
                System.out.println("Email: " + utilisateur.getEmail());
                System.out.println("MDP: " + (utilisateur.getMdp() != null ? "***" : "null"));
                System.out.println("sex: " + utilisateur.getSexe());
                System.out.println("Date de naissance: " + utilisateur.getDatedenaissance());
                System.out.println("Adresse: " + utilisateur.getAdresse());
                System.out.println("Role: " + utilisateur.getRole());
                
                // Validation côté serveur
                if (utilisateur.getNom() == null || utilisateur.getNom().trim().isEmpty()) {
                    throw new IllegalArgumentException("Le nom est obligatoire");
                }
                if (utilisateur.getEmail() == null || utilisateur.getEmail().trim().isEmpty()) {
                    throw new IllegalArgumentException("L'email est obligatoire");
                }
                
                System.out.println("Appel du service...");
                Utilisateur savedUser = utilisateurService.addUtilisateur(utilisateur);
                System.out.println("✅ Utilisateur sauvegardé avec ID: " + savedUser.getId());
                
                return ResponseEntity.ok(savedUser);
                
            } catch (Exception e) {
                System.err.println("❌ ERREUR INSCRIPTION: " + e.getMessage());
                e.printStackTrace();
                
                return ResponseEntity
                    .badRequest()
                    .body("Erreur inscription: " + e.getMessage());
            }
        }
    }