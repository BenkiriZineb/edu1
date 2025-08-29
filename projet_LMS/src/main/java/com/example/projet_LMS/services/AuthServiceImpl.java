package com.example.projet_LMS.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.LoginDTO;
import com.example.projet_LMS.model.LoginResponseDTO;
import com.example.projet_LMS.model.Utilisateur;
import com.example.projet_LMS.Enum.UserRole;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UtilisateurService utilisateurService;

    @Override
    public LoginResponseDTO authenticate(LoginDTO loginDTO) {
        try {
            // Convertir le rôle string en enum
            UserRole role = UserRole.valueOf(loginDTO.getRole().toUpperCase());
            
            // Valider les identifiants
            if (validateCredentials(loginDTO.getEmail(), loginDTO.getPassword(), role)) {
                // Récupérer l'utilisateur
                Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(loginDTO.getEmail());
                
                if (utilisateur != null) {
                    return LoginResponseDTO.builder()
                        .id(utilisateur.getId())
                        .nom(utilisateur.getNom())
                        .prenom(utilisateur.getPrenom())
                        .email(utilisateur.getEmail())
                        .role(utilisateur.getRole())
                        .success(true)
                        .message("Connexion réussie")
                        .token("token_" + utilisateur.getId()) // Token simple pour l'instant
                        .build();
                }
            }
            
            // Échec de l'authentification
            return LoginResponseDTO.builder()
                .success(false)
                .message("Email, mot de passe ou rôle incorrect")
                .build();
                
        } catch (IllegalArgumentException e) {
            // Rôle invalide
            return LoginResponseDTO.builder()
                .success(false)
                .message("Rôle invalide")
                .build();
        } catch (Exception e) {
            // Erreur générale
            return LoginResponseDTO.builder()
                .success(false)
                .message("Erreur lors de l'authentification: " + e.getMessage())
                .build();
        }
    }

    @Override
    public boolean validateCredentials(String email, String password, UserRole role) {
        try {
            Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(email);
            
            if (utilisateur == null) {
                return false;
            }
            
            // Vérifier le rôle
            if (utilisateur.getRole() != role) {
                return false;
            }
            
            // Vérifier le mot de passe (comparaison simple pour l'instant)
            // TODO: Implémenter le hachage des mots de passe
            return utilisateur.getMdp().equals(password);
            
        } catch (Exception e) {
            return false;
        }
    }
}
