package com.example.projet_LMS.model;
import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class NiveauScolaire {
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String niveau_etude;
    private String anneeScolaire;
    private String classe;
    private String filiere;
    @OneToMany(mappedBy = "niveauScolaire")
    private List<Matiere> matieres; // Association avec Matiere
     
   @OneToMany(mappedBy = "niveauScolaireObj")
private List<Eleve> eleves;
 


}
