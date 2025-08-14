package com.example.projet_LMS.repositories;

import com.example.projet_LMS.model.Utilisateur;
import com.example.projet_LMS.Enum.UserRole;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Utilisateur> findByRole(UserRole role);
    
    
}