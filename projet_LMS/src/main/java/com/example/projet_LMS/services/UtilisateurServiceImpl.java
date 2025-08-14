    package com.example.projet_LMS.services;

    import java.util.List;
    import java.util.Optional;

    import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Eleve;
import com.example.projet_LMS.model.Parent;
import com.example.projet_LMS.model.Professeur;
import com.example.projet_LMS.model.Utilisateur;
import com.example.projet_LMS.repositories.AdminRepository;
import com.example.projet_LMS.repositories.EleveRepository;
import com.example.projet_LMS.repositories.ParentRepository;
import com.example.projet_LMS.repositories.ProfesseurRepository;
import com.example.projet_LMS.repositories.UtilisateurRepository;
    
    import lombok.AllArgsConstructor;
    @Service
@AllArgsConstructor
    public class UtilisateurServiceImpl implements UtilisateurService {




        @Autowired
        private UtilisateurRepository utilisateurRepository;
        
 private final AdminRepository adminRepository;
    private final EleveRepository eleveRepository;
    private final ParentRepository parentRepository;
    private final ProfesseurRepository professeurRepository;

    @Override
    public Utilisateur addUtilisateur(Utilisateur utilisateur) {
        switch (utilisateur.getRole()) {
            
            case ELEVE:
                Eleve eleve = new Eleve();
                copyUtilisateurData(utilisateur, eleve);
                return eleveRepository.save(eleve);

            case PARENT:
                Parent parent = new Parent();
                copyUtilisateurData(utilisateur, parent);
                return parentRepository.save(parent);

            case PROFESSEUR:
                Professeur prof = new Professeur();
                copyUtilisateurData(utilisateur, prof);
                return professeurRepository.save(prof);

            default:
                throw new IllegalArgumentException("Rôle inconnu : " + utilisateur.getRole());
        }
    }

    // Méthode pour copier les champs communs
    private void copyUtilisateurData(Utilisateur source, Utilisateur target) {
        target.setNom(source.getNom());
        target.setPrenom(source.getPrenom());
        target.setEmail(source.getEmail());
        target.setMdp(source.getMdp());
        target.setRole(source.getRole());
    }



    

        @Override
        public Utilisateur updateUtilisateur(Utilisateur utilisateur) {
            // Implementation logic to update an existing utilisateur
            return utilisateurRepository.save(utilisateur); 
        }

        @Override
        public void deleteUtilisateurById(Long id) {
            // Implementation logic to delete utilisateur by ID
            utilisateurRepository.deleteById(id); 
        }

        @Override
        public void deleteAllUtilisateurs() {
            // Implementation logic to delete all utilisateurs
            utilisateurRepository.deleteAll(); 
        }

        @Override
        public Utilisateur getUtilisateurById(Long id) {
            // Implementation logic to get utilisateur by ID
            return utilisateurRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("utilisateur with ID " + id + " does not exist.")); // Replace with actual implementation
        }

        @Override
        public List<Utilisateur> getAllUtilisateurs() {
            // Implementation logic to get all utilisateurs
            return utilisateurRepository.findAll(); // Replace with actual implementation
        }

        @Override
        public Utilisateur saveUtilisateur(Utilisateur utilisateur) {
            return utilisateurRepository.save(utilisateur);
        }

        @Override
        public Optional<Utilisateur> findByEmail(String email) {
            return utilisateurRepository.findByEmail(email);
        }
        @Override
        public boolean emailExists(String email) {
            return utilisateurRepository.existsByEmail(email);
        }
        
    }
