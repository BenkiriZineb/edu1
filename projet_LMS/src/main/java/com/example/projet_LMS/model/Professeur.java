package com.example.projet_LMS.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Professeur extends Utilisateur {
    
   @OneToMany(mappedBy = "professeur") // Doit correspondre au nom de l'attribut côté "Paiment"
    private List<Paiment> paiments;  
    
    @ManyToOne
    @JoinColumn(name = "cours_id") // nom de la colonne dans la table Cours
    private Cours cours; // Association avec Cours
   
     @ManyToMany
     @JoinTable(
    name = "professeur_matiere",
    joinColumns = @JoinColumn(name = "professeur_id"),
    inverseJoinColumns = @JoinColumn(name = "matiere_id")) // Doit correspondre au nom de l'attribut côté "Matiere"
    private List<Matiere> matieres; // Association avec Matiere

}
