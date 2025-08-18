package com.example.projet_LMS.model;

import java.time.LocalDate;


import com.example.projet_LMS.Enum.UserRole;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
// @Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
@ToString(exclude = {"mdp"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public  class Utilisateur {
    
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @EqualsAndHashCode.Include
    protected Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String mdp;
    //@Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate datedenaissance;


    //@Column(nullable = false)
    private String sexe;
    //@Column(nullable = false)
    private String adresse;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    
    @Column(nullable = false)
    private boolean actif ;

 
}