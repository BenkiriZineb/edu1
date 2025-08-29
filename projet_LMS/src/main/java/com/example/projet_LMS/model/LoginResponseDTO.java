package com.example.projet_LMS.model;

import com.example.projet_LMS.Enum.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private UserRole role;
    private boolean success;
    private String message;
    private String token; // Pour une authentification JWT future
}
