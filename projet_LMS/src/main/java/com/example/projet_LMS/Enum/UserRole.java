package com.example.projet_LMS.Enum;

public enum UserRole {
    ELEVE("Eleve"),
    PROFESSEUR("Professeur"),
    PARENT("Parent"),
    ADMIN("Admin");

    private final String roleName;

    UserRole(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }
}
