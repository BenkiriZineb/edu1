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
public class InscriptionEleveDTO {
    // Informations de base
    private String nom;
    private String prenom;
    private String email;
    private String mdp;
    private UserRole role;
    private String sexe;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate datedenaissance;
    private String adresse;
    
    // Informations spécifiques à l'élève
    private String niveauScolaire; // Le niveau scolaire sélectionné (ex: "6ème (Sixième)")
    private String nationalite;
    private String tele;
    
    // Informations du parent
    private String parentEmail;
    private String parentNom;
    private String parentPrenom;
    private String parentTele;
    private String nombreEnfants;
}
