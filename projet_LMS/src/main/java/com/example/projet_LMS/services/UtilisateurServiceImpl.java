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
public Optional<Utilisateur> getUtilisateurById(Long id) {
    Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);
    if (utilisateur.isEmpty()) {
        // Log warning or handle empty case
        System.out.println("Utilisateur with ID " + id + " not found");
    }
    return utilisateur;
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

        @Override
    public Utilisateur updateEtat(Long id, boolean actif) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec id " + id));
        utilisateur.setActif(actif); // ⚡ ton entité Utilisateur doit avoir un champ "actif"
        return utilisateurRepository.save(utilisateur);
    }
    
    @Override
    public Utilisateur getUtilisateurByEmail(String email) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByEmail(email);
        return utilisateurOpt.orElse(null);
    }
        
    }
