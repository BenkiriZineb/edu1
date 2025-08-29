package com.example.projet_LMS.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.projet_LMS.model.Eleve;
import com.example.projet_LMS.model.InscriptionEleveDTO;
import com.example.projet_LMS.model.ProfileEleveDTO;
import com.example.projet_LMS.services.EleveService;
import com.example.projet_LMS.services.ProfileEleveService;

@RestController
@RequestMapping("/api/eleve")
@CrossOrigin(origins = "http://localhost:4200")
public class EleveController {

    private final EleveService eleveService;
    private final ProfileEleveService profileEleveService;

    public EleveController(EleveService eleveService, ProfileEleveService profileEleveService) {
        this.eleveService = eleveService;
        this.profileEleveService = profileEleveService;
    }

    @PostMapping("/eleve")
    public ResponseEntity<?> inscrireEleve(@RequestBody InscriptionEleveDTO inscriptionDTO) {
        try {
            // 🔍 Debug détaillé
            System.out.println("=== INSCRIPTION ELEVE AVEC NIVEAU SCOLAIRE ===");
            System.out.println("Nom: " + inscriptionDTO.getNom());
            System.out.println("Prenom: " + inscriptionDTO.getPrenom());
            System.out.println("Email: " + inscriptionDTO.getEmail());
            System.out.println("MDP: " + (inscriptionDTO.getMdp() != null ? "***" : "null"));
            System.out.println("Sexe: " + inscriptionDTO.getSexe());
            System.out.println("Date de naissance: " + inscriptionDTO.getDatedenaissance());
            System.out.println("Adresse: " + inscriptionDTO.getAdresse());
            System.out.println("Role: " + inscriptionDTO.getRole());
            System.out.println("Niveau scolaire: " + inscriptionDTO.getNiveauScolaire());
            System.out.println("Nationalité: " + inscriptionDTO.getNationalite());
            System.out.println("Téléphone: " + inscriptionDTO.getTele());

            // Validation minimale
            if (inscriptionDTO.getNom() == null || inscriptionDTO.getNom().trim().isEmpty()) {
                throw new IllegalArgumentException("Le nom est obligatoire");
            }
            if (inscriptionDTO.getEmail() == null || inscriptionDTO.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("L'email est obligatoire");
            }
            if (inscriptionDTO.getAdresse() == null || inscriptionDTO.getAdresse().trim().isEmpty()) {
                throw new IllegalArgumentException("L'adresse est obligatoire");
            }
            if (inscriptionDTO.getNiveauScolaire() == null || inscriptionDTO.getNiveauScolaire().trim().isEmpty()) {
                throw new IllegalArgumentException("Le niveau scolaire est obligatoire");
            }

            // Utiliser la nouvelle méthode qui gère le niveau scolaire
            Eleve savedEleve = eleveService.createEleveWithNiveauScolaire(inscriptionDTO);
            System.out.println("✅ Eleve créé avec niveau scolaire, ID: " + savedEleve.getId());
            System.out.println("✅ Niveau scolaire associé: " + (savedEleve.getNiveauScolaireObj() != null ? savedEleve.getNiveauScolaireObj().getClasse() : "null"));
            System.out.println("✅ Niveau d'étude: " + (savedEleve.getNiveauScolaireObj() != null ? savedEleve.getNiveauScolaireObj().getNiveau_etude() : "null"));

            return ResponseEntity.ok(savedEleve);

        } catch (Exception e) {
            System.err.println("❌ ERREUR INSCRIPTION ELEVE: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erreur inscription: " + e.getMessage());
        }
    }

    // 🔍 Récupérer le profil d'un élève par son ID
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfileEleve(@PathVariable Long id) {
        try {
            System.out.println("=== RÉCUPÉRATION PROFIL ÉLÈVE ===");
            System.out.println("ID demandé: " + id);
            
            ProfileEleveDTO profileDTO = profileEleveService.getProfileEleveById(id);
            
            if (profileDTO == null) {
                System.out.println("❌ Élève non trouvé avec l'ID: " + id);
                return ResponseEntity.notFound().build();
            }
            
            System.out.println("✅ Profil récupéré pour: " + profileDTO.getNom() + " " + profileDTO.getPrenom());
            return ResponseEntity.ok(profileDTO);
            
        } catch (Exception e) {
            System.err.println("❌ ERREUR RÉCUPÉRATION PROFIL: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erreur lors de la récupération du profil: " + e.getMessage());
        }
    }

    // 🔍 Récupérer le profil d'un élève par son email
    @GetMapping("/profile/email/{email}")
    public ResponseEntity<?> getProfileEleveByEmail(@PathVariable String email) {
        try {
            System.out.println("=== RÉCUPÉRATION PROFIL ÉLÈVE PAR EMAIL ===");
            System.out.println("Email demandé: " + email);
            
            ProfileEleveDTO profileDTO = profileEleveService.getProfileEleveByEmail(email);
            
            if (profileDTO == null) {
                System.out.println("❌ Élève non trouvé avec l'email: " + email);
                return ResponseEntity.notFound().build();
            }
            
            System.out.println("✅ Profil récupéré pour: " + profileDTO.getNom() + " " + profileDTO.getPrenom());
            return ResponseEntity.ok(profileDTO);
            
        } catch (Exception e) {
            System.err.println("❌ ERREUR RÉCUPÉRATION PROFIL PAR EMAIL: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erreur lors de la récupération du profil: " + e.getMessage());
        }
    }

    // 🔍 Mettre à jour le profil d'un élève
    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfileEleve(@PathVariable Long id, @RequestBody ProfileEleveDTO profileDTO) {
        try {
            System.out.println("=== MISE À JOUR PROFIL ÉLÈVE ===");
            System.out.println("ID de l'élève: " + id);
            
            ProfileEleveDTO updatedProfile = profileEleveService.updateProfileEleve(id, profileDTO);
            
            if (updatedProfile == null) {
                System.out.println("❌ Élève non trouvé avec l'ID: " + id);
                return ResponseEntity.notFound().build();
            }
            
            System.out.println("✅ Profil mis à jour pour: " + updatedProfile.getNom() + " " + updatedProfile.getPrenom());
            return ResponseEntity.ok(updatedProfile);
            
        } catch (Exception e) {
            System.err.println("❌ ERREUR MISE À JOUR PROFIL: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erreur lors de la mise à jour du profil: " + e.getMessage());
        }
    }
}
