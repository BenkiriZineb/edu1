package com.example.projet_LMS.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Data
@Builder
public class Note {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "eleve_id")
    @JsonBackReference
    private Eleve eleve;
    
    @ManyToOne
    @JoinColumn(name = "cours_id")
    @JsonBackReference
    private Cours cours;
    
    @ManyToOne
    @JoinColumn(name = "matiere_id")
    @JsonBackReference
    private Matiere matiere;
    
    private Double valeur; // Note obtenue
    private Double noteMaximale; // Note maximale possible (ex: 20)
    private String commentaire;
    private LocalDate date;
    
    @Enumerated(EnumType.STRING)
    private TypeNote type; // devoir, examen, quiz, controle
    
    // Calcul automatique du pourcentage
    public Double getPourcentage() {
        if (valeur != null && noteMaximale != null && noteMaximale > 0) {
            return (valeur / noteMaximale) * 100;
        }
        return 0.0;
    }
    
    // Énumération pour les types de notes
    public enum TypeNote {
        DEVOIR,
        EXAMEN,
        QUIZ,
        CONTROLE,
        PARTICIPATION,
        AUTRE
    }
}
