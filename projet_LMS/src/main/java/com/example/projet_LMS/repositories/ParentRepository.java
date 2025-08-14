package com.example.projet_LMS.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Parent;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {
    // Define any custom query methods if needed    
}
