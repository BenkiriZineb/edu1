package com.example.projet_LMS.services;

import com.example.projet_LMS.model.Chapitre;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
@Service

public interface ChapitreService {

   // Create
    Chapitre createChapitre(Chapitre chapitre);
    
    // Read
    Optional<Chapitre> getChapitreById(Long id);
    Optional<Chapitre> getChapitreByNom(String nom);
    List<Chapitre> getAllChapitres();
    
    // Update
    Optional<Chapitre> updateChapitre(Long id, Chapitre chapitreDetails);
    
    // Delete
    void deleteChapitre(Long id);
    void deleteAllChapitres();

    
}
