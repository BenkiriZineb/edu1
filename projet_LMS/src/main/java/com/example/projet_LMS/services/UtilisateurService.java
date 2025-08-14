package com.example.projet_LMS.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Utilisateur;
@Service
public interface UtilisateurService {
    
    Utilisateur addUtilisateur(Utilisateur utilisateur);
    Utilisateur saveUtilisateur(Utilisateur utilisateur);
    Utilisateur updateUtilisateur(Utilisateur utilisateur);
    void deleteUtilisateurById(Long id);
    void deleteAllUtilisateurs();
    Utilisateur getUtilisateurById(Long id);
    List<Utilisateur> getAllUtilisateurs();
    public Optional<Utilisateur> findByEmail(String email) ;
    public boolean emailExists(String email) ;
    
}
