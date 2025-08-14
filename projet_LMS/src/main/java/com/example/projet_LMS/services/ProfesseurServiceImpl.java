package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Professeur;
import com.example.projet_LMS.repositories.ProfesseurRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class ProfesseurServiceImpl implements ProfesseurService {

    @Autowired
    private ProfesseurRepository professeurRepository;
    @Override
    public Professeur addProfesseur(Professeur professeur) {
        // Implementation here
        return professeurRepository.save(professeur);
    }

    @Override
    public Professeur saveProfesseur(Professeur professeur) {
        // Implementation here
        return professeurRepository.save(professeur);
    }

    @Override
    public Professeur updateProfesseur(Professeur professeur) {
        // Implementation here
        return professeurRepository.save(professeur);
    }

    @Override
    public void deleteProfesseurById(Long id) {
        // Implementation here
        professeurRepository.deleteById(id);
    }

    @Override
    public void deleteAllProfesseurs() {
        // Implementation here
        professeurRepository.deleteAll();
    }

    @Override
    public Professeur getProfesseurById(Long id) {
        // Implementation here
        return professeurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Professeur with ID " + id + " does not exist."));
    }

    @Override
    public List<Professeur> getAllProfesseurs() {
        // Implementation here
        return professeurRepository.findAll();
    }

    
    
}
