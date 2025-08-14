package com.example.projet_LMS.model;






import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Eleve extends Utilisateur {
     
    
    
    

    
    @ManyToOne
    @JoinColumn(name = "cours_id") // nom de la colonne dans la table Cours
    private Cours cours; // Association avec Cours

    @ManyToMany
    @JoinTable(
    name = "eleve_matiere",
    joinColumns = @JoinColumn(name = "eleve_id"),
    inverseJoinColumns = @JoinColumn(name = "matiere_id")) // Doit correspondre au nom de l'attribut côté "Matiere"
    private List<Matiere> matieres; // Association avec Matiere
   
 @ManyToOne 
    @JoinColumn(name = "niveau_scolaire_id")
    private NiveauScolaire niveauScolaireObj;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent; // Association avec Parent
    // Association avec Adresse

    }

