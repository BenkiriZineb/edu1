package com.example.projet_LMS.model;


import jakarta.persistence.OneToMany;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder

public class Sommaire {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;   

    @OneToMany(mappedBy = "sommaire") // Doit correspondre au nom de l'attribut côté "Chapitre"
    private List<Chapitre> chapitres;
    @ManyToOne
    @JoinColumn(name = "cours_id")
    private Cours cours; // Association avec Cours
    
}
