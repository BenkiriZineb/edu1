package com.example.projet_LMS.services;

import com.example.projet_LMS.model.Eleve;
import com.example.projet_LMS.model.ProfileEleveDTO;
import com.example.projet_LMS.model.Matiere;

import java.util.List;
import java.util.stream.Collectors;

public interface ProfileEleveService {
    
    /**
     * Récupère le profil complet d'un élève par son ID
     */
    ProfileEleveDTO getProfileEleveById(Long id);
    
    /**
     * Récupère le profil complet d'un élève par son email
     */
    ProfileEleveDTO getProfileEleveByEmail(String email);
    
    /**
     * Met à jour le profil d'un élève
     */
    ProfileEleveDTO updateProfileEleve(Long id, ProfileEleveDTO profileDTO);
    
    /**
     * Convertit un objet Eleve en ProfileEleveDTO
     */
    ProfileEleveDTO convertToDTO(Eleve eleve);
}
