package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Professeur;

@Service
public interface  ProfesseurService {
    Professeur addProfesseur(Professeur professeur);
    Professeur saveProfesseur(Professeur professeur);
    Professeur updateProfesseur(Professeur professeur);
    void deleteProfesseurById(Long id);
    void deleteAllProfesseurs();
    Professeur getProfesseurById(Long id);
    List<Professeur> getAllProfesseurs();
   
    
}
