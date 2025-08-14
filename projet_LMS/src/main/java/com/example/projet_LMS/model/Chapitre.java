
package com.example.projet_LMS.model;

import java.util.List;

import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chapitres") // Explicit table name
@Data
@Builder
public class Chapitre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String description;

    @OneToMany(mappedBy = "chapitre") // Doit correspondre au nom de l'attribut côté "Paragraphe"
    private List<Paragraphe> paragraphes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sommaire") // nom de la colonne dans la table Sommaire
    private Sommaire sommaire; // Association avec Sommaire*/

     
}