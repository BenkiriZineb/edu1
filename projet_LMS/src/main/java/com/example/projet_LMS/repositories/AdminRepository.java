package com.example.projet_LMS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Define any custom query methods if needed
    Admin findByEmail(String email);
}
