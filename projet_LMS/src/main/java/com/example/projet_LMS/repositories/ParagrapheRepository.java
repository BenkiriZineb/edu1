package com.example.projet_LMS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Paragraphe;
@Repository
public interface ParagrapheRepository extends JpaRepository<Paragraphe, Long> {
    // Additional query methods can be defined here if needed
    
}
