package com.example.projet_LMS;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.projet_LMS.Enum.UserRole;
import com.example.projet_LMS.model.Eleve;
import com.example.projet_LMS.repositories.EleveRepository;

@SpringBootTest
public class EleveRepositoryTest {
 
    @Autowired
    private EleveRepository eleveRepository;

    @Test
    public void testSaveEleve() {
       Eleve eleve = new Eleve();
    eleve.setNom("aboudi");
    eleve.setPrenom("chouki");
    eleve.setEmail("test@example.com");
    eleve.setMdp("password"); // ici tu peux encoder si besoin
    eleve.setRole(UserRole.PROFESSEUR); // 🔹 IMPORTANT si role est NOT NULL
    eleve.setDatedenaissance(LocalDate.of(2000, 1, 1));
    eleve.setSexe("Homme");
    

        Eleve saved = eleveRepository.save(eleve);
        
        assertNotNull(saved.getId()); // Vérifie que l'ID est généré
        assertTrue(eleveRepository.findById(saved.getId()).isPresent());
    }
}
