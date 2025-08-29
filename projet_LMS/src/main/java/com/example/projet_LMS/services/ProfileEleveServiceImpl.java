package com.example.projet_LMS.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Eleve;
import com.example.projet_LMS.model.ProfileEleveDTO;
import com.example.projet_LMS.model.Matiere;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfileEleveServiceImpl implements ProfileEleveService {

    @Autowired
    private EleveService eleveService;

    @Override
    public ProfileEleveDTO getProfileEleveById(Long id) {
        Eleve eleve = eleveService.getEleveById(id);
        if (eleve == null) {
            return null;
        }
        return convertToDTO(eleve);
    }

    @Override
    public ProfileEleveDTO getProfileEleveByEmail(String email) {
        Eleve eleve = eleveService.getEleveByEmail(email);
        if (eleve == null) {
            return null;
        }
        return convertToDTO(eleve);
    }

    @Override
    public ProfileEleveDTO updateProfileEleve(Long id, ProfileEleveDTO profileDTO) {
        Eleve eleve = eleveService.getEleveById(id);
        if (eleve == null) {
            return null;
        }

        // Mise à jour des informations de base
        if (profileDTO.getNom() != null) {
            eleve.setNom(profileDTO.getNom());
        }
        if (profileDTO.getPrenom() != null) {
            eleve.setPrenom(profileDTO.getPrenom());
        }
        if (profileDTO.getEmail() != null) {
            eleve.setEmail(profileDTO.getEmail());
        }
        if (profileDTO.getDatedenaissance() != null) {
            eleve.setDatedenaissance(profileDTO.getDatedenaissance());
        }
        if (profileDTO.getSexe() != null) {
            eleve.setSexe(profileDTO.getSexe());
        }
        if (profileDTO.getAdresse() != null) {
            eleve.setAdresse(profileDTO.getAdresse());
        }

        // Sauvegarder les modifications
        Eleve updatedEleve = eleveService.updateEleve(eleve);
        return convertToDTO(updatedEleve);
    }

    @Override
    public ProfileEleveDTO convertToDTO(Eleve eleve) {
        ProfileEleveDTO dto = new ProfileEleveDTO();
        
        // Informations de base
        dto.setId(eleve.getId());
        dto.setNom(eleve.getNom());
        dto.setPrenom(eleve.getPrenom());
        dto.setEmail(eleve.getEmail());
        dto.setDatedenaissance(eleve.getDatedenaissance());
        dto.setSexe(eleve.getSexe());
        dto.setAdresse(eleve.getAdresse());
        dto.setRole(eleve.getRole());
        dto.setActif(eleve.isActif());
        
        // Informations spécifiques à l'élève
        if (eleve.getCours() != null) {
            dto.setCoursNom(eleve.getCours().getNom());
        }
        
                       if (eleve.getNiveauScolaireObj() != null) {
                   // Le niveau scolaire sélectionné (ex: "6ème (Sixième)")
                   dto.setNiveauScolaire(eleve.getNiveauScolaireObj().getClasse());
                   
                   // Le niveau d'étude (PRESCOLAIRE, PRIMAIRE, COLLEGE, LYCEE, SUPERIEUR)
                   dto.setNiveauEtude(eleve.getNiveauScolaireObj().getNiveau_etude());
               }
        
        if (eleve.getParent() != null) {
            dto.setParentNom(eleve.getParent().getNom() + " " + eleve.getParent().getPrenom());
        }
        
        // Gestion des matières
        if (eleve.getMatieres() != null && !eleve.getMatieres().isEmpty()) {
            List<String> nomsMatieres = eleve.getMatieres().stream()
                .map(Matiere::getNom)
                .collect(Collectors.toList());
            dto.setMatieres(String.join(", ", nomsMatieres));
        }
        
        return dto;
    }
}
