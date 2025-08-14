package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Matiere;
@Service
public interface MatiereService {
    // Define methods related to Matiere service operations
    void addMatiere(Matiere matiere);
    Matiere saveMatiere(Matiere matiere);
    void updateMatiere(Matiere matiere);
    void deleteMatiereById(Long id);
    void deleteAllMatieres();
    Matiere getMatiereById(Long id);
    Matiere getMatiereByName(String name);
    List<Matiere> getAllMatieres();
    
}
