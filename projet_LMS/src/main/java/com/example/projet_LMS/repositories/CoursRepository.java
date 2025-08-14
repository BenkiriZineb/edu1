package com.example.projet_LMS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Cours;
@Repository
public interface CoursRepository extends JpaRepository<Cours, Long> {
    // Additional query methods can be defined here if needed
     Cours findByNom(String nom);
}
