package com.example.projet_LMS.controllers;

import java.util.List;



import org.springframework.web.bind.annotation.*;

import com.example.projet_LMS.model.Matiere;

import com.example.projet_LMS.services.MatiereService;

@RestController
@RequestMapping("/api/matieres")
@CrossOrigin(origins = "http://localhost:4200")
public class MatiereController {

    private final MatiereService matiereService;

    public MatiereController(MatiereService matiereService) {
        this.matiereService = matiereService;
    }

    // Récupérer toutes les matières d’un niveau
    @GetMapping("/niveau/{niveauId}")
    public List<Matiere> getByNiveau(@PathVariable Long niveauId) {
        return matiereService.getMatieresByNiveauId(niveauId);
    }

    // Ajouter une matière
    @PostMapping
    public Matiere createMatiere(@RequestBody Matiere matiere) {
        return matiereService.saveMatiere(matiere);
    }

    // Modifier une matière
    @PutMapping("/{id}")
    public Matiere updateMatiere(@PathVariable Long id, @RequestBody Matiere matiere) {
        return matiereService.updateMatiere(id, matiere);
    }

    // Supprimer une matière
    @DeleteMapping("/{id}")
    public void deleteMatiere(@PathVariable Long id) {
        matiereService.deleteMatiereById(id);
    }
}

