package com.example.projet_LMS.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.projet_LMS.model.Utilisateur;
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

    @DeleteMapping("/utilisateurs/{id}")
    public ResponseEntity<?> deleteUtilisateur(@PathVariable Long id) {
        try {
            utilisateurService.deleteUtilisateurById(id);
            return ResponseEntity.ok("Utilisateur supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur suppression utilisateur: " + e.getMessage());
        }
    }

    @PutMapping("/utilisateurs/{id}/etat")
public ResponseEntity<?> updateEtatUtilisateur(@PathVariable Long id, @RequestParam boolean actif) {
    try {
        utilisateurService.updateEtat(id, actif);
        return ResponseEntity.ok("État de l'utilisateur mis à jour avec succès");
    } catch (Exception e) {
        return ResponseEntity
                .badRequest()
                .body("Erreur mise à jour état utilisateur: " + e.getMessage());
    }
}
@PatchMapping("/utilisateurs/{id}/etat")
public ResponseEntity<String> updateEtat(@PathVariable Long id, @RequestParam boolean actif) {
    utilisateurService.updateEtat(id, actif);
    return ResponseEntity.ok("Statut mis à jour");
}
@GetMapping("edit/{id}")
public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
    return utilisateurService.getUtilisateurById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PutMapping("edit/{id}")
public ResponseEntity<Utilisateur> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateurDetails) {
    return utilisateurService.getUtilisateurById(id).map(utilisateur -> {
        utilisateur.setNom(utilisateurDetails.getNom());
        utilisateur.setPrenom(utilisateurDetails.getPrenom());
        utilisateur.setEmail(utilisateurDetails.getEmail());
        utilisateur.setRole(utilisateurDetails.getRole());
        utilisateur.setActif(utilisateurDetails.isActif());
        utilisateur.setDatedenaissance(utilisateurDetails.getDatedenaissance());
        utilisateur.setSexe(utilisateurDetails.getSexe());
        utilisateur.setAdresse(utilisateurDetails.getAdresse());

        Utilisateur updated = utilisateurService.updateUtilisateur(utilisateur);
        return ResponseEntity.ok(updated);
    }).orElse(ResponseEntity.notFound().build());
}



}
