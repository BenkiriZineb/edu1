package com.example.projet_LMS.services;

import java.util.List;


import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Matiere;
import com.example.projet_LMS.model.NiveauScolaire;
import com.example.projet_LMS.repositories.MatiereRepository;
import com.example.projet_LMS.repositories.NiveauScolaireRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatiereServiceImpl implements MatiereService {

    private final MatiereRepository matiereRepository;
    private final NiveauScolaireRepository niveauScolaireRepository; 
 @Override
public Matiere addMatiere(Matiere matiere, Long niveauId) {
    // Récupérer le niveau scolaire via le repository existant
    NiveauScolaire niveau = niveauScolaireRepository.findById(niveauId)
            .orElseThrow(() -> new RuntimeException("NiveauScolaire not found"));

    // Associer la matière au niveau scolaire
    matiere.setNiveauScolaire(niveau);

    // Sauvegarder la matière
    return matiereRepository.save(matiere);
}


    @Override
    public Matiere saveMatiere(Matiere matiere) {
        return matiereRepository.save(matiere);
    }

     @Override
    public Matiere updateMatiere(Long id, Matiere matiere) {
        return matiereRepository.findById(id)
                .map(existingMatiere -> {
                     existingMatiere.setNom(matiere.getNom());
                     existingMatiere.setCoeficient(matiere.getCoeficient());
                     existingMatiere.setNiveauScolaire(matiere.getNiveauScolaire());
                     return matiereRepository.save(existingMatiere);
                })
                .orElseThrow(() -> new RuntimeException("Matiere avec ID " + id + " non trouvée"));
    }

    @Override
    public void deleteMatiereById(Long id) {
        if (!matiereRepository.existsById(id)) {
            throw new RuntimeException("Matiere avec ID " + id + " non trouvée");
        }
        matiereRepository.deleteById(id);
    }

    @Override
    public void deleteAllMatieres() {
        matiereRepository.deleteAll();
    }

    @Override
    public Matiere getMatiereById(Long id) {
        return matiereRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matiere avec ID " + id + " non trouvée"));
    }

    @Override
    public List<Matiere> getAllMatieres() {
        return matiereRepository.findAll();
    }
 
   /*  @Override
    public List<Matiere> getMatieresByNiveauId(Long niveauId) {
        return matiereRepository.findByNiveauScolaire_Id(niveauId);
    }*/

    @Override
public List<Matiere> getMatieresByNiveauId(Long niveauId) {
    NiveauScolaire niveau = niveauScolaireRepository.findById(niveauId)
            .orElseThrow(() -> new RuntimeException("Niveau non trouvé"));

    return matiereRepository.findByNiveauScolaire_Id(niveauId);
}

}
