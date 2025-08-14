package com.example.projet_LMS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Eleve;
@Repository
public interface EleveRepository extends JpaRepository<Eleve, Long> {
    // Additional query methods can be defined here if needed
     
     Eleve findByEmail(String email);

    Eleve findByNom(String nom);
}
