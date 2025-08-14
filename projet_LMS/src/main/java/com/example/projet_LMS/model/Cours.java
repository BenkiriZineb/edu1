
package com.example.projet_LMS.model;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Builder
@Getter
@Setter
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String description;
    private String categorie;
    @OneToMany(mappedBy = "cours") // Doit correspondre au nom de l'attribut côté "Chapitre"
    private List<Sommaire> sommaires;

    @OneToMany(mappedBy = "cours") // Doit correspondre au nom de l'attribut côté "Paiment"
    private List<Professeur> professeurs;

    @ManyToOne
    @JoinColumn(name = "matiere_id")
    private Matiere matiere; 
    
}
