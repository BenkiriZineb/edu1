package com.example.projet_LMS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Paiment;
@Repository
public interface PaimentRepository extends JpaRepository<Paiment, Long> {
    // Additional query methods can be defined here if needed   
    
}
