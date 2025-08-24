package com.example.projet_LMS.controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projet_LMS.model.Matiere;
import com.example.projet_LMS.model.NiveauScolaire;
import com.example.projet_LMS.services.NiveauScolaireService;

import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor 
@RestController
@RequestMapping("/api/niveaux")
@CrossOrigin(origins = "http://localhost:4200")
public class NiveauScolaireController {

    private final NiveauScolaireService service ;

    @GetMapping
    public List<NiveauScolaire> getAll() {
        return service.getAllNiveauxScolaires();
    }

    @GetMapping("/{id}")
    public NiveauScolaire getById(@PathVariable Long id) {
        return service.getNiveauScolaireById(id);
    }

    @PostMapping
    public NiveauScolaire create(@RequestBody NiveauScolaire niveau) {
        return service.addNiveauScolaire(niveau);
    }

    @PutMapping("/{id}")
    public NiveauScolaire update(@PathVariable Long id, @RequestBody NiveauScolaire niveau) {
        return service.updateNiveauScolaire(niveau);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteNiveauScolaireById(id);
    }

  @GetMapping("/{id}/matieres")
public ResponseEntity<List<Matiere>> getMatieresByNiveau(@PathVariable Long id) {
    NiveauScolaire niveau = service.getNiveauScolaireById(id);
    if (niveau != null) {
        return ResponseEntity.ok(niveau.getMatieres());
    } else {
        return ResponseEntity.notFound().build();
    }
}

}
