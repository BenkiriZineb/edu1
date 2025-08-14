package com.example.projet_LMS.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Eleve;
@Service
public interface EleveService {
     // Création
    Eleve saveEleve(Eleve eleve);      // Recommandé : retourne l'objet persisté

    // Mise à jour
    Eleve updateEleve(Eleve eleve);

    // Suppression
    void deleteEleveById(Long id);     
    void deleteAllEleves();           

    // Lecture
    Eleve getEleveById(Long id);
    List<Eleve> getAllEleves();
    Eleve getEleveByEmail(String email);
    Eleve getEleveByName(String name);

    Optional<Eleve> findById(Long id);

    
    
}
