package com.example.projet_LMS.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.OneToMany;
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
public class Matiere {
       
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String note ;
    private String coeficient;
    @OneToMany(mappedBy = "matiere") // Doit correspondre au nom de l'attribut côté "Cours"
    private List<Cours> cours;
    @ManyToOne
    @JoinColumn(name = "niveau_id")
    @JsonBackReference
    private NiveauScolaire niveauScolaire;

     @ManyToMany(mappedBy = "matieres") // Doit correspondre au nom de l'attribut côté "Professeur"
    private List<Professeur> professeurs; // Association avec Professeur

    @ManyToMany(mappedBy = "matieres") // Doit correspondre au nom de l'attribut côté "Eleve"
    private List<Eleve> eleves; // Association avec Eleve
}

