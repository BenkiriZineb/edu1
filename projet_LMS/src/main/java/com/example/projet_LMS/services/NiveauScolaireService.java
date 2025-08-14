package com.example.projet_LMS.services;

import java.util.List;



import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.NiveauScolaire;

@Service
public interface NiveauScolaireService {
    NiveauScolaire addNiveauScolaire(NiveauScolaire niveauScolaire);
    NiveauScolaire saveNiveauScolaire(NiveauScolaire niveauScolaire);
    NiveauScolaire updateNiveauScolaire(NiveauScolaire niveauScolaire);
    void deleteNiveauScolaireById(Long id);
    void deleteAllNiveauxScolaires();
    NiveauScolaire getNiveauScolaireById(Long id);
    List<NiveauScolaire> getAllNiveauxScolaires();
}
