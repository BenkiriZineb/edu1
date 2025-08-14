package com.example.projet_LMS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Professeur;
@Repository
public interface ProfesseurRepository extends JpaRepository<Professeur, Long> { 
}
