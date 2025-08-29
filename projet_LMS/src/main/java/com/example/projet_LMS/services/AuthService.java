package com.example.projet_LMS.services;

import com.example.projet_LMS.model.LoginDTO;
import com.example.projet_LMS.model.LoginResponseDTO;
import com.example.projet_LMS.model.Utilisateur;
import com.example.projet_LMS.Enum.UserRole;

public interface AuthService {
    LoginResponseDTO authenticate(LoginDTO loginDTO);
    boolean validateCredentials(String email, String password, UserRole role);
}
