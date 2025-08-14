package com.example.projet_LMS.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Chapitre;

@Repository
public interface ChapitreRepository extends JpaRepository<Chapitre, Long> {
    // Additional query methods can be defined here if needed
    //Chapitre findByNom(String nom);
    Optional<Chapitre> findByNom(String nom);
    boolean existsByNom(String nom);
}
