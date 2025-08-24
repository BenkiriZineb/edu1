package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Matiere;
@Service
public interface MatiereService {
   Matiere saveMatiere(Matiere matiere);
    Matiere updateMatiere(Long id, Matiere matiere);
    void deleteMatiereById(Long id);
    void deleteAllMatieres();
    Matiere getMatiereById(Long id);
    List<Matiere> getAllMatieres();
    List<Matiere> getMatieresByNiveauId(Long niveauId);
    Matiere addMatiere(Matiere matiere, Long niveauId);
   
    
}
