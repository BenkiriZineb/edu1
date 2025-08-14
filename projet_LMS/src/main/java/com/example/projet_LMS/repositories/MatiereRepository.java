package com.example.projet_LMS.repositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Matiere;
@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Long> {
    // Additional query methods can be defined here if needed
      Matiere findByNom(String nom);
      
}
