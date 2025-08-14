
package com.example.projet_LMS.services;
import com.example.projet_LMS.model.NiveauScolaire;
import com.example.projet_LMS.repositories.NiveauScolaireRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NiveauScolaireServiceImpl implements NiveauScolaireService {

    @Autowired
    private NiveauScolaireRepository niveauScolaireRepository;

    @Override
    public NiveauScolaire addNiveauScolaire(NiveauScolaire niveauScolaire) {
       return niveauScolaireRepository.save(niveauScolaire);
    }

    @Override
    public  NiveauScolaire saveNiveauScolaire(NiveauScolaire niveauScolaire) {
       return niveauScolaireRepository.save(niveauScolaire);
    }

    @Override
    public NiveauScolaire updateNiveauScolaire(NiveauScolaire niveauScolaire) {
        if (niveauScolaire.getId() != null && niveauScolaireRepository.existsById(niveauScolaire.getId())) {
           return niveauScolaireRepository.save(niveauScolaire);
        } else {
            throw new IllegalArgumentException("Niveau scolaire introuvable pour la mise à jour.");
        }
    }

    @Override
    public void deleteNiveauScolaireById(Long id) {
        if (niveauScolaireRepository.existsById(id)) {
            niveauScolaireRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Niveau scolaire avec ID " + id + " non trouvé.");
        }
    }

    @Override
    public void deleteAllNiveauxScolaires() {
        niveauScolaireRepository.deleteAll();
    }

    @Override
    public NiveauScolaire getNiveauScolaireById(Long id) {
        return niveauScolaireRepository.findById(id).get();
        }

    @Override
    public List<NiveauScolaire> getAllNiveauxScolaires() {
        return niveauScolaireRepository.findAll();
       }
}
