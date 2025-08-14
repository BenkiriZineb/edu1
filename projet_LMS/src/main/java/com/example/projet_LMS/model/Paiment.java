

package com.example.projet_LMS.model;


import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import com.example.projet_LMS.Enum.ModePaiement;
import com.example.projet_LMS.Enum.StatutPaiement;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity


public class Paiment {
      @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String montant;
    private String date;
    
    @Enumerated(EnumType.STRING)
    private ModePaiement modePaiement;
    
    @Enumerated(EnumType.STRING)
    private StatutPaiement statut;

@ManyToOne
@JoinColumn(name = "admin_id") // nom de la colonne dans la table Paiment
private Admin admin;
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;

    @ManyToOne
    @JoinColumn(name = "professeur_id")
    private Professeur professeur;  

}


