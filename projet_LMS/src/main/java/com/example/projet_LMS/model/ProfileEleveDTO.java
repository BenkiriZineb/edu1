package com.example.projet_LMS.model;

import java.time.LocalDate;
import com.example.projet_LMS.Enum.UserRole;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileEleveDTO {
    
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate datedenaissance;
    
    private String sexe;
    private String adresse;
    private UserRole role;
    private boolean actif;
    
    // Informations spécifiques à l'élève
    private String coursNom;
    private String niveauScolaire; // Le niveau scolaire sélectionné (ex: "6ème (Sixième)")
    private String niveauEtude; // Le niveau d'étude (PRESCOLAIRE, PRIMAIRE, COLLEGE, LYCEE, SUPERIEUR)
    private String parentNom;
    
    // Informations sur les matières (optionnel)
    private String matieres;
    
    // Informations supplémentaires
    private String telephone;
    private String photo;
    private String bio;
}
